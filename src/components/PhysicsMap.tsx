"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MarkerType,
  Panel,
  applyNodeChanges,
  type Edge,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { branches, groups, topics, type World } from "@/data/topics";
import TopicNode, { type TopicNodeType } from "@/components/TopicNode";
import BranchNode, { type BranchNodeType } from "@/components/BranchNode";
import FloatingEdge from "@/components/FloatingEdge";
import MapIslands from "@/components/MapIslands";
import {
  createSimulation,
  dragBody,
  isAtRest,
  releaseBody,
  stepSimulation,
} from "@/lib/springPhysics";

type MapNode = TopicNodeType | BranchNodeType;

// SVG arrowheads need plain colors, not CSS variables
const INK = "#1c1917"; // arrows on an island
const BRIDGE = "#a3a3a3"; // dashed arrows over the sea, between worlds
const BRIDGE_ACTIVE = "#ffffff";

// Defined outside the component, so React Flow gets the same objects on every render
const nodeTypes = { topic: TopicNode, branch: BranchNode };
const edgeTypes = { floating: FloatingEdge };

const initialNodes: MapNode[] = [
  ...topics.map(
    (topic, index): TopicNodeType => ({
      id: topic.slug,
      type: "topic",
      position: topic.position,
      data: { topic, floatDelay: -index * 0.7 },
    }),
  ),
  ...branches.map(
    (branch): BranchNodeType => ({
      id: branch.id,
      type: "branch",
      position: branch.position,
      data: { color: groups[branch.group].color },
      draggable: false,
    }),
  ),
];

// Which world (island) every node lives on
const worldOf: Record<string, World> = Object.fromEntries([
  ...topics.map((topic) => [topic.slug, groups[topic.group].world]),
  ...branches.map((branch) => [branch.id, groups[branch.group].world]),
]);

// One arrow per prerequisite; if a branch dot covers it, the arrow starts at
// the dot. Invisible links are springs only: they keep dots attached.
const links = [
  ...topics.flatMap((topic) =>
    topic.requires.map((required) => {
      const branch = branches.find(
        (b) => b.from === required && b.group === topic.group,
      );
      return { from: branch?.id ?? required, to: topic.slug, visible: true };
    }),
  ),
  ...branches.map((branch) => ({
    from: branch.from,
    to: branch.id,
    visible: false,
  })),
];

export default function PhysicsMap() {
  const [nodes, setNodes] = useState(initialNodes);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // The simulation lives in a ref: it changes 60 times per second and
  // shouldn't re-render anything by itself. We copy positions out each frame.
  const simulation = useRef(
    createSimulation(
      initialNodes.map((node) => ({ id: node.id, home: node.position })),
      links,
    ),
  );
  const frameId = useRef<number | null>(null);

  // Runs the physics loop until everything is back home and still
  const wakeUp = useCallback(() => {
    if (frameId.current !== null) return; // already running

    let lastTime = performance.now();
    const tick = (now: number) => {
      // Cap dt so a background tab doesn't make one giant step
      const dt = Math.min((now - lastTime) / 1000, 1 / 30);
      lastTime = now;

      const sim = simulation.current;
      stepSimulation(sim, dt);
      setNodes((current) =>
        current.map((node) => ({
          ...node,
          position: { ...sim.bodies[node.id].position },
        })),
      );

      frameId.current = isAtRest(sim) ? null : requestAnimationFrame(tick);
    };
    frameId.current = requestAnimationFrame(tick);
  }, []);

  // Stop the loop when the user leaves the page
  useEffect(() => {
    return () => {
      if (frameId.current !== null) cancelAnimationFrame(frameId.current);
    };
  }, []);

  // React Flow reports changes (drag, measured size...); we apply them as usual
  const onNodesChange = useCallback(
    (changes: NodeChange<MapNode>[]) =>
      setNodes((current) => applyNodeChanges(changes, current)),
    [],
  );

  const onNodeDrag = useCallback(
    (_event: unknown, node: MapNode) => {
      dragBody(simulation.current.bodies[node.id], node.position, performance.now());
      wakeUp();
    },
    [wakeUp],
  );

  const onNodeDragStop = useCallback(
    (_event: unknown, node: MapNode) => {
      releaseBody(simulation.current.bodies[node.id], performance.now());
      wakeUp();
    },
    [wakeUp],
  );

  // Arrows of the hovered tile get thicker and start flowing
  const edges: Edge[] = useMemo(
    () =>
      links.map(({ from, to, visible }) => {
        const active = hoveredId === from || hoveredId === to;
        const isBridge = worldOf[from] !== worldOf[to];
        const color = isBridge ? (active ? BRIDGE_ACTIVE : BRIDGE) : INK;
        return {
          id: `${from}->${to}`,
          source: from,
          target: to,
          type: "floating",
          hidden: !visible,
          animated: active,
          style: {
            stroke: color,
            strokeWidth: active ? 3 : 2,
            strokeDasharray: isBridge ? "8 8" : undefined,
          },
          markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
          zIndex: active ? 1 : 0,
        };
      }),
    [hoveredId],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onNodeMouseEnter={(_event, node) => setHoveredId(node.id)}
      onNodeMouseLeave={() => setHoveredId(null)}
      nodeOrigin={[0.5, 0.5]} // positions in topics.ts are tile centers
      nodesConnectable={false}
      elementsSelectable={false}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.15}
      maxZoom={2}
      colorMode="dark"
      className="[--xy-background-color:transparent]"
    >
      <MapIslands nodes={nodes} />
      <Background
        variant={BackgroundVariant.Dots}
        gap={28}
        size={1.5}
        color="#2a2a2a"
      />
      <Panel position="top-left" className="pointer-events-none">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Mapa <span className="text-accent">fizyki</span>
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          złap kafelek i szarpnij · przybliżaj kółkiem albo palcami
        </p>
      </Panel>
    </ReactFlow>
  );
}

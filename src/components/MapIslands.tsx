import { ViewportPortal, type Node } from "@xyflow/react";
import {
  groups,
  worlds,
  type Group,
  type Topic,
  type World,
} from "@/data/topics";
import { islandPath, type Rect } from "@/lib/islandShape";

const INK = "#1c1917";
const ISLAND_PADDING = 90; // px between the outer tiles and the coast

// Size fallback until React Flow has measured the tile
const DEFAULT_WIDTH = 176;
const DEFAULT_HEIGHT = 64;

type MapIslandsProps = {
  nodes: Node[];
};

// Islands (worlds) and patches (groups) under the tiles. Recomputed from the
// current tile positions on every render, so they stretch while tiles move.
export default function MapIslands({ nodes }: MapIslandsProps) {
  const tiles = nodes.filter((node) => node.type === "topic");
  const rectsWhere = (match: (topic: Topic) => boolean): Rect[] =>
    tiles
      .filter((node) => match(node.data.topic as Topic))
      .map((node) => ({
        center: node.position, // nodeOrigin is the center
        width: node.measured?.width ?? DEFAULT_WIDTH,
        height: node.measured?.height ?? DEFAULT_HEIGHT,
      }));
  const rectsOfWorld = (world: World) =>
    rectsWhere((topic) => groups[topic.group].world === world);

  const worldIds = Object.keys(worlds) as World[];
  // Groups only get their own patch when their world has more than one
  const classicalGroups = (Object.keys(groups) as Group[]).filter(
    (group) => groups[group].world === "classical",
  );

  return (
    <ViewportPortal>
      {/* -z-10 puts the islands under the edges and tiles */}
      <svg className="pointer-events-none absolute -z-10 overflow-visible">
        {worldIds.map((world, index) => (
          <path
            key={world}
            d={islandPath(rectsOfWorld(world), ISLAND_PADDING, 22, index * 2.3)}
            fill={worlds[world].color}
            stroke={INK}
            strokeWidth={3}
          />
        ))}
        {classicalGroups.map((group, index) => (
          <path
            key={group}
            d={islandPath(
              rectsWhere((topic) => topic.group === group),
              34,
              8,
              10 + index * 1.7,
            )}
            fill={groups[group].color}
            fillOpacity={0.55}
          />
        ))}
      </svg>
      {worldIds.map((world) => (
        <WorldLabel key={world} world={world} rects={rectsOfWorld(world)} />
      ))}
    </ViewportPortal>
  );
}

type WorldLabelProps = {
  world: World;
  rects: Rect[];
};

// Big world name on the dark "sea" above the island's top-left corner
function WorldLabel({ world, rects }: WorldLabelProps) {
  if (rects.length === 0) return null;
  const left = Math.min(...rects.map((r) => r.center.x - r.width / 2));
  const top = Math.min(...rects.map((r) => r.center.y - r.height / 2));
  return (
    <p
      className="pointer-events-none absolute -z-10 whitespace-nowrap text-3xl font-black uppercase tracking-tight"
      style={{
        left: left - 40,
        top: top - ISLAND_PADDING - 70,
        color: worlds[world].color,
      }}
    >
      {worlds[world].name}
    </p>
  );
}

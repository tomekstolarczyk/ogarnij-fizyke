import {
  BaseEdge,
  useInternalNode,
  type EdgeProps,
  type InternalNode,
} from "@xyflow/react";
import { rectBoundaryPoint } from "@/lib/mapGeometry";

const GAP = 10; // space between the arrow and the tile [px]

// Straight arrow between the edges of two tiles, pointing from center to
// center, so it follows the tiles from any side while they move
export default function FloatingEdge({
  source,
  target,
  markerEnd,
  style,
}: EdgeProps) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  if (!sourceNode || !targetNode) return null;

  const a = center(sourceNode);
  const b = center(targetNode);
  const start = rectBoundaryPoint(a, width(sourceNode), height(sourceNode), b, GAP);
  const end = rectBoundaryPoint(b, width(targetNode), height(targetNode), a, GAP);

  return (
    <BaseEdge
      path={`M ${start.x},${start.y} L ${end.x},${end.y}`}
      markerEnd={markerEnd}
      style={style}
    />
  );
}

function width(node: InternalNode) {
  return node.measured.width ?? 0;
}

function height(node: InternalNode) {
  return node.measured.height ?? 0;
}

// positionAbsolute is the top-left corner
function center(node: InternalNode) {
  return {
    x: node.internals.positionAbsolute.x + width(node) / 2,
    y: node.internals.positionAbsolute.y + height(node) / 2,
  };
}

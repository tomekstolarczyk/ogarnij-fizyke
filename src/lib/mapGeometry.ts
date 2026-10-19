export type Point = { x: number; y: number };

// Where a ray from the center of a width×height rectangle towards `target`
// leaves the rectangle grown by `gap` on every side.
// The ray is center + t·d with d = target - center; it hits the vertical edge
// at t = (width/2 + gap) / |dx| and the horizontal one at t = (height/2 + gap) / |dy|.
// The smaller t is the edge it reaches first.
export function rectBoundaryPoint(
  center: Point,
  width: number,
  height: number,
  target: Point,
  gap: number,
): Point {
  const dx = target.x - center.x;
  const dy = target.y - center.y;
  const tx = dx !== 0 ? (width / 2 + gap) / Math.abs(dx) : Infinity;
  const ty = dy !== 0 ? (height / 2 + gap) / Math.abs(dy) : Infinity;
  const t = Math.min(tx, ty);
  if (!Number.isFinite(t)) return center; // target is the center itself
  return { x: center.x + t * dx, y: center.y + t * dy };
}

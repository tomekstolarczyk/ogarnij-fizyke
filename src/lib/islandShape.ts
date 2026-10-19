// Organic island outlines around groups of map tiles.
// Pipeline: ellipse around every tile → convex hull → resample at fixed
// angles → coastline wobble → smooth closed curve (SVG path).
import type { Point } from "@/lib/mapGeometry";

export type Rect = { center: Point; width: number; height: number };

const ELLIPSE_SAMPLES = 12; // points on the ellipse around each tile
const OUTLINE_SAMPLES = 72; // points on the final outline (every 5°)

// SVG path of an island around `rects`, `padding` px away from them.
// `wobble` is the coastline amplitude [px], `seed` makes every island different.
export function islandPath(
  rects: Rect[],
  padding: number,
  wobble: number,
  seed: number,
): string {
  if (rects.length === 0) return "";

  // 1. Ellipses (not rect corners) make the hull round instead of boxy
  const points: Point[] = [];
  for (const { center, width, height } of rects) {
    const rx = width / 2 + padding;
    const ry = height / 2 + padding;
    for (let i = 0; i < ELLIPSE_SAMPLES; i++) {
      const angle = (2 * Math.PI * i) / ELLIPSE_SAMPLES;
      points.push({
        x: center.x + rx * Math.cos(angle),
        y: center.y + ry * Math.sin(angle),
      });
    }
  }
  const hull = convexHull(points);

  // 2. Resample: a ray from the centroid every few degrees hits the hull once
  // (convex shape). A fixed number of points at fixed angles means the
  // wobble below stays put while tiles move, instead of jumping around.
  const centroid = average(hull);
  const outline: Point[] = [];
  for (let i = 0; i < OUTLINE_SAMPLES; i++) {
    const angle = (2 * Math.PI * i) / OUTLINE_SAMPLES;
    const direction = { x: Math.cos(angle), y: Math.sin(angle) };
    const radius =
      rayHitDistance(centroid, direction, hull) +
      wobble * coastline(angle, seed);
    outline.push({
      x: centroid.x + radius * direction.x,
      y: centroid.y + radius * direction.y,
    });
  }

  return smoothClosedPath(outline);
}

// Andrew's monotone chain: convex hull in O(n log n).
// Sort points by x, then build the lower and upper chains, dropping every
// point that makes a clockwise turn (cross product <= 0).
export function convexHull(points: Point[]): Point[] {
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  if (sorted.length < 3) return sorted;

  const lower: Point[] = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower.at(-2)!, lower.at(-1)!, p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }
  const upper: Point[] = [];
  for (const p of sorted.reverse()) {
    while (upper.length >= 2 && cross(upper.at(-2)!, upper.at(-1)!, p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }
  // Last point of each chain is the first point of the other one
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

// z-component of (b - o) × (p - o): > 0 means o → b → p turns left
function cross(o: Point, b: Point, p: Point): number {
  return (b.x - o.x) * (p.y - o.y) - (b.y - o.y) * (p.x - o.x);
}

function average(points: Point[]): Point {
  const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), {
    x: 0,
    y: 0,
  });
  return { x: sum.x / points.length, y: sum.y / points.length };
}

// Distance t along the ray origin + t·direction to the polygon's edge.
// For edge p→q we solve origin + t·d = p + s·(q - p) with 2D cross products
// (Cramer's rule); the edge is hit when 0 <= s <= 1 and t >= 0.
function rayHitDistance(origin: Point, d: Point, polygon: Point[]): number {
  let best = 0;
  for (let i = 0; i < polygon.length; i++) {
    const p = polygon[i];
    const q = polygon[(i + 1) % polygon.length];
    const e = { x: q.x - p.x, y: q.y - p.y };
    const denominator = d.x * e.y - d.y * e.x;
    if (Math.abs(denominator) < 1e-9) continue; // ray parallel to the edge
    const op = { x: p.x - origin.x, y: p.y - origin.y };
    const t = (op.x * e.y - op.y * e.x) / denominator;
    const s = (op.x * d.y - op.y * d.x) / denominator;
    if (t >= 0 && s >= -1e-9 && s <= 1 + 1e-9) best = Math.max(best, t);
  }
  return best;
}

// A few sine waves of different frequency: a smooth, hand-drawn-looking
// coastline in [-1, 1]. Integer frequencies make it continuous at 0 = 2π.
function coastline(angle: number, seed: number): number {
  return (
    0.55 * Math.sin(3 * angle + seed) +
    0.3 * Math.sin(5 * angle + 2.1 * seed) +
    0.15 * Math.sin(11 * angle + 3.7 * seed)
  );
}

// Closed Catmull-Rom spline through the points, written as cubic Béziers:
// the curve passes through every point, and the tangent at point i is
// parallel to (next - previous), so there are no corners.
export function smoothClosedPath(points: Point[]): string {
  const n = points.length;
  const at = (i: number) => points[(i + n) % n];
  let path = `M ${at(0).x},${at(0).y}`;
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    path += ` C ${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`;
  }
  return path + " Z";
}

// Spring-mass simulation behind the physics map.
// Every tile is a body tied by a spring to its home position (from topics.ts),
// and every arrow is a spring that keeps the designed offset between two tiles.
// Units: px and seconds, every body has mass 1. Plain math, no React.

export type Vec = { x: number; y: number };

export type Body = {
  position: Vec;
  velocity: Vec;
  home: Vec;
  pinned: boolean; // held by the user: forces don't move it
  lastDragTime: number; // ms, used to estimate throw velocity
};

export type Spring = { from: string; to: string };

export type Simulation = {
  bodies: Record<string, Body>;
  springs: Spring[];
};

const HOME_STIFFNESS = 30; // k of the spring to the home position [1/s²]
const EDGE_STIFFNESS = 20; // k of every arrow spring [1/s²]
const DAMPING = 5; // c in F = -c·v [1/s]; low enough for a slight wobble
const SUBSTEP = 1 / 120; // fixed integration step [s]
const MAX_THROW_SPEED = 2500; // [px/s]
const REST_SPEED = 2; // below this [px/s]...
const REST_DISTANCE = 0.5; // ...and this close to home [px], a body is at rest

export function createSimulation(
  nodes: { id: string; home: Vec }[],
  springs: Spring[],
): Simulation {
  const bodies: Record<string, Body> = {};
  for (const { id, home } of nodes) {
    bodies[id] = {
      position: { ...home },
      velocity: { x: 0, y: 0 },
      home,
      pinned: false,
      lastDragTime: 0,
    };
  }
  return { bodies, springs };
}

// Advances the simulation by dt seconds, in place (like a C++ physics step).
export function stepSimulation(sim: Simulation, dt: number) {
  // Explicit integrators blow up when the step is too big (e.g. after a lag
  // spike), so the frame is split into small fixed substeps
  let remaining = dt;
  while (remaining > 1e-6) {
    const h = Math.min(SUBSTEP, remaining);
    substep(sim, h);
    remaining -= h;
  }
}

function substep(sim: Simulation, h: number) {
  const forces: Record<string, Vec> = {};

  // Home spring + damping: F = -k·(x - home) - c·v
  for (const [id, body] of Object.entries(sim.bodies)) {
    forces[id] = {
      x: -HOME_STIFFNESS * (body.position.x - body.home.x) - DAMPING * body.velocity.x,
      y: -HOME_STIFFNESS * (body.position.y - body.home.y) - DAMPING * body.velocity.y,
    };
  }

  // Arrow springs: stretch = current a→b vector minus the designed a→b vector
  for (const { from, to } of sim.springs) {
    const a = sim.bodies[from];
    const b = sim.bodies[to];
    const stretchX = b.position.x - a.position.x - (b.home.x - a.home.x);
    const stretchY = b.position.y - a.position.y - (b.home.y - a.home.y);
    forces[from].x += EDGE_STIFFNESS * stretchX;
    forces[from].y += EDGE_STIFFNESS * stretchY;
    // Newton's third law: equal and opposite force on the other end
    forces[to].x -= EDGE_STIFFNESS * stretchX;
    forces[to].y -= EDGE_STIFFNESS * stretchY;
  }

  // Semi-implicit Euler: update velocity first, then move with the new
  // velocity. Unlike plain Euler it doesn't pump energy into springs.
  for (const [id, body] of Object.entries(sim.bodies)) {
    if (body.pinned) continue;
    body.velocity.x += forces[id].x * h;
    body.velocity.y += forces[id].y * h;
    body.position.x += body.velocity.x * h;
    body.position.y += body.velocity.y * h;
  }
}

// The user moves a body: pin it under the cursor and estimate its velocity,
// so that releasing it mid-move throws it
export function dragBody(body: Body, position: Vec, now: number) {
  const dt = (now - body.lastDragTime) / 1000;
  if (body.pinned && dt > 0) {
    body.velocity = clampSpeed({
      x: (position.x - body.position.x) / dt,
      y: (position.y - body.position.y) / dt,
    });
  }
  body.position = { ...position };
  body.pinned = true;
  body.lastDragTime = now;
}

export function releaseBody(body: Body, now: number) {
  // Holding still before letting go means no throw
  if (now - body.lastDragTime > 80) {
    body.velocity = { x: 0, y: 0 };
  }
  body.pinned = false;
}

export function isAtRest(sim: Simulation): boolean {
  return Object.values(sim.bodies).every(
    (body) =>
      !body.pinned &&
      Math.hypot(body.velocity.x, body.velocity.y) < REST_SPEED &&
      Math.hypot(body.position.x - body.home.x, body.position.y - body.home.y) <
        REST_DISTANCE,
  );
}

function clampSpeed(v: Vec): Vec {
  const speed = Math.hypot(v.x, v.y);
  if (speed <= MAX_THROW_SPEED) return v;
  const scale = MAX_THROW_SPEED / speed;
  return { x: v.x * scale, y: v.y * scale };
}

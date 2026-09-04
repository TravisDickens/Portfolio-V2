export type Rect = { x: number; y: number; w: number; h: number };

export type Player = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  grounded: boolean;
  facing: 1 | -1;
};

export type Obstacle = Rect & { sprite: "crate" | "barrier" };

export type CoinState = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  collected: boolean;
};

export type Course = {
  ground: Rect;
  obstacles: Obstacle[];
  coins: CoinState[];
};

export type WorldConfig = {
  id: string;
  name: string;
  coinCount: number;
  speed: number;
};

export const PLAYER_W = 28;
export const PLAYER_H = 36;
export const GRAVITY = 2100;
export const JUMP_VELOCITY = -780;
export const MOVE_SPEED = 300;
export const COIN_SIZE = 22;
export const GROUND_THICKNESS = 12;

export const WORLDS: WorldConfig[] = [
  { id: "dock", name: "dock", coinCount: 3, speed: 1 },
  { id: "yard", name: "yard", coinCount: 4, speed: 1.1 },
  { id: "alley", name: "alley", coinCount: 5, speed: 1.2 },
  { id: "drop", name: "drop", coinCount: 5, speed: 1.3 },
];

export const WORLD_SECTIONS = ["#about", "#work", "#projects", "#contact"] as const;

export function createPlayer(x: number, y: number): Player {
  return {
    x,
    y,
    vx: 0,
    vy: 0,
    w: PLAYER_W,
    h: PLAYER_H,
    grounded: false,
    facing: 1,
  };
}

export function aabb(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number },
) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function crateAt(x: number, groundY: number, stacked = false): Obstacle[] {
  const w = 42;
  const h = 38;
  const items: Obstacle[] = [{ x, y: groundY - h, w, h, sprite: "crate" }];
  if (stacked) {
    items.push({ x, y: groundY - h * 2, w, h, sprite: "crate" });
  }
  return items;
}

function barrelAt(x: number, groundY: number, h = 58): Obstacle {
  return { x, y: groundY - h, w: 32, h, sprite: "barrier" };
}

function coinAt(id: string, host: Obstacle, lift: number): CoinState {
  return {
    id,
    x: host.x + host.w / 2 - COIN_SIZE / 2,
    y: host.y - COIN_SIZE - lift,
    w: COIN_SIZE,
    h: COIN_SIZE,
    collected: false,
  };
}

export function createCourse(width: number, height: number, worldIndex: number): Course {
  const groundY = height - 78;
  const ground: Rect = { x: 0, y: groundY, w: width, h: GROUND_THICKNESS };
  const w = Math.max(worldIndex, 0);
  let obstacles: Obstacle[] = [];

  if (w === 0) {
    obstacles = [
      ...crateAt(width * 0.28, groundY),
      ...crateAt(width * 0.52, groundY),
      ...crateAt(width * 0.76, groundY),
    ];
  } else if (w === 1) {
    obstacles = [
      ...crateAt(width * 0.2, groundY),
      ...crateAt(width * 0.4, groundY, true),
      barrelAt(width * 0.62, groundY, 56),
      ...crateAt(width * 0.82, groundY),
    ];
  } else if (w === 2) {
    obstacles = [
      ...crateAt(width * 0.16, groundY),
      barrelAt(width * 0.32, groundY, 60),
      ...crateAt(width * 0.46, groundY, true),
      ...crateAt(width * 0.62, groundY),
      barrelAt(width * 0.78, groundY, 64),
    ];
  } else {
    obstacles = [
      ...crateAt(width * 0.14, groundY),
      barrelAt(width * 0.26, groundY, 62),
      ...crateAt(width * 0.4, groundY, true),
      barrelAt(width * 0.54, groundY, 70),
      ...crateAt(width * 0.68, groundY, true),
      ...crateAt(width * 0.84, groundY),
    ];
  }

  const topOf = (index: number) => obstacles[Math.min(index, obstacles.length - 1)];
  let coins: CoinState[] = [];

  if (w === 0) {
    coins = [
      coinAt("0-0", topOf(0), 10),
      coinAt("0-1", topOf(1), 12),
      coinAt("0-2", topOf(2), 10),
    ];
  } else if (w === 1) {
    coins = [
      coinAt("1-0", topOf(0), 12),
      coinAt("1-1", topOf(2), 14),
      coinAt("1-2", topOf(3), 18),
      coinAt("1-3", topOf(4), 12),
    ];
  } else if (w === 2) {
    coins = [
      coinAt("2-0", topOf(0), 16),
      coinAt("2-1", topOf(1), 22),
      coinAt("2-2", topOf(3), 18),
      coinAt("2-3", topOf(4), 14),
      coinAt("2-4", topOf(5), 26),
    ];
  } else {
    coins = [
      coinAt("3-0", topOf(0), 14),
      coinAt("3-1", topOf(1), 28),
      coinAt("3-2", topOf(3), 16),
      coinAt("3-3", topOf(4), 30),
      coinAt("3-4", topOf(6), 18),
    ];
  }

  return { ground, obstacles, coins };
}

export function stepPlayer(
  player: Player,
  dt: number,
  input: { left: boolean; right: boolean; jump: boolean },
  course: Course,
  speedScale = 1,
): { player: Player; hitObstacle: boolean } {
  const next: Player = { ...player };
  const speed = MOVE_SPEED * speedScale;
  next.vx = 0;
  if (input.left) next.vx -= speed;
  if (input.right) next.vx += speed;
  if (next.vx > 0) next.facing = 1;
  if (next.vx < 0) next.facing = -1;

  if (input.jump && next.grounded) {
    next.vy = JUMP_VELOCITY;
    next.grounded = false;
  }

  next.vy += GRAVITY * dt;
  next.x += next.vx * dt;

  const maxX = course.ground.w - next.w;
  next.x = Math.max(0, Math.min(next.x, maxX));

  next.y += next.vy * dt;
  next.grounded = false;

  const solids: Rect[] = [course.ground, ...course.obstacles];
  let hitObstacle = false;

  for (const solid of solids) {
    const isObstacle = solid !== course.ground;
    const overlappingX = next.x + next.w > solid.x && next.x < solid.x + solid.w;
    const wasAbove = player.y + player.h <= solid.y + 10;

    if (
      wasAbove &&
      next.vy >= 0 &&
      overlappingX &&
      next.y + next.h >= solid.y &&
      player.y + player.h <= solid.y + solid.h + 28
    ) {
      next.y = solid.y - next.h;
      next.vy = 0;
      next.grounded = true;
      continue;
    }

    if (isObstacle && aabb(next, solid) && !wasAbove) {
      hitObstacle = true;
    }
  }

  return { player: next, hitObstacle };
}

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

export const PLAYER_W = 28;
export const PLAYER_H = 36;
export const GRAVITY = 2100;
export const JUMP_VELOCITY = -780;
export const MOVE_SPEED = 300;
export const COIN_SIZE = 22;
export const GROUND_THICKNESS = 10;

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

export function createCourse(width: number, height: number, coinIds: readonly string[]): Course {
  const groundY = height - 78;
  const ground: Rect = { x: 0, y: groundY, w: width, h: GROUND_THICKNESS };

  const crate = (x: number): Obstacle => ({
    x,
    y: groundY - 36,
    w: 40,
    h: 36,
    sprite: "crate",
  });
  const barrier = (x: number, h = 56): Obstacle => ({
    x,
    y: groundY - h,
    w: 28,
    h,
    sprite: "barrier",
  });

  const obstacles: Obstacle[] = [
    crate(width * 0.2),
    barrier(width * 0.36, 58),
    crate(width * 0.52),
    barrier(width * 0.68, 64),
    crate(width * 0.84),
  ];

  const coins: CoinState[] = coinIds.map((id, index) => {
    const obstacle = obstacles[index] ?? obstacles[obstacles.length - 1];
    return {
      id,
      x: obstacle.x + obstacle.w / 2 - COIN_SIZE / 2,
      y: obstacle.y - COIN_SIZE - 18,
      w: COIN_SIZE,
      h: COIN_SIZE,
      collected: false,
    };
  });

  return { ground, obstacles, coins };
}

export function stepPlayer(
  player: Player,
  dt: number,
  input: { left: boolean; right: boolean; jump: boolean },
  course: Course,
): { player: Player; hitObstacle: boolean } {
  const next: Player = { ...player };
  next.vx = 0;
  if (input.left) next.vx -= MOVE_SPEED;
  if (input.right) next.vx += MOVE_SPEED;
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

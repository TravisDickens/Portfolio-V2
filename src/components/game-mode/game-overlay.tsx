"use client";

import { useEffect, useRef } from "react";
import { coins } from "@/lib/data";
import { useGameMode } from "./game-mode-provider";
import { GameUi } from "./game-ui";
import {
  aabb,
  createCourse,
  createPlayer,
  stepPlayer,
  type Course,
  type Player,
} from "./game-physics";

type Sprites = {
  idle: HTMLImageElement;
  runA: HTMLImageElement;
  runB: HTMLImageElement;
  jump: HTMLImageElement;
  coin: HTMLImageElement;
  crate: HTMLImageElement;
  barrier: HTMLImageElement;
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load ${src}`));
    image.src = src;
  });
}

async function loadSprites(): Promise<Sprites> {
  const [idle, runA, runB, jump, coin, crate, barrier] = await Promise.all([
    loadImage("/game/runner-idle.svg"),
    loadImage("/game/runner-run-a.svg"),
    loadImage("/game/runner-run-b.svg"),
    loadImage("/game/runner-jump.svg"),
    loadImage("/game/coin.svg"),
    loadImage("/game/crate.svg"),
    loadImage("/game/barrier.svg"),
  ]);
  return { idle, runA, runB, jump, coin, crate, barrier };
}

function drawFlipped(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  facing: 1 | -1,
) {
  ctx.save();
  if (facing === -1) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, 0, w, h);
  } else {
    ctx.drawImage(image, x, y, w, h);
  }
  ctx.restore();
}

export function GameOverlay() {
  const { status, isPlaying, collectPacket, loseGame } = useGameMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<Player | null>(null);
  const courseRef = useRef<Course | null>(null);
  const spritesRef = useRef<Sprites | null>(null);
  const runClockRef = useRef(0);
  const inputRef = useRef({ left: false, right: false, jump: false });
  const collectPacketRef = useRef(collectPacket);
  const loseGameRef = useRef(loseGame);

  useEffect(() => {
    collectPacketRef.current = collectPacket;
    loseGameRef.current = loseGame;
  }, [collectPacket, loseGame]);

  useEffect(() => {
    if (status === "idle") {
      playerRef.current = null;
      courseRef.current = null;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const layout = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      courseRef.current = createCourse(canvas.width, canvas.height, coins);
      const ground = courseRef.current.ground;
      playerRef.current = createPlayer(36, ground.y - 40);
    };

    layout();
    window.addEventListener("resize", layout);
    loadSprites()
      .then((sprites) => {
        spritesRef.current = sprites;
      })
      .catch(() => {
        spritesRef.current = null;
      });

    return () => window.removeEventListener("resize", layout);
  }, [status]);

  useEffect(() => {
    if (!isPlaying) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", " ", "a", "A", "d", "D"].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") inputRef.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") inputRef.current.right = true;
      if (e.key === " " || e.key === "ArrowUp") inputRef.current.jump = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") inputRef.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") inputRef.current.right = false;
      if (e.key === " " || e.key === "ArrowUp") inputRef.current.jump = false;
    };

    const onPointer = (e: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas || !playerRef.current) return;
      const mid = canvas.width / 2;
      if (e.clientY < canvas.height * 0.4) {
        inputRef.current.jump = true;
      }
      inputRef.current.left = e.clientX < mid;
      inputRef.current.right = e.clientX >= mid;
    };
    const onPointerUp = () => {
      inputRef.current.left = false;
      inputRef.current.right = false;
      inputRef.current.jump = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("pointerup", onPointerUp);
    const preventScroll = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      inputRef.current = { left: false, right: false, jump: false };
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let frame = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const course = courseRef.current;
      const sprites = spritesRef.current;

      if (playerRef.current && course) {
        const stepped = stepPlayer(playerRef.current, dt, inputRef.current, course);
        playerRef.current = stepped.player;
        if (Math.abs(playerRef.current.vx) > 0 && playerRef.current.grounded) {
          runClockRef.current += dt;
        }

        if (stepped.hitObstacle) {
          loseGameRef.current();
        }

        for (const coin of course.coins) {
          if (coin.collected) continue;
          if (aabb(playerRef.current, coin)) {
            coin.collected = true;
            collectPacketRef.current(coin.id);
          }
        }

        if (playerRef.current.y > canvas.height + 40) {
          loseGameRef.current();
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (course) {
        ctx.fillStyle = "rgba(100, 255, 218, 0.35)";
        ctx.fillRect(course.ground.x, course.ground.y, course.ground.w, 3);

        for (const obstacle of course.obstacles) {
          const image = sprites
            ? obstacle.sprite === "crate"
              ? sprites.crate
              : sprites.barrier
            : null;
          if (image) {
            ctx.drawImage(image, obstacle.x, obstacle.y, obstacle.w, obstacle.h);
          } else {
            ctx.fillStyle = "#112240";
            ctx.strokeStyle = "#64ffda";
            ctx.lineWidth = 2;
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
            ctx.strokeRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
          }
        }

        for (const coin of course.coins) {
          if (coin.collected) continue;
          if (sprites) {
            ctx.drawImage(sprites.coin, coin.x, coin.y, coin.w, coin.h);
          } else {
            ctx.fillStyle = "#64ffda";
            ctx.beginPath();
            ctx.arc(coin.x + coin.w / 2, coin.y + coin.h / 2, coin.w / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (playerRef.current) {
        const player = playerRef.current;
        let pose = sprites?.idle;
        if (!player.grounded) pose = sprites?.jump;
        else if (Math.abs(player.vx) > 0) {
          pose = Math.floor(runClockRef.current / 0.12) % 2 === 0 ? sprites?.runA : sprites?.runB;
        }

        if (pose) {
          drawFlipped(ctx, pose, player.x, player.y, player.w, player.h, player.facing);
        } else {
          ctx.fillStyle = "#64ffda";
          ctx.fillRect(player.x, player.y, player.w, player.h);
        }
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying]);

  if (status === "idle") return null;

  return (
    <div className="fixed inset-0 z-50">
      <canvas ref={canvasRef} className="h-full w-full" />
      <GameUi />
    </div>
  );
}

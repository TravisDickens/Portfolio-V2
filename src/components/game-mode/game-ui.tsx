"use client";

import { WORLDS } from "./game-physics";
import { useGameMode } from "./game-mode-provider";
import { GameWinFanfare } from "./game-win-fanfare";

export function GameUi() {
  const { status, collected, worldIndex, endGame, restartGame, retryWorld } = useGameMode();
  const world = WORLDS[worldIndex];

  return (
    <div className="pointer-events-none absolute inset-0 z-[60] p-4 sm:p-6">
      <div className="flex items-start justify-between font-mono text-xs text-accent sm:text-sm">
        <p>
          {world.name} · {collected.length}/{world.coinCount}
        </p>
        <p>
          {worldIndex + 1} / {WORLDS.length} · esc to leave
        </p>
      </div>

      {status === "playing" ? (
        <p className="pointer-events-none absolute bottom-6 left-4 font-mono text-xs text-muted sm:left-6">
          arrows / a d to move · space to jump
        </p>
      ) : null}

      {status === "won" ? <GameWinFanfare /> : null}

      {status === "lost" ? (
        <div className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-[var(--bg)]/70">
          <div className="bg-surface max-w-sm p-8 text-center">
            <p className="font-serif text-3xl">clipped a crate</p>
            <p className="mt-3 text-sm text-muted">
              Retry {world.name}, or start over from the dock.
            </p>
            <div className="mt-6 flex justify-center gap-6 font-mono text-sm">
              <button type="button" onClick={retryWorld} className="text-accent hover:underline">
                retry
              </button>
              <button type="button" onClick={restartGame} className="text-accent hover:underline">
                restart
              </button>
              <button type="button" onClick={endGame} className="text-muted hover:text-accent">
                leave
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

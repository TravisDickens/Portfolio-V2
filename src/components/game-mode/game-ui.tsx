"use client";

import { coins } from "@/lib/data";
import { useGameMode } from "./game-mode-provider";

export function GameUi() {
  const { status, collected, endGame, restartGame } = useGameMode();

  return (
    <div className="pointer-events-none absolute inset-0 z-[60] p-4 sm:p-6">
      <div className="flex items-start justify-between font-mono text-xs text-accent sm:text-sm">
        <p>
          coins {collected.length}/{coins.length}
        </p>
        <p>esc to leave</p>
      </div>

      {status === "playing" ? (
        <p className="pointer-events-none absolute bottom-6 left-4 font-mono text-xs text-muted sm:left-6">
          arrows / a d to move · space to jump
        </p>
      ) : null}

      {status === "won" || status === "lost" ? (
        <div className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-[var(--bg)]/70">
          <div className="bg-surface max-w-sm p-8 text-center">
            <p className="font-serif text-3xl">
              {status === "won" ? "all coins collected" : "clipped a crate"}
            </p>
            <p className="mt-3 text-sm text-muted">
              {status === "won"
                ? "Cleared the course. Nice."
                : "Jump the crates and barriers. Try again."}
            </p>
            <div className="mt-6 flex justify-center gap-6 font-mono text-sm">
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

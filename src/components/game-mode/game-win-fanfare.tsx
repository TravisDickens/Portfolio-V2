"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "./game-mode-provider";

const COIN_COUNT = 28;

function makeCoins() {
  return Array.from({ length: COIN_COUNT }, (_, i) => ({
    id: i,
    left: 2 + ((i * 37) % 96),
    delay: (i % 10) * 0.11,
    duration: 2.3 + (i % 7) * 0.2,
    size: 16 + (i % 5) * 4,
    drift: (i % 2 === 0 ? 1 : -1) * (10 + (i % 6) * 8),
    spin: 360 + (i % 4) * 180,
  }));
}

export function GameWinFanfare() {
  const { endGame, restartGame, reducedMotion } = useGameMode();
  const [showCard, setShowCard] = useState(reducedMotion);
  const coins = useMemo(makeCoins, []);

  useEffect(() => {
    if (reducedMotion) {
      setShowCard(true);
      return;
    }
    const timer = window.setTimeout(() => setShowCard(true), 1100);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <div className="pointer-events-auto absolute inset-0 overflow-hidden bg-[var(--bg)]/70">
      {!reducedMotion
        ? coins.map((coin) => (
            <img
              key={coin.id}
              src="/game/coin.svg"
              alt=""
              aria-hidden="true"
              className="game-coin-rain pointer-events-none absolute top-0"
              style={{
                left: `${coin.left}%`,
                width: coin.size,
                height: coin.size,
                animationDelay: `${coin.delay}s`,
                animationDuration: `${coin.duration}s`,
                ["--coin-drift" as string]: `${coin.drift}px`,
                ["--coin-spin" as string]: `${coin.spin}deg`,
              }}
            />
          ))
        : null}

      <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-6 px-4">
        <motion.img
          src="/game/runner-jump.svg"
          alt=""
          aria-hidden="true"
          className="h-24 w-auto sm:h-32"
          initial={reducedMotion ? false : { scale: 0.35, y: 28, opacity: 0 }}
          animate={{
            scale: 1,
            y: showCard ? -8 : 0,
            opacity: 1,
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 320, damping: 16 }
          }
        />

        {showCard ? (
          <motion.div
            className="bg-surface relative z-[2] max-w-sm p-8 text-center"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.35 }}
          >
            <p className="font-serif text-3xl">all coins collected</p>
            <p className="mt-3 text-sm text-muted">You ran the whole course.</p>
            <div className="mt-6 flex justify-center gap-6 font-mono text-sm">
              <button type="button" onClick={restartGame} className="text-accent hover:underline">
                restart
              </button>
              <button type="button" onClick={endGame} className="text-muted hover:text-accent">
                leave
              </button>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { coins } from "@/lib/data";

export type GameStatus = "idle" | "playing" | "won" | "lost";

type GameModeContextValue = {
  isPlaying: boolean;
  status: GameStatus;
  collected: string[];
  reducedMotion: boolean;
  startGame: () => void;
  endGame: () => void;
  restartGame: () => void;
  collectPacket: (id: string) => void;
  loseGame: () => void;
};

const GameModeContext = createContext<GameModeContextValue | null>(null);

export function GameModeProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [collected, setCollected] = useState<string[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const startGame = useCallback(() => {
    if (reducedMotion) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    setCollected([]);
    setStatus("playing");
    document.body.classList.add("game-locked");
  }, [reducedMotion]);

  const endGame = useCallback(() => {
    setStatus("idle");
    setCollected([]);
    document.body.classList.remove("game-locked");
  }, []);

  const restartGame = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setCollected([]);
    setStatus("playing");
    document.body.classList.add("game-locked");
  }, []);

  const collectPacket = useCallback((id: string) => {
    setCollected((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      if (next.length >= coins.length) {
        setStatus("won");
      }
      return next;
    });
  }, []);

  const loseGame = useCallback(() => {
    setStatus("lost");
  }, []);

  useEffect(() => {
    if (status === "idle") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        endGame();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, endGame]);

  useEffect(() => {
    return () => document.body.classList.remove("game-locked");
  }, []);

  const value = useMemo(
    () => ({
      isPlaying: status === "playing",
      status,
      collected,
      reducedMotion,
      startGame,
      endGame,
      restartGame,
      collectPacket,
      loseGame,
    }),
    [
      status,
      collected,
      reducedMotion,
      startGame,
      endGame,
      restartGame,
      collectPacket,
      loseGame,
    ],
  );

  return (
    <GameModeContext.Provider value={value}>{children}</GameModeContext.Provider>
  );
}

export function useGameMode() {
  const ctx = useContext(GameModeContext);
  if (!ctx) {
    throw new Error("useGameMode must be used within GameModeProvider");
  }
  return ctx;
}

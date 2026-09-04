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
import { WORLDS, WORLD_SECTIONS } from "./game-physics";

export type GameStatus = "idle" | "playing" | "won" | "lost";

type GameModeContextValue = {
  isPlaying: boolean;
  status: GameStatus;
  collected: string[];
  worldIndex: number;
  runId: number;
  reducedMotion: boolean;
  startGame: () => void;
  endGame: () => void;
  restartGame: () => void;
  retryWorld: () => void;
  collectPacket: (id: string) => void;
  loseGame: () => void;
};

const GameModeContext = createContext<GameModeContextValue | null>(null);

function scrollToWorld(index: number) {
  const selector = WORLD_SECTIONS[index];
  if (!selector) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function GameModeProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [collected, setCollected] = useState<string[]>([]);
  const [worldIndex, setWorldIndex] = useState(0);
  const [runId, setRunId] = useState(0);
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
    window.scrollTo({ top: 0, behavior: "auto" });
    setCollected([]);
    setWorldIndex(0);
    setRunId((n) => n + 1);
    setStatus("playing");
    document.body.classList.add("game-locked");
  }, [reducedMotion]);

  const endGame = useCallback(() => {
    setStatus("idle");
    setCollected([]);
    setWorldIndex(0);
    document.body.classList.remove("game-locked");
  }, []);

  const restartGame = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setCollected([]);
    setWorldIndex(0);
    setRunId((n) => n + 1);
    setStatus("playing");
    document.body.classList.add("game-locked");
  }, []);

  const retryWorld = useCallback(() => {
    setCollected([]);
    setRunId((n) => n + 1);
    setStatus("playing");
    document.body.classList.add("game-locked");
  }, []);

  const collectPacket = useCallback((id: string) => {
    setCollected((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const loseGame = useCallback(() => {
    setStatus("lost");
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    const needed = WORLDS[worldIndex].coinCount;
    if (collected.length < needed) return;

    const timer = window.setTimeout(() => {
      if (worldIndex >= WORLDS.length - 1) {
        setStatus("won");
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const next = worldIndex + 1;
      setWorldIndex(next);
      setCollected([]);
      setRunId((n) => n + 1);
      scrollToWorld(next - 1);
    }, 550);

    return () => window.clearTimeout(timer);
  }, [collected, worldIndex, status]);

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
      worldIndex,
      runId,
      reducedMotion,
      startGame,
      endGame,
      restartGame,
      retryWorld,
      collectPacket,
      loseGame,
    }),
    [
      status,
      collected,
      worldIndex,
      runId,
      reducedMotion,
      startGame,
      endGame,
      restartGame,
      retryWorld,
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

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className={cn(
          "h-10 w-10 rounded-full border border-black/10 bg-white/80 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur",
          "dark:border-white/10 dark:bg-white/5 dark:shadow-black/30 dark:ring-white/5",
          className,
        )}
      />
    );
  }

  const isDark = (theme || resolvedTheme) === "dark";

  return (
    <motion.button
      aria-label="Toggle theme"
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-slate-800 backdrop-blur transition hover:border-black/20 hover:bg-white",
        "shadow-lg shadow-black/5 ring-1 ring-black/5",
        "dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:shadow-black/30 dark:ring-white/5 dark:hover:border-white/30 dark:hover:bg-white/10",
        className,
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.94 }}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ opacity: 0, rotate: -10, scale: 0.85 }}
        animate={{ opacity: mounted ? 1 : 0, rotate: 0, scale: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.div>
    </motion.button>
  );
}

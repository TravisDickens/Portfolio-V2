"use client";

import { useEffect, useState } from "react";
import { hero } from "@/lib/data";

export function TypingHero() {
  const [fragmentIndex, setFragmentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const fragment = hero.fragments[fragmentIndex];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCharIndex(fragment.length);
      return;
    }

    const delay = deleting ? 45 : charIndex === fragment.length ? 1400 : 90;
    const timer = window.setTimeout(() => {
      if (!deleting && charIndex < fragment.length) {
        setCharIndex((n) => n + 1);
        return;
      }
      if (!deleting && charIndex === fragment.length) {
        setDeleting(true);
        return;
      }
      if (deleting && charIndex > 0) {
        setCharIndex((n) => n - 1);
        return;
      }
      setDeleting(false);
      setFragmentIndex((i) => (i + 1) % hero.fragments.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, deleting, fragment, fragmentIndex]);

  return (
    <p className="font-mono text-sm text-muted sm:text-base" aria-live="polite">
      <span>{hero.prefix} </span>
      <span className="text-accent">{fragment.slice(0, charIndex)}</span>
      <span className="cursor-blink" aria-hidden />
    </p>
  );
}

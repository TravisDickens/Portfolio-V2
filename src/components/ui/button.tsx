"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "ghost";
};

const buttonStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "relative overflow-hidden rounded-full bg-linear-to-r from-zinc-50/90 via-white/80 to-zinc-200/90 px-5 py-2.5 font-medium text-zinc-900 shadow-[0_10px_60px_-12px_rgba(255,255,255,0.6)] transition hover:from-white hover:to-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700 dark:text-white dark:shadow-[0_10px_80px_-12px_rgba(0,0,0,0.45)]",
  ghost:
    "rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-black/10 backdrop-blur transition hover:border-black/20 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:shadow-black/20 dark:hover:border-white/30 dark:hover:bg-white/10",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = "primary", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonStyles[variant], className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

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
    "inline-flex items-center border border-hairline bg-transparent px-4 py-2 text-sm font-medium transition hover:text-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]",
  ghost:
    "inline-flex items-center px-2 py-1 text-sm text-muted transition hover:text-[var(--fg)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]",
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

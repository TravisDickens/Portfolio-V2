"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/70 px-4 py-3 backdrop-blur-xl shadow-[0_20px_80px_-24px_rgba(0,0,0,0.25)] ring-1 ring-white/5 dark:bg-zinc-950/70">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-white/10 via-white/5 to-white/0 text-sm font-semibold text-white shadow-inner shadow-white/10">
              TD
            </div>
            <div className="leading-tight text-sm text-zinc-800 dark:text-zinc-200">
              <p className="font-semibold tracking-tight text-slate-900 dark:text-white">Travis Dickens</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Junior Software Engineer · AI/ML</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-zinc-800 dark:text-zinc-200 md:flex">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="group relative inline-flex items-center gap-1 px-1 py-1 font-medium tracking-tight text-zinc-800 transition hover:text-black dark:text-zinc-200 dark:hover:text-white"
                whileHover={{ y: -1 }}
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-1 h-[1.5px] origin-left scale-x-0 rounded-full bg-white/60 transition duration-200 group-hover:scale-x-100" />
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 text-zinc-300 sm:flex">
              <IconLink href="https://github.com/TravisDickens" ariaLabel="GitHub">
                <Github className="h-4 w-4" />
              </IconLink>
              <IconLink href="https://www.linkedin.com/in/travis-dickens-010a84250" ariaLabel="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </IconLink>
            </div>
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/Travis%20Dickens%20CV.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function IconLink({
  href,
  children,
  ariaLabel,
  className,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-slate-800 transition hover:border-black/20 hover:bg-white/80",
        "dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-white/30 dark:hover:bg-white/10",
        className,
      )}
    >
      {children}
    </a>
  );
}

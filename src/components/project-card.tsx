"use client";

import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ translateY: -6, scale: 1.01 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/80 p-px shadow-[0_30px_120px_-60px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_120px_-40px_rgba(0,0,0,0.8)]"
    >
      <div className="relative h-full rounded-[28px] bg-linear-to-br from-white/8 via-white/5 to-white/2 p-6 sm:p-8 dark:from-white/6 dark:via-white/4 dark:to-white/2">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(60,220,255,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.14),transparent_30%)]" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <IconLink href={project.github} label="GitHub">
                <Github className="h-4 w-4" />
              </IconLink>
              <IconLink href={project.demo} label="Live demo">
                <ExternalLink className="h-4 w-4" />
              </IconLink>
            </div>
          </div>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-slate-800 shadow-inner shadow-black/5 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:shadow-white/5"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-slate-800 transition hover:border-black/20 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:border-white/40 dark:hover:bg-white/10"
      target="_blank"
    >
      {children}
    </Link>
  );
}

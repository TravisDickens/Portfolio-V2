"use client";

import { useRef } from "react";
import Link from "next/link";
import { featuredProjects } from "@/lib/data";

export function ProjectStrip() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * (node.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-4 font-mono text-sm">
        <button type="button" onClick={() => scrollBy(-1)} className="text-muted hover:text-accent">
          prev
        </button>
        <button type="button" onClick={() => scrollBy(1)} className="text-muted hover:text-accent">
          next
        </button>
      </div>
      <div ref={scroller} className="project-strip">
        {featuredProjects.map((project, index) => (
          <article
            key={project.title}
            className="project-strip-item bg-surface p-6 sm:p-8"
          >
            <p className="font-mono text-3xl text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-serif text-2xl tracking-tight">{project.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{project.shortDescription}</p>
            <p className="mt-4 font-mono text-xs text-muted">{project.tech.join(" · ")}</p>
            <div className="mt-5 flex gap-4 text-sm">
              {project.github ? (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-muted"
                >
                  GitHub
                </Link>
              ) : null}
              {project.demo ? (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-muted"
                >
                  Live site
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

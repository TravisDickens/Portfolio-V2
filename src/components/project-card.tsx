import Link from "next/link";
import type { Project } from "@/lib/data";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="grid gap-4 border-t border-hairline py-8 sm:grid-cols-[4rem_1fr] sm:gap-8">
      <p className="font-mono text-sm text-accent">{number}</p>
      <div className="space-y-3">
        <h3 className="font-serif text-xl tracking-tight">{project.title}</h3>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {project.shortDescription}
        </p>
        <p className="font-mono text-xs text-muted">{project.tech.join(" · ")}</p>
        <div className="flex flex-wrap gap-4 text-sm">
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
      </div>
    </article>
  );
}

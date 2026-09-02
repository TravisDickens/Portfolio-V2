"use client";

import { useState } from "react";
import { experience } from "@/lib/data";

export function ExperienceTabs() {
  const [active, setActive] = useState(0);
  const role = experience[active];

  return (
    <div className="grid gap-8 sm:grid-cols-[13rem_1fr]">
      <div className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible" role="tablist">
        {experience.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.role}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(index)}
              className={`shrink-0 border-l-2 px-4 py-3 text-left text-sm transition ${
                isActive
                  ? "border-accent bg-accent-soft text-[var(--fg)]"
                  : "border-hairline text-muted hover:text-[var(--fg)]"
              }`}
            >
              {item.role}
            </button>
          );
        })}
      </div>

      <article>
        <p className="font-mono text-sm text-muted">{role.period}</p>
        <h3 className="mt-2 font-serif text-2xl">{role.role}</h3>
        <p className="mt-1 text-muted">{role.company}</p>
        <p className="mt-4 leading-relaxed text-muted">{role.summary}</p>
        {role.highlights.length > 0 ? (
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
            {role.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-accent" aria-hidden>
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { education, hero, projects } from "@/lib/data";

type TreeNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  href?: string;
  root?: boolean;
};

type Edge = {
  from: string;
  to: string;
};

const PREORDER = ["n0", "n1", "n3", "n4", "n2", "n5", "n6", "n7", "n8"];

export function HeroTree() {
  const [visit, setVisit] = useState(-1);
  const studyLabel = education[0]?.badge
    ? "study · distinction"
    : "study";

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let step = 0;
    const id = window.setInterval(() => {
      if (step >= PREORDER.length) {
        window.clearInterval(id);
        window.setTimeout(() => setVisit(-1), 420);
        return;
      }
      setVisit(step);
      step += 1;
    }, 400);

    return () => window.clearInterval(id);
  }, []);

  const nodes: TreeNode[] = [
    { id: "n0", x: 178, y: 8, w: 164, h: 34, label: hero.name, root: true },
    {
      id: "n1",
      x: 16,
      y: 94,
      w: 168,
      h: 30,
      label: `work · ${hero.currentRole.title}`,
      href: "#work",
    },
    {
      id: "n2",
      x: 300,
      y: 94,
      w: 148,
      h: 30,
      label: `build · ${projects.length} projects`,
      href: "#projects",
    },
    {
      id: "n3",
      x: 4,
      y: 172,
      w: 108,
      h: 26,
      label: hero.currentRole.company,
      href: "#work",
    },
    {
      id: "n4",
      x: 124,
      y: 172,
      w: 132,
      h: 26,
      label: studyLabel,
      href: "#education",
    },
    {
      id: "n5",
      x: 276,
      y: 172,
      w: 72,
      h: 26,
      label: "fraud",
      href: "#projects",
    },
    {
      id: "n6",
      x: 372,
      y: 172,
      w: 72,
      h: 26,
      label: "more",
      href: "#projects",
    },
    {
      id: "n7",
      x: 332,
      y: 246,
      w: 68,
      h: 24,
      label: "fleet",
      href: "#projects",
    },
    {
      id: "n8",
      x: 416,
      y: 246,
      w: 68,
      h: 24,
      label: "stock",
      href: "#projects",
    },
  ];

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const edges: Edge[] = [
    { from: "n0", to: "n1" },
    { from: "n0", to: "n2" },
    { from: "n1", to: "n3" },
    { from: "n1", to: "n4" },
    { from: "n2", to: "n5" },
    { from: "n2", to: "n6" },
    { from: "n6", to: "n7" },
    { from: "n6", to: "n8" },
  ];

  return (
    <svg
      viewBox="0 0 500 286"
      role="img"
      aria-label="Profile tree of work, projects, and education"
      className="h-auto w-full max-w-lg font-mono"
    >
      <g aria-hidden>
        {edges.map((edge) => {
          const a = byId[edge.from];
          const b = byId[edge.to];
          const x1 = a.x + a.w / 2;
          const y1 = a.y + a.h;
          const x2 = b.x + b.w / 2;
          const y2 = b.y;
          const midY = y1 + (y2 - y1) / 2;
          return (
            <path
              key={`${edge.from}-${edge.to}`}
              d={`M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.4"
              strokeWidth="1.25"
            />
          );
        })}
      </g>

      {nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          visiting={visit >= 0 && PREORDER[visit] === node.id}
        />
      ))}
    </svg>
  );
}

function Node({ node, visiting }: { node: TreeNode; visiting: boolean }) {
  const textY = node.y + node.h / 2 + 4;
  const body = (
    <g className={visiting ? "tree-node tree-visit" : "tree-node"}>
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx="2"
        className="tree-node-chip"
      />
      <text
        x={node.x + node.w / 2}
        y={textY}
        textAnchor="middle"
        className={node.root ? "tree-node-root" : "tree-node-label"}
      >
        {node.label}
      </text>
    </g>
  );

  if (node.href) {
    return (
      <a href={node.href} className="tree-node-link">
        {body}
      </a>
    );
  }

  return body;
}

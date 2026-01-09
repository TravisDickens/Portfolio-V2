import { cn } from "@/lib/utils";

export function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "text-center mx-auto max-w-3xl",
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
        {kicker}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
      ) : null}
    </div>
  );
}

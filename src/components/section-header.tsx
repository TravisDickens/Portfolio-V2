import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  description,
  align = "left",
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "mx-auto max-w-3xl text-center",
      )}
    >
      <h2 className="section-title font-serif text-3xl tracking-tight md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}

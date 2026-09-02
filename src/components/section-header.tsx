export function SectionHeader({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-sm text-accent">
        {index} — {title}
      </p>
      <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{title}</h2>
      {description ? (
        <p className="text-lg leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}

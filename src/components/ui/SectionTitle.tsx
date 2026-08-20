import { cn } from "@/lib/utils";

const colorClasses = {
  ink: "text-ink",
  magenta: "text-magenta",
  green: "text-green",
  orange: "text-orange",
  purple: "text-purple",
} as const;

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  color?: keyof typeof colorClasses;
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  color = "ink",
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-8 md:mb-12", className)}>
      {eyebrow ? (
        <p className="font-display text-magenta text-sm md:text-base mb-1 tracking-widest">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display uppercase leading-[0.95]",
          colorClasses[color],
        )}
        style={{ fontSize: "clamp(1.6rem, 6vw, 3rem)" }}
      >
        {title}
      </h2>
    </div>
  );
}

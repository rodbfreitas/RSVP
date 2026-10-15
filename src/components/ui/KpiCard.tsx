import { cn } from "@/lib/utils";

const colorClasses = {
  ink: "text-ink",
  magenta: "text-magenta",
  green: "text-green",
  orange: "text-orange",
  yellow: "text-yellow",
  purple: "text-purple",
} as const;

interface KpiCardProps {
  value: number | string;
  label: string;
  color?: keyof typeof colorClasses;
  rotate?: number;
}

export function KpiCard({ value, label, color = "ink", rotate = 0 }: KpiCardProps) {
  return (
    <div
      className={cn(
        "poster-card bracket px-4 py-4 md:px-5 md:py-5",
        colorClasses[color],
      )}
      data-rotate={rotate}
    >
      <p className="font-mono font-bold" style={{ fontSize: "clamp(1.8rem, 6vw, 2.5rem)" }}>
        {value}
      </p>
      <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}

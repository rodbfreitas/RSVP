import { cn } from "@/lib/utils";

const colorClasses = {
  ink: "bg-ink text-paper-light",
  magenta: "bg-magenta text-paper-light",
  green: "bg-green text-paper-light",
  orange: "bg-orange text-ink",
  yellow: "bg-yellow text-ink",
  purple: "bg-purple text-paper-light",
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
        "border-[3px] border-ink shadow-hard-sm px-4 py-4 md:px-5 md:py-5",
        colorClasses[color],
      )}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <p className="font-display" style={{ fontSize: "clamp(1.8rem, 6vw, 2.5rem)" }}>
        {value}
      </p>
      <p className="text-xs md:text-sm font-bold uppercase tracking-wide opacity-90">
        {label}
      </p>
    </div>
  );
}

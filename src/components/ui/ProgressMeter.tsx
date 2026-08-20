import { cn } from "@/lib/utils";

interface ProgressMeterProps {
  value: number;
  target: number;
  label: string;
  sublabel?: string;
  className?: string;
}

/** Barra de progresso não depende só de cor — sempre mostra número + texto de estado. */
export function ProgressMeter({
  value,
  target,
  label,
  sublabel,
  className,
}: ProgressMeterProps) {
  const pct = target > 0 ? Math.min(100, (value / target) * 100) : 0;
  const state =
    value >= target
      ? { text: "META ATINGIDA! 🎉", color: "bg-green" }
      : pct >= 80
        ? { text: "QUASE LÁ", color: "bg-yellow" }
        : { text: "BORA CHAMAR MAIS GENTE", color: "bg-orange" };

  return (
    <div className={cn("poster-card p-5 md:p-6", className)}>
      <p className="font-display text-magenta text-sm tracking-widest mb-1">
        {label}
      </p>
      <div className="flex items-baseline gap-2 mb-3">
        <span
          className="font-display text-ink"
          style={{ fontSize: "clamp(2.5rem, 11vw, 4rem)" }}
        >
          {value}
        </span>
        <span className="font-display text-ink/50 text-2xl md:text-3xl">
          / {target}
        </span>
      </div>
      <div
        className="h-5 w-full border-[3px] border-ink bg-paper overflow-hidden"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={target}
        aria-label={label}
      >
        <div
          className={cn("h-full transition-all", state.color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs md:text-sm font-bold uppercase">
          {state.text}
        </span>
        {sublabel ? (
          <span className="text-xs md:text-sm text-ink/70">{sublabel}</span>
        ) : null}
      </div>
    </div>
  );
}

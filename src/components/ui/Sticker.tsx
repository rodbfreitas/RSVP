import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const colorClasses = {
  ink: "bg-ink text-paper-light",
  magenta: "bg-magenta text-paper-light",
  green: "bg-green text-paper-light",
  orange: "bg-orange text-paper",
  yellow: "bg-yellow text-paper",
  purple: "bg-purple text-paper-light",
  paper: "bg-paper-light text-ink",
} as const;

interface StickerProps {
  children: ReactNode;
  color?: keyof typeof colorClasses;
  rotate?: number;
  className?: string;
}

/** Etiqueta/adesivo — pequena rotação, borda gráfica, nunca radius arredondado. */
export function Sticker({
  children,
  color = "ink",
  rotate = 0,
  className,
}: StickerProps) {
  return (
    <span
      className={cn(
        "inline-block border border-line rounded-[4px] px-3 py-1 font-mono text-xs md:text-sm font-medium uppercase tracking-wide",
        colorClasses[color],
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PosterCardProps {
  children: ReactNode;
  className?: string;
  rotate?: number;
}

/** Cartão com aparência de recorte de cartaz/etiqueta colada. */
export function PosterCard({ children, className, rotate = 0 }: PosterCardProps) {
  return (
    <div
      className={cn("poster-card p-6", className)}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Color = "ink" | "magenta" | "green" | "orange" | "purple" | "paper";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  color?: Color;
  loading?: boolean;
  fullWidth?: boolean;
}

const colorClasses: Record<Color, string> = {
  ink: "bg-ink text-white hover:bg-risk-crit",
  magenta: "bg-ink text-white hover:bg-risk-crit",
  green: "bg-ink text-white hover:bg-risk-crit",
  orange: "bg-ink text-white hover:bg-risk-crit",
  purple: "bg-ink text-white hover:bg-risk-crit",
  paper: "bg-white text-ink hover:bg-risk-mod",
};

const BASE =
  "font-medium inline-flex items-center justify-center gap-2 border-0 min-h-[56px] md:min-h-[64px] px-6 text-base md:text-lg transition-all duration-150 ease-[cubic-bezier(.2,.8,.2,1)] focus-ring disabled:opacity-50 disabled:pointer-events-none select-none";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "shadow-hard hover:shadow-hard-lg active:shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0",
  secondary:
    "bg-black/[0.07] text-ink hover:bg-black/[0.14] active:scale-[0.97]",
  outline: "bg-transparent text-ink border-line hover:bg-ink/5",
  ghost: "border-transparent shadow-none hover:bg-ink/5",
};

/** Gera as classes do botão — usado tanto por <Button> quanto por <a> estilizados como botão (ex.: LocationButton). */
export function buttonClasses({
  variant = "primary",
  color = "ink",
  fullWidth = false,
  className,
}: {
  variant?: Variant;
  color?: Color;
  fullWidth?: boolean;
  className?: string;
} = {}) {
  return cn(
    BASE,
    variant === "primary" ? colorClasses[color] : undefined,
    VARIANT_CLASSES[variant],
    fullWidth && "w-full",
    className,
  );
}

export function Button({
  variant = "primary",
  color = "ink",
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, color, fullWidth, className })}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" size={22} aria-hidden /> : null}
      {children}
    </button>
  );
}

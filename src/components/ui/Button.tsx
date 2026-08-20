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
  ink: "bg-ink text-paper-light",
  magenta: "bg-magenta text-paper-light",
  green: "bg-green text-paper-light",
  orange: "bg-orange text-ink",
  purple: "bg-purple text-paper-light",
  paper: "bg-paper-light text-ink",
};

const BASE =
  "font-display uppercase tracking-wide inline-flex items-center justify-center gap-2 border-[3px] border-ink min-h-[56px] md:min-h-[64px] px-6 text-lg md:text-xl transition-all duration-150 ease-[cubic-bezier(.2,.8,.2,1)] focus-ring disabled:opacity-50 disabled:pointer-events-none select-none";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "shadow-hard hover:shadow-hard-lg active:shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 hover:-rotate-1",
  secondary:
    "bg-transparent text-ink shadow-hard hover:shadow-hard-lg active:shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5",
  outline: "bg-transparent text-ink border-ink hover:bg-ink/5",
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

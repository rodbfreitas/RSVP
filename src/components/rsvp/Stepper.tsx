"use client";

import { Minus, Plus } from "lucide-react";

export function Stepper({
  label,
  value,
  onChange,
  min = 1,
  max = 30,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <label className="block text-sm md:text-base font-bold uppercase mb-2">
        {label}
      </label>
      <div className="flex items-center border-[3px] border-ink w-fit">
        <button
          type="button"
          aria-label="Diminuir"
          className="h-13 w-13 min-h-[52px] min-w-[52px] flex items-center justify-center hover:bg-ink/5 focus-ring disabled:opacity-40"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus size={20} aria-hidden />
        </button>
        <span
          className="font-display text-2xl w-16 text-center"
          aria-live="polite"
        >
          {value}
        </span>
        <button
          type="button"
          aria-label="Aumentar"
          className="h-13 w-13 min-h-[52px] min-w-[52px] flex items-center justify-center hover:bg-ink/5 focus-ring disabled:opacity-40"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          <Plus size={20} aria-hidden />
        </button>
      </div>
    </div>
  );
}

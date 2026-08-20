"use client";

import { cn } from "@/lib/utils";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface StepButtonsProps<T extends string> {
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
}

/** Seletor SIM/TALVEZ/NÃO em botões grandes (Design System §23) em vez de radios pequenos. */
export function StepButtons<T extends string>({
  name,
  value,
  onChange,
  options,
}: StepButtonsProps<T>) {
  return (
    <div role="radiogroup" aria-label={name} className="grid grid-cols-3 gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "min-h-[52px] border-[3px] border-ink font-display uppercase text-sm md:text-base transition-all focus-ring px-2",
              active
                ? "bg-ink text-paper-light shadow-hard-sm"
                : "bg-paper-light text-ink hover:bg-ink/5",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

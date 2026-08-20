import { cn } from "@/lib/utils";
import { Check, HelpCircle, X } from "lucide-react";
import type { RsvpStatus } from "@/lib/types";

const CONFIG: Record<
  RsvpStatus,
  { label: string; classes: string; Icon: typeof Check }
> = {
  confirmed: {
    label: "CONFIRMADO",
    classes: "bg-green text-paper-light",
    Icon: Check,
  },
  maybe: {
    label: "TALVEZ",
    classes: "bg-yellow text-ink",
    Icon: HelpCircle,
  },
  declined: {
    label: "NÃO VAI",
    classes: "bg-ink/70 text-paper-light",
    Icon: X,
  },
};

export function StatusBadge({ status }: { status: RsvpStatus }) {
  const { label, classes, Icon } = CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border-[3px] border-ink px-2.5 py-1 text-xs md:text-sm font-bold uppercase",
        classes,
      )}
    >
      <Icon size={14} aria-hidden />
      {label}
    </span>
  );
}

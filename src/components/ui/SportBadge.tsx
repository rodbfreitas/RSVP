import { cn } from "@/lib/utils";

export function SportBadge({
  name,
  selected = false,
  className,
}: {
  name: string;
  selected?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] border border-line px-3 py-1.5 text-sm md:text-base font-bold uppercase transition-colors",
        selected ? "bg-green/15 text-green border-green" : "bg-paper-light text-ink",
        className,
      )}
    >
      {name}
    </span>
  );
}

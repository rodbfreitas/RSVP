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
        "inline-flex items-center border-[3px] border-ink px-3 py-1.5 text-sm md:text-base font-bold uppercase transition-colors",
        selected ? "bg-green text-paper-light" : "bg-paper-light text-ink",
        className,
      )}
    >
      {name}
    </span>
  );
}

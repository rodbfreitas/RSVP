import { PartyPopper } from "lucide-react";

export function ConfirmStamp({ label = "CONFIRMADO" }: { label?: string }) {
  return (
    <div className="stamp animate-stamp bg-green text-paper-light px-6 py-3 gap-2">
      <PartyPopper size={22} aria-hidden />
      <span className="font-display text-xl md:text-2xl tracking-wide">
        {label}
      </span>
    </div>
  );
}

import { ShieldCheck } from "lucide-react";

export function ConfirmStamp({ label = "CONFIRMADO" }: { label?: string }) {
  return (
    <div className="stamp animate-stamp bg-green/10 text-green px-6 py-3 gap-2">
      <ShieldCheck size={22} aria-hidden />
      <span className="font-mono font-bold text-lg md:text-2xl tracking-wide">
        {label}
      </span>
    </div>
  );
}

import { EVENT } from "@/lib/constants";
import { LocationButton } from "@/components/ui/ActionButtons";

export function Footer() {
  return (
    <footer className="relative py-16 md:py-24 px-5 md:px-8 border-t border-line bg-paper-light/60">
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="font-mono text-green text-xs md:text-sm mb-3 tracking-widest">{"// NOS VEMOS LÁ"}</p>
        <h2
          className="font-display uppercase mb-2"
          style={{ fontSize: "clamp(2rem, 9vw, 4rem)" }}
        >
          Bora fechar 2026 juntos!
        </h2>
        <p className="text-muted mb-8 text-base md:text-lg">
          {EVENT.dateLabel} · {EVENT.venue} · {EVENT.address}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <LocationButton />
        </div>

        <p className="font-mono text-xs text-muted">
          {EVENT.code} · {EVENT.name} © {new Date(EVENT.dateISO).getFullYear()}
        </p>
      </div>
    </footer>
  );
}

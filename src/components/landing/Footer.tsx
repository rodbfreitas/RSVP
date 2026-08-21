import { EVENT } from "@/lib/constants";
import { LocationButton } from "@/components/ui/ActionButtons";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="relative py-16 md:py-24 px-5 md:px-8 bg-ink text-paper-light">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2
          className="font-display uppercase mb-2"
          style={{ fontSize: "clamp(2rem, 9vw, 4rem)" }}
        >
          Bora pro pagode?
        </h2>
        <p className="text-paper-light/70 mb-8 text-base md:text-lg">
          {EVENT.dateLabel} · {EVENT.venue} · {EVENT.address}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/rsvp"
            className={buttonClasses({ variant: "primary", color: "magenta" })}
          >
            CONFIRMAR PRESENÇA ✅
          </Link>
          <LocationButton className="!text-paper-light !border-paper-light" />
        </div>

        <p className="text-xs md:text-sm text-paper-light/50">
          Pagode dos Irmãos © {new Date(EVENT.dateISO).getFullYear()} ·
          Rodrigo 43 &amp; Gabriel 30
        </p>
      </div>
    </footer>
  );
}

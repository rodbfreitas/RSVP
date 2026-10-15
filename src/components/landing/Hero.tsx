import Link from "next/link";
import { EVENT } from "@/lib/constants";
import { buttonClasses } from "@/components/ui/Button";
import { HeroArt } from "@/components/landing/HeroArt";
import { ChevronDown, CalendarDays, Clock, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-14 pb-14 md:pb-20 px-5 md:px-8">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-6 md:gap-12 items-center">
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-light/80 px-3 py-1 mb-5 font-mono text-[11px] md:text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            {EVENT.code} · STATUS: CONVOCAÇÃO ABERTA
          </div>

          <h1 className="font-display leading-[0.95] mb-4">
            <span
              className="block text-muted font-medium"
              style={{ fontSize: "clamp(1.4rem, 6vw, 2.4rem)" }}
            >
              Encontro da
            </span>
            <span
              className="block uppercase"
              style={{ fontSize: "clamp(2.5rem, 12vw, 5.2rem)" }}
            >
              Governança
            </span>
            <span
              className="block uppercase text-green"
              style={{ fontSize: "clamp(1.9rem, 9vw, 3.9rem)" }}
            >
              de Segurança
            </span>
          </h1>

          <p className="font-mono text-sm md:text-base text-muted mb-6 caret">
            &gt; fechamento_2026 --com-quadra --com-resenha
          </p>

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-7 text-left max-w-xl mx-auto lg:mx-0">
            <div className="poster-card bracket px-4 py-3">
              <dt className="flex items-center gap-1.5 font-mono text-[11px] text-muted uppercase">
                <CalendarDays size={13} aria-hidden /> Data
              </dt>
              <dd className="font-mono font-bold text-lg">{EVENT.dateLabel}</dd>
            </div>
            <div className="poster-card px-4 py-3">
              <dt className="flex items-center gap-1.5 font-mono text-[11px] text-muted uppercase">
                <Clock size={13} aria-hidden /> Horário
              </dt>
              <dd className="font-mono font-bold text-lg">{EVENT.timeLabel}</dd>
            </div>
            <div className="poster-card px-4 py-3 col-span-2 sm:col-span-1">
              <dt className="flex items-center gap-1.5 font-mono text-[11px] text-muted uppercase">
                <MapPin size={13} aria-hidden /> Local
              </dt>
              <dd className="font-bold leading-tight">
                {EVENT.venue}
                <span className="block text-xs font-normal text-muted">
                  {EVENT.neighborhood}
                </span>
              </dd>
            </div>
          </dl>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              href="/rsvp"
              className={buttonClasses({ variant: "primary", color: "green" })}
            >
              CONFIRMAR PRESENÇA →
            </Link>
            <a
              href="#programacao"
              className={buttonClasses({ variant: "secondary" })}
            >
              VER ROADMAP DO DIA
            </a>
          </div>

          <p className="font-mono text-xs md:text-sm text-orange mt-4">
            ⚠ DEADLINE DE COMPLIANCE: confirme até {EVENT.rsvpDeadlineLabel}
          </p>
        </div>

        <div className="order-1 lg:order-2 flex justify-center">
          <HeroArt className="w-full max-w-[280px] md:max-w-[440px] h-auto" />
        </div>
      </div>

      <a
        href="#programacao"
        className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-muted hover:text-ink transition-colors"
        aria-label="Ver programação"
      >
        <span className="font-mono text-xs uppercase tracking-widest">scroll</span>
        <ChevronDown size={20} aria-hidden />
      </a>
    </section>
  );
}

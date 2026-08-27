import Image from "next/image";
import Link from "next/link";
import { EVENT } from "@/lib/constants";
import { buttonClasses } from "@/components/ui/Button";
import { Sticker } from "@/components/ui/Sticker";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-14 pb-14 md:pb-20 px-5 md:px-8">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <p className="font-display text-magenta text-sm md:text-base tracking-[0.2em] mb-2">
            ★ SAVE THE DATE ★
          </p>
          <h1 className="font-display uppercase leading-[0.9] mb-3">
            <span
              className="block text-green"
              style={{ fontSize: "clamp(3.2rem, 15vw, 7rem)" }}
            >
              PAGODE
            </span>
            <span
              className="block"
              style={{ fontSize: "clamp(2.2rem, 10vw, 5rem)" }}
            >
              <span className="text-magenta">DOS </span>
              <span className="text-orange">IRMÃOS</span>
            </span>
          </h1>

          <div className="inline-block bg-ink text-paper-light font-display px-4 py-2 mb-5 -rotate-1 text-lg md:text-2xl">
            RODRIGO 43 <span className="text-yellow">&amp;</span> GABRIEL 30
          </div>

          <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
            <Sticker color="magenta" rotate={-2}>
              {EVENT.dateLabel}
            </Sticker>
            <Sticker color="green" rotate={1}>
              {EVENT.venue}
            </Sticker>
            <Sticker color="orange" rotate={-1}>
              {EVENT.neighborhood}
            </Sticker>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              href="/rsvp"
              className={buttonClasses({ variant: "primary", color: "magenta" })}
            >
              CONFIRMAR PRESENÇA ✅
            </Link>
            <a
              href="#programacao"
              className={buttonClasses({ variant: "secondary" })}
            >
              VER PROGRAMAÇÃO
            </a>
          </div>

          <p className="text-xs md:text-sm text-ink/60 mt-3">
            Confirme, de preferência, até{" "}
            <strong className="text-ink">{EVENT.rsvpDeadlineLabel}</strong>.
          </p>
        </div>

        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative max-w-[340px] md:max-w-[420px] w-full rotate-1">
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-ink -z-10" />
            <Image
              src="/assets/posters/save-the-date.webp"
              alt={`Save the date — Pagode dos Irmãos, ${EVENT.hosts}, ${EVENT.dateLabel}, ${EVENT.venue} (${EVENT.neighborhood})`}
              width={900}
              height={1600}
              priority
              className="w-full h-auto border-[3px] border-ink"
              sizes="(max-width: 768px) 90vw, 420px"
            />
          </div>
        </div>
      </div>

      <a
        href="#programacao"
        className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-ink/50 hover:text-ink transition-colors"
        aria-label="Ver programação"
      >
        <span className="text-xs uppercase tracking-widest">role pra baixo</span>
        <ChevronDown size={20} aria-hidden />
      </a>
    </section>
  );
}

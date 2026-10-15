import Link from "next/link";
import { ArrowLeft, AtSign, FileDown } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buttonClasses } from "@/components/ui/Button";
import { FOOD_TRUCKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem vai estar lá — Encontro da Governança de Segurança",
  description:
    "Food trucks e quiosques confirmados no dia do Encontro da Governança de Segurança, com cardápio resumido e o PDF completo de cada um.",
};

const textColor: Record<string, string> = {
  green: "text-green",
  orange: "text-orange",
  magenta: "text-magenta",
  purple: "text-purple",
};

const barColor: Record<string, string> = {
  green: "bg-green",
  orange: "bg-orange",
  magenta: "bg-magenta",
  purple: "bg-purple",
};

export default function ComidasPage() {
  return (
    <main className="flex-1 paper-texture relative px-5 md:px-8 py-10 md:py-16">
      <div className="max-w-[900px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-ink mb-6"
        >
          <ArrowLeft size={16} aria-hidden />
          Voltar
        </Link>

        <SectionTitle
          eyebrow="COMIDA E BEBIDA"
          title="QUEM VAI ESTAR LÁ"
          color="orange"
          className="mb-2"
        />
        <p className="text-ink/70 mb-10 max-w-xl">
          Esses são os food trucks e quiosques confirmados pra vender no dia
          da festa. É pagar direto com cada um — pix, crédito e débito. Abaixo
          vai um resumo do que cada um tem, e o link do cardápio completo em
          PDF.
        </p>

        <div className="flex flex-col gap-6 md:gap-8">
          {FOOD_TRUCKS.map((truck) => (
            <div key={truck.slug} className="poster-card overflow-hidden">
              <div className={cn("h-2", barColor[truck.color])} />
              <div className="p-5 md:p-8">
                <h2
                  className={cn(
                    "font-display uppercase text-2xl md:text-3xl mb-1",
                    textColor[truck.color],
                  )}
                >
                  {truck.name}
                </h2>
                <p className="text-sm md:text-base text-ink/70 mb-4">
                  {truck.tagline}
                </p>

                <ul className="flex flex-col gap-1.5 mb-5">
                  {truck.highlights.map((h) => (
                    <li
                      key={h.item}
                      className="flex items-baseline justify-between gap-4 text-sm md:text-base"
                    >
                      <span className="text-ink/80">{h.item}</span>
                      <span className="font-bold text-ink whitespace-nowrap">
                        {h.price}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={truck.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses({
                      variant: "secondary",
                      className: "!min-h-[48px] !text-base px-5",
                    })}
                  >
                    <FileDown size={18} aria-hidden />
                    BAIXAR CARDÁPIO COMPLETO
                  </a>
                  {"instagram" in truck && truck.instagram ? (
                    <a
                      href={`https://instagram.com/${truck.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-bold text-ink/70 hover:text-ink underline underline-offset-4"
                    >
                      <AtSign size={14} aria-hidden />
                      {truck.instagram.replace("@", "")}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs md:text-sm text-ink/50 mt-8 text-center">
          Cardápios e preços podem variar até o dia do evento.
        </p>
      </div>
    </main>
  );
}

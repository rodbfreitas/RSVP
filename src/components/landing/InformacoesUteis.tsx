import { SectionTitle } from "@/components/ui/SectionTitle";
import { EVENT, INFO_UTEIS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Baby, ParkingCircle, ShowerHead, Ticket, UtensilsCrossed, MapPin } from "lucide-react";
import type { ComponentType } from "react";

const ICONS: Record<string, ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>> = {
  ticket: Ticket,
  utensils: UtensilsCrossed,
  shower: ShowerHead,
  parking: ParkingCircle,
  baby: Baby,
};

const textColor: Record<string, string> = {
  green: "text-green",
  orange: "text-orange",
  magenta: "text-magenta",
  purple: "text-purple",
};

export function InformacoesUteis() {
  return (
    <section className="relative py-16 md:py-24 px-5 md:px-8 max-w-[1200px] mx-auto">
      <SectionTitle eyebrow="BOM SABER" title="INFORMAÇÕES ÚTEIS" color="purple" className="mb-6 md:mb-10" />

      <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
        {INFO_UTEIS.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div key={item.title} className="poster-card p-5 md:p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Icon size={22} className={cn("flex-none", textColor[item.color])} aria-hidden />
                <h3
                  className={cn(
                    "font-display uppercase text-lg md:text-xl",
                    textColor[item.color],
                  )}
                >
                  {item.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-ink/80">{item.description}</p>
              {"linkLabel" in item && item.linkLabel ? (
                <a
                  href={EVENT[item.linkUrlKey as keyof typeof EVENT] as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm md:text-base font-bold text-ink underline underline-offset-4 decoration-2 mt-1"
                >
                  <MapPin size={16} aria-hidden />
                  {item.linkLabel}
                </a>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

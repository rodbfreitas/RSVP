import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SportBadge } from "@/components/ui/SportBadge";
import { EVENT, SPORTS } from "@/lib/constants";
import { ShowerHead, Waves } from "lucide-react";

const CHECKIN_PARTNERS = [
  {
    name: "Wellhub",
    plan: "a partir do Silver+",
    logo: "/assets/partners/wellhub.webp",
  },
  {
    name: "TotalPass",
    plan: "a partir do TP3",
    logo: "/assets/partners/totalpass.webp",
  },
] as const;

export function Esportes() {
  return (
    <section className="relative py-16 md:py-24 px-5 md:px-8 max-w-[1200px] mx-auto">
      <div className="poster-card p-6 md:p-10 relative">
        <SectionTitle eyebrow="09H — 13H" title="VAI JOGAR?" color="orange" className="mb-6" />

        <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
          {SPORTS.filter((s) => s !== "Livre").map((sport) => (
            <SportBadge key={sport} name={sport} selected />
          ))}
        </div>

        <p className="font-display text-3xl md:text-4xl text-magenta mb-4">
          R${EVENT.sportsPricePerPerson} por pessoa
        </p>

        <ul className="space-y-2 mb-6 text-base md:text-lg">
          <li className="flex items-center gap-2">
            <Waves size={20} className="text-green flex-none" aria-hidden />
            Utilização das quatro quadras
          </li>
          <li className="flex items-center gap-2">
            <Waves size={20} className="text-green flex-none" aria-hidden />
            Raquetes, bolas e equipamentos inclusos
          </li>
          <li className="flex items-center gap-2">
            <ShowerHead size={20} className="text-green flex-none" aria-hidden />
            Vestiário com chuveiro — troque de roupa e fique pro pagode
          </li>
        </ul>

        <p className="text-sm md:text-base text-ink/70 mb-6">
          Não precisa reservar quadra. É só chegar e formar a galera por lá.
        </p>

        <div className="border-[3px] border-ink bg-yellow/25 px-4 py-3 md:px-5 md:py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="font-display text-sm md:text-base uppercase tracking-wide text-ink/80 flex-none">
            Também aceitamos check-in:
          </p>
          <div className="flex flex-wrap items-center gap-4 md:gap-5">
            {CHECKIN_PARTNERS.map((partner) => (
              <div key={partner.name} className="flex items-center gap-2">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={128}
                  height={128}
                  className="w-9 h-9 md:w-10 md:h-10 border-[3px] border-ink flex-none"
                />
                <span className="text-sm md:text-base font-bold text-ink leading-tight">
                  {partner.name}
                  <span className="block text-xs md:text-sm font-normal text-ink/60">
                    {partner.plan}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

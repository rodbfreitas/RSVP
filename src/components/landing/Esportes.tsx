import { SectionTitle } from "@/components/ui/SectionTitle";
import { SportBadge } from "@/components/ui/SportBadge";
import { EVENT, SPORTS } from "@/lib/constants";
import { ShowerHead, Waves } from "lucide-react";

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

        <p className="text-sm md:text-base text-ink/70">
          Não precisa reservar quadra. É só chegar e formar a galera por lá.
        </p>
      </div>
    </section>
  );
}

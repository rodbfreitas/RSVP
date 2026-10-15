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
      <div className="poster-card bracket p-6 md:p-10 relative">
        <SectionTitle eyebrow="11H — 16H · CÁRDIO QUEIMA BUCHO" title="VAI JOGAR?" color="ink" className="mb-6" />

        <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
          {SPORTS.filter((s) => s !== "Livre").map((sport) => (
            <SportBadge key={sport} name={sport} selected />
          ))}
        </div>

        <p className="font-mono font-bold text-3xl md:text-4xl text-green mb-4">
          R${EVENT.sportsPricePerPerson} por pessoa
        </p>

        <ul className="space-y-2 mb-6 text-base md:text-lg">
          <li className="flex items-center gap-2">
            <Waves size={20} className="text-green flex-none" aria-hidden />
            Quadras de areia liberadas das 11h às 16h
          </li>
          <li className="flex items-center gap-2">
            <ShowerHead size={20} className="text-green flex-none" aria-hidden />
            Vestiário com chuveiro: troque de roupa e siga pro modo livre
          </li>
        </ul>

        <p className="text-sm md:text-base text-muted mb-6">
          Sem reserva de quadra: é só chegar e montar os times por lá. Às 16h as quadras saem do ar, mas o bar segue online.
        </p>

        <div className="rounded-[6px] border border-line bg-paper/60 px-4 py-3 md:px-5 md:py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="font-mono text-xs md:text-sm uppercase tracking-wide text-muted flex-none">
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
                  className="w-9 h-9 md:w-10 md:h-10 rounded-[4px] flex-none"
                />
                <span className="text-sm md:text-base font-bold text-ink leading-tight">
                  {partner.name}
                  <span className="block text-xs md:text-sm font-normal text-muted">
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

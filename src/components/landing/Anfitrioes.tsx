import Image from "next/image";
import { Sticker } from "@/components/ui/Sticker";

export function Anfitrioes() {
  return (
    <section className="relative py-16 md:py-24 px-5 md:px-8 max-w-[1200px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="flex justify-center lg:order-2">
          <div className="relative max-w-[320px] w-full -rotate-1">
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-ink -z-10" />
            <Image
              src="/assets/posters/anfitrioes.webp"
              alt="Rodrigo e Gabriel, os aniversariantes, sorrindo lado a lado"
              width={700}
              height={1400}
              className="w-full h-auto border-[3px] border-ink"
              sizes="(max-width: 768px) 80vw, 320px"
            />
          </div>
        </div>

        <div className="text-center lg:text-left lg:order-1">
          <p className="font-display text-magenta text-sm tracking-widest mb-2">
            DOIS IRMÃOS. DUAS IDADES.
          </p>
          <h2
            className="font-display uppercase text-ink leading-[0.95] mb-4"
            style={{ fontSize: "clamp(1.8rem, 7vw, 3.2rem)" }}
          >
            Uma só resenha
          </h2>
          <p className="text-base md:text-lg text-ink/80 mb-4">
            Rodrigo completa 43 anos em 11/09 e Gabriel completa 30 em 18/09.
            Já que dois aniversários no mesmo mês pedem uma festa só, a
            comemoração vai ser junta — com esporte de manhã, boteco e pagode
            até o fim da tarde.
          </p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <Sticker color="purple" rotate={-2}>
              Aniversário do Rodrigo — 43 anos
            </Sticker>
            <Sticker color="green" rotate={2}>
              Aniversário do Gabriel — 30 anos
            </Sticker>
          </div>
        </div>
      </div>
    </section>
  );
}

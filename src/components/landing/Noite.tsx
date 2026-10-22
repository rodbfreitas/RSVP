import Image from "next/image";

/**
 * Noite — 16h às 22h. A pausa deliberada da página: uma foto grande, em
 * movimento lento, no preto da noite. As quadras fecham, o bar continua.
 */
export function Noite() {
  return (
    <section
      id="noite"
      data-ink="light"
      data-bg="var(--night)"
      aria-labelledby="noite-title"
      className="chapter ch-night pt-[clamp(96px,10vw,160px)]"
    >
      <div className="grid md:grid-cols-12 gap-6 items-end mb-8 md:mb-12">
        <h2
          id="noite-title"
          className="md:col-span-12 lg:col-span-7 display text-[length:var(--step-head)]"
          data-reveal
        >
          <span className="block">16h às 22h:</span>
          <span className="block text-risk-mod">cada um por si.</span>
        </h2>
        <p
          className="md:col-span-8 lg:col-span-5 text-[length:var(--step-lead)] leading-snug"
          data-reveal
          style={{ ["--i" as string]: 1 }}
        >
          As quadras saem do ar às 16h. O bar e os quiosques seguem abertos até
          as 22h, para quem quiser ficar.
        </p>
      </div>
      <figure className="-mx-[var(--page-margin)]" data-reveal style={{ ["--i" as string]: 2 }}>
        <div className="relative h-[62svh] md:h-[78svh] overflow-hidden">
          <Image
            src="/assets/fotos/quadra-noite.jpg"
            alt="Quadra de areia vazia à noite, iluminada por refletores, com luzes da cidade ao fundo"
            fill
            sizes="100vw"
            className="object-cover animate-[drift_24s_ease-in-out_infinite_alternate] will-change-transform"
          />
        </div>
      </figure>
      <div className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-3 -mx-[var(--page-margin)] mt-2 md:mt-3">
        <div className="relative md:col-span-4 aspect-[4/5] overflow-hidden" data-reveal>
          <Image
            src="/assets/fotos/bar-noite.jpg"
            alt="Copos de chope gelado no balcão à noite, com luzes penduradas"
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="relative md:col-span-4 aspect-[4/5] overflow-hidden" data-reveal style={{ ["--i" as string]: 1 }}>
          <Image
            src="/assets/fotos/espetinhos.jpg"
            alt="Espetinhos na brasa de uma churrasqueira"
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="relative col-span-2 md:col-span-4 aspect-[2/1] md:aspect-[4/5] overflow-hidden" data-reveal style={{ ["--i" as string]: 2 }}>
          <Image
            src="/assets/fotos/acai.jpg"
            alt="Tigela de açaí com banana e granola ao lado de duas caipirinhas"
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

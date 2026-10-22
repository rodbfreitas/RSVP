import Image from "next/image";
import Link from "next/link";
import { EVENT, RISKS } from "@/lib/constants";

const LEVEL = {
  low: { label: "Risco baixo", color: "bg-risk-low" },
  mod: { label: "Risco moderado", color: "bg-risk-mod" },
  high: { label: "Risco alto", color: "bg-risk-high" },
} as const;

/**
 * Riscos mapeados — "Accordion of filled tiles". As dúvidas de sempre,
 * escritas como um time de GRC escreveria: o risco, o nível na matriz e
 * a mitigação. Um <details> por risco, um aberto de cada vez.
 */
export function Riscos() {
  return (
    <section
      id="riscos"
      data-ink="dark"
      data-bg="var(--paper)"
      aria-labelledby="riscos-title"
      className="chapter ch-paper py-[clamp(96px,10vw,180px)]"
    >
      <div className="grid lg:grid-cols-12 gap-x-6 gap-y-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[96px]">
            <h2 id="riscos-title" className="display text-[length:var(--step-head)]" data-reveal>
              Riscos mapeados
            </h2>
            <p
              className="mt-5 text-[length:var(--step-body)] max-w-[34ch]"
              data-reveal
              style={{ ["--i" as string]: 1 }}
            >
              Oito riscos que costumam atrapalhar um dia como esse, com a
              mitigação de cada um.
            </p>
            <figure className="mt-8 hidden lg:block" data-reveal style={{ ["--i" as string]: 2 }}>
              <div className="overflow-hidden">
                <Image
                  src="/assets/fotos/reuniao.jpg"
                  alt="Mesa de reunião vista de cima, com uma matriz de risco impressa em verde, amarelo, laranja e vermelho, post-its e xícaras de café"
                  width={1200}
                  height={800}
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="mt-2 text-[length:var(--step-small)]">
                9h: a reunião de fechamento abre o dia.
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-2">
          {RISKS.map((r, i) => {
            const lv = LEVEL[r.level];
            const href =
              "href" in r
                ? r.href
                : "linkUrlKey" in r
                  ? (EVENT[r.linkUrlKey as keyof typeof EVENT] as string)
                  : null;
            const external = href?.startsWith("http");
            return (
              <details
                key={r.risk}
                name="riscos"
                open={i === 0}
                className="risk group bg-surface-2 open:bg-ink open:text-white transition-colors duration-300"
                data-reveal
                style={{ ["--i" as string]: Math.min(i, 5) }}
              >
                <summary className="flex items-center gap-4 min-h-[72px] px-5 md:px-6 py-4 cursor-pointer select-none">
                  <span className={`flex-none w-5 h-5 ${lv.color}`} aria-hidden />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[length:var(--step-body)] font-bold leading-tight">
                      {r.risk}
                    </span>
                    <span className="block text-[length:var(--step-small)] mt-0.5">{lv.label}</span>
                  </span>
                  <span className="relative flex-none w-4 h-4" aria-hidden>
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[3px] bg-current" />
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 h-4 w-[3px] bg-current transition-transform duration-300 group-open:rotate-90 group-open:scale-y-0" />
                  </span>
                </summary>
                <div className="px-5 md:px-6 pb-6 pl-[3.25rem] md:pl-[3.75rem] max-w-[60ch] text-[length:var(--step-body)]">
                  <p>
                    <strong className="font-bold">Mitigação: </strong>
                    {r.mitigation}
                  </p>
                  {href && "linkLabel" in r ? (
                    external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 font-bold underline underline-offset-4 decoration-2 hover:text-risk-mod"
                      >
                        {r.linkLabel} →
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="inline-block mt-3 font-bold underline underline-offset-4 decoration-2 hover:text-risk-mod"
                      >
                        {r.linkLabel} →
                      </Link>
                    )
                  ) : null}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}

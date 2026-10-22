import Image from "next/image";
import Link from "next/link";

/**
 * Confirmar — "The action tile". O campo vermelho é o nível crítico da
 * matriz: ficar de fora. Uma fileira de três ladrilhos que parece cortada
 * de uma fileira maior; o do meio carrega a ação.
 */
export function Confirmar() {
  return (
    <section
      id="confirmar"
      data-ink="light"
      data-bg="var(--risk-crit)"
      aria-labelledby="confirmar-title"
      className="relative ch-crit overflow-hidden py-[clamp(96px,10vw,160px)] min-h-[90svh] flex items-center"
    >
      <div className="w-full grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-3">
        <div
          className="order-2 md:order-none md:col-span-2 relative h-[140px] md:h-[clamp(360px,62svh,560px)] overflow-hidden"
          data-reveal
          style={{ ["--i" as string]: 2 }}
        >
          <Image
            src="/assets/fotos/rede.jpg"
            alt="Rede de vôlei sobre uma quadra de areia no fim de tarde, com prédios ao fundo"
            fill
            sizes="(min-width: 768px) 18vw, 50vw"
            className="object-cover"
          />
        </div>

        <div
          className="order-1 md:order-none col-span-2 md:col-span-8 mx-[var(--page-margin)] md:mx-0 bg-ink text-white p-7 md:p-12 flex flex-col justify-center min-h-[320px] md:h-[clamp(360px,62svh,560px)]"
        >
          <h2
            id="confirmar-title"
            className="display text-[length:var(--step-head)]"
            data-reveal
          >
            <span className="block">Ficar de fora:</span>
            <span className="block text-risk-crit">risco crítico.</span>
          </h2>
          <p
            className="mt-6 max-w-[44ch] text-[length:var(--step-lead)] leading-snug"
            data-reveal
            style={{ ["--i" as string]: 1 }}
          >
            A mitigação é simples: confirme até 1º de novembro. Leva uns 30
            segundos, sem cadastro e sem senha.
          </p>
          <div className="mt-8" data-reveal style={{ ["--i" as string]: 2 }}>
            <Link
              href="/rsvp"
              className="inline-flex items-center justify-center min-h-[60px] px-8 bg-white text-ink font-bold text-[length:var(--step-lead)] hover:bg-risk-mod active:scale-[0.97] transition-[background-color,transform] duration-200 w-full md:w-auto"
            >
              Confirmar presença
            </Link>
          </div>
        </div>

        <div
          className="order-3 md:order-none md:col-span-2 h-[140px] md:h-[clamp(360px,62svh,560px)] bg-risk-mod"
          data-reveal
          style={{ ["--i" as string]: 3 }}
          aria-hidden
        />
      </div>
    </section>
  );
}

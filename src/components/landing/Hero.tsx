import { EVENT } from "@/lib/constants";

/**
 * Abertura — "Headline across two fields".
 * Dois campos chapados se encontram numa costura: papel em cima, verde
 * (risco baixo, o começo do dia) embaixo. O título atravessa a costura e
 * troca de tinta: preto no papel, verde-escuro "submerso" no verde.
 * São duas cópias do mesmo título, cada uma recortada de um lado da
 * costura; só a primeira é lida por leitores de tela.
 */
export function Hero() {
  return (
    <section
      id="topo"
      data-ink="dark"
      data-bg="var(--paper)"
      className="hero relative isolate overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="hero-paper" aria-hidden />
      <div className="hero-field" aria-hidden />

      <div className="hero-type">
        <h1 id="hero-title" className="hero-h1 display">
          <span className="hero-line hero-line--top">
            <span className="block">Encontro</span>
            <span className="block">GRC 17.12</span>
          </span>
          <span className="hero-line hero-line--under" aria-hidden>
            <span className="block">Encontro</span>
            <span className="block">GRC 17.12</span>
          </span>
        </h1>
      </div>

      <div className="hero-copy">
        <p className="hero-sentence">
          O fechamento 2026 da {EVENT.hosts}: reunião, quadras de areia, comes e
          bebes. Quinta, 17 de dezembro, das 9h às 22h, na {EVENT.venue}, Barra
          Funda.
        </p>
        <p className="hero-deadline">
          Confirme até 1º de novembro.
        </p>
      </div>

      <style>{`
        .hero {
          --seam: 50svh;
          --hero-size: clamp(96px, 12vw, 196px);
          height: calc(100svh + 6svh);
          min-height: 760px;
        }
        .hero-paper,
        .hero-field {
          position: absolute;
          inset-inline: 0;
          z-index: -1;
        }
        .hero-paper { top: 0; height: var(--seam); background: var(--paper); }
        .hero-field { top: var(--seam); bottom: 0; background: var(--risk-low); }

        .hero-type {
          position: absolute;
          inset-inline: var(--page-margin);
          /* a costura corta o terço de cima da segunda linha */
          top: calc(var(--seam) - 1.35 * var(--hero-size));
          padding-top: 0.2em; /* a área dos acentos fica dentro da caixa do título */
          text-align: center;
          font-size: var(--hero-size);
        }
        .hero-h1 { position: relative; margin: 0; font-size: 1em; }
        .hero-line {
          display: block;
          margin: 0;
          font-size: 1em;
          line-height: 0.86;
          letter-spacing: -0.03em;
          white-space: nowrap;
        }
        .hero-line--top {
          position: relative;
          z-index: 2;
          color: var(--ink);
          clip-path: inset(0 0 calc(100% - 1.15em) 0);
        }
        .hero-line--under {
          position: absolute;
          inset: 0;
          z-index: 1;
          color: #0d5530;
          clip-path: inset(1.15em 0 0 0);
        }

        .hero-copy {
          position: absolute;
          inset-inline: var(--page-margin);
          top: calc(100svh - 56px);
          transform: translateY(-100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
          color: var(--ink);
        }
        .hero-sentence {
          margin: 0;
          max-width: 46ch;
          font-size: var(--step-lead);
          line-height: 1.35;
          font-weight: 500;
          text-wrap: balance;
        }
        .hero-deadline {
          margin: 0;
          font-size: var(--step-body);
          font-weight: 700;
        }

        @media (max-width: 767px) {
          .hero {
            --seam: 46svh;
            --hero-size: 14.2vw;
            height: calc(var(--seam) + 1.1 * var(--hero-size) + 340px);
            min-height: 0;
          }
          .hero-sentence { font-size: var(--step-body); max-width: 30ch; }
          .hero-copy {
            top: calc(var(--seam) + 1.1 * var(--hero-size));
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

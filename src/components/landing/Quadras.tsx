import Link from "next/link";

const PHOTO = "/assets/fotos/quadra.jpg";

type Tile =
  | { kind: "heading" }
  | { kind: "fact"; text: string; tone: string }
  | { kind: "action" };

const FACTS = [
  { text: "Das 11h às 16h, as quadras de areia ficam liberadas para a turma.", tone: "bg-risk-mod text-ink" },
  { text: "Beach tennis, vôlei e futevôlei. Sem reserva: chega e monta o time.", tone: "bg-paper text-ink" },
  { text: "R$30 por pessoa. Aceita Wellhub (Silver+) e TotalPass (TP3).", tone: "bg-risk-low text-ink" },
];

/** Posições (linha, coluna) dos ladrilhos de cor; nunca dois vizinhos. */
const DESKTOP: Record<string, Tile> = {
  "0-0": { kind: "heading" },
  "0-4": { kind: "fact", ...FACTS[0] },
  "2-1": { kind: "fact", ...FACTS[1] },
  "1-5": { kind: "fact", ...FACTS[2] },
  "3-4": { kind: "action" },
};
const MOBILE: Record<string, Tile> = {
  "0-0": { kind: "heading" },
  "2-2": { kind: "fact", ...FACTS[0] },
  "4-0": { kind: "fact", ...FACTS[2] },
  "5-2": { kind: "action" },
};

function Board({
  cols,
  rows,
  map,
  className,
  headingId,
}: {
  cols: number;
  rows: number;
  map: Record<string, Tile>;
  className: string;
  headingId?: string;
}) {
  const headSpan = 3;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r}-${c}`;
      // o título ocupa HEAD_SPAN colunas: as células cobertas somem
      if (c > 0 && c < headSpan && map[`${r}-0`]?.kind === "heading") continue;
      const tile = map[key];
      const i = r * cols + c;
      if (tile?.kind === "heading") {
        cells.push(
          <div
            key={key}
            className="col-span-3 bg-ink text-white p-4 md:p-6 flex items-end"
            data-reveal
            style={{ ["--i" as string]: 0 }}
          >
            <h2
              id={headingId}
              className="display text-[length:clamp(2rem,4.2vw,4.5rem)] max-md:text-[length:clamp(2rem,9vw,3rem)]"
            >
              Cárdio queima bucho
            </h2>
          </div>,
        );
      } else if (tile?.kind === "fact") {
        cells.push(
          <div
            key={key}
            className={`${tile.tone} p-3 md:p-4 flex items-end text-[length:var(--step-small)] md:text-[length:var(--step-body)] font-medium leading-snug`}
            data-reveal
            style={{ ["--i" as string]: 1 + (i % 4) }}
          >
            <p>{tile.text}</p>
          </div>,
        );
      } else if (tile?.kind === "action") {
        cells.push(
          <Link
            key={key}
            href="/rsvp"
            className="group bg-risk-crit text-white p-3 md:p-4 flex flex-col justify-between font-medium text-[length:var(--step-body)] hover:bg-ink transition-colors duration-300 active:scale-[0.98]"
          >
            <span className="text-[length:var(--step-lead)] leading-none transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
            <span>Vou jogar: confirmar presença</span>
          </Link>,
        );
      } else {
        const x = cols > 1 ? (c / (cols - 1)) * 100 : 0;
        const y = rows > 1 ? (r / (rows - 1)) * 100 : 0;
        cells.push(
          <div key={key} className="relative overflow-hidden group" aria-hidden>
            <div
              className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.08]"
              style={{
                backgroundImage: `url(${PHOTO})`,
                backgroundSize: `${cols * 100}% ${rows * 100}%`,
                backgroundPosition: `${x}% ${y}%`,
              }}
            />
          </div>,
        );
      }
    }
  }
  return (
    <div
      className={className}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridAutoRows: "auto",
      }}
    >
      {cells}
    </div>
  );
}

/**
 * Quadras — "One image across tiles". Uma foto de quadra de areia vista de
 * cima, recortada num tabuleiro de ladrilhos quadrados; cinco ladrilhos
 * trocam a foto por cor chapada e carregam o título, os fatos e a ação.
 */
export function Quadras() {
  return (
    <section
      id="quadras"
      data-ink="dark"
      data-bg="var(--risk-high)"
      aria-label="Cárdio queima bucho"
      className="chapter ch-high min-h-[90svh] py-[clamp(96px,10vw,160px)]"
    >
      <Board
        cols={6}
        rows={4}
        map={DESKTOP}
        headingId="quadras-title"
        className="hidden lg:grid gap-2 [&>*]:aspect-square [&>.col-span-3]:aspect-auto"
      />
      <Board
        cols={3}
        rows={6}
        map={MOBILE}
        headingId="quadras-title-m"
        className="lg:hidden grid gap-[6px] [&>*]:aspect-square [&>.col-span-3]:aspect-auto"
      />
      <p className="mt-6 md:mt-8 max-w-[60ch] text-[length:var(--step-body)] font-medium">
        Vestiário com armário e chuveiro: dá para jogar, tomar um banho e seguir
        para o resto do dia. Às 16h as quadras fecham.
      </p>
    </section>
  );
}

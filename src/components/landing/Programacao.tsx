import { SCHEDULE } from "@/lib/constants";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

const textColor: Record<string, string> = {
  green: "text-green",
  orange: "text-orange",
  magenta: "text-magenta",
  purple: "text-purple",
  yellow: "text-yellow",
};

const borderColor: Record<string, string> = {
  green: "border-green",
  orange: "border-orange",
  magenta: "border-magenta",
  purple: "border-purple",
  yellow: "border-yellow",
};

export function Programacao() {
  return (
    <section
      id="programacao"
      className="relative py-16 md:py-24 px-5 md:px-8 max-w-[1200px] mx-auto"
    >
      <SectionTitle eyebrow="LINE-UP" title="ROADMAP DO DIA" color="ink" />

      <p className="text-sm md:text-base text-muted -mt-4 mb-6 md:-mt-6 md:mb-8 max-w-2xl">
        <strong className="text-ink">Cinco fases, um deploy só.</strong> Da
        reunião de fechamento ao modo livre, é só seguir o pipeline.
      </p>

      <ol className="relative flex flex-col gap-3 md:gap-4">
        {SCHEDULE.map((item, i) => (
          <li key={item.time} className="poster-card flex overflow-hidden">
            <div
              className={cn(
                "flex-none w-[84px] md:w-32 flex flex-col items-center justify-center border-r border-l-4 py-4 bg-paper/40",
                borderColor[item.color],
              )}
            >
              <span className={cn("font-mono font-bold text-xl md:text-2xl", textColor[item.color])}>
                {item.time}
              </span>
              {item.until ? (
                <span className="font-mono text-[11px] md:text-xs text-muted">
                  até {item.until}
                </span>
              ) : null}
            </div>
            <div className="flex-1 p-4 md:p-5 min-w-0">
              <p className="font-mono text-[11px] md:text-xs text-muted mb-1">
                FASE {String(i + 1).padStart(2, "0")} ·{" "}
                <span className={textColor[item.color]}>{item.tag}</span>
              </p>
              <h3 className="font-display uppercase text-lg md:text-2xl mb-1 leading-tight">
                {item.title}
              </h3>
              {item.items.length > 0 ? (
                <p className="text-sm md:text-base text-ink/80">
                  {item.items.join(" · ")}
                </p>
              ) : null}
              {"note" in item && item.note ? (
                <p className="text-xs md:text-sm text-muted mt-1">{item.note}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <p className="font-mono text-xs text-muted mt-6 text-center">
        * roadmap sujeito a change request da organização.
      </p>
    </section>
  );
}

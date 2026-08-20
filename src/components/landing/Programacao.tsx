import { SCHEDULE } from "@/lib/constants";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

const barColor: Record<string, string> = {
  green: "bg-green",
  orange: "bg-orange",
  magenta: "bg-magenta",
  purple: "bg-purple",
};

const textColor: Record<string, string> = {
  green: "text-green",
  orange: "text-orange",
  magenta: "text-magenta",
  purple: "text-purple",
};

export function Programacao() {
  return (
    <section
      id="programacao"
      className="relative py-16 md:py-24 px-5 md:px-8 max-w-[1200px] mx-auto"
    >
      <SectionTitle eyebrow="SE LIGA NA PROGRAMAÇÃO" title="LINE-UP DO DIA" color="green" />

      <ol className="flex flex-col gap-3 md:gap-4">
        {SCHEDULE.map((item) => (
          <li
            key={item.time}
            className="poster-card flex overflow-hidden"
          >
            <div
              className={cn(
                "flex-none w-20 md:w-28 flex items-center justify-center border-r-[3px] border-ink",
                barColor[item.color],
              )}
            >
              <span className="font-display text-paper-light text-xl md:text-2xl">
                {item.time}
              </span>
            </div>
            <div className="flex-1 p-4 md:p-5">
              <h3
                className={cn(
                  "font-display uppercase text-lg md:text-2xl mb-1",
                  textColor[item.color],
                )}
              >
                {item.title}
              </h3>
              {item.items.length > 0 ? (
                <p className="text-sm md:text-base text-ink/80">
                  {item.items.join(" • ")}
                </p>
              ) : null}
              {"note" in item && item.note ? (
                <p className="text-xs md:text-sm text-ink/60 italic mt-1">
                  {item.note}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <p className="text-xs md:text-sm text-ink/60 mt-6 text-center">
        A programação poderá ser ajustada pelos organizadores.
      </p>
    </section>
  );
}

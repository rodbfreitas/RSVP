"use client";

import Link from "next/link";
import { useState } from "react";
import { ARRIVAL_OPTIONS, SCHEDULE } from "@/lib/constants";

type State = "past" | "now" | "next";

function fmt(h: number) {
  const whole = Math.floor(h);
  const min = Math.round((h - whole) * 60);
  return min ? `${whole}h${min < 10 ? "0" : ""}${min}` : `${whole}h`; // relógio: 15h30
}

function stateAt(arrival: number, start: number, end: number): State {
  if (end <= arrival) return "past";
  if (start <= arrival) return "now";
  return "next";
}

const LABEL: Record<State, string> = {
  past: "Já passou",
  now: "Rolando",
  next: "Ainda vem",
};

function joinPt(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

/** O resumo em uma frase do que a pessoa encontra ao chegar. */
function summary(arrival: number) {
  const states = SCHEDULE.map((s) => ({ s, st: stateAt(arrival, s.startH, s.endH) }));
  const now = states.filter((x) => x.st === "now").map((x) => x.s.title);
  const missed = states.filter((x) => x.st === "past").map((x) => x.s.title);
  const parts: string[] = [];
  if (now.length) parts.push(`${joinPt(now)} ${now.length > 1 ? "estão" : "está"} rolando.`);
  else parts.push("Você chega antes de tudo começar.");
  if (missed.length) parts.push(`Você perde: ${joinPt(missed)}.`);
  else parts.push("Não perde nada.");
  return `Chegando às ${fmt(arrival)}: ${parts.join(" ")}`;
}

/**
 * Pauta do dia — "Day tabs, banded agenda", com o elemento vivo do site:
 * a pessoa escolhe a que horas chega e cada faixa da pauta diz se já
 * passou, se está rolando ou se ainda vem. Sem JS, a pauta aparece inteira.
 */
export function Pauta() {
  const [arrival, setArrival] = useState<number>(9);

  return (
    <section
      id="pauta"
      data-ink="dark"
      data-bg="var(--risk-mod)"
      aria-labelledby="pauta-title"
      className="chapter ch-mod min-h-[90svh] pt-[clamp(80px,8vw,128px)] pb-[clamp(96px,10vw,160px)]"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
        <h2
          id="pauta-title"
          className="display text-[length:var(--step-head)]"
          data-reveal
        >
          <span className="block text-[#6b5c00]">Quinta, 17.12.</span>
          <span className="block">Treze horas.</span>
        </h2>
        <Link
          href="/rsvp"
          data-reveal
          style={{ ["--i" as string]: 1 }}
          className="inline-flex items-center justify-center min-h-[56px] px-7 bg-ink text-white font-medium text-[length:var(--step-body)] hover:bg-risk-crit active:scale-[0.97] transition-[background-color,transform] duration-200 w-full md:w-auto"
        >
          Confirmar presença
        </Link>
      </div>

      <div className="grid md:grid-cols-[150px_1fr] gap-6 md:gap-10">
        <div className="md:pt-0 sticky top-[76px] z-10 md:static -mx-[var(--page-margin)] px-[var(--page-margin)] py-3 md:p-0 md:mx-0 bg-risk-mod">
          <p id="chego-label" className="font-medium text-[length:var(--step-body)] mb-2">
            Chego às
          </p>
          <div
            role="radiogroup"
            aria-labelledby="chego-label"
            className="grid grid-cols-6 md:grid-cols-1 gap-[6px]"
          >
            {ARRIVAL_OPTIONS.map((h) => {
              const active = h === arrival;
              return (
                <button
                  key={h}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setArrival(h)}
                  className={`h-[52px] md:h-[64px] text-[length:var(--step-lead)] font-bold tnum transition-[background-color,color,transform] duration-200 active:scale-[0.96] ${
                    active ? "bg-ink text-risk-mod" : "bg-black/[0.07] hover:bg-black/[0.14]"
                  }`}
                >
                  {fmt(h)}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p
            aria-live="polite"
            className="text-[length:var(--step-lead)] font-medium leading-snug mb-6 max-w-[48ch] min-h-[2.7em]"
          >
            {summary(arrival)}
          </p>

          <ol className="flex flex-col gap-1">
            {SCHEDULE.map((item, i) => {
              const st = stateAt(arrival, item.startH, item.endH);
              return (
                <li
                  key={item.title}
                  data-reveal
                  style={{ ["--i" as string]: i }}
                  className={`grid grid-cols-[88px_1fr] md:grid-cols-[22%_1fr_auto] items-center gap-x-4 gap-y-1 min-h-[76px] py-4 md:py-0 px-4 md:px-5 transition-[background-color,color] duration-300 ${
                    st === "now"
                      ? "bg-ink text-risk-mod"
                      : i % 2
                        ? "bg-black/[0.11]"
                        : "bg-black/[0.06]"
                  }`}
                >
                  <span
                    className={`text-[length:var(--step-body)] font-bold tnum self-start md:self-center ${
                      st === "past" ? "text-[#6b5c00]" : ""
                    }`}
                  >
                    {item.time}
                    {item.until ? `–${item.until}` : ""}
                  </span>
                  <span className={`min-w-0 ${st === "past" ? "text-[#6b5c00]" : ""}`}>
                    <span className="block text-[length:var(--step-body)] font-bold leading-tight">
                      {item.title}
                    </span>
                    <span
                      className={`block text-[length:var(--step-small)] mt-0.5 ${
                        st === "now" ? "text-white" : ""
                      }`}
                    >
                      {item.note}
                    </span>
                  </span>
                  <span className="col-start-2 md:col-start-auto text-[length:var(--step-small)] font-bold md:text-right">
                    {LABEL[st]}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="text-[length:var(--step-small)] mt-4 text-[#6b5c00]">
            A pauta pode receber ajustes da organização.
          </p>
        </div>
      </div>
    </section>
  );
}

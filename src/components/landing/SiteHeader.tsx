"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Ink = "dark" | "light";

const LINKS = [
  { href: "#pauta", label: "Pauta" },
  { href: "#quadras", label: "Quadras" },
  { href: "#riscos", label: "Riscos" },
  { href: "#local", label: "Local" },
];

/**
 * Cabeçalho fixo. O movimento-assinatura do site: a tinta do cabeçalho
 * troca (300ms) quando a borda de cada capítulo passa por baixo dele.
 * Cada <section data-ink="dark|light"> declara a tinta que pede.
 */
export function SiteHeader() {
  const [ink, setInk] = useState<Ink>("dark");
  const [bg, setBg] = useState<string>("var(--paper)");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-ink]"));
    const pick = () => {
      const probe = (ref.current?.offsetHeight ?? 64) / 2;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          setInk((s.dataset.ink as Ink) ?? "dark");
          setBg(s.dataset.bg ?? "var(--paper)");
          return;
        }
      }
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);

  const light = ink === "light";

  return (
    <header
      ref={ref}
      style={{ backgroundColor: bg }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        light ? "text-white" : "text-ink"
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-[var(--page-margin)] py-4">
        <Link
          href="/"
          className="text-[length:var(--step-lead)] font-bold uppercase tracking-[-0.03em] leading-none"
        >
          Encontro GRC
        </Link>

        <nav aria-label="Seções" className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[var(--step-body)] font-medium underline-offset-[6px] decoration-2 hover:underline"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/rsvp"
            className={`inline-flex items-center min-h-[48px] px-5 font-medium transition-[background-color,color,transform] duration-300 active:scale-[0.97] ${
              light ? "bg-white text-ink hover:bg-risk-mod" : "bg-ink text-white hover:bg-risk-crit"
            }`}
          >
            Confirmar presença
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="min-h-[44px] px-2 font-medium"
          >
            {open ? "Fechar" : "Menu"}
          </button>
          <Link
            href="/rsvp"
            className={`inline-flex items-center min-h-[44px] px-4 font-medium active:scale-[0.97] transition-transform ${
              light ? "bg-white text-ink" : "bg-ink text-white"
            }`}
          >
            Confirmar
          </Link>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-mobile"
          aria-label="Seções"
          className="md:hidden bg-ink text-white px-[var(--page-margin)] pb-6 pt-2 flex flex-col"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-[var(--step-lead)] font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

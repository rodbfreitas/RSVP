"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/** Ação fixa no celular: aparece depois da abertura, some no capítulo de confirmação. */
export function CtaSticky() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("#hero-sentinel");
    const cta = document.querySelector("#confirmar");
    const foot = document.querySelector("#local");
    let onFoot = false;
    let pastHero = false;
    let onCta = false;
    const update = () => setVisible(pastHero && !onCta && !onFoot);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting;
        if (e.target === cta) onCta = e.isIntersecting;
        if (e.target === foot) onFoot = e.isIntersecting;
      }
      update();
    });
    if (hero) io.observe(hero);
    if (cta) io.observe(cta);
    if (foot) io.observe(foot);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 safe-bottom px-4 pt-3 bg-ink transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href="/rsvp"
        tabIndex={visible ? 0 : -1}
        className="flex items-center justify-center w-full min-h-[56px] bg-white text-ink font-bold text-[length:var(--step-body)] active:scale-[0.98] transition-transform"
      >
        Confirmar presença até 01/11
      </Link>
    </div>
  );
}

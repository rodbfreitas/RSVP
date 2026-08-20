"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

/** CTA fixo no rodapé mobile, exibido somente após o hero sair da viewport (Design System §15). */
export function CtaSticky() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("#hero-sentinel");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 safe-bottom px-4 pt-3 bg-gradient-to-t from-paper via-paper/95 to-transparent transition-transform duration-200 ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href="/rsvp"
        className={buttonClasses({
          variant: "primary",
          color: "magenta",
          fullWidth: true,
        })}
      >
        EU VOU 🎉
      </Link>
    </div>
  );
}

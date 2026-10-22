import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { Pauta } from "@/components/landing/Pauta";
import { Quadras } from "@/components/landing/Quadras";
import { Riscos } from "@/components/landing/Riscos";
import { Confirmar } from "@/components/landing/Confirmar";
import { Noite } from "@/components/landing/Noite";
import { Footer } from "@/components/landing/Footer";
import { CtaSticky } from "@/components/landing/CtaSticky";
import { RevealObserver } from "@/components/landing/RevealObserver";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 relative">
        <div id="hero-sentinel" className="absolute top-0 h-[100svh] w-0" aria-hidden />
        <Hero />
        <Pauta />
        <Quadras />
        <Riscos />
        <Confirmar />
        <Noite />
      </main>
      <Footer />
      <CtaSticky />
      <RevealObserver />
    </>
  );
}

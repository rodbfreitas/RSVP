import { Hero } from "@/components/landing/Hero";
import { Anfitrioes } from "@/components/landing/Anfitrioes";
import { Programacao } from "@/components/landing/Programacao";
import { Esportes } from "@/components/landing/Esportes";
import { Footer } from "@/components/landing/Footer";
import { CtaSticky } from "@/components/landing/CtaSticky";

export default function Home() {
  return (
    <main className="flex-1 paper-texture relative">
      <div id="hero-sentinel" className="absolute top-0 h-1 w-full" />
      <Hero />
      <Anfitrioes />
      <Programacao />
      <Esportes />
      <Footer />
      <CtaSticky />
    </main>
  );
}

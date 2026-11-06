import { Hero } from "@/components/landing/Hero";
import { Programacao } from "@/components/landing/Programacao";
import { Esportes } from "@/components/landing/Esportes";
import { InformacoesUteis } from "@/components/landing/InformacoesUteis";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex-1 paper-texture relative">
      <div id="hero-sentinel" className="absolute top-0 h-1 w-full" />
      <Hero />
      <Programacao />
      <Esportes />
      <InformacoesUteis />
      <Footer />
    </main>
  );
}

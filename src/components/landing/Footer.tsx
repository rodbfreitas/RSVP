import Link from "next/link";
import { EVENT } from "@/lib/constants";
import { buildGoogleCalendarLink } from "@/lib/calendar";

/** Fechamento — "Name first, places under it", no preto da noite. */
export function Footer() {
  return (
    <footer
      id="local"
      data-ink="light"
      data-bg="var(--night)"
      aria-labelledby="local-title"
      className="chapter ch-night overflow-hidden pt-[clamp(96px,10vw,160px)] pb-10"
    >
      <h2
        id="local-title"
        className="display whitespace-nowrap text-[length:12vw] leading-[0.85] -ml-[0.04em]"
        data-reveal
      >
        Encontro GRC
      </h2>

      <div className="grid md:grid-cols-12 gap-x-6 gap-y-12 mt-[72px]">
        <address className="md:col-span-5 not-italic flex flex-col gap-1 text-[length:var(--step-lead)] font-medium leading-tight text-risk-mod">
          <a href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            {EVENT.venue}
          </a>
          <a href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Rua Inhaúma, 71
          </a>
          <a href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Barra Funda, São Paulo
          </a>
          <span className="text-white mt-4">Quinta, 17.12.2026, 9h às 22h</span>
        </address>

        <div className="md:col-span-6 md:col-start-7 grid grid-cols-2 gap-6 text-[length:var(--step-small)]">
          <div className="flex flex-col gap-2">
            <p className="font-bold">No site</p>
            <a href="#pauta" className="hover:text-risk-mod">Pauta do dia</a>
            <a href="#quadras" className="hover:text-risk-mod">Quadras</a>
            <a href="#riscos" className="hover:text-risk-mod">Riscos mapeados</a>
            <Link href="/comidas" className="hover:text-risk-mod">Comida no local</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Presença</p>
            <Link href="/rsvp" className="hover:text-risk-mod">Confirmar presença</Link>
            <a href={buildGoogleCalendarLink()} target="_blank" rel="noopener noreferrer" className="hover:text-risk-mod">
              Adicionar à agenda
            </a>
            <a href={EVENT.parkingMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-risk-mod">
              Estacionamentos
            </a>
          </div>
        </div>
      </div>

      <div className="mt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-3 text-[length:var(--step-small)]">
        <p className="max-w-[70ch]">
          © 2026 {EVENT.name}. Fotos ilustrativas, geradas com IA.
        </p>
        <a href="#topo" className="font-bold hover:text-risk-mod">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}

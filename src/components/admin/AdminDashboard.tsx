"use client";

import { useState, useTransition } from "react";
import { Plus, Copy, Check, Download, Share2 } from "lucide-react";
import { ProgressMeter } from "@/components/ui/ProgressMeter";
import { KpiCard } from "@/components/ui/KpiCard";
import { Button } from "@/components/ui/Button";
import { GuestTable } from "./GuestTable";
import { GuestFormModal } from "./GuestFormModal";
import { EVENT, buildWhatsAppInviteMessage } from "@/lib/constants";
import { buildWaShareLink } from "@/lib/whatsapp";
import { formatPhoneDisplay } from "@/lib/phone";
import { toCsv } from "@/lib/utils";
import { getStats, listGuests } from "@/app/admin/actions";
import type { RsvpStats, RsvpWithSports } from "@/lib/types";

export function AdminDashboard({
  initialStats,
  initialGuests,
  allSports,
}: {
  initialStats: RsvpStats;
  initialGuests: RsvpWithSports[];
  allSports: string[];
}) {
  const [stats, setStats] = useState(initialStats);
  const [guests, setGuests] = useState(initialGuests);
  const [modalGuest, setModalGuest] = useState<RsvpWithSports | null | "new">(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [, startTransition] = useTransition();

  const refresh = () => {
    startTransition(async () => {
      const [newStats, newGuests] = await Promise.all([getStats(), listGuests()]);
      setStats(newStats);
      setGuests(newGuests);
    });
  };

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // ambiente sem permissão de clipboard — sem tratamento adicional necessário
    }
  };

  const handleExportCsv = () => {
    const rows = guests.map((g) => ({
      nome: g.name,
      telefone: formatPhoneDisplay(g.phone),
      status: g.status,
      quantidade: g.guest_count,
      esportes: g.sports_status,
      quantidade_jogadores: g.sports_count,
      modalidades: g.sports.join(", "),
      confirmado_em: new Date(g.created_at).toLocaleString("pt-BR"),
    }));
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pagode-dos-irmaos-convidados-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div>
        <h1 className="font-display uppercase text-3xl md:text-4xl mb-1">
          Vamos conseguir as 100 pessoas?
        </h1>
        <p className="text-ink/70">Pagode dos Irmãos · {EVENT.dateLabel}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ProgressMeter
          value={stats.confirmedGuests}
          target={EVENT.targetGuests}
          label="META ARENA"
          sublabel={`meta recomendada: ${EVENT.recommendedRsvp}`}
        />
        <ProgressMeter
          value={stats.confirmedGuests}
          target={EVENT.recommendedRsvp}
          label="CONFIRMADOS / META RECOMENDADA"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard value={stats.confirmedGuests} label="Confirmados" color="green" rotate={-1} />
        <KpiCard value={stats.sportsCount} label="Vão jogar" color="orange" rotate={1} />
        <KpiCard value={stats.maybeGuests} label="Talvez" color="yellow" rotate={-1} />
        <KpiCard value={stats.declinedRsvps} label="Não vão" color="purple" rotate={1} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => setModalGuest("new")}>
          <Plus size={18} aria-hidden />
          ADICIONAR CONVIDADO
        </Button>
        <Button variant="secondary" onClick={handleCopyLink}>
          {linkCopied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
          {linkCopied ? "LINK COPIADO!" : "COPIAR LINK DO CONVITE"}
        </Button>
        <a
          href={buildWaShareLink(buildWhatsAppInviteMessage(siteUrl))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-display uppercase tracking-wide border-[3px] border-ink min-h-[56px] px-6 text-lg bg-transparent hover:bg-ink/5 focus-ring"
        >
          <Share2 size={18} aria-hidden />
          COMPARTILHAR NO WHATSAPP
        </a>
        <Button variant="secondary" onClick={handleExportCsv}>
          <Download size={18} aria-hidden />
          EXPORTAR CSV
        </Button>
      </div>

      <GuestTable
        guests={guests}
        onEdit={(g) => setModalGuest(g)}
        onChanged={refresh}
      />

      {modalGuest ? (
        <GuestFormModal
          guest={modalGuest === "new" ? null : modalGuest}
          allSports={allSports}
          onClose={() => setModalGuest(null)}
          onSaved={() => {
            setModalGuest(null);
            refresh();
          }}
        />
      ) : null}
    </div>
  );
}

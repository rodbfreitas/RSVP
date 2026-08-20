"use client";

import { useMemo, useState, useTransition } from "react";
import { Pencil, Trash2, MessageCircle, Search } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPhoneDisplay } from "@/lib/phone";
import { buildReminderMessage } from "@/lib/constants";
import { buildWaShareLink } from "@/lib/whatsapp";
import { adminDeleteGuest } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import type { RsvpStatus, RsvpWithSports } from "@/lib/types";

type Filter = "all" | RsvpStatus | "sports" | "no-sports";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "confirmed", label: "Confirmados" },
  { value: "maybe", label: "Talvez" },
  { value: "declined", label: "Não vão" },
  { value: "sports", label: "Esportes" },
  { value: "no-sports", label: "Não esportes" },
];

export function GuestTable({
  guests,
  onEdit,
  onChanged,
}: {
  guests: RsvpWithSports[];
  onEdit: (guest: RsvpWithSports) => void;
  onChanged: () => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    let rows = guests;
    if (filter === "sports") rows = rows.filter((g) => g.sports_status !== "no");
    else if (filter === "no-sports") rows = rows.filter((g) => g.sports_status === "no");
    else if (filter !== "all") rows = rows.filter((g) => g.status === filter);

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      rows = rows.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          formatPhoneDisplay(g.phone).includes(q),
      );
    }
    return rows;
  }, [guests, filter, query]);

  const handleDelete = (id: string) => {
    if (!confirm("Excluir este convidado? Essa ação não pode ser desfeita.")) return;
    setDeletingId(id);
    startTransition(async () => {
      await adminDeleteGuest(id);
      setDeletingId(null);
      onChanged();
    });
  };

  if (guests.length === 0) {
    return (
      <div className="poster-card p-8 text-center">
        <p className="font-display text-xl uppercase mb-2">
          Ainda tá vazio por aqui 🦗
        </p>
        <p className="text-ink/70">
          Manda o convite pra galera começar a confirmar.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome ou telefone"
            aria-label="Buscar convidado"
            className="w-full min-h-[48px] border-2 border-ink bg-paper-light pl-10 pr-4 focus-ring"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "border-2 border-ink px-3 py-2 text-xs md:text-sm font-bold uppercase focus-ring",
                filter === f.value ? "bg-ink text-paper-light" : "hover:bg-ink/5",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-ink/50 mb-3">
        {filtered.length} de {guests.length} convidados
      </p>

      {/* Desktop */}
      <div className="hidden md:block poster-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-ink text-left">
              <th className="p-3">Nome</th>
              <th className="p-3">Pessoas</th>
              <th className="p-3">Status</th>
              <th className="p-3">Esportes</th>
              <th className="p-3">Jogadores</th>
              <th className="p-3">WhatsApp</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g) => (
              <tr key={g.id} className="border-b border-ink/10">
                <td className="p-3 font-bold">{g.name}</td>
                <td className="p-3">{g.guest_count}</td>
                <td className="p-3">
                  <StatusBadge status={g.status} />
                </td>
                <td className="p-3">
                  {g.sports_status === "no"
                    ? "—"
                    : g.sports.length > 0
                      ? g.sports.join(", ")
                      : g.sports_status === "yes"
                        ? "Sim"
                        : "Talvez"}
                </td>
                <td className="p-3">{g.sports_status !== "no" ? g.sports_count : "—"}</td>
                <td className="p-3">{formatPhoneDisplay(g.phone)}</td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-1">
                    <RowActions
                      guest={g}
                      onEdit={onEdit}
                      onDelete={handleDelete}
                      deleting={pending && deletingId === g.id}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.map((g) => (
          <div key={g.id} className="poster-card p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold">{g.name}</p>
                <p className="text-xs text-ink/60">{formatPhoneDisplay(g.phone)}</p>
              </div>
              <StatusBadge status={g.status} />
            </div>
            <p className="text-sm text-ink/70 mb-3">
              {g.guest_count} pessoa{g.guest_count > 1 ? "s" : ""}
              {g.sports_status !== "no"
                ? ` · 🏐 ${g.sports_count} no esporte`
                : ""}
            </p>
            <div className="flex items-center gap-1">
              <RowActions
                guest={g}
                onEdit={onEdit}
                onDelete={handleDelete}
                deleting={pending && deletingId === g.id}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RowActions({
  guest,
  onEdit,
  onDelete,
  deleting,
}: {
  guest: RsvpWithSports;
  onEdit: (g: RsvpWithSports) => void;
  onDelete: (id: string) => void;
  deleting: boolean;
}) {
  const waLink = buildWaShareLink(
    buildReminderMessage(guest.name.split(" ")[0], guest.guest_count),
    guest.phone,
  );

  return (
    <>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Enviar WhatsApp para ${guest.name}`}
        title="Enviar WhatsApp"
        className="p-2 hover:bg-green/10 text-green focus-ring"
      >
        <MessageCircle size={18} aria-hidden />
      </a>
      <button
        type="button"
        aria-label={`Editar ${guest.name}`}
        title="Editar"
        onClick={() => onEdit(guest)}
        className="p-2 hover:bg-ink/5 focus-ring"
      >
        <Pencil size={18} aria-hidden />
      </button>
      <button
        type="button"
        aria-label={`Excluir ${guest.name}`}
        title="Excluir"
        disabled={deleting}
        onClick={() => onDelete(guest.id)}
        className="p-2 hover:bg-magenta/10 text-magenta focus-ring disabled:opacity-40"
      >
        <Trash2 size={18} aria-hidden />
      </button>
    </>
  );
}

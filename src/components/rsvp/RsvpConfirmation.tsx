"use client";

import { ConfirmStamp } from "@/components/ui/ConfirmStamp";
import {
  LocationButton,
  CalendarButton,
  ShareButton,
  GoogleCalendarLink,
} from "@/components/ui/ActionButtons";
import { Button } from "@/components/ui/Button";
import { EVENT, SCHEDULE, buildWhatsAppInviteMessage } from "@/lib/constants";
import type { RsvpWithSports } from "@/lib/types";

const DAY_HIGHLIGHTS = [
  { emoji: "🕘", text: `Esportes a partir das ${SCHEDULE[0].time.replace("H", "h")} (opcional)` },
  { emoji: "🍻", text: `Boteco a partir das ${SCHEDULE[1].time.replace("H", "h")}` },
  { emoji: "🎶", text: `Pagode às ${SCHEDULE[2].time.replace("H", "h")}` },
];

export function RsvpConfirmation({
  rsvp,
  wasUpdate,
  onEdit,
}: {
  rsvp: RsvpWithSports;
  wasUpdate: boolean;
  onEdit: () => void;
}) {
  if (rsvp.status === "declined") {
    return (
      <div className="text-center animate-pop-in">
        <h1 className="font-display text-3xl md:text-4xl uppercase mb-3">
          Que pena, {rsvp.name.split(" ")[0]}!
        </h1>
        <p className="text-ink/70 mb-8">
          Anotamos que você não vai poder vir dessa vez. Se mudar de ideia,
          é só voltar aqui e atualizar sua resposta.
        </p>
        <Button variant="secondary" onClick={onEdit}>
          ALTERAR MINHA RESPOSTA
        </Button>
      </div>
    );
  }

  const shareUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const shareMessage = buildWhatsAppInviteMessage(shareUrl);

  return (
    <div className="text-center animate-pop-in">
      <div className="flex justify-center mb-6">
        <ConfirmStamp
          label={rsvp.status === "confirmed" ? "TÁ CONFIRMADO!" : "ANOTADO!"}
        />
      </div>

      <p className="text-lg md:text-xl mb-1">
        {wasUpdate ? "Atualizamos sua confirmação," : "Te esperamos,"}{" "}
        <strong>{rsvp.name.split(" ")[0]}</strong>!
      </p>
      <p className="text-ink/70 mb-8">
        {rsvp.status === "confirmed" ? "Agora é só chegar." : "Vaga guardada — confirma quando puder!"}
      </p>

      <div className="poster-card p-6 mb-8 text-left inline-block w-full max-w-sm mx-auto">
        <p className="font-display text-2xl text-magenta mb-1">
          {EVENT.dateLabel}
        </p>
        <p className="text-base">{EVENT.venue}</p>
        <p className="text-sm text-ink/60 mb-3">{EVENT.address}</p>
        <div className="flex flex-col gap-0.5 text-sm text-ink/70 mb-1">
          {DAY_HIGHLIGHTS.map((h) => (
            <p key={h.text}>
              {h.emoji} {h.text}
            </p>
          ))}
        </div>
        <div className="h-px bg-ink/15 my-3" />
        <p className="text-sm">
          <strong>{rsvp.guest_count}</strong> pessoa
          {rsvp.guest_count > 1 ? "s" : ""} confirmada
          {rsvp.guest_count > 1 ? "s" : ""}
        </p>
        {rsvp.sports_status !== "no" ? (
          <p className="text-sm">
            🏐 {rsvp.sports_count} no esporte
            {rsvp.sports.length > 0 ? ` — ${rsvp.sports.join(", ")}` : ""}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        <LocationButton />
        <CalendarButton />
        <GoogleCalendarLink className="mx-auto -mt-1" />
        <ShareButton message={shareMessage} />
        <button
          type="button"
          onClick={onEdit}
          className="text-sm underline underline-offset-4 text-ink/60 hover:text-ink mt-2"
        >
          Alterar minha confirmação
        </button>
      </div>
    </div>
  );
}

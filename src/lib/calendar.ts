import { EVENT } from "./constants";

function toIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/** Gera o conteúdo de um arquivo .ics para "Adicionar à agenda". */
export function buildIcsContent(): string {
  const start = new Date(`${EVENT.dateISO}T${EVENT.startTime}:00-03:00`);
  const end = new Date(`${EVENT.dateISO}T${EVENT.endTime}:00-03:00`);
  const now = new Date();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Encontro GRC//RSVP//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${EVENT.slug}@encontro-governanca.vercel.app`,
    `DTSTAMP:${toIcsDate(now)}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${EVENT.name}`,
    `DESCRIPTION:${EVENT.hosts}\\n09h reunião de fechamento 2026\\, 11h–16h quadras liberadas\\, 12h comes e bebes\\, 15h30 encerramento\\, até 22h modo livre.\\nMais detalhes em encontro-governanca.vercel.app`,
    `LOCATION:${EVENT.venue} — ${EVENT.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

/** Link do Google Calendar para adicionar o evento sem baixar arquivo. */
export function buildGoogleCalendarLink(): string {
  const fmt = (d: Date) => toIcsDate(d);
  const start = fmt(new Date(`${EVENT.dateISO}T${EVENT.startTime}:00-03:00`));
  const end = fmt(new Date(`${EVENT.dateISO}T${EVENT.endTime}:00-03:00`));
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT.name,
    dates: `${start}/${end}`,
    details: `${EVENT.hosts}\n09h reunião de fechamento 2026, 11h–16h quadras liberadas, 12h comes e bebes, 15h30 encerramento, até 22h modo livre.\nencontro-governanca.vercel.app`,
    location: `${EVENT.venue}, ${EVENT.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

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
    "PRODID:-//Pagode dos Irmaos//RSVP//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${EVENT.slug}@pagodedosirmaos.com.br`,
    `DTSTAMP:${toIcsDate(now)}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${EVENT.name}`,
    `DESCRIPTION:${EVENT.hosts} — Esportes\\, boteco e pagode. Confirme sua presença em pagodedosirmaos.com.br`,
    `LOCATION:${EVENT.venue} — ${EVENT.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

/** Link do Google Calendar para adicionar o evento sem baixar arquivo. */
export function buildGoogleCalendarLink(): string {
  const start = EVENT.dateISO.replace(/-/g, "") + "T120000Z";
  const end = EVENT.dateISO.replace(/-/g, "") + "T200000Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT.name,
    dates: `${start}/${end}`,
    details: `${EVENT.hosts} — Esportes, boteco e pagode. pagodedosirmaos.com.br`,
    location: `${EVENT.venue}, ${EVENT.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

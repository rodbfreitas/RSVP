// ============================================================
// Dados soberanos do evento — fonte: PRD Pagode dos Irmãos v1.0
// ============================================================

export const EVENT = {
  slug: "pagode-dos-irmaos-2026",
  name: "Pagode dos Irmãos",
  hosts: "Rodrigo 43 & Gabriel 30",
  dateISO: "2026-09-27",
  dateLabel: "27.09.2026",
  dateLabelShort: "27/09",
  weekday: "Domingo",
  startTime: "09:00",
  endTime: "17:00",
  timeLabel: "09h às 17h",
  venue: "Arena Éssipê",
  address: "Rua Inhaúma, 71 — Barra Funda, São Paulo/SP",
  neighborhood: "Barra Funda/SP",
  // URL oficial da Arena Éssipê no Google Maps
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Arena+Essipe+Rua+Inhauma+71+Barra+Funda+Sao+Paulo",
  targetGuests: 100,
  recommendedRsvp: 110,
  sportsPricePerPerson: 30,
} as const;

export const SCHEDULE = [
  {
    time: "09H",
    color: "green",
    title: "ABERTURA DA ARENA",
    items: ["Beach Tennis", "Futevôlei", "Vôlei"],
    note: "R$30 por pessoa — equipamentos inclusos",
  },
  {
    time: "13H",
    color: "orange",
    title: "ABRE O BOTECO",
    items: ["Comida", "Cerveja", "Drinks", "Resenha"],
  },
  {
    time: "14H",
    color: "magenta",
    title: "PAGODE",
    items: ["Ao vivo"],
  },
  {
    time: "15H30",
    color: "purple",
    title: "PARABÉNS",
    items: ["Bolo + doces"],
  },
  {
    time: "17H",
    color: "green",
    title: "ÚLTIMA DO PAGODE",
    items: [],
    note: "Aquela que nunca é a última.",
  },
] as const;

export const SPORTS = ["Beach Tennis", "Futevôlei", "Vôlei", "Livre"] as const;

export const WHATSAPP_INVITE_MESSAGE = `🍻🥁 PAGODE DOS IRMÃOS
Rodrigo 43 + Gabriel 30

📅 27/09/2026
📍 Arena Éssipê — Barra Funda
🏐 Esportes pela manhã
🍺 Boteco
🥁 Pagode
🎂 Aniversário

Confirme sua presença:
{url}`;

export function buildWhatsAppInviteMessage(url: string) {
  return WHATSAPP_INVITE_MESSAGE.replace("{url}", url);
}

export function buildReminderMessage(name: string, guestCount: number) {
  return `Oi, ${name}! Passando para lembrar do Pagode dos Irmãos no dia 27/09. Sua presença está confirmada para ${guestCount} pessoa${
    guestCount > 1 ? "s" : ""
  }. Te esperamos!`;
}

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
  // Busca ao vivo por estacionamentos próximos (a Arena não tem vaga própria).
  // Usar busca em vez de link fixo mantém a informação sempre atualizada.
  parkingMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=estacionamento+perto+de+Rua+Inhauma+71+Barra+Funda+Sao+Paulo",
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
    note: "R$30 por pessoa — equipamentos inclusos • aceita check-in Wellhub e TotalPass",
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
    note: "Aquela saideira de sempre!",
  },
] as const;

export const SPORTS = ["Beach Tennis", "Futevôlei", "Vôlei", "Livre"] as const;

export const INFO_UTEIS = [
  {
    icon: "ticket",
    color: "green",
    title: "ENTRADA É DE GRAÇA",
    description:
      "Não tem ingresso nem consumação mínima — a Arena cedeu o espaço numa boa. Só paga quem for jogar esporte (R$30, com tudo incluso). Fora isso é só chegar, curtir e pedir o que quiser no local.",
  },
  {
    icon: "utensils",
    color: "orange",
    title: "COMIDA E BEBIDA",
    description:
      "O local tem cardápio bem completo: refeições, lanches, porções e açaí, além de bebidas não alcoólicas e drinks. Cada um pede e paga o que quiser, no seu ritmo — sem cardápio fechado.",
  },
  {
    icon: "shower",
    color: "green",
    title: "VESTIÁRIO COMPLETO",
    description:
      "Armário e chuveiro à disposição. Dá pra levar uma troca de roupa, tomar um banho depois do esporte e já ficar pronto pro pagode da tarde.",
  },
  {
    icon: "parking",
    color: "magenta",
    title: "ESTACIONAMENTO",
    description:
      "A arena não tem vaga própria, mas a região tem bastante opção de estacionamento pago pertinho.",
    linkLabel: "Ver estacionamentos próximos",
    linkUrlKey: "parkingMapsUrl",
  },
  {
    icon: "baby",
    color: "purple",
    title: "TODAS AS IDADES",
    description:
      "Pode trazer a criançada! O Pagode dos Irmãos é família — de neném a vovô, todo mundo é bem-vindo. E é pet friendly: o cachorro da casa também pode ir.",
  },
  {
    icon: "shirt",
    color: "orange",
    title: "O QUE VESTIR",
    description:
      "De manhã: roupa de banho/esporte + protetor solar (o vestiário resolve a troca). À tarde: fica à vontade, sem cerimônia — o clima é resenha.",
  },
  {
    icon: "rain",
    color: "magenta",
    title: "E SE CHOVER?",
    description:
      "Relaxa: a Arena tem área coberta, então o pagode não para por causa de chuva.",
  },
] as const;

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

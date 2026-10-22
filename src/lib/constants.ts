// ============================================================
// Dados soberanos do evento — fonte: PRD Pagode dos Irmãos v1.0
// ============================================================

export const EVENT = {
  slug: "encontro-governanca-seguranca-2026",
  name: "Encontro Ger. Sr. Governança, Riscos e Continuidade",
  shortName: "Encontro GRC",
  code: "GOV-2026-1217",
  hosts: "Ger. Sr. Governança, Riscos e Continuidade",
  dateISO: "2026-12-17",
  dateLabel: "17.12.2026",
  dateLabelShort: "17/12",
  weekday: "Quinta-feira",
  startTime: "09:00",
  endTime: "22:00",
  timeLabel: "09h às 22h",
  venue: "Arena Éssipê",
  address: "Rua Inhaúma, 71 — Barra Funda, São Paulo/SP",
  neighborhood: "Barra Funda/SP",
  // Prazo preferencial de RSVP — não bloqueia confirmação após a data.
  rsvpDeadlineLabel: "01/11",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Arena+Essipe+Rua+Inhauma+71+Barra+Funda+Sao+Paulo",
  parkingMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=estacionamento+perto+de+Rua+Inhauma+71+Barra+Funda+Sao+Paulo",
  targetGuests: 100,
  recommendedRsvp: 110,
  sportsPricePerPerson: 30,
} as const;

// Pauta do dia. startH/endH em horas decimais, usados pelo seletor
// "Chego às…" para dizer o que já passou, o que está rolando e o que vem.
export const SCHEDULE = [
  {
    time: "09h",
    until: "10h",
    startH: 9,
    endH: 10,
    title: "Reunião de fechamento 2026",
    note: "Retrospectiva do ano, indicadores e prioridades de 2027.",
  },
  {
    time: "11h",
    until: "16h",
    startH: 11,
    endH: 16,
    title: "Cárdio Queima Bucho",
    note: "Quadras de areia liberadas: beach tennis, vôlei e futevôlei.",
  },
  {
    time: "12h",
    until: "22h",
    startH: 12,
    endH: 22,
    title: "Comes e bebes",
    note: "Quiosques e food trucks no local. Cada um pede e paga o seu.",
  },
  {
    time: "15h30",
    until: null,
    startH: 15.5,
    endH: 16,
    title: "Encerramento e agradecimentos",
    note: "A mensagem de fechamento do ano, com todo mundo junto.",
  },
  {
    time: "16h",
    until: "22h",
    startH: 16,
    endH: 22,
    title: "Cada um por si",
    note: "As quadras fecham. O bar segue aberto até as 22h.",
  },
] as const;

export const ARRIVAL_OPTIONS = [9, 11, 12, 14, 16, 19] as const;

export const SPORTS = ["Beach Tennis", "Futevôlei", "Vôlei", "Livre"] as const;

// "Riscos mapeados": cada dúvida comum escrita como risco + mitigação.
// level segue a matriz de risco (low | mod | high).
export const RISKS = [
  {
    level: "high",
    risk: "Perder o prazo de confirmação",
    mitigation:
      "Confirme até 1º de novembro. Leva uns 30 segundos, sem cadastro e sem senha, e dá para alterar a resposta depois.",
    linkLabel: "Confirmar presença",
    href: "/rsvp",
  },
  {
    level: "low",
    risk: "Ter que pagar para entrar",
    mitigation:
      "Entrada liberada, sem ingresso e sem consumação mínima. Só paga quem for jogar nas quadras: R$30 por pessoa.",
  },
  {
    level: "low",
    risk: "Pagar a quadra do próprio bolso",
    mitigation:
      "A Arena aceita check-in pelo Wellhub (a partir do Silver+) e pelo TotalPass (a partir do TP3).",
  },
  {
    level: "low",
    risk: "Passar fome",
    mitigation:
      "Refeições, lanches, porções, açaí, bebidas e drinks nos quiosques do local. Cada um pede e paga o que quiser, no seu ritmo.",
    linkLabel: "Ver quem vai estar lá",
    href: "/comidas",
  },
  {
    level: "mod",
    risk: "Não ter onde estacionar",
    mitigation:
      "A Arena não tem vaga própria, mas a região tem bastante estacionamento pago pertinho.",
    linkLabel: "Ver estacionamentos próximos",
    linkUrlKey: "parkingMapsUrl",
  },
  {
    level: "low",
    risk: "Suar e não ter onde se trocar",
    mitigation:
      "Vestiário completo, com armário e chuveiro. Leve uma troca de roupa e siga para o modo livre.",
  },
  {
    level: "mod",
    risk: "Errar na roupa",
    mitigation:
      "Para a reunião, o de sempre. Para as quadras, roupa de esporte e protetor solar. Depois das 16h, fica à vontade.",
  },
  {
    level: "low",
    risk: "Chover",
    mitigation:
      "A Arena tem área coberta. O encontro não para por causa de chuva.",
  },
] as const;

// Food trucks/quiosques confirmados pra vender no dia do evento.
// Preços e itens são um resumo curado — o cardápio completo (PDF) tem tudo.
export const FOOD_TRUCKS = [
  {
    slug: "saudoso-petisco",
    name: "Saudoso Petisco",
    color: "orange",
    tagline: "Espetinhos, petiscos de boteco e porções fritas",
    instagram: "@saudosopetisco",
    highlights: [
      { item: "Espetos tradicionais (carne, frango, kafta...)", price: "R$12" },
      { item: "Buffalo Wings (12un)", price: "R$48" },
      { item: "Iscas de Frango à Milanesa", price: "R$59" },
      { item: "Saudoso Almoço (arroz, feijão, fritas + 1 espeto)", price: "R$29,99" },
    ],
    pdfUrl: "/assets/cardapios/cardapio-saudoso-petisco.pdf",
  },
  {
    slug: "shark",
    name: "Shark Food & Açaí",
    color: "green",
    tagline: "Açaí montado na hora, smoothies proteicos e salgados",
    highlights: [
      { item: "Açaí 500ml (o mais pedido)", price: "R$29,90" },
      { item: "Smoothie proteico 500ml", price: "R$24,90" },
      { item: "Combo Clássico (açaí + pão de queijo)", price: "R$39,90" },
      { item: "Dadinho de Tapioca", price: "R$19,90" },
    ],
    pdfUrl: "/assets/cardapios/cardapio-shark.pdf",
  },
  {
    slug: "solares",
    name: "Solares Frutas Saudáveis",
    color: "purple",
    tagline: "Tapiocas, saladas, wraps e sucos naturais",
    instagram: "@solaressaudaveis",
    highlights: [
      { item: "Tapioca Frango", price: "R$18,90" },
      { item: "Salada Caesar", price: "R$28,90" },
      { item: "Wrap Frango com Goiabada Picante", price: "R$25,90" },
      { item: "Suco com 2 frutas", price: "R$15,90" },
    ],
    pdfUrl: "/assets/cardapios/cardapio-solares.pdf",
  },
  {
    slug: "vaca-na-faca",
    name: "Vaca na Faca",
    color: "magenta",
    tagline: "Hambúrgueres artesanais e porções pra dividir",
    highlights: [
      { item: "Cowboy", price: "R$37,50" },
      { item: "Vaca na Faca", price: "R$35,90" },
      { item: "Super Fritas (400g)", price: "R$45,90" },
      { item: "Onion Rings Grande (21un)", price: "R$32,90" },
    ],
    pdfUrl: "/assets/cardapios/cardapio-vaca-na-faca.pdf",
  },
] as const;

export const WHATSAPP_INVITE_MESSAGE = `🛡️ ENCONTRO GER. SR. GOVERNANÇA, RISCOS E CONTINUIDADE

📅 17/12/2026 · 09h às 22h
📍 Arena Éssipê — Barra Funda

🗂️ Reunião de fechamento 2026
🏐 Quadras de areia liberadas
🍻 Comes e bebes
🔓 Modo livre até as 22h

Confirme sua presença até 01/11:
{url}`;

export function buildWhatsAppInviteMessage(url: string) {
  return WHATSAPP_INVITE_MESSAGE.replace("{url}", url);
}

export function buildReminderMessage(name: string, _guestCount?: number) {
  void _guestCount;
  return `Oi, ${name}! Passando para lembrar do Encontro Ger. Sr. Governança, Riscos e Continuidade no dia 17/12, na Arena Éssipê. Sua presença está confirmada. Te esperamos!`;
}

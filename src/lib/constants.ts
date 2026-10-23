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

export const SCHEDULE = [
  {
    time: "09H",
    until: "10H",
    color: "magenta",
    tag: "SPRINT REVIEW",
    title: "REUNIÃO DE FECHAMENTO 2026",
    items: ["Retrospectiva do ano", "Indicadores e entregas", "Prioridades de 2027"],
  },
  {
    time: "11H",
    until: "16H",
    color: "green",
    tag: "STRESS TEST",
    title: "CÁRDIO QUEIMA BUCHO",
    items: ["Beach Tennis", "Vôlei", "Futevôlei"],
    note: "Quadras de areia liberadas. R$30 só pra quem for jogar (aceita Wellhub e TotalPass).",
  },
  {
    time: "12H",
    until: null,
    color: "orange",
    tag: "REABASTECIMENTO",
    title: "COMES E BEBES",
    items: ["Comida", "Cerveja", "Drinks", "Açaí"],
    note: "A partir das 12h. Cada um pede e paga o que quiser direto nos quiosques.",
  },
  {
    time: "15H30",
    until: null,
    color: "purple",
    tag: "RELEASE NOTES",
    title: "ENCERRAMENTO E AGRADECIMENTOS",
    items: ["Mensagem de fechamento do ano"],
  },
  {
    time: "16H",
    until: "22H",
    color: "yellow",
    tag: "MODO LIVRE",
    title: "CADA UM POR SI",
    items: ["Quadras offline", "Bar online"],
    note: "As quadras fecham às 16h, mas o bar segue aberto até as 22h.",
  },
] as const;

export const SPORTS = ["Beach Tennis", "Futevôlei", "Vôlei", "Livre"] as const;

export const INFO_UTEIS = [
  {
    icon: "ticket",
    color: "green",
    title: "ENTRADA LIBERADA",
    description:
      "Sem ingresso e sem consumação mínima. Só paga quem for jogar nas quadras (R$30). Fora isso, é só chegar e pedir o que quiser no local.",
  },
  {
    icon: "utensils",
    color: "orange",
    title: "COMIDA E BEBIDA",
    description:
      "O local tem cardápio bem completo: refeições, lanches, porções e açaí, além de bebidas não alcoólicas e drinks. Cada um pede e paga o que quiser, no seu ritmo.",
    linkLabel: "Acesse os cardápios dos food trucks",
    href: "/comidas",
  },
  {
    icon: "shower",
    color: "magenta",
    title: "VESTIÁRIO COMPLETO",
    description:
      "Armário e chuveiro à disposição. Leve uma troca de roupa, tome um banho depois das quadras e siga pro modo livre.",
  },
  {
    icon: "parking",
    color: "purple",
    title: "ESTACIONAMENTO",
    description:
      "A arena não tem vaga própria, mas a região tem bastante opção de estacionamento pago pertinho.",
    linkLabel: "Ver estacionamentos próximos",
    linkUrlKey: "parkingMapsUrl",
  },
  {
    icon: "shirt",
    color: "yellow",
    title: "O QUE VESTIR",
    description:
      "Pra reunião, o de sempre. Pras quadras, roupa de esporte + protetor solar (o vestiário resolve a troca). Depois, fica à vontade.",
  },
  {
    icon: "rain",
    color: "magenta",
    title: "E SE CHOVER?",
    description:
      "Plano de contingência ativo: a Arena tem área coberta, então o encontro não para por causa de chuva.",
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

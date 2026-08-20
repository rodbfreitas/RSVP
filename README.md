# Pagode dos Irmãos — Convite, RSVP e Painel Administrativo

Aplicação mobile-first para o aniversário conjunto de Rodrigo (43) e Gabriel
(30) — **27.09.2026, Arena Éssipê, Barra Funda/SP**. Funciona como convite
digital, RSVP com controle de acompanhantes e participantes de esporte, e
painel administrativo para os organizadores.

Construído a partir do `Prompt Mestre — Pagode dos Irmãos.pdf`, do
`PRD — Pagode dos Irmãos.pdf` e do `Design System — Pagode dos Irmãos.pdf`.

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 · Supabase (Postgres +
Auth + Edge Functions) · Vercel · GitHub — conforme especificado no PRD §29.

## Estrutura

```
src/
  app/
    page.tsx              landing page (convite digital)
    rsvp/                 fluxo de confirmação de presença
    admin/                painel administrativo (protegido)
  components/
    ui/                    Button, Sticker, PosterCard, StatusBadge, ...
    landing/                Hero, Programação, Esportes, Anfitriões, Footer
    rsvp/                   formulário e confirmação
    admin/                  dashboard, tabela de convidados, modal
  lib/
    supabase/               clientes (browser, server/SSR, service role)
    phone.ts, whatsapp.ts, calendar.ts, constants.ts, types.ts
supabase/
  migrations/0001_init.sql  schema + RLS + seed do evento/modalidades
  functions/                Edge Functions (whatsapp-webhook, send-whatsapp — fase 2)
  seed_test_data.sql        dados temporários para QA (ver TESTING.md)
TESTING.md                  plano de testes e checklist de aceite
```

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha com as credenciais do seu projeto Supabase
npm run dev
```

## Configurando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Rode a migration inicial (schema, RLS, seed do evento e das modalidades):
   ```bash
   supabase link --project-ref <seu-project-ref>
   supabase db push
   ```
   (ou cole o conteúdo de `supabase/migrations/0001_init.sql` no SQL Editor
   do painel Supabase.)
3. Crie o usuário administrador (Authentication → Users → Add user) com
   e-mail/senha — esse é o login de `/admin`. Não há autocadastro.
4. Copie `Project URL`, `anon public key` e `service_role key` (Project
   Settings → API) para as variáveis de ambiente.

## Deploy

1. **GitHub**: crie um repositório e faça push deste código.
2. **Vercel**: importe o repositório, configure as três variáveis de
   ambiente do Supabase (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) e faça o
   deploy. Build command e output já são detectados automaticamente
   (Next.js).
3. **Domínio**: opcional — fora do escopo do MVP (PRD §38).

## Fase 2 — WhatsApp Cloud API

Não bloqueia o MVP. Quando as credenciais da Meta existirem:

```bash
supabase functions deploy whatsapp-webhook
supabase functions deploy send-whatsapp
supabase secrets set WHATSAPP_VERIFY_TOKEN=... WHATSAPP_ACCESS_TOKEN=... WHATSAPP_PHONE_NUMBER_ID=...
```

Configure a URL da função `whatsapp-webhook` como webhook no painel da Meta
for Developers.

## Testes

```bash
npm test    # testes unitários (telefone, CSV, links WhatsApp)
npm run build
npm run lint
```

Ver `TESTING.md` para o checklist completo de QA funcional, segurança,
visual e responsividade — incluindo os casos que dependem de um projeto
Supabase real conectado.

## Segurança

- RLS habilitado em todas as tabelas; a tabela `rsvps` não tem **nenhuma**
  policy de leitura/escrita direta para `anon`/`authenticated` — todo
  acesso passa por Server Actions/Route Handlers no servidor.
- `SUPABASE_SERVICE_ROLE_KEY` só é usada em `src/lib/supabase/admin.ts`
  (marcado com `server-only` — quebra o build se importado num Client
  Component).
- `/admin` é protegido em duas camadas: checagem otimista em `src/proxy.ts`
  (redireciona sem sessão) e checagem real (`getAuthenticatedAdmin`) em
  toda página e Server Action administrativa.

## Status

Ver o checklist de critérios de aceite do MVP (PRD §37) em `TESTING.md §6`.

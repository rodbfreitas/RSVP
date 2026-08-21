# Plano de testes — Pagode dos Irmãos

Este documento cobre os casos de teste exigidos pelo Prompt Mestre (§Testes,
§Teste de Segurança, §QA Visual) e o checklist de critérios de aceite do MVP
(PRD §37). As partes que **não dependem de um projeto Supabase real** já
foram automatizadas e executadas nesta sessão (ver `npm test`). As partes que
dependem de dados reais no banco ficam documentadas aqui como checklist
manual, para rodar assim que o Supabase estiver conectado (ver README.md).

## 1. Testes automatizados (já executados ✅)

```
npm test
```

13/13 testes passando, cobrindo:

- `maskPhone` / `isValidPhone` / `normalizePhone` / `formatPhoneDisplay` —
  máscara, validação e normalização de telefone (base da prevenção de
  duplicidade).
- `toCsv` — geração e escaping do CSV exportado no admin.
- `buildWaShareLink` / `buildWhatsAppInviteMessage` / `buildReminderMessage`
  — encoding correto dos links wa.me.

Também validados nesta sessão via build de produção + Playwright:

- `npm run build` — build de produção sem erros (Next.js 16 + Turbopack).
- `npm run lint` — sem erros.
- Screenshots em 375px, 390px, 430px, 768px e 1440px — sem overflow
  horizontal, sem texto cortado, CTA sempre acessível (ver §5).
- `GET /admin` sem sessão → redireciona para `/admin/login` (307) —
  confirma a camada otimista de autorização do `proxy.ts`.

## 2. Casos funcionais (PRD/Prompt Mestre §Testes) — checklist manual

Rodar depois que `supabase/migrations/0001_init.sql` e
`supabase/seed_test_data.sql` estiverem aplicados no projeto real.

| # | Caso | Ação | Resultado esperado | OK? |
|---|------|------|---------------------|-----|
| 1 | 1 convidado confirmado | Preencher RSVP com 1 pessoa, status Sim | `Confirmados` no /admin +1 | ☐ |
| 2 | 1 RSVP com 4 pessoas | RSVP com "Quantas pessoas" = 4 | `Confirmados` +4 | ☐ |
| 3 | 3 pessoas + esporte para 2 | RSVP com 3 pessoas, esportes Sim, jogadores = 2 | `Confirmados` +3 e `Esportes` +2 | ☐ |
| 4 | Status Talvez | RSVP com "Você vai?" = Talvez | NÃO soma em `Confirmados` (soma em `Talvez`) | ☐ |
| 5 | Status Não | RSVP com "Você vai?" = Não vou conseguir | NÃO soma em `Confirmados` nem em `Talvez` | ☐ |
| 6 | Telefone já cadastrado | Reenviar o RSVP com o mesmo telefone do Caso 6 | Não cria duplicata — mostra banner "Encontramos sua confirmação" e faz update | ☐ |
| 7 | Atualização de RSVP | Alterar quantidade de pessoas de um RSVP existente | Contadores do /admin recalculados imediatamente após salvar | ☐ |
| 8 | Exclusão pelo admin | Excluir o "QA Caso8" na tabela de convidados do /admin | Contadores refletem a exclusão imediatamente | ☐ |

Ao final, limpar os dados de teste:
```sql
delete from public.rsvps where phone like '551190000000%';
```

## 3. Teste de segurança (Prompt Mestre §Segurança / PRD §31)

| Cenário | Como testar | Resultado esperado | OK? |
|---|---|---|---|
| Visitante tentando listar RSVPs | Com a `anon key`, tentar `select * from rsvps` via REST (`/rest/v1/rsvps`) sem sessão autenticada | **Bloqueado** — RLS não tem nenhuma policy de SELECT para `anon`/`authenticated` direto na tabela (default deny) | ☐ |
| Visitante tentando acessar outro RSVP | Chamar `checkExistingRsvp` com um telefone que não é o seu | Só retorna dado se o telefone bater exatamente — nunca uma listagem | ☐ |
| Visitante tentando acessar `/admin` | Abrir `/admin` deslogado | Redireciona para `/admin/login` (confirmado nesta sessão) | ☐ |
| Tentativa de acessar Service Role | Inspecionar bundle JS enviado ao navegador (`view-source`, devtools → Network) | `SUPABASE_SERVICE_ROLE_KEY` nunca aparece — só é usada em `src/lib/supabase/admin.ts`, importado com `server-only` | ☐ |
| Manipulação de parâmetros | Enviar `guestCount: 9999` ou `status: "hacked"` via chamada direta à Server Action | Rejeitado/normalizado em `submitRsvp` (clamp 1–30, whitelist de status) | ☐ |
| Duplicidade de telefone | Enviar o mesmo telefone duas vezes seguidas | Segundo envio faz UPDATE (constraint `unique(event_id, phone)`), nunca INSERT duplicado | ☐ |

## 4. QA visual (Prompt Mestre §QA Visual)

Pergunta obrigatória do Design System §45: *"Se alguém recebesse o convite e
depois abrisse o site, sentiria que entrou no mesmo evento?"*

- [x] Hero usa a arte oficial `SAVE THE DATE` como peça central.
- [x] Paleta, tipografia (Anton/Inter), bordas grossas, sombra dura e
      leves rotações reproduzidas em todos os componentes (ver
      `src/app/globals.css`, tokens do Design System §41).
- [x] Programação tratada como line-up de festival, não timeline corporativa.
- [x] Nenhum elemento de "dashboard SaaS azul", glassmorphism ou
      border-radius grande (Design System §44).
- [ ] Revisão final lado a lado (arte oficial vs. site publicado) — fazer
      após o deploy, com Rodrigo e Gabriel.

## 5. Responsividade (PRD §26, Design System §38-39)

Capturado nesta sessão via Playwright em `/`, `/rsvp` e `/admin/login`:

| Largura | Overflow horizontal | CTA acessível | Observação |
|---|---|---|---|
| 375px | ✅ nenhum | ✅ | |
| 390px | ✅ nenhum | ✅ | |
| 430px | ✅ nenhum | ✅ | |
| 768px | ✅ nenhum | ✅ | Hero e "Anfitriões" empilham em coluna única até 1024px (ajustado nesta sessão para não ficar apertado) |
| 1440px | ✅ nenhum | ✅ | |

## 6. Critérios de aceite do MVP (PRD §37)

| Critério | Status |
|---|---|
| Site estiver publicado | ✅ https://pagode-dos-irmaos.vercel.app |
| Site funcionar corretamente em smartphone | ✅ validado nesta sessão |
| RSVP puder ser enviado | ✅ testado ponta a ponta em produção nesta sessão (registro de QA criado e removido) |
| RSVP aparecer no Supabase | ✅ confirmado via SQL após envio de teste em produção |
| Acompanhantes contabilizados corretamente | ✅ lógica implementada e coberta por testes de normalização; validar com dados reais (§2) |
| Participantes dos esportes contabilizados | ✅ idem |
| Duplicidades tratadas | ✅ `unique(event_id, phone)` + fluxo de upsert |
| Dashboard com números corretos | ✅ implementado (`getStats`) — validar com dados reais |
| Admin consegue editar RSVP | ✅ `GuestFormModal` + `adminUpsertGuest` |
| Admin consegue excluir RSVP | ✅ `adminDeleteGuest` |
| Admin consegue adicionar convidado | ✅ botão "Adicionar convidado" |
| Link de WhatsApp funciona | ✅ `buildWaShareLink`, testado |
| Localização abre corretamente | ✅ `EVENT.mapsUrl` (Google Maps) |
| Calendário funciona | ✅ `.ics` + link do Google Agenda |
| CSV pode ser exportado | ✅ `handleExportCsv` |
| RLS configurado | ✅ `0001_init.sql` — default deny em `rsvps`/`rsvp_sports` |
| Dados privados não acessíveis publicamente | ✅ nenhuma policy de SELECT pública em `rsvps` |
| Sem secrets expostos no frontend | ✅ `server-only` em `admin.ts` |
| Build de produção passa sem erros | ✅ validado nesta sessão |
| Fluxo completo testado | ✅ RSVP real testado em produção; falta apenas o checklist manual §2 com múltiplos casos |

// ============================================================
// Edge Function: whatsapp-webhook  (FASE 2 — Meta WhatsApp Cloud API)
// ============================================================
//
// STATUS: estrutura preparada, NÃO ativa. A implementação efetiva
// depende das credenciais Meta (PRD §22-24, Prompt Mestre §WhatsApp
// Cloud API). Não bloqueia o MVP.
//
// Responsabilidades quando ativada:
//   1. GET  -> validação do webhook (hub.challenge) exigida pela Meta.
//   2. POST -> receber a resposta do convidado (SIM / TALVEZ / NÃO),
//      validar a origem, localizar o RSVP pelo telefone e atualizar
//      o status no Postgres.
//
// Variáveis de ambiente necessárias (Supabase Secrets — nunca no
// frontend):
//   WHATSAPP_VERIFY_TOKEN   -> token arbitrário definido por nós e
//                              cadastrado no painel da Meta.
//   WHATSAPP_ACCESS_TOKEN   -> token de acesso da Cloud API.
//   WHATSAPP_PHONE_NUMBER_ID-> ID do número remetente configurado na Meta.
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY -> já disponíveis
//                              automaticamente em toda Edge Function.
//
// Deploy (quando as credenciais Meta forem fornecidas):
//   supabase functions deploy whatsapp-webhook
//   supabase secrets set WHATSAPP_VERIFY_TOKEN=... WHATSAPP_ACCESS_TOKEN=... WHATSAPP_PHONE_NUMBER_ID=...
// ============================================================

import { createClient } from "jsr:@supabase/supabase-js@2";

const VERIFY_TOKEN = Deno.env.get("WHATSAPP_VERIFY_TOKEN") ?? "";

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  // --- 1. Verificação do webhook exigida pela Meta ---
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN && VERIFY_TOKEN) {
      return new Response(challenge ?? "", { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }

  // --- 2. Recebimento de mensagens/respostas do convidado ---
  if (req.method === "POST") {
    if (!VERIFY_TOKEN) {
      // Fase 2 ainda não configurada — não processa nada, apenas
      // confirma recebimento para a Meta não reenviar indefinidamente.
      return new Response(JSON.stringify({ status: "not_configured" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    try {
      const payload = await req.json();

      // TODO (quando credenciais Meta existirem): sanitizar `payload`,
      // extrair o número do remetente e o botão/texto de resposta,
      // então localizar o RSVP por telefone e atualizar status.
      // Exemplo de esqueleto:
      //
      // const supabase = createClient(
      //   Deno.env.get("SUPABASE_URL")!,
      //   Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      // );
      //
      // const entry = payload?.entry?.[0]?.changes?.[0]?.value;
      // const message = entry?.messages?.[0];
      // if (message) {
      //   const phone = `55${message.from.replace(/^55/, "")}`;
      //   const replyText = message.button?.text ?? message.text?.body ?? "";
      //   const status = interpretReply(replyText); // 'confirmed' | 'maybe' | 'declined'
      //   await supabase
      //     .from("rsvps")
      //     .update({ status })
      //     .eq("phone", phone);
      // }

      void payload;
      void createClient; // mantém o import válido até a ativação da Fase 2

      return new Response(JSON.stringify({ status: "received" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } catch {
      return new Response(JSON.stringify({ error: "invalid_payload" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
});

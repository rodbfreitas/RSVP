// ============================================================
// Edge Function: send-whatsapp  (FASE 2 — opcional, Meta WhatsApp Cloud API)
// ============================================================
//
// STATUS: estrutura preparada, NÃO ativa. Depende das mesmas
// credenciais Meta descritas em whatsapp-webhook/index.ts.
//
// Responsabilidade: enviar mensagens/templates aprovados via Cloud API
// (ex.: lembretes em massa). No MVP, lembretes são enviados manualmente
// pelo admin via link wa.me (ver src/lib/whatsapp.ts).
//
// Deploy (quando as credenciais Meta forem fornecidas):
//   supabase functions deploy send-whatsapp
// ============================================================

const ACCESS_TOKEN = Deno.env.get("WHATSAPP_ACCESS_TOKEN") ?? "";
const PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID") ?? "";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
    return new Response(
      JSON.stringify({ error: "whatsapp_cloud_api_not_configured" }),
      { status: 503, headers: { "content-type": "application/json" } },
    );
  }

  const { to, templateName, params } = await req.json();

  const response = await fetch(
    `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: { code: "pt_BR" },
          components: params ?? [],
        },
      }),
    },
  );

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { "content-type": "application/json" },
  });
});

import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com a SERVICE ROLE KEY.
 *
 * REGRA DE OURO: este arquivo importa "server-only" — qualquer tentativa
 * de importá-lo a partir de um Client Component quebra o build. A Service
 * Role Key nunca é enviada ao navegador (PRD §31, Prompt Mestre §Segurança).
 *
 * Usado apenas dentro de Server Actions e Route Handlers, dois lugares:
 * 1) fluxo público de RSVP (criar/consultar/atualizar o PRÓPRIO RSVP por
 *    telefone — nunca listar);
 * 2) painel /admin, sempre depois de `getAuthenticatedAdmin()` confirmar
 *    que existe uma sessão de administrador válida.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase ainda não configurado: defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

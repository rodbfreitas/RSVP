"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para uso no browser.
 * Usa exclusivamente a ANON KEY — nunca a Service Role Key.
 * Utilizado apenas para o login do administrador (Supabase Auth).
 * Nenhuma leitura/escrita de RSVP acontece diretamente pelo browser:
 * isso é feito via Server Actions / Route Handlers (fluxo seguro).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

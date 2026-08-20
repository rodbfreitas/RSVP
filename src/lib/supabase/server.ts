import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Cliente Supabase para uso em Server Components / Server Actions,
 * autenticado com a sessão do usuário (cookies). Usado para validar
 * se o administrador está logado (Supabase Auth). Respeita RLS.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Chamado a partir de um Server Component sem permissão de escrita.
            // Middleware/Server Action cuidam de manter a sessão atualizada.
          }
        },
      },
    },
  );
}

/**
 * Retorna o usuário autenticado atual (ou null). Deve ser usado em
 * toda rota /admin e em toda Server Action administrativa antes de
 * qualquer leitura/escrita.
 */
export async function getAuthenticatedAdmin() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Usado em páginas /admin/*: garante sessão válida ou redireciona ao login. */
export async function requireAdminOrRedirect() {
  const user = await getAuthenticatedAdmin();
  if (!user) redirect("/admin/login");
  return user;
}

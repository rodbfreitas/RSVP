import { getAuthenticatedAdmin } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedAdmin();

  // A página de login cuida do próprio fluxo (sem essa checagem, o
  // usuário nunca conseguiria ver o formulário de login).
  // A checagem "de verdade" acontece aqui e em toda Server Action de /admin.

  return (
    <div className="flex-1 flex flex-col paper-texture">
      {user ? (
        <header className="border-b border-line bg-paper-light">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
            <p className="font-display uppercase text-lg md:text-xl">
              <span className="font-mono text-green">&gt;_</span> GovSec <span className="text-muted font-mono text-sm md:text-base">/admin</span>
            </p>
            <LogoutButton />
          </div>
        </header>
      ) : null}
      <div className="flex-1">{children}</div>
    </div>
  );
}

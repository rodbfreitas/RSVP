"use client";

import { LogOut } from "lucide-react";
import { useTransition } from "react";
import { logoutAdmin } from "@/app/admin/actions";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => logoutAdmin())}
      disabled={pending}
      className="inline-flex items-center gap-1.5 text-sm font-bold uppercase text-ink/70 hover:text-ink focus-ring disabled:opacity-50"
    >
      <LogOut size={16} aria-hidden />
      Sair
    </button>
  );
}

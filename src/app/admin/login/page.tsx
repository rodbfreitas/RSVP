"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("E-mail ou senha incorretos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="flex-1 flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="stamp bg-purple text-paper-light px-5 py-3 gap-2">
            <Lock size={20} aria-hidden />
            <span className="font-display text-lg">ÁREA RESTRITA</span>
          </div>
        </div>

        <h1 className="font-display uppercase text-2xl md:text-3xl text-center mb-8">
          Painel dos organizadores
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-bold uppercase mb-2">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[52px] border-2 border-ink bg-paper-light px-4 text-base focus-ring"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold uppercase mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full min-h-[52px] border-2 border-ink bg-paper-light px-4 text-base focus-ring"
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm font-bold text-magenta">
              DEU RUIM 😬 {error}
            </p>
          ) : null}

          <Button type="submit" fullWidth loading={loading} disabled={loading}>
            ENTRAR
          </Button>
        </form>
      </div>
    </main>
  );
}

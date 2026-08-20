"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { maskPhone, isValidPhone } from "@/lib/phone";
import { SPORTS } from "@/lib/constants";
import { StepButtons } from "./StepButtons";
import { Stepper } from "./Stepper";
import { Button } from "@/components/ui/Button";
import { SportBadge } from "@/components/ui/SportBadge";
import { checkExistingRsvp, submitRsvp } from "@/app/rsvp/actions";
import type { RsvpWithSports, RsvpStatus, SportsStatus } from "@/lib/types";
import { UserCheck } from "lucide-react";

interface RsvpFormProps {
  onSuccess: (rsvp: RsvpWithSports, wasUpdate: boolean) => void;
  initial?: RsvpWithSports | null;
}

export function RsvpForm({ onSuccess, initial }: RsvpFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(
    initial ? maskPhone(initial.phone.replace(/^55/, "")) : "",
  );
  const [status, setStatus] = useState<RsvpStatus>(initial?.status ?? "confirmed");
  const [guestCount, setGuestCount] = useState(initial?.guest_count ?? 1);
  const [sportsStatus, setSportsStatus] = useState<SportsStatus>(
    initial?.sports_status ?? "no",
  );
  const [sportsCount, setSportsCount] = useState(initial?.sports_count ?? 1);
  const [sports, setSports] = useState<string[]>(initial?.sports ?? []);

  const [existing, setExisting] = useState<RsvpWithSports | null>(initial ?? null);
  const [checking, setChecking] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const lastChecked = useRef<string | null>(initial?.phone ?? null);

  useEffect(() => {
    if (!isValidPhone(phone)) return;
    const digits = phone;
    if (digits === lastChecked.current) return;

    const timer = setTimeout(() => {
      setChecking(true);
      checkExistingRsvp(phone).then((res) => {
        lastChecked.current = digits;
        setChecking(false);
        if (res.found && res.rsvp) {
          setExisting(res.rsvp);
          setName(res.rsvp.name);
          setStatus(res.rsvp.status);
          setGuestCount(res.rsvp.guest_count);
          setSportsStatus(res.rsvp.sports_status);
          setSportsCount(res.rsvp.sports_count || 1);
          setSports(res.rsvp.sports);
        } else {
          setExisting(null);
        }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [phone]);

  const toggleSport = (sport: string) => {
    setSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError(null);

    if (name.trim().length < 2) {
      setError("Digite seu nome completo.");
      return;
    }
    if (!isValidPhone(phone)) {
      setError("Confira seu WhatsApp — precisa ter DDD + número.");
      return;
    }

    startTransition(async () => {
      const result = await submitRsvp({
        name,
        phone,
        status,
        guestCount,
        sportsStatus,
        sportsCount,
        sports,
      });

      if (!result.ok || !result.rsvp) {
        setError(result.error ?? "Deu ruim. Tenta de novo.");
        return;
      }
      onSuccess(result.rsvp, Boolean(result.wasUpdate));
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {existing ? (
        <div className="flex items-start gap-2 border-[3px] border-purple bg-purple/10 px-4 py-3 text-sm md:text-base">
          <UserCheck size={20} className="text-purple flex-none mt-0.5" aria-hidden />
          <p>
            Encontramos sua confirmação, <strong>{existing.name}</strong>! Os
            campos abaixo já vieram preenchidos — é só ajustar o que mudou.
          </p>
        </div>
      ) : null}

      <div>
        <label htmlFor="name" className="block text-sm md:text-base font-bold uppercase mb-2">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome completo"
          className="w-full min-h-[56px] border-2 border-ink bg-paper-light px-4 text-base md:text-lg focus-ring"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm md:text-base font-bold uppercase mb-2">
          WhatsApp
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(maskPhone(e.target.value))}
          placeholder="(11) 99999-9999"
          className="w-full min-h-[56px] border-2 border-ink bg-paper-light px-4 text-base md:text-lg focus-ring"
          required
        />
        {checking ? (
          <p className="text-xs text-ink/50 mt-1">Verificando...</p>
        ) : null}
      </div>

      <div>
        <p className="block text-sm md:text-base font-bold uppercase mb-2">
          Você vai?
        </p>
        <StepButtons
          name="Você vai?"
          value={status}
          onChange={setStatus}
          options={[
            { value: "confirmed", label: "Sim" },
            { value: "maybe", label: "Talvez" },
            { value: "declined", label: "Não vou" },
          ]}
        />
      </div>

      {status !== "declined" ? (
        <Stepper
          label="Quantas pessoas irão, contando com você?"
          value={guestCount}
          onChange={setGuestCount}
        />
      ) : null}

      <div>
        <p className="block text-sm md:text-base font-bold uppercase mb-2">
          Vai participar dos esportes pela manhã?
        </p>
        <StepButtons
          name="Vai participar dos esportes?"
          value={sportsStatus}
          onChange={setSportsStatus}
          options={[
            { value: "yes", label: "Sim" },
            { value: "maybe", label: "Talvez" },
            { value: "no", label: "Não" },
          ]}
        />
      </div>

      {sportsStatus !== "no" ? (
        <>
          <Stepper
            label="Quantas pessoas irão jogar?"
            value={sportsCount}
            onChange={setSportsCount}
            min={1}
          />
          <div>
            <p className="block text-sm md:text-base font-bold uppercase mb-2">
              Modalidades
            </p>
            <div className="flex flex-wrap gap-2">
              {SPORTS.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => toggleSport(sport === "Livre" ? "Livre" : sport)}
                  className="focus-ring"
                >
                  <SportBadge
                    name={sport === "Livre" ? "O que estiver rolando" : sport}
                    selected={sports.includes(sport)}
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {error ? (
        <p role="alert" className="text-sm font-bold text-magenta">
          DEU RUIM 😬 {error}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        color="magenta"
        fullWidth
        loading={pending}
        disabled={pending}
      >
        CONFIRMAR PRESENÇA
      </Button>

      {touched ? null : (
        <p className="text-xs text-center text-ink/50">
          Leva uns 30 segundos. Sem cadastro, sem senha.
        </p>
      )}
    </form>
  );
}

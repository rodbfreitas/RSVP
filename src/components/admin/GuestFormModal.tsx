"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StepButtons } from "@/components/rsvp/StepButtons";
import { Stepper } from "@/components/rsvp/Stepper";
import { SportBadge } from "@/components/ui/SportBadge";
import { maskPhone, isValidPhone } from "@/lib/phone";
import { adminUpsertGuest } from "@/app/admin/actions";
import type { RsvpStatus, RsvpWithSports, SportsStatus } from "@/lib/types";

export function GuestFormModal({
  guest,
  allSports,
  onClose,
  onSaved,
}: {
  guest: RsvpWithSports | null;
  allSports: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(guest?.name ?? "");
  const [phone, setPhone] = useState(
    guest ? maskPhone(guest.phone.replace(/^55/, "")) : "",
  );
  const [status, setStatus] = useState<RsvpStatus>(guest?.status ?? "confirmed");
  const [guestCount, setGuestCount] = useState(guest?.guest_count ?? 1);
  const [sportsStatus, setSportsStatus] = useState<SportsStatus>(
    guest?.sports_status ?? "no",
  );
  const [sportsCount, setSportsCount] = useState(guest?.sports_count ?? 1);
  const [sports, setSports] = useState<string[]>(guest?.sports ?? []);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const toggleSport = (sport: string) => {
    setSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) return setError("Nome inválido.");
    if (!isValidPhone(phone)) return setError("Telefone inválido.");

    startTransition(async () => {
      const result = await adminUpsertGuest({
        id: guest?.id,
        name,
        phone,
        status,
        guestCount,
        sportsStatus,
        sportsCount,
        sports,
      });
      if (!result.ok) {
        setError(result.error ?? "Erro ao salvar.");
        return;
      }
      onSaved();
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/60 flex items-end md:items-center justify-center p-0 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guest-modal-title"
    >
      <div className="bg-paper w-full md:max-w-lg md:border-[3px] md:border-ink md:shadow-hard-lg max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 id="guest-modal-title" className="font-display uppercase text-2xl">
            {guest ? "Editar convidado" : "Adicionar convidado"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 hover:bg-ink/5 focus-ring"
          >
            <X size={22} aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="g-name" className="block text-sm font-bold uppercase mb-2">
              Nome
            </label>
            <input
              id="g-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full min-h-[52px] border-2 border-ink bg-paper-light px-4 focus-ring"
            />
          </div>

          <div>
            <label htmlFor="g-phone" className="block text-sm font-bold uppercase mb-2">
              WhatsApp
            </label>
            <input
              id="g-phone"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              className="w-full min-h-[52px] border-2 border-ink bg-paper-light px-4 focus-ring"
            />
          </div>

          <div>
            <p className="block text-sm font-bold uppercase mb-2">Status</p>
            <StepButtons
              name="Status"
              value={status}
              onChange={setStatus}
              options={[
                { value: "confirmed", label: "Sim" },
                { value: "maybe", label: "Talvez" },
                { value: "declined", label: "Não vai" },
              ]}
            />
          </div>

          {status !== "declined" ? (
            <Stepper label="Pessoas" value={guestCount} onChange={setGuestCount} />
          ) : null}

          <div>
            <p className="block text-sm font-bold uppercase mb-2">Esportes</p>
            <StepButtons
              name="Esportes"
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
                label="Jogadores"
                value={sportsCount}
                onChange={setSportsCount}
                min={1}
              />
              <div className="flex flex-wrap gap-2">
                {allSports.map((sport) => (
                  <button
                    key={sport}
                    type="button"
                    onClick={() => toggleSport(sport)}
                    className="focus-ring"
                  >
                    <SportBadge
                      name={sport === "Livre" ? "O que estiver rolando" : sport}
                      selected={sports.includes(sport)}
                    />
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {error ? (
            <p role="alert" className="text-sm font-bold text-magenta">
              {error}
            </p>
          ) : null}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={onClose}
              disabled={pending}
            >
              Cancelar
            </Button>
            <Button type="submit" fullWidth loading={pending} disabled={pending}>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

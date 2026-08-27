"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RsvpForm } from "@/components/rsvp/RsvpForm";
import { RsvpConfirmation } from "@/components/rsvp/RsvpConfirmation";
import { EVENT } from "@/lib/constants";
import type { RsvpWithSports } from "@/lib/types";

export default function RsvpPage() {
  const [confirmed, setConfirmed] = useState<{
    rsvp: RsvpWithSports;
    wasUpdate: boolean;
  } | null>(null);
  const [editing, setEditing] = useState(false);

  const showForm = !confirmed || editing;

  return (
    <main className="flex-1 flex flex-col px-5 md:px-8 py-10 md:py-16">
      <div className="max-w-md mx-auto w-full">
        {showForm ? (
          <>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-ink mb-6"
            >
              <ArrowLeft size={16} aria-hidden />
              Voltar
            </Link>

            <h1 className="font-display uppercase text-3xl md:text-4xl mb-1">
              Confirme sua presença
            </h1>
            <p className="text-ink/70 mb-1">
              Pagode dos Irmãos · 27.09.2026 · Arena Éssipê
            </p>
            <p className="text-sm text-magenta font-bold mb-8">
              Confirme, de preferência, até {EVENT.rsvpDeadlineLabel}.
            </p>

            <RsvpForm
              initial={confirmed?.rsvp ?? null}
              onSuccess={(rsvp, wasUpdate) => {
                setConfirmed({ rsvp, wasUpdate });
                setEditing(false);
              }}
            />
          </>
        ) : (
          <RsvpConfirmation
            rsvp={confirmed!.rsvp}
            wasUpdate={confirmed!.wasUpdate}
            onEdit={() => setEditing(true)}
          />
        )}
      </div>
    </main>
  );
}

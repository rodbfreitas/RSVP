"use client";

import { MapPin, CalendarPlus, Share2, Check } from "lucide-react";
import { useState } from "react";
import { Button, buttonClasses } from "./Button";
import { EVENT } from "@/lib/constants";
import { buildGoogleCalendarLink, buildIcsContent } from "@/lib/calendar";
import { cn } from "@/lib/utils";

export function LocationButton({ className }: { className?: string }) {
  return (
    <a
      href={EVENT.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses({ variant: "secondary", className })}
    >
      <MapPin size={20} aria-hidden />
      COMO CHEGAR
    </a>
  );
}

export function CalendarButton({ className }: { className?: string }) {
  const handleClick = () => {
    // Baixa o .ics — funciona em qualquer plataforma sem depender de app específico.
    const blob = new Blob([buildIcsContent()], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pagode-dos-irmaos.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="secondary" className={className} onClick={handleClick}>
      <CalendarPlus size={20} aria-hidden />
      ADICIONAR À AGENDA
    </Button>
  );
}

export function GoogleCalendarLink({ className }: { className?: string }) {
  return (
    <a
      href={buildGoogleCalendarLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("text-sm underline underline-offset-4", className)}
    >
      ou adicionar no Google Agenda
    </a>
  );
}

export function ShareButton({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: message });
        return;
      } catch {
        // usuário cancelou ou share falhou — cai no fallback abaixo
      }
    }
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  return (
    <Button
      variant="secondary"
      color="green"
      className={className}
      onClick={handleShare}
    >
      {copied ? <Check size={20} aria-hidden /> : <Share2 size={20} aria-hidden />}
      {copied ? "LINK COPIADO!" : "MANDAR PRA GALERA"}
    </Button>
  );
}

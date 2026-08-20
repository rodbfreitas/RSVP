"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { normalizePhone, isValidPhone } from "@/lib/phone";
import { EVENT } from "@/lib/constants";
import type { RsvpFormInput, RsvpWithSports } from "@/lib/types";

async function getEventId(supabase: ReturnType<typeof createAdminClient>) {
  const { data, error } = await supabase
    .from("events")
    .select("id")
    .eq("slug", EVENT.slug)
    .single();

  if (error || !data) {
    throw new Error(
      "Evento não encontrado. Verifique se as migrations do Supabase foram aplicadas.",
    );
  }
  return data.id as string;
}

async function attachSports(
  supabase: ReturnType<typeof createAdminClient>,
  rsvpId: string,
  sportNames: string[],
) {
  await supabase.from("rsvp_sports").delete().eq("rsvp_id", rsvpId);

  if (sportNames.length === 0) return;

  const { data: sportRows } = await supabase
    .from("sports")
    .select("id, name")
    .in("name", sportNames);

  if (!sportRows || sportRows.length === 0) return;

  await supabase.from("rsvp_sports").insert(
    sportRows.map((s) => ({ rsvp_id: rsvpId, sport_id: s.id })),
  );
}

async function loadRsvpWithSports(
  supabase: ReturnType<typeof createAdminClient>,
  rsvpId: string,
): Promise<RsvpWithSports> {
  const { data: rsvp, error } = await supabase
    .from("rsvps")
    .select("*")
    .eq("id", rsvpId)
    .single();

  if (error || !rsvp) throw new Error("RSVP não encontrado.");

  const { data: sportsLinks } = await supabase
    .from("rsvp_sports")
    .select("sports(name)")
    .eq("rsvp_id", rsvpId);

  const sports =
    (sportsLinks
      ?.map((l) => (l as unknown as { sports: { name: string } | null }).sports?.name)
      .filter(Boolean) as string[]) ?? [];

  return { ...rsvp, sports };
}

export interface CheckPhoneResult {
  found: boolean;
  rsvp?: RsvpWithSports;
}

/**
 * Consulta se já existe um RSVP para este telefone, no fluxo público.
 * Retorna apenas o registro do próprio telefone consultado — nunca uma
 * listagem (PRD §13, §31).
 */
export async function checkExistingRsvp(
  rawPhone: string,
): Promise<CheckPhoneResult> {
  if (!isValidPhone(rawPhone)) return { found: false };

  const supabase = createAdminClient();
  const phone = normalizePhone(rawPhone);
  const eventId = await getEventId(supabase);

  const { data } = await supabase
    .from("rsvps")
    .select("id")
    .eq("event_id", eventId)
    .eq("phone", phone)
    .maybeSingle();

  if (!data) return { found: false };

  const rsvp = await loadRsvpWithSports(supabase, data.id);
  return { found: true, rsvp };
}

export interface SubmitRsvpResult {
  ok: boolean;
  error?: string;
  rsvp?: RsvpWithSports;
  wasUpdate?: boolean;
}

/**
 * Cria ou atualiza (upsert por telefone) o RSVP do convidado.
 * Este é o único ponto de escrita pública na tabela `rsvps` — sempre
 * via Service Role Key no servidor, nunca pelo navegador (fluxo seguro
 * exigido no PRD §31).
 */
export async function submitRsvp(
  input: RsvpFormInput,
): Promise<SubmitRsvpResult> {
  const name = input.name.trim();

  if (name.length < 2) {
    return { ok: false, error: "Digite seu nome completo." };
  }
  if (!isValidPhone(input.phone)) {
    return { ok: false, error: "Telefone inválido. Confira o DDD e o número." };
  }
  if (!["confirmed", "maybe", "declined"].includes(input.status)) {
    return { ok: false, error: "Selecione se você vai." };
  }
  const guestCount = Math.min(30, Math.max(1, Math.trunc(input.guestCount || 1)));

  const sportsStatus = ["yes", "maybe", "no"].includes(input.sportsStatus)
    ? input.sportsStatus
    : "no";
  const sportsCount =
    sportsStatus === "no"
      ? 0
      : Math.min(30, Math.max(0, Math.trunc(input.sportsCount || 0)));
  const sports = sportsStatus === "no" ? [] : input.sports;

  try {
    const supabase = createAdminClient();
    const phone = normalizePhone(input.phone);
    const eventId = await getEventId(supabase);

    const { data: existing } = await supabase
      .from("rsvps")
      .select("id")
      .eq("event_id", eventId)
      .eq("phone", phone)
      .maybeSingle();

    let rsvpId: string;
    const wasUpdate = Boolean(existing);

    if (existing) {
      const { error } = await supabase
        .from("rsvps")
        .update({
          name,
          status: input.status,
          guest_count: guestCount,
          sports_status: sportsStatus,
          sports_count: sportsCount,
        })
        .eq("id", existing.id);
      if (error) throw error;
      rsvpId = existing.id;
    } else {
      const { data: created, error } = await supabase
        .from("rsvps")
        .insert({
          event_id: eventId,
          name,
          phone,
          status: input.status,
          guest_count: guestCount,
          sports_status: sportsStatus,
          sports_count: sportsCount,
        })
        .select("id")
        .single();
      if (error || !created) throw error;
      rsvpId = created.id;
    }

    await attachSports(supabase, rsvpId, sports);
    const rsvp = await loadRsvpWithSports(supabase, rsvpId);

    return { ok: true, rsvp, wasUpdate };
  } catch (err) {
    console.error("[submitRsvp] erro:", err);
    return {
      ok: false,
      error: "Não conseguimos registrar sua confirmação. Tenta novamente.",
    };
  }
}

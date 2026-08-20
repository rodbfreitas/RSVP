"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthenticatedAdmin, createServerSupabaseClient } from "@/lib/supabase/server";
import { normalizePhone, isValidPhone } from "@/lib/phone";
import { EVENT, SPORTS } from "@/lib/constants";
import { redirect } from "next/navigation";
import type { RsvpStats, RsvpWithSports, RsvpFormInput } from "@/lib/types";

async function requireAdmin() {
  const user = await getAuthenticatedAdmin();
  if (!user) {
    throw new Error("Não autorizado. Faça login novamente.");
  }
  return user;
}

async function getEventId(supabase: ReturnType<typeof createAdminClient>) {
  const { data } = await supabase
    .from("events")
    .select("id")
    .eq("slug", EVENT.slug)
    .single();
  return data?.id as string;
}

export async function logoutAdmin() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function getStats(): Promise<RsvpStats> {
  await requireAdmin();
  const supabase = createAdminClient();
  const eventId = await getEventId(supabase);

  const { data } = await supabase
    .from("rsvps")
    .select("status, guest_count, sports_count")
    .eq("event_id", eventId);

  const rows = data ?? [];
  const confirmedGuests = rows
    .filter((r) => r.status === "confirmed")
    .reduce((sum, r) => sum + r.guest_count, 0);
  const maybeGuests = rows
    .filter((r) => r.status === "maybe")
    .reduce((sum, r) => sum + r.guest_count, 0);
  const declinedRsvps = rows.filter((r) => r.status === "declined").length;
  const sportsCount = rows.reduce((sum, r) => sum + (r.sports_count || 0), 0);

  return {
    confirmedGuests,
    maybeGuests,
    declinedRsvps,
    sportsCount,
    totalPotential: confirmedGuests + maybeGuests,
  };
}

export async function listGuests(): Promise<RsvpWithSports[]> {
  await requireAdmin();
  const supabase = createAdminClient();
  const eventId = await getEventId(supabase);

  const { data: rsvps } = await supabase
    .from("rsvps")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });

  if (!rsvps || rsvps.length === 0) return [];

  const { data: links } = await supabase
    .from("rsvp_sports")
    .select("rsvp_id, sports(name)")
    .in(
      "rsvp_id",
      rsvps.map((r) => r.id),
    );

  const sportsByRsvp = new Map<string, string[]>();
  for (const link of links ?? []) {
    const name = (link as unknown as { sports: { name: string } | null }).sports
      ?.name;
    if (!name) continue;
    const arr = sportsByRsvp.get(link.rsvp_id) ?? [];
    arr.push(name);
    sportsByRsvp.set(link.rsvp_id, arr);
  }

  return rsvps.map((r) => ({ ...r, sports: sportsByRsvp.get(r.id) ?? [] }));
}

export interface AdminGuestResult {
  ok: boolean;
  error?: string;
}

export async function adminUpsertGuest(
  input: RsvpFormInput & { id?: string },
): Promise<AdminGuestResult> {
  await requireAdmin();

  const name = input.name.trim();
  if (name.length < 2) return { ok: false, error: "Nome inválido." };
  if (!isValidPhone(input.phone)) return { ok: false, error: "Telefone inválido." };

  try {
    const supabase = createAdminClient();
    const eventId = await getEventId(supabase);
    const phone = normalizePhone(input.phone);
    const guestCount = Math.min(30, Math.max(1, Math.trunc(input.guestCount || 1)));
    const sportsStatus = input.sportsStatus;
    const sportsCount =
      sportsStatus === "no" ? 0 : Math.min(30, Math.max(0, input.sportsCount || 0));

    let rsvpId = input.id;

    if (rsvpId) {
      const { error } = await supabase
        .from("rsvps")
        .update({
          name,
          phone,
          status: input.status,
          guest_count: guestCount,
          sports_status: sportsStatus,
          sports_count: sportsCount,
        })
        .eq("id", rsvpId);
      if (error) throw error;
    } else {
      const { data, error } = await supabase
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
      if (error || !data) throw error;
      rsvpId = data.id;
    }

    await supabase.from("rsvp_sports").delete().eq("rsvp_id", rsvpId);
    if (sportsStatus !== "no" && input.sports.length > 0) {
      const { data: sportRows } = await supabase
        .from("sports")
        .select("id, name")
        .in("name", input.sports);
      if (sportRows && sportRows.length > 0) {
        await supabase
          .from("rsvp_sports")
          .insert(sportRows.map((s) => ({ rsvp_id: rsvpId!, sport_id: s.id })));
      }
    }

    return { ok: true };
  } catch (err) {
    console.error("[adminUpsertGuest] erro:", err);
    return { ok: false, error: "Não foi possível salvar o convidado." };
  }
}

export async function adminDeleteGuest(id: string): Promise<AdminGuestResult> {
  await requireAdmin();
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("rsvps").delete().eq("id", id);
    if (error) throw error;
    return { ok: true };
  } catch (err) {
    console.error("[adminDeleteGuest] erro:", err);
    return { ok: false, error: "Não foi possível excluir." };
  }
}

export async function getAllSports(): Promise<string[]> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data } = await supabase.from("sports").select("name").order("name");
  return data?.map((d) => d.name) ?? [...SPORTS];
}

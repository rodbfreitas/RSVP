export type RsvpStatus = "confirmed" | "maybe" | "declined";
export type SportsStatus = "yes" | "maybe" | "no";

export interface EventRow {
  id: string;
  name: string;
  slug: string;
  event_date: string;
  venue: string;
  address: string;
  maps_url: string;
  target_guests: number;
  created_at: string;
  updated_at: string;
}

export interface SportRow {
  id: string;
  name: string;
}

export interface RsvpRow {
  id: string;
  event_id: string;
  name: string;
  phone: string;
  status: RsvpStatus;
  guest_count: number;
  sports_status: SportsStatus;
  sports_count: number;
  created_at: string;
  updated_at: string;
}

export interface RsvpWithSports extends RsvpRow {
  sports: string[];
}

export interface RsvpFormInput {
  name: string;
  phone: string;
  status: RsvpStatus;
  guestCount: number;
  sportsStatus: SportsStatus;
  sportsCount: number;
  sports: string[];
}

export interface RsvpStats {
  confirmedGuests: number;
  maybeGuests: number;
  declinedRsvps: number;
  sportsCount: number;
  totalPotential: number;
}

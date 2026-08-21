-- ============================================================
-- Pagode dos Irmãos — Schema inicial
-- Fonte: PRD §14 (Banco de Dados) e §31 (RLS)
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- events
-- ------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  event_date date not null,
  venue text not null,
  address text not null,
  maps_url text not null,
  target_guests integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.events is 'Evento único (Pagode dos Irmãos), preparado para múltiplos eventos no futuro.';

-- ------------------------------------------------------------
-- sports
-- ------------------------------------------------------------
create table if not exists public.sports (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

-- ------------------------------------------------------------
-- rsvps
-- ------------------------------------------------------------
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  -- telefone normalizado: 55 + DDD + número (somente dígitos)
  phone text not null check (phone ~ '^55\d{10,11}$'),
  status text not null check (status in ('confirmed', 'maybe', 'declined')),
  guest_count integer not null default 1 check (guest_count >= 1 and guest_count <= 30),
  sports_status text not null default 'no' check (sports_status in ('yes', 'maybe', 'no')),
  sports_count integer not null default 0 check (sports_count >= 0 and sports_count <= 30),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rsvps_event_phone_unique unique (event_id, phone)
);

comment on column public.rsvps.phone is 'Identificador principal do RSVP — normalizado como 55DDDNUMERO. Usado para prevenção de duplicidade (PRD §13).';

create index if not exists rsvps_event_id_idx on public.rsvps (event_id);
create index if not exists rsvps_status_idx on public.rsvps (status);
create index if not exists rsvps_phone_idx on public.rsvps (phone);

-- ------------------------------------------------------------
-- rsvp_sports (N:N)
-- ------------------------------------------------------------
create table if not exists public.rsvp_sports (
  rsvp_id uuid not null references public.rsvps (id) on delete cascade,
  sport_id uuid not null references public.sports (id) on delete cascade,
  primary key (rsvp_id, sport_id)
);

create index if not exists rsvp_sports_sport_id_idx on public.rsvp_sports (sport_id);

-- ------------------------------------------------------------
-- updated_at automático
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

drop trigger if exists set_rsvps_updated_at on public.rsvps;
create trigger set_rsvps_updated_at
  before update on public.rsvps
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.events enable row level security;
alter table public.sports enable row level security;
alter table public.rsvps enable row level security;
alter table public.rsvp_sports enable row level security;

-- events: leitura pública (necessária para renderizar a landing page),
-- escrita somente por usuários autenticados (admin).
drop policy if exists "events_select_public" on public.events;
create policy "events_select_public"
  on public.events for select
  to anon, authenticated
  using (true);

drop policy if exists "events_write_admin" on public.events;
create policy "events_write_admin"
  on public.events for all
  to authenticated
  using (true)
  with check (true);

-- sports: leitura pública, escrita somente admin.
drop policy if exists "sports_select_public" on public.sports;
create policy "sports_select_public"
  on public.sports for select
  to anon, authenticated
  using (true);

drop policy if exists "sports_write_admin" on public.sports;
create policy "sports_write_admin"
  on public.sports for all
  to authenticated
  using (true)
  with check (true);

-- rsvps: NENHUM acesso direto de leitura/escrita para anon ou authenticated.
-- Todo o fluxo público (criar, consultar o próprio RSVP por telefone,
-- atualizar o próprio RSVP) passa por Server Actions/Route Handlers que
-- usam a Service Role Key no servidor (nunca no navegador) — o "fluxo
-- seguro" exigido no PRD §11/§31. O painel /admin também opera via
-- Service Role Key depois de validar a sessão do Supabase Auth.
-- RLS aqui é a última linha de defesa: mesmo que a anon key vaze,
-- nada pode ser lido ou escrito diretamente na tabela.
drop policy if exists "rsvps_no_anon_access" on public.rsvps;
-- (nenhuma policy = nenhum acesso, pois RLS está habilitado e "default deny")

drop policy if exists "rsvp_sports_no_anon_access" on public.rsvp_sports;
-- idem para rsvp_sports.

-- ------------------------------------------------------------
-- Seed: evento e modalidades
-- ------------------------------------------------------------
insert into public.events (name, slug, event_date, venue, address, maps_url, target_guests)
values (
  'Pagode dos Irmãos',
  'pagode-dos-irmaos-2026',
  '2026-09-27',
  'Arena Éssipê',
  'Rua Inhaúma, 71 — Barra Funda, São Paulo/SP',
  'https://www.google.com/maps/search/?api=1&query=Arena+Essipe+Rua+Inhauma+71+Barra+Funda+Sao+Paulo',
  100
)
on conflict (slug) do nothing;

insert into public.sports (name) values
  ('Beach Tennis'),
  ('Futevôlei'),
  ('Vôlei'),
  ('Livre')
on conflict (name) do nothing;

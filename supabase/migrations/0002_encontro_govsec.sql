-- Encontro da Governança de Segurança (17/12/2026).
-- Novo evento na mesma base: os RSVPs do Pagode dos Irmãos continuam no
-- banco, mas ficam fora do site e do painel, que filtram pelo slug do evento.
insert into public.events (name, slug, event_date, venue, address, maps_url, target_guests)
values (
  'Encontro da Governança de Segurança',
  'encontro-governanca-seguranca-2026',
  '2026-12-17',
  'Arena Éssipê',
  'Rua Inhaúma, 71 — Barra Funda, São Paulo/SP',
  'https://www.google.com/maps/search/?api=1&query=Arena+Essipe+Rua+Inhauma+71+Barra+Funda+Sao+Paulo',
  100
)
on conflict (slug) do nothing;

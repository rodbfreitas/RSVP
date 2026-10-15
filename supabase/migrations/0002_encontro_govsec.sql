-- Reaproveita o projeto para o Encontro da Governança de Segurança (17/12/2026).
-- O evento anterior (Pagode dos Irmãos) era pontual; o histórico não é mantido.
delete from public.rsvp_sports;
delete from public.rsvps;

update public.events
set name = 'Encontro da Governança de Segurança',
    slug = 'encontro-governanca-seguranca-2026',
    event_date = '2026-12-17',
    updated_at = now()
where slug = 'pagode-dos-irmaos-2026';

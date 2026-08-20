-- ============================================================
-- Dados TEMPORÁRIOS para QA manual (ver TESTING.md).
-- Rodar apenas em ambiente de teste/staging, nunca em produção.
-- Remove tudo ao final com o DELETE no fim do arquivo.
-- ============================================================

-- Pré-requisito: migrations/0001_init.sql já aplicada (evento + sports seeds).

do $$
declare
  v_event_id uuid;
begin
  select id into v_event_id from public.events where slug = 'pagode-dos-irmaos-2026';

  -- Caso 1: 1 convidado confirmado -> Confirmados +1
  insert into public.rsvps (event_id, name, phone, status, guest_count, sports_status, sports_count)
  values (v_event_id, 'QA Caso1 Solo', '5511900000001', 'confirmed', 1, 'no', 0)
  on conflict (event_id, phone) do nothing;

  -- Caso 2: 1 RSVP com 4 pessoas -> Confirmados +4
  insert into public.rsvps (event_id, name, phone, status, guest_count, sports_status, sports_count)
  values (v_event_id, 'QA Caso2 Familia', '5511900000002', 'confirmed', 4, 'no', 0)
  on conflict (event_id, phone) do nothing;

  -- Caso 3: 3 pessoas + esporte para 2 -> Confirmados +3, Esportes +2
  insert into public.rsvps (event_id, name, phone, status, guest_count, sports_status, sports_count)
  values (v_event_id, 'QA Caso3 Esportistas', '5511900000003', 'confirmed', 3, 'yes', 2)
  on conflict (event_id, phone) do nothing;

  -- Caso 4: status Talvez -> NÃO soma aos confirmados
  insert into public.rsvps (event_id, name, phone, status, guest_count, sports_status, sports_count)
  values (v_event_id, 'QA Caso4 Talvez', '5511900000004', 'maybe', 2, 'no', 0)
  on conflict (event_id, phone) do nothing;

  -- Caso 5: status Não -> NÃO soma aos confirmados
  insert into public.rsvps (event_id, name, phone, status, guest_count, sports_status, sports_count)
  values (v_event_id, 'QA Caso5 NaoVai', '5511900000005', 'declined', 1, 'no', 0)
  on conflict (event_id, phone) do nothing;

  -- Caso 6/7: telefone já cadastrado -> reenviar o mesmo telefone pelo
  -- formulário público não deve gerar duplicidade, deve ATUALIZAR o
  -- registro abaixo e recalcular os contadores.
  insert into public.rsvps (event_id, name, phone, status, guest_count, sports_status, sports_count)
  values (v_event_id, 'QA Caso6 Duplicado', '5511900000006', 'confirmed', 1, 'no', 0)
  on conflict (event_id, phone) do nothing;

  -- Caso 8: exclusão pelo administrador -> os contadores devem refletir
  -- imediatamente após excluir este registro pelo painel /admin.
  insert into public.rsvps (event_id, name, phone, status, guest_count, sports_status, sports_count)
  values (v_event_id, 'QA Caso8 ParaExcluir', '5511900000008', 'confirmed', 2, 'no', 0)
  on conflict (event_id, phone) do nothing;
end $$;

-- ------------------------------------------------------------
-- Ao terminar o QA, remova todos os registros de teste:
-- ------------------------------------------------------------
-- delete from public.rsvps where phone like '551190000000%';

-- ══════════════════════════════════════════════════════════════════
-- CHASSE & PÊCHE — PROTOCOLE v2 (étape 1, 2026-10-17)
-- Serveur autoritaire + table d'événements append-only.
--
-- À COLLER dans l'éditeur SQL du projet Supabase (une seule fois,
-- idempotent). Tant que le client n'a pas basculé sur le protocole v2,
-- rien ne change pour les parties en cours : l'ancien flux continue
-- de fonctionner en parallèle.
-- ══════════════════════════════════════════════════════════════════

-- 1. Table d'événements du tour courant (append-only : un INSERT ne
--    peut PAS écraser les actions d'un autre joueur — fin des races
--    critiques du « dernière écriture gagne »).
create table if not exists public.cp_events (
  id       bigint generated always as identity primary key,
  salon    text not null,
  tour     int  not null,
  joueur   int  not null,
  type     text not null,           -- 'section' (fin de tour), 'done'… v2.1 : actions unitaires
  payload  jsonb not null default '{}'::jsonb,
  cree_le  timestamptz not null default now()
);

create index if not exists cp_events_salon_tour
  on public.cp_events (salon, tour);

-- RLS ouverte (même modèle que parties_chasse_peche : salon par code)
alter table public.cp_events enable row level security;
drop policy if exists "cp_events lecture" on public.cp_events;
create policy "cp_events lecture"
  on public.cp_events for select to anon using (true);
drop policy if exists "cp_events ecriture" on public.cp_events;
create policy "cp_events ecriture"
  on public.cp_events for insert to anon with check (true);
drop policy if exists "cp_events suppression" on public.cp_events;
create policy "cp_events suppression"
  on public.cp_events for delete to anon using (true);

-- Realtime : diffuser les événements du tour (léger : quelques octets)
do $$
begin
  begin
    alter publication supabase_realtime add table public.cp_events;
  exception
    when duplicate_object then null;
  end;
end $$;

-- 2. Colonne du tour publié (l'état de la ligne = le DERNIER tour
--    résolu). C'est la garde de version : toute écriture d'état porte
--    ce numéro, et personne ne peut faire reculer le tour.
alter table public.parties_chasse_peche
  add column if not exists tour_publie int not null default 0;

-- 3. Garde serveur : l'état ne peut JAMAIS reculer de tour
--    (un client périmé, un bug, une collision : le trigger refuse).
create or replace function public.garde_tour_publie()
returns trigger language plpgsql as $$
begin
  if new.tour_publie < old.tour_publie then
    raise exception 'rollback interdit : tour_publie ne peut pas decroitre (% -> %)',
      old.tour_publie, new.tour_publie;
  end if;
  return new;
end $$;

drop trigger if exists garde_tour_publie on public.parties_chasse_peche;
create trigger garde_tour_publie
  before update on public.parties_chasse_peche
  for each row execute function public.garde_tour_publie();

-- 4. Nettoyage automatique : les événements d'un tour résolu sont
--    supprimés une fois le tour publié (la résolution vide sa file).
--    (La fonction resoudre-tour fait le DELETE dans sa transaction ;
--     ce job est un filet de sécurité pour les salons abandonnés.)
create or replace function public.cp_nettoie_events()
returns void language plpgsql security definer as $$
begin
  delete from public.cp_events e
    using public.parties_chasse_peche p
    where e.salon = p.id
      and e.tour < p.tour_publie;
end $$;

-- 5. Verrous consultatifs pour resoudre-tour (pg_try_advisory_lock sur
--    une clé dérivée du salon). Un seul exécutant par salon à la fois.
create or replace function public.cp_advisory_lock(p_salon text)
returns boolean language plpgsql security definer as $$
declare v_ok boolean;
begin
  select pg_try_advisory_lock(hashtext('cp:' || p_salon)) into v_ok;
  return v_ok;
end $$;

create or replace function public.cp_advisory_unlock(p_salon text)
returns void language plpgsql security definer as $$
begin
  perform pg_advisory_unlock(hashtext('cp:' || p_salon));
end $$;

grant execute on function public.cp_advisory_lock(text) to anon, service_role;
grant execute on function public.cp_advisory_unlock(text) to anon, service_role;
grant execute on function public.cp_nettoie_events() to anon, service_role;

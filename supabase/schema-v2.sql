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

-- 4. (supprimé 2026-10-19) l'ancien filet cp_nettoie_events n'était
--    appelé par RIEN (ni cron ni client). La purge se fait À LA MAIN :
--      delete from cp_events where salon = '<salon>';
--    (les events d'un tour RÉSOLU sont déjà purgés par resoudre-tour
--     dans sa transaction — cf. supabase/functions/resoudre-tour.)

-- 5. (RETRAIT 2026-10-19, audit M7 — arbitrage Thibaut « retrait
--    complet ») : les verrous consultatifs cp_advisory_lock/_unlock
--    étaient INOPÉRANTS — chaque RPC PostgREST roule sur une connexion
--    du pool, l'unlock libérait (au mieux) le verrou d'une AUTRE
--    connexion : la promesse « un seul exécutant » n'était jamais tenue.
--    Les VRAIS garde-fous : idempotence par tour_publie, index unique
--    (salon, tour, joueur, type) ci-dessous, DÉTERMINISME de runTurn.
--    On DROPE les fonctions des installations existantes :
drop function if exists public.cp_advisory_lock(text);
drop function if exists public.cp_advisory_unlock(text);

-- 6. Idempotence de pousserSectionV2 : un seul événement 'section'
--    par (salon, tour, joueur) — un double-clic REMPLACE la ligne au
--    lieu de la dupliquer (upsert côté client).
create unique index if not exists cp_events_section_unique
  on public.cp_events (salon, tour, joueur, type);

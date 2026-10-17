-- ══════════════════════════════════════════════════════════════════════
--  CHASSE & PÊCHE — Schéma Supabase (multijoueur temps réel, sans auth)
--  Exécutez ce script dans le SQL Editor de votre projet Supabase.
--
--  ⚠ IMPORTANT : le jeu utilise sa PROPRE table `parties_chasse_peche`.
--  Ce même projet Supabase héberge déjà une table `parties` (celle du
--  wargame, colonnes différentes : id uuid, version, scenario…). Ce script
--  NE LA MODIFIE PAS — il se contente de retirer un trigger qu'une
--  ancienne version de ce script avait pu y déposer (sans effet s'il
--  n'existe pas).
--
--  Principe : un salon = une ligne dans `parties_chasse_peche` contenant
--  l'état JSON complet du jeu. Les 8 joueurs lisent/écrivent en anonyme
--  (RLS ouverte) et reçoivent les mises à jour via Realtime.
--  Script idempotent : vous pouvez le relancer sans risque.
-- ══════════════════════════════════════════════════════════════════════

-- ── Nettoyage défensif : une ancienne version de ce script créait le
--    trigger touch_partie sur la table `parties` du wargame (qui n'a pas
--    de colonne updated_at : le trigger cassait ses UPDATE). On le retire.
drop trigger if exists touch_partie on public.parties;

create table if not exists public.parties_chasse_peche (
  id         text primary key,          -- code du salon (ex: 'chasse-1')
  state      jsonb not null,            -- GameState complet (etat de reference)
  sections   jsonb,                     -- TOUR-SIMULTANE : sections des joueurs
                                          --   { "<n>": { player, population, routes,
                                          --     citesLibres, log, tour } }
  turn_done  integer not null default 0, -- n.o du tour couvert par les sections
  updated_at timestamptz not null default now(),
  updated_by text
);

-- Migration des salons existants (idempotent) :
alter table public.parties_chasse_peche
  add column if not exists sections jsonb;
alter table public.parties_chasse_peche
  add column if not exists turn_done integer not null default 0;


alter table public.parties_chasse_peche enable row level security;

-- RLS ouverte : les joueurs sont identifiés par le code du salon.
-- ⚠️ N'utilisez pas de code devinable si vous jouez en public.
drop policy if exists "anon lecture" on public.parties_chasse_peche;
create policy "anon lecture"
  on public.parties_chasse_peche for select
  to anon using (true);

drop policy if exists "anon ecriture" on public.parties_chasse_peche;
create policy "anon ecriture"
  on public.parties_chasse_peche for insert
  to anon with check (true);

drop policy if exists "anon maj" on public.parties_chasse_peche;
create policy "anon maj"
  on public.parties_chasse_peche for update
  to anon using (true) with check (true);

-- Realtime : diffusion des mises à jour d'une partie
do $$
begin
  begin
    alter publication supabase_realtime add table public.parties_chasse_peche;
  exception
    when duplicate_object then null; -- déjà ajoutée
  end;
end $$;

-- Rétention d'usage : mettre à jour le timestamp
create or replace function public.touch_partie()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists touch_partie on public.parties_chasse_peche;
create trigger touch_partie
  before update on public.parties_chasse_peche
  for each row execute function public.touch_partie();

-- ══════════════════════════════════════════════════════════════════
-- FUSION ATOMIQUE DES SECTIONS (revue lag simultané 2026-10-17)
-- Deux « Fin de tour » simultanés faisaient un lire-modifier-écrire
-- concurrent côté client : le second écrasait la section du premier
-- (section PERDUE, barrière bloquée). Cette fonction fusionne MA clé
-- DANS la transaction serveur — plus de fenêtre d'écrasement.
-- Appelée par le client via .rpc('pousser_section', ...) ; le client
-- a un repli lire-modifier-écrire si la fonction est absente.
-- ══════════════════════════════════════════════════════════════════
create or replace function public.pousser_section(
  p_id text,
  p_n int,
  p_section jsonb
)
returns table (sections jsonb, turn_done int)
language plpgsql
security definer
as $$
declare
  v_turn_done int;
begin
  select s.turn_done into v_turn_done
    from public.parties_chasse_peche s
    where s.id = p_id
    for update;  -- verrou : les pousser_section concurrents s'ordonnent

  if v_turn_done is null then
    return;  -- salon introuvable (sections/turn_done NULL)
  end if;

  update public.parties_chasse_peche
    set sections = coalesce(sections, '{}'::jsonb) || jsonb_build_object(p_n::text, p_section),
        updated_at = now()
    where id = p_id;

  return query
    select p.sections, p.turn_done
      from public.parties_chasse_peche p
      where p.id = p_id;
end;
$$;

grant execute on function public.pousser_section(text, int, jsonb) to anon;

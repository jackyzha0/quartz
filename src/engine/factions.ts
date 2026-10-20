// ══════════════════════════════════════════════════════════════════════
//  FACTIONS — UTILITAIRES PARTAGÉS (moteur / interface)
//
//  RETRAIT 2026-10-19 (retour arbitre, à refaire) : le système de bonus
//  de faction a été retiré — fiches de peuple, règles de base / d'Âge II
//  / d'Âge III, table des effets EFFETS, canal « Faction » du récap
//  ressources, garnison de faction, choix regleAge2/regleAge3 et les 19
//  constructions de faction (Église, Apiculture, Puit de mana…). Les
//  joueurs n'ont plus le choix de faction : le champ « Peuple » reste
//  au setup comme pure identité, sans effets mécaniques.
//
//  Ce module garde les COMPTEURS D'ÉTAT partagés par le moteur et
//  l'interface (indépendants des règles de faction), utilisés par les
//  cités libres, le commerce, les merveilles, la validation des metiers…
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player } from './types'
import type { Cfg } from './gameData'
import { batimentsRefs, type ConstructionRef } from './constructions'

// ── Compteurs d'état (partagés moteur / interface) ────────────────────

/** Nombre d'aménagements d'un type précis possédés par le joueur. */
export function nbAmenagements(p: Player, nom: string): number {
  let n = 0
  for (const v of p.villes) for (const a of v.amenagements ?? []) if (a === nom) n++
  return n
}

/** Nombre de bâtiments d'un type précis possédés par le joueur. */
export function nbBatiments(p: Player, nom: string): number {
  let n = 0
  for (const v of p.villes) for (const b of v.batiments) if (b === nom) n++
  return n
}

/** Nombre de bâtiments d'un type précis dans UNE ville. */
export function nbBatimentsVille(ville: City, nom: string): number {
  return ville.batiments.filter((b) => b === nom).length
}

/** Nombre de vassaux d'un joueur (joueurs qui lui ont prêté serment). */
export function nbVassaux(state: GameState, p: Player): number {
  return state.players.filter((q) => q.vassalDe === p.n).length
}

/** Niveau du rang de pays d'un joueur (1 = Baronnie, … 5 = Empire ;
 *  échelle féodale unique de la table paysRangs, ordre = niveau).
 *  Défaut : 1. */
export function rangPaysNiveau(p: Player, C: Cfg): number {
  const rangs = C.config.paysRangs ?? []
  const idx = rangs.findIndex((r) => r.nom === (p.rang ?? ''))
  return idx >= 0 ? idx + 1 : 1
}

/** Capitale d'un joueur : ville nommée « Capitale », sinon la 1re ville. */
export function capitaleDe(p: Player): City | undefined {
  return p.villes.find((v) => v.nom.toLowerCase() === 'capitale') ?? p.villes[0]
}

// ── Bâtiments de capitale (table constructions) ──────────────────────

/** Bâtiments de capitale du référentiel (groupe « Capitale ») :
 *  constructibles uniquement dans la capitale du joueur. */
export function batimentsCapitale(C: Cfg): ConstructionRef[] {
  return batimentsRefs(C.config).filter((b) => b.groupe === 'Capitale')
}

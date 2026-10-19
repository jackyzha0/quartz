// ══════════════════════════════════════════════════════════════════════
//  Bâtiments, événements, cartes dynastie — accès via la config.
// ══════════════════════════════════════════════════════════════════════

import { DEFAULT_CONFIG, type GameConfig, type BuildingDef } from '../config/defaultConfig'

import type { Cfg } from '../config/defaultConfig'
export type { Cfg }


export function buildingDef(nom: string, cfg?: GameConfig): BuildingDef | undefined {
  return (cfg ?? DEFAULT_CONFIG).batiments.find((b) => b.nom === nom)
}

/** Rang d'école le plus élevé d'une ville (0 = aucune école). */
export function schoolRankOf(batiments: string[], cfg?: GameConfig): number {
  let rank = 0
  for (const b of batiments) {
    const def = buildingDef(b, cfg)
    if (def && def.ecoleRang > rank) rank = def.ecoleRang
  }
  return rank
}

// Conditions de victoire (texte de référence, chapitre XII du livret) —
// refonte 2026-10-14 : 4 LAURIERS par voie (ordre strict, crise à chaque
// Laurier I-III validé, bonus si complété pendant l'âge de même numéro) ;
// les textes ci-dessous décrivent le Laurier IV = Victoire.
export const VICTORY_TEXT: { nom: string; texte: string }[] = [
  { nom: 'Militaire', texte: 'Capturer un total de 5 habitations (Laurier IV de la voie Militaire).' },
  { nom: 'Économique', texte: 'Posséder 5 Guildes différentes (Laurier IV de la voie Économique).' },
  { nom: 'Culturelle', texte: 'Posséder 360 Tourisme et 5 Merveilles (Laurier IV de la voie Culturelle).' },
  { nom: 'Scientifique', texte: 'Terminer l’arbre « Progrès du développement futur » (Laurier IV de la voie Scientifique).' },
  { nom: 'Démographique', texte: 'Posséder une population totale de 1500 habitants (Laurier IV de la voie Démographique).' },
  { nom: 'Diplomatique', texte: 'Posséder un total de 10 émissaires (Laurier IV de la voie Diplomatique).' },
]

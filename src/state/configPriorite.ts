// ═══════════════════════════════════════════════════════════════════════════
//  PRIORITÉ DE LA CONFIGURATION — FONCTION PURE (tests 2026-10-19)
//
//  Les bugs réels de la série config venaient de chemins client non testés :
//   · l'adoption au chargement absente du code déployé (commit parti sans
//     l'effet, aucun test pour l'attraper) ;
//   · joinGame adoptait la config EMBARQUÉE du salon alors que la mondiale
//     peut être plus récente (édition depuis l'accueil entre deux tours).
//
//  Cette fonction pure encode LA règle de priorité, une fois pour toutes :
//   1. la config MONDIALE ('__config__') prime sur tout ;
//   2. à défaut (jamais publiée / hors-ligne), la config locale
//      (localStorage, amorce) fait foi ;
//   3. la config EMBARQUÉE dans un état de partie n'est PLUS JAMAIS une
//      source (règle 2026-10-19 : seule la mondiale fait loi) — le
//      champ state.config devient un CACHE du moteur, injecté ;
//   4. une fois la config choisie, elle est INJECTÉE dans l'état (l'UI de
//      jeu lit state.config — sans injection, l'onglet Paramètres
//      montrerait la nouvelle valeur pendant que le jeu roulerait sur
//      l'ancienne : le bug « adultAge resté à 16 »).
// ═══════════════════════════════════════════════════════════════════════════

import type { GameState } from '../engine/types'
import type { GameConfig } from '../config/defaultConfig'

/** Choisit la config à adopter puis l'injecte dans l'état.
 *  Retourne la config choisie (celle que le client doit aussi mémoriser
 *  dans sa config commune), ou null si rien à changer (aucune source).
 *  Ne mute pas `etat` si aucune source n'est disponible. */
export function adopterConfig(
  etat: GameState,
  sources: {
    mondiale?: GameConfig | null
    locale?: GameConfig | null
  },
): GameConfig | null {
  const choisie = sources.mondiale ?? sources.locale ?? null
  if (!choisie) return null
  etat.config = choisie
  return choisie
}

/** Ordre de priorité du CHARGEMENT de page (règle 2026-10-19) :
 *  la mondiale remplace la locale (amorce) dès qu'elle est joignable ;
 *  sinon la locale (hors-ligne) reste. Version « sans état de partie »
 *  (l'accueil sans partie) : retourne la config à afficher. */
export function configAuChargement(
  sources: {
    mondiale?: GameConfig | null
    locale?: GameConfig | null
  },
): GameConfig | null {
  return sources.mondiale ?? sources.locale ?? null
}

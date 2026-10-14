// ══════════════════════════════════════════════════════════════════════
//  VOIES DE VICTOIRE — LAURIERS I à IV (refonte 2026-10-14)
// ══════════════════════════════════════════════════════════════════════
//  Refonte arbitrée par Thibaut : les 4 niveaux d'une voie s'appellent
//  LAURIERS (plus de « Rang I-IV » — déjà pris par les rangs de pays et
//  d'habitation). Validation MANUELLE au radar de l'accueil (les
//  joueurs cochent — arbitre de confiance), en ORDRE STRICT : un
//  Laurier ne se valide que si le précédent est acquis. Chaque Laurier
//  I-III validé déclenche une CRISE à tirer au plateau ; les bonus
//  one-shot ne s'appliquent que si le Laurier est complété pendant
//  l'âge de même numéro (I pendant l'Âge I, II pendant l'Âge II) ; le
//  Laurier III ne donne aucune récompense ; le Laurier IV = VICTOIRE.
//  L'ancienne auto-détection « domination » (checkVictory, part de
//  l'Or mondial, voie Dynastique fantôme) a été supprimée : les
//  conditions du classeur (Merveilles, captures, routes…) ne sont pas
//  toutes suivies par le moteur, la validation reste humaine.
// ══════════════════════════════════════════════════════════════════════

import type { GameState, Player } from './types'
import { cfgOf } from './gameData'

const ROMAINS = ['I', 'II', 'III', 'IV']

/** Nombre de Lauriers validés par un joueur sur une voie (0-4). */
export function nbLauriers(p: Player, voie: string): number {
  return p.lauriers?.[voie] ?? 0
}

/** Coche (ou décoche) un Laurier d'une voie — ORDRE STRICT garanti :
 *  - cocher le Laurier `niveau` (1-4) n'est possible que si c'est le
 *    suivant du dernier validé (ni saut, ni retour en arrière) ;
 *  - `niveau` = 0 décoche le dernier Laurier validé (erreur de saisie
 *    à la table — aucun journal).
 *  Journalise chaque validation : rappel de la crise à tirer et du
 *  bonus (Lauriers I-III), proclamation de VICTOIRE au Laurier IV.
 *  Retourne le niveau atteint, ou -1 si l'ordre strict l'interdit.
 *  `p` doit être le joueur DANS l'état (mutation). */
export function cocherLaurier(state: GameState, p: Player, voie: string, niveau: number): number {
  const actuel = nbLauriers(p, voie)
  if (niveau === 0 && actuel > 0) {
    p.lauriers = { ...(p.lauriers ?? {}), [voie]: actuel - 1 }
    return actuel - 1
  }
  if (niveau < 1 || niveau > 4 || niveau !== actuel + 1) return -1
  p.lauriers = { ...(p.lauriers ?? {}), [voie]: niveau }
  const def = cfgOf(state.config).config.victoires.find((v) => v.voie === voie)
  const bonus = def?.lauriers[niveau - 1]?.bonus ?? ''
  if (niveau === 4) {
    state.log.push({
      turn: state.turn, type: 'Système', joueur: p.n,
      texte: `👑 VICTOIRE ! ${p.nom} vient de valider le Laurier IV de la voie ${voie} — la partie s'achève sur son triomphe !`,
    })
  } else {
    state.log.push({
      turn: state.turn, type: 'Système', joueur: p.n,
      texte: `🏆 Laurier ${ROMAINS[niveau - 1]} de la voie ${voie} validé pour ${p.nom} — une crise doit être tirée.${bonus ? ` ${bonus}` : ''}`,
    })
  }
  return niveau
}

/** Joueurs ayant atteint le Laurier IV d'une voie (= victoire). */
export function victoireAtteinte(state: GameState): { joueur: number; nom: string; voie: string }[] {
  const out: { joueur: number; nom: string; voie: string }[] = []
  for (const p of state.players) {
    for (const [voie, n] of Object.entries(p.lauriers ?? {})) {
      if (n >= 4) out.push({ joueur: p.n, nom: p.nom, voie })
    }
  }
  return out
}

// ── Progression chiffrée vers chaque Laurier IV (radar de l'accueil) ────

export interface VictoryProgress {
  joueur: number
  nom: string
  /** ratio 0..1 par voie — 1 = Laurier IV validé (victoire). */
  valeurs: Record<string, number>
  /** détail du calcul, affiché au survol du sommet correspondant du radar. */
  details: Record<string, string>
}

/** Clé d'axe du radar : nom de la voie normalisé (minuscule sans
 *  accents) — « Économique » → « economique », « Diplomatique » →
 *  « diplomatique ». */
function cleVoie(voie: string): string {
  return voie.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

/** Axes du radar : une par voie de victoire du référentiel (6 par
 *  défaut — l'ancien axe « Dynastique » fantôme disparaît). */
export function victoryLabels(state?: GameState): { key: string; label: string }[] {
  const victoires = state ? cfgOf(state.config).config.victoires : cfgOf(undefined).config.victoires
  return victoires.map((v) => ({ key: cleVoie(v.voie), label: v.voie }))
}

/** Progression (0..1) de chaque joueur vers chaque Laurier IV : ratio
 *  = Lauriers validés / 4, détail au survol = « X/4 Lauriers » et
 *  condition du prochain Laurier à accomplir. */
export function victoryProgress(state: GameState): VictoryProgress[] {
  const victoires = cfgOf(state.config).config.victoires
  return state.players.map((p) => {
    const valeurs: Record<string, number> = {}
    const details: Record<string, string> = {}
    for (const v of victoires) {
      const n = nbLauriers(p, v.voie)
      valeurs[cleVoie(v.voie)] = n / 4
      details[cleVoie(v.voie)] =
        n >= 4
          ? `${n}/4 Lauriers — voie ${v.voie} TERMINÉE 👑`
          : `${n}/4 Lauriers — prochain : ${v.lauriers[n]?.condition ?? '…'}`
    }
    return { joueur: p.n, nom: p.nom, valeurs, details }
  })
}

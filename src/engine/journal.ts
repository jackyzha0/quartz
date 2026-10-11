// ══════════════════════════════════════════════════════════════════════
//  JOURNAL — SNAPSHOT ET RÉCAPITULATIF (SnapshotRessources, WriteRecapA3)
//  Historique des stocks et récapitulatif de fin de tour par joueur.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { ApportsTour, GameState, Player, PlayerRecap } from './types'
import { cfgOf } from './gameData'

// ── Historique (SnapshotRessources) ──────────────────────────────────────

/** Snapshot de fin de tour. `apportsParJoueur` (optionnel) stocke le
 *  détail des apports du tour — production, bâtiments, habitants, tribut
 *  de vassalité — pour le récap ressources du joueur. */
export function snapshotRessources(
  state: GameState,
  turn: number,
  apportsParJoueur?: Record<number, ApportsTour>,
) {
  const C = cfgOf(state.config)
  for (const p of state.players) {
    const stocks: Record<string, number> = {}
    const prods: Record<string, number> = {}
    for (const r of C.ressources) {
      stocks[r] = p.resources[r]?.stock ?? 0
      prods[r] = p.resources[r]?.prod ?? 0
    }
    const apports = apportsParJoueur?.[p.n]
    state.history.push(apports
      ? { turn, joueur: p.n, stocks, prods, apports }
      : { turn, joueur: p.n, stocks, prods })
  }
}

// ── Récap (WriteRecapA3) ────────────────────────────────────────────────

export function writeRecap(state: GameState, p: Player, recap: PlayerRecap) {
  const fmt = (dict: Record<string, number>) =>
    Object.entries(dict)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k} : ${v}`)
      .join(', ') || '—'
  const lignes = [
    `Conceptions — ${fmt(recap.conceptions)}`,
    `Naissances — ${fmt(recap.naissances)}`,
    `Décès — ${fmt(recap.deces)} (dont maladie : ${recap.decesMaladie})`,
    `Mariages nobles — ${fmt(recap.mariagesNobles)}`,
    `Conversions culturelles — ${fmt(recap.conversions)}`,
    `Titres attribués — ${fmt(recap.titresAttribues)}`,
  ]
  if (recap.crises.length > 0) lignes.push(`⚠ Crises : ${recap.crises.join(' ; ')}`)
  if (recap.commandantTombe) lignes.push(`⚠ Commandant tombé : ${recap.commandantTombe}`)
  state.log.push({
    turn: state.turn + 1, type: 'Système', joueur: p.n,
    texte: `Récap ${p.nom} — ${lignes.join(' | ')}`,
  })
}

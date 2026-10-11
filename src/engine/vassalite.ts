// ══════════════════════════════════════════════════════════════════════
//  VASSALITÉ — TRIBUT ENTRE JOUEURS (étape 3bis de FinDeTour)
//  Un vassal reverse une part des revenus d'habitants de sa ville à son suzerain.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { GameState } from './types'
import type { Cfg } from './gameData'

//  Chaque vassal reverse une part des revenus de ses habitants (gains
//  d'Or, après taxes) à son suzerain. Les chaînes A→B→C fonctionnent :
//  chacun ne reverse que SES propres revenus, jamais l'argent reçu de ses
//  propres vassaux.
export function transfererTributVassal(
  state: GameState,
  gainsParJoueur: Record<number, Record<string, number>>,
  C: Cfg,
): void {
  for (const p of state.players) {
    if (p.vassalDe == null) continue
    const suzerain = state.players.find((x) => x.n === p.vassalDe)
    if (!suzerain || suzerain.vassalDe === p.n) continue // suzerain disparu ou serment croisé
    const gains = gainsParJoueur[p.n] ?? {}
    const part = (gains['Or'] ?? 0) * C.p.vassalPrelevement
    if (part === 0) continue
    gains['Or'] = (gains['Or'] ?? 0) - part
    const gainsSuz = gainsParJoueur[suzerain.n] ?? (gainsParJoueur[suzerain.n] = {})
    gainsSuz['Or'] = (gainsSuz['Or'] ?? 0) + part
    state.log.push({
      turn: state.turn + 1, type: 'Système', joueur: p.n,
      texte: `🤝 Vassalité — ${p.nom} verse ${Math.round(part * 10) / 10} Or à ${suzerain.nom} (tribut de vassalité : ${Math.round(C.p.vassalPrelevement * 100)} % des revenus de ses habitants).`,
    })
  }
}

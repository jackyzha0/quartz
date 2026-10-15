// ══════════════════════════════════════════════════════════════════════
//  SAISONS, ÉVÉNEMENTS ET CARTES DYNASTIE (FinDeTour, étapes 1-2)
//  Sélection de la saison, effets chiffrés des événements et des cartes dynastie.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { GameState, Player } from './types'
import { makeRng, type Rng } from './rng'
import { cfgOf, type Cfg } from './gameData'
import { fullName } from './shared'

export function saisonForTurn(turn: number, C: Cfg = cfgOf()): 'Été' | 'Hiver' {
  return Math.floor(turn / Math.max(1, C.p.saisonLongueur)) % 2 === 0 ? 'Été' : 'Hiver'
}

/**
 * Effets chiffrés des événements du classeur : la table eventEffets de la
 * config donne, pour chaque événement, un effet de base par ressource,
 * multiplié par le coefficient de niveau (params evMult*) ; Peste ajoute
 * un risque de maladie, Sombres présages augmente modDanger.
 * Tout est modifiable à chaud dans l'onglet « Paramètres ».
 */
export function applyEventEffect(state: GameState, nom: string, level: 'faible' | 'moyenne' | 'forte' | 'extreme') {
  const C = cfgOf(state.config)
  const mult =
    level === 'faible' ? C.p.evMultFaible
    : level === 'moyenne' ? C.p.evMultMoyenne
    : level === 'forte' ? C.p.evMultForte
    : C.p.evMultExtreme
  const def = C.config.eventEffets.find((e) => e.nom === nom)
  if (!def) return
  if (def.modDanger) state.modDanger += def.modDanger
  for (const eff of def.effets) {
    const v = eff.base * mult
    for (const p of state.players) {
      const rs = p.resources[eff.ressource]
      if (rs) rs.stock += v
    }
  }
  if (def.maladieRisque > 0) {
    const risk = def.maladieRisque * mult
    const rng = makeRng(state.rngState)
    for (const p of state.players) {
      for (const c of state.population[p.n] ?? []) {
        if (c.statut === 'Sain' && rng.chance(risk)) {
          c.statut = 'Malade'
        }
      }
    }
    state.rngState = rng.state()
  }
}

/**
 * Effets chiffrés des cartes dynastie du classeur : table dynastieEffets de
 * la config ('(aléatoire)' = une ressource de base tirée au sort ;
 * guerison = guérit un personnage malade). Les cartes « à option » du
 * classeur (dépenser X pour gagner Y) ne dépensent rien automatiquement :
 * leur texte reste affiché dans le journal, le joueur applique son choix
 * en éditant ses stocks — aucune contrainte bloquante.
 */
export function applyDynastieCard(state: GameState, p: Player, nom: string, rng: Rng) {
  const C = cfgOf(state.config)
  const def = C.config.dynastieEffets.find((e) => e.nom === nom)
  if (!def) return
  const baseRessources = C.ressources.slice(0, 7)
  if (def.guerison) {
    const pop = state.population[p.n] ?? []
    const malades = pop.filter((c) => c.statut === 'Malade')
    if (malades.length > 0) {
      const elu = rng.pick(malades)
      elu.statut = 'Sain'
      state.log.push({
        turn: state.turn + 1, type: 'Système', joueur: p.n,
        texte: `Miracle : ${fullName(elu)} est guéri(e).`,
      })
    }
  }
  for (const eff of def.effets) {
    const res = eff.ressource === '(aléatoire)' ? rng.pick(baseRessources) : eff.ressource
    const rs = p.resources[res]
    if (rs) rs.stock += eff.base
  }
}

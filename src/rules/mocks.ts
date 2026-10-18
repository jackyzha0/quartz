// ═══════════════════════════════════════════════════════════════════════════
//  MOCKS DE TEST pour la banque d'effets (refactor 2026-10-18)
//  Une partie minimale 1 joueur / 1 ville, construite avec le MÊME
//  createGame que le moteur (pas de mock de types : les tests valent
//  ce que vaut le vrai état).
// ═══════════════════════════════════════════════════════════════════════════

import type { ContexteEffet } from './types'
import { createGame } from '../engine/setup'
import type { SetupLine } from '../engine/setup'

const SETUP: SetupLine[] = [{
  nom: 'Joueur Test', peuple: 'NORLS', culture: 'Culture Nordique',
  regime: 'Autoritarisme', taillePopulation: 50, pourcentageMariages: 40,
  villes: ['Bergen'],
}]

/** Partie réelle minimale (1 joueur, graine fixe → déterministe). */
export function partieMock(opts?: { peuple?: string; saison?: string; villeRang?: string }): ContexteEffet {
  const state = createGame(SETUP, 42, 'local')
  const joueur = state.players[0]
  if (opts?.peuple) joueur.peuple = opts.peuple
  if (opts?.saison) state.saison = opts.saison as typeof state.saison
  const ville = joueur.villes[0]
  if (opts?.villeRang) ville.rang = opts.villeRang
  return { state, joueur, ville, saison: state.saison }
}

/** Contexte sans ville (effets joueur seul). */
export function effetVilleMock(): ContexteEffet {
  const ctx = partieMock()
  return { ...ctx, ville: undefined }
}

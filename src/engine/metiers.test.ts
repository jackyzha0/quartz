// ═══════════════════════════════════════════════════════════════════════════
//  TESTS MÉTIERS — caps par ville et réaffectation (rework habitants,
//  vague 1, 2026-10-20)
//
//  Arbitrages actés :
//   · seul le Chasseur est plafonné en vague 1, caps séparées
//     Ville (50) / Château (25, « très généreux »), paramétrables ;
//   · surnombre : les PLUS ÂGÉS perdent leur métier (Sans-emploi) ;
//   · places libres : les Sans-emploi ADULTES deviennent Chasseurs,
//     les plus âgés d'abord — jamais les enfants ;
//   · Sans-emploi = rôle NEUTRE : impôt nul, aucun effet ;
//   · la réaffectation tourne avant le calcul des gains (étape 2ter).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createGame, type SetupLine } from './setup'
import type { Character, City, GameState } from './types'
import { cfgOf } from './gameData'
import { capMetierVille, reaffecterMetiers } from './metiers'
import { invaliderIndexPopulation } from './naissances'
import { detailGainsVille } from './economie'

const SETUP: SetupLine[] = [{
  nom: 'Test', peuple: 'NORLS', culture: 'Culture Nordique', regime: 'Autoritarisme',
  taillePopulation: 20, pourcentageMariages: 40, villes: ['Capitale'],
}]

/** Personnage de test complet (tous les champs obligatoires). */
function perso(id: string, age: number, o: { metier?: string | null; statut?: Character['statut']; ville?: string } = {}): Character {
  return {
    id, nom: 'Test', prenom: `Pers-${id}`, dynastie: 'Roturier', sexe: 'M', age,
    culture: 'Déisme', ville: o.ville ?? 'Capitale', orientation: 'Hétérosexuel',
    traits: [], statut: o.statut ?? 'Sain', mariage: null, mariageId: null,
    mere: null, mereId: null, pere: null, pereId: null,
    pereBio: null, pereBioId: null, enfantBatard: false,
    metier: o.metier ?? null, education: null, fecondite: 0, armee: null, ministere: null,
  }
}

function partie(): GameState {
  return createGame(SETUP, 20261020, 'local')
}

test('capMetierVille : Chasseur plafonné (Ville 50 / Château 25), les autres illimités', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  const ville: City = { ...p.villes[0] }
  ville.type = 'Ville'
  assert.equal(capMetierVille(C.p.metierChasseur, ville, C), 50, 'cap Ville par défaut')
  ville.type = 'Château'
  assert.equal(capMetierVille(C.p.metierChasseur, ville, C), 25, 'cap Château par défaut (arbitrage « très généreux »)')
  // les autres métiers et l'absence de métier ne sont pas plafonnés
  assert.equal(capMetierVille('Marchand', ville, C), Number.POSITIVE_INFINITY)
  assert.equal(capMetierVille(null, ville, C), Number.POSITIVE_INFINITY)
})

test('reaffecterMetiers : surnombre — les plus âgés perdent leur métier, les décédés ne comptent pas', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  C.p.capMetierChasseurVille = 2 // cap de test
  state.population[p.n] = [
    perso('c-50', 50, { metier: C.p.metierChasseur }),
    perso('c-40', 40, { metier: C.p.metierChasseur }),
    perso('c-30', 30, { metier: C.p.metierChasseur }),
    perso('c-20', 20, { metier: C.p.metierChasseur }),
    // décédé : ne compte ni dans le cap ni dans les perdants
    perso('c-90', 90, { metier: C.p.metierChasseur, statut: 'Décédé' }),
  ]
  invaliderIndexPopulation()
  reaffecterMetiers(state, C)
  const pop = state.population[p.n]
  const parId = new Map(pop.map((c) => [c.id, c]))
  assert.equal(parId.get('c-50')!.metier, null, 'le plus âgé vivant perd son métier')
  assert.equal(parId.get('c-40')!.metier, null, 'le 2e plus âgé vivant perd son métier')
  assert.equal(parId.get('c-30')!.metier, C.p.metierChasseur, 'les plus jeunes gardent le métier')
  assert.equal(parId.get('c-20')!.metier, C.p.metierChasseur)
  assert.equal(parId.get('c-90')!.metier, C.p.metierChasseur, 'le décédé n est pas décoiffé')
  assert.ok(state.log.some((l) => l.type === 'Métier' && l.texte.includes('sans emploi')),
    'un log Métier raconte le passage sans emploi')
})

test('reaffecterMetiers : places libres — adultes sans emploi deviennent Chasseurs, les plus âgés d\'abord, jamais les enfants', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  C.p.capMetierChasseurVille = 3 // 2 chasseurs en place → 1 place libre
  state.population[p.n] = [
    perso('c-1', 30, { metier: C.p.metierChasseur }),
    perso('c-2', 28, { metier: C.p.metierChasseur }),
    perso('s-40', 40),
    perso('s-22', 22),
    perso('s-8', 8), // enfant : jamais
  ]
  invaliderIndexPopulation()
  reaffecterMetiers(state, C)
  const parId = new Map(state.population[p.n].map((c) => [c.id, c]))
  assert.equal(parId.get('s-40')!.metier, C.p.metierChasseur, 'le sans-emploi le plus âgé est pris d abord')
  assert.equal(parId.get('s-22')!.metier, null, 'la place unique est déjà prise')
  assert.equal(parId.get('s-8')!.metier, null, 'un enfant ne devient jamais Chasseur')
})

test('reaffecterMetiers : cap Château indépendante de la cap Ville', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  p.villes[0].type = 'Château'
  C.p.capMetierChasseurVille = 50 // laissée haute : c est la cap CHÂTEAU qui mord
  C.p.capMetierChasseurChateau = 1
  state.population[p.n] = [
    perso('ch-60', 60, { metier: C.p.metierChasseur }),
    perso('ch-30', 30, { metier: C.p.metierChasseur }),
  ]
  invaliderIndexPopulation()
  reaffecterMetiers(state, C)
  const parId = new Map(state.population[p.n].map((c) => [c.id, c]))
  assert.equal(parId.get('ch-60')!.metier, null, 'surnombre au Château : le plus âgé sort')
  assert.equal(parId.get('ch-30')!.metier, C.p.metierChasseur)
})

test('Sans-emploi : rôle NEUTRE — aucun gain, aucun impôt (canal métiers vide)', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  state.population[p.n] = [perso('s-30', 30), perso('s-20', 20)]
  invaliderIndexPopulation()
  const ville = p.villes[0]
  const d = detailGainsVille(state, p, ville, C)
  assert.equal(Object.keys(d.metiers).length, 0, 'aucune production brute (canal metiers vide)')
  assert.equal(Object.keys(d.taxes).length, 0, 'aucun impôt (canal taxes vide)')
  assert.equal(d.habitants, 2)
})

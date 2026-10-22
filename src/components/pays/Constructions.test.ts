// ═══════════════════════════════════════════════════════════════════════════
//  TESTS CONSTRUCTIONS — AMÉLIORATIONS D'AMÉNAGEMENTS tiers 2/3
//  (vague 3c, arbitrage Thibaut 2026-10-22) :
//   · un aménagement de tier 2 (coût uniforme « 15 Or + 3 Pierre »)
//     REMPLACE une instance du tier 1 dans ville.amenagements ; le
//     tier 3 (« 35 Or + 3 Fer ») remplace le tier 2 — l'amélioration
//     n'est PAS une construction en plus ;
//   · rang d'habitation minimum : tier 2 → rang 2 (Cité/Donjon),
//     tier 3 → rang 3 (Grande Cité/Forteresse) — garde-fou NON
//     BLOQUANT (⚠ dans le log, même calibre que les rangs des
//     bâtiments : « la vue filtre, ce garde-fou couvre les états
//     importés/rebasés ») ;
//   · tier inférieur ABSENT de la ville → ⚠ + amélioration quand
//     même enregistrée (poussée) — le moteur n'est jamais bloquant.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createGame, type SetupLine } from '../../engine/setup'
import { cfgOf } from '../../engine/gameData'

const SETUP: SetupLine[] = [{
  nom: 'Test', peuple: 'NORLS', culture: 'Culture Nordique', regime: 'Autoritarisme',
  taillePopulation: 20, pourcentageMariages: 40, villes: ['Capitale'],
}]

function partie() {
  return createGame(SETUP, 20261022, 'local')
}

/** Fabrique construire branchée sur l'état (comme le fait VilleCarte
 *  via useGame().update). */
async function construireDe(state: ReturnType<typeof partie>) {
  const { faireConstruire } = await import('./Constructions')
  const C = cfgOf(state.config)
  const p = state.players[0]
  return faireConstruire({
    update: (m) => m(state),
    joueur: p.n,
    C,
    setSurint: () => { /* sans Surintendant dans ces tests */ },
    setSurintRes: () => { /* idem */ },
  })
}

test('vague 3c : « Baleinier (tier 2) » REMPLACE le Baleinier de la ville et débite 15 Or + 3 Pierre', async () => {
  const state = partie()
  const p = state.players[0]
  const ville = p.villes[0]
  ville.type = 'Ville'
  ville.rang = 'Cité' // rang 2 : pas de ⚠ de rang d'habitation
  ville.amenagements = ['Baleinier', 'Champ']
  p.resources['Or'].stock = 100
  p.resources['Pierre'].stock = 10
  const construire = await construireDe(state)
  construire(0, 'Baleinier (tier 2)', 'amenagement')
  assert.deepEqual(ville.amenagements, ['Baleinier (tier 2)', 'Champ'],
    'le tier 1 est remplacé EN PLACE (pas ajouté à la fin)')
  assert.equal(100 - p.resources['Or'].stock, 15, 'coût du tier 2 : 15 Or débités')
  assert.equal(10 - p.resources['Pierre'].stock, 3, 'coût du tier 2 : 3 Pierre débitées')
  assert.ok(state.log.some((l) => l.texte.includes('Baleinier amélioré(e) en Baleinier (tier 2)')),
    'log : « 🏗 Baleinier amélioré(e) en Baleinier (tier 2) »')
  assert.ok(!state.log.some((l) => l.texte.startsWith('⚠') && l.texte.includes('rang 2 minimum')),
    'rang 2 atteint (Cité) : pas de ⚠ de rang')
})

test('vague 3c : « Baleinier (tier 3) » remplace le tier 2 et débite 35 Or + 3 Fer', async () => {
  const state = partie()
  const p = state.players[0]
  const ville = p.villes[0]
  ville.type = 'Ville'
  ville.rang = 'Grande Cité' // rang 3
  ville.amenagements = ['Baleinier (tier 2)', 'Scierie']
  p.resources['Or'].stock = 100
  p.resources['Fer'].stock = 10
  const construire = await construireDe(state)
  construire(0, 'Baleinier (tier 3)', 'amenagement')
  assert.deepEqual(ville.amenagements, ['Baleinier (tier 3)', 'Scierie'],
    'le tier 2 est remplacé en place')
  assert.equal(100 - p.resources['Or'].stock, 35, 'coût du tier 3 : 35 Or débités')
  assert.equal(10 - p.resources['Fer'].stock, 3, 'coût du tier 3 : 3 Fer débités')
})

test('vague 3c : garde-fous NON BLOQUANTS — rang insuffisant ⚠, tier inférieur absent ⚠ (mais enregistré)', async () => {
  const state = partie()
  const p = state.players[0]
  const ville = p.villes[0]
  ville.type = 'Ville'
  ville.rang = 'Hameau' // rang 1 : le tier 2 exige le rang 2
  ville.amenagements = [] // et aucun Baleinier !
  p.resources['Or'].stock = 100
  p.resources['Pierre'].stock = 10
  const construire = await construireDe(state)
  construire(0, 'Baleinier (tier 2)', 'amenagement')
  assert.deepEqual(ville.amenagements, ['Baleinier (tier 2)'],
    'garde-fous non bloquants : l amélioration est quand même enregistrée (poussée)')
  assert.equal(100 - p.resources['Or'].stock, 15, 'le coût est quand même débité')
  assert.ok(state.log.some((l) => l.texte.includes('habitation de rang 2 minimum')),
    '⚠ rang : le tier 2 exige le rang 2')
  assert.ok(state.log.some((l) => l.texte.includes("améliore normalement d'abord un « Baleinier »")),
    '⚠ prérequis : le tier 1 doit être présent à la ville')
  assert.ok(!state.log.some((l) => l.texte.includes('amélioré(e) en Baleinier (tier 2)')),
    'sans remplacement effectif, le log dit « construit(e) », pas « amélioré(e) »')
})

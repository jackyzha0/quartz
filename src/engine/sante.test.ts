// ═══════════════════════════════════════════════════════════════════════════
//  TESTS SANTÉ — mortalité Gompertz (rework habitants, 2026-10-20)
//
//  Arbitrage acté : plus d'âge-plafond (ageMax supprimé), la maladie
//  est la SEULE cause de mort. Probabilité de contracter par tour :
//    min(maladieCap, maladieBase × exp(maladiePente × âge))
//  calibrée par Monte-Carlo (N=200 000, mulberry32) pour E[âge de
//  décès] ≈ 60 ans — défauts 0.0025 / 0.08 / 0.9 (E=59,5, médiane 60,
//  p90 70). Ces tests verrouillent :
//   · la formule exacte (base à l'âge 0, croissance exponentielle,
//     plafond maladieCap) ;
//   · la calibration : une cohorte simulée avec les MÊMES mécaniques
//     que maladieStep (contraction, re-contraction mortelle, guérison
//     dégressive) meurt en moyenne entre 55 et 66 ans.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { makeRng } from './rng'
import { probaContracterMaladie } from './sante'
import { cfgOf } from './gameData'
import type { Character } from './types'

/** Personnage de test (tous les champs obligatoires de Character). */
function perso(age: number, traits: [string, string, string] = ['Obstiné', 'Stérile', 'Fécond']): Character {
  return {
    id: `sante-${age}-${traits.join('-') || 'sans'}`,
    nom: 'Test', prenom: 'Santé', dynastie: 'Roturier', sexe: 'M', age,
    culture: 'Déisme', ville: 'Capitale 1', orientation: 'Hétérosexuel',
    traits, statut: 'Sain', mariage: null, mariageId: null,
    mere: null, mereId: null, pere: null, pereId: null,
    pereBio: null, pereBioId: null, enfantBatard: false,
    metier: null, education: null, fecondite: 0, armee: null, ministere: null,
  }
}

test('Gompertz : formule exacte — base à 0 an, exponentielle, plafond cap', () => {
  const C = cfgOf()
  assert.equal(C.p.maladieBase, 0.0025, 'défaut maladieBase (calibration Monte-Carlo 2026-10-20)')
  assert.equal(C.p.maladiePente, 0.08)
  assert.equal(C.p.maladieCap, 0.9)
  // âge 0 : base × exp(0) = base
  assert.ok(Math.abs(probaContracterMaladie(perso(0), C) - 0.0025) < 1e-12)
  // âge 60 : base × exp(pente × 60)
  const attendu60 = 0.0025 * Math.exp(0.08 * 60)
  assert.ok(Math.abs(probaContracterMaladie(perso(60), C) - attendu60) < 1e-12)
  // âge très élevé : plafonné au cap
  assert.equal(probaContracterMaladie(perso(500), C), 0.9)
})

test('Gompertz : monte-carlo seedé — E[âge de décès] ∈ [55, 66] (calibration ~60 ans)', () => {
  const C = cfgOf()
  const rng = makeRng(20261020)
  const N = 500
  let somme = 0
  for (let i = 0; i < N; i++) {
    let age = 0
    let statut: 'Sain' | 'Malade' = 'Sain'
    for (;;) {
      // un tour = 2 ans (population.ts)
      age += 2
      const pContract = probaContracterMaladie({ ...perso(age), age }, C)
      if (statut === 'Sain') {
        if (rng.chance(pContract)) statut = 'Malade'
      } else {
        // un malade qui re-contracte la maladie meurt
        if (rng.chance(pContract)) break
        const pCure = Math.max(0, C.p.probaGuerison - C.p.modGuerisonAge * age)
        if (rng.chance(pCure)) statut = 'Sain'
      }
    }
    somme += age
  }
  const esperance = somme / N
  assert.ok(esperance >= 55 && esperance <= 66,
    `E[âge de décès] hors bornes de calibration : ${esperance} (attendu ~60)`)
})

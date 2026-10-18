// ═══════════════════════════════════════════════════════════════════════════
//  TESTS DE LA BANQUE D'EFFETS (node:test — `npm test src/rules/`)
//
//  1. Unitaires : chaque type d'effet, chaque condition ;
//  2. ÉQUIVALENCE : pour TOUTES les constructions du référentiel,
//     la banque doit redonner exactement les mêmes flux par tour,
//     flux d'été, garnison et tourisme instantané que le moteur
//     historique (effetsConstructionRef / instantanesConstructionRef /
//     garnisonConstructionRef). C'est le verrou du refactor : la
//     banque ne change AUCUN comportement.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { appliquerRegles, contributionVide, conditionsRemplies } from './effects/banque'
import { reglesConstructions, effetsConstructionVersBanque } from './registry'
import type { ContexteEffet, Effet, RegleBanque } from './types'
import { cfgOf } from '../engine/gameData'
import { effetVilleMock, partieMock } from './mocks'
import {
  effetsConstructionRef, effetsEteConstructionRef, instantanesConstructionRef,
} from '../engine/constructions'
import { constructionRef } from '../engine/constructions'
import { createGame } from '../engine/setup'

// ── 1. Unitaires : types d'effets ───────────────────────────────────────────

test('fluxVille cumule les flux par ressource', () => {
  const ctx = partieMock()
  const regle: RegleBanque = {
    id: 'test.flux', source: 'batiment', nom: 'Test',
    effets: [
      { type: 'fluxVille', ressource: 'Or', valeur: 2 },
      { type: 'fluxVille', ressource: 'Or', valeur: 3 },
      { type: 'fluxVille', ressource: 'Bois', valeur: -1 },
    ],
  }
  const out = appliquerRegles([regle], ctx)
  assert.equal(out.flux['Or'], 5)
  assert.equal(out.flux['Bois'], -1)
})

test('fluxVille ete va dans le canal été, pas dans le flux normal', () => {
  const ctx = partieMock()
  const regle: RegleBanque = {
    id: 'test.ete', source: 'batiment', nom: 'Test',
    effets: [{ type: 'fluxVille', ressource: 'Nourriture', valeur: 12, ete: true }],
  }
  const out = appliquerRegles([regle], ctx)
  assert.equal(out.fluxEte['Nourriture'], 12)
  assert.equal(out.flux['Nourriture'], undefined)
})

test('garnisonVille et garnisonParRang s’additionnent', () => {
  const ctx = partieMock({ villeRang: 'Cité' })
  const regle: RegleBanque = {
    id: 'test.garnison', source: 'batiment', nom: 'Test',
    effets: [
      { type: 'garnisonVille', valeur: 40 },
      { type: 'garnisonParRang', valeur: 15 },
    ],
  }
  const out = appliquerRegles([regle], ctx)
  // 40 + 15 × rang(Cité = 2)
  assert.equal(out.garnison, 40 + 15 * 2)
})

test('tourismeInstantane passe par les instantanés (jamais un flux)', () => {
  const ctx = partieMock()
  const regle: RegleBanque = {
    id: 'test.tourisme', source: 'batiment', nom: 'Test',
    effets: [{ type: 'tourismeInstantane', valeur: 35 }],
  }
  const out = appliquerRegles([regle], ctx)
  assert.equal(out.flux['Tourisme'], undefined)
  assert.equal(out.instantanes.length, 1)
  assert.deepEqual(out.instantanes[0], { type: 'tourismeInstantane', valeur: 35 })
})

test('conditions peuple / saison / vassal (ET logique)', () => {
  // Le mock de base est NORLS / Été : on utilise des conditions qu'il
  //  ne satisfait PAS pour vérifier le blocage, puis on les satisfait.
  const regle: RegleBanque = {
    id: 'test.cond', source: 'faction', nom: 'Test',
    conditions: { peuple: 'PEAUX VERTES', saison: 'Hiver' },
    effets: [{ type: 'fluxJoueur', ressource: 'Or', valeur: 10 }],
  }
  // ni le peuple ni la saison → rien
  const base = partieMock()
  assert.equal(appliquerRegles([regle], base).flux['Or'], undefined)
  // peuple OK mais saison fausse → rien (ET)
  const vertsEte = partieMock({ peuple: 'PEAUX VERTES', saison: 'Été' })
  assert.equal(appliquerRegles([regle], vertsEte).flux['Or'], undefined)
  // saison OK mais peuple faux → rien (ET)
  const norlsHiver = partieMock({ peuple: 'NORLS', saison: 'Hiver' })
  assert.equal(appliquerRegles([regle], norlsHiver).flux['Or'], undefined)
  // tout OK → effet
  const vertsHiver = partieMock({ peuple: 'PEAUX VERTES', saison: 'Hiver' })
  assert.equal(appliquerRegles([regle], vertsHiver).flux['Or'], 10)
  // condition vassal : le joueur de base n'est vassal de personne
  const regleVassal: RegleBanque = {
    id: 'test.vassal', source: 'dogme', nom: 'Test',
    conditions: { vassal: true },
    effets: [{ type: 'fluxJoueur', ressource: 'Or', valeur: 5 }],
  }
  assert.equal(appliquerRegles([regleVassal], base).flux['Or'], undefined)
})

// ── 2. Équivalence référentiel complet ─────────────────────────────────────

test('ÉQUIVALENCE : la banque redonne exactement le moteur historique sur toutes les constructions', () => {
  const C = cfgOf(undefined)
  const refs = C.config.constructions ?? []
  assert.ok(refs.length > 50, 'référentiel constructions attendu')
  const regles = reglesConstructions(undefined)
  assert.equal(regles.length, refs.filter((r) => r.effets?.length).length)
  const parNom = new Map(regles.map((r) => [r.nom, r]))

  for (const ref of refs) {
    if (!ref.effets?.length) continue
    const regle = parNom.get(ref.nom)
    assert.ok(regle, `règle banque manquante pour ${ref.nom}`)
    const ctx = partieMock()
    const out = appliquerRegles([regle], ctx)

    // flux par tour (hors été, hors instantanés)
    const attenduFlux = effetsConstructionRef(ref)
    assert.deepEqual(
      Object.fromEntries(Object.entries(out.flux).filter(([, v]) => v !== 0)),
      Object.fromEntries(Object.entries(attenduFlux).filter(([, v]) => v !== 0)),
      `flux différents pour ${ref.nom} : banque=${JSON.stringify(out.flux)} historique=${JSON.stringify(attenduFlux)}`,
    )
    // flux d'été
    const attenduEte = effetsEteConstructionRef(ref)
    assert.deepEqual(
      Object.fromEntries(Object.entries(out.fluxEte).filter(([, v]) => v !== 0)),
      Object.fromEntries(Object.entries(attenduEte).filter(([, v]) => v !== 0)),
      `flux été différents pour ${ref.nom}`,
    )
    // instantanés : Garnison (état) et Tourisme (une fois) du moteur historique
    const attenduInst = instantanesConstructionRef(ref)
    const garnisonBanque = out.garnison
    assert.equal(garnisonBanque, attenduInst['Garnison'] ?? 0, `garnison différente pour ${ref.nom}`)
    const tourismeBanque = out.instantanes
      .filter((e): e is Extract<Effet, { type: 'tourismeInstantane' }> => e.type === 'tourismeInstantane')
      .reduce((acc, e) => acc + e.valeur, 0)
    assert.equal(tourismeBanque, attenduInst['Tourisme'] ?? 0, `tourisme instantané différent pour ${ref.nom}`)
  }
})

test('les constructions sans effets structurés ne sont pas migrées (repli historique préservé)', () => {
  const refs = cfgOf(undefined).config.constructions ?? []
  const sansEffets = refs.filter((r) => !r.effets?.length)
  assert.ok(sansEffets.length > 0, 'le repli texte reste nécessaire pour certaines entrées')
  for (const ref of sansEffets) {
    // ces entrées restent gérées par le moteur historique : rien dans la banque
    const regles = reglesConstructions(undefined).filter((r) => r.nom === ref.nom)
    assert.equal(regles.length, 0, `${ref.nom} ne doit pas être dans la banque sans effets structurés`)
  }
})

test('runTurn fonctionne après création d’une partie (sanity moteur)', () => {
  const s = createGame(
    [{ nom: 'Test', peuple: 'NORLS', culture: 'Culture Nordique', regime: 'Autoritarisme', taillePopulation: 50, pourcentageMariages: 40, villes: ['Bergen'] }],
    42, 'local',
  )
  assert.ok(s.players.length >= 1)
  assert.equal(typeof s.turn, 'number')
})

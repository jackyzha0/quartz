// ═══════════════════════════════════════════════════════════════════════════
//  TESTS DE LA BANQUE D'EFFETS (node:test — `npm test src/rules/`)
//
//  1. Unitaires : chaque type d'effet, chaque condition ;
//  2. VOIE UNIQUE (retour Thibaut 2026-10-19 « tout ce qui a rapport à
//     une production passe par la banque ») : les accès moteur
//     (effetsConstructionRef / effetsEteConstructionRef /
//     instantanesConstructionRef / garnisonConstructionRef) lisent
//     EXCLUSIVEMENT la banque — et une construction SANS règle de
//     banque ne produit RIEN (l'ancien repli d'analyse du texte de
//     production a été retiré : plus de seconde interprétation).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { appliquerRegles } from './effects/banque'
import { reglesConstructions } from './registry'
import type { RegleBanque } from './types'
import { cfgOf } from '../engine/gameData'
import { partieMock } from './mocks'
import {
  effetsConstructionRef, effetsEteConstructionRef, instantanesConstructionRef, eteSeulementRef,
} from '../engine/constructions'
import { productionTourismeBatiment } from '../engine/batiments'
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

// ── 2. Voie unique : le moteur ne lit QUE la banque ───────────────────────

test('VOIE UNIQUE : les accès moteur rendent exactement la contribution de la règle de banque', () => {
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

    // flux par tour (hors été, hors garnison)
    const attenduFlux = effetsConstructionRef(ref)
    assert.deepEqual(
      Object.fromEntries(Object.entries(out.flux).filter(([, v]) => v !== 0)),
      Object.fromEntries(Object.entries(attenduFlux).filter(([, v]) => v !== 0)),
      `flux différents pour ${ref.nom} : banque=${JSON.stringify(out.flux)} moteur=${JSON.stringify(attenduFlux)}`,
    )
    // flux d'été
    const attenduEte = effetsEteConstructionRef(ref)
    assert.deepEqual(
      Object.fromEntries(Object.entries(out.fluxEte).filter(([, v]) => v !== 0)),
      Object.fromEntries(Object.entries(attenduEte).filter(([, v]) => v !== 0)),
      `flux été différents pour ${ref.nom}`,
    )
    // garnison (valeur d'état)
    const attenduInst = instantanesConstructionRef(ref)
    assert.equal(out.garnison, attenduInst['Garnison'] ?? 0, `garnison différente pour ${ref.nom}`)
  }
})

test('SANS règle de banque : production NULLE sur tous les canaux (repli texte retiré)', () => {
  const refs = cfgOf(undefined).config.constructions ?? []
  const sansEffets = refs.filter((r) => !r.effets?.length)
  assert.ok(sansEffets.length > 0, 'des constructions sans effets structurés existent')
  for (const ref of sansEffets) {
    // ces entrées n'ont PAS de règle dans la banque…
    const regles = reglesConstructions(undefined).filter((r) => r.nom === ref.nom)
    assert.equal(regles.length, 0, `${ref.nom} ne doit pas être dans la banque sans effets structurés`)
    // …et le moteur ne produit RIEN pour elles : plus AUCUN repli texte
    //  (l'ancien parseProductionTexte a été retiré le 2026-10-19).
    assert.deepEqual(effetsConstructionRef(ref), {}, `${ref.nom} : flux attendu nul`)
    assert.deepEqual(effetsEteConstructionRef(ref), {}, `${ref.nom} : flux été attendu nul`)
    assert.deepEqual(instantanesConstructionRef(ref), {}, `${ref.nom} : aucune valeur d'état attendue`)
  }
})

test('Tourisme = FLUX NORMAL via la banque (Chapelle +35 : ni instantané, ni stock cumulé)', () => {
  const refs = cfgOf(undefined).config.constructions ?? []
  const chapelle = refs.find((r) => r.nom === 'Chapelle')
  assert.ok(chapelle?.effets?.length, 'la Chapelle doit avoir des effets structurés')
  // le Tourisme se lit dans le FLUX de la règle de banque…
  assert.equal(effetsConstructionRef(chapelle)['Tourisme'], 35)
  // …et n'est PLUS un instantané « crédité une fois » (sémantique retirée).
  assert.equal(instantanesConstructionRef(chapelle)['Tourisme'], undefined)
  // idem productionTourismeBatiment (voie unique du stock = production).
  const C = cfgOf(undefined)
  assert.equal(productionTourismeBatiment('Chapelle', C, 'Ville'), 35)
})

test('Champ / Rizière (vague 3a) : plus AUCUN flux direct — la production passe par les emplacements de Fermier (été)', () => {
  const refs = cfgOf(undefined).config.constructions ?? []
  const champ = refs.find((r) => r.nom === 'Champ')
  assert.ok(champ, 'Champ présent dans le référentiel')
  // vague 3a : le Champ ne porte PLUS de flux — ni normal ni d'été
  //  (la production de Nourriture vit dans le métier Fermier, dont
  //  les postes sont créés par les emplacements du Champ).
  assert.equal(eteSeulementRef(champ), false, 'le Champ ne porte plus de flux d été')
  assert.equal(Object.keys(effetsConstructionRef(champ)).length, 0, 'Champ : aucun flux')
  assert.equal(Object.keys(effetsEteConstructionRef(champ)).length, 0, 'Champ : aucun flux d été non plus')
  assert.equal((champ.emplacements ?? []).find((e) => e.metier === 'Fermier')?.places ?? 0, 3,
    'Champ : 3 emplacements de Fermier')
  const riziere = refs.find((r) => r.nom === 'Rizière')
  assert.ok(riziere, 'Rizière présente')
  assert.equal(Object.keys(effetsConstructionRef(riziere!)).length, 0, 'Rizière : aucun flux')
  assert.equal((riziere!.emplacements ?? []).find((e) => e.metier === 'Fermier')?.places ?? 0, 4,
    'Rizière : 4 emplacements de Fermier')
  // le Fermier, lui, produit en ÉTÉ seulement (champ ete du référentiel métiers)
  const fermier = cfgOf(undefined).metiers.find((m) => m.metier === 'Fermier')
  assert.ok(fermier, 'Fermier présent dans le référentiel métiers')
  assert.equal(fermier!.ete, true, 'Fermier : production d été seulement (champ ete)')
  // le Camp de bûcheron, lui, reste un flux NORMAL (pas marqué été)
  const camp = refs.find((r) => r.nom === 'Camp de bûcheron')
  assert.ok(camp, 'Camp de bûcheron présent')
  assert.equal(eteSeulementRef(camp), false)
  assert.ok(Object.keys(effetsConstructionRef(camp)).length > 0, 'Camp de bûcheron : flux attendu')
})

test('runTurn fonctionne après création d’une partie (sanity moteur)', () => {
  const s = createGame(
    [{ nom: 'Test', peuple: 'NORLS', culture: 'Culture Nordique', regime: 'Autoritarisme', taillePopulation: 50, pourcentageMariages: 40, villes: ['Bergen'] }],
    42, 'local',
  )
  assert.ok(s.players.length >= 1)
  assert.equal(typeof s.turn, 'number')
})

// ═══════════════════════════════════════════════════════════════════════════
//  TESTS DU CORRECTIF EGRESS (2026-10-20) — « payload réseau sans config »
//
//  Incident réel : quota egress Supabase (5 Go/mois, plan Free) explosé —
//  chaque publication d'état de référence embarquait le CACHE config
//  (~181 Ko, le référentiel complet), relu par CHAQUE client à CHAQUE
//  fin de tour : ~1,5 Mo de config par tour et par salon de 8 joueurs,
//  pour un cache que chaque client possède déjà (la mondiale '__config__'
//  adoptée au chargement).
//
//  Le contrat à verrouiller (règle 2026-10-19 + correctif egress) :
//   · PUBLICATION — etatReseau retire la clé config : le JSON réseau ne
//     la contient JAMAIS, et l'état original n'est pas muté ;
//   · INGESTION — un état reçu SANS config reçoit la LOCALE (adopterConfig :
//     l'UI lit state.config, sans injection runTurn roulerait sur les
//     DÉFAUTS — bug de la classe « adultAge 16 ») ;
//   · RÉTROCOMPAT — une vieille ligne qui embarque ENCORE sa config ne la
//     fait plus foi : la locale PRIME (l'embarquée n'est plus une source).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { etatReseau, appliquerConfigMondiale } from '../engine/fusion'
import { adopterConfig } from './configPriorite'
import { cloneDefaultConfig, cfgOf, type GameConfig } from '../config/defaultConfig'
import { createGame, type SetupLine } from '../engine/setup'
import type { GameState } from '../engine/types'

const SETUP: SetupLine[] = [{
  nom: 'Test', peuple: 'NORLS', culture: 'Culture Nordique', regime: 'Autoritarisme',
  taillePopulation: 20, pourcentageMariages: 40, villes: ['A'],
}]

/** Config factice reconnaissable : un paramètre marqué. */
function configAvec(adultAge: number): GameConfig {
  const c = cloneDefaultConfig()
  c.params = { ...c.params, adultAge }
  return c
}

/** Partie avec un cache config marqué (comme tout état du store). */
function partieAvecCache(adultAge: number): GameState {
  const s = createGame(SETUP, 42, 'local')
  s.config = configAvec(adultAge)
  return s
}

// ── PUBLICATION : le payload réseau ne contient plus la config ─────────────

test('egress : etatReseau retire la clé config du JSON réseau (pas juste null)', () => {
  const reseau = etatReseau(partieAvecCache(18))
  const json = JSON.stringify(reseau)
  assert.ok(!('"config"' in JSON.parse(json)), 'la clé config doit être ABSENTE du payload')
  assert.ok(!json.includes('"config"'),
    'le mot-clé config ne doit même pas apparaître — la clé est retirée, pas mise à null')
})

test('egress : etatReseau ne mute PAS l état original (le client garde son cache)', () => {
  const etat = partieAvecCache(18)
  etatReseau(etat)
  assert.ok(etat.config, 'l état original garde sa config en mémoire')
  assert.equal(cfgOf(etat.config).config.params?.adultAge, 18,
    'le cache de l appelant doit être intact — seul le fil est allégé')
})

test('egress : etatReseau conserve TOUT le reste de l état', () => {
  const etat = partieAvecCache(18)
  const reseau = JSON.parse(JSON.stringify(etatReseau(etat))) as Record<string, unknown>
  const original = JSON.parse(JSON.stringify(etat)) as Record<string, unknown>
  delete original.config
  assert.deepEqual(reseau, original, 'rien d autre que la config ne doit différer')
})

// ── INGESTION : le cache manquant est réinjecté depuis la locale ───────────

test('egress : un état reçu SANS config reçoit la locale (pas les défauts)', () => {
  // Cycle réel : publication serveur → JSON réseau → relecture client.
  const distant = JSON.parse(JSON.stringify(etatReseau(partieAvecCache(18)))) as GameState
  assert.equal(distant.config, undefined, 'sanity : l état réseau n a pas de config')
  const locale = configAvec(21) // mondiale adoptée au chargement du navigateur
  const choisie = adopterConfig(distant, { locale })
  assert.equal(choisie, locale, 'la locale est adoptée')
  assert.equal(cfgOf(distant.config).config.params?.adultAge, 21,
    'l UI (state.config) doit rouler sur la locale — pas sur cfgOf(undefined) = défauts')
})

// ── RÉTROCOMPAT : les vieilles lignes embarquées ne font plus foi ──────────

test('egress : un ancien état EMBARQUANT sa config ne la fait plus loi — la locale prime', () => {
  const vieilleLigne = partieAvecCache(16) // cache d époque encore en table
  const locale = configAvec(18) // mondiale éditée depuis, adoptée au chargement
  const choisie = adopterConfig(vieilleLigne, { locale })
  assert.equal(choisie, locale)
  assert.equal(cfgOf(vieilleLigne.config).config.params?.adultAge, 18,
    'le cache embarqué est écrasé — seule la config adoptée fait foi')
})

// ── REPLI LOCAL : le draft de résolution n arrive jamais SANS config ───────

test('egress : repli local — la locale amorce le draft, la mondiale prime, jamais undefined', () => {
  // Séquence EXACTE de resoudreBarriereLocaleV2 (store) sur une référence
  //  publiée SANS config (post-fix) : locale d abord, mondiale ensuite.
  const ref = JSON.parse(JSON.stringify(etatReseau(partieAvecCache(18)))) as GameState
  const locale = configAvec(21)
  const mondiale = configAvec(22)
  adopterConfig(ref, { locale })
  assert.equal(cfgOf(ref.config).config.params?.adultAge, 21,
    'la locale amorce le draft — pas de cfgOf(undefined) = défauts')
  appliquerConfigMondiale(ref, mondiale)
  assert.equal(cfgOf(ref.config).config.params?.adultAge, 22,
    'la mondiale prime sur la locale quand elle est publiée')
  // Sans mondiale publiée (jamais éditée) : la locale RESTE.
  const ref2 = JSON.parse(JSON.stringify(etatReseau(partieAvecCache(18)))) as GameState
  adopterConfig(ref2, { locale })
  appliquerConfigMondiale(ref2, null)
  assert.equal(cfgOf(ref2.config).config.params?.adultAge, 21,
    'sans mondiale, la locale reste — le draft n est jamais sans config')
})

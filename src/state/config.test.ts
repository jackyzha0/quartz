// ═══════════════════════════════════════════════════════════════════════════
//  TESTS DU CHEMIN CONFIG (2026-10-19) — les tests qui auraient attrapé
//  les bugs réels de la série :
//
//   BUG 1 « adultAge resté à 16 » : l'adoption de la config mondiale au
//   chargement était ABSENTE du code déployé (commit parti sans l'effet).
//   → testé ici : la mondiale PRIME sur la locale au chargement.
//
//   BUG 2 « rien n'avait changé après reconnexion » : joinGame adoptait
//   la config EMBARQUÉE du salon, plus ancienne qu'une édition faite
//   depuis l'accueil entre deux tours.
//   → testé ici : priorité mondiale > embarquée > locale, + injection
//   dans l'état (l'UI de jeu lit state.config).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { adopterConfig, configAuChargement } from './configPriorite'
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

function partie(): GameState {
  return createGame(SETUP, 42, 'local')
}

// ── Le contrat de priorité (BUG 1 et BUG 2) ─────────────────────────────────

test('config : la MONDIALE prime sur la locale au chargement (bug adultAge 16→18)', () => {
  const locale = configAvec(16)     // l'amorce localStorage de l'utilisateur
  const mondiale = configAvec(18)  // publiée depuis l'accueil par un autre joueur
  const choisie = configAuChargement({ mondiale, locale })
  assert.ok(choisie, 'une config doit être choisie')
  assert.equal(cfgOf(choisie).config.params?.adultAge, 18,
    'la mondiale doit primer — c est le bug : la page rafraîchie doit montrer 18, pas le 16 du localStorage')
})

test('config : sans mondiale (hors-ligne), la locale reste (amorce)', () => {
  const locale = configAvec(16)
  const choisie = configAuChargement({ mondiale: null, locale })
  assert.equal(cfgOf(choisie!).config.params?.adultAge, 16,
    'hors-ligne, l amorçe locale fait foi — pas de retour à zéro')
})

test('config : joinGame — la MONDIALE prime sur l EMBARQUÉE du salon (édition entre deux tours)', () => {
  // Le salon publié à la dernière résolution embarque adultAge 16 ;
  //  le créateur a édité 18 depuis l'accueil APRÈS cette résolution.
  const etat = partie()
  etat.config = configAvec(16)
  const mondiale = configAvec(18)
  const choisie = adopterConfig(etat, { mondiale, locale: configAvec(16) })
  assert.ok(choisie, 'une config doit être adoptée')
  assert.equal(cfgOf(choisie).config.params?.adultAge, 18, 'la mondiale (18) doit gagner sur la locale (16)')
  // et elle est INJECTÉE dans l'état : l'UI de jeu lit state.config
  assert.equal(cfgOf(etat.config!).config.params?.adultAge, 18,
    'la config doit être injectée dans l état — sinon le jeu affiche l ancienne valeur (bug réel)')
})

test('config : sans mondiale, l EMBARQUÉE du salon n est PLUS une source — la LOCALE fait foi', () => {
  // Règle 2026-10-19 : seule la mondiale fait loi ; la config embarquée
  //  d'un état de partie est un cache, jamais une source.
  const etat = partie()
  etat.config = configAvec(17) // cache périmé embarqué
  const choisie = adopterConfig(etat, { mondiale: null, locale: configAvec(16) })
  assert.ok(choisie)
  assert.equal(cfgOf(choisie).config.params?.adultAge, 16,
    'sans mondiale, la locale (16) doit être adoptée, PAS l embarquée (17)')
  assert.equal(cfgOf(etat.config!).config.params?.adultAge, 16,
    'l état doit être réinjecté avec la locale, pas garder son cache périmé')
})

test('config : aucune source → rien ne change (pas d écrasement par null)', () => {
  const etat = partie()
  const avant = etat.config
  const choisie = adopterConfig(etat, { mondiale: null, locale: null })
  assert.equal(choisie, null, 'aucune source → null, l appelant ne change rien')
  assert.equal(etat.config, avant, 'l état ne doit pas être muté sans source')
})

// ── Le contrat d'injection à la résolution (fin de tour) ─────────────────────

test('config : l injection fin de tour conserve la config si la mondiale est absente', async () => {
  const { appliquerConfigMondiale } = await import('../engine/fusion')
  const etat = partie()
  etat.config = configAvec(17)
  appliquerConfigMondiale(etat, null)
  assert.equal(cfgOf(etat.config!).config.params?.adultAge, 17,
    'sans mondiale publiée, l embarquée doit survivre à la résolution')
  appliquerConfigMondiale(etat, configAvec(18))
  assert.equal(cfgOf(etat.config!).config.params?.adultAge, 18,
    'avec une mondiale, la résolution l applique avant runTurn')
})

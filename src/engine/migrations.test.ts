// ═══════════════════════════════════════════════════════════════════════════
//  TESTS DES MIGRATIONS DE SCHÉMA (étape 3, 2026-10-18)
//
//  Le registre versionné est la seule façon d'évoluer les sauvegardes :
//  ces tests verrouillent ses propriétés critiques :
//   · un état ancien (sans tampon) reçoit TOUTES les migrations, une fois ;
//   · un état déjà à jour n'est PAS re-migré (le tampon tient) ;
//   · un état neuf (createGame) naît à la version courante ;
//   · les numéros de version sont croissants sans trou ;
//   · le cycle JSON (sauvegarde → chargement) préserve le tampon.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { migrerEtat, MIGRATIONS, SCHEMA_VERSION_ETAT } from './migrations'
import { createGame, type SetupLine } from './setup'
import type { GameState } from './types'

const SETUP: SetupLine[] = [{
  nom: 'Test', peuple: 'NORLS', culture: 'Culture Nordique', regime: 'Autoritarisme',
  taillePopulation: 20, pourcentageMariages: 40, villes: ['A'],
}]

test('migrations : registre versionné cohérent (numéros croissants sans trou)', () => {
  assert.ok(MIGRATIONS.length > 0, 'le registre ne doit pas être vide')
  for (let i = 0; i < MIGRATIONS.length; i++) {
    assert.equal(MIGRATIONS[i].v, i + 1, `la migration ${i} doit porter le numéro ${i + 1} (pas de trou)`)
  }
  assert.equal(SCHEMA_VERSION_ETAT, MIGRATIONS.length, 'la version courante = plus haut numéro')
})

test('migrations : état ancien (sans tampon) reçoit TOUTES les migrations une seule fois', () => {
  const state = createGame(SETUP, 42, 'local')
  delete (state as { schema?: number }).schema
  const appliquees1 = migrerEtat(state)
  assert.equal(appliquees1.length, MIGRATIONS.length, 'un état sans tampon reçoit tout')
  assert.equal(state.schema, SCHEMA_VERSION_ETAT, 'le tampon est posé')
  // deuxième passage : RIEN (le tampon tient)
  const appliquees2 = migrerEtat(state)
  assert.equal(appliquees2.length, 0, 'un état déjà migré ne l est plus')
})

test('migrations : état neuf né à la version courante (aucune migration jouée)', () => {
  const state = createGame(SETUP, 42, 'local')
  assert.equal(state.schema, SCHEMA_VERSION_ETAT, 'createGame pose le tampon courant')
  const appliquees = migrerEtat(state)
  assert.equal(appliquees.length, 0, 'aucune migration sur un état neuf')
})

test('migrations : le tampon survit au VRAI cycle de persistance (compacterEtat → saveLocal → loadLocal → elargirEtat)', async () => {
  // localStorage n'existe pas sous Node : mock minimal de l'API (le
  //  chemin compactage/sérialisation/expansion reste le VRAI code).
  const store = new Map<string, string>()
  ;(globalThis as Record<string, unknown>).localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  }
  const { saveLocal, loadLocal } = await import('../state/storage')
  const state = createGame(SETUP, 42, 'local')
  delete (state as { schema?: number }).schema
  migrerEtat(state)
  // Chemin réel du store : compactage pour l'écriture, expansion à la lecture.
  saveLocal(state)
  const relu = loadLocal()
  assert.ok(relu, 'la sauvegarde locale doit relire l état')
  assert.equal(relu.schema, SCHEMA_VERSION_ETAT,
    'le tampon schema doit survivre au compactage localStorage (sinon les migrations rejouent à chaque chargement)')
  const appliquees = migrerEtat(relu)
  assert.equal(appliquees.length, 0, 'après le vrai cycle de persistance, aucune migration ne doit rejouer')
})

test('migrations : le tampon survit au cycle JSON (sauvegarde → rechargement)', () => {
  const state = createGame(SETUP, 42, 'local')
  delete (state as { schema?: number }).schema
  migrerEtat(state)
  const roundTrip = JSON.parse(JSON.stringify(state)) as GameState
  const appliquees = migrerEtat(roundTrip)
  assert.equal(appliquees.length, 0, 'après sérialisation, le tampon doit empêcher toute re-migration')
})

test('migrations : un état migré reste jouable (runTurn s exécute)', async () => {
  const state = createGame(SETUP, 42, 'local')
  delete (state as { schema?: number }).schema
  migrerEtat(state)
  const avant = state.turn
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { runTurn } = await import('./engine')
  runTurn(state)
  assert.equal(state.turn, avant + 1, 'l état migré doit rester jouable')
})

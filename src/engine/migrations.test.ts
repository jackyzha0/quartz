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
import type { Character, GameState } from './types'

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

test('compactage : le nouveau saveLocal (replacer, zéro clone) produit le MÊME format que l ancien (compacterEtat + clone)', async () => {
  const { compacterEtat } = await import('../state/storage')
  const store = new Map<string, string>()
  ;(globalThis as Record<string, unknown>).localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  }
  const { saveLocal, loadLocal } = await import('../state/storage')
  const state = createGame(SETUP, 7, 'local')
  migrerEtat(state)
  // référence : ancien chemin = clone + compacterEtat + stringify
  const ancien = JSON.stringify(compacterEtat(structuredClone(state)))
  // nouveau chemin : saveLocal (replacer) → disque
  saveLocal(state)
  const nouveau = store.get('chasse-et-peche:save')!
  assert.equal(nouveau, ancien.replace(/\\"_compact\\":true,?/g, ''),
    'les deux formats doivent être équivalents (à la casse près du marqueur)'
  )
  // et le cycle de relecture reconstruit un état identique — à l'ORDRE
  //  des clés près (elargirEtat ajoute les champs omis en fin d'objet,
  //  le contenu est identique) : comparaison par clés TRIÉES.
  const relu = loadLocal()
  assert.ok(relu)
  // elargirEtat AJOUTE les champs par défaut (contrat du format compact :
  //  ex. ministere:null ajouté aux habitants des cités libres qui ne le
  //  portaient pas) — la comparaison ignore donc les champs à valeur de
  //  défaut présents d'un seul côté : le contenu SIGNIFIANT est identique.
  const DEFAUTS: Record<string, unknown> = {
    mariage: null, mere: null, pere: null, pereBio: null, armee: null,
    mariageId: null, mereId: null, pereId: null, pereBioId: null,
    metier: null, education: null, enfantBatard: false, fecondite: 0, ministere: null,
    domicile: null,
  }
  const tri = (x: unknown): unknown => {
    if (Array.isArray(x)) return x.map(tri)
    if (x && typeof x === 'object') {
      const o: Record<string, unknown> = {}
      for (const k of Object.keys(x as Record<string, unknown>).sort()) {
        const v = (x as Record<string, unknown>)[k]
        if (k in DEFAUTS && v === DEFAUTS[k]) continue
        o[k] = tri(v)
      }
      return o
    }
    return x
  }
  const { config: _c1, ...a } = state
  const { config: _c2, ...b } = relu
  assert.deepEqual(tri(b), tri(a),
    'l état relu doit être identique à l original (champs omis reconstruits, défauts ajoutés tolérés, ordre indifférent)')
})

// ═══════════════════════════════════════════════════════════════════════════
//  V3 — REWORK HABITANTS (2026-10-20) : titre → metier, retrait ageMax
//
//  La migration v3 (migrerTitresVersMetiers) convertit `titre` en
//  `metier` sur TOUTES les populations (joueurs ET cités libres),
//  supprime `titre`/`ageMax` et renomme `recap.titresAttribues` →
//  `recap.metiersAttribues`. Le test nullish de `metier` est CRITIQUE :
//  loadLocal appelle elargirEtat AVANT migrerEtat, et elargirEtat
//  ajoute déjà `metier: null` depuis DEFAUTS_PERSO.
// ═══════════════════════════════════════════════════════════════════════════

test('v3 : titre → metier + retrait ageMax + recap renommé, idempotente', () => {
  const state = createGame(SETUP, 42, 'local')
  const p = state.players[0]
  const anciens = (state.population[p.n] ?? []).slice(0, 3) as unknown as Array<Record<string, unknown>>
  anciens.forEach((c, i) => {
    c.titre = ['Ministre', 'Marchand', 'Chasseur'][i]
    c.ageMax = 80 + i
    delete c.metier
  })
  // recap v2
  ;(p as unknown as { recap: Record<string, unknown> }).recap = { titresAttribues: { Nourriture: 4 } }
  state.schema = 2
  migrerEtat(state)
  const converts = (state.population[p.n] ?? []).slice(0, 3)
  assert.equal(converts[0].metier, 'Ministre', 'titre converti en metier')
  assert.equal(converts[1].metier, 'Marchand')
  assert.equal(converts[2].metier, 'Chasseur')
  assert.ok(converts.every((c) => !('titre' in (c as unknown as Record<string, unknown>))), 'champ titre supprimé')
  assert.ok(converts.every((c) => !('ageMax' in (c as unknown as Record<string, unknown>))), 'champ ageMax supprimé')
  const recap = (p as unknown as { recap: Record<string, unknown> }).recap
  assert.deepEqual(recap.metiersAttribues, { Nourriture: 4 }, 'recap.titresAttribues → recap.metiersAttribues')
  assert.ok(!('titresAttribues' in recap))
  // idempotente : rejouer ne change rien (et le tampon schema tient)
  migrerEtat(state)
  const rejoues = (state.population[p.n] ?? []).slice(0, 3)
  assert.equal(rejoues[0].metier, 'Ministre')
  assert.equal(state.schema, SCHEMA_VERSION_ETAT)
})

test('v3 : un metier null posé par elargirEtat AVANT la migration est REMPLACÉ par le titre (cas loadLocal)', async () => {
  const { elargirEtat } = await import('../state/storage')
  const state = createGame(SETUP, 42, 'local')
  const p = state.players[0]
  const cible = (state.population[p.n] ?? [])[0] as unknown as Record<string, unknown>
  cible.titre = 'Ministre'
  cible.metier = null // elargirEtat a déjà ajouté metier: null (DEFAUTS_PERSO)
  elargirEtat(state) // la vraie séquence de loadLocal : élargir PUIS migrer
  state.schema = 2
  migrerEtat(state)
  const relu = (state.population[p.n] ?? [])[0]
  assert.equal(relu.metier, 'Ministre', 'le titre est converti même si metier vaut déjà null')
  assert.ok(!('titre' in (relu as unknown as Record<string, unknown>)))
})

test('v3 : les cités libres sont converties aussi (toutesLesPopulations)', () => {
  const state = createGame(SETUP, 42, 'local')
  const cite = (state.citesLibres ?? [])[0]
  assert.ok(cite, 'la partie de test a au moins une cité libre')
  const habitant: Partial<Character> = {
    id: 'cl-test-1', nom: 'Test', prenom: 'Cité', dynastie: 'Roturier', sexe: 'M',
    age: 30, culture: 'Déisme', ville: cite.nom, orientation: 'Hétérosexuelle',
    traits: ['Obstiné', 'Stérile', 'Fécond'], statut: 'Sain', mariage: null, mariageId: null, mere: null, mereId: null,
    pere: null, pereId: null, pereBio: null, pereBioId: null, enfantBatard: false,
    metier: null, education: null, fecondite: 0, armee: null, ministere: null,
  }
  ;(cite.population as Character[]).push(habitant as Character)
  const brut = habitant as unknown as Record<string, unknown>
  brut.titre = 'Marchand'
  brut.ageMax = 90
  state.schema = 2
  migrerEtat(state)
  const converti = (cite.population as Character[]).find((c) => c.id === 'cl-test-1') as unknown as Record<string, unknown>
  assert.equal(converti.metier, 'Marchand', 'l habitant de la cité libre est converti')
  assert.ok(!('titre' in converti) && !('ageMax' in converti), 'titre et ageMax supprimés dans les cités libres')
})

// ═══════════════════════════════════════════════════════════════════════════
//  VAGUE 3a (rework métiers & aménagements, 2026-10-21) — migration v4 :
//  renomme les métiers disparus sur TOUTES les populations (joueurs ET
//  cités libres — Artisan → Commerçant, Chercheur → Scientifique,
//  Sportif → Garde) et passe les Propagandistes Sans-emploi (métier
//  supprimé du référentiel).
// ═══════════════════════════════════════════════════════════════════════════

test('v4 : renoms vague 3a — Artisan → Commerçant, Chercheur → Scientifique, Sportif → Garde, Propagandiste → Sans-emploi (idempotente)', () => {
  const state = createGame(SETUP, 42, 'local')
  const p = state.players[0]
  const pop = (state.population[p.n] ?? []).slice(0, 4)
  pop[0].metier = 'Artisan'
  pop[1].metier = 'Chercheur'
  pop[2].metier = 'Sportif'
  pop[3].metier = 'Propagandiste'
  const cite = (state.citesLibres ?? [])[0]
  let citePropa: Character | null = null
  if (cite) {
    citePropa = ((cite.population as Character[])[0] ?? null)
    if (citePropa) citePropa.metier = 'Propagandiste'
  }
  state.schema = 3
  migrerEtat(state)
  assert.equal(pop[0].metier, 'Commerçant', 'Artisan renommé Commerçant')
  assert.equal(pop[1].metier, 'Scientifique', 'Chercheur renommé Scientifique')
  assert.equal(pop[2].metier, 'Garde', 'Sportif renommé Garde')
  assert.equal(pop[3].metier, null, 'Propagandiste supprimé → Sans-emploi')
  if (citePropa) assert.equal(citePropa.metier, null, 'les cités libres sont migrées aussi (toutesLesPopulations)')
  // idempotente : rejouer ne casse rien (les nouveaux noms ne matchent plus la table)
  migrerEtat(state)
  assert.equal(pop[0].metier, 'Commerçant')
  assert.equal(pop[3].metier, null)
  assert.equal(state.schema, SCHEMA_VERSION_ETAT, 'le tampon schema tient')
})

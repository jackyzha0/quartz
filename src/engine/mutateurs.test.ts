// ═══════════════════════════════════════════════════════════════════════════
//  TESTS DES MUTATEURS UI — supprimerVille, transfererVille, marierPersonnages
//
//  Ces trois fonctions sont appelées DIRECTEMENT par les vues (page
//  « Pays » : VilleCarte.tsx ; onglet « Population » :
//  PopulationTable.tsx) sur l'état partagé — elles ne sont couvertes
//  par aucun autre test. Les règles verrouillées ici sont des retours
//  Thibaut actés :
//    · supprimerVille (2026-10-14) : les habitants RESTENT dans la
//      population du joueur (l'arbitre les reloge ensuite) ;
//    · transfererVille (2026-10-14) : la ville ET sa population
//      « classique » suivent le nouveau propriétaire, la COUR (nobles)
//      reste auprès de son joueur, renommage en cas de collision de
//      nom — rejouerTransfertVille (protocole v2, bug 2026-10-17) est
//      IDEMPOTENT (rejouer deux fois le même événement est sans effet) ;
//    · marierPersonnages (2026-10-14, marqueur (o)) : la personne mariée
//      DÉMÉNAGE dans la ville et la population du porteur de son
//      conjoint — mariage inter-joueurs possible.
//  Méthode : vraie partie à 8 joueurs (createGame, graine fixe),
//  personnages de test construits à la main pour les assertions de
//  population.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createGame, type SetupLine } from './setup'
import type { Character, GameState } from './types'
import { supprimerVille, transfererVille, rejouerTransfertVille } from './villes'
import { marierPersonnages } from './cour'
import { killCharacter } from './sante'
import { isConsanguineous } from './naissances'
import { emptyRecap, deplacerPersonnage } from './shared'

const PEUPLES = ['Basiléens', 'PEAUX VERTES', "ELFES D'OR", 'Sylvains', 'NORLS', 'VERMINES DE KAOSS']
const CULTURES = ['Communautarisme', 'Déisme', 'Lunisme', 'Naturalisme', 'Sethisme', 'Zélotisme']
const REGIMES = ['Autoritarisme', 'Socialisme', 'Démocratie', 'Monarchie']

/** Partie à 8 joueurs, chacun avec DEUX villes (« Capitale n » et
 *  « Bourg n ») pour que transferts et collisions de nom soient
 *  testables. Le joueur 2 a AUSSI un « Bourg 1 » (collision voulue
 *  avec le Bourg du joueur 1 pour le test de renommage). */
function partieHuitJoueurs(): GameState {
  const setups: SetupLine[] = Array.from({ length: 8 }, (_, i) => ({
    nom: `Joueur ${i + 1}`,
    peuple: PEUPLES[i % PEUPLES.length],
    culture: CULTURES[i % CULTURES.length],
    regime: REGIMES[i % REGIMES.length],
    taillePopulation: 50,
    pourcentageMariages: 40,
    villes: i === 1
      ? [`Capitale ${i + 1}`, 'Bourg 1']
      : [`Capitale ${i + 1}`, `Bourg ${i + 1}`],
  }))
  return createGame(setups, 20261019, 'local')
}

/** Personnage de test complet (tous les champs obligatoires de
 *  l'interface Character) — noble si la dynastie n'est pas
 *  « Roturier » (isNobleDyn, shared.ts). */
function perso(
  id: string, dynastie: string, ville: string,
  o: { age?: number; statut?: Character['statut']; mariage?: string | null; mariageId?: string | null; sexe?: 'M' | 'F' } = {},
): Character {
  return {
    id,
    nom: dynastie,
    prenom: `Test-${id}`,
    dynastie,
    sexe: o.sexe ?? 'F',
    age: o.age ?? 30,
    culture: 'Déisme',
    ville,
    orientation: 'Hétérosexuel',
    traits: ['Doux', 'Sérieux', 'Prudent'],
    statut: o.statut ?? 'Sain',
    mariage: o.mariage ?? null,
    mariageId: o.mariageId ?? null,
    mere: null,
    mereId: null,
    pere: null,
    pereId: null,
    pereBio: null,
    pereBioId: null,
    enfantBatard: false,
    metier: null,
    education: null,
    fecondite: 1,
    armee: null,
  }
}

// ── supprimerVille ────────────────────────────────────────────────────────

test('supprimerVille : la ville disparaît mais ses habitants RESTENT en population', () => {
  const state = partieHuitJoueurs()
  const p1 = state.players[0]
  const popAvant = (state.population[1] ?? []).slice()
  const bourg = p1.villes.find((v) => v.nom === 'Bourg 1')
  assert.ok(bourg, 'Bourg 1 attendu dans le setup du joueur 1')
  const idx = p1.villes.indexOf(bourg)

  const retour = supprimerVille(state, p1, idx)
  assert.equal(retour, 'Bourg 1', 'retour = nom de la ville supprimée')
  assert.ok(!p1.villes.some((v) => v.nom === 'Bourg 1'), 'la ville est retirée')
  assert.equal(p1.villes.length, 1, 'il reste la capitale')
  // Retour Thibaut 2026-10-14 : les habitants ne sont PAS supprimés.
  assert.deepEqual(state.population[1], popAvant, 'population inchangée (habitants conservés)')
  assert.ok(state.log.some((l) => l.type === 'Système' && l.texte.includes('Bourg 1')), 'log de suppression')
})

test('supprimerVille : idx invalide → null, état intact', () => {
  const state = partieHuitJoueurs()
  const p1 = state.players[0]
  const avant = p1.villes.length
  assert.equal(supprimerVille(state, p1, 99), null)
  assert.equal(p1.villes.length, avant)
})

// ── transfererVille ───────────────────────────────────────────────────────

test('transfererVille : la ville et sa population classique suivent, la cour reste', () => {
  const state = partieHuitJoueurs()
  const p1 = state.players[0]
  const p3 = state.players[2]
  const roturier = perso('t-rot', 'Roturier', 'Bourg 1')
  const noble = perso('t-nob', 'Valois', 'Bourg 1')
  state.population[1] = [...(state.population[1] ?? []), roturier, noble]
  const idx = p1.villes.findIndex((v) => v.nom === 'Bourg 1')
  assert.ok(idx >= 0)

  assert.equal(transfererVille(state, p1, idx, p3), true, 'transfert effectué')
  assert.ok(p3.villes.some((v) => v.nom === 'Bourg 1'), 'ville chez le receveur')
  assert.ok(!p1.villes.some((v) => v.nom === 'Bourg 1'), 'ville partie du source')
  // Habitants classiques : suivent le nouveau propriétaire…
  assert.ok((state.population[3] ?? []).some((c) => c.id === 't-rot'), 'roturier déplacé chez J3')
  assert.ok(!(state.population[1] ?? []).some((c) => c.id === 't-rot'), 'roturier retiré de J1')
  // …mais la COUR (nobles) reste auprès de son joueur, ré-ancrée sur
  // sa première ville restante (retour Thibaut 2026-10-14).
  assert.ok((state.population[1] ?? []).some((c) => c.id === 't-nob'), 'noble resté chez J1')
  const nobleReste = (state.population[1] ?? []).find((c) => c.id === 't-nob')
  assert.equal(nobleReste?.ville, 'Capitale 1', 'noble ré-ancré sur la première ville restante')
  assert.ok(state.log.some((l) => l.texte.includes('passe de Joueur 1 à Joueur 3')), 'log de transfert')
})

test('transfererVille : collision de nom chez le receveur → renommage « X 2 »', () => {
  const state = partieHuitJoueurs()
  const p1 = state.players[0]
  const p2 = state.players[1]  // possède déjà un « Bourg 1 » (setup)
  const habitant = perso('t-col', 'Roturier', 'Bourg 1')
  state.population[1] = [...(state.population[1] ?? []), habitant]
  const idx = p1.villes.findIndex((v) => v.nom === 'Bourg 1')

  assert.equal(transfererVille(state, p1, idx, p2), true)
  assert.ok(p2.villes.some((v) => v.nom === 'Bourg 1 2'), 'ville renommée « Bourg 1 2 »')
  const deplace = (state.population[2] ?? []).find((c) => c.id === 't-col')
  assert.equal(deplace?.ville, 'Bourg 1 2', 'habitant rattache à la ville renommée')
})

test('transfererVille : cible = soi-même → refus', () => {
  const state = partieHuitJoueurs()
  const p1 = state.players[0]
  const avant = p1.villes.length
  assert.equal(transfererVille(state, p1, 0, p1), false)
  assert.equal(p1.villes.length, avant)
})

test('rejouerTransfertVille (protocole v2) : rejeu du même événement idempotent', () => {
  const state = partieHuitJoueurs()
  const p1 = state.players[0]
  const p3 = state.players[2]
  const payload = { ville: 'Bourg 1', src: 1, dst: 3 }

  // Premier passage (résolution du tour) : le transfert a lieu.
  assert.equal(rejouerTransfertVille(state, payload), true)
  assert.ok(p3.villes.some((v) => v.nom === 'Bourg 1'))
  assert.ok(!p1.villes.some((v) => v.nom === 'Bourg 1'))
  // Double événement (bug 2026-10-17) : sans effet, la ville n'est
  // plus chez le source.
  assert.equal(rejouerTransfertVille(state, payload), false)
  assert.equal(p3.villes.filter((v) => v.nom === 'Bourg 1').length, 1, 'pas de doublon de ville')
})

// ── marierPersonnages ─────────────────────────────────────────────────────

test('marierPersonnages inter-joueurs : la mariée déménage chez le porteur de son conjoint', () => {
  const state = partieHuitJoueurs()
  const ada = perso('m-ada', 'Valois', 'Capitale 1', { sexe: 'F' })
  const bob = perso('m-bob', 'Montclair', 'Capitale 2', { sexe: 'M' })
  state.population[1] = [...(state.population[1] ?? []), ada]
  state.population[2] = [...(state.population[2] ?? []), bob]

  assert.equal(marierPersonnages(state, ada, bob), null, 'mariage accepté')
  assert.equal(ada.mariage, 'Test-m-bob Montclair', 'a porte le nom de b')
  assert.equal(bob.mariage, 'Test-m-ada Valois', 'b porte le nom de a')
  // M1 (2026-10-19) : l'identité du conjoint vit dans l'id.
  assert.equal(ada.mariageId, 'm-bob')
  assert.equal(bob.mariageId, 'm-ada')
  // Marqueur (o) — la personne mariée DÉMÉNAGE : elle quitte la
  // population de son porteur et rejoint celle du conjoint.
  assert.ok((state.population[2] ?? []).some((c) => c.id === 'm-ada'), 'ada a rejoint J2')
  assert.ok(!(state.population[1] ?? []).some((c) => c.id === 'm-ada'), 'ada a quitté J1')
  assert.equal(ada.ville, 'Capitale 2', 'ada s installée dans la ville de son conjoint')
  assert.ok(state.log.some((l) => l.type === 'Mariage'), 'log de mariage')
})

test('marierPersonnages : gardes-fous (même personnage, mineur, déjà marié, roturier, décédé)', () => {
  const state = partieHuitJoueurs()
  const a = perso('g-a', 'Valois', 'Capitale 1')
  const b = perso('g-b', 'Montclair', 'Capitale 1')
  state.population[1] = [a, b]

  assert.match(marierPersonnages(state, a, a) ?? "", /lui-même/)
  const mineur = perso('g-m', 'Valois', 'Capitale 1', { age: 15 })
  assert.match(marierPersonnages(state, a, mineur) ?? "", /majeurs/)
  const marie = perso('g-c', 'Valois', 'Capitale 1', { mariage: 'Quelqu un Autre', mariageId: 'x-inconnu' })
  assert.match(marierPersonnages(state, a, marie) ?? "", /déjà marié/)
  const roturier = perso('g-r', 'Roturier', 'Capitale 1')
  assert.match(marierPersonnages(state, a, roturier) ?? "", /NOBLES/)
  const decede = perso('g-d', 'Montclair', 'Capitale 1', { statut: 'Décédé' })
  assert.match(marierPersonnages(state, a, decede) ?? "", /décédé/)
  // Aucun garde-fou franchi : a et b restent non mariés, rien n a bougé.
  assert.equal(a.mariage, null)
  assert.equal(b.mariage, null)
})

// ── M1 : identité démographique par IDS (audit 2026-10-19, arbitrage
//    Thibaut « ids purs ») — le nom complet n'est plus une identité. ────────

test('M1 : veuvage par id — un homonyme du défunt ne libère PAS son conjoint', () => {
  const state = partieHuitJoueurs()
  const p1 = state.players[0]
  const mari = perso('v-mari', 'Montclair', 'Capitale 1', { sexe: 'M', mariage: 'Test-v-ep Valois', mariageId: 'v-ep' })
  const epouse = perso('v-ep', 'Valois', 'Capitale 1', { sexe: 'F', mariage: 'Test-v-mari Montclair', mariageId: 'v-mari' })
  // Leurre : son conjoint AFFICHE porte le même nom complet que le mari
  //  (collision de noms à 16 000 habitants) — mais l'id ne ment pas.
  const leurre = perso('v-leurre', 'Valois', 'Capitale 1', { sexe: 'F', mariage: 'Test-v-mari Montclair', mariageId: 'v-autre' })
  state.population[1] = [mari, epouse, leurre]

  killCharacter(state, p1, mari, 'maladie', emptyRecap())
  assert.equal(epouse.mariage, null, 'la vraie épouse est libérée (affichage)')
  assert.equal(epouse.mariageId, null, 'la vraie épouse est libérée (id)')
  assert.equal(leurre.mariage, 'Test-v-mari Montclair', 'l homonyme garde son conjoint AFFICHÉ')
  assert.equal(leurre.mariageId, 'v-autre', 'l homonyme garde son conjoint par id — pas de veuvage parasite')
})

test('M1 : consanguinité par ids — les noms complets ne comptent plus', () => {
  const a = perso('c-a', 'Valois', 'Capitale 1')
  const b = perso('c-b', 'Valois', 'Capitale 1')
  a.mereId = 'gm-commune'
  b.mereId = 'gm-commune'
  assert.ok(isConsanguineous(a, b), 'même mère par ID → consanguin')
  const c = perso('c-c', 'Valois', 'Capitale 1')
  const d = perso('c-d', 'Valois', 'Capitale 1')
  c.mere = 'Grand-mère Commune'
  d.mere = 'Grand-mère Commune'
  assert.ok(!isConsanguineous(c, d), 'même nom de mère SANS id → NON consanguin (l identité passe par les ids)')
})

test('M1 : setup — champs ids posés partout et couples symétriques par id', () => {
  const state = partieHuitJoueurs()
  for (const liste of Object.values(state.population)) {
    for (const c of liste ?? []) {
      assert.ok(c.mariageId !== undefined && c.mereId !== undefined && c.pereId !== undefined && c.pereBioId !== undefined,
        `champs M1 présents sur ${c.id}`)
      if (c.mariageId) {
        const conjoint = Object.values(state.population).flat().find((x) => x.id === c.mariageId)
        assert.ok(conjoint, `le conjoint par id de ${c.id} existe`)
        assert.equal(conjoint.mariageId, c.id, `lien conjugal symétrique par id pour ${c.id}`)
      }
    }
  }
})

// ── Vague 3a : déménagement → perte du métier ET du domicile ──────────────

test('vague 3a : marierPersonnages — le noble qui déménage perd son métier et son domicile', () => {
  const state = partieHuitJoueurs()
  const ada = perso('d-ada', 'Valois', 'Capitale 1', { sexe: 'F' })
  const bob = perso('d-bob', 'Montclair', 'Capitale 2', { sexe: 'M' })
  ada.metier = 'Marchand'
  ada.domicile = 'Manoir des Valois'
  state.population[1] = [...(state.population[1] ?? []), ada]
  state.population[2] = [...(state.population[2] ?? []), bob]
  assert.equal(marierPersonnages(state, ada, bob), null, 'mariage accepté')
  assert.equal(ada.ville, 'Capitale 2', 'ada a déménagé chez son conjoint')
  assert.equal(ada.metier, null, 'déménagement : le métier est perdu (Sans-emploi)')
  assert.equal(ada.domicile, null, 'déménagement : le domicile est perdu')
  assert.equal(bob.metier, null, 'bob n a pas bougé : aucun effet sur lui')
})

test('vague 3a : deplacerPersonnage — don à un autre porteur = déménagement (métier et domicile perdus)', () => {
  const state = partieHuitJoueurs()
  const p2 = state.players[1]
  const c = perso('d-don', 'Roturier', 'Capitale 1')
  c.metier = 'Bûcheron'
  c.domicile = 'Cabane'
  state.population[1] = [...(state.population[1] ?? []), c]
  const err = deplacerPersonnage(state, c, { kind: 'joueur', p: p2 })
  assert.equal(err, null, 'don accepté')
  assert.ok((state.population[2] ?? []).some((x) => x.id === 'd-don'), 'le personnage a rejoint J2')
  assert.equal(c.ville, 'Capitale 2', 'ré-ancré sur la première ville de J2')
  assert.equal(c.metier, null, 'déménagement : métier perdu')
  assert.equal(c.domicile, null, 'déménagement : domicile perdu')
  assert.ok(state.log.some((l) => l.type === 'Système' && l.texte.includes('quitte son poste')),
    'le log raconte la perte du poste')
})

test('vague 3a : transfererVille — la population classique suit la ville SANS perdre son métier (transfert ≠ déménagement), la cour ré-ancrée le perd', () => {
  const state = partieHuitJoueurs()
  const p1 = state.players[0]
  const p3 = state.players[2]
  const roturier = perso('d-suiv', 'Roturier', 'Bourg 1')
  roturier.metier = 'Pêcheur'
  roturier.domicile = 'Maison du Bourg'
  const noble = perso('d-cour', 'Valois', 'Bourg 1')
  noble.metier = 'Gouverneur'
  noble.domicile = 'Donjon'
  state.population[1] = [...(state.population[1] ?? []), roturier, noble]
  const idx = p1.villes.findIndex((v) => v.nom === 'Bourg 1')
  assert.ok(idx >= 0)
  assert.equal(transfererVille(state, p1, idx, p3), true, 'transfert effectué')
  // le roturier suit la ville (changement de PROPRIÉTAIRE, pas
  //  d'habitation) : il garde son poste et son domicile.
  assert.equal(roturier.metier, 'Pêcheur', 'transfert de propriété : le métier est conservé')
  assert.equal(roturier.domicile, 'Maison du Bourg', 'le domicile est conservé')
  // la cour restée derrière change d'habitation (ré-ancrée sur
  //  Capitale 1) : métier et domicile perdus.
  assert.equal(noble.ville, 'Capitale 1', 'noble ré-ancré sur la première ville restante')
  assert.equal(noble.metier, null, 'ré-ancrage : métier perdu')
  assert.equal(noble.domicile, null, 'ré-ancrage : domicile perdu')
})

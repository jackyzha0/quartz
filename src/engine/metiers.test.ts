// ═══════════════════════════════════════════════════════════════════════════
//  TESTS MÉTIERS — caps par ville et réaffectation (rework habitants,
//  vagues 1 + 3a, 2026-10-20/21)
//
//  Arbitrages actés :
//   · vague 1 : le Chasseur est plafonné, caps séparées Ville (50) /
//     Château (25, « très généreux »), paramétrables ;
//   · vague 3a (rework métiers & emplacements) : les caps des métiers
//     de production = SOMME des emplacements des aménagements de la
//     ville (le Chasseur garde sa cap par défaut EN PLUS de ses
//     emplacements) ; sans aménagement, cap 0 (une ville sans
//     aménagement ne produit quasi rien par métiers — assumé) ;
//     Garde/Banquier/Troubadour/Professeur/cour/armée : règles
//     propres, non plafonnés par ce canal ;
//   · surnombre : les PLUS ÂGÉS perdent leur métier (Sans-emploi) ;
//   · places libres : les Sans-emploi ADULTES prennent un poste,
//     les plus âgés d'abord, en priorisant un métier AUTRE que
//     Chasseur (ordre du référentiel) — jamais les enfants ;
//   · Sans-emploi = rôle NEUTRE : impôt nul, aucun effet ;
//   · Fermier : production d'ÉTÉ seulement (champ ete du référentiel) ;
//   · taxes : bonus ADDITIFS (Gouverneur +10 % toutes, Banquier +10 %
//     Or, Professeur +10 % Science, Troubadour +10 % Tourisme) ;
//   · Garde : +garnisonParGarde Garnison STATIQUE (valeur d'état) ;
//   · la réaffectation tourne avant le calcul des gains (étape 2ter).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createGame, type SetupLine } from './setup'
import type { Character, City, GameState } from './types'
import { cfgOf } from './gameData'
import { capMetierVille, reaffecterMetiers, occupationsMetierVille } from './metiers'
import { invaliderIndexPopulation } from './naissances'
import { detailGainsVille } from './economie'
import { garnisonHabitationVille, detailGarnisonVille } from './regimes'

const SETUP: SetupLine[] = [{
  nom: 'Test', peuple: 'NORLS', culture: 'Culture Nordique', regime: 'Autoritarisme',
  taillePopulation: 20, pourcentageMariages: 40, villes: ['Capitale'],
}]

/** Personnage de test complet (tous les champs obligatoires). */
function perso(id: string, age: number, o: { metier?: string | null; statut?: Character['statut']; ville?: string } = {}): Character {
  return {
    id, nom: 'Test', prenom: `Pers-${id}`, dynastie: 'Roturier', sexe: 'M', age,
    culture: 'Déisme', ville: o.ville ?? 'Capitale', orientation: 'Hétérosexuel',
    traits: ['Obstiné', 'Stérile', 'Fécond'], statut: o.statut ?? 'Sain', mariage: null, mariageId: null,
    mere: null, mereId: null, pere: null, pereId: null,
    pereBio: null, pereBioId: null, enfantBatard: false,
    metier: o.metier ?? null, education: null, fecondite: 0, armee: null, ministere: null,
  }
}

function partie(): GameState {
  return createGame(SETUP, 20261020, 'local')
}

test('capMetierVille (vague 3a) : Chasseur = cap défaut + emplacements ; métiers productifs = emplacements ; rôles propres illimités', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  const ville: City = { ...p.villes[0] }
  ville.type = 'Ville'
  ville.amenagements = []
  assert.equal(capMetierVille(C.p.metierChasseur, ville, C), 50, 'cap Ville par défaut')
  ville.type = 'Château'
  assert.equal(capMetierVille(C.p.metierChasseur, ville, C), 25, 'cap Château par défaut (arbitrage « très généreux »)')
  // vague 3a : une Scierie ajoute 2 emplacements de Chasseur et 2 de Bûcheron
  const scierie: City = { ...p.villes[0], type: 'Ville', amenagements: ['Scierie'] }
  assert.equal(capMetierVille(C.p.metierChasseur, scierie, C), 52, 'Chasseur : cap défaut 50 + 2 emplacements de la Scierie')
  assert.equal(capMetierVille('Bûcheron', scierie, C), 2, 'Bûcheron : 2 emplacements (Scierie)')
  assert.equal(capMetierVille('Bûcheron', ville, C), 0, 'métier productif sans aménagement : cap 0')
  // Mine d'Or : 3 emplacements de Marchand
  assert.equal(capMetierVille('Marchand', ville, C), 0, 'Marchand sans Mine d Or : cap 0')
  const mineOr: City = { ...p.villes[0], type: 'Ville', amenagements: ["Mine d'Or"] }
  assert.equal(capMetierVille('Marchand', mineOr, C), 3, 'Mine d Or : 3 emplacements de Marchand')
  // Fermier (ete) : plafonné comme les productifs — Champ 3, Rizière 4
  const champ: City = { ...p.villes[0], type: 'Ville', amenagements: ['Champ'] }
  assert.equal(capMetierVille('Fermier', champ, C), 3, 'Champ : 3 emplacements de Fermier')
  // rôles non plafonnés (règles propres) : Garde, Banquier, Troubadour, cour, armée
  assert.equal(capMetierVille('Garde', ville, C), Number.POSITIVE_INFINITY, 'Garde : garnison statique, hors canal emplacements')
  assert.equal(capMetierVille('Banquier', ville, C), Number.POSITIVE_INFINITY)
  assert.equal(capMetierVille('Troubadour', ville, C), Number.POSITIVE_INFINITY)
  assert.equal(capMetierVille('Dirigeant', ville, C), Number.POSITIVE_INFINITY, 'cour : règles propres (succession)')
  assert.equal(capMetierVille('Soldat', ville, C), Number.POSITIVE_INFINITY, 'armée : engagement militaire')
  // l'absence de métier n'est jamais plafonnée
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

// ── Vague 2 UI : helper « métiers et places par ville » ──────────────────

test('occupationsMetierVille (vague 3a) : emplacements par aménagement, métiers productifs toujours listés, Sans-emploi en dernière ligne', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  const habitants = [
    perso('o1', 30, { metier: C.p.metierChasseur }),
    perso('o2', 40, { metier: C.p.metierChasseur }),
    perso('o3', 50, { metier: C.p.metierChasseur }),
    perso('m1', 35, { metier: 'Marchand' }),
    perso('s1', 20, {}),
    perso('s2', 25, {}),
    perso('d1', 80, { metier: 'Marchand', statut: 'Décédé' }),
  ]
  const ville: City = { ...p.villes[0], type: 'Ville', amenagements: ["Mine d'Or"] }
  const lignes = occupationsMetierVille(habitants, ville, C)
  const chasseur = lignes.find((l) => l.metier === C.p.metierChasseur)
  assert.ok(chasseur, 'Chasseur listé (plafonné → toujours affiché, même à 0)')
  assert.equal(chasseur!.enPoste, 3, '3 Chasseurs en poste')
  assert.equal(chasseur!.cap, 50, 'cap Ville 50 (aucun emplacement Chasseur ici)')
  const marchand = lignes.find((l) => l.metier === 'Marchand')
  assert.ok(marchand, 'Marchand listé (occupé)')
  assert.equal(marchand!.enPoste, 1, 'le Marchand décédé ne compte pas')
  assert.equal(marchand!.cap, 3, 'Mine d Or : 3 emplacements de Marchand')
  // vague 3a : chaque métier productif a une cap FINIE (0 sans
  //  aménagement) et apparaît donc dans la liste — l'écran « Métiers
  //  et places » montre TOUTES les caps d'emplacement.
  const bucheron = lignes.find((l) => l.metier === 'Bûcheron')
  assert.ok(bucheron, 'Bûcheron listé même sans occupant (cap finie 0 sans Scierie)')
  assert.equal(bucheron!.cap, 0)
  const fermier = lignes.find((l) => l.metier === 'Fermier')
  assert.ok(fermier && fermier.cap === 0, 'Fermier listé (cap 0 sans Champ/Rizière)')
  // les rôles non plafonnés et inoccupés n'apparaissent pas
  assert.equal(lignes.filter((l) => l.metier === 'Dirigeant').length, 0, 'Dirigeant non listé (illimité, inoccupé)')
  assert.equal(lignes.filter((l) => l.metier === 'Garde').length, 0, 'Garde non listé (illimité, inoccupé)')
  const sans = lignes.find((l) => l.metier === null)
  assert.ok(sans, 'ligne Sans-emploi toujours présente')
  assert.equal(sans!.enPoste, 2, '2 sans-emploi vivants')
  assert.equal(lignes[lignes.length - 1].metier, null, 'Sans-emploi en dernière ligne')
  // Château : cap 25
  const chateau: City = { ...p.villes[0], type: 'Château', amenagements: ["Mine d'Or"] }
  const lch = occupationsMetierVille(habitants, chateau, C).find((l) => l.metier === C.p.metierChasseur)
  assert.equal(lch!.cap, 25, 'cap Château 25')
  // ville = null (cité libre) : aucune cap, métier à 0 occupant non listé
  const cite = occupationsMetierVille([], null, C)
  assert.ok(cite.every((l) => !Number.isFinite(l.cap)), 'cité libre : caps toutes infinies')
  assert.equal(cite.length, 1, 'seule la ligne Sans-emploi (aucun occupant, aucune cap finie)')
  assert.ok(cite[0].metier === null && cite[0].enPoste === 0, 'Sans-emploi 0 en poste')
})

test('occupationsMetierVille : métiers hors référentiel conservés (anciennes sauvegardes)', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const lignes = occupationsMetierVille([perso('p1', 30, { metier: 'Vieux métier' })], null, C)
  const vieux = lignes.find((l) => l.metier === 'Vieux métier')
  assert.ok(vieux, 'métier personnalisé hors référentiel conservé')
  assert.equal(vieux!.enPoste, 1)
  assert.equal(vieux!.cap, Number.POSITIVE_INFINITY, 'hors référentiel = illimité')
})

// ── Vague 3a : emplacements, priorisation, été, taxes, garnison ──────────

test('reaffecterMetiers (vague 3a) : priorisation — un sans-emploi prend un poste AUTRE que Chasseur d\'abord', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  p.villes[0].amenagements = ['Bâteau de pêche']
  C.p.capMetierChasseurVille = 1
  state.population[p.n] = [
    perso('s-40', 40),
    perso('s-30', 30),
    perso('s-22', 22),
    perso('s-21', 21),
  ]
  invaliderIndexPopulation()
  reaffecterMetiers(state, C)
  const parId = new Map(state.population[p.n].map((c) => [c.id, c]))
  assert.equal(parId.get('s-40')!.metier, 'Pêcheur', 'priorisation : les 2 emplacements de Pêcheur (Bâteau de pêche) sont pris avant le Chasseur')
  assert.equal(parId.get('s-30')!.metier, 'Pêcheur')
  assert.equal(parId.get('s-22')!.metier, C.p.metierChasseur, 'ensuite la cap Chasseur (1)')
  assert.equal(parId.get('s-21')!.metier, null, 'plus de place : reste sans emploi')
  assert.ok(state.log.some((l) => l.type === 'Métier' && l.texte.includes('pêcheur')),
    'le log agrégé raconte les postes pris')
})

test('Fermier (vague 3a) : +5 Nourriture en ÉTÉ seulement (champ ete du référentiel)', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  state.population[p.n] = [
    perso('f-30', 30, { metier: 'Fermier' }),
    perso('c-20', 20, { metier: C.p.metierChasseur }),
  ]
  invaliderIndexPopulation()
  const ville = p.villes[0]
  state.saison = 'Été'
  const dete = detailGainsVille(state, p, ville, C)
  assert.ok(Math.abs(dete.metiers['Nourriture'] - (5 + 1.2)) < 1e-9, 'été : Fermier +5 et Chasseur +1,2 Nourriture')
  state.saison = 'Hiver'
  const dhiver = detailGainsVille(state, p, ville, C)
  assert.ok(Math.abs(dhiver.metiers['Nourriture'] - 1.2) < 1e-9, 'hors été : le Fermier ne produit rien, le Chasseur reste')
})

test('Taxes (vague 3a) : bonus ADDITIFS — Gouverneur +10 % toutes ressources, Banquier +10 % Or, cumul = +20 %', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  const ville = p.villes[0]
  state.population[p.n] = [
    perso('t-com', 30, { metier: 'Commerçant' }),
    perso('t-sci', 40, { metier: 'Scientifique' }),
  ]
  invaliderIndexPopulation()
  const base = detailGainsVille(state, p, ville, C)
  assert.ok(base.taxes['Or'] !== undefined && base.taxes['Science'] !== undefined)
  assert.equal(Object.keys(base.bonusTaxes).length, 0, 'aucun bonus sans titulaire')
  // + un Gouverneur : +10 % sur TOUTES les ressources produites
  state.population[p.n].push(perso('t-gouv', 50, { metier: C.p.metierGouverneur }))
  invaliderIndexPopulation()
  const gouv = detailGainsVille(state, p, ville, C)
  assert.ok(Math.abs(gouv.bonusTaxes['Or'] - 0.1) < 1e-9, 'Gouverneur : +10 % Or')
  assert.ok(Math.abs(gouv.bonusTaxes['Science'] - 0.1) < 1e-9, 'Gouverneur : +10 % Science')
  assert.ok(Math.abs(gouv.taxes['Or'] - base.taxes['Or'] * 1.1) < 1e-9, 'la taxe d Or augmente de 10 %')
  // + un Banquier : cumul ADDITIF → +20 % sur l'Or, +10 % sur la Science
  state.population[p.n].push(perso('t-banq', 45, { metier: 'Banquier' }))
  invaliderIndexPopulation()
  const lesDeux = detailGainsVille(state, p, ville, C)
  assert.ok(Math.abs(lesDeux.bonusTaxes['Or'] - 0.2) < 1e-9, 'Gouverneur + Banquier : +20 % Or (additif)')
  assert.ok(Math.abs(lesDeux.bonusTaxes['Science'] - 0.1) < 1e-9, 'le Banquier ne touche pas à la Science')
  assert.ok(Math.abs(lesDeux.taxes['Or'] - base.taxes['Or'] * 1.2) < 1e-9)
  // un Troubadour sans production de Tourisme dans la ville → pas de clé
  state.population[p.n].push(perso('t-trou', 35, { metier: 'Troubadour' }))
  invaliderIndexPopulation()
  const avecTrouv = detailGainsVille(state, p, ville, C)
  assert.equal(avecTrouv.bonusTaxes['Tourisme'], undefined, 'aucun bonus sur une ressource non produite')
})

test('reaffecterMetiers (vague 3) : un Marchand qui tient une route n est pas décoiffé (poste créé par la route)', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  state.population[p.n] = [
    perso('m-route', 30, { metier: 'Marchand' }),
    perso('m-libre', 50, { metier: 'Marchand' }),
  ]
  state.routesCommerce = [{
    id: 'rc-test', joueur: p.n, marchandId: 'm-route', joueurCible: 1,
    villeCible: 'Ailleurs', amenagement: 'Scierie',
  }]
  invaliderIndexPopulation()
  reaffecterMetiers(state, C)
  const parId = new Map(state.population[p.n].map((c) => [c.id, c]))
  assert.equal(parId.get('m-route')!.metier, 'Marchand', 'le titulaire de la route garde son poste (emplacements Marchand = Mines d Or ET routes, spec vague 3)')
  assert.equal(parId.get('m-libre')!.metier, C.p.metierChasseur, 'sans Mine d Or ni route : le marchand libre perd son poste (cap 0) puis prend le poste par défaut (Chasseur)')
})

test('Garde (vague 3a) : +garnisonParGarde Garnison STATIQUE par Garde en poste (valeur d état, jamais un flux)', () => {
  const state = partie()
  const C = cfgOf(state.config)
  const p = state.players[0]
  const ville = p.villes[0]
  const sans = garnisonHabitationVille(p, ville, C, state)
  state.population[p.n] = [
    perso('g-30', 30, { metier: C.p.metierGarde }),
    perso('g-40', 40, { metier: C.p.metierGarde }),
    perso('g-90', 90, { metier: C.p.metierGarde, statut: 'Décédé' }),
  ]
  invaliderIndexPopulation()
  const avec = garnisonHabitationVille(p, ville, C, state)
  assert.equal(C.p.garnisonParGarde, 10, 'paramètre par défaut : 10 Garnison par Garde')
  assert.equal(avec - sans, 2 * C.p.garnisonParGarde, '2 Gardes vivants en poste : +20 Garnison (le décédé ne compte pas)')
  // le détail raconte la même chose (ligne origine « métier »)
  const ligne = detailGarnisonVille(p, ville, C, state).find((l) => l.origine === 'métier')
  assert.ok(ligne && ligne.valeur === 2 * C.p.garnisonParGarde, 'ligne « Gardes en poste (statique) » dans le détail de garnison')
  // le Garde ne produit RIEN par tour (« la Garnison n est jamais par tour »)
  const d = detailGainsVille(state, p, ville, C)
  assert.equal(d.metiers['Garnison'], undefined, 'aucune production de Garnison par tour')
})

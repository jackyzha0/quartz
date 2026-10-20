// ═══════════════════════════════════════════════════════════════════════════
//  TESTS PROGRÈS ↔ BANQUE (voie unique, brûlage #3 source 3/3, 2026-10-20)
//
//  Retour Thibaut « toute production passe par la banque » : les FLUX
//  par tour des technologies (canal « Progrès » du récap) vivent dans
//  le REGISTRE (PROGRES_FLUX + génériques prodParTitre du référentiel)
//  et le moteur (fluxProgresJoueur) ne fait que LIRE la banque. Ces
//  tests verrouillent :
//   · le contenu exact du registre (30 règles éditoriales + 3
//     génériques prodParTitre, conditions techNom/tech dans les
//     règles, montants = données) ;
//   · la résolution nom → clés (clesTechsParNom : homonymes
//     « Parcs naturels » des deux arbres Tourisme) ;
//   · les valeurs produites (capitale, par ville, côtier, par rang
//     d'habitation, par aménagement, par bâtiment de famille,
//     condition suzeraine, par titulaire vivant) ;
//   · ce qui reste HORS banque, en conscience : one-shots au
//     déblocage, réductions de coût, garnisons (valeurs d'état).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { Character } from '../engine/types'
import { fluxProgresJoueur, aTech, gainDeblocageProgres } from '../engine/progresAuto'
import { cfgOf } from '../engine/gameData'
import { reglesProgres, clesTechsParNom, registreComplet } from './registry'
import { partieMock } from './mocks'

/** Débloque la tech portant ce nom (clés réelles via le registre). */
function debloquer(nom: string): string[] {
  const cles = clesTechsParNom(undefined, nom)
  assert.ok(cles.length > 0, `tech absente du référentiel : ${nom}`)
  return cles
}

/** Personnage de test (tous les champs obligatoires). */
function perso(id: string, titre: string, statut: Character['statut'] = 'Sain'): Character {
  return {
    id,
    nom: 'Test',
    prenom: `Pers-${id}`,
    dynastie: 'Test',
    sexe: 'M',
    age: 40,
    culture: 'Déisme',
    ville: 'Bergen',
    orientation: 'Hétérosexuel',
    traits: ['Doux', 'Sérieux', 'Prudent'],
    statut,
    mariage: null,
    mariageId: null,
    mere: null,
    mereId: null,
    pere: null,
    pereId: null,
    pereBio: null,
    pereBioId: null,
    enfantBatard: false,
    titre,
    ministere: null,
    education: null,
    fecondite: 1,
    ageMax: 80,
    armee: null,
  }
}

// ── registre : contenu exact des règles de progrès ─────────────────────────

test('registre progrès : 30 règles éditoriales + 3 génériques prodParTitre', () => {
  const regles = reglesProgres(undefined)
  assert.equal(regles.length, 33, '30 règles de PROGRES_FLUX + 3 prodParTitre du référentiel')
  for (const r of regles) assert.equal(r.source, 'tech', `source de ${r.id}`)
  const ids = regles.map((r) => r.id)
  assert.equal(new Set(ids).size, ids.length, 'ids uniques')
  // les règles progrès sont intégrées au registre complet
  const complet = registreComplet(undefined).map((r) => r.id)
  for (const id of ids) assert.ok(complet.includes(id), `id absent du registre complet : ${id}`)
})

test('registre progrès : Surconsommation = 2 effets par RANG, condition techNom', () => {
  const soc = reglesProgres(undefined).find((r) => r.id === 'tech.surconsommation')
  assert.ok(soc, 'règle tech.surconsommation présente')
  assert.equal(soc.conditions?.techNom, 'Surconsommation', 'la tech est désignée par NOM dans la règle')
  assert.deepEqual(soc.effets, [
    { type: 'fluxParRangHabitation', ressource: 'Science', valeur: 1 },
    { type: 'fluxParRangHabitation', ressource: 'Tourisme', valeur: 5 },
  ], 'montants = données (la consommation de Nourriture reste un coût moteur)')
})

test('registre progrès : génériques prodParTitre traduits en fluxParTitre', () => {
  const regles = reglesProgres(undefined)
  const commerce = regles.find((r) => r.nom === 'Commerce lointain')
  assert.ok(commerce, 'règle Commerce lointain présente')
  assert.ok(commerce.conditions?.tech, 'condition = clé réelle <arbre>:<slot>')
  assert.deepEqual(commerce.effets, [
    { type: 'fluxParTitre', ressource: 'Or', valeur: 3, titre: 'Marchand' },
  ], 'montant lu sur le référentiel, interprété par la banque')
  const gorback = regles.find((r) => r.nom === 'Prix Gorback Nobel')
  assert.deepEqual(gorback?.effets, [{ type: 'fluxParTitre', ressource: 'Science', valeur: 6, titre: 'Ministre' }])
  const culte = regles.find((r) => r.nom === 'Culte de la personnalité')
  assert.deepEqual(culte?.effets, [{ type: 'fluxParTitre', ressource: 'Tourisme', valeur: 30, titre: 'Ministre' }])
})

// ── résolution nom → clés (une seule vérité, registre) ─────────────────────

test('clesTechsParNom : clés réelles <arbre>:<slot>, tech absente → []', () => {
  const cles = clesTechsParNom(undefined, 'Parcs naturels')
  assert.equal(cles.length, 1, '« Parcs naturels » existe à UN seul emplacement (l’homonyme 18:b2 a été renommé)')
  assert.ok(/^\d+:b2$/.test(cles[0]), `clé au format <arbre>:<slot> : ${cles[0]}`)
  assert.ok(clesTechsParNom(undefined, 'Surconsommation').length >= 1)
  assert.deepEqual(clesTechsParNom(undefined, 'Tech inexistante'), [])
})

test('aTech délègue au registre : déblocage = condition techNom remplie', () => {
  const ctx = partieMock()
  const { joueur } = ctx
  const C = cfgOf(ctx.state.config)
  assert.equal(aTech(joueur, 'Surconsommation', C), false, 'non débloquée par défaut')
  joueur.progresDebloques = debloquer('Surconsommation')
  assert.equal(aTech(joueur, 'Surconsommation', C), true)
})

// ── production : les flux sont LUS sur la banque ───────────────────────────

test('Stands de goodies : +2 Or +2 Tourisme par Foire', () => {
  const ctx = partieMock()
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  joueur.progresDebloques = debloquer('Stands de goodies')
  ville.amenagements = ['Foire', 'Foire', 'Champ']
  assert.deepEqual(fluxProgresJoueur(state, joueur, cfgOf(state.config)),
    { Or: 4, Tourisme: 4 }, '2 Foires × (+2 Or, +2 Tourisme) — le Champ ne compte pas')
})

test('Surconsommation : +1 Science +5 Tourisme par RANG d’habitation', () => {
  const ctx = partieMock({ villeRang: 'Cité' })
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  joueur.progresDebloques = debloquer('Surconsommation')
  assert.deepEqual(fluxProgresJoueur(state, joueur, cfgOf(state.config)),
    { Science: 2, Tourisme: 10 }, 'Cité = rang 2 → +2 Science +10 Tourisme')
})

test('Cours de pêche : +4 Nourriture par ville à proximité de la Mer', () => {
  const ctx = partieMock()
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  joueur.progresDebloques = debloquer('Cours de pêche')
  ville.proximite = 'Mer'
  assert.deepEqual(fluxProgresJoueur(state, joueur, cfgOf(state.config)), { Nourriture: 4 })
})

test('Assemblées scientifiques : +1 Science par ville (canal par habitation)', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  joueur.progresDebloques = debloquer('Assemblées scientifiques')
  assert.deepEqual(fluxProgresJoueur(state, joueur, cfgOf(state.config)),
    { Science: 1 }, '1 ville × 1 Science')
})

test('Musées : +30 Tourisme SI capitale (canal prodCapitale)', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  joueur.progresDebloques = debloquer('Musées')
  assert.deepEqual(fluxProgresJoueur(state, joueur, cfgOf(state.config)),
    { Tourisme: 30 }, 'Bergen = capitale unique du mock')
})

test('Garde suzeraine : RIEN sans cité suzeraine, +12 Nourriture avec', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  joueur.progresDebloques = debloquer('Garde suzeraine')
  assert.deepEqual(fluxProgresJoueur(state, joueur, cfgOf(state.config)),
    {}, 'capitale présente mais AUCUNE cité suzeraine : condition dans la règle')
  state.citesLibres = [{ nom: 'Cité test', type: 'Ville', suzerain: joueur.n }]
  assert.deepEqual(fluxProgresJoueur(state, joueur, cfgOf(state.config)),
    { Nourriture: 12 }, 'cité suzeraine : production lue sur la banque')
})

test('Exploitation forestière : les Scieries basculent le Bois en Charbon', () => {
  const ctx = partieMock()
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  joueur.progresDebloques = debloquer('Exploitation forestière')
  ville.amenagements = ['Scierie', 'Scierie']
  assert.deepEqual(fluxProgresJoueur(state, joueur, cfgOf(state.config)),
    { Bois: -2, Charbon: 2 }, '−1 Bois +1 Charbon par Scierie (montants négatifs = données)')
})

test('Merveilleux : +1 Science par bâtiment de famille Merveille', () => {
  const ctx = partieMock()
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  const refs = cfgOf(state.config).config.constructions ?? []
  const merveille = refs.find((c) => c.famille === 'Merveille')
  assert.ok(merveille, 'le référentiel a au moins une Merveille')
  joueur.progresDebloques = debloquer('Merveilleux')
  ville.batiments = [merveille.nom, 'Poste de garde']
  assert.deepEqual(fluxProgresJoueur(state, joueur, cfgOf(state.config)),
    { Science: 1 }, 'seule la Merveille compte (filtre famille = donnée de la règle)')
})

test('Commerce lointain : +3 Or par Marchand VIVANT (générique prodParTitre)', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  const regle = reglesProgres(state.config).find((r) => r.nom === 'Commerce lointain')
  assert.ok(regle?.conditions?.tech, 'condition tech = clé réelle')
  joueur.progresDebloques = [regle.conditions.tech]
  state.population[joueur.n] = [
    ...(state.population[joueur.n] ?? []),
    perso('m1', 'Marchand'), perso('m2', 'Marchand'), perso('m3', 'Marchand', 'Décédé'),
  ]
  assert.deepEqual(fluxProgresJoueur(state, joueur, cfgOf(state.config)),
    { Or: 6 }, '2 Marchands vivants × 3 Or — le défunt ne produit rien')
})

test('sans tech débloquée : fluxProgresJoueur vide (aucune production hors banque)', () => {
  const ctx = partieMock()
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  ville.amenagements = ['Foire', 'Champ', 'Scierie']
  assert.deepEqual(fluxProgresJoueur(state, joueur, cfgOf(state.config)), {},
    'une tech non débloquée ne produit RIEN — conditions évaluées par la banque')
})

// ── ce qui reste HORS banque, en conscience ────────────────────────────────

test('one-shot au déblocage : gainDeblocageProgres reste INSTANTANÉ (hors banque)', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  const avant = joueur.resources['Science'].stock
  const log = gainDeblocageProgres(state, joueur, 'Progrès technologiques I')
  assert.equal(log, '+6 Science', 'crédit immédiat, pas un flux de banque')
  assert.equal(joueur.resources['Science'].stock, avant + 6)
  // ce one-shot n'apparaît PAS comme règle de flux du registre
  assert.ok(!reglesProgres(state.config).some((r) => r.nom === 'Progrès technologiques I'),
    'un one-shot n’est pas une production par tour : pas de règle')
})

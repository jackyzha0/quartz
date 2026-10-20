// ═══════════════════════════════════════════════════════════════════════════
//  TESTS RÉGIMES & CULTURES ↔ BANQUE (voie unique, brûlage #3 source
//  2/3, 2026-10-20)
//
//  Retour Thibaut « toute production passe par la banque » : les lois
//  chiffrées des régimes (Socialisme) et les règles de pays des
//  cultures (Communautarisme, Lunisme, Zélotisme) vivent dans le
//  REGISTRE (reglesRegimes / reglesCultures) et le moteur ne fait que
//  LIRE la banque. Ces tests verrouillent :
//   · le contenu exact du registre (conditions régime/culture et
//     saison DANS les règles, montants = données) ;
//   · ce qui reste HORS banque : garnison Autoritarisme (valeur
//     d'état), Déisme (instantané de construction) ;
//   · les valeurs produites (été, cumul par aménagement, villes de la
//     culture dans le MONDE, tous joueurs confondus) ;
//   · le crédit réel des stocks (chemin moteur complet) et le détail
//     lu sur la banque (page « Pays » — ordre N/T/O conservé).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { Player } from '../engine/types'
import {
  effetsRegime, effetsCulturePays, detailCulturePays,
  appliquerEffetsRegimesCultures, nbVillesCultureMonde,
} from '../engine/regimes'
import { cfgOf } from '../engine/gameData'
import { reglesRegimes, reglesCultures, registreComplet } from './registry'
import { partieMock } from './mocks'

// ── registre : contenu exact des règles régimes ────────────────────────────

test('registre régimes : 1 règle regime.socialisme, conditions dans la règle', () => {
  const regles = reglesRegimes()
  assert.equal(regles.length, 1, 'seul le Socialisme a une loi de production chiffrée')
  const soc = regles.find((r) => r.id === 'regime.socialisme')
  assert.ok(soc, 'règle regime.socialisme présente')
  assert.equal(soc.nom, 'Socialisme')
  assert.equal(soc.source, 'regime')
  assert.equal(soc.conditions?.regime, 'Socialisme', 'condition de régime dans la RÈGLE')
  assert.equal(soc.conditions?.saison, 'Été', 'l’été est une CONDITION de la règle, plus un if moteur')
  assert.deepEqual(soc.effets, [
    { type: 'fluxParAmenagement', ressource: 'Nourriture', valeur: 5, noms: ['Champ', 'Rizière'] },
  ], 'montant nourrEteChampRiziere du référentiel, devenu DONNÉE')
  // Autoritarisme : garnisonParRang = valeur d'état → PAS de règle.
  assert.ok(!regles.some((r) => r.nom === 'Autoritarisme'), 'Autoritarisme reste hors banque (garnison)')
})

// ── registre : contenu exact des règles cultures ───────────────────────────

test('registre cultures : 3 règles exactes, Déisme absent (instantané)', () => {
  const regles = reglesCultures()
  assert.equal(regles.length, 3, 'seules les cultures à lois chiffrées ont une règle')
  const com = regles.find((r) => r.id === 'culture.communautarisme')
  assert.equal(com?.conditions?.culture, 'Communautarisme', 'condition de culture dans la RÈGLE')
  assert.deepEqual(com?.effets, [{ type: 'fluxParVilleCultureMonde', ressource: 'Nourriture', valeur: 3 }])
  const lun = regles.find((r) => r.id === 'culture.lunisme')
  assert.deepEqual(lun?.effets, [{ type: 'fluxParVilleCultureMonde', ressource: 'Tourisme', valeur: 4 }])
  const zel = regles.find((r) => r.id === 'culture.zelotisme')
  assert.deepEqual(zel?.effets, [{ type: 'fluxParVilleCultureMonde', ressource: 'Or', valeur: 2 }])
  assert.ok(!regles.some((r) => r.nom === 'Déisme'), 'Déisme : scienceParConstruction = instantané de construction')
})

test('registreComplet : ids uniques, les 4 nouvelles règles intégrées', () => {
  const ids = registreComplet().map((r) => r.id)
  assert.equal(new Set(ids).size, ids.length, 'ids uniques')
  for (const id of ['regime.socialisme', 'culture.communautarisme', 'culture.lunisme', 'culture.zelotisme']) {
    assert.ok(ids.includes(id), 'id manquant dans le registre complet : ' + id)
  }
})

// ── production : la loi du régime lue sur la banque ────────────────────────

test('Socialisme : +5 Nourriture × 3 Champ/Rizière en été, RIEN en hiver', () => {
  const ctx = partieMock({ saison: 'Été' })
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  const C = cfgOf(state.config)
  joueur.regime = 'Socialisme'
  ville.amenagements = ['Champ', 'Champ', 'Rizière']
  assert.equal(effetsRegime(state, joueur, 'Été', C)['Nourriture'], 15, '5 × 3 aménagements')
  assert.deepEqual(effetsRegime(state, joueur, 'Hiver', C), {}, 'hiver : condition de saison non remplie')
})

test('autre régime que Socialisme : la règle ne s’applique pas (condition regime)', () => {
  const ctx = partieMock({ saison: 'Été' })
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  joueur.regime = 'Monarchie'
  ville.amenagements = ['Champ']
  assert.deepEqual(effetsRegime(state, joueur, 'Été', cfgOf(state.config)), {})
})

// ── production : la règle de pays lue sur la banque ────────────────────────

test('Lunisme : +4 Tourisme par ville lunisme du MONDE (ville d’un autre joueur incluse)', () => {
  const ctx = partieMock()
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  const C = cfgOf(state.config)
  joueur.culture = 'Lunisme'
  ville.culture = 'Lunisme'
  assert.equal(nbVillesCultureMonde(state, 'Lunisme'), 1)
  assert.equal(effetsCulturePays(state, joueur, C)['Tourisme'], 4)
  // une ville de la culture chez un AUTRE joueur compte aussi (règle « monde »)
  state.players.push({ ...joueur, n: 2, nom: 'Autre', villes: [{ ...ville, nom: 'Oslo' }] } as Player)
  assert.equal(nbVillesCultureMonde(state, 'Lunisme'), 2)
  assert.equal(effetsCulturePays(state, joueur, C)['Tourisme'], 8, '4 × 2 villes')
})

test('joueur sans ville : effetsCulturePays vide (garde conservée)', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  joueur.culture = 'Lunisme'
  joueur.villes = []
  assert.deepEqual(effetsCulturePays(state, joueur, cfgOf(state.config)), {})
})

test('Déisme : aucun flux de règle de pays (science = instantané de construction)', () => {
  const ctx = partieMock()
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  const C = cfgOf(state.config)
  joueur.culture = 'Déisme'
  ville.culture = 'Déisme'
  assert.deepEqual(effetsCulturePays(state, joueur, C), {})
  assert.deepEqual(detailCulturePays(state, joueur, C), [])
})

// ── chemin moteur complet : stocks réellement crédités ─────────────────────

test('appliquerEffetsRegimesCultures : Socialisme + Lunisme crédités au stock', () => {
  const ctx = partieMock({ saison: 'Été' })
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  joueur.regime = 'Socialisme'
  joueur.culture = 'Lunisme'
  ville.culture = 'Lunisme'
  ville.amenagements = ['Champ']
  const nAvant = joueur.resources['Nourriture'].stock
  const tAvant = joueur.resources['Tourisme'].stock
  const out = appliquerEffetsRegimesCultures(state, joueur, 'Été', cfgOf(state.config))
  assert.equal(out['Nourriture'], 5, 'loi du régime via la banque')
  assert.equal(out['Tourisme'], 4, 'règle de pays via la banque')
  assert.equal(joueur.resources['Nourriture'].stock, nAvant + 5, 'stock Nourriture crédité')
  assert.equal(joueur.resources['Tourisme'].stock, tAvant + 4, 'stock Tourisme crédité')
})

// ── détail de la page « Pays » : montants lus sur la banque ────────────────

test('detailCulturePays : Lunisme parVille 4 / Zélotisme Or parVille 2 (lu sur la banque)', () => {
  const ctx = partieMock()
  const { state, joueur, ville } = ctx
  assert.ok(ville, 'le mock fournit toujours une ville (rétrécissement pour tsc strict)')
  const C = cfgOf(state.config)
  joueur.culture = 'Lunisme'
  ville.culture = 'Lunisme'
  const d = detailCulturePays(state, joueur, C)
  assert.equal(d.length, 1)
  assert.deepEqual(d[0], { res: 'Tourisme', parVille: 4, nbVillesMonde: 1, nbVillesPerso: 1, total: 4 })
  joueur.culture = 'Zélotisme'
  ville.culture = 'Zélotisme'
  const z = detailCulturePays(state, joueur, C)
  assert.equal(z.length, 1)
  assert.equal(z[0].res, 'Or', 'ordre Nourriture/Tourisme/Or conservé par la règle')
  assert.equal(z[0].parVille, 2)
  assert.equal(z[0].total, 2)
})

// ═══════════════════════════════════════════════════════════════════════════
//  TESTS MINISTÈRES ↔ BANQUE (voie unique, 2026-10-19)
//
//  Retour Thibaut « toute production passe par la banque » (brûlage
//  #3, source 1/3 : ministres) : les montants des portefeuilles
//  automatiques vivent dans le REGISTRE (MINISTERES_AUTO) et le
//  moteur ne fait que LIRE la banque. Ces tests verrouillent :
//   · le cumul (valeur × nombre de porteurs vivants) ;
//   · les déclencheurs ('tour' vs 'finSaison') et la condition de
//     saison du Sénéchal (évaluée par la BANQUE, pas au site) ;
//   · le crédit réel des stocks (chemin moteur complet) ;
//   · la cohérence du registre (règle = effet fluxJoueurParMinistre).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { Character } from '../engine/types'
import {
  appliquerEffetsMinisteres, effetsFinSaisonMinisteres, fluxFinSaisonMinisteres,
} from '../engine/ministeres'
import { reglesMinistres } from './registry'
import { partieMock } from './mocks'

/** Personnage ministre de test (tous les champs obligatoires). */
function ministre(
  id: string, portefeuille: string, statut: Character['statut'] = 'Sain',
): Character {
  return {
    id,
    nom: 'Test',
    prenom: `Min-${id}`,
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
    metier: 'Ministre',
    ministere: portefeuille,
    education: null,
    fecondite: 1,
    armee: null,
  }
}

function ajouter(ctx: ReturnType<typeof partieMock>, ...chars: Character[]): void {
  const { state, joueur } = ctx
  state.population[joueur.n] = [...(state.population[joueur.n] ?? []), ...chars]
}

// ── registre : cohérence des règles ministres ──────────────────────────────

test('registre ministres : 6 règles, toutes fluxJoueurParMinistre, ids uniques', () => {
  const regles = reglesMinistres()
  assert.equal(regles.length, 6, 'Trésorier, Grand Précepteur, Grand prévôt, Sénéchal, Maître de cour, Légat')
  const ids = new Set<string>()
  for (const r of regles) {
    assert.ok(!ids.has(r.id), `id dupliqué : ${r.id}`)
    ids.add(r.id)
    assert.equal(r.source, 'ministre')
    for (const e of r.effets) {
      assert.equal(e.type, 'fluxJoueurParMinistre',
        `la règle ${r.id} doit produire via fluxJoueurParMinistre (voie unique)`)
    }
  }
  // déclencheurs : 3 'tour' (défaut) + 3 'finSaison'
  const fin = regles.filter((r) => r.declencheur === 'finSaison')
  assert.equal(fin.length, 3, 'Sénéchal, Maître de cour, Légat = fin de saison')
  // la condition de saison du Sénéchal vit dans la règle, pas au site
  const senechal = regles.find((r) => r.nom === 'Sénéchal')
  assert.equal(senechal?.conditions?.saison, 'Été', 'Sénéchal : condition été dans la RÈGLE')
})

// ── déclencheur 'tour' : cumul par porteurs vivants ────────────────────────

test('deux Trésoriers vivants = +10 Or cumulés (canal Ministères)', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  ajouter(ctx, ministre('t1', 'Trésorier'), ministre('t2', 'Trésorier'))
  const avant = joueur.resources['Or'].stock
  const out = appliquerEffetsMinisteres(state)
  assert.equal(out[joueur.n]?.['Or'], 10, '5 Or × 2 porteurs (cumulables)')
  assert.equal(joueur.resources['Or'].stock, avant + 10, 'stock réellement crédité')
})

test('un ministre DÉCÉDÉ ne produit rien', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  ajouter(ctx, ministre('t1', 'Trésorier', 'Décédé'))
  const avant = joueur.resources['Or'].stock
  const out = appliquerEffetsMinisteres(state)
  assert.equal(out[joueur.n], undefined, 'aucun gain pour un ministre décédé')
  assert.equal(joueur.resources['Or'].stock, avant)
})

// ── déclencheur 'finSaison' : crédit + format des logs ─────────────────────

test('Sénéchal : +15 Nourriture fin d’Été, RIEN fin d’Hiver (condition dans la règle)', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  ajouter(ctx, ministre('s1', 'Sénéchal'))
  const avant = joueur.resources['Nourriture'].stock
  effetsFinSaisonMinisteres(state, 'Été')
  assert.equal(joueur.resources['Nourriture'].stock, avant + 15, 'crédité fin d’été')
  const logEté = state.log.filter((l) => l.type === 'Système' && l.texte.includes('Ministères'))
  assert.ok(logEté.some((l) => l.texte.includes('+15 Nourriture (1 Sénéchal')),
    `format du log conservé : ${logEté[logEté.length - 1]?.texte}`)
  const apresEté = joueur.resources['Nourriture'].stock
  effetsFinSaisonMinisteres(state, 'Hiver')
  assert.equal(joueur.resources['Nourriture'].stock, apresEté, 'rien fin d’hiver (saisons ≠ été)')
})

test('Maître de cour +2 et Légat +20 Tourisme à CHAQUE fin de saison', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  ajouter(ctx, ministre('c1', 'Maître de cour'), ministre('l1', 'Légat du pontificat'))
  const avant = joueur.resources['Tourisme'].stock
  effetsFinSaisonMinisteres(state, 'Été')
  assert.equal(joueur.resources['Tourisme'].stock, avant + 22, '2 + 20 fin d’été')
  effetsFinSaisonMinisteres(state, 'Hiver')
  assert.equal(joueur.resources['Tourisme'].stock, avant + 44, '2 + 20 fin d’hiver aussi')
  // format exact des logs (une part par portefeuille, pluriels ok)
  const logs = state.log.filter((l) => l.type === 'Système' && l.texte.includes('Ministères'))
  assert.ok(logs.some((l) => l.texte.includes('+2 Tourisme (1 Maître de cour') &&
    l.texte.includes('+20 Tourisme (1 Légat du pontificat')),
    `parts par portefeuille : ${logs[logs.length - 1]?.texte}`)
})

test('deux Maîtres de cour : cumul + pluriel dans le log', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  ajouter(ctx, ministre('c1', 'Maître de cour'), ministre('c2', 'Maître de cour'))
  const avant = joueur.resources['Tourisme'].stock
  effetsFinSaisonMinisteres(state, 'Été')
  assert.equal(joueur.resources['Tourisme'].stock, avant + 4, '2 × 2 porteurs')
  assert.ok(state.log.some((l) => l.type === 'Système' &&
    l.texte.includes('+4 Tourisme (2 Maîtres de cour')),
    'pluriel « Maîtres de cour »')
})

// ── flux équivalent par tour (tourismeCourant) ─────────────────────────────

test('fluxFinSaisonMinisteres : production par tour équivalente (22 Tourisme)', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  ajouter(ctx, ministre('c1', 'Maître de cour'), ministre('l1', 'Légat du pontificat'))
  assert.equal(fluxFinSaisonMinisteres(state, joueur)['Tourisme'], 22,
    'canal « Ministères » de tourismeCourant, lu sur la banque')
})

test('le Chancelier des émissaires reste un INSTANTANÉ hors banque (+1 réserve)', () => {
  const ctx = partieMock()
  const { state, joueur } = ctx
  ajouter(ctx, ministre('e1', 'Chancelier des émissaires'))
  // pas un flux : rien dans la contribution de production…
  assert.equal(fluxFinSaisonMinisteres(state, joueur)['Émissaires'], undefined)
  // …mais crédité à la fin de saison, au site (réserve d’émissaires)
  const avant = joueur.emissaires ?? 0
  effetsFinSaisonMinisteres(state, 'Été')
  assert.equal(joueur.emissaires, avant + 1, '+1 émissaire en réserve (instantané)')
})

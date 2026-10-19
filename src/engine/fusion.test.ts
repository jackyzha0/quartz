// ═══════════════════════════════════════════════════════════════════════════
//  TESTS DE LA FUSION MULTIJOUER (node:test — `npm test`)
//
//  Chaque test rejoue un BUG RÉEL corrigé en production (2026-10-17) :
//  les régressions ici = pertes de données en partie. Le module est
//  PUR : ces tests ne touchent ni Supabase ni le réseau.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fusionnerSections, rejouerEvenementsPartages, type SectionJoueurFusion } from './fusion'
import type { GameState, RouteCommerce } from './types'
import { createGame } from './setup'
import type { SetupLine } from './setup'

const SETUP: SetupLine[] = [
  { nom: 'J1', peuple: 'NORLS', culture: 'Culture Nordique', regime: 'Autoritarisme', taillePopulation: 20, pourcentageMariages: 40, villes: ['A'] },
  { nom: 'J2', peuple: 'PEAUX VERTES', culture: 'Culture Barbares', regime: 'Autoritarisme', taillePopulation: 20, pourcentageMariages: 40, villes: ['B'] },
]

function base(): GameState {
  return createGame(SETUP, 42, 'local')
}

function route(id: string, joueur: number, cible = 'B'): RouteCommerce {
  return { id, joueur, marchandId: 'm-' + id, joueurCible: 2, villeCible: cible, amenagement: 'Champ' }
}

test('ne mute pas la référence (immutabilité du contrat)', () => {
  const ref = base()
  const avant = JSON.stringify(ref)
  const sections: Record<string, SectionJoueurFusion> = {
    '1': { player: ref.players[0], population: [], routes: [], citesLibres: [], log: [], tour: ref.turn },
  }
  fusionnerSections(ref, sections)
  assert.equal(JSON.stringify(ref), avant, 'la référence doit rester intacte')
})

test('BUG 2026-10-17 : les routes du joueur 2 ne sont pas écrasées par la section du joueur 1', () => {
  const ref = base()
  ref.routesCommerce = [route('r2', 2), route('r1', 1)]
  const sections: Record<string, SectionJoueurFusion> = {
    // la section de J1 n'embarque que SES routes (correct) mais on
    //  simule une section POLLUÉE (ancien bug) : elle contient tout.
    '1': { player: ref.players[0], routes: [route('r1', 1), route('r2-clone', 1)], log: [], tour: ref.turn },
    '2': { player: ref.players[1], routes: [route('r2', 2)], log: [], tour: ref.turn },
  }
  const out = fusionnerSections(ref, sections)
  // r2 (propriété de J2) doit survivre ; les routes de J1 = sa section
  const ids = (out.routesCommerce ?? []).map((r) => r.id)
  assert.ok(ids.includes('r2'), 'la route de J2 doit être préservée')
  assert.ok(ids.includes('r1'), 'la route de J1 doit être prise dans sa section')
  assert.ok(ids.includes('r2-clone'), 'une route poussée par J1 (si section polluée) reste la sienne')
})

test('BUG duplication : déduplication par id — jamais deux fois la même route', () => {
  const ref = base()
  ref.routesCommerce = [route('r1', 1)]
  const sections: Record<string, SectionJoueurFusion> = {
    '1': { player: ref.players[0], routes: [route('r1', 1)], log: [], tour: ref.turn },
    '2': { player: ref.players[1], routes: [route('r1', 1)], log: [], tour: ref.turn }, // polluée : même id
  }
  const out = fusionnerSections(ref, sections)
  const nb = (out.routesCommerce ?? []).filter((r) => r.id === 'r1').length
  assert.equal(nb, 1, 'une route ne doit exister qu’une fois (déduplication par id)')
})

test('BUG 2026-10-17 : cités libres — seule une cité MODIFIÉE est remplacée', () => {
  const ref = base()
  ref.citesLibres = [
    { nom: 'CitéA', type: 'Industrielles - Ville', taxes: 'Basse' } as never,
    { nom: 'CitéB', type: 'Maritime - Ville', taxes: 'Basse' } as never,
  ]
  // La section de J1 embarque les cités du monde NON modifiées (pollution)
  //  + une modification de CitéA.
  const citesSection = JSON.parse(JSON.stringify(ref.citesLibres))
  citesSection[0].taxes = 'Haute'
  const sections: Record<string, SectionJoueurFusion> = {
    '1': { player: ref.players[0], citesLibres: citesSection, log: [], tour: ref.turn },
  }
  const out = fusionnerSections(ref, sections)
  const a = (out.citesLibres ?? []).find((c) => c.nom === 'CitéA')
  const b = (out.citesLibres ?? []).find((c) => c.nom === 'CitéB')
  assert.ok(a, 'CitéA présente')
  assert.equal(a.taxes, 'Haute', 'la cité modifiée prend la version de la section')
  assert.ok(b, 'CitéB préservée (non modifiée → version de la référence)')
})

test('cité CRÉÉE pendant le tour est ajoutée', () => {
  const ref = base()
  ref.citesLibres = []
  const sections: Record<string, SectionJoueurFusion> = {
    '1': { player: ref.players[0], citesLibres: [{ nom: 'NouvelleCité', type: 'Militaires - Château' }], log: [], tour: ref.turn },
  }
  const out = fusionnerSections(ref, sections)
  assert.equal((out.citesLibres ?? []).length, 1)
  assert.equal((out.citesLibres ?? [])[0].nom, 'NouvelleCité')
})

test('population et player de chaque section remplacés par joueur', () => {
  const ref = base()
  const sec1pop = [{ id: 'x1' }]
  const sections: Record<string, SectionJoueurFusion> = {
    '1': { player: ref.players[0], population: sec1pop, log: [], tour: ref.turn },
  }
  const out = fusionnerSections(ref, sections)
  assert.deepEqual(out.population[1], sec1pop as never)
})

test('journal : les logs des sections sont fusionnés, la référence conservée', () => {
  const ref = base()
  ref.log = [{ turn: ref.turn, type: 'Système', joueur: null, texte: 'référence' }]
  const sections: Record<string, SectionJoueurFusion> = {
    '1': { player: ref.players[0], log: [{ turn: ref.turn, type: 'Armée', joueur: 1, texte: 'J1' }], tour: ref.turn },
    '2': { player: ref.players[1], log: [{ turn: ref.turn, type: 'Armée', joueur: 2, texte: 'J2' }], tour: ref.turn },
  }
  const out = fusionnerSections(ref, sections)
  const textes = out.log.map((l) => l.texte)
  assert.ok(textes.includes('référence'))
  assert.ok(textes.includes('J1'))
  assert.ok(textes.includes('J2'))
})

test('BUG 2026-10-17 : transfert de ville (événement partagé) rejoué après fusion', () => {
  const ref = base()
  const out = fusionnerSections(ref, {})
  const villeB = out.players[1].villes[0]
  assert.ok(villeB, 'la ville de J2 existe avant transfert')
  rejouerEvenementsPartages(out, [
    { joueur: 1, type: 'transfert_ville', payload: { ville: villeB.nom, src: 2, dst: 1 } },
  ])
  assert.equal(out.players[1].villes.length, 0, 'la ville a quitté J2')
  assert.equal(out.players[0].villes.filter((v) => v.nom === villeB.nom).length, 1, 'la ville est chez J1')
})

test('événements de type inconnu ignorés silencieusement (forward compat)', () => {
  const ref = base()
  const out = fusionnerSections(ref, {})
  const avant = JSON.stringify(out)
  rejouerEvenementsPartages(out, [{ joueur: 1, type: 'type_du_futur', payload: {} }])
  assert.equal(JSON.stringify(out), avant)
})

test('CONFIG MONDIALE : injection à la résolution — le tour est calculé avec la config publiée', async () => {
  const { appliquerConfigMondiale } = await import('./fusion')
  const ref = base()
  const out = fusionnerSections(ref, {})
  // config périmée embarquée dans l'état du salon
  assert.ok(out.config, 'l état de référence embarque une config')
  // la config mondiale publiée par le créateur remplace l embarquée
  const cfgMondiale = JSON.parse(JSON.stringify(out.config))
  cfgMondiale.params = { ...(cfgMondiale.params ?? {}), armeePrixOr: 99 }
  appliquerConfigMondiale(out, cfgMondiale)
  assert.equal((out.config.params as unknown as Record<string, unknown>).armeePrixOr, 99,
    'la config mondiale doit remplacer l embarquée avant runTurn')
  // null = pas de config mondiale publiée → l embarquée est conservée
  const out2 = fusionnerSections(ref, {})
  const avant = out2.config
  appliquerConfigMondiale(out2, null)
  assert.equal(out2.config, avant, 'sans config mondiale, l embarquée fait foi')
})

// ═════════════════════════════════════════════════════════════════════
//  R4 (arbitrage Thibaut 2026-10-19 : rejet + journal visible) — les
//  sections viennent du réseau (cp_events, JSON non contrôlé) : une
//  section malformée ne doit JAMAIS atteindre Object.assign / runTurn.
// ═════════════════════════════════════════════════════════════════════

test('R4 : section malformée (population non tableau) rejetée ENTIÈRE + journal visible', () => {
  const ref = base()
  ref.players[0].nom = 'Originel'
  const sections: Record<string, SectionJoueurFusion> = {
    '1': { player: { ...ref.players[0], nom: 'Falsifié' }, population: 'pas un tableau', routes: [], citesLibres: [], log: [], tour: ref.turn },
  }
  const out = fusionnerSections(ref, sections)
  assert.equal(out.players[0].nom, 'Originel', 'RIEN de la section invalide ne doit être appliqué')
  assert.ok(out.log.some((l) => l.type === 'Système' && l.texte.includes('Section invalide ignorée')),
    'le rejet doit être visible dans le journal (arbitrage : journal visible)')
})

test('R4 : tour non numérique → rejet ; clé non numérique → ignorée sans trace', () => {
  const ref = base()
  const sections: Record<string, SectionJoueurFusion> = {
    '1': { player: ref.players[0], routes: [], log: [], tour: 'abc' as unknown as number },
    'xyz': { player: ref.players[1], routes: [], log: [], tour: ref.turn },
  }
  const out = fusionnerSections(ref, sections)
  const rejets = out.log.filter((l) => l.texte.includes('Section invalide ignorée'))
  assert.equal(rejets.length, 1, 'seule la section à tour non numérique est rejetée-annoncée')
  assert.equal(rejets[0].joueur, 1)
  assert.equal(Object.keys(out.population).length, Object.keys(ref.population).length,
    'aucune clé parasite (NaN) ne doit apparaître dans la population')
})

test('R4 : une section conforme passe toujours (non-régression des tests ci-dessus)', () => {
  const ref = base()
  const sections: Record<string, SectionJoueurFusion> = {
    '1': { player: { ...ref.players[0], nom: 'Fusionné' }, population: [], routes: [], citesLibres: [], log: [], tour: ref.turn },
  }
  const out = fusionnerSections(ref, sections)
  assert.equal(out.players[0].nom, 'Fusionné', 'une section valide fusionne comme avant')
  assert.ok(!out.log.some((l) => l.texte.includes('Section invalide ignorée')), 'aucun faux rejet')
})

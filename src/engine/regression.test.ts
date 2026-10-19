// ═══════════════════════════════════════════════════════════════════════════
//  TESTS DE RÉGRESSION MOTEUR — runTurn sur vraie partie (étape 1, 2026-10-18)
//
//  Objectif : verrouiller le moteur ENTIERS contre les crashes et les
//  incohérences de données. Les bugs historiques visés (« écran blanc »,
//  « is not iterable », NaN dans les stocks — urgences du 2026-10-15)
//  venaient d'un tour complet qui détruisait l'état.
//
//  Méthode : vraie partie à 8 joueurs (createGame, graine fixe →
//  déterministe), 20 runTurn consécutifs, INVARIANTS vérifiés à chaque
//  tour. Un futur refact (banque d'effets, découpage moteur…) qui casse
//  un seul invariant est refusé par la CI avant tout déploiement.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runTurn, normaliserEtat } from './engine'
import { createGame, type SetupLine } from './setup'
import type { GameState, Player, Character } from './types'

const PEUPLES = ['Basiléens', 'PEAUX VERTES', "ELFES D'OR", 'Sylvains', 'NORLS', 'VERMINES DE KAOSS']
const CULTURES = ['Communautarisme', 'Déisme', 'Lunisme', 'Naturalisme', 'Sethisme', 'Zélotisme']
const REGIMES = ['Autoritarisme', 'Socialisme', 'Démocratie', 'Monarchie']

/** Partie complète à 8 joueurs — la vraie fonction de création, la
 *  vraie config par défaut, graine fixe (déterminisme : le même test
 *  échoue toujours au même endroit si quelque chose casse). */
function partieHuitJoueurs(): GameState {
  const setups: SetupLine[] = Array.from({ length: 8 }, (_, i) => ({
    nom: `Joueur ${i + 1}`,
    peuple: PEUPLES[i % PEUPLES.length],
    culture: CULTURES[i % CULTURES.length],
    regime: REGIMES[i % REGIMES.length],
    taillePopulation: 50,
    pourcentageMariages: 40,
    villes: [`Capitale ${i + 1}`],
  }))
  return createGame(setups, 20261018, 'local')
}

/** Un stock de ressource est sain : nombre fini, pas NaN. */
function stocksSains(p: Player): void {
  for (const [nom, rs] of Object.entries(p.resources ?? {})) {
    assert.ok(Number.isFinite(rs.stock), `stock ${nom} de ${p.nom} non fini : ${rs.stock}`)
    assert.ok(Number.isFinite(rs.prod), `prod ${nom} de ${p.nom} non finie : ${rs.prod}`)
  }
}

/** Un personnage est sain : champs attendus présents et cohérents. */
function persoSain(c: Character): void {
  assert.ok(typeof c.id === 'string' && c.id.length > 0, `personnage sans id : ${JSON.stringify(c).slice(0, 80)}`)
  assert.ok(typeof c.prenom === 'string', `personnage sans prénom : ${c.id}`)
  assert.ok(Number.isFinite(c.age), `âge non fini pour ${c.id} : ${c.age}`)
  assert.ok(c.age >= 0, `âge négatif pour ${c.id} : ${c.age}`)
  assert.ok(c.statut === 'Sain' || c.statut === 'Malade' || c.statut === 'Enceinte' || c.statut === 'Décédé', `statut invalide pour ${c.id} : ${c.statut}`)
  assert.ok(Array.isArray(c.traits) && c.traits.length === 3, `traits invalides pour ${c.id}`)
}

test('moteur : 20 tours complets à 8 joueurs sans crash ni incohérence', () => {
  const state = partieHuitJoueurs()
  normaliserEtat(state)
  const seedInitial = state.seed
  const joueurs = state.players.map((p) => p.n)

  for (let tour = 1; tour <= 20; tour++) {
    runTurn(state)

    // Le tour avance EXACTEMENT d'un cran.
    assert.equal(state.turn, tour + 1, `le tour doit avancer (attendu ${tour + 1}, obtenu ${state.turn})`)
    assert.ok(['Été', 'Hiver'].includes(state.saison), `saison invalide : ${state.saison}`)

    // Les joueurs ne disparaissent pas, leurs n° sont stables.
    assert.deepEqual(state.players.map((p) => p.n), joueurs, 'les joueurs ne doivent pas changer')

    // Les villes gardent leurs tableaux (le bug « is not iterable »).
    for (const p of state.players) {
      stocksSains(p)
      for (const v of p.villes) {
        assert.ok(Array.isArray(v.batiments), `batiments non-tableau pour ${v.nom} (${p.nom})`)
        assert.ok(Array.isArray(v.amenagements ?? []), `amenagements non-tableau pour ${v.nom}`)
      }
      assert.ok(Array.isArray(p.armees), `armees non-tableau pour ${p.nom}`)
    }

    // La population par joueur reste un tableau de personnages sains.
    for (const [nStr, pop] of Object.entries(state.population)) {
      assert.ok(Array.isArray(pop), `population non-tableau pour J${nStr}`)
      for (const c of pop as Character[]) persoSain(c)
    }

    // Le journal grossit (sans exploser) et l'historique aussi.
    assert.ok(state.log.length > 0, 'le journal ne doit jamais être vide')
    assert.ok(Array.isArray(state.history), 'history doit être un tableau')

    // ROUTES COMMERCIALES (bugs réels de production : duplication,
    //  écrasement) : unicité des ids, un propriétaire valide.
    const routes = state.routesCommerce ?? []
    const idsRoutes = new Set<string>()
    for (const r of routes) {
      assert.ok(!idsRoutes.has(r.id), `route dupliquée : ${r.id} (bug réel d'octobre)`)
      idsRoutes.add(r.id)
      assert.ok(state.players.some((q) => q.n === r.joueur), `route ${r.id} sans propriétaire valide (J${r.joueur})`)
    }

    // CITÉS LIBRES (bug réel : écrasement par la fusion) : noms uniques,
    //  suzerain et émissaires cohérents, population saine.
    const cites = state.citesLibres ?? []
    const nomsCites = new Set<string>()
    for (const c of cites) {
      assert.ok(!nomsCites.has(c.nom), `cité dupliquée : ${c.nom}`)
      nomsCites.add(c.nom)
      assert.ok(c.suzerain == null || state.players.some((q) => q.n === c.suzerain),
        `cité ${c.nom} avec suzerain invalide (J${c.suzerain})`)
      for (const pers of c.population ?? []) persoSain(pers)
    }
    // createGame crée une cité libre par joueur : elles ne disparaissent pas.
    assert.ok(cites.length >= state.players.length,
      `les cités libres ne doivent pas disparaître (${cites.length} pour ${state.players.length} joueurs)`)

    // La graine ne change jamais (identité de la partie).
    assert.equal(state.seed, seedInitial)
  }

  // Après 20 tours (40 ans de jeu) : la démographie a bougé — la
  //  partie est VIVANTE (pas un moteur qui ne fait rien).
  const popTotale = Object.values(state.population).reduce((s, l) => s + (l?.length ?? 0), 0)
  assert.ok(popTotale > 100, `population totale attendue (>100), obtenu ${popTotale}`)
})

test('moteur : déterminisme — même graine, même partie (2 tours comparés au bit près)', () => {
  const a = partieHuitJoueurs()
  const b = partieHuitJoueurs()
  normaliserEtat(a)
  normaliserEtat(b)
  runTurn(a)
  runTurn(b)
  // Le rngState diverge s'il n'est pas correctement persisté/sérialisé :
  //  comparer l'état SANS config (les configs sont identiques par
  //  construction) garantit le déterminisme du moteur.
  const { config: _ca, ...aSansConfig } = a
  const { config: _cb, ...bSansConfig } = b
  assert.equal(JSON.stringify(aSansConfig), JSON.stringify(bSansConfig),
    'deux parties de même graine doivent être identiques après un tour')
})

test('moteur : un tour de plus après rechargé du JSON (cycle sérialisation)', () => {
  // Les parties sont sérialisées à chaque sauvegarde : un état qui ne
  //  SURVIT PAS au cycle JSON.stringify → parse → runTurn est un bug
  //  de persistance (le vrai chemin : localStorage → load → tour).
  const state = partieHuitJoueurs()
  normaliserEtat(state)
  runTurn(state)
  const roundTrip = JSON.parse(JSON.stringify(state)) as GameState
  normaliserEtat(roundTrip)
  const avant = roundTrip.turn
  runTurn(roundTrip)
  assert.equal(roundTrip.turn, avant + 1, 'un tour doit s\'exécuter après un cycle de sérialisation')
})

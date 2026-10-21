// ═══════════════════════════════════════════════════════════════════════════
//  TESTS COMMERCE — LE TOURISME COPIÉ COMPTE DANS LE STOCK (clôture B4)
//
//  Arbitrage Thibaut 2026-10-19 : le Tourisme EST copiable par un marchand.
//  Le stock de Tourisme n'est jamais cumulé : il est recalculé à chaque fin
//  de tour pour égaler la production (« stock = production »). Le Tourisme
//  copié par une route commerciale est donc une production comme les
//  autres — il doit compter dans le stock, sinon le récap l'affiche (canal
//  Commerce) mais le stock l'ignore : c'était le bug B4 de l'audit.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runTurn, normaliserEtat, creerRouteCommerce } from './engine'
import { ressourcesCopiables, effetsCommerceJoueur } from './commerce'
import { tourismeCourant } from './regimes'
import { cfgOf } from './gameData'
import { createGame, type SetupLine } from './setup'
import type { GameState } from './types'

/** Partie minimale à 2 joueurs — copieur (Communautarisme : aucune loi
//  de Tourisme) et cible porteuse d'un Hôtel de tourisme (construction
//  productrice de Tourisme — vague 3a : la Foire ne produit plus rien,
//  elle donne des emplacements d'Artiste/Commerçant), graine fixe →
//  déterminisme. */
function partieDeuxJoueurs(): GameState {
  const setups: SetupLine[] = [
    { nom: 'Copieur', peuple: 'Basiléens', culture: 'Communautarisme', regime: 'Monarchie',
      taillePopulation: 50, pourcentageMariages: 40, villes: ['Capitale A'] },
    { nom: 'Cible', peuple: 'Sylvains', culture: 'Déisme', regime: 'Démocratie',
      taillePopulation: 50, pourcentageMariages: 40, villes: ['Capitale B'] },
  ]
  return createGame(setups, 20261019, 'local')
}

test('commerce : le Tourisme copié par une route compte dans la production et le stock (B4, arbitrage 2026-10-19)', () => {
  const state = partieDeuxJoueurs()
  normaliserEtat(state)
  const copieur = state.players[0]
  const cible = state.players[1]
  const C = cfgOf(state.config)

  // La ville cible possède un Hôtel de tourisme : Tourisme copiable.
  const villeCible = cible.villes[0]
  villeCible.amenagements = [...(villeCible.amenagements ?? []), 'Hôtel de tourisme']
  const copiables = ressourcesCopiables('Hôtel de tourisme', C.config)
  assert.ok(copiables.some((c) => c.ressource === 'Tourisme' && c.valeur > 0),
    `l'Hôtel de tourisme doit avoir un Tourisme copiable (obtenu : ${JSON.stringify(copiables)})`)

  // Le copieur ouvre une route vers l'Hôtel de tourisme (un roturier est promu
  //  marchand automatiquement — revue 2026-10-16).
  const err = creerRouteCommerce(state, copieur.n, '', cible.n, villeCible.nom, 'Hôtel de tourisme')
  assert.equal(err, null, `la route doit s'ouvrir (obtenu : ${err})`)

  // Le canal Commerce du copieur apporte bien du Tourisme.
  const copieAvant = effetsCommerceJoueur(state, copieur, state.saison, C)['Tourisme'] ?? 0
  assert.ok(copieAvant > 0, `le commerce doit apporter du Tourisme (obtenu : ${copieAvant})`)

  // Après un tour complet : la route vit toujours, la production de
  //  Tourisme COMPTE la copie (bug B4 corrigé) et le stock égale la
  //  production (invariant « stock = production »).
  runTurn(state)
  const copieApres = effetsCommerceJoueur(state, copieur, state.saison, C)['Tourisme'] ?? 0
  assert.ok(copieApres > 0, `la route doit toujours apporter du Tourisme après le tour (obtenu : ${copieApres})`)
  assert.ok(tourismeCourant(state, copieur, C) >= copieApres,
    `la production de Tourisme doit inclure le Tourisme copié (${tourismeCourant(state, copieur, C)} < ${copieApres})`)
  assert.equal(copieur.resources['Tourisme']?.stock, Math.max(0, tourismeCourant(state, copieur, C)),
    'le stock de Tourisme doit égaler la production courante (copie commerce comprise)')
})

// ═══════════════════════════════════════════════════════════════════════
//  MERVEILLES — effets spéciaux automatiques (retour Thibaut 2026-10-15)
//  Une Merveille est un bâtiment de famille « Merveille » : rang
//  d'habitation minimum requis + une seule par ville (limites
//  appliquées dans construire, PlayerView).
//  Ce module centralise :
//    · effetImmédiatMerveille : one-shot à la construction
//      (Antichambre +50 % Or, Jardins +40 Habitants, Palais :
//      conversion de 5 habitants par habitation, Tour de Crystal
//      rien à la construction) ;
//    · réductionLevéeArmée : −20 Or par « Temple de Bahamutt » ou
//      « Ordre des chevaliers d'Orcre » possédé (cumulables) ;
//    · bonusScienceCapitale : Laboratoire de Falheim — double le
//      flux de Science des bâtiments de la capitale (appliqué au
//      canal Bâtiments du fin de tour) ;
//    · bonusProgrèsAléatoire : Tour de Crystal — +3 d'une
//      ressource de base aléatoire à chaque technologie découverte.
// ═════════════════════════════════════════════════════════════════════

import type { GameState, Player } from './types'
import type { Rng as RngType } from './rng'
import { cfgOf, type Cfg } from './gameData'
import { nbBatiments } from './factions'

/** Effet ONE-SHOT d'une merveille à sa construction (crédité et
 *  journalisé automatiquement). Retourne un texte de log additionnel
 *  (vide = aucun effet immédiat). */
export function effetImmediatMerveille(
  state: GameState,
  p: Player,
  nom: string,
): string {
  const C = cfgOf(state.config)
  switch (nom) {
    case "Antichambre d'Alexandrie": {
      // +50 % de la réserve d'Or actuelle
      const rs = p.resources['Or']
      if (rs) {
        const gain = Math.floor(rs.stock * 0.5)
        if (gain > 0) {
          rs.stock += gain
          return ` — Antichambre d'Alexandrie : +${gain} Or (réserve augmentée de 50 %).`
        }
      }
      return ''
    }
    case "Jardins d'Alexandrie": {
      // +40 Habitants à la ville qui la construit (crédité au stock)
      const rs = p.resources['Habitants']
      if (rs) {
        rs.stock += 40
        return ` — Jardins d'Alexandrie : +40 Habitants.`
      }
      return ''
    }
    case "Palais des empereurs de Lun": {
      // Chaque habitation de chaque joueur convertit 5 habitants
      //  vers la culture du constructeur.
      let total = 0
      for (const q of state.players) {
        for (const c of state.population[q.n] ?? []) {
          if (c.statut === 'Décédé' || c.culture === p.culture) continue
          if (c.titre === C.p.titreDirigeant) continue
          c.culture = p.culture
          total++
        }
      }
      return total > 0
        ? ` — Palais des empereurs de Lun : ${total} habitant(s) converti(s) à la culture ${p.culture}.`
        : ''
    }
    default:
      return ''
  }
}

/** Réduction automatique du prix de levée d'armée accordée par les
 *  merveilles du joueur : −20 Or par « Temple de Bahamutt » et par
 *  « Ordre des chevaliers d'Orcre » (cumulables). */
export function reductionLeveeArmeesMerveilles(p: Player): number {
  return 20 * nbBatiments(p, 'Temple de Bahamutt')
    + 20 * nbBatiments(p, "Ordre des chevaliers d'Orcre")
}

/** Doublement du flux de Science des bâtiments de la capitale si le
 *  joueur possède le Laboratoire d'expérimentations de Falheim.
 *  Appliqué dans appliquerEffetsBatiments (canal Bâtiments). */
export function aLaboratoireFalheim(p: Player): boolean {
  return nbBatiments(p, "Laboratoire d'expérimentations de Falheim") > 0
}

/** Bonus de la Tour de Crystal à la découverte d'une technologie :
 *  +3 d'une ressource de base aléatoire (le constructeur choisit au
 *  hasard parmi Bétail, Bois, Charbon, Fer, Pierre, Soie). */
export function bonusTourDeCrystalProgres(
  p: Player,
  rng: RngType,
): { ressource: string; montant: number } | null {
  if (nbBatiments(p, 'Tour de Crystal') === 0) return null
  const base = ['Bétail', 'Bois', 'Charbon', 'Fer', 'Pierre', 'Soie']
  return { ressource: rng.pick(base), montant: 3 * nbBatiments(p, 'Tour de Crystal') }
}

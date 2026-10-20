// ═══════════════════════════════════════════════════════════════════════════
//  BANQUE D'EFFETS — IMPLÉMENTATION (refactor 2026-10-18)
//
//  Chaque type d'effet est implémenté UNE fois ici. Les règles
//  (bâtiments, dogmes, factions…) combinent ces effets par DONNÉES ;
//  changer une règle = changer ses données, jamais ce fichier.
//
//  CONTRAT D'IMMUABILITÉ : un effet ne mute JAMAIS l'état. Il renvoie
//  sa contribution (flux, garnison…) via une ContributionEffets ;
//  le moteur décide où et quand l'appliquer. C'est ce qui rend la
//  banque testable en isolation.
// ═══════════════════════════════════════════════════════════════════════════

import type {
  ContexteEffet, ContributionEffets, ConditionRegle, Effet, RegleBanque,
} from '../types'
import { cfgOf } from '../../engine/gameData'
import { capitaleDe } from '../../engine/factions'
import { rangNiveau, garnisonHabitationVille } from '../../engine/regimes'
import { aMinistre, portefeuillesDuJoueur } from '../../engine/ministeres'
import { clesTechsParNom } from '../registry'

// ── Conditions ─────────────────────────────────────────────────────────────

/** Vérifie les conditions d'une règle pour un contexte donné.
 *  Toutes les conditions présentes sont combinées en ET. */
export function conditionsRemplies(cond: ConditionRegle | undefined, ctx: ContexteEffet): boolean {
  if (!cond) return true
  const { joueur } = ctx
  if (cond.peuple && joueur.peuple !== cond.peuple) return false
  if (cond.saison && ctx.saison !== cond.saison) return false
  if (cond.vassal === true && joueur.vassalDe == null) return false
  if (cond.vassal === false && joueur.vassalDe != null) return false
  if (cond.ministre && !aMinistre(ctx.state, joueur, cond.ministre)) return false
  if (cond.tech && !(joueur.progresDebloques ?? []).includes(cond.tech)) return false
  if (cond.regime && joueur.regime !== cond.regime) return false
  if (cond.culture && joueur.culture !== cond.culture) return false
  // Technologie débloquée par NOM (source 'tech', brûlage #3 source
  //  3/3) : la clé `<arbre>:<slot>` est résolue par le registre, les
  //  homonymes de plusieurs arbres matchent (comme l'historique aTech).
  if (cond.techNom && !clesTechsParNom(ctx.state.config, cond.techNom).some((k) => (joueur.progresDebloques ?? []).includes(k))) return false
  // Suzerain d'au moins une cité libre (relations diplomatiques).
  if (cond.suzerainDeCite === true && !(ctx.state.citesLibres ?? []).some((c) => c.suzerain === joueur.n)) return false
  // cond.ageMin : suivi manuel au plateau (arbitre) — documentaire
  //  tant que l'âge n'est pas suivi dans Player.
  // cond.pontificatMin : suivi manuel au plateau — documentaire.
  return true
}

// ── Application d'un effet ──────────────────────────────────────────────────

/** Applique UN effet à une contribution (accumulate). */
function appliquerEffet(e: Effet, ctx: ContexteEffet, out: ContributionEffets): void {
  switch (e.type) {
    case 'fluxVille': {
      if (e.ete) {
        out.fluxEte[e.ressource] = (out.fluxEte[e.ressource] ?? 0) + e.valeur
      } else {
        out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur
      }
      break
    }
    case 'fluxJoueur': {
      // Un flux joueur s'applique au joueur même si le site est une
      //  ville (il est crédité une fois, pas par ville).
      if (e.ete) {
        if (ctx.saison === 'Été') out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur
      } else {
        out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur
      }
      break
    }
    case 'fluxJoueurParMinistre': {
      // Production CUMULABLE : valeur × nombre de ministres VIVANTS
      //  portant le portefeuille (arbitrage Thibaut : deux fois le
      //  même portefeuille = effet doublé).
      const nb = portefeuillesDuJoueur(ctx.state, ctx.joueur)
        .filter((m) => m === e.portefeuille).length
      if (nb > 0) out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur * nb
      break
    }
    case 'fluxParAmenagement': {
      // Production CUMULABLE : valeur × nombre d'aménagements portant
      //  l'un des noms listés dans TOUTES les villes du joueur (ex.
      //  Socialisme : +5 Nourriture d'été par Champ/Rizière — la
      //  saison est une CONDITION de la règle, pas un if ici).
      let nb = 0
      for (const v of ctx.joueur.villes) {
        for (const a of v.amenagements ?? []) {
          if (e.noms.includes(a)) nb++
        }
      }
      if (nb > 0) out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur * nb
      break
    }
    case 'fluxParVilleCultureMonde': {
      // Production par VILLE de la culture du joueur dans le MONDE
      //  entier, tous joueurs confondus (ex. Lunisme : +4 Tourisme
      //  par ville de culture Lunisme).
      let nb = 0
      for (const q of ctx.state.players) {
        for (const v of q.villes) {
          if (v.culture === ctx.joueur.culture) nb++
        }
      }
      if (nb > 0) out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur * nb
      break
    }
    case 'fluxSiCapitale': {
      // Production à condition que le joueur possède une capitale
      //  (canal historique « prodCapitale » des techs, source 3/3 du
      //  brûlage #3 — ex. Musées : +30 Tourisme par tour).
      if (capitaleDe(ctx.joueur)) {
        out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur
      }
      break
    }
    case 'fluxParVille': {
      // Production par VILLE du joueur (canal historique « par
      //  habitation » des techs — ex. Assemblées scientifiques :
      //  +1 Science par ville).
      const nb = ctx.joueur.villes.length
      if (nb > 0) out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur * nb
      break
    }
    case 'fluxParVilleProximite': {
      // Production par ville dont la proximité est `proximite` (canal
      //  historique « côtier » des techs — ex. Cours de pêche :
      //  +4 Nourriture par ville à proximité de la Mer).
      const nb = ctx.joueur.villes.filter((v) => v.proximite === e.proximite).length
      if (nb > 0) out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur * nb
      break
    }
    case 'fluxParRangHabitation': {
      // Production par RANG d'habitation cumulé sur les villes du
      //  joueur (ex. Surconsommation : +1 Science +5 Tourisme par
      //  rang — la consommation de Nourriture reste un coût moteur).
      const C = cfgOf(ctx.state.config)
      let rangs = 0
      for (const v of ctx.joueur.villes) rangs += rangNiveau(v, C)
      if (rangs > 0) out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur * rangs
      break
    }
    case 'fluxParBatiment': {
      // Production par BÂTIMENT des villes, limité à une FAMILLE du
      //  référentiel si fournie (ex. Industrialisation : +1 Charbon
      //  par bâtiment ; Merveilleux : +1 Science par Merveille).
      const refs = cfgOf(ctx.state.config).config.constructions ?? []
      let nb = 0
      for (const v of ctx.joueur.villes) {
        for (const b of v.batiments) {
          if (!e.famille || refs.find((c) => c.nom === b)?.famille === e.famille) nb++
        }
      }
      if (nb > 0) out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur * nb
      break
    }
    case 'fluxParGarnisonHabitation': {
      // Production proportionnelle à la garnison d'habitants :
      //  valeur × Σ garnisonHabitationVille (ex. Service militaire
      //  avancé : +0,5 Habitants par point de garnison).
      const C = cfgOf(ctx.state.config)
      let total = 0
      for (const v of ctx.joueur.villes) total += garnisonHabitationVille(ctx.joueur, v, C, ctx.state)
      if (total > 0) out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur * total
      break
    }
    case 'fluxParTitre': {
      // Production par TITULAIRE VIVANT du titre dans la population
      //  du joueur (générique `prodParTitre` du référentiel — ex.
      //  Commerce lointain : +3 Or par Marchand vivant).
      const vivants = (ctx.state.population[ctx.joueur.n] ?? []).filter((c) => c.statut !== 'Décédé')
      const nb = vivants.filter((c) => c.titre === e.titre).length
      if (nb > 0) out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur * nb
      break
    }
    case 'fluxCapitale': {
      // Ne s'applique QUE si la ville du contexte est la capitale.
      if (ctx.ville && capitaleDe(ctx.joueur)?.nom === ctx.ville.nom) {
        out.flux[e.ressource] = (out.flux[e.ressource] ?? 0) + e.valeur
      }
      break
    }
    case 'garnisonVille': {
      out.garnison += e.valeur
      break
    }
    case 'garnisonParRang': {
      // Le rang est déduit de la ville du contexte ; sans ville, effet nul.
      if (ctx.ville?.rang) {
        out.garnison += e.valeur * rangNiveau(ctx.ville, cfgOf(ctx.state.config))
      }
      break
    }
    case 'garnisonJoueur': {
      out.garnison += e.valeur
      break
    }
    case 'tourismeInstantane':
    case 'habitantsVille':
    case 'scienceInstantanee':
    case 'ressourcesInstantanees':
    case 'emissaires': {
      out.instantanes.push(e)
      break
    }
    case 'conversionPoids': {
      out.conversion[e.culture] = (out.conversion[e.culture] ?? 0) + e.valeur
      break
    }
    case 'migrationPoids': {
      out.migration += e.valeur
      break
    }
    case 'reductionCout': {
      const cible = out.reductions[e.cible] ?? {}
      for (const [res, v] of Object.entries(e.reductions)) {
        cible[res] = (cible[res] ?? 0) + v
      }
      out.reductions[e.cible] = cible
      break
    }
    case 'reductionLeveeArmee': {
      const cible = out.reductions['leveeArmee'] ?? {}
      cible['Or'] = (cible['Or'] ?? 0) + e.valeur
      out.reductions['leveeArmee'] = cible
      break
    }
    case 'demographieVille': {
      // Les modificateurs démographiques passent par les instantanés :
      //  le site démographique les relit (population.ts).
      out.instantanes.push(e)
      break
    }
  }
}

// ── Application de la banque ───────────────────────────────────────────────

export function contributionVide(): ContributionEffets {
  return { flux: {}, fluxEte: {}, garnison: 0, conversion: {}, migration: 0, reductions: {}, instantanes: [] }
}

/** Applique un ensemble de règles de la banque à un contexte et renvoie
 *  la contribution agrégée. Ne mute ni l'état ni les règles. */
export function appliquerRegles(regles: RegleBanque[], ctx: ContexteEffet): ContributionEffets {
  const out = contributionVide()
  for (const r of regles) {
    if (!conditionsRemplies(r.conditions, ctx)) continue
    for (const e of r.effets) appliquerEffet(e, ctx, out)
  }
  return out
}

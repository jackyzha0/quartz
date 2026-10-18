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
import { regleActive, capitaleDe } from '../../engine/factions'
import { rangNiveau } from '../../engine/regimes'
import { aMinistre } from '../../engine/ministeres'

// ── Conditions ─────────────────────────────────────────────────────────────

/** Vérifie les conditions d'une règle pour un contexte donné.
 *  Toutes les conditions présentes sont combinées en ET. */
export function conditionsRemplies(cond: ConditionRegle | undefined, ctx: ContexteEffet): boolean {
  if (!cond) return true
  const { joueur } = ctx
  if (cond.peuple && joueur.peuple !== cond.peuple) return false
  if (cond.regleFaction && !regleActive(joueur, cfgOf(ctx.state.config), cond.regleFaction)) return false
  if (cond.saison && ctx.saison !== cond.saison) return false
  if (cond.vassal === true && joueur.vassalDe == null) return false
  if (cond.vassal === false && joueur.vassalDe != null) return false
  if (cond.ministre && !aMinistre(ctx.state, joueur, cond.ministre)) return false
  if (cond.tech && !(joueur.progresDebloques ?? []).includes(cond.tech)) return false
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

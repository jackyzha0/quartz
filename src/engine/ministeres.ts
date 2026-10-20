// ══════════════════════════════════════════════════════════════════════
//  MINISTÈRES — portefeuilles ministériels (refonte 2026-10-14)
// ══════════════════════════════════════════════════════════════════════
//  Chaque rang de pays octroie 1 Ministre (table paysRangs, colonne
//  « ministres » — cap averti, jamais bloquant, dans validation.ts).
//  Un Ministre porte un PORTFEUILLE de la table `ministeres` du
//  référentiel (Ministère | Rang minimum | Mode | Effet), entièrement
//  paramétrable dans Référentiels → « Ministères ». Arbitrage Thibaut :
//  portefeuilles CUMULABLES (deux fois le même = effet doublé),
//  nomination réservée aux nobles et dynasties (avertissement du
//  titre « nobleSeul »), certains portefeuilles exigent un RANG DE PAYS
//  MINIMUM (avertissement), effets FIXES pour les 16 portefeuilles
//  « de cour » (les 7 du classeur scalent sur le rang de pays).
//  Mode « Auto » = appliqué par le moteur (montants ci-dessous, par
//  NOM de portefeuille) ; mode « Plateau » = appliqué à la table.
// ══════════════════════════════════════════════════════════════════════

import type { GameState, Player, Character } from './types'
import { RENOMMAGES_MINISTERES } from '../config/defaultConfig'
import { fullName } from './shared'
import { reglesMinistres } from '../rules/registry'
import { appliquerRegles } from '../rules/effects/banque'

/** Portefeuilles ministériels actifs d'un joueur : personnages VIVANTS
 *  portant le titre « Ministre » et un portefeuille. Les doublons sont
 *  conservés (portefeuilles cumulables — deux Trésoriers comptent
 *  double dans les effets automatiques). */
export function portefeuillesDuJoueur(state: GameState, p: Player): string[] {
  return (state.population[p.n] ?? [])
    .filter((c) => c.statut !== 'Décédé' && c.titre === 'Ministre' && c.ministere)
    .map((c) => c.ministere as string)
}

/** Le joueur possède-t-il au moins un ministre du portefeuille donné ? */
export function aMinistre(state: GameState, p: Player, portefeuille: string): boolean {
  return (state.population[p.n] ?? []).some(
    (c) => c.statut !== 'Décédé' && c.titre === 'Ministre' && c.ministere === portefeuille,
  )
}

/** Facteur de réduction du coût des SACRES (montée de rang, bouton
 *  « ⬆ Sacre » de la page Royaume — ET sacre d'avènement) :
 *  −25 % avec un Chancelier de justice. */
export function facteurSacre(state: GameState, p: Player): number {
  return aMinistre(state, p, 'Chancelier de justice') ? 0.75 : 1
}

/** Facteur du sacre d'AVÈNEMENT (succession, sante.ts) : moitié du
 *  prix du rang par défaut (refonte des rangs), réduit encore de
 *  moitié avec un Archichancelier (≈ quart du prix du rang).
 *  Se combine avec facteurSacre (0.75 × 0.25 ≈ 37,5 % si les deux). */
export function facteurAvencement(state: GameState, p: Player): number {
  return aMinistre(state, p, 'Archichancelier') ? 0.25 : 0.5
}

/** Étape moteur (3duodecies) : effets AUTOMATIQUES par tour des
 *  portefeuilles — Trésorier +5 Or, Grand Précepteur +1 Science,
 *  Grand prévôt +1 Fer (marqueur (y)) — PAR MINISTRE (cumulables). Crédite les stocks et retourne les
 *  apports par joueur (canal « Ministères » du récap ressources ;
 *  pas de log par tour pour ne pas noyer le journal).
 *  VOIE UNIQUE (retour Thibaut 2026-10-19 : toute production passe
 *  par la banque) : les montants vivent dans le REGISTRE
 *  (MINISTERES_AUTO, règles declencheur 'tour') — ce site ne fait que
 *  LIRE la banque, plus aucun chiffre codé ici. */
export function appliquerEffetsMinisteres(
  state: GameState,
): Record<number, Record<string, number>> {
  const out: Record<number, Record<string, number>> = {}
  const reglesTour = reglesMinistres().filter((r) => r.declencheur !== 'finSaison')
  for (const p of state.players) {
    const gains = appliquerRegles(reglesTour, { state, joueur: p, saison: state.saison }).flux
    for (const [res, v] of Object.entries(gains)) {
      const rs = p.resources[res]
      if (rs) rs.stock += v
    }
    if (Object.keys(gains).length > 0) out[p.n] = gains
  }
  return out
}

/** Pluriel d'affichage d'un portefeuille pour les logs de fin de
 *  saison (présentation uniquement — les MONTANTS, eux, vivent dans
 *  le registre de la banque). */
const PLURIELS_MINISTERES: Record<string, string> = {
  'Sénéchal': 'Sénéchals',
  'Maître de cour': 'Maîtres de cour',
  'Légat du pontificat': 'Légats du pontificat',
}

function libellePortefeuille(nom: string, nb: number): string {
  if (nb <= 1) return nom
  return PLURIELS_MINISTERES[nom] ?? `${nom}s`
}

/** Contribution BANQUE (lecture seule, SANS crédit) des portefeuilles
 *  de fin de saison d'un joueur, agrégée par ressource. Sert au
 *  calcul de production par tour (tourismeCourant, canal
 *  « Ministères ») : les portefeuilles de fin de saison sont une
 *  production ÉQUIVALENTE PAR TOUR. La saison du contexte est la
 *  saison EN COURS (les règles conditionnelles — Sénéchal été —
 *  s'évaluent sur elle). */
export function fluxFinSaisonMinisteres(state: GameState, p: Player): Record<string, number> {
  const regles = reglesMinistres().filter((r) => r.declencheur === 'finSaison')
  return appliquerRegles(regles, { state, joueur: p, saison: state.saison }).flux
}

/** Fin de saison (appelé par runTurn au changement de saison) :
 *  effets automatiques de fin de saison — Sénéchal : +15 Nourriture à
 *  la fin de l'ÉTÉ (par Sénéchal) ; Maître de cour : +2 Tourisme à la
 *  fin de CHAQUE saison (par Maître de cour). Journalise un message
 *  Système par joueur concerné (une fois par saison seulement).
 *  VOIE UNIQUE (retour Thibaut 2026-10-19) : les MONTANTS et les
 *  CONDITIONS de saison sont lus sur les règles de BANQUE
 *  declencheur 'finSaison' (MINISTERES_AUTO) — appliquées règle par
 *  règle pour tenir le format des logs (une part par portefeuille). */
export function effetsFinSaisonMinisteres(
  state: GameState, saisonQuiTermine: 'Été' | 'Hiver',
): void {
  const reglesFinSaison = reglesMinistres().filter((r) => r.declencheur === 'finSaison')
  for (const p of state.players) {
    const portefeuilles = portefeuillesDuJoueur(state, p)
    const parts: string[] = []
    // Pontificats (revue 2026-10-16, retour Thibaut) : AUCUNE
    //  automatisation — tous les paliers (60, 100, 125, 150, 180, 220,
    //  260, 340 Tourisme) sont des AIDES DE JEU à gérer au plateau
    //  (visibles dans Référentiels → Tourisme).
    // Chancelier des émissaires (revue 2026-10-15, ressource d'émissaires) :
    //  +1 émissaire en RÉSERVE à chaque fin de saison (cumulable).
    //  Reste appliqué ICI (pas dans la banque) : instantané hors
    //  calcul de production, pas un flux.
    const nbChancEmiss = portefeuilles.filter((m) => m === 'Chancelier des émissaires').length
    if (nbChancEmiss > 0) {
      p.emissaires = (p.emissaires ?? 0) + nbChancEmiss
      parts.push(`+${nbChancEmiss} émissaire(s) en réserve (Chancelier des émissaires)`)
    }
    // Production de fin de saison : règle par règle sur la banque
    //  (conditions de saison évaluées par la banque sur la saison
    //  qui TERMINE ; cumul par portefeuille dans l'effet).
    const ctx = { state, joueur: p, saison: saisonQuiTermine }
    for (const regle of reglesFinSaison) {
      const contribution = appliquerRegles([regle], ctx)
      for (const e of regle.effets) {
        if (e.type !== 'fluxJoueurParMinistre') continue
        const nb = portefeuilles.filter((m) => m === e.portefeuille).length
        const v = contribution.flux[e.ressource] ?? 0
        if (nb > 0 && v !== 0) {
          const rs = p.resources[e.ressource]
          if (rs) rs.stock += v
          parts.push(`+${v} ${e.ressource} (${nb} ${libellePortefeuille(e.portefeuille, nb)})`)
        }
      }
    }
    if (parts.length > 0) {
      state.log.push({
        turn: state.turn + 1, type: 'Système', joueur: p.n,
        texte: `👑 Ministères — fin ${saisonQuiTermine === 'Été' ? "d'été" : "d'hiver"} : ${p.nom} reçoit ${parts.join(', ')}.`,
      })
    }
  }
}

/** Attribue (ou retire : ministere = null) le portefeuille d'un
 *  personnage titré « Ministre ». Effet immédiat du Connétable :
 *  +15 Garnison par ville du joueur, créditée UNE fois à la prise de
 *  fonction dans p.garnisonMinisteres (bonus permanent intégré à la
 *  garnison calculée de chaque ville par garnisonHabitationVille —
 *  comme le Tourisme crédité à la construction, le départ ou la mort
 *  du ministre ne retire pas le gain déjà crédité). `char` doit être
 *  le personnage DANS l'état (mutation). */
export function changerPortefeuille(
  state: GameState, p: Player, char: Character, ministere: string | null,
): void {
  // Connétable (marqueur (y)) : +15 Garnison à la prise de fonction
  //  (le texte du référentiel passe de +5 à +15 — arbitrage Thibaut)
  //  — REPRIS au retrait du portefeuille, sans cumul (revue
  //  2026-10-16 : l'ancien code cumulait à chaque nomination et ne
  //  reprenait jamais à la fin de charge).
  const etaitConnetable = char.ministere === 'Connétable'
  if (etaitConnetable && ministere !== 'Connétable') {
    p.garnisonMinisteres = Math.max(0, (p.garnisonMinisteres ?? 0) - 15)
    state.log.push({
      turn: state.turn, type: 'Système', joueur: p.n,
      texte: `👑 Ministères — ${fullName(char)} quitte la charge de Connétable : −15 Garnison.`,
    })
  }
  char.ministere = ministere
  if (ministere === 'Connétable' && !etaitConnetable) {
    p.garnisonMinisteres = (p.garnisonMinisteres ?? 0) + 15
    state.log.push({
      turn: state.turn, type: 'Système', joueur: p.n,
      texte: `👑 Ministères — ${fullName(char)} prend la charge de Connétable : +15 Garnison à toutes les villes de ${p.nom}.`,
    })
  }
}

/** Marqueur (v) 2026-10-15 : renomme les portefeuilles ministériels
 *  portés par la population d'un état chargé (vieilles sauvegardes
 *  avec les noms du classeur : Colonial, Culture, Défense, Ecologie,
 *  Economie, Guerre, Recherche → offices de cour). Mutation en place,
 *  idempotent (les nouveaux noms ne sont pas dans la map). */
export function migrerNomsMinisteres(state: GameState): void {
  const renomme = (c: Character): void => {
    if (c.ministere && RENOMMAGES_MINISTERES[c.ministere]) {
      c.ministere = RENOMMAGES_MINISTERES[c.ministere]
    }
  }
  for (const liste of Object.values(state.population ?? {})) {
    (liste ?? []).forEach(renomme)
  }
  for (const cite of state.citesLibres ?? []) {
    (cite.population ?? []).forEach(renomme)
  }
}

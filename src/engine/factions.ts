// ══════════════════════════════════════════════════════════════════════
//  FACTIONS — BONUS AUTOMATIQUES DES RÈGLES DE FACTION (étape 3nonies)
//  Les règles de faction du peuple de chaque joueur (2 règles de base +
//  règle d'Âge II choisie + règle d'Âge III choisie, voir Royaume →
//  « ⚔️ Faction ») produisent des bonus chiffrés appliqués à chaque fin
//  de tour : production par tour, garnison des habitations, transferts
//  entre joueurs (ex. Nains « Fête de la Bière »).
//  Les parties des règles qui dépendent du plateau physique (PM, cases,
//  émissaires, influence, marchands, colonies…) ne sont PAS modélisées :
//  elles restent à gérer manuellement et sont signalées comme telles
//  dans le cadre « Faction » de la page Royaume.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player } from './types'
import type { Cfg } from './gameData'
import { cfgOf } from './gameData'
import { batimentsRefs, type ConstructionRef } from './constructions'

// ── Fiche du peuple et règles actives ─────────────────────────────────

export interface RegleFaction { nom: string; texte: string }

/** Fiche de faction du peuple d'un joueur (peuplesLibres + peuplesAutres). */
export function ficheFaction(p: Player, C: Cfg) {
  return [...C.config.peuplesLibres, ...C.config.peuplesAutres].find((f) => f.nom === p.peuple)
}

export type SourceRegle = 'Base' | 'Âge II' | 'Âge III'

export interface RegleActive {
  source: SourceRegle
  nom: string
  texte: string
}

/** Règles de faction ACTIVES d'un joueur : les règles de base de son
 *  peuple, plus la règle d'Âge II choisie (p.regleAge2, retenue seulement
 *  si elle figure bien dans la liste Âge II de la fiche) et la règle
 *  d'Âge III choisie. La montée d'âge n'est pas automatisée : le choix
 *  est fait à la main dans le cadre « Faction » de la page Royaume. */
export function reglesActives(p: Player, C: Cfg): RegleActive[] {
  const f = ficheFaction(p, C)
  if (!f) return []
  const out: RegleActive[] = []
  for (const r of f.reglesBase ?? []) out.push({ source: 'Base', nom: r.nom, texte: r.texte })
  const r2 = (f.ageII ?? []).find((r) => r.nom === p.regleAge2)
  if (r2) out.push({ source: 'Âge II', nom: r2.nom, texte: r2.texte })
  const r3 = (f.ageIII ?? []).find((r) => r.nom === p.regleAge3)
  if (r3) out.push({ source: 'Âge III', nom: r3.nom, texte: r3.texte })
  return out
}

// ── Compteurs d'état (partagés moteur / interface) ────────────────────

/** Nombre d'aménagements d'un type précis possédés par le joueur. */
export function nbAmenagements(p: Player, nom: string): number {
  let n = 0
  for (const v of p.villes) for (const a of v.amenagements ?? []) if (a === nom) n++
  return n
}

/** Nombre de bâtiments d'un type précis possédés par le joueur. */
export function nbBatiments(p: Player, nom: string): number {
  let n = 0
  for (const v of p.villes) for (const b of v.batiments) if (b === nom) n++
  return n
}

/** Nombre de bâtiments d'un type précis dans UNE ville. */
export function nbBatimentsVille(ville: City, nom: string): number {
  return ville.batiments.filter((b) => b === nom).length
}

/** Nombre de vassaux d'un joueur (joueurs qui lui ont prêté serment). */
export function nbVassaux(state: GameState, p: Player): number {
  return state.players.filter((q) => q.vassalDe === p.n).length
}

/** Niveau du rang de pays d'un joueur (1 = Baronnie, … 5 = Empire ;
 *  échelle féodale unique de la table paysRangs, ordre = niveau).
 *  Défaut : 1. */
export function rangPaysNiveau(p: Player, C: Cfg): number {
  const rangs = C.config.paysRangs ?? []
  const idx = rangs.findIndex((r) => r.nom === (p.rang ?? ''))
  return idx >= 0 ? idx + 1 : 1
}

/** Capitale d'un joueur : ville nommée « Capitale », sinon la 1re ville. */
export function capitaleDe(p: Player): City | undefined {
  return p.villes.find((v) => v.nom.toLowerCase() === 'capitale') ?? p.villes[0]
}

// ── Bâtiments de faction & de capitale (table constructions) ──────────

/** Bâtiments de faction du peuple d'un joueur (table constructions du
 *  référentiel, champ `faction`). Chaque joueur ne peut construire que
 *  les bâtiments de faction de SON peuple — une seule par ville (les
 *  progrès « remplace une Église… » remplacent l'existant). */
export function batimentsFaction(p: Player, C: Cfg): ConstructionRef[] {
  return batimentsRefs(C.config).filter(
    (b) => b.categorie === 'Bâtiment' && (b.faction ?? '') === p.peuple)
}

/** Bâtiments de capitale du référentiel (groupe « Capitale », sans
 *  faction) : constructibles uniquement dans la capitale du joueur. */
export function batimentsCapitale(C: Cfg): ConstructionRef[] {
  return batimentsRefs(C.config).filter(
    (b) => b.groupe === 'Capitale' && !(b.faction ?? ''))
}

// ── Effets automatisés par règle ──────────────────────────────────────

interface CtxFaction { state: GameState; p: Player; C: Cfg }

interface EffetRegle {
  /** description de la part automatisée, valeurs calculées à l'appui */
  auto: (ctx: CtxFaction) => string
  /** flux par tour (canal « Faction » du récap ressources) */
  flux?: (ctx: CtxFaction) => Record<string, number>
  /** bonus de garnison d'UNE habitation (valeur d'état, page Joueur) */
  garnisonVille?: (ctx: CtxFaction, ville: City) => number
}

const nbChamps = (p: Player) => nbAmenagements(p, 'Champ')

/** Table des effets automatisés — clé : « peuple | règle ».
 *  Une règle absente de la table n'a aucune part automatisable dans
 *  ce portage (plateau, émissaires, influence…) : elle est affichée
 *  « à gérer manuellement » dans le cadre Faction. */
const EFFETS: Record<string, EffetRegle> = {
  // ── Basiléens ───────────────────────────────────────────────────────
  'Basiléens|Paysans dévoués': {
    auto: (c) => `champs : +5 Nourriture/tour chacun (${nbChamps(c.p)} champ(s)) ; garnison des cités −20`,
    flux: (c) => ({ Nourriture: 5 * nbChamps(c.p) }),
    garnisonVille: (c, v) =>
      (v.type ?? 'Ville') === 'Ville' && /cité/i.test(v.rang ?? '') ? -20 : 0,
  },
  'Basiléens|Temps de paix': {
    auto: (c) => {
      const vs = nbVassaux(c.state, c.p)
      if (c.p.vassalDe != null) {
        const suz = c.state.players.find((q) => q.n === c.p.vassalDe)
        return suz
          ? `vassal : +15 Tourisme × rang de pays du suzerain (${suz.nom}, rang ${rangPaysNiveau(suz, c.C)})`
          : 'vassal : +15 Tourisme × rang de pays du suzerain'
      }
      return `suzerain : +5 Nourriture et +2 Or par tour et par ville vassale (${vs} vassal(e)s)`
    },
    flux: (c) => {
      const out: Record<string, number> = {}
      const vs = nbVassaux(c.state, c.p)
      if (vs > 0) {
        out['Nourriture'] = 5 * vs
        out['Or'] = 2 * vs
      }
      // Vassal « +15 Tourisme × rang » : VALEUR D'ÉTAT (revue
      //  2026-10-16) — créditée UNE FOIS au prêt de serment, retirée à
      //  la fin du serment (voir serments.ts / finSerment), pas un flux.
      return out
    },
  },
  'Basiléens|Abuser des serfs': {
    auto: (c) => `champs : +3 Tourisme chacun, valeur d'état (crédité à la construction du Champ) — ${nbChamps(c.p)} champ(s)`,
    flux: () => ({}),
  },

  // ── Peaux Vertes ────────────────────────────────────────────────────
  'PEAUX VERTES|Cé partou à nou !': {
    auto: (c) => `+5 Nourriture/tour par ville (${c.p.villes.length} ville(s))`,
    flux: (c) => ({ Nourriture: 5 * c.p.villes.length }),
  },
  'PEAUX VERTES|Donné à mangé': {
    auto: (c) => `villes et vassaux : +5 Nourriture et +1 Science par tour chacun `
      + `(${c.p.villes.length} ville(s) + ${nbVassaux(c.state, c.p)} vassal(e)s)`,
    flux: (c) => {
      const n = c.p.villes.length + nbVassaux(c.state, c.p)
      return { Nourriture: 5 * n, Science: 1 * n }
    },
  },

  // ── Hommes Lézards ──────────────────────────────────────────────────

  // ── Nains ───────────────────────────────────────────────────────────

  // ── Elfes d'Or ──────────────────────────────────────────────────────
  "ELFES D'OR|Puit d'Or": {
    auto: (c) => `+1 Science/tour et garnison +40 par « Puit de mana » (${nbBatiments(c.p, 'Puit de mana')} bâtiment(s))`,
    flux: (c) => ({ Science: 1 * nbBatiments(c.p, 'Puit de mana') }),
    garnisonVille: (c, v) => 40 * nbBatimentsVille(v, 'Puit de mana'),
  },

  // ── Sylvains ────────────────────────────────────────────────────────
  'Sylvains|Don de miel': {
    auto: (c) => `apicultures : 8 Nourriture/tour au lieu de 12 (−4 × ${nbAmenagements(c.p, 'Apiculture')} apiculture(s)) ; émissaire à la construction (manuel)`,
    flux: (c) => ({ Nourriture: -4 * nbAmenagements(c.p, 'Apiculture') }),
  },
  'Sylvains|Bibliothèque enfouie': {
    auto: (c) => `apicultures : +1 Science/tour chacune (${nbAmenagements(c.p, 'Apiculture')} apiculture(s))`,
    flux: (c) => ({ Science: 1 * nbAmenagements(c.p, 'Apiculture') }),
  },
  "Sylvains|Enclave d'émeraude": {
    auto: (c) => `${nbVassaux(c.state, c.p)} vassal(e)s : +2 Or/tour chacun ; garnison +20 par vassal et par ville`,
    flux: (c) => ({ Or: 2 * nbVassaux(c.state, c.p) }),
    garnisonVille: (c) => 20 * nbVassaux(c.state, c.p),
  },

  // ── Vermines de Kaoss ───────────────────────────────────────────────
  'VERMINES DE KAOSS|Un chef plus intelligent': {
    auto: () => `capitale : +1 Science par tour`,
    flux: () => ({ Science: 1 }),
  },

  // ── Krovors ─────────────────────────────────────────────────────────

  // ── Revue 2026-10-15 (2e passe) : règles chiffrées restantes ──
  // Basiléens « Émissaires efficaces » (Âge II) : +1 émissaire en réserve
  //  à chaque succession de Dirigeant (appliqué dans handleDirigeantSuccession).
  // (pas un flux par tour — one-shot, codé dans sante.ts)
  'Basiléens|Émissaires efficaces': {
    auto: () => `+1 émissaire en réserve à chaque succession de Dirigeant (crédité automatiquement)`,
    flux: () => ({}),
  },
  // Vermines « Étudier leur manière de faire » (Âge III) : colonies +1 Science.
  // Colonies non modélisées — reste manuel (voir description).
  // Norls « Nomades » (Base) : 40 Or + 100 Nourriture au setup — one-shot
  //  à la création de partie (codé dans setup.ts).
  'NORLS|Nomades': {
    auto: () => `40 Or et 100 Nourriture en plus au départ (appliqué à la création de partie)`,
    flux: () => ({}),
  },
  // Elfes d'Or « Accros à la magie » : 8 Science au départ + Science maintenue
  //  (déjà automatisé plus haut).
  // Peaux Vertes « Diriger par la peur » : vassaux +10 Or/rang sur leurs
  //  levées — automatisable via prixArmee des VASSAUX d'un suzerain Peaux Vertes.
  'PEAUX VERTES|Diriger par la peur': {
    auto: (c) => {
      const nb = nbVassaux(c.state, c.p)
      return `le coût de levée d'armée de vos vassaux est augmenté de 10 Or par rang de pays (${nb} vassal(e)s) — appliqué automatiquement chez eux`
    },
    flux: () => ({}),
  },
  // ── Revue 2026-10-15 (retour Thibaut : « tous les ministres et
  //    règles de faction pris en compte automatiquement ») — ajout des
  //    règles chiffrées automatisables restantes —──────────────
  // Krovors « Merchantialisme » (Âge III) : +1 Science par marchand vivant.
  // Norls « La course à la mer » (Âge II) : habitations et bâtiments de
  //  faction côtiers : +3 Or et +1 Bétail par tour. La proximité « Mer »
  //  d'une ville (champ optionnel, page Pays) marque les côtiers.
  'NORLS|La course à la mer': {
    auto: (c) => {
      const cotes = c.p.villes.filter((v) => v.proximite === 'Mer').length
      return `villes côtières (proximité Mer) : +3 Or et +1 Bétail/tour chacune (${cotes} ville(s))`
    },
    flux: (c) => {
      const cotes = c.p.villes.filter((v) => v.proximite === 'Mer').length
      const out: Record<string, number> = {}
      if (cotes > 0) { out['Or'] = 3 * cotes; out['Bétail'] = 1 * cotes }
      return out
    },
  },
  // Norls « Savoir chamanique » (Âge II) : bâtiments de faction avec au
  //  moins 1 expansion : +1 Science. Les expansions ne sont pas modélisées :
  //  on compte les bâtiments de faction présents (le joueur ajuste en
  //  supprimant ceux sans expansion — signalé en manuel).
  'NORLS|Savoir chamanique': {
    auto: (c) => `bâtiments de faction : +1 Science/tour chacun (${batimentsFaction(c.p, c.C).filter((b) => nbBatiments(c.p, b.nom) > 0).length} type(s) construit(s)) — expansions non modélisées, ajuster au plateau`,
    flux: (c) => {
      let n = 0
      for (const b of batimentsFaction(c.p, c.C)) n += nbBatiments(c.p, b.nom)
      const out: Record<string, number> = {}
      if (n > 0) out['Science'] = n
      return out
    },
  },
  // Légions d'Outre-Tombe « Investir dans l'Os » (Âge II) : bâtiments de
  //  faction : +1 Os et +1 Or chacun par tour (l'Or égale la génération d'Os).
    // Elfes d'Or « Accros à la magie » (Base) : si la réserve de Science
  //  passe sous la production de Science, remise à niveau automatique.
  "ELFES D'OR|Accros à la magie": {
    auto: (c) => `Science maintenue au niveau de la production (crédité automatiquement)`,
    flux: (c) => {
      const prod = prodScience(c.state, c.p, c.C)
      const stock = c.p.resources['Science']?.stock ?? 0
      const out: Record<string, number> = {}
      if (stock < prod) out['Science'] = prod - stock
      return out
    },
  },
}

/** Marchands vivants d'un joueur (titre « Marchand », engine/commerce). */
function marchandsVivants(state: GameState, p: Player): number {
  return (state.population[p.n] ?? []).filter(
    (c) => c.statut !== 'Décédé' && c.titre === 'Marchand',
  ).length
}

/** Bâtiments de faction construits par un joueur (tous types confondus). */
function nbBatimentsFaction(p: Player, C: Cfg): number {
  let n = 0
  for (const b of batimentsFaction(p, C)) n += nbBatiments(p, b.nom)
  return n
}

/** Production de Science de BASE d'un joueur (ligne « base » du
 *  récap : stock.prod). La règle elfe compare la RÉSERVE à cette
 *  production — les autres canaux (habitants, ministres…) créditent
 *  par-dessus et sont déjà comptés dans le stock. */
function prodScience(state: GameState, p: Player, C: Cfg): number {
  return p.resources['Science']?.prod ?? 0
}

/** La règle donnée est-elle active pour ce joueur (par son nom) ? */
export function regleActive(p: Player, C: Cfg, nomRegle: string): boolean {
  return reglesActives(p, C).some((r) => r.nom === nomRegle)
}

// ── Détail chiffré (moteur et interface partagent le calcul) ──────────

export interface DetailFaction {
  source: SourceRegle
  nom: string
  texte: string
  /** description de la part automatisée (valeurs calculées) ; null = règle
   *  entièrement à gérer manuellement (plateau, émissaires…) */
  auto: string | null
  /** flux par tour appliqués au stock (canal « Faction ») */
  flux: Record<string, number>
  /** true si un bonus de garnison automatisé existe (valeur d'état) */
  garnison: boolean
}

/** Détail des règles actives d'un joueur : part automatisée (flux par
 *  tour, garnison) et règles manuelles — cadre « Faction », page Royaume. */
export function detailsFaction(state: GameState, p: Player, C: Cfg): DetailFaction[] {
  const ctx: CtxFaction = { state, p, C }
  return reglesActives(p, C).map((r) => {
    const e = EFFETS[`${p.peuple}|${r.nom}`]
    const flux = e?.flux ? e.flux(ctx) : {}
    const garnison = !!e?.garnisonVille && p.villes.some((v) => e.garnisonVille!(ctx, v) !== 0)
    return {
      source: r.source,
      nom: r.nom,
      texte: r.texte,
      auto: e ? e.auto(ctx) : null,
      flux,
      garnison,
    }
  })
}

/** Flux par tour cumulés des règles de faction actives (calcul pur, sans
 *  crédit — utilisé par le récap « prochain tour » de la page Pays). */
export function effetsFaction(state: GameState, p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  for (const d of detailsFaction(state, p, C)) {
    for (const [res, v] of Object.entries(d.flux)) out[res] = (out[res] ?? 0) + v
  }
  return out
}

/** Garnison accordée par les règles de faction à UNE habitation
 *  (valeur d'état — Basiléens cités −20, Nains +15/+100, Sylvains
 *  +20 par vassal, Elfes d'Or +40 par Puit de mana…). */
export function garnisonFactionVille(
  state: GameState, p: Player, ville: City, C: Cfg,
): number {
  const ctx: CtxFaction = { state, p, C }
  let g = 0
  // Norls « Conquête territoriale » (Âge III, revue 2026-10-15) :
  //  garnison des bâtiments de FACTION +30 (les expansions −5
  //  Nourriture restent au plateau — non modélisées).
  if (p.peuple === 'NORLS' && regleActive(p, C, 'Conquête territoriale')) {
    for (const b of ville.batiments) {
      if (batimentsFaction(p, C).some((bf) => bf.nom === b)) g += 30
    }
  }
  for (const r of reglesActives(p, C)) {
    const e = EFFETS[`${p.peuple}|${r.nom}`]
    if (e?.garnisonVille) g += e.garnisonVille(ctx, ville)
  }
  return g
}

// ── Fête de la Bière (Nains, Âge III) : transfert réel entre joueurs ──

/** Total qu'apporteront les autres joueurs à la fin de cet été
 *  (10 Or × leur rang de pays, plafonné par leur stock d'Or). */
function totalFeteDeLaBiere(state: GameState, p: Player, C: Cfg): number {
  let total = 0
  for (const q of state.players) {
    if (q.n === p.n) continue
    total += Math.min(10 * rangPaysNiveau(q, C), q.resources['Or']?.stock ?? 0)
  }
  return total
}

// ── Étape moteur (FinDeTour, étape 3nonies) ───────────────────────────

/** Crédite au stock les bonus automatiques des règles de faction du
 *  joueur (canal « Faction » du récap ressources). La « Fête de la
 *  Bière » naine transfère réellement l'Or des autres joueurs à la fin
 *  de chaque été. */
export function appliquerEffetsFaction(
  state: GameState, p: Player, C: Cfg = cfgOf(state.config),
): Record<string, number> {
  const out = effetsFaction(state, p, C)
  const ctx: CtxFaction = { state, p, C }

  // Fête de la Bière : remplacer l'estimation par le transfert réel
  // (débit des autres joueurs, plafonné par leur stock).

  for (const [res, v] of Object.entries(out)) {
    if (!v) continue
    const rs = p.resources[res]
    if (rs) rs.stock += v
  }
  if (Object.keys(out).length > 0) {
    const parts = Object.entries(out)
      .map(([r, v]) => `${v > 0 ? '+' : ''}${Math.round(v * 10) / 10} ${r}`).join(', ')
    state.log.push({
      turn: state.turn + 1, type: 'Système', joueur: p.n,
      texte: `⚔️ ${p.nom} — faction ${p.peuple} : ${parts}.`,
    })
  }
  return out
}

// ═══════════════════════════════════════════════════════════════════════
//  PROGRÈS AUTOMATIQUES (retour Thibaut 2026-10-15 : « applique tout ce
//  que tu peux appliquer automatiquement ») — fin de l'arbitrage « tout
//  s'applique au plateau » pour les effets chiffrés.
//
//  Ce module centralise les effets AUTOMATIQUES des technologies :
//    · fluxProgresJoueur      : flux par tour (canal « Progrès » du
//      récap ressources — prodCapitale, prodParHabitation, côtier,
//      par aménagement, conditionnels vassal/suzerain, par ministre…) ;
//    · gainDeblocageProgres   : one-shot au déblocage (Science, Or,
//      Habitants, Émissaires) ;
//    · reductionCout          : réductions de coût à la construction
//      (aménagements, habitations, bâtiments, levées d'armée) ;
//    · garnisonProgresVille   : garnisons par habitation/capitale.
//
//  Les effets restent CUMULABLES et paramétrables par le référentiel
//  (texte de la tech). Ce qui exige le plateau (batailles, cases,
//  assassins, serments, crises, bateaux…) reste une AIDE DE JEU.
// ═════════════════════════════════════════════════════════════════════

import type { GameState, Player, City } from './types'
import { cfgOf, type Cfg } from './gameData'
import { capitaleDe } from './factions'
import { rangNiveau } from './regimes'

const rangNiveauVille = rangNiveau
import { portefeuillesDuJoueur } from './ministeres'

/** Le joueur a-t-il débloqué la tech portant ce NOM ? */
export function aTech(p: Player, nomTech: string, C: Cfg): boolean {
  const set = new Set(p.progresDebloques ?? [])
  for (let i = 0; i < C.config.progres.length; i++) {
    const a = C.config.progres[i]
    const slots: Array<'a1' | 'a2' | 'b1' | 'b2' | 'c'> = ['a1', 'a2', 'b1', 'b2', 'c']
    for (const slot of slots) {
      const t = slot === 'c' ? a.techC : (slot[0] === 'a' ? a.brancheA : a.brancheB)[+slot[1] - 1]
      if (t?.nom === nomTech && set.has(`${i}:${slot}`)) return true
    }
  }
  return false
}

/** Flux par tour des technologies débloquées (canal « Progrès » du
 *  récap). Vue CALCUL PUR — le moteur crédite via
 *  appliquerEffetsProgres. */
export function fluxProgresJoueur(state: GameState, p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  const cap = capitaleDe(p)
  const add = (res: string, v: number) => { out[res] = (out[res] ?? 0) + v }

  // ── prodCapitale : la capitale produit +N ──
  if (cap) {
    if (aTech(p, 'Comprendre la soie', C)) add('Science', 1)
    if (aTech(p, 'Technologies futures I', C)) add('Science', 3)
    if (aTech(p, 'Etude astronomique', C)) add('Science', 1)
    if (aTech(p, 'Lumi\u00e8re', C)) add('Science', 1)
    if (aTech(p, 'D\u00e9forestation', C)) add('Bois', 1)
    if (aTech(p, 'Carrieristes', C)) add('Pierre', 1)
    if (aTech(p, 'Organisation fiscale', C)) add('Or', 2)
    if (aTech(p, 'Granges', C)) add('Nourriture', 10)
    if (aTech(p, 'Usinage', C)) add('Charbon', 1)
    if (aTech(p, 'Musées', C)) add('Tourisme', 30)
    if (aTech(p, 'Hausse du loyer', C)) add('Or', 15)
    // relations diplomatiques (Âge 1) : SUZERAIN
    if (aTech(p, 'Garde suzeraine', C) && citesSuzerainesCount(state, p) > 0) add('Nourriture', 12)
    if (aTech(p, 'Patronage', C) && citesSuzerainesCount(state, p) > 0) add('Science', 1)
  }
  // ── par habitation : chaque ville produit +N ──
  const nbVilles = p.villes.length
  if (nbVilles > 0) {
    if (aTech(p, 'Assembl\u00e9es scientifiques', C)) add('Science', 1 * nbVilles)
    if (aTech(p, 'Technologies futures II', C)) add('Science', 1 * nbVilles)
  }
  // ── côtier : habitations à proximité de la Mer ──
  const nbCotes = p.villes.filter((v) => v.proximite === 'Mer').length
  if (nbCotes > 0) {
    if (aTech(p, 'Cours de p\u00eache', C)) add('Nourriture', 4 * nbCotes)
    if (aTech(p, 'Commerce maritime I', C)) add('Or', 2 * nbCotes)
    if (aTech(p, 'Pêche de culture', C)) add('Nourriture', 3 * nbCotes)
  }
  // ── Surconsommation (industrialisation) : habitations +1 Science
  //  +5 Tourisme par RANG d'habitation (consommation +10 Nourriture
  //  par rang — appliquée dans consommationsVille, engine/habitations.ts).
  if (aTech(p, 'Surconsommation', C)) {
    let sci = 0, tour = 0
    for (const v of p.villes) {
      const r = rangNiveauVille(v, C)
      sci += 1 * r
      tour += 5 * r
    }
    if (sci > 0) add('Science', sci)
    if (tour > 0) add('Tourisme', tour)
  }
  // ── par aménagement (Champs / Rizières) ──
  const nbChamps = p.villes.reduce((n, v) => n + (v.amenagements ?? []).filter((a) => a === 'Champ' || a === 'Rizi\u00e8re').length, 0)
  if (nbChamps > 0) {
    if (aTech(p, 'Engrais naturels I', C)) add('Nourriture', 2 * nbChamps)
    if (aTech(p, 'Engrais naturels II', C)) add('Nourriture', 3 * nbChamps)
  }
  // ── Charues (21:a1) : champs +5 Nourriture et +1 Or par tour —──────────
  if (nbChamps > 0 && aTech(p, 'Charues', C)) {
    add('Nourriture', 5 * nbChamps)
    add('Or', 1 * nbChamps)
  }
  // ── par merveille : +1 Science chacune ──
  const nbMerveilles = p.villes.reduce((n, v) => n + v.batiments.filter((b) => (C.config.constructions ?? []).find((c) => c.nom === b)?.famille === 'Merveille').length, 0)
  if (nbMerveilles > 0 && aTech(p, 'Merveilleux', C)) add('Science', 1 * nbMerveilles)
  // Prix Gorback Nobel (+6 Science/ministre) : appliqué par le
  //  générique prodParTitre ci-dessous — codage en dur retiré
  //  (doublon détecté par l'audit 2026-10-16 : 12 au lieu de 6).
  // ── foires : +2 Or +2 Tourisme par Foire (Stands de goodies) ──
  const nbFoires = p.villes.reduce((n, v) => n + (v.amenagements ?? []).filter((a) => a === 'Foire').length, 0)
  if (nbFoires > 0 && aTech(p, 'Stands de goodies', C)) {
    add('Or', 2 * nbFoires)
    add('Tourisme', 2 * nbFoires)
  }
  // ── par FOIRE : +2 Tourisme (Fascination culturelle, 14:a1) ────────
  if (nbFoires > 0 && aTech(p, 'Fascination culturelle', C)) {
    add('Tourisme', 2 * nbFoires)
  }
  // ── par SITE ARCHÉOLOGIQUE : +8 Tourisme (Parcs naturels, 14:b2 —
  //  homonyme de 18:b2 mais effet différent ; aTech matche les deux
  //  par nom, l'effet ici est celui de l'arbre Tourisme) ─────────────
  const nbSitesArcheo = p.villes.reduce(
    (n, v) => n + (v.amenagements ?? []).filter((a) => a === 'site arch\u00e9ologique' || a === 'Site arch\u00e9ologique').length, 0)
  if (nbSitesArcheo > 0 && aTech(p, 'Parcs naturels', C)) {
    add('Tourisme', 8 * nbSitesArcheo)
  }
  // ── prodParTitre (générique, revue 2026-10-16) : « +N RESSOURCE par
  //  tour par TITULAIRE du titre X » — les techs du référentiel avec un
  //  effet { type: 'prodParTitre', montant, ressource, titre } sont
  //  appliquées pour TOUS leurs porteurs vivants. Corrige :
  //  · « Commerce lointain » : +3 Or/marchand ;
  //  · « Prix Gorback Nobel » : +6 Science/ministre ;
  //  · « Culte de la personnalité » : +30 Tourisme/ministre.
  const vivants = (state.population[p.n] ?? []).filter((c) => c.statut !== 'Décédé')
  const nbTitre = (titre: string): number =>
    vivants.filter((c) => c.titre === titre).length
  for (let i = 0; i < C.config.progres.length; i++) {
    const arbre = C.config.progres[i]
    const debloquees = new Set(p.progresDebloques ?? [])
    const techs: Array<{ effets?: Array<{ type?: string; montant?: number; ressource?: string; titre?: string }> | undefined }> = [
      ...(arbre.brancheA ?? []), ...(arbre.brancheB ?? []), ...(arbre.techC ? [arbre.techC] : []),
    ]
    techs.forEach((t, k) => {
      // clés de déblocage : a1|a2 (brancheA), b1|b2 (brancheB), c
      const nbA = (arbre.brancheA ?? []).length
      const nbB = (arbre.brancheB ?? []).length
      let slot = ''
      if (k < nbA) slot = `a${k + 1}`
      else if (k < nbA + nbB) slot = `b${k - nbA + 1}`
      else slot = 'c'
      if (!slot || !debloquees.has(`${i}:${slot}`)) return
      for (const e of t.effets ?? []) {
        if (e.type === 'prodParTitre' && e.titre && e.montant && e.ressource) {
          const n = nbTitre(e.titre)
          if (n > 0) add(e.ressource, e.montant * n)
        }
      }
    })
  }
  return out
}

function citesSuzerainesCount(state: GameState, p: Player): number {
  return (state.citesLibres ?? []).filter((c) => c.suzerain === p.n).length
}

/** One-shot au DÉBLOCAGE d'une technologie (appelé par ProgresView) :
 *  crédite Science / Or / Habitants / Émissaires et retourne un texte
 *  de log (vide = rien à créditer). */
export function gainDeblocageProgres(state: GameState, p: Player, nomTech: string): string {
  const credit = (res: string, v: number): string => {
    if (res === '\u00c9missaires') {
      p.emissaires = (p.emissaires ?? 0) + v
      return `+${v} \u00e9missaire(s) en r\u00e9serve`
    }
    if (res === 'Habitants') {
      const rs = p.resources['Habitants']
      if (rs) rs.stock += v
      return `+${v} Habitants`
    }
    const rs = p.resources[res]
    if (rs) rs.stock += v
    return `+${v} ${res}`
  }
  switch (nomTech) {
    case 'Progr\u00e8s technologiques I': return credit('Science', 6)
    case 'Progr\u00e8s technologiques II': return credit('Science', 10)
    case 'Progr\u00e8s technologiques III': return credit('Science', 14)
    case 'S\u00e9dentarisation': return credit('Habitants', 20)
    case 'Préfectures': {
      // Retour Thibaut 2026-10-15 : +15 habitants dans CHACUNE des
      //  villes du joueur (au moment du d\\u00e9blocage).
      return credit('Habitants', 15 * Math.max(1, p.villes.length))
    }
    case 'Greniers': return credit('Habitants', 40)
    case 'Une ville magnifique': return credit('Habitants', 20)
    case "Collecte d'imp\u00f4ts": return credit('Or', 20)
    case 'Recyclage': return credit('Or', 30)
    case 'Taxe n\u00e9c\u00e9ssaire I': return credit('Or', 250)
    case 'Taxes n\u00e9c\u00e9ssaire II': return credit('Or', 300)
    case '\u00c9missaires de cour': return credit('\u00c9missaires', 1)
    case 'Progrès du développement économique C': {
      // Revue 2026-10-16 : 50 Or par ministre en poste au déblocage
      //  (la montée de rang est gérée par ProgresView, qui a l'état).
      const nbMinistres = (state.population[p.n] ?? [])
        .filter((c) => c.statut !== 'Décédé' && c.titre === 'Ministre' && c.ministere).length
      return nbMinistres > 0 ? credit('Or', 50 * nbMinistres) : ''
    }
    case 'Geste': return credit('\u00c9missaires', 1)
    case 'Offrande': return credit('\u00c9missaires', 1)
    default: return ''
  }
}

/** Réduction de co\u00fbt d'un AM\u00c9NAGEMENT par les techs débloquées
 *  (somme, appliquée avant le plancher 0). */
export function reductionAmenagement(p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  const add = (res: string, v: number) => { out[res] = (out[res] ?? 0) + v }
  if (aTech(p, 'D\u00e9veloppement durable', C)) add('Bois', 1)
  if (aTech(p, 'D\u00e9veloppement \u00e9conome', C)) add('Or', 3)
  return out
}

/** Réduction de co\u00fbt d'une FONDATION d'habitation. */
export function reductionFondation(p: Player, C: Cfg, ville?: { proximite?: string }): Record<string, number> {
  const out: Record<string, number> = {}
  if (aTech(p, 'Colonialisme durable', C)) out['Bois'] = (out['Bois'] ?? 0) + 5
  if (aTech(p, 'Colonialisme \u00e9conome', C)) out['Or'] = (out['Or'] ?? 0) + 20
  // Expansion maritime (développement côtier) : côtières −3 Bois −3 Pierre.
  if (ville?.proximite === 'Mer' && aTech(p, 'Expansion maritime', C)) {
    out['Bois'] = (out['Bois'] ?? 0) + 3
    out['Pierre'] = (out['Pierre'] ?? 0) + 3
  }
  return out
}

/** Réduction de co\u00fbt d'un B\u00c2TIMENT. */
export function reductionBatiment(p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  if (aTech(p, 'Viser le ciel', C)) out['Or'] = (out['Or'] ?? 0) + 15
  return out
}

/** Réduction de co\u00fbt d'une LEV\u00c9E D'ARM\u00c9E (Or). */
export function reductionLevee(p: Player, C: Cfg): number {
  return aTech(p, 'Conscription I', C) ? 10 : 0
}

/** Garnison accordée par les techs débloquées à UNE ville
 *  (valeur d'état, intégrée à garnisonHabitationVille). */
export interface LigneGarnison { label: string; valeur: number }

export function garnisonProgresVille(p: Player, ville: City, C: Cfg): number {
  return lignesGarnisonProgresVille(p, ville, C).reduce((n, l) => n + l.valeur, 0)
}

/** Détail chiffré de la garnison des technologies d'une ville (une
 *  ligne par tech active — moteur et interface partagent le calcul). */
export function lignesGarnisonProgresVille(p: Player, ville: City, C: Cfg): LigneGarnison[] {
  const cap = capitaleDe(p)
  const estCap = cap?.nom === ville.nom
  const out: LigneGarnison[] = []
  if (aTech(p, 'Milices civiles I', C) && estCap) out.push({ label: 'Milices civiles I (capitale)', valeur: 30 })
  if (aTech(p, 'Fortifications solides', C)) out.push({ label: 'Fortifications solides', valeur: 15 })
  if (aTech(p, 'Milices civiles', C)) out.push({ label: 'Milices civiles (toutes habitations)', valeur: 30 })
  if (aTech(p, 'Muraille', C)) out.push({ label: 'Muraille', valeur: 40 })
  if (aTech(p, 'Progrès de la défense nationale A1', C)) out.push({ label: 'Défense nationale A1', valeur: 40 })
  if (aTech(p, 'Milices civiles III', C)) out.push({ label: 'Milices civiles III', valeur: 20 })
  if (aTech(p, 'Milices civiles V', C)) out.push({ label: 'Milices civiles V', valeur: 40 })
  if (aTech(p, 'Pr\u00e9 carr\u00e9', C)) out.push({ label: 'Pr\u00e9 carr\u00e9', valeur: 20 })
  if (aTech(p, 'Vasselit\u00e9', C) && p.vassalDe != null) out.push({ label: 'Vasselit\u00e9 (vassal)', valeur: 20 })
  return out
}

/** Garnison MINIMALE des habitations (retour Thibaut 2026-10-15) :
 *  « Combler les lacunes » — vos habitations ne peuvent avoir moins de
 *  30 Garnison. Retourne le plancher (0 si la tech n'est pas débloquée) ;
 *  garnisonHabitationVille prend le max. */
export function garnisonMinimaleProgres(p: Player, C: Cfg): number {
  return aTech(p, 'Combler les lacunes', C) ? 30 : 0
}

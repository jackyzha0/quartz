// ═══════════════════════════════════════════════════════════════════════════
//  REGISTRE DE RÈGLES — référentiel → banque d'effets (refactor 2026-10-18)
//
//  LA couche à éditer pour changer une règle : chaque entrée du
//  référentiel (bâtiment, aménagement, dogme…) est traduite en une
//  règle de banque (id stable + effets structurés). Les textes du
//  référentiel restent de l'AFFICHAGE ; les effets deviennent des
//  DONNÉES interprétées par la banque.
//
//  Migration progressive (strangle pattern) : aujourd'hui seules les
//  CONSTRUCTIONS (bâtiments + aménagements, table `constructions`)
//  sont traduites — leur format `effets` existant (marqueur (s)) se
//  mappe 1:1 sur la banque. Les autres sources (dogmes, factions…)
//  migrent ensuite une par une ; le moteur continue d'utiliser ses
//  fonctions historiques pour tout ce qui n'est pas encore migré.
// ═══════════════════════════════════════════════════════════════════════════

import type { ContexteEffet, Effet, RegleBanque, SourceRegle } from './types'
import { cfgOf } from '../engine/gameData'
import type { GameConfig } from '../config/defaultConfig'
import type { EffetConstruction } from '../config/defaultConfig'

/** Slug d'identifiant stable depuis un nom affiché (les accents et
 *  espaces deviennent des tirets) : 'Poste de garde' → 'poste-de-garde'.
 *  L'id reste stable même si le nom affiché change (l'id est dérivé une
 *  fois et stocké dans le registre, jamais recalculé depuis l'UI). */
function slug(nom: string): string {
  return nom
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

/** Traduit les effets STRUCTURÉS d'une construction (marqueur (s),
 *  format { ressource, quantite, ete? }) en effets de la banque.
 *  Règles de traduction (identiques au moteur historique — retour
 *  Thibaut 2026-10-16 : le Tourisme est un FLUX NORMAL) :
 *   · 'Garnison' → garnisonVille (valeur d'état, instantanée) ;
 *   · le reste (Tourisme compris) → fluxVille (production par tour),
 *     canal été si `ete`. */
export function effetsConstructionVersBanque(effets: EffetConstruction[]): Effet[] {
  const out: Effet[] = []
  for (const e of effets) {
    if (e.ressource === 'Garnison') {
      out.push({ type: 'garnisonVille', valeur: e.quantite })
    } else if (e.ete) {
      out.push({ type: 'fluxVille', ressource: e.ressource, valeur: e.quantite, ete: true })
    } else {
      out.push({ type: 'fluxVille', ressource: e.ressource, valeur: e.quantite })
    }
  }
  return out
}

/** Construit les règles de banque de TOUTES les constructions du
 *  référentiel qui portent des effets structurés (bâtiments +
 *  aménagements). Les entrées sans `effets` (texte seul) ne sont PAS
 *  migrées : le moteur historique continue de les analyser. */
export function reglesConstructions(config?: GameConfig): RegleBanque[] {
  const C = cfgOf(config)
  const refs = C.config.constructions ?? []
  const out: RegleBanque[] = []
  for (const ref of refs) {
    if (!ref.effets || ref.effets.length === 0) continue
    const source: SourceRegle = ref.famille === 'Merveille'
      ? 'merveille'
      : ref.categorie === 'Aménagement' ? 'amenagement' : 'batiment'
    out.push({
      id: `${source}.${slug(ref.nom)}`,
      source,
      nom: ref.nom,
      effets: effetsConstructionVersBanque(ref.effets),
    })
  }
  return out
}

/** Registre complet : toutes les règles migrées. Appelé par le moteur
 *  aux sites d'application (une fois par tour, cacheable). */
export function registreComplet(config?: GameConfig): RegleBanque[] {
  return [...reglesConstructions(config)]
  // Les sources suivantes migrent une par une (dogmes, factions…) :
  //  [...reglesConstructions(config), ...reglesDogmes(config), …]
}

/** Cache du registre par référence de config (les règles ne dépendent
 *  que du référentiel — recalculées seulement si la config change). */
let cacheRegles: { config: object; regles: RegleBanque[]; parNom: Map<string, RegleBanque> } | null = null

/** Règle de banque d'une construction PAR SON NOM (accès moteur).
 *  Retourne undefined si la construction n'a pas d'effets structurés
 *  (repli texte du moteur historique). */
export function reglePourConstruction(ref: { nom: string }, config?: GameConfig): RegleBanque | undefined {
  const cfg = config ?? undefined
  if (!cacheRegles || cacheRegles.config !== (cfg as object)) {
    const regles = reglesConstructions(cfg)
    cacheRegles = {
      config: cfg as object,
      regles,
      parNom: new Map(regles.map((r) => [r.nom, r])),
    }
  }
  return cacheRegles.parNom.get(ref.nom)
}

/** Contexte LECTURE SEULE pour évaluer les effets d'une construction
 *  hors partie (récapitulatifs, coûts, UI). Les effets des
 *  constructions sont inconditionnels : aucune condition (peuple,
 *  saison…) ne s'applique à cette source — le contexte factice ne
 *  fausse donc rien. Les types sont relâchés (unknown) car la
 *  production d'une ville ne dépend d'aucun champ du contexte. */
export function contexteLectureSeule(): ContexteEffet {
  return {
    state: {} as never,
    joueur: {} as never,
    saison: '',
  } as ContexteEffet
}

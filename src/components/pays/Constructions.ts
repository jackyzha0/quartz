// ══════════════════════════════════════════════════════════════════════
//  Page « Pays » — LOGIQUE DE CONSTRUCTION (extrait du monolithe
//  PlayerView.tsx, un fichier par UI) :
//   · faireConstruire : le mutateur « construire » (bâtiment /
//     aménagement) — garde-fous des règles (faction, capitale, type
//     Ville/Château, limites par famille, rang minimum, prérequis,
//     merveilles), réductions (technologies, Basiléens, Sylvains),
//     coût débité, règle de culture, recalcule du Tourisme, effet
//     one-shot des merveilles, déclenchement du Surintendant ;
//   · faireBatParFamille : les catégories du sélecteur « + Construire »
//     d'une ville (familles × rangs, merveilles par rang, alertes
//     rouges des limites — marqueur (y)).
//  Fonctions pures de fabrique : PlayerView/VilleCarte fournit l'état,
//  ces fabriques referment les closures.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player } from '../../engine/types'
import {
  effetsTourBatiment, coutBatiment, constructionsRefs, aCampDeBatisseurs,
  coutAmenagement, constructionRef, prerequisConstruction, detailGainsVille,
  parseCoutTexte, resumeConstruction,
  rangNiveau, batimentsConstructionsRefs, batimentsFaction, batimentsCapitale,
  capitaleDe, aMinistre,
} from '../../engine/engine'
import { cultureDef, type Cfg } from '../../engine/gameData'
import { statutMerveille, pastilleClass } from '../../engine/statutAuto'
import { effetImmediatMerveille } from '../../engine/merveilles'
import { reductionAmenagement, reductionBatiment, aTech } from '../../engine/progresAuto'
import { resynchroniserTourisme } from '../../engine/regimes'
import { regleActive } from '../../engine/factions'
import { fmt } from '../ui'
import type { PickerCategorie } from '../Picker'
import { FAM_BADGES, fmtCout, type ChoixSurintendant } from './pays-utils'

/** Fabrique le mutateur « construire » d'un joueur. */
export function faireConstruire(o: {
  update: (m: (s: GameState) => void) => void
  joueur: number
  C: Cfg
  setSurint: (v: ChoixSurintendant | null) => void
  setSurintRes: (v: string) => void
}) {
  const { update, joueur, C, setSurint, setSurintRes } = o
  const construire = (idx: number, nom: string, type: 'batiment' | 'amenagement', groupe?: string) =>
    update((s) => {
      const t = s.players.find((x) => x.n === joueur)
      const ville = t?.villes[idx]
      if (!t || !ville) return
      // Marqueur (a) : garde-fou — une ancienne sauvegarde peut avoir
      //  une ville sans tableau batiments/aménagements.
      if (!ville.batiments) ville.batiments = []
      if (!ville.amenagements) ville.amenagements = []
      // ── Restrictions des catégories de bâtiments ────────────────────
      // · bâtiment de faction : uniquement ceux du peuple du joueur ;
      // · bâtiment de capitale (groupe « Capitale ») : capitale uniquement.
      const ref = type === 'batiment' ? constructionRef(nom, C.config) : undefined
      const estCapitale = capitaleDe(t)?.nom === ville.nom
      // Aménagement de faction (marqueur (y)) : comme les bâtiments de
      //  faction, seuls ceux du PEUPLE du joueur sont constructibles.
      const aref = type === 'amenagement' ? constructionRef(nom, C.config) : undefined
      if (aref?.faction && aref.faction !== t.peuple) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `⚠ ${nom} est un aménagement de faction des ${aref.faction} — seuls ceux de ${t.peuple} sont prévus (construction quand même enregistrée).`,
        })
      }
      if (ref && ref.groupe === 'Capitale' && !estCapitale) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `⚠ ${nom} se construit normalement dans la capitale (${capitaleDe(t)?.nom ?? '—'}) — ici il est hors zone (construction quand même enregistrée).`,
        })
      }

      // Retour Thibaut 2026-10-15 : un bâtiment du groupe Ville ne se
      //  construit que dans une VILLE, du groupe Château que dans un
      //  CHÂTEAU (la vue filtre, ce garde-fou couvre les états
      //  importés/rebasés).
      if (ref && (ref.groupe === 'Ville' || ref.groupe === 'Château') && (ref.famille ?? '') !== 'Merveille') {
        const typeVilleActuel = (ville.type ?? 'Ville').toLowerCase()
        if (ref.groupe.toLowerCase() !== typeVilleActuel) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} est un bâtiment de ${ref.groupe} — il se construit normalement dans ce type d'habitation, pas dans ${ville.nom} (${ville.type ?? 'Ville'}). Construction quand même enregistrée.`,
          })
        }
      }

      // ── Limites de construction par FAMILLE (règles du classeur,
      //  retour Thibaut 2026-10-15) :
      //  · Militaire : aucune limite ;
      //  · Économique : 1 par RANG de la ville ;
      //  · Guilde : 1 par ville ;
      //  · Faction : 1 par ville (remplacement déjà géré) ;
      //  · Capitale : uniquement dans la capitale (géré ci-dessus) ;
      //  · MERVEILLE : rang d'habitation minimum requis + UNE seule
      //    par ville.
      const fam = ref?.famille ?? ''
      if (fam === 'Economique') {
        // « Urbanisme », Elfes d'Or « Cité d'Or » / « Palais des Dieux » :
        //  la capitale accueille un bâtiment supplémentaire (+1 slot
        //  économique de la capitale).
        const bonusCapitale =
          (aTech(t, 'Urbanisme', C) ? 1 : 0)
          + (t.peuple === "ELFES D'OR" && t.regleAge2 === "Cité d'Or" ? 1 : 0)
          + (t.peuple === "ELFES D'OR" && t.regleAge3 === 'Palais des Dieux' ? 1 : 0)
        const maxEco = rangNiveau(ville, C) + (estCapitale ? bonusCapitale : 0)
        const nbEco = ville.batiments.filter((b) => (constructionRef(b, C.config)?.famille ?? '') === 'Economique').length
        if (nbEco >= maxEco) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} : ${ville.nom} dépasse la limite d'un bâtiment Économique par rang (${nbEco}/${maxEco}). Construction quand même enregistrée.`,
          })
        }
      }
      if (fam === 'Guilde') {
        // Maitre des guildes (ministre, revue 2026-10-15) : la CAPITALE
        //  peut accueillir une Guilde supplementaire (limite 2).
        const maxGuildes = estCapitale && aMinistre(s, t, 'Maître des guildes') ? 2 : 1
        const nbGui = ville.batiments.filter((b) => (constructionRef(b, C.config)?.famille ?? '') === 'Guilde').length
        if (nbGui >= maxGuildes) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} : ${ville.nom} dépasse la limite de ${maxGuildes} Guilde(s)${maxGuildes > 1 ? ' (Maître des guildes)' : ''}. Construction quand même enregistrée.`,
          })
        }
      }
      // Rang d'habitation requis (retour Thibaut 2026-10-15) : un
      //  bâtiment du rang N ne se construit pas dans une habitation de
      //  rang inférieur (vérifie Militaire, Économique, Guilde ET
      //  Merveilles — la vue filtre déjà, ce garde-fou couvre les
      //  états importés/rebasés).
      if (ref && ref.rangMinHabitation && rangNiveau(ville, C) < ref.rangMinHabitation) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `⚠ ${nom} exige normalement une habitation de rang ${ref.rangMinHabitation} minimum (${ville.nom} est de rang ${rangNiveau(ville, C)}). Construction quand même enregistrée.`,
        })
      }
      // Prérequis de construction (revue 2026-10-16) : « X requis » dans
      //  le coût du référentiel (Caserne ← Poste de garde, Etable ←
      //  Grange…) — le prérequis doit être présent dans la MÊME ville.
      if (type === 'batiment') {
        const pre = prerequisConstruction(ref)
        if (pre && !ville.batiments.includes(pre)) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} exige normalement d'abord « ${pre} » dans ${ville.nom} (prérequis). Construction quand même enregistrée.`,
          })
        }
      }
      if (fam === 'Merveille') {
        const rangRequis = ref?.rangMinHabitation ?? 1
        if (rangNiveau(ville, C) < rangRequis) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} : cette merveille exige normalement une habitation de rang ${rangRequis} minimum (${ville.nom} est de rang ${rangNiveau(ville, C)}). Construction quand même enregistrée.`,
          })
        }
        const nbMerv = ville.batiments.filter((b) => (constructionRef(b, C.config)?.famille ?? '') === 'Merveille').length
        if (nbMerv >= 1) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} : ${ville.nom} possède déjà ${nbMerv} merveille(s) — la règle en prévoit une seule par ville. Construction quand même enregistrée.`,
          })
        }
      }
      if (ref?.faction && ref.faction !== t.peuple) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `⚠ ${nom} est un bâtiment de faction des ${ref.faction} — seuls ceux de ${t.peuple} sont prévus. Construction quand même enregistrée.`,
        })
      }
      const cout = type === 'batiment'
        ? coutBatiment(nom, C, groupe)
        : coutAmenagement(t, C.config, type === 'amenagement' ? nom : undefined)
      // Réductions des TECHNOLOGIES (revue 2026-10-15) :
      //  · Développement durable : aménagements −1 Bois ;
      //  · Développement économe : aménagements −3 Or ;
      //  · Viser le ciel : bâtiments −15 Or.
      if (type === 'amenagement') {
        for (const [r, v] of Object.entries(reductionAmenagement(t, C))) {
          if (cout[r] !== undefined) cout[r] = Math.max(0, cout[r] - v)
        }
      }
      if (type === 'batiment') {
        for (const [r, v] of Object.entries(reductionBatiment(t, C))) {
          if (cout[r] !== undefined) cout[r] = Math.max(0, cout[r] - v)
        }
      }
      // Basiléens « Heure de la prière » (Âge II, revue 2026-10-15) :
      //  bâtiments −3 Pierres à la construction (toutes familles).
      if (t.peuple === 'Basiléens' && t.regleAge2 === 'Heure de la prière' && type === 'batiment') {
        if (cout['Pierre'] !== undefined) cout['Pierre'] = Math.max(0, cout['Pierre'] - 3)
      }
      // SYLVAINS « Amis de la forêt » (revue 2026-10-16) : aucun coût en
      //  Bois — tous les coûts en Bois sont TRANSFORMÉS en Nourriture
      //  (et la Scierie n'est pas constructible chez eux).
      if (t.peuple === 'Sylvains' && regleActive(t, C, 'Amis de la for\u00eat')) {
        if (cout['Bois'] !== undefined) {
          cout['Nourriture'] = (cout['Nourriture'] ?? 0) + cout['Bois']
          delete cout['Bois']
        }
      }
      // Merveilles & progrès « Tourisme » (retour Thibaut 2026-10-15) :
      //  a.1 Trésor public : merveilles −20 Or ; a.2 Matériaux de
      //  prestige : merveilles −4 de CHAQUE ressource du coût
      //  (plancher 0). Techs débloquées du joueur, cumulables.
      if (ref?.famille === 'Merveille') {
        // Exposition universelle (ouverture culturelle) : merveilles de
        //  la CAPITALE −30 Or de plus.
        if (estCapitale && aTech(t, 'Exposition universelle', C) && cout['Or'] !== undefined) {
          cout['Or'] = Math.max(0, cout['Or'] - 30)
        }
        const debloquees = new Set(t.progresDebloques ?? [])
        const arbresT = C.config.progres.filter((a) => a.nom === 'Progrès du Tourisme')
        const possede = (nomTech: string) => {
          for (let ai = 0; ai < C.config.progres.length; ai++) {
            const a = C.config.progres[ai]
            if (a.nom !== 'Progrès du Tourisme') continue
            for (const slot of ['a1', 'a2', 'b1', 'b2', 'c'] as const) {
              const td = slot === 'c' ? a.techC : (slot[0] === 'a' ? a.brancheA : a.brancheB)[+slot[1] - 1]
              if (td?.nom === nomTech && debloquees.has(`${ai}:${slot}`)) return true
            }
          }
          return false
        }
        let reducOr = 0
        let reducParRessource = 0
        if (possede('Trésor public')) reducOr += 20
        if (possede('Matériaux de prestige')) reducParRessource += 4
        if (reducOr > 0 && cout['Or'] !== undefined) cout['Or'] = Math.max(0, cout['Or'] - reducOr)
        if (reducParRessource > 0) {
          for (const r of Object.keys(cout)) cout[r] = Math.max(0, cout[r] - reducParRessource)
        }
      }
      const cible = type === 'batiment'
        ? ville.batiments
        : (ville.amenagements ?? (ville.amenagements = []))
      // Un même BÂTIMENT ne se construit pas deux fois dans une ville ;
      //  en revanche un AMÉNAGEMENT peut être présent PLUSIEURS FOIS
      //  (plusieurs cases du même terrain, ex. 2 Champs) — chaque
      //  exemplaire produit ses effets (retour Thibaut 2026-10-14).
      // Revue 2026-10-16 : plus JAMAIS de blocage silencieux — le
      //  doublon s'annonce (le joueur peut vouloir dépasser les
      //  limites du référentiel en connaissance de cause).
      if (type === 'batiment' && cible.includes(nom)) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `⚠ ${nom} figure déjà à ${ville.nom} (le référentiel prévoit un seul exemplaire par ville). Construction quand même enregistrée.`,
        })
      }
      // Bâtiment de faction : UN par ville — le nouveau remplace l'ancien
      // (ex. Église → Grande Cathédrale → Palais du Palatinat).
      let remplace = ''
      if (type === 'batiment' && ref?.faction) {
        for (let i = ville.batiments.length - 1; i >= 0; i--) {
          const b = ville.batiments[i]
          if (b !== nom && constructionRef(b, C.config)?.faction) {
            remplace = b

            ville.batiments.splice(i, 1)
          }
        }
      }
      cible.push(nom)
      const parts: string[] = []
      for (const [res, v] of Object.entries(cout)) {
        const rs = t.resources[res]
        if (rs) rs.stock -= v
        if (v > 0) parts.push(`${fmt(v)} ${res}`)
      }
      // Règle de culture : ex. Déisme — +N Science par bâtiment construit
      // (champ paramétrable, onglets « Cultures & régimes »).
      const sci = type === 'batiment' ? (cultureDef(t.culture, C.config)?.scienceParConstruction ?? 0) : 0
      if (sci > 0) {
        const rsSci = t.resources['Science']
        if (rsSci) rsSci.stock += sci
      }
      // Tourisme (retour Thibaut 2026-10-16) : la construction monte
      //  la production Tourisme ; le stock est RECALCULÉ =
      //  production courante (jamais cumulé).
      resynchroniserTourisme(s, t, `${nom} construit(e) à ${ville.nom}`)
      // Merveille : effet one-shot à la construction (Antichambre
      //  +50 % Or, Jardins +40 Habitants, Palais conversions…).
      // Effets one-shot à la construction : MERVEILLES + Guilde des
      //  diplomates (+2 émissaires, retour Thibaut 2026-10-15).
      const mervTxt = ((ref?.famille ?? '') === 'Merveille' || nom === 'Guilde des diplomates')
        ? effetImmediatMerveille(s, t, nom) : ''
      s.log.push({
        turn: s.turn, type: 'Système', joueur: t.n,
        texte: `🏗 ${nom} construit(e) à ${ville.nom} — coût déduit du stock : ${parts.length ? parts.join(' + ') : 'gratuit'}${sci > 0 ? ` — règle de culture : +${fmt(sci)} Science` : ''}${remplace ? ` — remplace ${remplace} (bâtiment de faction de la ville)` : ''}${mervTxt}.`,
      })
      // Surintendant des finances (marqueur (y)) : « Après avoir
      //  construit un bâtiment, générez 1 Ressource de votre choix
      //  produite par l'habitation par rang de l'habitation » — on
      //  ouvre une carte de choix (ressources produites par les
      //  habitants + bâtiments de la ville, nouveau bâtiment inclus).
      if (type === 'batiment' && aMinistre(s, t, 'Surintendant des finances')) {
        const prodVille = new Set<string>()
        for (const r of Object.keys(detailGainsVille(s, t, ville, C).titres)) prodVille.add(r)
        for (const r of Object.keys(effetsTourBatiment(nom, C))) prodVille.add(r)
        const options = [...prodVille].filter((r) => t.resources[r] !== undefined)
        const qty = rangNiveau(ville, C)
        if (options.length > 0 && qty > 0) {
          setSurint({ idx, options, qty })
          setSurintRes(options[0])
        }
      }
    })
  return construire
}

/** Fabrique les catégories du sélecteur « + Construire » d'une ville
 *  (marqueur (y) : un bouton par famille, une catégorie par rang). */
export function faireBatParFamille(o: { state: GameState; p: Player; C: Cfg }): (ville: City) => PickerCategorie[] {
  const { state, p, C } = o
  const refs = constructionsRefs(C.config)
  const amRefs = refs.filter((r) => r.categorie === 'Aménagement')
  const batRefs = batimentsConstructionsRefs(C)
  // Bâtiments de faction du peuple du joueur + bâtiments de capitale
  // du référentiel (2 nouvelles catégories des cadres ville).
  const refsBatFaction = batimentsFaction(p, C)
  const refsBatCapitale = batimentsCapitale(C)
  const nomCapitale = capitaleDe(p)?.nom ?? ''
  /** Catégories de construction d'UNE ville par TYPE de bâtiment
   *  (marqueur (y), retour Thibaut : « peut-être même un bouton par
   *  type de bâtiment ») — arbitrage : les 5 FAMILLES du référentiel
   *  (Militaire, Economique, Guilde, Faction, Capitale). Contenu :
   *  bâtiments de ville / château hors faction, bâtiments de FACTION
   *  du peuple du joueur (ceux de capitale uniquement dans la
   *  capitale), bâtiments de CAPITALE pour la capitale uniquement.
   *  Chaque carte montre le coût ET la description du classeur. */
  /** Bâtiments constructibles pour UNE ville (retour Thibaut
   *  2026-10-15) : seuls les bâtiments du TYPE de la ville (Ville ou
   *  Château) s'affichent, et les MERVEILLES sont filtrées par le rang
   *  d'habitation disponible — avec une catégorie SÉPARÉE par rang
   *  (séparation visuelle nette). */
  const batParFamillePour = (ville: City): PickerCategorie[] => {
    const type = (ville.type ?? 'Ville').toLowerCase()
    const estCapitale = ville.nom === nomCapitale
    const rang = rangNiveau(ville, C)
    // Alerte rouge d'une construction (revue 2026-10-16 : les limites
    //  s'INDIQUENT en rouge dans le picker, elles ne bloquent jamais).
    const alertePour = (b: { nom: string; famille?: string; cout: string; faction?: string }): string => {
      const warns: string[] = []
      // Bâtiment de faction : la règle du classeur exige « une
      //  habitation de votre culture » — alerte si la ville est
      //  d'une autre culture (indicatif, jamais bloquant).
      if (b.faction && ville.culture && ville.culture !== p.culture) {
        warns.push(`Habitation de culture ${ville.culture} — la règle prévoit une habitation de votre culture (${p.culture}).`)
      }
      if (ville.batiments.includes(b.nom)) warns.push('Déjà construit dans cette ville (le référentiel prévoit un seul exemplaire).')
      const pre = prerequisConstruction(b)
      if (pre && !ville.batiments.includes(pre)) warns.push(`Prérequis manquant : ${pre}.`)
      const fam = b.famille ?? ''
      if (fam === 'Economique') {
        const nbEco = ville.batiments.filter((x) => (constructionRef(x, C.config)?.famille ?? '') === 'Economique').length
        const bonusCap = (aTech(p, 'Urbanisme', C) ? 1 : 0) + (estCapitale && p.peuple === "ELFES D'OR" && (p.regleAge2 === "Cité d'Or" || p.regleAge3 === 'Palais des Dieux') ? 1 : 0)
        const maxEco = rang + (estCapitale ? bonusCap : 0)
        if (nbEco >= maxEco) warns.push(`Limite Économique atteinte (${nbEco}/${maxEco} — un par rang).`)
      }
      if (fam === 'Guilde') {
        const nbGui = ville.batiments.filter((x) => (constructionRef(x, C.config)?.famille ?? '') === 'Guilde').length
        const maxGui = estCapitale && aMinistre(state, p, 'Maître des guildes') ? 2 : 1
        if (nbGui >= maxGui) warns.push(`Limite Guilde atteinte (${nbGui}/${maxGui} par ville).`)
      }
      if (fam === 'Merveille') {
        const nbMerv = ville.batiments.filter((x) => (constructionRef(x, C.config)?.famille ?? '') === 'Merveille').length
        if (nbMerv >= 1) warns.push(`${nbMerv} merveille(s) déjà présentes (une seule par ville).`)
      }
      return warns.join(' ')
    }
    // Les bâtiments de CAPITALE sont ajoutés explicitement plus bas (une
    //  seule fois) — okGroupe les EXCLUT pour éviter le doublon.
    const okGroupe = (b: { groupe: string; famille?: string }) =>
      b.groupe === 'Capitale' ? false
      // Les MERVEILLES se construisent dans les DEUX types d'habitation
      //  (Ville et Château) — leur description dit « Habitation rang
      //  1+/2+/3 » sans distinction de type.
      : (b.famille ?? '') === 'Merveille' ? true
      : b.groupe.toLowerCase() === type
    const eligibles = [
      ...batRefs.filter((b) => okGroupe(b) && !b.faction).map((b) => ({ b, groupe: b.groupe })),
      // Bâtiments de FACTION (bug 2026-10-17 : « toutes les villes ne
      //  peuvent pas les construire ») : le filtre de TYPE okGroupe
      //  (« Ville » seulement dans les villes de type Ville) leur
      //  était appliqué — or la règle du référentiel est « peut
      //  uniquement être construit dans une habitation de votre
      //  culture », SANS distinction Ville/Château. Ils sont donc
      //  proposés dans TOUTES les habitations du joueur ; l'alerte
      //  rouge signale une ville de culture différente (jamais
      //  bloquant, convention du jeu).
      ...refsBatFaction
        .filter((b) => b.groupe !== 'Capitale' || estCapitale)
        .map((b) => ({ b, groupe: 'Faction' })),
      ...(estCapitale ? refsBatCapitale.map((b) => ({ b, groupe: 'Capitale' })) : []),
    ]
    // Merveilles du groupe de la ville, triées par rang croissant —
    //  une catégorie par rang DISPONIBLE (les rangs supérieurs au
    //  rang de la ville sont masqués).
    const merveilles = batRefs
      .filter((b) => okGroupe(b) && (b.famille ?? '') === 'Merveille')
      .filter((b) => (b.rangMinHabitation ?? 1) <= rang)
      .sort((a, z) => (a.rangMinHabitation ?? 1) - (z.rangMinHabitation ?? 1))
    const merveillesParRang = new Map<number, typeof merveilles>()
    for (const m of merveilles) {
      const r = m.rangMinHabitation ?? 1
      if (!merveillesParRang.has(r)) merveillesParRang.set(r, [])
      merveillesParRang.get(r)!.push(m)
    }
    // Retour Thibaut 2026-10-15 : séparation par RANG D'HABITATION pour
    //  Militaire / Économique / Guilde — une catégorie par famille et
    //  par rang DISPONIBLE (les bâtiments de rang supérieur au rang de
    //  la ville sont masqués). Faction et Capitale restent par famille.
    const out: PickerCategorie[] = []
    const famillesRangees: Array<[string, string]> = [
      ['Militaire', 'Militaire'],
      ['Economique', 'Économique'],
      ['Guilde', 'Guilde'],
    ]
    for (const [fam, label] of famillesRangees) {
      // regrouper les bâtiments de la famille par rang
      const parRang = new Map<number, typeof eligibles>()
      for (const item of eligibles) {
        if ((item.b.famille ?? '') !== fam) continue
        const r = item.b.rangMinHabitation ?? 1
        if (r > rang) continue // rang non disponible → masqué
        if (!parRang.has(r)) parRang.set(r, [])
        parRang.get(r)!.push(item)
      }
      for (const [r, items] of [...parRang.entries()].sort((a, z) => a[0] - z[0])) {
        out.push({
          label: `${label} · rang ${r}${r > 1 ? '+' : ''}`,
          options: items.map(({ b, groupe }) => ({
            value: `${groupe}|${b.nom}`,
            titre: b.nom,
            droite: fmtCout(parseCoutTexte(b.cout)),
            alerte: alertePour(b) || undefined,
            description: [
              prerequisConstruction(b) ? `Prérequis : ${prerequisConstruction(b)} dans cette ville.` : '',
              resumeConstruction(b) || b.production || '',
              b.description,
            ].filter(Boolean).join('\n'),
            badge: FAM_BADGES[fam] ?? 'badge-info',
          })),
        })
      }
    }
    // Faction et Capitale : une catégorie par famille (sans rang)
    for (const [fam, label] of [['Faction', `Faction (${p.peuple})`], ['Capitale', 'Capitale']] as const) {
      const options = eligibles
        .filter(({ b }) => (b.famille ?? '') === fam)
        .map(({ b, groupe }) => ({
          value: `${groupe}|${b.nom}`,
          titre: b.nom,
          droite: fmtCout(parseCoutTexte(b.cout)),
          alerte: alertePour(b) || undefined,
          description: [
            prerequisConstruction(b) ? `Prérequis : ${prerequisConstruction(b)} dans cette ville.` : '',
            resumeConstruction(b) || b.production || '',
            b.description,
          ].filter(Boolean).join('\n'),
          badge: FAM_BADGES[fam] ?? 'badge-info',
        }))
      if (options.length > 0) out.push({ label, options })
    }
    // Une catégorie de merveilles PAR RANG (séparation visuelle) :
    //  « Merveilles · rang 1 », « Merveilles · rang 2 »…
    for (const [r, ms] of merveillesParRang) {
      out.push({
        label: `Merveilles · rang ${r}${r > 1 ? '+' : ''}`,
        options: ms.map((b) => ({
          value: `${b.groupe}|${b.nom}`,
          titre: b.nom,
          badge: pastilleClass(statutMerveille(b.nom)),
          droite: fmtCout(parseCoutTexte(b.cout)),
          alerte: alertePour(b) || undefined,
          description: [
            prerequisConstruction(b) ? `Prérequis : ${prerequisConstruction(b)} dans cette ville.` : '',
            resumeConstruction(b) || b.production || '',
            b.description,
          ].filter(Boolean).join('\n'),
        })),
      })
    }
    return out
  }
  return batParFamillePour
}

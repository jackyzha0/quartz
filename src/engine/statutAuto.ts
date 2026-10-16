// ═══════════════════════════════════════════════════════════════════════
//  STATUT D'AUTOMATISME (retour Thibaut 2026-10-15) : pastille VERT /
//  JAUNE / ROUGE sur chaque règle affichée dans le jeu.
//    'auto'       (vert)   : appliqué automatiquement par le moteur ;
//    'possible'   (jaune)  : automatisable mais pas encore codé ;
//    'impossible' (rouge)  : exige le plateau ou un choix humain.
// ═════════════════════════════════════════════════════════════════════

export type StatutAuto = 'auto' | 'possible' | 'impossible'

/** Technologies : statut d'automatisme par nom. */
const TECHS: Record<string, StatutAuto> = {
  // ── VERT : flux, one-shots, réductions, garnisons (progresAuto.ts) ──
  'Comprendre la soie': 'auto', 'Etude astronomique': 'auto', 'Lumi\u00e8re': 'auto',
  'D\u00e9forestation': 'auto', 'Carrieristes': 'auto', 'Organisation fiscale': 'auto',
  'Granges': 'auto', 'Usinage': 'auto', 'Garde suzeraine': 'auto', 'Patronage': 'auto',
  'Assembl\u00e9es scientifiques': 'auto', 'Technologies futures II': 'auto',
  'Cours de p\u00eache': 'auto', 'Commerce maritime I': 'auto',
  'Engrais naturels I': 'auto', 'Engrais naturels II': 'auto',
  'Merveilleux': 'auto', 'Prix Gorback Nobel': 'auto', 'Stands de goodies': 'auto',
  'Progr\u00e8s technologiques I': 'auto', 'Progr\u00e8s technologiques II': 'auto',
  'Progr\u00e8s technologiques III': 'auto', 'S\u00e9dentarisation': 'auto',
  'Pr\u00e9fectures': 'auto', 'Greniers': 'auto', 'Recyclage': 'auto',
  'Taxe n\u00e9c\u00e9ssaire I': 'auto', 'Taxes n\u00e9c\u00e9ssaire II': 'auto',
  '\u00c9missaires de cour': 'auto', 'Geste': 'auto', 'Offrande': 'auto',
  'D\u00e9veloppement durable': 'auto', 'D\u00e9veloppement \u00e9conome': 'auto',
  'Colonialisme durable': 'auto', 'Colonialisme \u00e9conome': 'auto',
  'Viser le ciel': 'auto', 'Conscription I': 'auto',
  'Milices civiles I': 'auto', 'Fortifications solides': 'auto',
  'Milices civiles III': 'auto', 'Milices civiles V': 'auto',
  'Pr\u00e9 carr\u00e9': 'auto', 'Vasselit\u00e9': 'auto',
  'Grande arm\u00e9e': 'auto', "L'Art de la Guerre": 'auto', 'Collecte d\'imp\u00f4ts': 'auto',
  // ── ROUGE : plateau / non mod\u00e9lis\u00e9 ──
  'P\u00eache de culture': 'auto', 'Expansion maritime': 'auto',
  'Rations': 'impossible', 'Service militaire': 'impossible',
  // Revue 2026-10-16 (techs manquantes) : Muraille et Défense
  //  nationale A1 = garnisons automatiques ; éco C = rang + Or
  //  automatiques ; futur C = ministre supplémentaire (avertissement).
  'Muraille': 'auto', 'Progrès de la défense nationale A1': 'auto',
  'Progrès du développement économique C': 'auto',
  'Progrès du développement futur C': 'auto',
  // Art de la Guerre : choix de liste APRÈS l'adversaire — plateau.
  'Art de la Guerre': 'impossible',
  'Raliement ! I': 'impossible', 'Strat\u00e9gies militaires I': 'auto',
  'Eriger des murs': 'impossible', 'Quadrilat\u00e8re strat\u00e9gique': 'impossible',
  'Conqu\u00eate maritime': 'impossible', 'D\u00e9l\u00e9gation': 'impossible', 'Ambassade': 'impossible',
  'Vassalisation': 'impossible',
  'Identit\u00e9 commune': 'auto', 'Une ville magnifique': 'auto', 'Identit\u00e9 statique': 'auto',
  'Gestion de crise': 'impossible', 'Combler les lacunes': 'auto',
  'Fascination culturelle': 'auto', 'Safaris': 'impossible', 'Parcs naturels': 'auto',
  'Grande arm\u00e9e I': 'auto', 'Corps d\'arm\u00e9e': 'possible', 'Croisade': 'impossible',
  'Barrage': 'impossible', 'Projet anti incendie': 'impossible',
  'Assembl\u00e9e de penseurs': 'auto', 'Assembl\u00e9e de savants': 'auto',
  'Charues': 'auto', 'Surconsommation': 'auto',
  'Culte de la personnalit\u00e9': 'auto', 'Urbanisme': 'auto',
  'R\u00e9servistes': 'possible', 'Exposition universelle': 'auto',
}

/** Statut d'une TECHNOLOGIE par son nom (d\u00e9faut : possible). */
export function statutTech(nom: string): StatutAuto {
  return TECHS[nom] ?? 'possible'
}

/** Statut d'un MINISTRE par son mode du r\u00e9f\u00e9rentiel. */
export function statutMinistre(mode: string | undefined): StatutAuto {
  // 'Auto' = appliqu\u00e9 ; 'Plateau' = reste au plateau (Mar\u00e9chal : +1 PM,
  //  non mod\u00e9lis\u00e9 \u2014 impossible).
  return mode === 'Auto' ? 'auto' : 'impossible'
}

/** Statut d'une MERVEILLE par son nom. */
export function statutMerveille(nom: string): StatutAuto {
  switch (nom) {
    case 'Sanctuaire de Salmodiva': return 'auto'
    case "Jardins d'Alexandrie": return 'auto'
    case 'Mont Caracole': return 'possible'
    case 'Grands bains': return 'possible'
    case 'Temple de Bahamutt': return 'auto'
    case "Mus\u00e9e d'Arch\u00e9ologie": return 'auto'
    case 'Tour de Crystal': return 'auto'
    case "Antichambre d'Alexandrie": return 'auto'
    case 'Antre de la d\u00e9esse araign\u00e9e': return 'auto'
    case "Laboratoire d'exp\u00e9rimentations de Falheim": return 'auto'
    case 'Ordre des chevaliers de Notan': return 'possible'
    case 'Palais des empereurs de Lun': return 'auto'
    default: return 'possible'
  }
}

/** Statut d'une R\u00c8GLE DE FACTION par peuple + nom. */
const FACTIONS: Record<string, StatutAuto> = {
  // Basil\u00e9ens
  'Basil\u00e9ens|Paysans d\u00e9vou\u00e9s': 'auto',
  'Basil\u00e9ens|Temps de paix': 'auto',
  'Basil\u00e9ens|Distribution des richesses': 'auto',
  'Basil\u00e9ens|Heure de la pri\u00e8re': 'auto',
  'Basil\u00e9ens|\u00c9missaires efficaces': 'auto',
  'Basil\u00e9ens|Suzerainet\u00e9': 'auto',
  'Basil\u00e9ens|H\u00e9ritage familial': 'auto',
  'Basil\u00e9ens|Abuser des serfs': 'auto',
  // Peaux Vertes
  'PEAUX VERTES|Barbares primitifs': 'auto',
  'PEAUX VERTES|Union du klan !': 'impossible',
  'PEAUX VERTES|Diriger par la peur': 'auto',
  'PEAUX VERTES|Moa tap\u00e9 Toa': 'impossible',
  'PEAUX VERTES|C\u00e9 partou \u00e0 nou !': 'auto',
  'PEAUX VERTES|Tous avek moa !': 'auto',
  'PEAUX VERTES|Donn\u00e9 \u00e0 mang\u00e9': 'auto',
  'PEAUX VERTES|Multiculturalisme': 'impossible',
  // Elfes d'Or
  "ELFES D'OR|L\u00e0 avant les autres": 'auto',
  "ELFES D'OR|Accros \u00e0 la magie": 'auto',
  "ELFES D'OR|Savoir ancestral": 'auto',
  "ELFES D'OR|Cit\u00e9 d'Or": 'auto',
  "ELFES D'OR|\u00c9levage d'esclaves": 'impossible',
  "ELFES D'OR|Puit d'Or": 'auto',
  "ELFES D'OR|Palais des Dieux": 'auto',
  "ELFES D'OR|Opulence": 'impossible',
  // Sylvains
  'Sylvains|Sentiers stables': 'impossible',
  'Sylvains|Amis de la for\u00eat': 'impossible',
  'Sylvains|Don de miel': 'auto',
  'Sylvains|Vengeance de la terre': 'auto',
  'Sylvains|Biblioth\u00e8que enfouie': 'auto',
  "Sylvains|Enclave d'\u00e9meraude": 'auto',
  'Sylvains|Racines du monde': 'impossible',
  'Sylvains|Savoir ancestral': 'auto',
  // Norls
  'NORLS|Vivre de la terre': 'impossible',
  'NORLS|Nomades': 'auto',
  'NORLS|Savoir chamanique': 'auto',
  "NORLS|L'art du viking": 'auto',
  'NORLS|La course \u00e0 la mer': 'auto',
  'NORLS|Conqu\u00eate territoriale': 'auto',
  'NORLS|Arm\u00e9es des traditions': 'auto',
  'NORLS|Grands explorateurs': 'impossible',
  // Vermines de Kaoss
  'VERMINES DE KAOSS|Un chef plus intelligent': 'auto',
  'VERMINES DE KAOSS|Colonies souterraines': 'impossible',
  'VERMINES DE KAOSS|March\u00e9 noir': 'impossible',
  'VERMINES DE KAOSS|Infestation': 'impossible',
  'VERMINES DE KAOSS|Colonies d\'esclaves': 'impossible',
  'VERMINES DE KAOSS|Grouiller partout': 'impossible',
  'VERMINES DE KAOSS|Murmurer \u00e0 leurs oreilles': 'impossible',
  'VERMINES DE KAOSS|\u00c9tudier leur mani\u00e8re de faire': 'impossible',
}

export function statutFaction(peuple: string, regle: string): StatutAuto {
  return FACTIONS[`${peuple}|${regle}`] ?? 'possible'
}

/** Classe CSS d'un statut. */
export function pastilleClass(st: StatutAuto): string {
  return st === 'auto' ? 'p-auto' : st === 'possible' ? 'p-possible' : 'p-impossible'
}

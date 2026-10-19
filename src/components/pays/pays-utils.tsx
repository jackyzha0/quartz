// ══════════════════════════════════════════════════════════════════════
//  Page « Pays » — helpers et petits composants PARTAGÉS par les cartes
//  de src/components/pays/ (extraction du monolithe PlayerView, un
//  fichier par UI). Rien de nouveau ici : ce sont exactement les
//  helpers qui vivaient en bas de PlayerView.tsx.
// ══════════════════════════════════════════════════════════════════════

import type React from 'react'
import { fmt } from '../ui'
import type { Cfg } from '../../engine/gameData'

/** Choix en attente du Surintendant des finances (marqueur (y)) :
 *  après la construction d'un bâtiment, 1 ressource au choix × rang
 *  de l'habitation — carte éphémère portée par PlayerView. */
export interface ChoixSurintendant {
  idx: number
  options: string[]
  qty: number
}

export const ORIGINE_LABEL: Record<string, string> = {
  base: 'rang', 'bâtiment': 'bâtiment', technologie: 'techno', régime: 'régime',
  ministre: 'ministre',
}

export const RESSOURCES_ETAT = ['Garnison']
/** Ressources des récaps de production. Le Tourisme y figure comme
 *  le Bois (retour Thibaut 2026-10-16 : production affichée partout,
 *  canaux, tableaux de ville et de tour) — seule différence : le
 *  stock n'est jamais cumulé, il est recalculé = production à chaque
 *  fin de tour. Habitants est un effectif, Garnison une valeur
 *  d'état : exclus. */
export const RESSOURCES_FLUX = (C: Cfg): string[] => C.ressources.filter((r) => r !== 'Habitants' && r !== 'Garnison')

/** Classe de pastille par FAMILLE de bâtiment (retour Thibaut, marqueur
 *  (r)) : rouge Militaire, jaune Economique, bleu Capitale, violet
 *  Guilde (couleur de Guilde arbitrée par Vibe — à modifier dans
 *  styles.css si Thibaut préfère autre chose). La famille « Faction »
 *  a été retirée le 2026-10-19 avec le système de faction. */
export const FAM_BADGES: Record<string, string> = {
  Militaire: 'badge-fam-mil',
  Economique: 'badge-fam-eco',
  Capitale: 'badge-fam-cap',
  Guilde: 'badge-fam-gui',
  Merveille: 'badge-fam-merv',
}
export function fmtEffets(effets: Record<string, number>, C: Cfg): string {
  const entries = Object.entries(effets).filter(([, v]) => v !== 0)
    .sort((a, b) => C.ressources.indexOf(a[0]) - C.ressources.indexOf(b[0]))
  if (entries.length === 0) return '—'
  return entries.map(([r, v]) => {
    const etat = RESSOURCES_ETAT.includes(r)
    return `${!etat && v > 0 ? '+' : ''}${fmt(v)} ${r}`
  }).join(', ')
}

/** Formate un coût de construction : « 25 Or + 4 Fer ». */
export function fmtCout(cout: Record<string, number>): string {
  const entries = Object.entries(cout).filter(([, v]) => v > 0)
  if (entries.length === 0) return 'gratuit'
  return entries.map(([r, v]) => `${fmt(v)} ${r}`).join(' + ')
}

/** Nombre avec signe explicite pour le récap (0 = —). */
export function fmtNum(v: number): string {
  return v === 0 ? '—' : `${v > 0 ? '+' : ''}${fmt(v)}`
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  )
}


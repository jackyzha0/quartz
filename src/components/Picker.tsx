// ══════════════════════════════════════════════════════════════════════
//  CHOICE PICKER — sélecteur à CATÉGORIES + DESCRIPTIONS
//  (marqueur (y), retour Thibaut 2026-10-15) : « tous les onglets
//  déroulants lors du choix d'un aménagement, d'un bâtiment, de la
//  nomination d'un ministre, attribution d'un titre… il faut afficher
//  la description à chaque fois pour aider les joueurs à choisir, et
//  séparer en catégories ».
//  Un bouton ouvre un panneau : boutons de CATÉGORIE en haut, cartes
//  « nom + coût + description » en dessous ; un clic sur une carte
//  choisit et referme. Les catégories vides sont masquées.
// ══════════════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react'
import { Button } from './ui'

export interface PickerOption {
  /** valeur renvoyée au choix */
  value: string
  /** nom affiché en tête de carte */
  titre: string
  /** texte court à droite du nom (coût, production…) */
  droite?: string
  /** description complète (règle du classeur) affichée sous le nom */
  description?: string
  /** classe du badge de famille (badge-fam-mil…) — optionnel */
  badge?: string
  /** avertissement rouge affiché en tête de description (revue
   *  2026-10-16 : les limites s'INDIQUENT, elles ne bloquent jamais) */
  alerte?: string
}

export interface PickerCategorie {
  label: string
  options: PickerOption[]
}

/** Sélecteur à catégories et descriptions. `bouton` est le libellé du
 *  bouton qui ouvre le panneau (ex. « + Construire… »). `onPick`
 *  reçoit la valeur de la carte cliquée. */
export function ChoicePicker({ bouton, categories, onPick, disabled }: {
  bouton: string
  categories: PickerCategorie[]
  onPick: (v: string) => void
  disabled?: boolean
}) {
  const [ouvert, setOuvert] = useState(false)
  const [cat, setCat] = useState(0)
  const visibles = categories.filter((c) => c.options.length > 0)
  // Popup modal (retour Thibaut) : la page ne scrolle plus quand une
  // carte de choix est ouverte — overlay fixe, scroll INTERNE à la
  // fenêtre, fermeture par ✕, clic sur le fond ou touche Échap.
  useEffect(() => {
    if (!ouvert) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOuvert(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [ouvert])
  if (!ouvert || visibles.length === 0) {
    return (
      <Button tone="primary" disabled={disabled || visibles.length === 0} onClick={() => setOuvert(true)}>
        {bouton}
      </Button>
    )
  }
  const idx = Math.min(cat, visibles.length - 1)
  const cur = visibles[idx]
  return (
    <div className="picker-overlay" onClick={() => setOuvert(false)}>
      <div className="picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="picker-head">
          <strong>{bouton.replace(/^\+\s*/, '')}</strong>
          <button className="btn btn-small" title="Fermer" onClick={() => setOuvert(false)}>
            ✕
          </button>
        </div>
        <div className="picker-cats">
          {visibles.map((c, i) => (
            <button
              key={c.label}
              className={`tab ${i === idx ? 'tab-active' : ''}`}
              onClick={() => setCat(i)}
            >
              {c.label} ({c.options.length})
            </button>
          ))}
        </div>
        <div className="picker-grid">
          {cur.options.map((o) => (
            <button
              key={o.value}
              className="picker-card"
              onClick={() => { setOuvert(false); onPick(o.value) }}
            >
              <span className="picker-titre">
                {o.badge && <span className={o.badge} style={{ marginRight: 6 }}>●</span>}
                <strong>{o.titre}</strong>
                {o.droite && <span className="picker-droite">{o.droite}</span>}
              </span>
              {o.alerte && <span className="picker-desc neg">⚠ {o.alerte}</span>}
              {o.description && <span className="picker-desc">{o.description}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

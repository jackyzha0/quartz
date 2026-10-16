// ══════════════════════════════════════════════════════════════════════
//  Briques d'interface partagées
// ══════════════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react'

export function fmt(n: number, decimals = 1): string {
  if (!isFinite(n)) return '—'
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  }).format(n)
}

export function Card({ title, children, right }: {
  title?: React.ReactNode
  children: React.ReactNode
  right?: React.ReactNode
}) {
  return (
    <div className="card">
      {title && (
        <div className="card-head">
          <h3>{title}</h3>
          {right && <div className="card-right">{right}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

export function Field({ label, children, hint }: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  )
}

/**
 * Champ texte à état LOCAL (optimisation frappe 2026-10-16) : la
 * saisie ne déclenche PAS le store — chaque caractère ne clone plus
 * l'état entier (~34 ms à 16 000 habitants). La valeur remonte au
 * store quand le champ est QUITTÉ (blur) ou validé (Entrée).
 * L'affichage suit les changements externes tant que l'utilisateur
 * n'est pas en train d'écrire (focus actif).
 */
export function TextInput({ value, onChange, placeholder, disabled }: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  disabled?: boolean
}) {
  const [local, setLocal] = React.useState(value)
  const [focused, setFocused] = React.useState(false)
  React.useEffect(() => { if (!focused) setLocal(value) }, [value, focused])
  const commit = () => { if (local !== value) onChange(local) }
  return (
    <input
      type="text"
      className="input"
      value={local}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => setLocal(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => { setFocused(false); commit() }}
      onKeyDown={(e) => { if (e.key === 'Enter') { commit(); (e.target as HTMLInputElement).blur() } }}
    />
  )
}

/** Saisie numérique tolérante : édition libre en chaîne, commit au blur/change. */
export function NumberInput({ value, onChange, step = 1, min, max }: {
  value: number
  onChange: (v: number) => void
  step?: number
  min?: number
  max?: number
}) {
  const [text, setText] = useState<string>(String(value))
  useEffect(() => {
    // pendant la saisie (focus), ne pas écraser le texte local
    if (focused) return
    const parsed = parseFloat(text.replace(',', '.'))
    if (!isNaN(parsed) && parsed !== value) setText(String(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const commit = (t: string) => {
    const parsed = parseFloat(t.replace(',', '.'))
    if (isNaN(parsed)) return
    let v = parsed
    if (min !== undefined) v = Math.max(min, v)
    if (max !== undefined) v = Math.min(max, v)
    onChange(v)
  }
  // OPTIMISATION FRAPPE 2026-10-16 : le commit (onChange → store,
  //  clone de l'état entier ~34 ms) ne se fait plus À CHAQUE
  //  caractère mais au BLUR / Entrée — la saisie est instantanée.
  const [focused, setFocused] = useState(false)
  return (
    <input
      type="number"
      className="input num"
      step={step}
      value={text}
      onChange={(e) => { setText(e.target.value) }}
      onFocus={() => setFocused(true)}
      onBlur={() => { setFocused(false); commit(text) }}
      onKeyDown={(e) => { if (e.key === 'Enter') { commit(text); (e.target as HTMLInputElement).blur() } }}
    />
  )
}

export function Select<T extends string>({ value, options, groups, onChange, disabled }: {
  value: T
  options?: { value: T; label: string }[]
  groups?: { label: string; options: { value: T; label: string }[] }[]
  onChange: (v: T) => void
  disabled?: boolean
}) {
  return (
    <select
      className="input"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as T)}
    >
      {(options ?? []).map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
      {(groups ?? []).map((g) => (
        <optgroup key={g.label} label={g.label}>
          {g.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}

export function Badge({ children, tone = 'neutral' }: {
  children: React.ReactNode
  tone?: 'neutral' | 'good' | 'bad' | 'warn' | 'info'
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function Button({ children, onClick, tone = 'normal', disabled, title }: {
  children: React.ReactNode
  onClick?: () => void
  tone?: 'normal' | 'primary' | 'danger'
  disabled?: boolean
  title?: string
}) {
  return (
    <button
      className={`btn btn-${tone}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  )
}

export const TAX_OPTIONS = [
  { value: 'Faible' as const, label: 'Faible (×0,5 sur toutes les ressources / ×1,5 naissances)' },
  { value: 'Moyenne' as const, label: 'Moyenne (×1 / ×1)' },
  { value: 'Forte' as const, label: 'Forte (×1,5 sur toutes les ressources / ×0,5 naissances)' },
]

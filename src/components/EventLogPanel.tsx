// ══════════════════════════════════════════════════════════════════════
//  Journal des événements (filtrable par type et joueur)
// ══════════════════════════════════════════════════════════════════════

import { useMemo, useState } from 'react'
import { useGame } from '../state/store'
import type { LogEntry } from '../engine/types'
import { Card, Select } from './ui'

const TYPES = ['Événement', 'Dynastie', 'Crise', 'Naissance', 'Décès', 'Mariage', 'Métier', 'Titre', 'Armée', 'Culture', 'Commerce', 'Système']

export function EventLogPanel() {
  const { state } = useGame()
  const [type, setType] = useState('')
  const [joueur, setJoueur] = useState('')

  const entries = useMemo(() => {
    if (!state) return []
    let list = [...state.log].reverse()
    if (type) list = list.filter((e) => e.type === type)
    if (joueur) list = list.filter((e) => e.joueur !== null && String(e.joueur) === joueur)
    return list.slice(0, 500)
  }, [state, type, joueur])

  if (!state) return null

  return (
    <Card title="Journal de campagne (tours récents d'abord)">
      <div className="filters">
        <Select value={type} options={[{ value: '', label: 'Tous types' }, ...TYPES.map((t) => ({ value: t, label: t }))]} onChange={setType} />
        <Select value={joueur} options={[{ value: '', label: 'Tous les joueurs' }, ...state.players.map((p) => ({ value: String(p.n), label: p.nom }))]} onChange={setJoueur} />
      </div>
      <div className="log">
        {entries.map((e: LogEntry, i: number) => (
          <div key={i} className={`log-line log-${e.type.toLowerCase()}`}>
            <span className="log-turn">T{e.turn}</span>
            <span className={`badge ${badgeClass(e.type)}`}>{e.type}</span>
            {e.joueur !== null && <span className="muted">J{e.joueur} ·</span>}
            <span>{e.texte}</span>
          </div>
        ))}
        {entries.length === 0 && <p className="muted">Aucune entrée.</p>}
      </div>
    </Card>
  )
}

function badgeClass(type: string): string {
  if (type === 'Événement') return 'badge-warn'
  if (type === 'Crise') return 'badge-bad'
  if (type === 'Naissance') return 'badge-good'
  if (type === 'Mariage') return 'badge-good'
  return 'badge-neutral'
}

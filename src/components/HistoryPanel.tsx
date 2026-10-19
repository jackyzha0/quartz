// ══════════════════════════════════════════════════════════════════════
//  Historique : courbes d'évolution des ressources (SVG, sans dépendance)
//  Équivalent de RefreshEvolCharts / _Historique.
// ══════════════════════════════════════════════════════════════════════

import { useMemo, useState } from 'react'
import { useGame } from '../state/store'
import { cfgOf, couleurJoueur } from '../engine/gameData'
import { Card, Select, fmt } from './ui'

export function HistoryPanel() {
  const { state } = useGame()
  const C = state ? cfgOf(state.config) : undefined
  const RESOURCES = state ? cfgOf(state.config).ressources : cfgOf(undefined).ressources
  const [res, setRes] = useState('Or')
  const [mode, setMode] = useState<'stocks' | 'prods'>('stocks')

  const data = useMemo(() => {
    if (!state) return null
    const turns = [...new Set(state.history.map((h) => h.turn))].sort((a, b) => a - b)
    const series = state.players.map((p) => ({
      nom: p.nom,
      n: p.n,
      points: turns.map((t) => {
        const row = state.history.find((h) => h.turn === t && h.joueur === p.n)
        return row ? row[mode][res] ?? 0 : 0
      }),
    }))
    const all = series.flatMap((s) => s.points)
    const max = Math.max(1, ...all)
    const min = Math.min(0, ...all)
    return { turns, series, max, min }
  }, [state, res, mode])

  if (!state || !data) return null
  const W = 760
  const H = 300
  const pad = 34
  const n = data.turns.length

  const x = (i: number) => pad + (n > 1 ? ((W - 2 * pad) * i) / (n - 1) : 0)
  const y = (v: number) => H - pad - ((H - 2 * pad) * (v - data.min)) / Math.max(1, data.max - data.min)

  return (
    <Card title="Évolution des ressources (feuille _Historique)">
      <div className="filters">
        <Select value={res} options={RESOURCES.map((r) => ({ value: r, label: r }))} onChange={setRes} />
        <Select value={mode} options={[
          { value: 'stocks', label: 'Stock' },
          { value: 'prods', label: 'Production / tour' },
        ]} onChange={(v) => setMode(v as 'stocks' | 'prods')} />
      </div>
      {n < 2 ? (
        <p className="muted">Lancez au moins deux tours pour voir les courbes se tracer.</p>
      ) : (
        <svg viewBox={`0 0 ${W} ${H}`} className="chart">
          <line x1={pad} y1={y(0)} x2={W - pad} y2={y(0)} className="chart-axis" />
          {data.series.map((s) => (
            <polyline
              key={s.nom}
              fill="none"
              stroke={couleurJoueur(s.n, C)}
              strokeWidth="2"
              points={s.points.map((v, i) => `${x(i)},${y(v)}`).join(' ')}
            />
          ))}
          {data.turns.map((t, i) =>
            i % Math.max(1, Math.ceil(n / 12)) === 0 ? (
              <text key={t} x={x(i)} y={H - 10} textAnchor="middle" className="chart-label">T{t}</text>
            ) : null,
          )}
          <text x={pad} y={18} className="chart-label">max {fmt(data.max)}</text>
        </svg>
      )}
      <div className="legend">
        {data.series.map((s) => (
          <span key={s.nom} className="legend-item">
            <span className="dot" style={{ background: couleurJoueur(s.n, C) }} />
            {s.nom}
          </span>
        ))}
      </div>
    </Card>
  )
}

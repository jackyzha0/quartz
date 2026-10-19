// ══════════════════════════════════════════════════════════════════════
//  Barre Ressources — flottante en haut de page Pays, OUVERTE par
//  défaut, minimaliste : une puce par ressource (stock modifiable +
//  production / tour), réglage avancé replié, bouton ▼/▲ à droite.
//  (Extrait de PlayerView.tsx — un fichier par UI.)
// ══════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from 'react'
import type { GameState, Player } from '../../engine/types'
import { fondRessource, type Cfg } from '../../engine/gameData'
import type { ProductionDetail } from '../../engine/engine'
import { NumberInput } from '../ui'
import { fmtNum } from './pays-utils'
export function RessourcesBar({ p, C, prodDetail, setPlayer }: {
  p: Player
  C: Cfg
  prodDetail: ProductionDetail
  setPlayer: (fn: (p: Player, s: GameState) => void) => void
}) {
  const [ouvert, setOuvert] = useState(true)
  const [baseOuvert, setBaseOuvert] = useState(false)
  // Pinnage au scroll (retour Thibaut 2026-10-14) : dès que la page
  // dépasse la position naturelle de la barre, celle-ci se colle en
  // HAUT DE LA FENÊTRE (position:fixed) — elle descend avec le scroll,
  // quel que soit le navigateur. Une butée invisible conserve la
  // mise en page pendant le pinnage.
  const barRef = useRef<HTMLDivElement | null>(null)
  const pinnedRef = useRef(false)
  const natTopRef = useRef(-1)
  const [pin, setPin] = useState<{ width: number; left: number; height: number } | null>(null)
  useEffect(() => {
    const el = barRef.current
    if (!el) return
    if (!pinnedRef.current) natTopRef.current = el.getBoundingClientRect().top + window.scrollY
    const sync = () => {
      const parent = el.parentElement
      if (!parent) return
      const pr = parent.getBoundingClientRect()
      const w = pr.width, l = pr.left, h = el.getBoundingClientRect().height
      // ne re-render que si la géométrie change (pas à chaque tick de scroll)
      setPin((prev) => (prev && Math.abs(prev.width - w) < 0.5
        && Math.abs(prev.left - l) < 0.5 && Math.abs(prev.height - h) < 0.5
        ? prev : { width: w, left: l, height: h }))
    }
    const update = () => {
      const should = window.scrollY > natTopRef.current - 8
      if (should === pinnedRef.current) {
        if (should) sync()
        return
      }
      pinnedRef.current = should
      if (should) sync()
      else setPin(null)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ouvert, baseOuvert])
  return (
    <>
      {pin && <div style={{ height: pin.height }} aria-hidden="true" />}
      <div
        ref={barRef}
        className={`res-top${ouvert ? ' open' : ''}${pin ? ' pinned' : ''}`}
        style={pin ? { position: 'fixed', top: 8, width: pin.width, left: pin.left } : undefined}
      >
      {ouvert && (
        <>
          <div className="res-top-row">
            {C.ressources.map((r) => {
              const rs = p.resources[r] ?? { stock: 0, prod: 0 }
              const prod = prodDetail.total[r] ?? 0
              return (
                <span key={r} className="res-chip" style={{ background: fondRessource(r, C) }} title={`${r} — stock modifiable · production / tour calculée${r === 'Habitants' ? ' (production = titres × taxes des habitants)' : ''}`}>
                  <strong>{r}</strong>
                  <span className={rs.stock < 0 ? 'neg' : ''}>
                    <NumberInput
                      value={rs.stock}
                      step={r === 'Habitants' ? 1 : 5}
                      onChange={(v) => setPlayer((x) => {
                        if (!x.resources[r]) x.resources[r] = { stock: 0, prod: 0 }
                        x.resources[r].stock = v
                      })}
                    />
                  </span>
                  <span className={`small ${prod < 0 ? 'neg' : 'muted'}`}>
                    {prod === 0 ? '±0' : fmtNum(prod)}
                  </span>
                </span>
              )
            })}
            <button
              className="res-top-btn"
              onClick={() => setBaseOuvert(!baseOuvert)}
              title="Réglage avancé : production de base du pays"
            >
              {baseOuvert ? '▲ base' : '⚙ base'}
            </button>
          </div>
          {baseOuvert && (
            <div className="res-top-base">
              {C.ressources.map((r) => (
                <label key={r} className="field" style={{ minWidth: 120 }}>
                  <span className="field-label">{r}</span>
                  <NumberInput
                    value={p.resources[r]?.prod ?? 0}
                    step={0.5}
                    onChange={(v) => setPlayer((x) => {
                      if (!x.resources[r]) x.resources[r] = { stock: 0, prod: 0 }
                      x.resources[r].prod = v
                    })}
                  />
                </label>
              ))}
            </div>
          )}
        </>
      )}
      <button
        className="res-top-toggle"
        onClick={() => setOuvert(!ouvert)}
        title="Ressources — stock et production par tour"
      >
        {ouvert ? '▲' : '▼ Ressources'}
      </button>
    </div>
    </>
  )
}

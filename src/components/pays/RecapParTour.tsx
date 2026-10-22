// ══════════════════════════════════════════════════════════════════════
//  Récap des ressources PAR tour : chaque ressource et d'où elle
//  provient (canal par canal + origine de chaque apport), et le bloc
//  « Générer l'impôt » hors fin de tour (marqueur (k)).
//  (Extrait de PlayerView.tsx — un fichier par UI.)
// ══════════════════════════════════════════════════════════════════════

import { useState } from 'react'
import type { Player } from '../../engine/types'
import { useGame } from '../../state/store'
import {
  provenancesApports, genererImpotPopulation, genererImpotVassaux, impotsVassaux,
  effetsNourrEteAmenagementsVille, effetsNourrEteAutresVille,
  type ProductionDetail,
} from '../../engine/engine'
import { fondRessource, couleurRessource, type Cfg } from '../../engine/gameData'
import { Card, NumberInput, Button, fmt } from '../ui'
import { RESSOURCES_FLUX, fmtNum } from './pays-utils'

export function RecapParTour({ joueur, p, C, prodDetail, impotPopPrev, impotsVassPrev }: {
  joueur: number
  p: Player
  C: Cfg
  prodDetail: ProductionDetail
  impotPopPrev: Record<string, number>
  impotsVassPrev: ReturnType<typeof impotsVassaux>
}) {
  const { state, update } = useGame()
  const [foisImpot, setFoisImpot] = useState(1)
  // Garde-fou type : PlayerView ne rend cette carte QUE si une partie
  //  est chargée (state non-null côté App).
  if (!state) return null
  return (
    <Card title="Récap des ressources par tour — origine de chaque apport">
      {(() => {
        // Marqueur (a) : garde-fou — un canal manquant (config très
        //  ancienne) ne doit pas faire crasher l'affichage du récap.
        const canaux: Array<[string, Record<string, number> | undefined]> = [
          ['Base', prodDetail.base],
          ['Habitants', prodDetail.habitants],
          ['Bâtiments', prodDetail.batiments],
          ['Aménagements', prodDetail.amenagements],
          ['Autres', prodDetail.autres],
          ['Régimes & cultures', prodDetail.regimesCultures],
          ['Cités libres', prodDetail.citesLibres],
          ['Commerce', prodDetail.commerce],
          ['Proximité', prodDetail.proximite],
          ['Vassalité', prodDetail.vassalite],
          ['Ministères', prodDetail.ministeres],
          ['Progrès', prodDetail.progres],
        ]
        // « Nourr - été » en LIGNE (comme dans le classeur), pas en
        // colonne : sources séparées — Aménagements (Champ, Rizière) +
        // Autres (lignes « Nourr - été »). Potentiel affiché en toute
        // saison (planification), crédit au stock UNIQUEMENT en été.
        const nEteAmJ = p.villes.reduce(
          (s, v) => s + (effetsNourrEteAmenagementsVille(v, C.config)['Nourriture'] ?? 0), 0)
        const nEteAutJ = p.villes.reduce(
          (s, v) => s + (effetsNourrEteAutresVille(v)['Nourriture'] ?? 0), 0)
        const nEteTotJ = nEteAmJ + nEteAutJ
        const prov = provenancesApports(state, p, C)
        // Retour Thibaut (marqueur (r)) : toutes les ressources,
        // même à production 0.
        const res = RESSOURCES_FLUX(C)
        if (res.length === 0 && nEteTotJ === 0) {
          return (
            <p className="muted">
              Aucun apport par tour pour l'instant.
            </p>
          )
        }
        const val = (d: Record<string, number> | undefined, r: string) => (d ?? {})[r] ?? 0
        // Lignes du tableau : chaque ressource + la ligne « Nourr - été »
        // juste après la Nourriture (ou en première ligne s'il n'y en a pas).
        const lignesR: Array<{ kind: 'res'; r: string } | { kind: 'ete' }> = []
        for (const r of res) {
          lignesR.push({ kind: 'res', r })
          if (r === 'Nourriture') lignesR.push({ kind: 'ete' })
        }
        if (!lignesR.some((l) => l.kind === 'ete')) lignesR.unshift({ kind: 'ete' })
        return (
          <>
            <div className="table-wrap">
              <table className="tbl small">
                <thead>
                  <tr>
                    <th>Ressource</th>
                    {canaux.map(([label]) => <th key={label}>{label}</th>)}
                    <th>Total / tour</th>
                  </tr>
                </thead>
                <tbody>
                  {lignesR.map((l) => {
                    if (l.kind === 'ete') {
                      return (
                        <tr key="nourr-ete" className="ligne-ete"
                          style={{ background: fondRessource('Nourr - été', C) }}>
                          <td>
                            <span className="dot-res dot-ete" style={{ background: couleurRessource('Nourr - été', C) }} />
                            <strong>Nourr - été</strong>{' '}
                            <span className="badge-ete">☀ été</span>
                          </td>
                          {canaux.map(([label]) => {
                            const v = label === 'Aménagements' ? nEteAmJ
                              : label === 'Autres' ? nEteAutJ : 0
                            return (
                              <td key={label} className={v < 0 ? 'neg' : ''}>
                                {v !== 0 ? fmtNum(v) : '—'}
                              </td>
                            )
                          })}
                          <td>
                            <strong>{fmtNum(nEteTotJ)}</strong>{' '}
                            <span className="muted small">(créditée en été seulement)</span>
                          </td>
                        </tr>
                      )
                    }
                    const r = l.r
                    return (
                      <tr key={r} style={{ background: fondRessource(r, C) }}>
                        <td>
                          <span className="dot-res" style={{ background: couleurRessource(r, C) }} />
                          <strong>{r}</strong>
                        </td>
                        {canaux.map(([label, d]) => (
                          <td key={label} className={val(d, r) < 0 ? 'neg' : ''}>
                            {val(d, r) !== 0 ? fmtNum(val(d, r)) : '—'}
                          </td>
                        ))}
                        <td className={(prodDetail.total[r] ?? 0) < 0 ? 'neg' : ''}>
                          <strong>{fmtNum(prodDetail.total[r] ?? 0)}</strong>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* ── D'où vient chaque ressource, origine par origine ── */}
            <div className="mini-title">D'où vient chaque ressource ?</div>
            {res.map((r) => {
              const lignes = prov[r] ?? []
              if (lignes.length === 0) return null
              return (
                <div key={r} className="small provenance-ligne">
                  <strong>{r}</strong>
                  {' : '}
                  {lignes.map((a, i) => (
                    <span key={i}>
                      {i > 0 && ' · '}
                      <span className="muted">{a.canal} — </span>
                      {a.origine}{' '}
                      <strong className={a.valeur < 0 ? 'neg' : ''}>
                        {a.valeur > 0 ? '+' : ''}{fmtNum(a.valeur)}
                      </strong>
                    </span>
                  ))}
                </div>
              )
            })}
          </>
        )
      })()}

      {/* ── Générer l'impôt (hors fin de tour, retour Thibaut
          2026-10-14) : crédite l'impôt d'un tour AUTANT DE FOIS que
          voulu — population (canal « Habitants ») ou vassaux (tribut
          de vassalité, Or). Le fin de tour crédite les gains du tour
          normalement par-dessus. ───────────────────────────────── */}
      <div className="mini-title">Générer l'impôt (hors fin de tour)</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <label className="small">Nombre de tours :</label>
        <NumberInput value={foisImpot} onChange={setFoisImpot} min={1} />
        <Button tone="primary" onClick={() => update((s) => {
          const t = s.players.find((x) => x.n === joueur)
          if (t) genererImpotPopulation(s, t, C, foisImpot)
        })}>💰 Générer l'impôt de la population</Button>
        <Button tone="primary" onClick={() => update((s) => {
          const t = s.players.find((x) => x.n === joueur)
          if (t) genererImpotVassaux(s, t, C, foisImpot)
        })}>🤝 Générer l'impôt des vassaux</Button>
      </div>
      <p className="muted small">
        Impôt d'un tour — population : {Object.keys(impotPopPrev).length === 0
          ? 'aucun gain d’habitants'
          : Object.entries(impotPopPrev).map(([r, v]) => `${fmt(v)} ${r}`).join(', ')}
        {' · '}vassaux : {impotsVassPrev.length === 0
          ? 'aucun vassal ne reverse d’Or'
          : `+${fmt(impotsVassPrev.reduce((s2, x) => s2 + x.montant, 0))} Or (` +
            impotsVassPrev.map((x) => `${x.vassal} : ${fmt(x.montant)}`).join(', ') + ')'}
      </p>
    </Card>
  )
}

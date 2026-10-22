// ══════════════════════════════════════════════════════════════════════
//  Récap ressources du DERNIER tour (apports cumulés, canal par canal,
//  ligne « Nourr - été » incluse). (Extrait de PlayerView.tsx — un
//  fichier par UI.)
// ══════════════════════════════════════════════════════════════════════

import type { Player } from '../../engine/types'
import { useGame } from '../../state/store'
import { fondRessource, couleurRessource, type Cfg } from '../../engine/gameData'
import { Card } from '../ui'
import { RESSOURCES_FLUX, fmtNum } from './pays-utils'

export function RecapDernierTour({ p, C }: { p: Player; C: Cfg }) {
  const { state } = useGame()
  // Garde-fou type : PlayerView ne rend cette carte QUE si une partie
  //  est chargée (state non-null côté App).
  if (!state) return null
  return (
    <Card title="Récap ressources du dernier tour (apports cumulés)">
      {(() => {
        // Marqueur (a) : garde-fou — une ancienne sauvegarde peut ne pas
        //  avoir de tableau history (le `[...undefined]` plantait la page).
        const row = [...(state.history ?? [])].reverse().find((h) => h.joueur === p.n && h.apports)
        if (!row || !row.apports) {
          return (
            <p className="muted">
              Lancez un tour pour voir le détail des apports.
            </p>
          )
        }
        const { production, batiments, amenagements, nourrEte, autres, population, vassalite, regimesCultures, citesLibres, commerce } = row.apports
        const amen = amenagements ?? {}
        const nEte = nourrEte ?? {}
        const aut = autres ?? {}
        const reg = regimesCultures ?? {}
        const cl = citesLibres ?? {}
        const com = commerce ?? {}
        const val = (d: Record<string, number> | undefined, r: string) => (d ?? {})[r] ?? 0
        // Retour Thibaut (marqueur (r)) : toutes les ressources,
        // même à apport 0.
        const res = RESSOURCES_FLUX(C)
        // Ligne « Nourr - été » (comme dans le classeur) juste après
        // la Nourriture : valeur d'été créditée ce tour-là (0/en
        // hiver) ; ses sources détaillées sont visibles dans le récap
        // « origine de chaque apport » ci-dessus.
        const lignesD: Array<{ kind: 'res'; r: string } | { kind: 'ete' }> = []
        for (const r of res) {
          lignesD.push({ kind: 'res', r })
          if (r === 'Nourriture' && val(nEte, 'Nourriture') !== 0) lignesD.push({ kind: 'ete' })
        }
        if (val(nEte, 'Nourriture') !== 0 && !res.includes('Nourriture')) lignesD.unshift({ kind: 'ete' })
        return (
          <div className="table-wrap">
            <table className="tbl small">
              <thead>
                <tr>
                  <th>Ressource</th><th>Production</th><th>Bâtiments</th>
                  <th>Aménagements</th><th>Autres</th>
                  <th>Habitants</th><th>Régimes & cultures</th><th>Cités libres</th><th>Commerce</th><th>Vassalité</th><th>Total</th>
                </tr>
              </thead>
              <tbody>
                {lignesD.map((l) => {
                  if (l.kind === 'ete') {
                    const vEte = val(nEte, 'Nourriture')
                    return (
                      <tr key="nourr-ete" className="muted" style={{ background: fondRessource('Nourr - été', C) }}>
                        <td><strong>Nourr - été</strong></td>
                        <td>—</td><td>—</td><td>—</td><td>—</td>
                        <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                        <td><strong>{fmtNum(vEte)}</strong>{' '}
                          <span className="muted small">(créditée en été seulement)</span></td>
                      </tr>
                    )
                  }
                  const r = l.r
                  const total = val(production, r) + val(batiments, r) + val(amen, r)
                    + val(nEte, r) + val(aut, r) + val(population, r) + val(vassalite, r) + val(reg, r)
                    + val(cl, r) + val(com, r)
                  return (
                    <tr key={r} style={{ background: fondRessource(r, C) }}>
                      <td>
                        <span className="dot-res" style={{ background: couleurRessource(r, C) }} />
                        <strong>{r}</strong>
                      </td>
                      <td>{fmtNum(val(production, r))}</td>
                      <td>{fmtNum(val(batiments, r))}</td>
                      <td>{fmtNum(val(amen, r))}</td>
                      <td>{fmtNum(val(aut, r))}</td>
                      <td>{fmtNum(val(population, r))}</td>
                      <td>{fmtNum(val(reg, r))}</td>
                      <td>{fmtNum(val(cl, r))}</td>
                      <td>{fmtNum(val(com, r))}</td>
                      <td>{fmtNum(val(vassalite, r))}</td>
                      <td className={total < 0 ? 'neg' : ''}><strong>{fmtNum(total)}</strong></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      })()}
    </Card>
  )
}

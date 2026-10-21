// ══════════════════════════════════════════════════════════════════════
//  Culture du pays : règle de pays chiffrée (ex. Lunisme — +4 Tourisme
//  par ville luniste dans le monde) avec le NOMBRE de villes de cette
//  culture et le bonus ADAPTÉ — appliqué automatiquement à chaque fin
//  de tour (canal « régimes & cultures » du récap ressources).
//  (Extrait de PlayerView.tsx — un fichier par UI.)
// ══════════════════════════════════════════════════════════════════════

import type { GameState, Player } from '../../engine/types'
import { cultureDef, type Cfg } from '../../engine/gameData'
import { detailCulturePays } from '../../engine/engine'
import { Badge, Card, fmt } from '../ui'

export function CulturePays({ state, p, C }: { state: GameState; p: Player; C: Cfg }) {
  return (
    <Card title="🛕 Culture du pays — bonus automatiques">
      {(() => {
        const cult = cultureDef(p.culture, C.config)
        const lois = detailCulturePays(state, p, C)
        const traits = cult
          ? `hérédité ${String(cult.heredite).toLowerCase()} · mariages homosexuels ${cult.homoAutorisee ? 'autorisés' : 'interdits'}`
          : ''
        return (
          <div className="stack">
            <div>
              <strong>{p.culture}</strong>
              {cult?.reglePays && <span className="muted small"> — {cult.reglePays}</span>}
            </div>
            {traits && <div className="muted small">{traits}</div>}
            {lois.length > 0 ? lois.map((d) => (
              <div key={d.res}>
                <Badge tone="good">+{fmt(d.total)} {d.res} / tour</Badge>{' '}
                <span className="muted small">
                  règle de pays : +{fmt(d.parVille)} {d.res} × {d.nbVillesMonde} ville(s)
                  « {p.culture} » dans le monde (dont {d.nbVillesPerso} chez toi).
                </span>
              </div>
            )) : null}
            {cult?.scienceParConstruction ? (
              <div>
                <Badge tone="good">+{fmt(cult.scienceParConstruction)} Science / construction</Badge>{' '}
                <span className="muted small">
                  crédité à chaque construction (journal 🏗).
                </span>
              </div>
            ) : null}
          </div>
        )
      })()}
    </Card>
  )
}

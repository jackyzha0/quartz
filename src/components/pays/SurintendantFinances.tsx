// ══════════════════════════════════════════════════════════════════════
//  Surintendant des finances (marqueur (y)) : après la construction
//  d'un bâtiment, choix de 1 ressource au choix produite par
//  l'habitation, × rang de l'habitation — carte éphémère, l'état du
//  choix vit dans PlayerView. (Extrait de PlayerView.tsx.)
// ══════════════════════════════════════════════════════════════════════

import type { GameState, Player } from '../../engine/types'
import { Card, Select, Button } from '../ui'
import type { ChoixSurintendant } from './pays-utils'

export function SurintendantFinances({ surint, surintRes, setSurintRes, setSurint, joueur, p, update }: {
  surint: ChoixSurintendant | null
  surintRes: string
  setSurintRes: (v: string) => void
  setSurint: (v: ChoixSurintendant | null) => void
  joueur: number
  p: Player
  update: (m: (s: GameState) => void) => void
}) {
  // Carte éphémère : rien à afficher si aucun choix de Surintendant
  //  n'est en attente.
  if (!surint) return null
  const villeSu = p.villes[surint.idx]
  if (!villeSu) return null
  // Capture pour les closures (la garde ne traverse pas un paramètre).
  const surintQty = surint.qty
  return (
    <Card title="🪙 Surintendant des finances — ressource générée par la construction">
      <p>
        Votre Surintendant des finances génère <strong>{surint.qty}</strong> × 1 ressource
        au choix parmi celles produites par <strong>{villeSu.nom}</strong> —
        choisissez la ressource puis validez :
      </p>
      <div className="filters">
        <Select
          value={surintRes}
          options={surint.options.map((r) => ({ value: r, label: r }))}
          onChange={setSurintRes}
        />
        <Button tone="primary" disabled={!surintRes} onClick={() => {
          const res = surintRes
          const qty = surintQty
          update((s2) => {
            const t = s2.players.find((x) => x.n === joueur)
            if (!t) return
            const rs = t.resources[res]
            if (rs) rs.stock += qty
            s2.log.push({
              turn: s2.turn, type: 'Système', joueur: t.n,
              texte: `👑 Ministères — Surintendant des finances : ${villeSu.nom} génère +${qty} ${res} (construction).`,
            })
          })
          setSurint(null)
        }}>Créditer</Button>
        <Button onClick={() => setSurint(null)}>Ignorer</Button>
      </div>
    </Card>
  )
}

// ══════════════════════════════════════════════════════════════════════
//  Notes libres du joueur (retour Thibaut 2026-10-15) : pense-bête par
//  joueur, affiché en bas de l'onglet Pays. (Extrait de PlayerView.)
// ══════════════════════════════════════════════════════════════════════

import type { GameState, Player } from '../../engine/types'
import { Card } from '../ui'

export function NotesJoueur({ p, setPlayer }: {
  p: Player
  setPlayer: (fn: (p: Player, s: GameState) => void) => void
}) {
  return (
    <Card title={"📝 Notes"}>
      <textarea
        className="notes-joueur"
        value={p.notes ?? ''}
        placeholder="Notes libres : plans, rappels, accords entre joueurs…"
        onChange={(e) => setPlayer((x) => { x.notes = e.target.value })}
        rows={4}
      />
    </Card>
  )
}

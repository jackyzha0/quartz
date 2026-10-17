// ══════════════════════════════════════════════════════════════════════
//  Barre de jeu : tour, saison, sauvegarde, actions de partie
// ══════════════════════════════════════════════════════════════════════

import React, { useRef } from 'react'
import { useGame } from '../state/store'
import { Button } from './ui'

export function TurnBar() {
  const { state, mode, salon, saving, conflit, nextTurn, saveNow, exportState, importState, reset, barriere, monNumero, forceNextTurn } = useGame()
  const fileRef = useRef<HTMLInputElement>(null)
  // PROTOCOLE v2 (étape 2) : bascule par joueur, mémorisée localement.
  //  v2 = Fin de tour par événements + résolution SERVEUR (Edge
  //  Function). v1 (défaut) = l'ancien flux. Le bouton affiche le
  //  mode ACTIF ; cliquer bascule et recharge pour l'appliquer.
  const [proto2, setProto2] = React.useState<boolean>(() => {
    try { return window.localStorage.getItem('cpe.proto2') !== '0' } catch { return true }
  })
  const toggleProto2 = () => {
    const nouveau = !proto2
    setProto2(nouveau)
    try { window.localStorage.setItem('cpe.proto2', nouveau ? '1' : '0') } catch { /* noop */ }
  }

  if (!state || !Array.isArray(state.players)) return null

  const annee = 1 + (state.turn - 1) * 2

  const download = () => {
    const blob = new Blob([exportState()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chasse-et-peche-tour${state.turn}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="turnbar">
      <div className="turnbar-info">
        <strong>Tour {state.turn}</strong>
        <span className="muted">année de jeu {annee} · saison {state.saison} · graine {state.seed}</span>
        <span className="badge badge-info">
          {mode === 'supabase' ? `Multijoueur${salon ? ` · salon « ${salon} »` : ''}` : 'Local'}
        </span>
        {saving && <span className="muted">sauvegarde…</span>}
      </div>
      {conflit && (
        <div className="banner-warn">
          ⚠ Une modification d'un autre joueur est arrivée pendant votre édition — l'état a été rechargé.
        </div>
      )}
      <div className="turnbar-actions">
        {mode === 'supabase' && barriere.prets.size > 0 && (
          <div className="banner-info" style={{ padding: '4px 12px' }}>
            ⏳ Fin de tour : {barriere.prets.size}/{state.players.length} joueur(s) prêt(s)
            {' '}· {state.players.map((q) => barriere.prets.has(q.n) ? `✅ J${q.n}` : `⏳ J${q.n}`).join(' ')}
            {barriere.monTourPousse && ' — en attente des autres joueurs…'}
          </div>
        )}
        <Button tone="primary" onClick={nextTurn} disabled={mode === 'supabase' && barriere.monTourPousse}>
          {mode === 'supabase' && barriere.monTourPousse ? '⏳ En attente…' : '▶ Tour suivant'}
        </Button>
        {mode === 'supabase' && barriere.monTourPousse && (
          <Button
            title="Forcer le passage du tour (test solo / joueur absent) — vos actions locales sont appliquées et publiées"
            onClick={() => { if (window.confirm('Forcer le passage du tour ? La barrière sera ignorée : vos actions locales sont appliquées et publiées (les autres joueurs perdent leurs actions non poussées de ce tour).')) { forceNextTurn() } }}
          >
            ⏭ Forcer
          </Button>
        )}
        {mode === 'supabase' && (
          <Button
            onClick={toggleProto2}
            title={proto2
              ? 'Protocole v2 ACTIF : fin de tour par événements + résolution serveur (recommandé). Cliquer pour revenir au protocole v1.'
              : 'Protocole v1 (ancien). Cliquer pour activer le protocole v2 : résolution serveur des fins de tour (événements append-only, plus de pertes possibles).'}
          >
            {proto2 ? 'v2 🜲' : 'v1'}
          </Button>
        )}
        <Button onClick={saveNow} title="Sauvegarder maintenant">💾</Button>
        <Button onClick={download} title="Exporter la partie en JSON">⬇ Export</Button>
        <Button onClick={() => fileRef.current?.click()} title="Importer une partie JSON">⬆ Import</Button>
        <Button tone="danger" onClick={reset} title="Effacer la sauvegarde locale">✕</Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (!f) return
            const reader = new FileReader()
            reader.onload = () => importState(String(reader.result))
            reader.readAsText(f)
            e.target.value = ''
          }}
        />
      </div>
    </div>
  )
}

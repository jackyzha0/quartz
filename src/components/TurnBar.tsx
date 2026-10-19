// ══════════════════════════════════════════════════════════════════════
//  Barre de jeu : tour, saison, sauvegarde, actions de partie
// ══════════════════════════════════════════════════════════════════════

import { useRef } from 'react'
import { useGame } from '../state/store'
import { Button } from './ui'

export function TurnBar() {
  const { state, mode, salon, saving, conflit, saveLocaleEchec, nextTurn, exportState, importState, reset, barriere, forceNextTurn } = useGame()
  const fileRef = useRef<HTMLInputElement>(null)
  // (RETRAIT 2026-10-19, brûlage audit R5) : la bascule de protocole
  //  v1/v2 (state « proto2 » + toggleProto2) a été retirée — le
  //  protocole v2 est l'unique flux, plus de mélange possible.

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
      {/* R3 (audit 2026-10-19, arbitrage Thibaut « bandeau d'alerte ») :
          la sauvegarde locale a échoué (quota navigateur) — la partie
          ne vit plus qu'en mémoire : on propose l'export JSON de secours. */}
      {saveLocaleEchec && (
        <div className="banner-warn">
          ⚠ Sauvegarde locale impossible (quota du navigateur dépassé) — un rechargement de la page perdrait le tour en cours.{' '}
          <Button onClick={download} title="Exporter la partie en JSON (copie de secours)">⬇ Exporter maintenant</Button>
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
        {/* (RETRAIT 2026-10-19, brûlage audit R5) : bouton de bascule
            de protocole v1/v2 retiré — v2 est l'unique flux. */}
        <Button onClick={download} title="Exporter la partie en JSON">⬇ Export</Button>
        <Button onClick={() => fileRef.current?.click()} title="Importer une partie JSON">⬆ Import</Button>
        {/* M3 (audit 2026-10-19) : confirmation AVANT l'effacement — les
            actions destructrices voisines (Forcer, Import) confirment
            toutes ; le ✕ détruit la partie locale sans appel. */}
        <Button
          tone="danger"
          title="Effacer la sauvegarde locale"
          onClick={() => { if (window.confirm('Effacer la sauvegarde locale ? La partie locale sera perdue (le salon distant reste rejoignable).')) reset() }}
        >
          ✕
        </Button>
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

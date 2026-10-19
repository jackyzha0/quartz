// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Historique » (HistoryPanel) : courbes
//  d'évolution des ressources (feuille _Historique) — exige une partie
//  avec des tours joués (history non vide).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

prepareRendu()

test('rendu HistoryPanel : la page Historique s’affiche sans crash', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { HistoryPanel } = await import('./HistoryPanel')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(HistoryPanel)),
  )

  assert.ok(html.includes('Évolution des ressources'), 'carte « Évolution des ressources » absente')
})

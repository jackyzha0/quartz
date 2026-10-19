// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Journal » (EventLogPanel) : journal de
//  campagne, tours récents d'abord.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

prepareRendu()

test('rendu EventLogPanel : le journal de campagne s’affiche sans crash', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { EventLogPanel } = await import('./EventLogPanel')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(EventLogPanel)),
  )

  assert.ok(html.includes('Journal de campagne'), 'titre « Journal de campagne » absent')
})

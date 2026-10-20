// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Royaume » (RoyaumeView) : identité du joueur,
//  metiers, personnages importants, vassalité, crises, offrandes.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

prepareRendu()

test('rendu RoyaumeView : la page Royaume s’affiche sans crash', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { RoyaumeView } = await import('./RoyaumeView')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(RoyaumeView, { joueur: 1 })),
  )

  assert.ok(html.length > 2000, `page trop courte pour être complète : ${html.length} caractères`)
  assert.ok(html.includes('Vassalité'), 'carte « Vassalité » absente')
  assert.ok(html.includes('Personnages importants'), 'carte « Personnages importants » absente')
})

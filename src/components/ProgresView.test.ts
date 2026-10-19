// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Progrès » (ProgresView) : arbres de
//  technologies par âge, cases à débloquer.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

prepareRendu()

test('rendu ProgresView : la page Progrès s’affiche sans crash', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { ProgresView } = await import('./ProgresView')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(ProgresView, { joueur: 1 })),
  )

  assert.ok(html.length > 2000, `page trop courte pour être complète : ${html.length} caractères`)
  assert.ok(html.includes('technologie(s) débloquée(s)'), 'carte « Progrès » absente')
})

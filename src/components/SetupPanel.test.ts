// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Nouvelle partie » (SetupPanel) : options de
//  la partie, jouer en ligne sans rien installer.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

prepareRendu()

test('rendu SetupPanel : la page Nouvelle partie s’affiche sans crash', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { SetupPanel } = await import('./SetupPanel')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(SetupPanel)),
  )

  assert.ok(html.length > 1000, `page trop courte pour être complète : ${html.length} caractères`)
  assert.ok(html.includes('Options de la partie'), 'carte « Options de la partie » absente')
})

// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Paramètres » (ParamsPanel) : configuration
//  commune, constantes des formules, titres, cultures, export/import.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

prepareRendu()

test('rendu ParamsPanel : la page Paramètres s’affiche sans crash', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { ParamsPanel } = await import('./ParamsPanel')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(ParamsPanel)),
  )

  assert.ok(html.length > 2000, `page trop courte pour être complète : ${html.length} caractères`)
  assert.ok(html.includes('Paramètres communs à toutes les parties'), 'carte « Paramètres communs » absente')
})

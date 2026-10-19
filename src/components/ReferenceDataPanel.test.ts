// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Wiki » (ReferenceDataPanel) : référentiels du
//  classeur d'origine, titres, traits, cultures, ministères…
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

prepareRendu()

test('rendu ReferenceDataPanel : le wiki de règles s’affiche sans crash', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { ReferenceDataPanel } = await import('./ReferenceDataPanel')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(ReferenceDataPanel)),
  )

  assert.ok(html.length > 2000, `page trop courte pour être complète : ${html.length} caractères`)
  assert.ok(html.includes('Référentiels du jeu'), 'carte « Référentiels du jeu » absente')
})

// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Pays » (PlayerView, assemblage des cartes de
//  components/pays/). Retour de revue critique n°3 : « un test de rendu
//  par vue » — aucun écran blanc de régression ne doit plus passer la CI.
//  Méthode : vraie partie à 8 joueurs, 2 tours joués, rendu serveur via
//  react-dom/server (renderToString — les useEffect ne sont pas joués,
//  seule la voie de rendu est testée).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

// Le shim doit être en place AVANT tout import applicatif (dynamique).
prepareRendu()

test('rendu PlayerView : la page Pays s’assemble sans crash (cartes de components/pays/)', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { PlayerView } = await import('./PlayerView')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(PlayerView, { joueur: 1 })),
  )

  assert.ok(html.length > 2000, `page trop courte pour être complète : ${html.length} caractères`)
  assert.ok(html.includes('Culture du pays'), 'carte « Culture du pays » absente')
  assert.ok(html.includes('Commerce — routes des marchands'), 'carte « Commerce » absente')
  assert.ok(html.includes('Récap des ressources par tour'), 'carte « Récap par tour » absente')
  assert.ok(html.includes('Récap ressources du dernier tour'), 'carte « Récap dernier tour » absente')
  assert.ok(html.includes('grid-villes'), 'grille des villes absente')
  assert.ok(html.includes('Capitale 1'), 'ville du joueur 1 absente')
})

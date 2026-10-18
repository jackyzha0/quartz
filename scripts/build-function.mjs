// Bundle le moteur + la fusion du jeu dans la Edge Function « resoudre-tour » :
//   node scripts/build-function.mjs
// Produit supabase/functions/resoudre-tour/_engine.mjs — bundle ESM UNIQUE
// construit par esbuild :
//   · les imports sans extension (style Vite) sont résolus ;
//   · l'import JSON de referentiels.json est INLINÉ (Deno ne le résout
//     pas sans assertion — c'est pourquoi l'ancienne copie brute de
//     src/engine ne pouvait pas fonctionner côté Deno) ;
//   · un seul fichier à déployer, versionné dans le même commit que le
//     code — plus de divergence possible avec le dépôt.
// À lancer avant `supabase functions deploy resoudre-tour`.
import { build } from 'esbuild'
import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = fileURLToPath(new URL('.', import.meta.url))
const root = join(scriptDir, '..')
const out = join(root, 'supabase/functions/resoudre-tour/_engine.mjs')

rmSync(out, { force: true })

const result = await build({
  entryPoints: [join(root, 'src/engine/engine.ts')],
  bundle: true,
  format: 'esm',
  platform: 'neutral',
  target: 'esnext',
  outfile: out,
  // Les tests ne sont jamais embarqués (seuls les modules importés
  //  par engine.ts le sont — le graphe suit les imports réels).
  logLevel: 'info',
})

if (result.errors.length) {
  console.error('✗ échec du bundle :', result.errors)
  process.exit(1)
}
console.log('✔ moteur bundlé dans', out)

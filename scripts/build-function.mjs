// Bundle le moteur du jeu dans la Edge Function « resoudre-tour » :
//   node scripts/build-function.mjs
// Produit supabase/functions/resoudre-tour/engine/ — copie de
// src/engine + src/config (TS pur, Deno les exécute nativement).
// À lancer avant `supabase functions deploy resoudre-tour`.
import { cpSync, rmSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = fileURLToPath(new URL('.', import.meta.url))
const root = join(scriptDir, '..')
const outDir = join(root, 'supabase/functions/resoudre-tour/engine')

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

// Deno exécute le TS nativement — une copie suffit, pas de build
// (zéro dépendance npm nécessaire côté fonction). Les fichiers de
// TEST sont exclus (inutiles côté serveur, ils alourdissent le deploy).
import { readdirSync, statSync } from 'node:fs'
function copierSansTests(src, dest) {
  mkdirSync(dest, { recursive: true })
  for (const f of readdirSync(src)) {
    if (f.endsWith('.test.ts')) continue
    const from = join(src, f)
    const to = join(dest, f)
    if (statSync(from).isDirectory()) copierSansTests(from, to)
    else cpSync(from, to, { force: true })
  }
}
copierSansTests(join(root, 'src/engine'), join(outDir, 'src/engine'))
copierSansTests(join(root, 'src/config'), join(outDir, 'src/config'))

console.log('✔ moteur copié dans', outDir)

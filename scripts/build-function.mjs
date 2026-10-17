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
// (zéro dépendance npm nécessaire côté fonction).
for (const rel of ['src/engine', 'src/config']) {
  cpSync(join(root, rel), join(outDir, rel), { recursive: true, force: true })
}

console.log('✔ moteur copié dans', outDir)

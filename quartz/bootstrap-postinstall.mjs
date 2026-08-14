#!/usr/bin/env node
import { chmodSync, existsSync, mkdirSync, symlinkSync, unlinkSync } from "fs"
import path from "path"

const root = path.resolve(import.meta.dirname, "..")
const target = path.join(root, "quartz", "bootstrap-cli.mjs")

try {
  chmodSync(target, 0o755)
} catch {
  // best-effort, not fatal if it were to fail
}

const binDir = path.join(root, "node_modules", ".bin")
mkdirSync(binDir, { recursive: true })

// only tested on mac, someone on windows will have to add a .cmd shim for this
const linkPath = path.join(binDir, "quartz")
const relativeTarget = path.relative(binDir, target)
try {
  if (existsSync(linkPath)) {
    unlinkSync(linkPath)
  }
  symlinkSync(relativeTarget, linkPath)
} catch (err) {
  console.warn(`[quartz] could not link node_modules/.bin/quartz: ${err.message}`)
}

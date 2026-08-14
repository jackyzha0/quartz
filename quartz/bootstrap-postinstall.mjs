#!/usr/bin/env node
import { chmodSync, mkdirSync, readlinkSync, symlinkSync, unlinkSync } from "fs"
import path from "path"

// npm links the `bin` entry into node_modules/.bin on install, bun does not

// a symlink is useless on windows, this needs a .cmd/.ps1 shim instead
if (process.platform === "win32") {
  process.exit(0)
}

try {
  const root = path.resolve(import.meta.dirname, "..")
  const target = path.join(root, "quartz", "bootstrap-cli.mjs")

  try {
    // checked in as 755, but bunx won't run the cli if a setup drops the mode
    chmodSync(target, 0o755)
  } catch (err) {
    console.warn(`[quartz] could not make ${target} executable: ${err.message}`)
  }

  const binDir = path.join(root, "node_modules", ".bin")
  const linkPath = path.join(binDir, "quartz")
  const relativeTarget = path.relative(binDir, target)

  mkdirSync(binDir, { recursive: true })
  try {
    symlinkSync(relativeTarget, linkPath)
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err
    }
    if (readlinkSync(linkPath) !== relativeTarget) {
      unlinkSync(linkPath)
      symlinkSync(relativeTarget, linkPath)
    }
  }
} catch (err) {
  console.warn(`[quartz] could not link node_modules/.bin/quartz: ${err.message}`)
}

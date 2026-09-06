#!/usr/bin/env node
import {
  chmodSync,
  existsSync,
  mkdirSync,
  readlinkSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from "fs"
import path from "path"

// npm links the `bin` entry into node_modules/.bin on install, bun does not
try {
  const root = path.resolve(import.meta.dirname, "..")
  const target = path.join(root, "quartz", "bootstrap-cli.mjs")
  const binDir = path.join(root, "node_modules", ".bin")
  const linkPath = path.join(binDir, "quartz")
  const relativeTarget = path.relative(binDir, target)

  // as a dependency, npm links the bin itself, running here would only litter a node_modules into the package
  if (!existsSync(path.join(root, "node_modules"))) {
    process.exit(0)
  }

  mkdirSync(binDir, { recursive: true })

  if (process.platform === "win32") {
    // windows ignores the shebang, so it needs the same shims npm writes
    const posixTarget = relativeTarget.split(path.sep).join("/")

    // a symlink left by a wsl run would be followed and the shim written straight into the cli source file
    try {
      unlinkSync(linkPath)
    } catch {}

    writeFileSync(
      linkPath,
      `#!/bin/sh\nexec node --no-deprecation "$(dirname "$0")/${posixTarget}" "$@"\n`,
    )
    writeFileSync(
      `${linkPath}.cmd`,
      `@ECHO off\r\nnode --no-deprecation "%~dp0${relativeTarget}" %*\r\n`,
    )
    writeFileSync(
      `${linkPath}.ps1`,
      `#!/usr/bin/env pwsh\nnode --no-deprecation "$PSScriptRoot/${posixTarget}" $args\nexit $LASTEXITCODE\n`,
    )
  } else {
    try {
      // checked in as 755, but bunx won't run the cli if a setup drops the mode
      chmodSync(target, 0o755)
    } catch (err) {
      console.warn(`[quartz] could not make ${target} executable: ${err.message}`)
    }

    try {
      symlinkSync(relativeTarget, linkPath)
    } catch (err) {
      if (err.code !== "EEXIST") {
        throw err
      }
      // not necessarily a symlink, a windows checkout leaves a plain file here
      let current = null
      try {
        current = readlinkSync(linkPath)
      } catch {}

      if (current !== relativeTarget) {
        unlinkSync(linkPath)
        symlinkSync(relativeTarget, linkPath)
      }
    }
  }
} catch (err) {
  console.warn(`[quartz] could not link node_modules/.bin/quartz: ${err.message}`)
}

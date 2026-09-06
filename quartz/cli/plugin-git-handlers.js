import fs from "fs"
import path from "path"
import os from "os"
import { exec as execCb, execFile as execFileCb, execFileSync } from "child_process"
import { styleText, promisify } from "util"
import {
  readPluginsJson,
  writePluginsJson,
  readLockfile,
  writeLockfile,
  extractPluginName,
  readManifestFromPackageJson,
  parseGitSource,
  getGitCommit,
  PLUGINS_DIR,
  LOCKFILE_PATH,
  isLocalSource,
  getSourceUrl,
  formatSource,
  resolveLockfileName,
  getNameOverrides,
} from "./plugin-data.js"
import { symlinkOrCopySync } from "./helpers.js"

const INTERNAL_EXPORTS = new Set(["manifest", "default"])

const execAsync = promisify(execCb)
const execFileAsync = promisify(execFileCb)

// Plugin sources, refs, and commits come from quartz.config.yaml and
// quartz.lock.json. Invoke git through execFile (no shell) and validate every
// interpolated value, so a crafted entry cannot run commands — quoting a URL is
// not enough, since $(...) and backticks still expand inside double quotes —
// or smuggle argv flags such as --upload-pack=<cmd>.
const COMMIT_PATTERN = /^[0-9a-f]{7,40}$/i
const REF_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._\/-]*$/

function assertSafeCommit(commit) {
  if (typeof commit !== "string" || !COMMIT_PATTERN.test(commit)) {
    throw new Error(`Refusing to run git with unsafe commit: ${commit}`)
  }
  return commit
}

function assertSafeRef(ref) {
  if (typeof ref !== "string" || !REF_PATTERN.test(ref) || ref.includes("..")) {
    throw new Error(`Refusing to run git with unsafe ref: ${ref}`)
  }
  return ref
}

function assertSafeRepo(repo) {
  if (typeof repo !== "string" || repo.length === 0 || repo.startsWith("-")) {
    throw new Error(`Refusing to run git with unsafe repository: ${repo}`)
  }
  return repo
}

// git clone accepts `--` before <repository>, so a repo that looks like a flag
// can never be parsed as one.
function cloneArgs({ url, ref, dest, depth = 1 }) {
  const args = ["clone"]
  if (depth) args.push("--depth", String(depth))
  if (ref) args.push("--branch", assertSafeRef(ref))
  args.push("--", assertSafeRepo(url), dest)
  return args
}

function git(args, opts = {}) {
  return execFileAsync("git", args, opts)
}

async function cloneWithSubdirAsync({ url, ref, subdir, pluginDir }) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-plugin-"))
  try {
    await git(cloneArgs({ url, ref, dest: tmpDir }))
    const subdirPath = path.join(tmpDir, subdir)
    if (!fs.existsSync(subdirPath)) {
      throw new Error(`Subdirectory "${subdir}" not found in cloned repository`)
    }
    fs.cpSync(subdirPath, pluginDir, { recursive: true })
    const { stdout } = await git(["rev-parse", "HEAD"], { cwd: tmpDir })
    return stdout.trim()
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

async function buildPluginAsync(pluginDir, name) {
  if (hasPrebuiltDist(pluginDir)) {
    console.log(styleText("green", `  ✓ ${name}: using pre-built dist/`))
    linkPeerPlugins(pluginDir)
    return true
  }

  try {
    const skipBuild = !needsBuild(pluginDir)
    console.log(styleText("cyan", `  → ${name}: installing dependencies...`))
    await execAsync("npm install --ignore-scripts", { cwd: pluginDir })
    if (!skipBuild) {
      console.log(styleText("cyan", `  → ${name}: building...`))
      await execAsync("npm run build", { cwd: pluginDir })
    }
    await execAsync("npm prune --omit=dev", { cwd: pluginDir })
    linkPeerPlugins(pluginDir)
    return true
  } catch (error) {
    console.log(styleText("red", `  ✗ ${name}: build failed`))
    return false
  }
}

/**
 * Run async tasks with bounded concurrency.
 * @param {Array} items - Items to process
 * @param {number} concurrency - Max parallel tasks
 * @param {Function} fn - Async function to run per item
 * @returns {Promise<Array>} Results in order
 */
async function runParallel(items, concurrency, fn) {
  const results = new Array(items.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < items.length) {
      const i = nextIndex++
      results[i] = await fn(items[i], i)
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  await Promise.all(workers)
  return results
}

/**
 * Check whether a plugin's .gitignore excludes dist/.
 * When dist/ is gitignored, the plugin cannot ship pre-built output in version
 * control (e.g. because it uses tree-shaking) and must always be built locally.
 */
function isDistGitignored(pluginDir) {
  const gitignorePath = path.join(pluginDir, ".gitignore")
  if (!fs.existsSync(gitignorePath)) return false

  const lines = fs.readFileSync(gitignorePath, "utf-8").split("\n")
  return lines.some((line) => {
    const trimmed = line.trim()
    return trimmed === "dist" || trimmed === "dist/" || trimmed === "/dist" || trimmed === "/dist/"
  })
}

function hasPrebuiltDist(pluginDir) {
  const distDir = path.join(pluginDir, "dist")
  return fs.existsSync(distDir) && !isDistGitignored(pluginDir)
}

function needsBuild(pluginDir) {
  if (isDistGitignored(pluginDir)) return true
  const distDir = path.join(pluginDir, "dist")
  return !fs.existsSync(distDir)
}

/**
 * After pruning devDependencies, peerDependencies may no longer be installed
 * in the plugin's own node_modules. This function resolves them:
 *
 *  1. @quartz-community/* peers → symlink to the co-installed sibling plugin
 *  2. All other peers → symlink to the host Quartz node_modules so plugins
 *     share a single copy of packages like unified, vfile, rehype-raw, etc.
 */
function trySymlink(target, linkPath) {
  symlinkOrCopySync(target, linkPath)
}

function linkPeerPlugins(pluginDir) {
  const pkgPath = path.join(pluginDir, "package.json")
  if (!fs.existsSync(pkgPath)) return

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
  const peers = pkg.peerDependencies ?? {}

  const quartzRoot = path.resolve(pluginDir, "..", "..", "..")
  const hostNodeModules = path.join(quartzRoot, "node_modules")

  for (const peerName of Object.keys(peers)) {
    const peerNodeModulesPath = path.join(pluginDir, "node_modules", ...peerName.split("/"))
    if (fs.existsSync(peerNodeModulesPath)) continue

    if (peerName.startsWith("@quartz-community/")) {
      const siblingPlugin = findPluginByPackageName(peerName)
      if (!siblingPlugin) continue

      const scopeDir = path.join(pluginDir, "node_modules", peerName.split("/")[0])
      fs.mkdirSync(scopeDir, { recursive: true })

      const target = path.relative(scopeDir, siblingPlugin)
      trySymlink(target, peerNodeModulesPath)
      continue
    }

    const hostPeerPath = path.join(hostNodeModules, ...peerName.split("/"))
    if (!fs.existsSync(hostPeerPath)) continue

    const parts = peerName.split("/")
    if (parts.length > 1) {
      const scopeDir = path.join(pluginDir, "node_modules", parts[0])
      fs.mkdirSync(scopeDir, { recursive: true })
    } else {
      fs.mkdirSync(path.join(pluginDir, "node_modules"), { recursive: true })
    }

    const target = path.relative(path.dirname(peerNodeModulesPath), hostPeerPath)
    trySymlink(target, peerNodeModulesPath)
  }
}

/**
 * Search installed plugins for one whose package.json "name" matches the given
 * npm package name (e.g. "@quartz-community/bases-page").
 */
function findPluginByPackageName(packageName) {
  if (!fs.existsSync(PLUGINS_DIR)) return null

  const plugins = fs.readdirSync(PLUGINS_DIR).filter((entry) => {
    const entryPath = path.join(PLUGINS_DIR, entry)
    return fs.statSync(entryPath).isDirectory()
  })

  for (const pluginDirName of plugins) {
    const pkgPath = path.join(PLUGINS_DIR, pluginDirName, "package.json")
    if (!fs.existsSync(pkgPath)) continue
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
      if (pkg.name === packageName) {
        return path.join(PLUGINS_DIR, pluginDirName)
      }
    } catch {}
  }
  return null
}

const PLUGIN_TYPE_PATTERN =
  /Quartz(?:Emitter|Transformer|Filter|PageType)Plugin|QuartzComponentConstructor|\(.*\)\s*=>\s*QuartzComponent\b/

function resolveOriginalName(exportName, dtsContent) {
  const aliasPattern = new RegExp(`(\\w+)\\s+as\\s+${exportName}\\b`)
  const match = dtsContent.match(aliasPattern)
  return match ? match[1] : exportName
}

function isOverridableExport(name, dtsContent) {
  const declName = resolveOriginalName(name, dtsContent)
  const declPattern = new RegExp(`declare\\s+const\\s+${declName}\\s*:\\s*(.+?)(?:;|$)`, "m")
  const match = dtsContent.match(declPattern)
  if (!match) return false
  return PLUGIN_TYPE_PATTERN.test(match[1])
}

function parseExportsFromDts(content) {
  const exports = []
  const exportMatches = content.matchAll(/export\s*{\s*([^}]+)\s*}(?:\s*from\s*['"]([^'"]+)['"])?/g)
  for (const match of exportMatches) {
    const fromModule = match[2]
    if (fromModule?.startsWith("@")) continue

    const names = match[1]
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean)
    for (const name of names) {
      const cleanName = name.split(" as ").pop()?.trim() || name.trim()
      if (cleanName && !cleanName.startsWith("_") && !INTERNAL_EXPORTS.has(cleanName)) {
        const finalName = cleanName.replace(/^type\s+/, "")
        if (name.includes("type ")) {
          exports.push(`type ${finalName}`)
        } else {
          exports.push(finalName)
        }
      }
    }
  }
  return exports
}

async function regeneratePluginIndex() {
  if (!fs.existsSync(PLUGINS_DIR)) return

  const pluginDirs = fs.readdirSync(PLUGINS_DIR).filter((name) => {
    const pluginPath = path.join(PLUGINS_DIR, name)
    return fs.statSync(pluginPath).isDirectory()
  })

  // Phase 1: Collect all exports per plugin, detect conflicts
  const pluginExports = new Map()
  const nameCount = new Map()

  for (const pluginName of pluginDirs) {
    const pluginDir = path.join(PLUGINS_DIR, pluginName)
    const distIndex = path.join(pluginDir, "dist", "index.d.ts")

    if (!fs.existsSync(distIndex)) continue

    const dtsContent = fs.readFileSync(distIndex, "utf-8")
    const exportedNames = parseExportsFromDts(dtsContent)
    const named = exportedNames.filter((e) => !e.startsWith("type "))
    const types = exportedNames.filter((e) => e.startsWith("type ")).map((e) => e.slice(5))

    const overridable = named.filter((n) => isOverridableExport(n, dtsContent))
    const passthrough = named.filter((n) => !isOverridableExport(n, dtsContent))

    if (overridable.length > 0 || passthrough.length > 0 || types.length > 0) {
      pluginExports.set(pluginName, { overridable, passthrough, types })
      for (const n of [...overridable, ...passthrough]) {
        nameCount.set(n, (nameCount.get(n) ?? 0) + 1)
      }
    }
  }

  // Phase 2: Generate index with registry import, plugin map, and conditional top-level exports
  const lines = []

  lines.push(`import { componentRegistry } from "../../quartz/components/registry"`)
  lines.push("")

  // Type re-exports
  for (const [pluginName, { types }] of pluginExports) {
    if (types.length > 0) {
      lines.push(`export type { ${types.join(", ")} } from "./${pluginName}"`)
    }
  }

  // Direct re-exports for non-overridable values (constants, utility functions, etc.)
  for (const [pluginName, { passthrough }] of pluginExports) {
    if (passthrough.length === 0) continue
    const unique = passthrough.filter((n) => (nameCount.get(n) ?? 0) === 1)
    if (unique.length > 0) {
      lines.push(`export { ${unique.join(", ")} } from "./${pluginName}"`)
    }
  }
  lines.push("")

  // Generate the plugins map with override wrappers (overridable exports only)
  lines.push(
    `export const plugins: Record<string, Record<string, (...args: unknown[]) => void>> = {`,
  )
  for (const [pluginName, { overridable }] of pluginExports) {
    if (overridable.length === 0) continue
    const escapedName = pluginName.replace(/"/g, '\\"')
    lines.push(`  "${escapedName}": {`)
    for (const n of overridable) {
      lines.push(
        `    ${n}: (...args: unknown[]) => { componentRegistry.setOptionOverrides("${escapedName}", args[0] as Record<string, unknown>); },`,
      )
    }
    lines.push(`  },`)
  }
  lines.push(`}`)
  lines.push("")

  // Top-level exports for overridable names: alias to the plugins map wrapper
  for (const [pluginName, { overridable }] of pluginExports) {
    if (overridable.length === 0) continue

    const unique = overridable.filter((n) => (nameCount.get(n) ?? 0) === 1)
    const conflicting = overridable.filter((n) => (nameCount.get(n) ?? 0) > 1)

    if (unique.length > 0) {
      const escapedName = pluginName.replace(/"/g, '\\"')
      for (const n of unique) {
        lines.push(`export const ${n} = plugins["${escapedName}"].${n}`)
      }
    }

    if (conflicting.length > 0) {
      for (const n of conflicting) {
        console.warn(
          styleText("yellow", `⚠`),
          `Export "${n}" conflicts across plugins — use plugins["${pluginName}"].${n} in quartz.ts`,
        )
      }
    }
  }

  lines.push("")

  const indexContent = lines.join("\n")
  const indexPath = path.join(PLUGINS_DIR, "index.ts")
  fs.writeFileSync(indexPath, indexContent)
}

export async function handlePluginInstallUnified({
  names,
  fromConfig = false,
  latest = false,
  clean = false,
  dryRun = false,
  concurrency: concurrencyOption,
} = {}) {
  if (clean && latest) {
    console.log(styleText("red", "✗ --clean and --latest cannot be used together"))
    return
  }

  const resolvedConcurrency = Math.max(1, concurrencyOption ?? os.cpus().length)

  const pluginsJson = readPluginsJson()
  let lockfile = readLockfile()

  if (!fromConfig && !lockfile) {
    console.log(
      styleText("yellow", "⚠ No quartz.lock.json found. Run 'npx quartz plugin add <repo>' first."),
    )
    return
  }

  const resolvedNames = names
    ? names.map((name) =>
        resolveLockfileName(name, lockfile ?? { version: "1.0.0", plugins: {} }, pluginsJson),
      )
    : null
  const nameFilter = resolvedNames ? new Set(resolvedNames) : null

  if (dryRun && latest) {
    if (!lockfile || Object.keys(lockfile.plugins).length === 0) {
      console.log(styleText("gray", "No plugins installed"))
      return
    }

    const nameOverrides = getNameOverrides(lockfile, pluginsJson)

    const rows = Object.entries(lockfile.plugins)
      .filter(([name]) => !nameFilter || nameFilter.has(name))
      .map(([name, entry]) => ({
        name,
        entry,
        displayName: nameOverrides.get(name) ?? name,
      }))

    const isTTY = process.stdout.isTTY
    const nameWidth = Math.max(6, ...rows.map((row) => row.displayName.length)) + 2
    const header = `${"Plugin".padEnd(nameWidth)}${"Installed".padEnd(12)}${"Latest".padEnd(12)}Status`

    const renderRow = ({ displayName }, installed, latest, statusLabel) =>
      `${displayName.padEnd(nameWidth)}${installed.padEnd(12)}${latest.padEnd(12)}${statusLabel}`

    const updateRow = (index, installed, latest, statusLabel) => {
      if (!isTTY) return
      const offset = rows.length - index
      process.stdout.write(
        `\x1b[${offset}A\x1b[2K\r${renderRow(rows[index], installed, latest, statusLabel)}\x1b[${offset}B`,
      )
    }

    if (isTTY) {
      console.log(styleText("bold", "Checking for plugin updates...\n"))
      console.log(styleText("bold", header))
      console.log("─".repeat(header.length))
      for (const row of rows) {
        if (row.entry.commit === "local") {
          console.log(renderRow(row, "local", "—", styleText("green", "local")))
          continue
        }
        console.log(renderRow(row, row.entry.commit.slice(0, 7), "—", styleText("cyan", "⋯")))
      }
    }

    const promises = rows.map((row, index) => {
      if (row.entry.commit === "local") {
        return Promise.resolve({
          index,
          installed: "local",
          latest: "—",
          status: "local",
        })
      }

      const lsRemoteRef = row.entry.ref ? `refs/heads/${assertSafeRef(row.entry.ref)}` : "HEAD"
      return git(["ls-remote", assertSafeRepo(row.entry.resolved), lsRemoteRef])
        .then(({ stdout }) => {
          const latestCommit = stdout.split("\t")[0].trim()
          const isCurrent = latestCommit === row.entry.commit
          const installed = row.entry.commit.slice(0, 7)
          const latest = latestCommit.slice(0, 7)
          const statusLabel = isCurrent
            ? styleText("green", "up to date")
            : styleText("yellow", "update available")
          updateRow(index, installed, latest, statusLabel)
          return {
            index,
            installed,
            latest,
            status: isCurrent ? "up to date" : "update available",
          }
        })
        .catch(() => {
          const installed = row.entry.commit.slice(0, 7)
          const latest = "?"
          const statusLabel = styleText("red", "check failed")
          updateRow(index, installed, latest, statusLabel)
          return {
            index,
            installed,
            latest,
            status: "check failed",
          }
        })
    })

    const results = await Promise.all(promises)

    if (!isTTY) {
      console.log(styleText("bold", "Checking for plugin updates...\n"))
      console.log(styleText("bold", header))
      console.log("─".repeat(header.length))
      for (const { index, installed, latest, status } of results) {
        const color =
          status === "up to date" || status === "local"
            ? "green"
            : status === "check failed"
              ? "red"
              : "yellow"
        console.log(renderRow(rows[index], installed, latest, styleText(color, status)))
      }
    }
    return
  }

  if (fromConfig) {
    if (!pluginsJson?.plugins || pluginsJson.plugins.length === 0) {
      console.log(styleText("gray", "No plugins configured"))
      return
    }

    if (!lockfile) {
      lockfile = { version: "1.0.0", plugins: {} }
    }

    if (!fs.existsSync(PLUGINS_DIR)) {
      fs.mkdirSync(PLUGINS_DIR, { recursive: true })
    }

    const configNames = new Set(pluginsJson.plugins.map((entry) => extractPluginName(entry.source)))
    const orphans = Object.keys(lockfile.plugins).filter((name) => !configNames.has(name))

    const missing = pluginsJson.plugins
      .filter((entry) => {
        const name = extractPluginName(entry.source)
        const pluginDir = path.join(PLUGINS_DIR, name)
        if (lockfile.plugins[name] && fs.existsSync(pluginDir)) return false
        const src = getSourceUrl(entry.source)
        return (
          src.startsWith("github:") ||
          src.startsWith("git+") ||
          src.startsWith("https://") ||
          isLocalSource(src)
        )
      })
      .filter((entry) => {
        if (!nameFilter) return true
        const name = extractPluginName(entry.source)
        return nameFilter.has(name)
      })

    if (missing.length === 0) {
      console.log(styleText("green", "✓ All configured plugins are already installed"))
      if (dryRun) {
        if (orphans.length > 0) {
          console.log()
          console.log(`Found ${orphans.length} orphaned plugin(s) in lockfile:\n`)
          for (const name of orphans) {
            console.log(`  ${styleText("yellow", name)} — in lockfile but not in config`)
          }
          console.log()
          console.log(
            styleText("cyan", "Dry run — no changes made. Re-run without --dry-run to resolve."),
          )
        }
        return
      }
      if (orphans.length === 0) {
        return
      }
    }

    if (missing.length > 0) {
      console.log(`Found ${missing.length} uninstalled plugin(s) in config:\n`)
      for (const entry of missing) {
        const name = extractPluginName(entry.source)
        console.log(`  ${styleText("yellow", name)} — ${formatSource(entry.source)}`)
      }
      console.log()

      if (dryRun) {
        if (orphans.length > 0) {
          console.log(`Found ${orphans.length} orphaned plugin(s) in lockfile:\n`)
          for (const name of orphans) {
            console.log(`  ${styleText("yellow", name)} — in lockfile but not in config`)
          }
          console.log()
        }
        console.log(
          styleText("cyan", "Dry run — no changes made. Re-run without --dry-run to resolve."),
        )
        return
      }
    }

    const installed = []
    let failed = 0
    let lockfileChanged = false

    // Handle existing dirs and local symlinks (fast), collect remote clones
    const remoteEntries = []
    for (const entry of missing) {
      try {
        const { name, url, ref, local, subdir } = parseGitSource(entry.source)
        const pluginDir = path.join(PLUGINS_DIR, name)

        if (fs.existsSync(pluginDir)) {
          if (local) {
            console.log(
              styleText("yellow", `⚠ ${name} directory already exists, updating lockfile`),
            )
            lockfile.plugins[name] = {
              source: entry.source,
              resolved: url,
              commit: "local",
              ...(subdir && { subdir }),
              installedAt: new Date().toISOString(),
            }
            installed.push({ name, pluginDir })
            lockfileChanged = true
            continue
          }
          console.log(styleText("yellow", `⚠ ${name} directory already exists, updating lockfile`))
          const commit = getGitCommit(pluginDir)
          lockfile.plugins[name] = {
            source: entry.source,
            resolved: url,
            commit,
            ...(ref && { ref }),
            ...(subdir && { subdir }),
            installedAt: new Date().toISOString(),
          }
          installed.push({ name, pluginDir })
          lockfileChanged = true
          continue
        }

        if (local) {
          let resolvedPath = path.resolve(url)
          if (subdir) resolvedPath = path.join(resolvedPath, subdir)
          if (!fs.existsSync(resolvedPath)) {
            console.log(styleText("red", `✗ Local path does not exist: ${resolvedPath}`))
            failed++
            continue
          }
          console.log(styleText("cyan", `→ Linking ${name} from ${resolvedPath}...`))
          fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
          symlinkOrCopySync(resolvedPath, pluginDir)
          lockfile.plugins[name] = {
            source: entry.source,
            resolved: resolvedPath,
            commit: "local",
            ...(subdir && { subdir }),
            installedAt: new Date().toISOString(),
          }
          installed.push({ name, pluginDir })
          lockfileChanged = true
          console.log(styleText("green", `✓ Linked ${name} (local)`))
        } else {
          remoteEntries.push({ entry, name, url, ref, subdir, pluginDir })
        }
      } catch (error) {
        console.log(styleText("red", `✗ Failed to resolve ${formatSource(entry.source)}: ${error}`))
        failed++
      }
    }

    // Clone remote plugins in parallel
    if (remoteEntries.length > 0) {
      const concurrency = resolvedConcurrency
      await runParallel(
        remoteEntries,
        concurrency,
        async ({ entry, name, url, ref, subdir, pluginDir }) => {
          try {
            if (subdir) {
              console.log(styleText("cyan", `→ Cloning ${name} from ${url} (subdir: ${subdir})...`))
              fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
              const commit = await cloneWithSubdirAsync({ url, ref, subdir, pluginDir })
              lockfile.plugins[name] = {
                source: entry.source,
                resolved: url,
                commit,
                ...(ref && { ref }),
                subdir,
                installedAt: new Date().toISOString(),
              }
              installed.push({ name, pluginDir })
              lockfileChanged = true
              console.log(
                styleText("green", `✓ Cloned ${name}@${commit.slice(0, 7)} (subdir: ${subdir})`),
              )
            } else {
              console.log(styleText("cyan", `→ Cloning ${name} from ${url}...`))

              await git(cloneArgs({ url, ref, dest: pluginDir }))

              const { stdout } = await git(["rev-parse", "HEAD"], { cwd: pluginDir })
              const commit = stdout.trim()
              lockfile.plugins[name] = {
                source: entry.source,
                resolved: url,
                commit,
                ...(ref && { ref }),
                installedAt: new Date().toISOString(),
              }

              installed.push({ name, pluginDir })
              lockfileChanged = true
              console.log(styleText("green", `✓ Cloned ${name}@${commit.slice(0, 7)}`))
            }
          } catch (error) {
            console.log(
              styleText("red", `✗ Failed to resolve ${formatSource(entry.source)}: ${error}`),
            )
            failed++
          }
        },
      )
    }

    if (installed.length > 0) {
      console.log()
      console.log(styleText("cyan", "→ Building plugins..."))
      const concurrency = resolvedConcurrency
      const results = await runParallel(installed, concurrency, async ({ name, pluginDir }) => {
        const ok = await buildPluginAsync(pluginDir, name)
        if (ok) console.log(styleText("green", `  ✓ ${name} built`))
        return ok
      })
      for (const ok of results) {
        if (!ok) failed++
      }
      await regeneratePluginIndex()
    }

    if (orphans.length > 0) {
      console.log()
      let removedOrphans = false
      for (const name of orphans) {
        const entry = lockfile.plugins[name]
        if (entry?.commit === "local") {
          console.log(
            styleText(
              "yellow",
              `⚠ ${name} is a local plugin not in config — skipping (remove manually with 'plugin remove')`,
            ),
          )
          continue
        }
        const pluginDir = path.join(PLUGINS_DIR, name)
        if (fs.existsSync(pluginDir)) {
          fs.rmSync(pluginDir, { recursive: true })
        }
        delete lockfile.plugins[name]
        lockfileChanged = true
        removedOrphans = true
        console.log(styleText("yellow", `✗ Removed ${name} (not in config)`))
      }
      if (removedOrphans) {
        await regeneratePluginIndex()
      }
    }

    if (lockfileChanged) {
      writeLockfile(lockfile)
      console.log()
      if (failed === 0) {
        console.log(styleText("green", `✓ Resolved ${installed.length} plugin(s)`))
      } else {
        console.log(
          styleText("yellow", `⚠ Resolved ${installed.length} plugin(s), ${failed} failed`),
        )
      }
      console.log(styleText("gray", "Updated quartz.lock.json"))
    } else if (failed > 0) {
      console.log()
      console.log(styleText("yellow", `⚠ Resolved ${installed.length} plugin(s), ${failed} failed`))
    }

    return
  }

  if (dryRun) {
    const entries = Object.entries(lockfile.plugins).filter(([name]) =>
      nameFilter ? nameFilter.has(name) : true,
    )
    if (entries.length === 0) {
      console.log(styleText("gray", "No plugins installed"))
      return
    }

    console.log(styleText("cyan", "→ Dry run: plugins to install from lockfile..."))
    for (const [name, entry] of entries) {
      const sourceLabel = entry.source ? formatSource(entry.source) : entry.resolved
      const commitLabel = entry.commit === "local" ? "local" : entry.commit.slice(0, 7)
      console.log(`  ${styleText("yellow", name)} — ${sourceLabel} (${commitLabel})`)
    }
    return
  }

  if (clean) {
    console.log(styleText("cyan", "→ Restoring plugins from lockfile..."))
    console.log()

    if (!fs.existsSync(PLUGINS_DIR)) {
      fs.mkdirSync(PLUGINS_DIR, { recursive: true })
    }

    let installed = 0
    let failed = 0
    const restoredPlugins = []

    const entries = Object.entries(lockfile.plugins).filter(([name]) =>
      nameFilter ? nameFilter.has(name) : true,
    )

    // Handle local symlinks and collect remote plugins to clone
    const remotePlugins = []
    for (const [name, entry] of entries) {
      const pluginDir = path.join(PLUGINS_DIR, name)

      if (fs.existsSync(pluginDir)) {
        console.log(styleText("yellow", `⚠ ${name}: directory exists, skipping`))
        continue
      }

      if (entry.commit === "local") {
        try {
          if (!fs.existsSync(entry.resolved)) {
            console.log(styleText("red", `  ✗ ${name}: local path missing: ${entry.resolved}`))
            failed++
            continue
          }
          fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
          symlinkOrCopySync(entry.resolved, pluginDir)
          console.log(styleText("green", `✓ ${name} restored (local symlink)`))
          restoredPlugins.push({ name, pluginDir })
          installed++
        } catch {
          console.log(styleText("red", `✗ ${name}: failed to restore local symlink`))
          failed++
        }
        continue
      }

      remotePlugins.push({ name, entry, pluginDir })
    }

    // Clone remote plugins in parallel
    if (remotePlugins.length > 0) {
      const concurrency = resolvedConcurrency
      await runParallel(remotePlugins, concurrency, async ({ name, entry, pluginDir }) => {
        try {
          if (entry.subdir) {
            console.log(
              styleText(
                "cyan",
                `→ ${name}: cloning ${entry.resolved}@${entry.commit.slice(0, 7)} (subdir: ${entry.subdir})...`,
              ),
            )
            fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
            await cloneWithSubdirAsync({
              url: entry.resolved,
              ref: entry.ref,
              subdir: entry.subdir,
              pluginDir,
            })
          } else {
            console.log(
              styleText(
                "cyan",
                `→ ${name}: cloning ${entry.resolved}@${entry.commit.slice(0, 7)}...`,
              ),
            )
            await git(cloneArgs({ url: entry.resolved, ref: entry.ref, dest: pluginDir }))
            await git(["checkout", assertSafeCommit(entry.commit)], { cwd: pluginDir })
          }
          console.log(styleText("green", `✓ ${name} restored`))
          restoredPlugins.push({ name, pluginDir })
          installed++
        } catch {
          console.log(styleText("red", `✗ ${name}: failed to restore`))
          failed++
        }
      })
    }

    if (restoredPlugins.length > 0) {
      console.log()
      console.log(styleText("cyan", "→ Building restored plugins..."))
      const concurrency = resolvedConcurrency
      const results = await runParallel(
        restoredPlugins,
        concurrency,
        async ({ name, pluginDir }) => {
          const ok = await buildPluginAsync(pluginDir, name)
          if (ok) console.log(styleText("green", `  ✓ ${name} built`))
          return ok
        },
      )
      for (const ok of results) {
        if (!ok) {
          failed++
          installed--
        }
      }
      await regeneratePluginIndex()
    }

    console.log()
    if (failed === 0) {
      console.log(styleText("green", `✓ Restored ${installed} plugin(s)`))
    } else {
      console.log(styleText("yellow", `⚠ Restored ${installed} plugin(s), ${failed} failed`))
    }
    return
  }

  if (latest) {
    const pluginsToUpdate = nameFilter ? Array.from(nameFilter) : Object.keys(lockfile.plugins)
    const updatedPlugins = []
    let lockfileChanged = false

    // Phase 1: Validate and categorize plugins (fast, sequential)
    const validPlugins = []
    for (const name of pluginsToUpdate) {
      const entry = lockfile.plugins[name]
      if (!entry) {
        console.log(styleText("yellow", `⚠ ${name} is not installed`))
        continue
      }

      const pluginDir = path.join(PLUGINS_DIR, name)
      if (!fs.existsSync(pluginDir)) {
        console.log(
          styleText("yellow", `⚠ ${name} directory missing. Run 'npx quartz plugin install'.`),
        )
        continue
      }

      if (entry.commit === "local") {
        console.log(styleText("cyan", `→ Rebuilding local plugin ${name}...`))
        updatedPlugins.push({ name, pluginDir })
        continue
      }

      validPlugins.push({ name, pluginDir, entry })
    }

    // Phase 2: Fetch/update plugins in parallel
    if (validPlugins.length > 0) {
      const concurrency = resolvedConcurrency
      await runParallel(validPlugins, concurrency, async ({ name, pluginDir, entry }) => {
        try {
          console.log(styleText("cyan", `→ Updating ${name}...`))

          if (entry.subdir) {
            fs.rmSync(pluginDir, { recursive: true })
            fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
            const newCommit = await cloneWithSubdirAsync({
              url: entry.resolved,
              ref: entry.ref,
              subdir: entry.subdir,
              pluginDir,
            })
            if (needsBuild(pluginDir)) {
              updatedPlugins.push({ name, pluginDir })
            }
            if (newCommit !== entry.commit) {
              entry.commit = newCommit
              entry.installedAt = new Date().toISOString()
              lockfileChanged = true
              console.log(
                styleText(
                  "green",
                  `✓ Updated ${name} to ${newCommit.slice(0, 7)} (subdir: ${entry.subdir})`,
                ),
              )
            } else {
              console.log(styleText("gray", `✓ ${name} rebuilt (subdir: ${entry.subdir})`))
            }
          } else {
            const fetchArgs = ["fetch", "--depth", "1", "origin"]
            if (entry.ref) fetchArgs.push(assertSafeRef(entry.ref))
            const resetTarget = entry.ref ? `origin/${assertSafeRef(entry.ref)}` : "origin/HEAD"
            await git(fetchArgs, { cwd: pluginDir })
            await git(["reset", "--hard", resetTarget], { cwd: pluginDir })

            const { stdout } = await git(["rev-parse", "HEAD"], { cwd: pluginDir })
            const newCommit = stdout.trim()
            if (newCommit !== entry.commit) {
              entry.commit = newCommit
              entry.installedAt = new Date().toISOString()
              updatedPlugins.push({ name, pluginDir })
              lockfileChanged = true
              console.log(styleText("green", `✓ Updated ${name} to ${newCommit.slice(0, 7)}`))
            } else {
              console.log(styleText("gray", `✓ ${name} already up to date`))
            }
          }
        } catch (error) {
          console.log(styleText("red", `✗ Failed to update ${name}: ${error}`))
        }
      })
    }

    // Phase 3: Build updated plugins in parallel
    if (updatedPlugins.length > 0) {
      console.log()
      console.log(styleText("cyan", "→ Rebuilding updated plugins..."))
      const concurrency = resolvedConcurrency
      await runParallel(updatedPlugins, concurrency, async ({ name, pluginDir }) => {
        const ok = await buildPluginAsync(pluginDir, name)
        if (ok) console.log(styleText("green", `  ✓ ${name} rebuilt`))
        return ok
      })
      await regeneratePluginIndex()
    }

    if (lockfileChanged) {
      writeLockfile(lockfile)
      console.log()
      console.log(styleText("gray", "Updated quartz.lock.json"))
    }
    return
  }

  if (!fs.existsSync(PLUGINS_DIR)) {
    fs.mkdirSync(PLUGINS_DIR, { recursive: true })
  }

  const entries = Object.entries(lockfile.plugins).filter(([name]) =>
    nameFilter ? nameFilter.has(name) : true,
  )
  if (entries.length === 0) {
    console.log(styleText("gray", "No plugins installed"))
    return
  }

  console.log(styleText("cyan", "→ Installing plugins from lockfile..."))
  let installed = 0
  let failed = 0
  const pluginsToBuild = []

  // Handle local plugins and collect entries needing git operations
  const gitEntries = []
  for (const [name, entry] of entries) {
    const pluginDir = path.join(PLUGINS_DIR, name)

    if (entry.commit === "local") {
      try {
        if (fs.existsSync(pluginDir)) {
          const stat = fs.lstatSync(pluginDir)
          if (stat.isSymbolicLink() && fs.readlinkSync(pluginDir) === entry.resolved) {
            console.log(styleText("gray", `  ✓ ${name} (local) already linked`))
            installed++
            continue
          }
          if (stat.isSymbolicLink()) fs.unlinkSync(pluginDir)
          else fs.rmSync(pluginDir, { recursive: true })
        }
        if (!fs.existsSync(entry.resolved)) {
          console.log(styleText("red", `  ✗ ${name}: local path missing: ${entry.resolved}`))
          failed++
          continue
        }
        fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
        symlinkOrCopySync(entry.resolved, pluginDir)
        console.log(styleText("green", `  ✓ ${name} (local) linked`))
        pluginsToBuild.push({ name, pluginDir })
        installed++
      } catch {
        console.log(styleText("red", `  ✗ ${name}: failed to link local path`))
        failed++
      }
      continue
    }

    if (fs.existsSync(pluginDir)) {
      if (entry.subdir) {
        if (!needsBuild(pluginDir)) {
          console.log(
            styleText("gray", `  ✓ ${name}@${entry.commit.slice(0, 7)} already installed (subdir)`),
          )
          installed++
          continue
        }
        pluginsToBuild.push({ name, pluginDir })
        installed++
      } else {
        const currentCommit = getGitCommit(pluginDir)
        if (currentCommit === entry.commit && !needsBuild(pluginDir)) {
          console.log(
            styleText("gray", `  ✓ ${name}@${entry.commit.slice(0, 7)} already installed`),
          )
          installed++
          continue
        }
        if (currentCommit !== entry.commit) {
          gitEntries.push({ name, entry, pluginDir, action: "update" })
        } else {
          pluginsToBuild.push({ name, pluginDir })
          installed++
        }
      }
    } else {
      gitEntries.push({ name, entry, pluginDir, action: "clone" })
    }
  }

  // Run git fetch/clone operations in parallel
  if (gitEntries.length > 0) {
    const concurrency = resolvedConcurrency
    await runParallel(gitEntries, concurrency, async ({ name, entry, pluginDir, action }) => {
      try {
        if (action === "update") {
          console.log(styleText("cyan", `  → ${name}: updating to ${entry.commit.slice(0, 7)}...`))
          const fetchArgs = ["fetch", "--depth", "1", "origin"]
          if (entry.ref) fetchArgs.push(assertSafeRef(entry.ref))
          await git(fetchArgs, { cwd: pluginDir })
          await git(["reset", "--hard", assertSafeCommit(entry.commit)], { cwd: pluginDir })
          pluginsToBuild.push({ name, pluginDir })
          installed++
        } else {
          if (entry.subdir) {
            console.log(styleText("cyan", `  → ${name}: cloning (subdir: ${entry.subdir})...`))
            fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
            await cloneWithSubdirAsync({
              url: entry.resolved,
              ref: entry.ref,
              subdir: entry.subdir,
              pluginDir,
            })
          } else {
            console.log(styleText("cyan", `  → ${name}: cloning...`))
            await git(cloneArgs({ url: entry.resolved, ref: entry.ref, dest: pluginDir }))
            if (entry.commit !== "unknown") {
              const commit = assertSafeCommit(entry.commit)
              await git(["fetch", "--depth", "1", "origin", commit], { cwd: pluginDir })
              await git(["checkout", commit], { cwd: pluginDir })
            }
          }
          console.log(styleText("green", `  ✓ ${name}@${entry.commit.slice(0, 7)}`))
          pluginsToBuild.push({ name, pluginDir })
          installed++
        }
      } catch {
        console.log(
          styleText("red", `  ✗ ${name}: failed to ${action === "update" ? "update" : "clone"}`),
        )
        failed++
      }
    })
  }

  if (pluginsToBuild.length > 0) {
    console.log()
    console.log(styleText("cyan", "→ Building plugins..."))
    const concurrency = resolvedConcurrency
    const results = await runParallel(pluginsToBuild, concurrency, async ({ name, pluginDir }) => {
      const ok = await buildPluginAsync(pluginDir, name)
      if (ok) console.log(styleText("green", `  ✓ ${name} built`))
      return ok
    })
    for (const ok of results) {
      if (!ok) {
        failed++
        installed--
      }
    }
  }

  await regeneratePluginIndex()

  console.log()
  if (failed === 0) {
    console.log(styleText("green", `✓ Installed ${installed} plugin(s)`))
  } else {
    console.log(styleText("yellow", `⚠ Installed ${installed} plugin(s), ${failed} failed`))
  }
}

export async function handlePluginInstall() {
  return handlePluginInstallUnified()
}

export async function handlePluginAdd(
  sources,
  { name: nameOverride, subdir: subdirOverride, concurrency: concurrencyOption } = {},
) {
  if (nameOverride && sources.length > 1) {
    console.log(styleText("red", "✗ --name/--as can only be used when adding a single plugin"))
    return
  }
  if (subdirOverride && sources.length > 1) {
    console.log(styleText("red", "✗ --subdir can only be used when adding a single plugin"))
    return
  }

  const resolvedConcurrency = Math.max(1, concurrencyOption ?? os.cpus().length)

  let lockfile = readLockfile()
  if (!lockfile) {
    lockfile = { version: "1.0.0", plugins: {} }
  }

  if (!fs.existsSync(PLUGINS_DIR)) {
    fs.mkdirSync(PLUGINS_DIR, { recursive: true })
  }

  const addedPlugins = []

  // Handle local plugins and collect remote sources to clone
  const remoteSources = []
  for (const source of sources) {
    try {
      const parsed = parseGitSource(source)
      if (parsed.npmPackage) {
        const name = nameOverride ?? parsed.name
        console.log(styleText("cyan", `→ Installing ${name} from npm...`))
        execFileSync("npm", ["install", "--", parsed.name], {
          cwd: process.cwd(),
          stdio: "inherit",
        })
        const configSource = nameOverride ? { repo: parsed.name, name: nameOverride } : parsed.name
        const pluginDir = path.join(process.cwd(), "node_modules", ...parsed.name.split("/"))
        addedPlugins.push({ name, pluginDir, source: parsed.name, configSource })
        continue
      }
      const name = nameOverride ?? parsed.name
      const url = parsed.url
      const ref = parsed.ref
      const local = parsed.local
      const subdir = subdirOverride ?? parsed.subdir
      const pluginDir = path.join(PLUGINS_DIR, name)

      let configSource = undefined
      if (nameOverride || subdirOverride) {
        configSource = { repo: source }
        if (nameOverride) configSource.name = nameOverride
        if (subdirOverride) configSource.subdir = subdirOverride
      }

      if (fs.existsSync(pluginDir)) {
        console.log(styleText("yellow", `⚠ ${name} already exists. Use 'update' to refresh.`))
        continue
      }

      if (local) {
        let resolvedPath = path.resolve(url)
        if (subdir) resolvedPath = path.join(resolvedPath, subdir)
        if (!fs.existsSync(resolvedPath)) {
          console.log(styleText("red", `✗ Local path does not exist: ${resolvedPath}`))
          continue
        }
        console.log(styleText("cyan", `→ Adding ${name} from local path ${resolvedPath}...`))
        fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
        symlinkOrCopySync(resolvedPath, pluginDir)
        lockfile.plugins[name] = {
          source,
          resolved: resolvedPath,
          commit: "local",
          ...(subdir && { subdir }),
          installedAt: new Date().toISOString(),
        }
        addedPlugins.push({ name, pluginDir, source, configSource })
        console.log(styleText("green", `✓ Added ${name} (local symlink)`))
      } else {
        remoteSources.push({ source, name, url, ref, subdir, pluginDir, configSource })
      }
    } catch (error) {
      console.log(styleText("red", `✗ Failed to add ${formatSource(source)}: ${error}`))
    }
  }

  // Clone remote plugins in parallel
  if (remoteSources.length > 0) {
    const concurrency = resolvedConcurrency
    await runParallel(
      remoteSources,
      concurrency,
      async ({ source, name, url, ref, subdir, pluginDir, configSource }) => {
        try {
          if (subdir) {
            console.log(styleText("cyan", `→ Adding ${name} from ${url} (subdir: ${subdir})...`))
            fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
            const commit = await cloneWithSubdirAsync({ url, ref, subdir, pluginDir })
            lockfile.plugins[name] = {
              source,
              resolved: url,
              commit,
              ...(ref && { ref }),
              subdir,
              installedAt: new Date().toISOString(),
            }
            addedPlugins.push({ name, pluginDir, source, configSource })
            console.log(
              styleText("green", `✓ Added ${name}@${commit.slice(0, 7)} (subdir: ${subdir})`),
            )
          } else {
            console.log(styleText("cyan", `→ Adding ${name} from ${url}...`))

            await git(cloneArgs({ url, ref, dest: pluginDir }))

            const { stdout } = await git(["rev-parse", "HEAD"], { cwd: pluginDir })
            const commit = stdout.trim()
            lockfile.plugins[name] = {
              source,
              resolved: url,
              commit,
              ...(ref && { ref }),
              installedAt: new Date().toISOString(),
            }

            addedPlugins.push({ name, pluginDir, source, configSource })
            console.log(styleText("green", `✓ Added ${name}@${commit.slice(0, 7)}`))
          }
        } catch (error) {
          console.log(styleText("red", `✗ Failed to add ${formatSource(source)}: ${error}`))
        }
      },
    )
  }

  if (addedPlugins.length > 0) {
    console.log()
    console.log(styleText("cyan", "→ Building plugins..."))
    const concurrency = resolvedConcurrency
    await runParallel(addedPlugins, concurrency, async ({ name, pluginDir }) => {
      const ok = await buildPluginAsync(pluginDir, name)
      if (ok) console.log(styleText("green", `  ✓ ${name} built`))
      return ok
    })
    await regeneratePluginIndex()
  }

  writeLockfile(lockfile)
  const pluginsJson = readPluginsJson()
  if (pluginsJson?.plugins) {
    for (const { pluginDir, source, configSource } of addedPlugins) {
      const manifest = readManifestFromPackageJson(pluginDir)
      const newEntry = {
        source: configSource ?? source,
        enabled: manifest?.defaultEnabled ?? true,
        options: manifest?.defaultOptions ?? {},
        order: manifest?.defaultOrder ?? 50,
      }

      if (manifest?.components) {
        const layoutPositions = new Set(["left", "right", "beforeBody", "afterBody"])
        const firstComponentKey = Object.keys(manifest.components)[0]
        const comp = manifest.components[firstComponentKey]
        if (comp?.defaultPosition && layoutPositions.has(comp.defaultPosition)) {
          newEntry.layout = {
            position: comp.defaultPosition,
            priority: comp.defaultPriority ?? 50,
          }
        }
      }

      pluginsJson.plugins.push(newEntry)
    }
    writePluginsJson(pluginsJson)
  }
  console.log()
  console.log(styleText("gray", "Updated quartz.lock.json"))
}

export async function handlePluginRemove(names) {
  const lockfile = readLockfile()
  if (!lockfile) {
    console.log(styleText("yellow", "⚠ No plugins installed"))
    return
  }

  const pluginsJson = readPluginsJson()
  let removed = false
  const resolvedNames = []
  for (const name of names) {
    const lockKey = resolveLockfileName(name, lockfile, pluginsJson)
    resolvedNames.push(lockKey)
    const pluginDir = path.join(PLUGINS_DIR, lockKey)

    if (!lockfile.plugins[lockKey] && !fs.existsSync(pluginDir)) {
      console.log(styleText("yellow", `⚠ ${name} is not installed`))
      continue
    }

    const displayName = lockKey !== name ? `${name} (${lockKey})` : name
    console.log(styleText("cyan", `→ Removing ${displayName}...`))

    if (fs.existsSync(pluginDir)) {
      fs.rmSync(pluginDir, { recursive: true })
    }

    delete lockfile.plugins[lockKey]
    console.log(styleText("green", `✓ Removed ${displayName}`))
    removed = true
  }

  if (removed) {
    await regeneratePluginIndex()
  }

  writeLockfile(lockfile)
  if (pluginsJson?.plugins) {
    pluginsJson.plugins = pluginsJson.plugins.filter(
      (plugin) =>
        !names.includes(extractPluginName(plugin.source)) &&
        !names.includes(formatSource(plugin.source)) &&
        !resolvedNames.includes(extractPluginName(plugin.source)),
    )
    writePluginsJson(pluginsJson)
  }
  console.log()
  console.log(styleText("gray", "Updated quartz.lock.json"))
}

export async function handlePluginEnable(names) {
  const json = readPluginsJson()
  if (!json) {
    console.log(styleText("red", "✗ No quartz.config.yaml found. Cannot enable plugins."))
    return
  }

  for (const name of names) {
    const entry = json.plugins.find(
      (e) => extractPluginName(e.source) === name || formatSource(e.source) === name,
    )
    if (!entry) {
      console.log(styleText("yellow", `⚠ Plugin "${name}" not found in quartz.config.yaml`))
      continue
    }
    if (entry.enabled) {
      console.log(styleText("gray", `✓ ${name} is already enabled`))
      continue
    }
    entry.enabled = true
    console.log(styleText("green", `✓ Enabled ${name}`))
  }

  writePluginsJson(json)
}

export async function handlePluginDisable(names) {
  const json = readPluginsJson()
  if (!json) {
    console.log(styleText("red", "✗ No quartz.config.yaml found. Cannot disable plugins."))
    return
  }

  for (const name of names) {
    const entry = json.plugins.find(
      (e) => extractPluginName(e.source) === name || formatSource(e.source) === name,
    )
    if (!entry) {
      console.log(styleText("yellow", `⚠ Plugin "${name}" not found in quartz.config.yaml`))
      continue
    }
    if (!entry.enabled) {
      console.log(styleText("gray", `✓ ${name} is already disabled`))
      continue
    }
    entry.enabled = false
    console.log(styleText("green", `✓ Disabled ${name}`))
  }

  writePluginsJson(json)
}

export async function handlePluginConfig(name, options = {}) {
  const json = readPluginsJson()
  if (!json) {
    console.log(styleText("red", "✗ No quartz.config.yaml found."))
    return
  }

  const entry = json.plugins.find(
    (e) => extractPluginName(e.source) === name || formatSource(e.source) === name,
  )
  if (!entry) {
    console.log(styleText("red", `✗ Plugin "${name}" not found in quartz.config.yaml`))
    return
  }

  if (options.set) {
    const eqIndex = options.set.indexOf("=")
    if (eqIndex === -1) {
      console.log(styleText("red", "✗ Invalid format. Use: --set key=value"))
      return
    }
    const key = options.set.slice(0, eqIndex)
    let value = options.set.slice(eqIndex + 1)

    try {
      value = JSON.parse(value)
    } catch {}

    if (!entry.options) entry.options = {}
    entry.options[key] = value
    writePluginsJson(json)
    console.log(styleText("green", `✓ Set ${name}.${key} = ${JSON.stringify(value)}`))
  } else {
    console.log(styleText("bold", `Plugin: ${name}`))
    console.log(`  Source: ${formatSource(entry.source)}`)
    console.log(`  Enabled: ${entry.enabled}`)
    console.log(`  Order: ${entry.order ?? 50}`)
    if (entry.options && Object.keys(entry.options).length > 0) {
      console.log(`  Options:`)
      for (const [k, v] of Object.entries(entry.options)) {
        console.log(`    ${k}: ${JSON.stringify(v)}`)
      }
    } else {
      console.log(`  Options: (none)`)
    }
    if (entry.layout) {
      console.log(`  Layout:`)
      for (const [k, v] of Object.entries(entry.layout)) {
        console.log(`    ${k}: ${JSON.stringify(v)}`)
      }
    }
  }
}

export async function handlePluginCheck() {
  return handlePluginInstallUnified({ latest: true, dryRun: true })
}

export async function handlePluginUpdate(names) {
  return handlePluginInstallUnified({ names, latest: true })
}

export async function handlePluginList() {
  const lockfile = readLockfile()
  if (!lockfile || Object.keys(lockfile.plugins).length === 0) {
    console.log(styleText("gray", "No plugins installed"))
    return
  }

  const pluginsJson = readPluginsJson()
  const nameOverrides = getNameOverrides(lockfile, pluginsJson)

  console.log(styleText("bold", "Installed Plugins:"))
  console.log()

  for (const [name, entry] of Object.entries(lockfile.plugins)) {
    const pluginDir = path.join(PLUGINS_DIR, name)
    const exists = fs.existsSync(pluginDir)
    const overriddenName = nameOverrides.get(name)
    const displayLabel = overriddenName
      ? `${overriddenName} ${styleText("gray", `(dir: ${name})`)}`
      : name

    if (entry.commit === "local") {
      const isLinked = exists && fs.lstatSync(pluginDir).isSymbolicLink()
      const status = isLinked ? styleText("green", "✓") : styleText("red", "✗")
      console.log(`  ${status} ${styleText("bold", displayLabel)}`)
      console.log(`    Source: ${formatSource(entry.source)}`)
      console.log(`    Type: local symlink`)
      console.log(`    Target: ${entry.resolved}`)
      console.log(`    Installed: ${new Date(entry.installedAt).toLocaleDateString()}`)
      console.log()
      continue
    }

    let currentCommit = entry.commit

    if (exists) {
      currentCommit = getGitCommit(pluginDir)
    }

    const status = exists
      ? currentCommit === entry.commit
        ? styleText("green", "✓")
        : styleText("yellow", "⚡")
      : styleText("red", "✗")

    console.log(`  ${status} ${styleText("bold", displayLabel)}`)
    console.log(`    Source: ${formatSource(entry.source)}`)
    console.log(`    Commit: ${entry.commit.slice(0, 7)}`)
    if (currentCommit !== entry.commit && exists) {
      console.log(`    Current: ${currentCommit.slice(0, 7)} (modified)`)
    }
    console.log(`    Installed: ${new Date(entry.installedAt).toLocaleDateString()}`)
    console.log()
  }
}

export async function handlePluginStatus() {
  const lockfile = readLockfile()
  if (!lockfile || Object.keys(lockfile.plugins).length === 0) {
    console.log(styleText("gray", "No plugins installed"))
    return
  }

  const pluginsJson = readPluginsJson()
  const nameOverrides = getNameOverrides(lockfile, pluginsJson)
  const enabledByName = new Map(
    (pluginsJson?.plugins ?? []).map((entry) => [
      extractPluginName(entry.source),
      entry.enabled !== false,
    ]),
  )

  const rows = Object.entries(lockfile.plugins).map(([name, entry]) => {
    const pluginDir = path.join(PLUGINS_DIR, name)
    const exists = fs.existsSync(pluginDir)
    const displayName = nameOverrides.get(name) ?? name
    const sourceLabel = formatSource(entry.source)
    const commitLabel = entry.commit === "local" ? "local" : `@${entry.commit.slice(0, 7)}`
    const enabled = enabledByName.get(name) ?? false
    return { name, entry, exists, displayName, sourceLabel, commitLabel, enabled }
  })

  const nameWidth = Math.max(8, ...rows.map((row) => row.displayName.length)) + 2
  const sourceWidth = Math.max(8, ...rows.map((row) => row.sourceLabel.length)) + 2
  const commitWidth = Math.max(6, ...rows.map((row) => row.commitLabel.length)) + 2
  const enabledWidth = Math.max("enabled".length, "disabled".length) + 2
  const updateWidth =
    Math.max(
      "— local".length,
      "⋯".length,
      "✓ up to date".length,
      "↑ update available".length,
      "✗ check failed".length,
    ) + 2

  const formatRow = (row, updateLabel, updateText) => {
    const statusIcon = row.exists ? styleText("green", "✓") : styleText("red", "✗")
    const enabledText = row.enabled ? "enabled" : "disabled"
    const enabledLabel = row.enabled
      ? styleText("green", enabledText)
      : styleText("gray", enabledText)
    const enabledColumn = `${enabledLabel}${" ".repeat(enabledWidth - enabledText.length)}`
    const updateColumn = `${updateLabel}${" ".repeat(Math.max(0, updateWidth - updateText.length))}`
    return `  ${statusIcon} ${row.displayName.padEnd(nameWidth)}${row.sourceLabel.padEnd(
      sourceWidth,
    )}${row.commitLabel.padEnd(commitWidth)}${enabledColumn}${updateColumn}`
  }

  const updateDisplay = (status) => {
    switch (status) {
      case "local":
        return { text: "— local", label: styleText("gray", "— local") }
      case "up_to_date":
        return { text: "✓ up to date", label: styleText("green", "✓ up to date") }
      case "update_available":
        return { text: "↑ update available", label: styleText("yellow", "↑ update available") }
      case "failed":
        return { text: "✗ check failed", label: styleText("red", "✗ check failed") }
      default:
        return { text: "⋯", label: styleText("cyan", "⋯") }
    }
  }

  const isTTY = process.stdout.isTTY

  const updateLine = (index, updateLabel, updateText) => {
    if (!isTTY) return
    const offset = rows.length - index
    process.stdout.write(
      `\x1b[${offset}A\x1b[2K\r${formatRow(rows[index], updateLabel, updateText)}\x1b[${offset}B`,
    )
  }

  if (isTTY) {
    console.log(styleText("bold", "Installed Plugins:"))
    console.log()
    for (const row of rows) {
      const display =
        row.entry.commit === "local" ? updateDisplay("local") : updateDisplay("checking")
      console.log(formatRow(row, display.label, display.text))
    }
  }

  const promises = rows.map((row, index) => {
    if (row.entry.commit === "local") {
      return Promise.resolve({
        index,
        status: "local",
        name: row.displayName,
      })
    }

    const lsRemoteRef = row.entry.ref ? `refs/heads/${assertSafeRef(row.entry.ref)}` : "HEAD"
    return git(["ls-remote", assertSafeRepo(row.entry.resolved), lsRemoteRef])
      .then(({ stdout }) => {
        const latestCommit = stdout.split("\t")[0].trim()
        const status = latestCommit === row.entry.commit ? "up_to_date" : "update_available"
        const display = updateDisplay(status)
        updateLine(index, display.label, display.text)
        return { index, status, name: row.displayName }
      })
      .catch(() => {
        const display = updateDisplay("failed")
        updateLine(index, display.label, display.text)
        return { index, status: "failed", name: row.displayName }
      })
  })

  const results = await Promise.all(promises)
  const updatesAvailable = results
    .filter((result) => result.status === "update_available")
    .map((result) => result.name)
  const failedChecks = results
    .filter((result) => result.status === "failed")
    .map((result) => result.name)

  if (!isTTY) {
    console.log(styleText("bold", "Installed Plugins:"))
    console.log()
    for (const result of results) {
      const row = rows[result.index]
      const display = updateDisplay(result.status)
      console.log(formatRow(row, display.label, display.text))
    }
  }

  if (updatesAvailable.length === 0 && failedChecks.length === 0) {
    console.log(styleText("green", "\n✓ All plugins up to date"))
    return
  }

  if (updatesAvailable.length > 0) {
    console.log(styleText("yellow", `\nUpdates available: ${updatesAvailable.join(", ")}`))
    console.log(styleText("gray", "Run 'npx quartz plugin install --latest' to update."))
  }

  if (failedChecks.length > 0) {
    console.log(styleText("red", `\nChecks failed: ${failedChecks.join(", ")}`))
  }
}

export async function handlePluginRestore() {
  return handlePluginInstallUnified({ clean: true })
}

export async function handlePluginPrune({ dryRun = false } = {}) {
  const lockfile = readLockfile()
  if (!lockfile || Object.keys(lockfile.plugins).length === 0) {
    console.log(styleText("gray", "No plugins installed"))
    return
  }

  const pluginsJson = readPluginsJson()
  const configuredNames = new Set(
    (pluginsJson?.plugins ?? []).map((entry) => extractPluginName(entry.source)),
  )

  const orphans = Object.keys(lockfile.plugins).filter((name) => !configuredNames.has(name))

  if (orphans.length === 0) {
    console.log(styleText("green", "✓ No orphaned plugins found — nothing to prune"))
    return
  }

  console.log(`Found ${orphans.length} orphaned plugin(s):\n`)
  for (const name of orphans) {
    console.log(`  ${styleText("yellow", name)} — in lockfile but not in config`)
  }
  console.log()

  if (dryRun) {
    console.log(styleText("cyan", "Dry run — no changes made. Re-run without --dry-run to prune."))
    return
  }

  let removed = 0
  for (const name of orphans) {
    const pluginDir = path.join(PLUGINS_DIR, name)

    console.log(styleText("cyan", `→ Removing ${name}...`))

    if (fs.existsSync(pluginDir)) {
      fs.rmSync(pluginDir, { recursive: true })
    }

    delete lockfile.plugins[name]
    console.log(styleText("green", `✓ Removed ${name}`))
    removed++
  }

  if (removed > 0) {
    await regeneratePluginIndex()
  }

  writeLockfile(lockfile)
  console.log()
  console.log(styleText("green", `✓ Pruned ${removed} plugin(s)`))
  console.log(styleText("gray", "Updated quartz.lock.json"))
}

export async function handlePluginResolve({ dryRun = false } = {}) {
  return handlePluginInstallUnified({ fromConfig: true, dryRun })
}

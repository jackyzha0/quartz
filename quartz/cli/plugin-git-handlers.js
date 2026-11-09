import fs from "fs"
import path from "path"
import os from "os"
import { styleText } from "util"
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
  readConfigWithDiagnostics,
  resolvePluginDir,
  SOURCE_FORMATS_HELP,
} from "./plugin-data.js"
import { symlinkOrCopySync } from "./helpers.js"
import {
  findConfigEntries,
  validatePluginOptions,
  validatePluginEntry,
  parseOptionPath,
  setOptionPath,
  unsetOptionPath,
  suggestClosest,
  shortPluginName,
} from "./plugin-validation.js"
import {
  checkQuartzRequirement,
  describeQuartzCheckout,
  describeDeprecation,
  describeRequirementProblem,
  formatQuartzVersion,
  readQuartzVersion,
} from "./compat.js"
import {
  assertCommit,
  assertNpmSpec,
  assertRef,
  assertRepoUrl,
  gitAsync,
  npm,
  npmAsync,
} from "./subprocess.js"
import { writePluginIndex } from "./plugin-index.js"
import {
  builtinKeyFor,
  builtinMessage,
  describeBuiltins,
  findBuiltinMigrations,
  migrateBuiltinEntries,
  officialPluginName,
} from "./builtin-migration.js"

/** Mark the current CLI invocation as failed (non-zero exit) without aborting. */
function markFailed() {
  process.exitCode = 1
}

/**
 * Turn a failed git/npm command into a short, actionable message instead of a
 * dump of the full command line.
 */
function describeCommandError(error) {
  const stderr = String(error?.stderr ?? "").trim()
  const text = stderr || String(error?.message ?? error)
  if (
    /Remote branch .* not found|couldn't find remote ref|not our ref|did not match any/i.test(text)
  ) {
    return "the requested branch/tag/commit does not exist on the remote"
  }
  if (/Repository not found|repository '.*' not found|404/i.test(text)) {
    return "repository not found — check the owner/repo spelling, or make sure your git credentials can access it"
  }
  if (
    /Could not resolve host|unable to access|Failed to connect|Network is unreachable/i.test(text)
  ) {
    return "network error — could not reach the git host (are you offline?)"
  }
  if (/Authentication failed|could not read Username|Permission denied/i.test(text)) {
    return "authentication failed — the repository may be private"
  }
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("Command failed:") && !l.startsWith("Cloning into"))
  return lines.slice(-2).join(" ") || "unknown error"
}

const nameHelpers = { extractName: extractPluginName, formatSource }

/**
 * Resolve a user-supplied plugin name against quartz.config.yaml entries.
 * Accepts the full name, the source string, or the short name
 * ("explorer" for "@quartz-community/explorer").
 * Prints an error (with a "did you mean" hint) and returns null when the name
 * does not identify exactly one entry.
 */
function resolveConfigEntryOrReport(json, name) {
  const { indices, suggestion } = findConfigEntries(json?.plugins ?? [], name, nameHelpers)
  if (indices.length === 1) {
    const index = indices[0]
    return { entry: json.plugins[index], index }
  }
  if (indices.length > 1) {
    console.log(
      styleText("red", `✗ "${name}" matches ${indices.length} plugins in quartz.config.yaml:`),
    )
    for (const i of indices) {
      console.log(`    ${formatSource(json.plugins[i].source)}`)
    }
    console.log(styleText("gray", "  Use the full source to pick one."))
    markFailed()
    return null
  }
  console.log(styleText("red", `✗ Plugin "${name}" not found in quartz.config.yaml`))
  if (suggestion) console.log(styleText("gray", `  Did you mean "${suggestion}"?`))
  else console.log(styleText("gray", "  Run 'npx quartz plugin list' to see configured plugins."))
  markFailed()
  return null
}

/** Read the manifest (`quartz` field of package.json) of a configured plugin, if installed. */
function readEntryManifest(source) {
  const dir = resolvePluginDir(source)
  if (!dir) return null
  return readManifestFromPackageJson(dir)
}

/** Read the installed package.json of a configured plugin, if any. */
function readEntryPackageJson(source) {
  const dir = resolvePluginDir(source)
  if (!dir) return null
  try {
    return JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf-8"))
  } catch {
    return null
  }
}

/** `git ls-remote <repo> <ref or HEAD>` for a lockfile entry. */
function lsRemote(entry) {
  const ref = entry.ref ? `refs/heads/${assertRef(entry.ref)}` : "HEAD"
  return gitAsync(["ls-remote", assertRepoUrl(entry.resolved), ref])
}

/** Shallow-clone `url` into `dir`, then move to `commit` if it is not the tip. */
async function cloneAtCommitAsync({ url, ref, commit, dir }) {
  await gitAsync([
    "clone",
    "--depth",
    "1",
    ...(ref ? ["--branch", assertRef(ref)] : []),
    "--",
    assertRepoUrl(url),
    dir,
  ])
  if (commit && commit !== "unknown" && commit !== "local") {
    const { stdout } = await gitAsync(["rev-parse", "HEAD"], { cwd: dir })
    if (stdout.trim() !== commit) {
      await checkoutPinnedCommitAsync(dir, commit)
    }
  }
  const { stdout } = await gitAsync(["rev-parse", "HEAD"], { cwd: dir })
  return stdout.trim()
}

/**
 * Move a shallow clone to a pinned commit. The commit is fetched by SHA (GitHub and most hosts
 * allow fetching reachable commits), so a pin that is no longer the branch tip works (#2559).
 */
async function checkoutPinnedCommitAsync(dir, commit) {
  assertCommit(commit)
  await gitAsync(["fetch", "--depth", "1", "origin", commit], { cwd: dir })
  await gitAsync(["checkout", "--quiet", commit], { cwd: dir })
}

/**
 * Clone a repository and copy one subdirectory of it into `pluginDir`.
 * When `commit` is given (lockfile pin) that commit is checked out first.
 * The copy goes to a temporary sibling first, so a failed clone never leaves
 * a half-populated or deleted plugin behind.
 */
async function cloneWithSubdirAsync({ url, ref, subdir, pluginDir, commit }) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-plugin-"))
  const staging = `${pluginDir}.__staging__`
  try {
    const resolvedCommit = await cloneAtCommitAsync({ url, ref, commit, dir: tmpDir })
    const subdirPath = path.join(tmpDir, subdir)
    if (!fs.existsSync(subdirPath)) {
      throw new Error(`Subdirectory "${subdir}" not found in cloned repository`)
    }
    fs.rmSync(staging, { recursive: true, force: true })
    fs.cpSync(subdirPath, staging, { recursive: true })
    fs.rmSync(pluginDir, { recursive: true, force: true })
    fs.renameSync(staging, pluginDir)
    return resolvedCommit
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true })
    fs.rmSync(staging, { recursive: true, force: true })
  }
}

/** @internal Exported for testing only. */
export async function buildPluginAsync(pluginDir, name) {
  if (hasPrebuiltDist(pluginDir)) {
    console.log(styleText("green", `  ✓ ${name}: using pre-built dist/`))
    linkPeerPlugins(pluginDir)
    return true
  }

  try {
    const skipBuild = !needsBuild(pluginDir)
    console.log(styleText("cyan", `  → ${name}: installing dependencies...`))
    // Quartz's .npmrc reaches a nested npm only when npm started Quartz; without it, npm installs
    // the peers a dependency declares, and the plugin keeps its own Preact
    await npmAsync(["install", "--ignore-scripts", "--legacy-peer-deps"], { cwd: pluginDir })
    if (!skipBuild) {
      console.log(styleText("cyan", `  → ${name}: building...`))
      await npmAsync(["run", "build"], { cwd: pluginDir })
    }
    await npmAsync(["prune", "--omit=dev", "--legacy-peer-deps"], { cwd: pluginDir })
    linkPeerPlugins(pluginDir)
    if (!hasLoadableEntryPoint(pluginDir)) {
      console.log(
        styleText("red", `  ✗ ${name}: build finished but produced no entry point (dist/ missing)`),
      )
      return false
    }
    return true
  } catch (error) {
    console.log(styleText("red", `  ✗ ${name}: build failed: ${describeCommandError(error)}`))
    console.log(
      styleText(
        "gray",
        `    Try running 'npm install && npm run build' in ${pluginDir} to see the full error.`,
      ),
    )
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

/** @internal Exported for testing only. */
export function linkPeerPlugins(pluginDir) {
  const pkgPath = path.join(pluginDir, "package.json")
  if (!fs.existsSync(pkgPath)) return

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
  const peers = pkg.peerDependencies ?? {}

  const quartzRoot = path.resolve(pluginDir, "..", "..", "..")
  const hostNodeModules = path.join(quartzRoot, "node_modules")
  // a local plugin is a symlink; relative links made through it would dangle
  const realDir = fs.realpathSync(pluginDir)
  const local = fs.lstatSync(pluginDir).isSymbolicLink()

  for (const peerName of Object.keys(peers)) {
    const peerNodeModulesPath = path.join(realDir, "node_modules", ...peerName.split("/"))
    const hostPeerPath = path.join(hostNodeModules, ...peerName.split("/"))
    if (fs.existsSync(peerNodeModulesPath)) {
      if (!local || peerName.startsWith("@quartz-community/") || !fs.existsSync(hostPeerPath)) {
        continue
      }
      if (fs.realpathSync(peerNodeModulesPath) === fs.realpathSync(hostPeerPath)) continue
      // a second copy breaks singletons like Preact's hooks; replace a link, never a directory
      if (!fs.lstatSync(peerNodeModulesPath).isSymbolicLink()) {
        console.warn(
          styleText(
            "yellow",
            `⚠ ${peerName} is installed in ${realDir}, so it will not share Quartz's copy`,
          ),
        )
        continue
      }
      fs.unlinkSync(peerNodeModulesPath)
    } else if (fs.lstatSync(peerNodeModulesPath, { throwIfNoEntry: false })?.isSymbolicLink()) {
      // dangling
      fs.unlinkSync(peerNodeModulesPath)
    }

    if (peerName.startsWith("@quartz-community/")) {
      const siblingPlugin = findPluginByPackageName(peerName)
      if (!siblingPlugin) continue

      const scopeDir = path.join(realDir, "node_modules", peerName.split("/")[0])
      fs.mkdirSync(scopeDir, { recursive: true })

      const target = path.relative(scopeDir, siblingPlugin)
      trySymlink(target, peerNodeModulesPath)
      continue
    }

    if (!fs.existsSync(hostPeerPath)) continue

    const parts = peerName.split("/")
    if (parts.length > 1) {
      const scopeDir = path.join(realDir, "node_modules", parts[0])
      fs.mkdirSync(scopeDir, { recursive: true })
    } else {
      fs.mkdirSync(path.join(realDir, "node_modules"), { recursive: true })
    }

    const target = path.relative(path.dirname(peerNodeModulesPath), hostPeerPath)
    trySymlink(target, peerNodeModulesPath)
  }
}

/**
 * Whether a plugin's previously-installed lockfile record no longer matches
 * its current config source (e.g. a pinned ref was bumped), meaning the
 * on-disk plugin directory is stale and must be reinstalled rather than
 * reused as-is.
 */
export function pluginSourceChanged(priorEntry, currentSource) {
  return (
    priorEntry !== undefined &&
    canonicalSource(priorEntry.source) !== canonicalSource(currentSource)
  )
}

/** A source as a comparable string: object sources ({ repo, ref, subdir, … }) by content. */
function canonicalSource(source) {
  if (source === null || typeof source !== "object") return String(source)
  return JSON.stringify(
    Object.fromEntries(Object.entries(source).sort(([a], [b]) => a.localeCompare(b))),
  )
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

async function regeneratePluginIndex() {
  // npm plugins in the config are part of the index too (they used to be dropped here until the
  // next build regenerated it); the generator is shared with the build, see plugin-index.js
  const npmPackages = []
  for (const entry of readPluginsJson()?.plugins ?? []) {
    if (builtinMessage(entry.source)) continue
    try {
      const parsed = parseGitSource(entry.source)
      if (parsed.npmPackage) npmPackages.push(parsed.name)
    } catch {}
  }
  writePluginIndex({ pluginsDir: PLUGINS_DIR, npmPackages, verbose: true })
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
    markFailed()
    return
  }

  const resolvedConcurrency = Math.max(1, concurrencyOption ?? os.cpus().length)

  // Plugins that are built into core now (crawl-links, remove-draft, content-index) are never
  // cloned or built, even if the config or the lockfile still lists them.
  const rawPluginsJson = readPluginsJson()
  const pluginsJson = rawPluginsJson && {
    ...rawPluginsJson,
    plugins: (rawPluginsJson.plugins ?? []).filter((entry) => !builtinMessage(entry.source)),
  }
  let lockfile = readLockfile()
  if (lockfile) {
    lockfile = {
      ...lockfile,
      plugins: Object.fromEntries(
        Object.entries(lockfile.plugins ?? {}).filter(([name]) => !builtinMessage(name)),
      ),
    }
  }

  if (!fromConfig && !lockfile) {
    const gitEntries = (pluginsJson?.plugins ?? []).filter((entry) => {
      try {
        return !parseGitSource(entry.source).npmPackage
      } catch {
        return false
      }
    })
    if (gitEntries.length === 0 && findMissingNpmPlugins(pluginsJson).length === 0) {
      console.log(
        styleText(
          "green",
          "✓ No Git or local plugins to install (plugins from npm are installed by 'npm install' / 'npm ci')",
        ),
      )
      return
    }
    if (dryRun && latest) {
      console.log(styleText("yellow", "⚠ No quartz.lock.json found — nothing to check yet."))
      console.log(
        styleText("gray", "  Run 'npx quartz plugin install' to install and pin plugins."),
      )
      return
    }
    console.log(
      styleText(
        "yellow",
        "⚠ No quartz.lock.json found — installing plugins from quartz.config.yaml instead.",
      ),
    )
    console.log(
      styleText("gray", "  Commit the generated quartz.lock.json to pin plugin versions."),
    )
    console.log()
    fromConfig = true
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

      return lsRemote(row.entry)
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

    // npm-sourced plugins (e.g. from a template) that are not in node_modules yet
    const missingNpm = findMissingNpmPlugins(pluginsJson).filter(
      (pkg) => !nameFilter || nameFilter.has(pkg) || nameFilter.has(shortPluginName(pkg)),
    )
    if (missingNpm.length > 0) {
      console.log(`Found ${missingNpm.length} npm plugin(s) in config that are not installed:\n`)
      for (const pkg of missingNpm) console.log(`  ${styleText("yellow", pkg)}`)
      console.log()
      if (!dryRun) {
        try {
          npm(["install", ...missingNpm.map(assertNpmSpec)], {
            cwd: process.cwd(),
            stdio: "inherit",
          })
          console.log(styleText("green", `✓ Installed ${missingNpm.length} npm plugin(s)`))
        } catch {
          console.log(
            styleText("red", `✗ npm install failed — run 'npm install ${missingNpm.join(" ")}'`),
          )
          markFailed()
        }
        console.log()
      }
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
        const priorEntry = lockfile.plugins[name]
        if (
          !pluginSourceChanged(priorEntry, entry.source) &&
          priorEntry &&
          fs.existsSync(pluginDir)
        )
          return false
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
        const priorEntry = lockfile.plugins[name]

        if (fs.existsSync(pluginDir) && pluginSourceChanged(priorEntry, entry.source)) {
          console.log(
            styleText(
              "yellow",
              `⚠ ${name} source changed (${formatSource(priorEntry.source)} → ${formatSource(entry.source)}), reinstalling`,
            ),
          )
          fs.rmSync(pluginDir, { recursive: true, force: true })
        }

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
          const locked = lockfile.plugins[name]
          const commit =
            locked && locked.resolved === url && locked.commit !== "local"
              ? locked.commit
              : undefined
          remoteEntries.push({ entry, name, url, ref, subdir, pluginDir, commit })
        }
      } catch (error) {
        console.log(
          styleText("red", `✗ Failed to resolve ${formatSource(entry.source)}: ${error.message}`),
        )
        failed++
      }
    }

    // Clone remote plugins in parallel
    if (remoteEntries.length > 0) {
      const concurrency = resolvedConcurrency
      await runParallel(
        remoteEntries,
        concurrency,
        async ({ entry, name, url, ref, subdir, pluginDir, commit: pinned }) => {
          try {
            if (subdir) {
              console.log(styleText("cyan", `→ Cloning ${name} from ${url} (subdir: ${subdir})...`))
              fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
              const commit = await cloneWithSubdirAsync({
                url,
                ref,
                subdir,
                pluginDir,
                commit: pinned,
              })
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

              const commit = await cloneAtCommitAsync({ url, ref, commit: pinned, dir: pluginDir })
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
            fs.rmSync(pluginDir, { recursive: true, force: true })
            console.log(
              styleText(
                "red",
                `✗ Failed to install ${formatSource(entry.source)}: ${describeCommandError(error)}`,
              ),
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

    if (failed > 0) markFailed()
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
              commit: entry.commit,
            })
          } else {
            console.log(
              styleText(
                "cyan",
                `→ ${name}: cloning ${entry.resolved}@${entry.commit.slice(0, 7)}...`,
              ),
            )
            await cloneAtCommitAsync({
              url: entry.resolved,
              ref: entry.ref,
              commit: entry.commit,
              dir: pluginDir,
            })
          }
          console.log(styleText("green", `✓ ${name} restored`))
          restoredPlugins.push({ name, pluginDir })
          installed++
        } catch (error) {
          fs.rmSync(pluginDir, { recursive: true, force: true })
          console.log(
            styleText("red", `✗ ${name}: failed to restore: ${describeCommandError(error)}`),
          )
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
      markFailed()
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
        const suggestion = suggestClosest(name, Object.keys(lockfile.plugins))
        console.log(
          styleText("yellow", `⚠ ${name} is not installed`) +
            (suggestion ? styleText("gray", ` — did you mean "${suggestion}"?`) : ""),
        )
        markFailed()
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
            const fetchRef = entry.ref ? assertRef(entry.ref) : undefined
            await gitAsync(["fetch", "--depth", "1", "origin", ...(fetchRef ? [fetchRef] : [])], {
              cwd: pluginDir,
            })
            await gitAsync(["reset", "--hard", fetchRef ? `origin/${fetchRef}` : "origin/HEAD"], {
              cwd: pluginDir,
            })

            const { stdout } = await gitAsync(["rev-parse", "HEAD"], { cwd: pluginDir })
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
          console.log(
            styleText("red", `✗ Failed to update ${name}: ${describeCommandError(error)}`),
          )
          markFailed()
        }
      })
    }

    // Phase 3: Build updated plugins in parallel
    if (updatedPlugins.length > 0) {
      console.log()
      console.log(styleText("cyan", "→ Rebuilding updated plugins..."))
      const concurrency = resolvedConcurrency
      const results = await runParallel(
        updatedPlugins,
        concurrency,
        async ({ name, pluginDir }) => {
          const ok = await buildPluginAsync(pluginDir, name)
          if (ok) console.log(styleText("green", `  ✓ ${name} rebuilt`))
          return ok
        },
      )
      if (results.some((ok) => !ok)) markFailed()
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
  const unlocked = nameFilter ? [] : findConfiguredButUnlocked(pluginsJson, lockfile)
  const missingNpm = nameFilter ? [] : findMissingNpmPlugins(pluginsJson)
  const printUnlockedHint = () => {
    if (missingNpm.length > 0) {
      console.log()
      console.log(
        styleText(
          "yellow",
          `⚠ ${missingNpm.length} npm plugin(s) in quartz.config.yaml are not installed: ${missingNpm.join(", ")}`,
        ),
      )
      console.log(
        styleText("gray", "  Run 'npx quartz plugin install --from-config' to install them."),
      )
    }
    if (unlocked.length === 0) return
    console.log()
    console.log(
      styleText(
        "yellow",
        `⚠ ${unlocked.length} plugin(s) in quartz.config.yaml are not in quartz.lock.json: ${unlocked.join(", ")}`,
      ),
    )
    console.log(
      styleText("gray", "  Run 'npx quartz plugin install --from-config' to install and pin them."),
    )
  }
  if (nameFilter) {
    for (const name of nameFilter) {
      if (!lockfile.plugins[name]) {
        const suggestion = suggestClosest(name, Object.keys(lockfile.plugins))
        console.log(
          styleText("yellow", `⚠ ${name} is not in quartz.lock.json`) +
            (suggestion ? styleText("gray", ` — did you mean "${suggestion}"?`) : ""),
        )
        markFailed()
      }
    }
  }
  if (entries.length === 0) {
    console.log(
      styleText("gray", nameFilter ? "Nothing to install" : "No plugins in quartz.lock.json"),
    )
    printUnlockedHint()
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
          // fetch the pinned commit itself: it need not be the branch tip (#2559)
          await checkoutPinnedCommitAsync(pluginDir, entry.commit)
          await gitAsync(["reset", "--hard", entry.commit], { cwd: pluginDir })
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
              commit: entry.commit,
            })
          } else {
            console.log(styleText("cyan", `  → ${name}: cloning...`))
            await cloneAtCommitAsync({
              url: entry.resolved,
              ref: entry.ref,
              commit: entry.commit,
              dir: pluginDir,
            })
          }
          console.log(styleText("green", `  ✓ ${name}@${entry.commit.slice(0, 7)}`))
          pluginsToBuild.push({ name, pluginDir })
          installed++
        }
      } catch (error) {
        if (action !== "update") fs.rmSync(pluginDir, { recursive: true, force: true })
        console.log(
          styleText(
            "red",
            `  ✗ ${name}: failed to ${action === "update" ? "update" : "clone"}: ${describeCommandError(error)}`,
          ),
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
    markFailed()
  }
  printUnlockedHint()
}

const NPM_NAME_PATTERN = /^@[a-z0-9-~][a-z0-9-._~]*\/[a-z0-9-~][a-z0-9-._~]*$/

/** Enabled npm-sourced plugins whose package is not present in node_modules. */
function findMissingNpmPlugins(pluginsJson) {
  const missing = []
  for (const entry of pluginsJson?.plugins ?? []) {
    if (!entry?.enabled) continue
    try {
      if (!parseGitSource(entry.source).npmPackage) continue
      const pkg = getSourceUrl(entry.source)
      if (!NPM_NAME_PATTERN.test(pkg)) continue
      const dir = resolvePluginDir(entry.source)
      if (dir && !fs.existsSync(path.join(dir, "package.json"))) missing.push(pkg)
    } catch {}
  }
  return [...new Set(missing)]
}

/** Names of enabled Git/local plugins in config that have no lockfile entry. */
function findConfiguredButUnlocked(pluginsJson, lockfile) {
  const result = []
  for (const entry of pluginsJson?.plugins ?? []) {
    if (!entry?.enabled) continue
    try {
      const parsed = parseGitSource(entry.source)
      if (parsed.npmPackage) continue
      if (!lockfile?.plugins?.[parsed.name]) result.push(parsed.name)
    } catch {}
  }
  return result
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
    markFailed()
    return
  }
  if (subdirOverride && sources.length > 1) {
    console.log(styleText("red", "✗ --subdir can only be used when adding a single plugin"))
    markFailed()
    return
  }

  const resolvedConcurrency = Math.max(1, concurrencyOption ?? os.cpus().length)

  let lockfile = readLockfile()
  if (!lockfile) {
    lockfile = { version: "1.0.0", plugins: {} }
  }
  let lockfileChanged = false

  if (!fs.existsSync(PLUGINS_DIR)) {
    fs.mkdirSync(PLUGINS_DIR, { recursive: true })
  }

  const pluginsJson = readPluginsJson()
  const configured = pluginsJson?.plugins ?? []

  const addedPlugins = []
  let hadFailure = false

  /** Existing config entry that is (probably) the same plugin, by name. */
  const findConfigured = (name) =>
    configured.find((entry) => {
      try {
        const existing = extractPluginName(entry.source)
        return existing === name || shortPluginName(existing) === shortPluginName(name)
      } catch {
        return false
      }
    })

  // Handle local plugins and collect remote sources to clone
  const remoteSources = []
  for (const source of sources) {
    const builtin = builtinMessage(source)
    if (builtin) {
      console.log(styleText("yellow", `⚠ ${builtin}`))
      continue
    }
    try {
      const parsed = parseGitSource(source)
      if (parsed.npmPackage) {
        const name = nameOverride ?? parsed.name
        const already = findConfigured(name)
        if (already) {
          console.log(
            styleText(
              "yellow",
              `⚠ ${name} is already configured (source: ${formatSource(already.source)}) — skipping`,
            ),
          )
          continue
        }
        console.log(styleText("cyan", `→ Installing ${name} from npm...`))
        npm(["install", assertNpmSpec(parsed.name)], { cwd: process.cwd(), stdio: "inherit" })
        const configSource = nameOverride ? { repo: parsed.name, name: nameOverride } : parsed.name
        const pluginDir = path.join(process.cwd(), "node_modules", ...parsed.name.split("/"))
        addedPlugins.push({ name, pluginDir, source: parsed.name, configSource, npm: true })
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

      const already = findConfigured(name)
      if (already) {
        const same = formatSource(already.source) === formatSource(configSource ?? source)
        console.log(
          styleText(
            "yellow",
            same
              ? `⚠ ${name} is already configured — skipping. To update it run 'npx quartz plugin install --latest ${name}'.`
              : `⚠ A plugin named "${name}" is already configured (source: ${formatSource(already.source)}) — skipping.`,
          ),
        )
        if (!same) {
          console.log(
            styleText(
              "gray",
              `  To switch sources: 'npx quartz plugin remove ${extractPluginName(already.source)}' first,` +
                ` or add this one under another name with --as <name>.`,
            ),
          )
        }
        continue
      }

      if (fs.existsSync(pluginDir)) {
        // Installed on disk (e.g. left over after editing the config by hand)
        // but not configured: adopt it instead of refusing.
        console.log(
          styleText(
            "yellow",
            `⚠ ${name} is already installed but not configured — adding it to quartz.config.yaml`,
          ),
        )
        if (!lockfile.plugins[name]) {
          lockfile.plugins[name] = {
            source,
            resolved: local ? path.resolve(url) : url,
            commit: local ? "local" : getGitCommit(pluginDir),
            ...(ref && { ref }),
            ...(subdir && { subdir }),
            installedAt: new Date().toISOString(),
          }
          lockfileChanged = true
        }
        addedPlugins.push({ name, pluginDir, source, configSource, skipBuild: true })
        continue
      }

      if (local) {
        let resolvedPath = path.resolve(url)
        if (subdir) resolvedPath = path.join(resolvedPath, subdir)
        if (!fs.existsSync(resolvedPath)) {
          console.log(styleText("red", `✗ Local path does not exist: ${resolvedPath}`))
          hadFailure = true
          continue
        }
        if (!fs.existsSync(path.join(resolvedPath, "package.json"))) {
          console.log(
            styleText("yellow", `⚠ ${resolvedPath} has no package.json — is this a Quartz plugin?`),
          )
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
        lockfileChanged = true
        addedPlugins.push({ name, pluginDir, source, configSource })
        console.log(styleText("green", `✓ Added ${name} (local symlink)`))
      } else {
        remoteSources.push({ source, name, url, ref, subdir, pluginDir, configSource })
      }
    } catch (error) {
      console.log(styleText("red", `✗ Failed to add ${formatSource(source)}: ${error.message}`))
      hadFailure = true
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
            lockfileChanged = true
            addedPlugins.push({ name, pluginDir, source, configSource })
            console.log(
              styleText("green", `✓ Added ${name}@${commit.slice(0, 7)} (subdir: ${subdir})`),
            )
          } else {
            console.log(styleText("cyan", `→ Adding ${name} from ${url}...`))

            const commit = await cloneAtCommitAsync({ url, ref, dir: pluginDir })
            lockfile.plugins[name] = {
              source,
              resolved: url,
              commit,
              ...(ref && { ref }),
              installedAt: new Date().toISOString(),
            }
            lockfileChanged = true

            addedPlugins.push({ name, pluginDir, source, configSource })
            console.log(styleText("green", `✓ Added ${name}@${commit.slice(0, 7)}`))
          }
        } catch (error) {
          fs.rmSync(pluginDir, { recursive: true, force: true })
          console.log(
            styleText(
              "red",
              `✗ Failed to add ${formatSource(source)}: ${describeCommandError(error)}`,
            ),
          )
          hadFailure = true
        }
      },
    )
  }

  const toBuild = addedPlugins.filter((p) => !p.skipBuild)
  if (toBuild.length > 0) {
    console.log()
    console.log(styleText("cyan", "→ Building plugins..."))
    const concurrency = resolvedConcurrency
    await runParallel(toBuild, concurrency, async (plugin) => {
      const ok = await buildPluginAsync(plugin.pluginDir, plugin.name)
      if (ok) console.log(styleText("green", `  ✓ ${plugin.name} built`))
      else {
        plugin.buildFailed = true
        hadFailure = true
      }
      return ok
    })
  }
  if (addedPlugins.length > 0) {
    await regeneratePluginIndex()
  }

  if (lockfileChanged) {
    writeLockfile(lockfile)
  }

  if (pluginsJson?.plugins && addedPlugins.length > 0) {
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
  } else if (!pluginsJson && addedPlugins.length > 0) {
    console.log(
      styleText(
        "yellow",
        "⚠ No quartz.config.yaml found — the plugin is installed but not configured.",
      ),
    )
  }

  console.log()
  for (const plugin of addedPlugins) {
    const manifest = readManifestFromPackageJson(plugin.pluginDir)
    const configName = extractPluginName(plugin.configSource ?? plugin.source)
    const state =
      manifest?.defaultEnabled === false ? "added (disabled by default)" : "added and enabled"
    console.log(
      styleText(
        plugin.buildFailed ? "yellow" : "green",
        `${plugin.buildFailed ? "⚠" : "✓"} ${configName} ${state}`,
      ),
    )
    if (manifest?.defaultEnabled === false) {
      console.log(styleText("gray", `  Enable it with 'npx quartz plugin enable ${configName}'.`))
    }
    const requirement = describeRequirementProblem(
      configName,
      checkQuartzRequirement(manifest?.quartzVersion, readQuartzVersion()),
      manifest?.version,
    )
    if (requirement) {
      console.log(styleText("yellow", `  ⚠ ${requirement.message}`))
      console.log(styleText("gray", `    ${requirement.hint}`))
    }
    const deprecation = describeDeprecation(configName, manifest?.deprecated)
    if (deprecation) {
      console.log(styleText("yellow", `  ⚠ ${deprecation.message}`))
      console.log(styleText("gray", `    ${deprecation.hint}`))
    }
    if (plugin.buildFailed) {
      console.log(
        styleText(
          "gray",
          `  The build step failed; re-run 'npx quartz plugin install ${plugin.name}' after fixing it.`,
        ),
      )
    }
  }
  if (lockfileChanged) console.log(styleText("gray", "Updated quartz.lock.json"))
  if (hadFailure) markFailed()
}

export async function handlePluginRemove(names) {
  const lockfile = readLockfile() ?? { version: "1.0.0", plugins: {} }
  const pluginsJson = readPluginsJson()
  let lockfileChanged = false
  let configChanged = false
  let removedFiles = false
  const removedSources = []

  for (const name of names) {
    // Prefer the config entry (accepts short names such as "explorer").
    const { indices } = findConfigEntries(pluginsJson?.plugins ?? [], name, nameHelpers)
    const configIndex = indices.length === 1 ? indices[0] : -1
    if (indices.length > 1) {
      resolveConfigEntryOrReport(pluginsJson, name)
      continue
    }
    const configEntry = configIndex >= 0 ? pluginsJson.plugins[configIndex] : null

    let lockKey = resolveLockfileName(name, lockfile, pluginsJson)
    let isNpm = false
    if (configEntry) {
      try {
        const parsed = parseGitSource(configEntry.source)
        isNpm = Boolean(parsed.npmPackage)
        if (!isNpm && !lockfile.plugins[lockKey]) lockKey = parsed.name
      } catch {}
    }
    const pluginDir = path.join(PLUGINS_DIR, lockKey)
    const installed = !isNpm && (Boolean(lockfile.plugins[lockKey]) || fs.existsSync(pluginDir))

    if (!configEntry && !installed) {
      const candidates = [
        ...Object.keys(lockfile.plugins),
        ...(pluginsJson?.plugins ?? []).map((e) => {
          try {
            return extractPluginName(e.source)
          } catch {
            return ""
          }
        }),
      ]
      const suggestion = suggestClosest(name, candidates)
      console.log(
        styleText("yellow", `⚠ ${name} is not installed or configured`) +
          (suggestion ? styleText("gray", ` — did you mean "${suggestion}"?`) : ""),
      )
      markFailed()
      continue
    }

    const displayName = configEntry ? extractPluginName(configEntry.source) : lockKey
    console.log(styleText("cyan", `→ Removing ${displayName}...`))

    if (installed) {
      if (fs.existsSync(pluginDir) || fs.lstatSync(pluginDir, { throwIfNoEntry: false })) {
        fs.rmSync(pluginDir, { recursive: true, force: true })
        removedFiles = true
      }
      if (lockfile.plugins[lockKey]) {
        delete lockfile.plugins[lockKey]
        lockfileChanged = true
      }
    }
    if (configEntry) {
      pluginsJson.plugins.splice(pluginsJson.plugins.indexOf(configEntry), 1)
      configChanged = true
      removedSources.push(configEntry.source)
    }
    console.log(styleText("green", `✓ Removed ${displayName}`))
    if (isNpm) {
      console.log(
        styleText(
          "gray",
          `  Removed from quartz.config.yaml. The npm package stays in node_modules` +
            ` (run 'npm uninstall ${getSourceUrl(configEntry.source)}' if you added it yourself).`,
        ),
      )
    }
  }

  if (removedFiles) {
    await regeneratePluginIndex()
  }
  if (lockfileChanged) writeLockfile(lockfile)
  if (configChanged) writePluginsJson(pluginsJson)

  // Warn about remaining plugins that declared a dependency on what was removed.
  if (removedSources.length > 0 && pluginsJson?.plugins) {
    const removedKeys = new Set(
      removedSources.flatMap((src) => [getSourceUrl(src), extractPluginName(src)]),
    )
    for (const entry of pluginsJson.plugins) {
      if (!entry.enabled) continue
      const deps = readEntryManifest(entry.source)?.dependencies ?? []
      const hit = deps.find(
        (dep) => removedKeys.has(dep) || removedKeys.has(extractPluginName(dep)),
      )
      if (hit) {
        console.log(
          styleText(
            "yellow",
            `⚠ ${extractPluginName(entry.source)} depends on ${hit}; the build will fail until you add it back or remove/disable ${extractPluginName(entry.source)}.`,
          ),
        )
      }
    }
  }

  if (lockfileChanged || configChanged) {
    console.log()
    console.log(
      styleText(
        "gray",
        `Updated ${[configChanged && "quartz.config.yaml", lockfileChanged && "quartz.lock.json"].filter(Boolean).join(" and ")}`,
      ),
    )
  }
}

async function setEnabled(names, enabled) {
  const json = readPluginsJson()
  const verb = enabled ? "enable" : "disable"
  if (!json) {
    console.log(styleText("red", `✗ No quartz.config.yaml found. Cannot ${verb} plugins.`))
    markFailed()
    return
  }

  let changed = false
  for (const name of names) {
    const builtin = builtinMessage(name)
    if (builtin && !(json.plugins ?? []).some((e) => officialPluginName(e.source) === name)) {
      console.log(styleText("yellow", `⚠ ${builtin}`))
      markFailed()
      continue
    }
    const resolved = resolveConfigEntryOrReport(json, name)
    if (!resolved) continue
    const { entry } = resolved
    const label = extractPluginName(entry.source)
    // Mirror the build: only a literal `true` (truthy) value enables a plugin.
    if (Boolean(entry.enabled) === enabled && typeof entry.enabled === "boolean") {
      console.log(styleText("gray", `✓ ${label} is already ${verb}d`))
      continue
    }
    entry.enabled = enabled
    changed = true
    console.log(styleText("green", `✓ ${enabled ? "Enabled" : "Disabled"} ${label}`))
    if (
      enabled &&
      resolvePluginDir(entry.source) &&
      !fs.existsSync(resolvePluginDir(entry.source))
    ) {
      console.log(
        styleText(
          "gray",
          "  Not installed yet — it will be installed on the next build, or run 'npx quartz plugin install --from-config'.",
        ),
      )
    }
  }

  if (changed) writePluginsJson(json)
}

export async function handlePluginEnable(names) {
  return setEnabled(names, true)
}

export async function handlePluginDisable(names) {
  return setEnabled(names, false)
}

function parseCliValue(raw) {
  try {
    return JSON.parse(raw)
  } catch {
    return raw
  }
}

function printOptionIssues(issues, label) {
  for (const issue of issues) {
    const color = issue.severity === "info" ? "gray" : "yellow"
    const icon = issue.severity === "info" ? "ℹ" : "⚠"
    console.log(styleText(color, `${icon} ${label}: ${issue.message}`))
  }
}

export async function handlePluginConfig(name, options = {}) {
  const json = readPluginsJson()
  if (!json) {
    console.log(styleText("red", "✗ No quartz.config.yaml found."))
    markFailed()
    return
  }

  const resolved = resolveConfigEntryOrReport(json, name)
  if (!resolved) return
  const { entry } = resolved
  const label = extractPluginName(entry.source)
  const manifest = readEntryManifest(entry.source)

  const sets = [options.set ?? []].flat().filter((v) => v !== undefined)
  const unsets = [options.unset ?? []].flat().filter((v) => v !== undefined)

  if (sets.length > 0 || unsets.length > 0) {
    if (!entry.options || typeof entry.options !== "object") entry.options = {}
    let changed = false
    for (const assignment of sets) {
      const eqIndex = String(assignment).indexOf("=")
      if (eqIndex <= 0) {
        console.log(styleText("red", `✗ Invalid --set "${assignment}". Use: --set key=value`))
        markFailed()
        continue
      }
      const keyPath = assignment.slice(0, eqIndex)
      const segments = parseOptionPath(keyPath)
      if (segments.length === 0) {
        console.log(styleText("red", `✗ Invalid option key "${keyPath}"`))
        markFailed()
        continue
      }
      const value = parseCliValue(assignment.slice(eqIndex + 1))
      setOptionPath(entry.options, segments, value)
      changed = true
      console.log(
        styleText("green", `✓ Set ${label}.${segments.join(".")} = ${JSON.stringify(value)}`),
      )
      const probe = {}
      setOptionPath(probe, segments, value)
      printOptionIssues(
        validatePluginOptions(probe, manifest).filter((i) => i.severity === "warning"),
        label,
      )
    }
    for (const keyPath of unsets) {
      const segments = parseOptionPath(String(keyPath))
      if (unsetOptionPath(entry.options, segments)) {
        changed = true
        console.log(
          styleText("green", `✓ Unset ${label}.${segments.join(".")} (plugin default applies)`),
        )
      } else {
        console.log(styleText("yellow", `⚠ ${label} has no option "${keyPath}" set`))
      }
    }
    if (changed) writePluginsJson(json)
    return
  }

  console.log(styleText("bold", `Plugin: ${label}`))
  console.log(`  Source: ${formatSource(entry.source)}`)
  console.log(`  Enabled: ${Boolean(entry.enabled)}`)
  console.log(`  Order: ${entry.order ?? manifest?.defaultOrder ?? 50}`)
  if (entry.options && Object.keys(entry.options).length > 0) {
    console.log(`  Options:`)
    for (const [k, v] of Object.entries(entry.options)) {
      console.log(`    ${k}: ${JSON.stringify(v)}`)
    }
  } else {
    console.log(`  Options: (none)`)
  }
  const defaults = manifest?.defaultOptions ?? {}
  const unsetDefaults = Object.keys(defaults).filter((k) => !(k in (entry.options ?? {})))
  if (unsetDefaults.length > 0) {
    console.log(`  Defaults (not overridden):`)
    for (const k of unsetDefaults) {
      console.log(styleText("gray", `    ${k}: ${JSON.stringify(defaults[k])}`))
    }
  }
  if (entry.layout) {
    console.log(`  Layout:`)
    for (const [k, v] of Object.entries(entry.layout)) {
      console.log(`    ${k}: ${JSON.stringify(v)}`)
    }
  }
  const issues = validatePluginOptions(entry.options, manifest)
  if (issues.length > 0) {
    console.log()
    printOptionIssues(issues, label)
  }
}

export async function handlePluginCheck() {
  return handlePluginInstallUnified({ latest: true, dryRun: true })
}

export async function handlePluginUpdate(names) {
  return handlePluginInstallUnified({ names, latest: true })
}

/**
 * Config entries that are not tracked by quartz.lock.json: npm packages
 * (versioned by package-lock.json) and Git/local plugins that were added to
 * the config by hand and not installed yet.
 */
function collectUntrackedEntries(pluginsJson, lockfile) {
  const npm = []
  const missing = []
  for (const entry of pluginsJson?.plugins ?? []) {
    // built into core now — handled by configuration.<key>, never installed
    if (builtinMessage(entry.source)) continue
    let parsed
    try {
      parsed = parseGitSource(entry.source)
    } catch {
      continue
    }
    if (parsed.npmPackage) {
      const pkg = readEntryPackageJson(entry.source)
      npm.push({
        name: extractPluginName(entry.source),
        source: getSourceUrl(entry.source),
        version: pkg?.version ?? null,
        enabled: Boolean(entry.enabled),
      })
    } else if (!lockfile?.plugins?.[parsed.name]) {
      missing.push({
        name: parsed.name,
        source: formatSource(entry.source),
        enabled: Boolean(entry.enabled),
      })
    }
  }
  return { npm, missing }
}

export async function handlePluginList() {
  const lockfile = readLockfile()
  const pluginsJson = readPluginsJson()
  const { npm, missing } = collectUntrackedEntries(pluginsJson, lockfile)
  const lockEntries = Object.entries(lockfile?.plugins ?? {})

  if (lockEntries.length === 0 && npm.length === 0 && missing.length === 0) {
    console.log(styleText("gray", "No plugins installed"))
    return
  }

  const nameOverrides = getNameOverrides(lockfile, pluginsJson)
  const enabledByName = new Map(
    (pluginsJson?.plugins ?? []).map((entry) => {
      try {
        return [parseGitSource(entry.source).name, Boolean(entry.enabled)]
      } catch {
        return [String(entry.source), Boolean(entry.enabled)]
      }
    }),
  )
  const enabledLabel = (name) =>
    !enabledByName.has(name)
      ? styleText("yellow", "not in config")
      : enabledByName.get(name)
        ? styleText("green", "enabled")
        : styleText("gray", "disabled")

  if (lockEntries.length > 0) {
    console.log(styleText("bold", "Git / local plugins (quartz.lock.json):"))
    console.log()
  }

  for (const [name, entry] of lockEntries) {
    const pluginDir = path.join(PLUGINS_DIR, name)
    const exists = fs.existsSync(pluginDir)
    const overriddenName = nameOverrides.get(name)
    const displayLabel = overriddenName
      ? `${overriddenName} ${styleText("gray", `(dir: ${name})`)}`
      : name

    if (entry.commit === "local") {
      const isLinked = exists && fs.lstatSync(pluginDir).isSymbolicLink()
      const status = isLinked ? styleText("green", "✓") : styleText("red", "✗")
      console.log(
        `  ${status} ${styleText("bold", displayLabel)}  ${enabledLabel(overriddenName ?? name)}`,
      )
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
    // Subdirectory installs have no .git, so their commit cannot be read back.
    const comparable = exists && currentCommit !== "unknown"

    const status = exists
      ? !comparable || currentCommit === entry.commit
        ? styleText("green", "✓")
        : styleText("yellow", "⚡")
      : styleText("red", "✗")

    console.log(
      `  ${status} ${styleText("bold", displayLabel)}  ${enabledLabel(overriddenName ?? name)}`,
    )
    console.log(`    Source: ${formatSource(entry.source)}`)
    console.log(`    Commit: ${entry.commit.slice(0, 7)}${entry.ref ? ` (${entry.ref})` : ""}`)
    if (comparable && currentCommit !== entry.commit) {
      console.log(
        `    Current: ${currentCommit.slice(0, 7)} (differs from lockfile — run 'npx quartz plugin install ${name}')`,
      )
    }
    if (!exists) {
      console.log(`    Not on disk — run 'npx quartz plugin install'`)
    }
    console.log(`    Installed: ${new Date(entry.installedAt).toLocaleDateString()}`)
    console.log()
  }

  console.log(styleText("bold", "Built into Quartz (configuration.<key>):"))
  console.log()
  for (const b of describeBuiltins(pluginsJson?.configuration)) {
    const status = b.enabled ? styleText("green", "enabled") : styleText("gray", "disabled")
    console.log(
      `  ${styleText("green", "✓")} ${b.key.padEnd(14)}${status.padEnd(18)} ${styleText("gray", b.description)}`,
    )
  }
  console.log()

  if (npm.length > 0) {
    console.log(styleText("bold", "npm plugins (package.json):"))
    console.log()
    const width = Math.max(...npm.map((p) => p.source.length)) + 2
    for (const p of npm) {
      const status = p.version ? styleText("green", "✓") : styleText("red", "✗")
      const version = p.version ? `v${p.version}` : "not installed — run 'npm install'"
      const enabled = p.enabled ? styleText("green", "enabled") : styleText("gray", "disabled")
      console.log(`  ${status} ${p.source.padEnd(width)}${version.padEnd(12)} ${enabled}`)
    }
    console.log()
  }

  if (missing.length > 0) {
    console.log(styleText("bold", "Configured but not installed:"))
    console.log()
    for (const p of missing) {
      console.log(`  ${styleText("red", "✗")} ${p.name}  ${styleText("gray", p.source)}`)
    }
    console.log()
    console.log(styleText("gray", "Run 'npx quartz plugin install --from-config' to install them."))
  }
}

export async function handlePluginStatus() {
  const lockfile = readLockfile() ?? { version: "1.0.0", plugins: {} }
  const pluginsJson = readPluginsJson()
  const { npm } = collectUntrackedEntries(pluginsJson, lockfile)
  if (Object.keys(lockfile.plugins).length === 0 && npm.length === 0) {
    console.log(styleText("gray", "No plugins installed"))
    return
  }

  const nameOverrides = getNameOverrides(lockfile, pluginsJson)
  // Same rule as the build: a plugin runs only when `enabled` is truthy.
  const enabledByName = new Map(
    (pluginsJson?.plugins ?? []).map((entry) => [
      extractPluginName(entry.source),
      Boolean(entry.enabled),
    ]),
  )

  const rows = Object.entries(lockfile.plugins).map(([name, entry]) => {
    const pluginDir = path.join(PLUGINS_DIR, name)
    const exists = fs.existsSync(pluginDir)
    const displayName = nameOverrides.get(name) ?? name
    const sourceLabel = formatSource(entry.source)
    const commitLabel = entry.commit === "local" ? "local" : `@${entry.commit.slice(0, 7)}`
    const enabled = enabledByName.get(displayName) ?? enabledByName.get(name) ?? false
    return { name, entry, exists, displayName, sourceLabel, commitLabel, enabled }
  })
  for (const p of npm) {
    rows.push({
      name: p.name,
      entry: { commit: "npm" },
      exists: Boolean(p.version),
      displayName: shortPluginName(p.name),
      sourceLabel: p.source,
      commitLabel: p.version ? `v${p.version}` : "missing",
      enabled: p.enabled,
    })
  }

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
      case "npm":
        return { text: "— npm", label: styleText("gray", "— npm") }
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
        row.entry.commit === "local" || row.entry.commit === "npm"
          ? updateDisplay(row.entry.commit)
          : updateDisplay("checking")
      console.log(formatRow(row, display.label, display.text))
    }
  }

  const promises = rows.map((row, index) => {
    if (row.entry.commit === "local" || row.entry.commit === "npm") {
      return Promise.resolve({
        index,
        status: row.entry.commit,
        name: row.displayName,
      })
    }

    return lsRemote(row.entry)
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

  if (npm.length > 0) {
    console.log(
      styleText(
        "gray",
        "\nnpm plugins are versioned by package.json — update them with 'npx quartz upgrade' or 'npm update'.",
      ),
    )
  }

  if (updatesAvailable.length === 0 && failedChecks.length === 0) {
    console.log(styleText("green", "\n✓ All Git plugins up to date"))
    return
  }

  if (updatesAvailable.length > 0) {
    console.log(styleText("yellow", `\nUpdates available: ${updatesAvailable.join(", ")}`))
    console.log(styleText("gray", "Run 'npx quartz plugin install --latest' to update."))
  }

  if (failedChecks.length > 0) {
    console.log(styleText("red", `\nChecks failed: ${failedChecks.join(", ")}`))
    console.log(styleText("gray", "Could not reach the remote — are you offline?"))
  }
}

/** Same fallback order as getPluginEntryPoint() in plugins/loader/gitLoader.ts. */
const ENTRY_POINT_FALLBACKS = [
  "dist/index.js",
  "dist/index.mjs",
  "index.js",
  "index.ts",
  "src/index.js",
  "src/index.ts",
]

function hasLoadableEntryPoint(pluginDir) {
  let declared = []
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(pluginDir, "package.json"), "utf-8"))
    const exp = pkg.exports?.["."]
    declared = [typeof exp === "string" ? exp : (exp?.import ?? exp?.default), pkg.module, pkg.main]
  } catch {}
  return [...declared, ...ENTRY_POINT_FALLBACKS]
    .filter((c) => typeof c === "string")
    .some((c) => fs.existsSync(path.join(pluginDir, c)))
}

/**
 * `quartz plugin doctor`: static health check of quartz.config.yaml,
 * quartz.lock.json and installed plugins. Exits non-zero when it finds errors.
 */
export async function handlePluginDoctor({ verbose = false, fix = false } = {}) {
  let errors = 0
  let warnings = 0
  const report = (severity, subject, message, hint) => {
    if (severity === "error") errors++
    if (severity === "warning") warnings++
    if (severity === "info" && !verbose) return
    const icon = { error: "✗", warning: "⚠", info: "ℹ" }[severity]
    const color = { error: "red", warning: "yellow", info: "gray" }[severity]
    console.log(styleText(color, `${icon} ${subject ? `${subject}: ` : ""}${message}`))
    if (hint) console.log(styleText("gray", `    → ${hint}`))
  }

  const config = readConfigWithDiagnostics()
  const configLabel = path.basename(config.path)
  const quartzVersion = readQuartzVersion()
  console.log(
    styleText(
      "bold",
      `Checking plugins (Quartz ${formatQuartzVersion(quartzVersion, describeQuartzCheckout())})...\n`,
    ),
  )

  if (!config.exists) {
    report(
      "error",
      null,
      "no quartz.config.yaml (or quartz.config.default.yaml) found",
      "Run 'npx quartz create' first.",
    )
    markFailed()
    return
  }
  if (config.error) {
    report("error", configLabel, `could not be parsed: ${config.error}`)
    markFailed()
    return
  }
  if (configLabel !== "quartz.config.yaml") {
    report("info", null, `using ${configLabel} (no quartz.config.yaml yet)`)
  }

  if (!Array.isArray(config.data?.plugins)) {
    report("error", configLabel, "`plugins` must be a list")
    markFailed()
    return
  }

  // Plugins that are now built into core (crawl-links, remove-draft, content-index, and
  // note-properties' frontmatter options): the build maps them on the fly; --fix rewrites the file.
  const migrations = findBuiltinMigrations(config.data)
  if (migrations.length > 0 && fix) {
    const { data: migrated, changes } = migrateBuiltinEntries(config.data)
    writePluginsJson(migrated)
    for (const change of changes) console.log(styleText("green", `✓ ${change}`))
    console.log()
    config.data = migrated
  } else {
    for (const { name, key } of migrations) {
      report(
        "warning",
        name,
        name === "note-properties"
          ? `frontmatter options (delimiters, language) belong in configuration.${key} now`
          : `is built into Quartz now (configuration.${key}); this entry is applied automatically`,
        "Run 'npx quartz plugin doctor --fix' to update quartz.config.yaml (comments are kept).",
      )
    }
  }
  const absorbed = new Set(
    migrations.filter((m) => m.name !== "note-properties").map((m) => m.entry),
  )
  const plugins = config.data.plugins.filter((entry) => !absorbed.has(entry))

  const lockfile = readLockfile()
  if (fs.existsSync(LOCKFILE_PATH) && !lockfile) {
    report(
      "error",
      "quartz.lock.json",
      "is not valid JSON",
      "Restore it from git, or delete it and run 'npx quartz plugin install'.",
    )
  }
  // Pins of plugins that are built into core now are unused (never installed or loaded).
  const builtinPins = Object.keys(lockfile?.plugins ?? {}).filter((name) => builtinMessage(name))
  if (builtinPins.length > 0 && fix) {
    for (const name of builtinPins) delete lockfile.plugins[name]
    writeLockfile(lockfile)
    console.log(
      styleText(
        "green",
        `✓ Removed unused quartz.lock.json pins (built in now): ${builtinPins.join(", ")}`,
      ),
    )
  } else if (builtinPins.length > 0) {
    report(
      "warning",
      "quartz.lock.json",
      `pins plugins that are built into Quartz now (unused): ${builtinPins.join(", ")}`,
      "Run 'npx quartz plugin doctor --fix' to remove them.",
    )
  }

  const seen = new Map()
  const enabledSources = new Map()
  let gitPluginCount = 0

  plugins.forEach((entry, index) => {
    let label = `plugins[${index}]`
    try {
      if (entry?.source !== undefined) label = extractPluginName(entry.source)
    } catch {}

    for (const issue of validatePluginEntry(entry)) report(issue.severity, label, issue.message)
    if (!entry || typeof entry !== "object" || entry.source === undefined) return

    let parsed
    try {
      parsed = parseGitSource(entry.source)
    } catch (error) {
      report(
        "error",
        label,
        String(error.message).split(". Supported")[0].split("\n")[0],
        `Supported formats: ${SOURCE_FORMATS_HELP.map((f) => f.split(/\s{2,}|\[/)[0].trim()).join(", ")}`,
      )
      return
    }

    const key = parsed.npmPackage ? shortPluginName(parsed.name) : parsed.name
    if (seen.has(key)) {
      report(
        "error",
        label,
        `configured twice (also as ${formatSource(plugins[seen.get(key)].source)}) — both copies would be loaded`,
        "Remove one of the entries.",
      )
    } else {
      seen.set(key, index)
    }

    const enabled = Boolean(entry.enabled)
    if (enabled) {
      enabledSources.set(getSourceUrl(entry.source), entry)
      enabledSources.set(extractPluginName(entry.source), entry)
    }

    const pluginDir = resolvePluginDir(entry.source)
    if (parsed.npmPackage) {
      if (!fs.existsSync(path.join(pluginDir, "package.json"))) {
        report(
          enabled ? "error" : "info",
          label,
          "npm package is not installed",
          `Run 'npm install' (or 'npm install ${parsed.name}' if it is not in package.json).`,
        )
        return
      }
    } else {
      gitPluginCount++
      const locked = lockfile?.plugins?.[parsed.name]
      const onDisk = fs.existsSync(pluginDir)
      if (!locked && enabled) {
        report(
          "warning",
          label,
          onDisk
            ? "installed but not pinned in quartz.lock.json"
            : "not installed and not pinned — the build will clone the latest commit",
          "Run 'npx quartz plugin install --from-config' and commit quartz.lock.json.",
        )
      }
      if (!onDisk) {
        if (locked && enabled) {
          report(
            "warning",
            label,
            "pinned in quartz.lock.json but not on disk",
            "Run 'npx quartz plugin install'.",
          )
        }
        return
      }
      if (parsed.local && fs.lstatSync(pluginDir).isSymbolicLink()) {
        try {
          fs.realpathSync(pluginDir)
        } catch {
          report(
            "error",
            label,
            `local plugin link is broken (${fs.readlinkSync(pluginDir)})`,
            "Fix the path in quartz.config.yaml or re-run 'npx quartz plugin add <path>'.",
          )
          return
        }
      }
      if (locked && locked.commit !== "local" && !locked.subdir) {
        const current = getGitCommit(pluginDir)
        if (current !== "unknown" && current !== locked.commit) {
          report(
            "warning",
            label,
            `checked out at ${current.slice(0, 7)} but quartz.lock.json pins ${locked.commit.slice(0, 7)}`,
            `Run 'npx quartz plugin install ${parsed.name}' to restore the pinned commit.`,
          )
        }
      }
      if (locked && locked.resolved && !parsed.local && locked.resolved !== parsed.url) {
        report(
          "warning",
          label,
          `source changed: config points to ${parsed.url}, lockfile to ${locked.resolved}`,
          `Run 'npx quartz plugin remove ${parsed.name}' then add it again.`,
        )
      }
    }

    if (!hasLoadableEntryPoint(pluginDir)) {
      report(
        enabled ? "error" : "info",
        label,
        "has no built entry point (dist/ missing)",
        parsed.npmPackage
          ? "Reinstall it with 'npm install'."
          : `Run 'npx quartz plugin install ${parsed.name}' to build it.`,
      )
    }

    const manifest = readManifestFromPackageJson(pluginDir)
    if (!manifest) {
      report("info", label, "package.json has no `quartz` manifest; options cannot be checked")
      return
    }
    for (const issue of validatePluginOptions(entry.options, manifest)) {
      report(issue.severity, label, issue.message)
    }
    const requirement = describeRequirementProblem(
      label,
      checkQuartzRequirement(manifest.quartzVersion, quartzVersion),
      readEntryPackageJson(entry.source)?.version,
    )
    if (requirement) {
      report(enabled ? "error" : "info", null, requirement.message, requirement.hint)
    }
    const deprecation = describeDeprecation(label, manifest.deprecated)
    if (deprecation) report("warning", null, deprecation.message, deprecation.hint)
    if (enabled) {
      for (const dep of manifest.dependencies ?? []) {
        // A plugin that is built into core now (crawl-links → configuration.links, …) is
        // satisfied by the built-in: its entries were absorbed above.
        const builtinKey = builtinKeyFor(dep)
        if (builtinKey) {
          const builtin = describeBuiltins(config.data.configuration).find(
            (b) => b.key === builtinKey,
          )
          if (builtin && !builtin.enabled) {
            report(
              "warning",
              label,
              `depends on ${dep}, which is built into Quartz now as configuration.${builtinKey} and is disabled`,
              `Enable configuration.${builtinKey} in quartz.config.yaml.`,
            )
          }
          continue
        }
        const depEntry =
          enabledSources.get(dep) ??
          plugins.find((e) => {
            try {
              return (
                getSourceUrl(e.source) === dep ||
                extractPluginName(e.source) === extractPluginName(dep)
              )
            } catch {
              return false
            }
          })
        if (!depEntry) {
          report(
            "error",
            label,
            `requires ${dep}, which is not configured`,
            `Run 'npx quartz plugin add ${dep}'.`,
          )
        } else if (!depEntry.enabled) {
          report(
            "warning",
            label,
            `depends on ${dep}, which is disabled`,
            `Run 'npx quartz plugin enable ${extractPluginName(depEntry.source)}'.`,
          )
        }
      }
    }
  })

  if (lockfile?.plugins) {
    const configured = new Set(
      plugins.flatMap((e) => {
        try {
          return [parseGitSource(e.source).name]
        } catch {
          return []
        }
      }),
    )
    const orphans = Object.keys(lockfile.plugins).filter(
      (n) => !configured.has(n) && !builtinPins.includes(n),
    )
    if (orphans.length > 0) {
      report(
        "warning",
        "quartz.lock.json",
        `${orphans.length} plugin(s) are locked but not configured: ${orphans.join(", ")}`,
        "Run 'npx quartz plugin prune' to remove them.",
      )
    }
  }

  if (gitPluginCount > 0 && !fs.existsSync(path.join(PLUGINS_DIR, "index.ts"))) {
    report(
      "warning",
      ".quartz/plugins",
      "plugin index is missing",
      "Run 'npx quartz plugin install'.",
    )
  }

  console.log()
  if (errors === 0 && warnings === 0) {
    console.log(styleText("green", `✓ No problems found in ${plugins.length} configured plugin(s)`))
  } else {
    console.log(
      styleText(
        errors > 0 ? "red" : "yellow",
        `${errors} error(s), ${warnings} warning(s) in ${plugins.length} configured plugin(s)`,
      ),
    )
    if (!verbose) console.log(styleText("gray", "Run with --verbose for informational notes."))
  }
  if (errors > 0) markFailed()
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

/**
 * `quartz info`: everything needed to answer "which Quartz are you on?" in one paste.
 *
 * Prints a Markdown block for issues / Discord: Quartz version and where the checkout is relative
 * to release tags (`git describe`), Node/npm/OS, the config file, built-ins, and every configured
 * plugin with its installed version, source, commit (git plugins) and whether it supports this
 * Quartz version. `--json` prints the same data as JSON.
 *
 * No content, baseUrl or option values are included.
 */
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { execFileSync } from "node:child_process"
import { styleText } from "node:util"
import {
  checkQuartzRequirement,
  describeQuartzCheckout,
  formatQuartzVersion,
  readQuartzVersion,
} from "./compat.js"
import { builtinKeyFor, describeBuiltins } from "./builtin-migration.js"
import { shortPluginName } from "./plugin-validation.js"
import {
  readConfigWithDiagnostics,
  readLockfile,
  extractPluginName,
  formatSource,
  parseGitSource,
  resolvePluginDir,
} from "./plugin-data.js"

function commandVersion(cmd, args = ["--version"]) {
  try {
    return execFileSync(cmd, args, {
      encoding: "utf8",
      timeout: 5000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
  } catch {
    return undefined
  }
}

/** Strip credentials from remote URLs (https://token@github.com/… → https://github.com/…). */
export function redactRemote(url) {
  if (!url) return url
  return url.replace(/^(\w+:\/\/)[^@/]+@/, "$1")
}

function readPackage(dir) {
  try {
    return JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"))
  } catch {
    return undefined
  }
}

export function collectInfo(root = process.cwd()) {
  const version = readQuartzVersion(root)
  const checkout = describeQuartzCheckout(root)
  const config = readConfigWithDiagnostics()
  const lockfile = readLockfile()
  const entries = Array.isArray(config.data?.plugins) ? config.data.plugins : []

  const plugins = entries.map((entry) => {
    const name = (() => {
      try {
        return shortPluginName(extractPluginName(entry.source))
      } catch {
        return String(entry?.source)
      }
    })()
    const builtinNow =
      builtinKeyFor(typeof entry?.source === "string" ? entry.source : entry?.source?.repo) !==
      undefined
    let installedVersion
    let quartzVersion
    let commit
    if (!builtinNow) {
      const dir = resolvePluginDir(entry.source)
      const pkg = dir ? readPackage(dir) : undefined
      installedVersion = pkg?.version
      quartzVersion = pkg?.quartz?.quartzVersion
      try {
        const parsed = parseGitSource(entry.source)
        if (!parsed.npmPackage) commit = lockfile?.plugins?.[parsed.name]?.commit?.slice(0, 7)
      } catch {}
    }
    return {
      name,
      source: formatSource(entry.source),
      enabled: entry.enabled === true,
      version: installedVersion,
      commit,
      quartzVersion,
      compatibility: builtinNow
        ? "built-in now"
        : checkQuartzRequirement(quartzVersion, version).status,
    }
  })

  return {
    quartz: {
      version,
      display: formatQuartzVersion(version, checkout),
      describe: checkout.describe,
      commit: checkout.commit,
      branch: checkout.branch,
      modified: checkout.dirty,
      origin: redactRemote(checkout.origin),
      upstream: redactRemote(checkout.upstream),
    },
    environment: {
      node: process.version,
      npm: commandVersion("npm"),
      os: `${os.platform()} ${os.release()} (${os.arch()})`,
    },
    config: {
      file: config.exists ? path.basename(config.path) : null,
      error: config.error ?? undefined,
      plugins: entries.length,
      enabled: plugins.filter((p) => p.enabled).length,
    },
    builtins: describeBuiltins(config.data?.configuration),
    plugins,
  }
}

const COMPAT_LABEL = {
  ok: "✓",
  none: "–",
  unknown: "?",
  invalid: "invalid range",
  incompatible: "✗ incompatible",
  "built-in now": "built in now",
}

export function formatInfoMarkdown(info) {
  const q = info.quartz
  const lines = []
  lines.push("### Quartz info", "")
  const where = [q.branch && `branch \`${q.branch}\``, q.modified && "local changes"]
    .filter(Boolean)
    .join(", ")
  lines.push(`- **Quartz:** ${q.display}${where ? ` — ${where}` : ""}`)
  if (q.origin)
    lines.push(`- **Repository:** ${q.origin}${q.upstream ? ` (upstream ${q.upstream})` : ""}`)
  lines.push(
    `- **Environment:** Node ${info.environment.node}${info.environment.npm ? `, npm ${info.environment.npm}` : ""}, ${info.environment.os}`,
  )
  lines.push(
    `- **Config:** ${info.config.file ?? "none"}${info.config.error ? ` (parse error: ${info.config.error})` : ""} — ${info.config.enabled} of ${info.config.plugins} plugins enabled`,
  )
  lines.push(
    `- **Built-ins:** ${info.builtins.map((b) => `${b.key} ${b.enabled ? "on" : "off"}`).join(", ")}`,
  )
  const incompatible = info.plugins.filter((p) => p.enabled && p.compatibility === "incompatible")
  if (incompatible.length > 0) {
    lines.push(
      `- **Incompatible plugins:** ${incompatible.map((p) => `${p.name} (needs Quartz ${p.quartzVersion})`).join(", ")}`,
    )
  }
  lines.push("", "<details><summary>Plugins</summary>", "")
  lines.push("| Plugin | Enabled | Version | Source | Supports this Quartz |")
  lines.push("| --- | --- | --- | --- | --- |")
  for (const p of info.plugins) {
    const version = [p.version, p.commit && `@${p.commit}`].filter(Boolean).join(" ") || "–"
    const compat = COMPAT_LABEL[p.compatibility] ?? p.compatibility
    lines.push(
      `| ${p.name} | ${p.enabled ? "yes" : "no"} | ${version} | ${p.source} | ${compat}${p.quartzVersion ? ` (${p.quartzVersion})` : ""} |`,
    )
  }
  lines.push("", "</details>")
  return lines.join("\n")
}

export async function handleInfo({ json = false } = {}) {
  const info = collectInfo()
  if (json) {
    console.log(JSON.stringify(info, null, 2))
    return
  }
  console.log(formatInfoMarkdown(info))
  console.error(styleText("gray", "\nPaste the block above into your issue or support question."))
}

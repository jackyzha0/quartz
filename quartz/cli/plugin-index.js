/**
 * The generated plugin index (`.quartz/plugins/index.ts`), shared by `quartz plugin …` commands
 * and the install step before a build (which used to keep two diverging copies of this code).
 *
 * `quartz.ts` imports it as `ExternalPlugin`. Every plugin factory or component constructor is
 * wrapped: calling `ExternalPlugin.Explorer({...})` records the options as overrides (merged over
 * the YAML options when Quartz instantiates the plugin) AND returns what the original returns, so
 * it works both as a statement and as a component inside a layout override.
 *
 * Overrides are registered under the key the config loader looks them up by: the npm package name
 * for npm plugins, the directory name for Git/local plugins (#2565).
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { styleText } from "node:util"
import { isIdentifier, jsString } from "./subprocess.js"

const INTERNAL_EXPORTS = new Set(["manifest", "default"])

const PLUGIN_TYPE_PATTERN =
  /Quartz(?:Emitter|Transformer|Filter|PageType)Plugin|QuartzComponentConstructor|\(.*\)\s*=>\s*QuartzComponent\b/

/** Exported names of a `.d.ts` (types prefixed with "type "), excluding external re-exports. */
export function parseExportsFromDts(content) {
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
        exports.push(name.includes("type ") ? `type ${finalName}` : finalName)
      }
    }
  }
  return exports
}

function resolveOriginalName(exportName, dtsContent) {
  const match = dtsContent.match(new RegExp(`(\\w+)\\s+as\\s+${exportName}\\b`))
  return match ? match[1] : exportName
}

/**
 * Whether an export is a plugin factory or component constructor. Follows relative re-exports
 * (`export { Explorer } from './components/index.js'`), which is how most component plugins
 * expose their constructor.
 */
export function isOverridableExport(name, dtsContent, dtsPath, depth = 0) {
  const declName = resolveOriginalName(name, dtsContent)
  const declPattern = new RegExp(`declare\\s+const\\s+${declName}\\s*:\\s*(.+?)(?:;|$)`, "m")
  const match = dtsContent.match(declPattern)
  if (match) return PLUGIN_TYPE_PATTERN.test(match[1])
  if (!dtsPath || depth >= 4) return false

  for (const reexport of dtsContent.matchAll(
    /export\s*{\s*([^}]+)\s*}\s*from\s*['"](\.[^'"]+)['"]/g,
  )) {
    const entry = reexport[1]
      .split(",")
      .map((n) => n.trim().replace(/^type\s+/, ""))
      .find((n) => (n.split(/\s+as\s+/).pop() ?? "").trim() === name)
    if (!entry) continue
    const original = entry.split(/\s+as\s+/)[0].trim()
    const target = path.resolve(path.dirname(dtsPath), reexport[2].replace(/\.js$/, ".d.ts"))
    if (!fs.existsSync(target)) return false
    return isOverridableExport(original, fs.readFileSync(target, "utf-8"), target, depth + 1)
  }
  return false
}

/** Names `export { … }`-ed by the built JavaScript entry (to tell values from type-only names). */
function jsExportNames(jsIndex) {
  const names = new Set()
  if (!fs.existsSync(jsIndex)) return names
  for (const m of fs.readFileSync(jsIndex, "utf-8").matchAll(/export\s*{\s*([^}]+)\s*}/g)) {
    for (const n of m[1].split(",")) {
      const clean = n
        .trim()
        .split(/\s+as\s+/)
        .pop()
        ?.trim()
      if (clean) names.add(clean)
    }
  }
  return names
}

function classify(distIndex) {
  const dtsContent = fs.readFileSync(distIndex, "utf-8")
  const exported = parseExportsFromDts(dtsContent)
  const dtsTypes = exported.filter((e) => e.startsWith("type ")).map((e) => e.slice(5))
  const dtsNamed = exported.filter((e) => !e.startsWith("type "))
  const jsExports = jsExportNames(path.join(path.dirname(distIndex), "index.js"))
  const named = jsExports.size > 0 ? dtsNamed.filter((n) => jsExports.has(n)) : dtsNamed
  const extraTypes = jsExports.size > 0 ? dtsNamed.filter((n) => !jsExports.has(n)) : []
  const overridable = named.filter((n) => isOverridableExport(n, dtsContent, distIndex))
  return {
    overridable: overridable.filter(isIdentifier),
    passthrough: named.filter((n) => !overridable.includes(n)).filter(isIdentifier),
    types: [...dtsTypes, ...extraTypes].filter(isIdentifier),
  }
}

/**
 * Collect the exports of the installed Git/local plugins (`<pluginsDir>/<name>/dist`) and of the
 * given npm packages. Returns entries keyed for the generated `plugins` map.
 */
export function collectPluginExports({ pluginsDir, npmPackages = [], verbose = false }) {
  const entries = new Map()
  const add = (key, info) => {
    const { overridable, passthrough, types } = info
    if (overridable.length > 0 || passthrough.length > 0 || types.length > 0) entries.set(key, info)
  }

  const dirs = fs.existsSync(pluginsDir)
    ? fs.readdirSync(pluginsDir).filter((n) => fs.statSync(path.join(pluginsDir, n)).isDirectory())
    : []
  for (const name of dirs) {
    const distIndex = path.join(pluginsDir, name, "dist", "index.d.ts")
    if (!fs.existsSync(distIndex)) {
      if (verbose)
        console.log(styleText("yellow", `⚠`), `Skipping ${name}: no dist/index.d.ts found`)
      continue
    }
    add(name, { ...classify(distIndex), importPath: `./${name}`, registryKey: name })
  }

  for (const pkg of npmPackages) {
    let distIndex
    try {
      const pkgJson = fileURLToPath(import.meta.resolve(`${pkg}/package.json`))
      distIndex = path.join(path.dirname(pkgJson), "dist", "index.d.ts")
    } catch {
      if (verbose) console.log(styleText("yellow", `⚠`), `Skipping npm package ${pkg}: not found`)
      continue
    }
    if (!fs.existsSync(distIndex)) {
      if (verbose)
        console.log(styleText("yellow", `⚠`), `Skipping npm package ${pkg}: no dist/index.d.ts`)
      continue
    }
    const key = pkg.replace(/^@/, "").replace(/\//g, "__")
    add(key, { ...classify(distIndex), importPath: pkg, registryKey: pkg })
  }
  return entries
}

/** Source of the generated index for collected entries. */
export function renderPluginIndex(entries, { warn = () => {} } = {}) {
  const nameCount = new Map()
  for (const { overridable, passthrough } of entries.values()) {
    for (const n of [...overridable, ...passthrough]) nameCount.set(n, (nameCount.get(n) ?? 0) + 1)
  }
  const unique = (n) => (nameCount.get(n) ?? 0) === 1

  const lines = [`import { componentRegistry } from "../../quartz/components/registry"`, ""]
  for (const { types, importPath } of entries.values()) {
    if (types.length > 0)
      lines.push(`export type { ${types.join(", ")} } from ${jsString(importPath)}`)
  }
  for (const { passthrough, importPath } of entries.values()) {
    const names = passthrough.filter(unique)
    if (names.length > 0) lines.push(`export { ${names.join(", ")} } from ${jsString(importPath)}`)
  }

  // The originals of wrapped exports, imported under collision-free local names
  const alias = new Map()
  let index = 0
  for (const [key, { overridable, importPath }] of entries) {
    if (overridable.length === 0) continue
    const specifiers = overridable.map((n) => {
      const local = `__quartzPlugin${index}_${n}`
      alias.set(`${key}\u0000${n}`, local)
      return `${n} as ${local}`
    })
    lines.push(`import { ${specifiers.join(", ")} } from ${jsString(importPath)}`)
    index++
  }
  lines.push("")

  lines.push(`type AnyFn = (...args: unknown[]) => unknown`)
  lines.push(`export const plugins: Record<string, Record<string, AnyFn>> = {`)
  for (const [key, { overridable, registryKey }] of entries) {
    if (overridable.length === 0) continue
    lines.push(`  ${jsString(key)}: {`)
    for (const n of overridable) {
      lines.push(
        `    ${n}: (...args: unknown[]) => { componentRegistry.setOptionOverrides(${jsString(registryKey)}, args[0] as Record<string, unknown>); return (${alias.get(`${key}\u0000${n}`)} as unknown as AnyFn)(...args) },`,
      )
    }
    lines.push(`  },`)
  }
  lines.push(`}`, "")

  for (const [key, { overridable }] of entries) {
    for (const n of overridable) {
      if (unique(n)) {
        lines.push(
          `export const ${n} = plugins[${jsString(key)}].${n} as unknown as typeof ${alias.get(`${key}\u0000${n}`)}`,
        )
      } else {
        warn(
          `Export "${n}" conflicts across plugins — use plugins[${jsString(key)}].${n} in quartz.ts`,
        )
      }
    }
  }
  lines.push("")
  return lines.join("\n")
}

/** Collect, render and write `<pluginsDir>/index.ts`. */
export function writePluginIndex({ pluginsDir, npmPackages = [], verbose = false }) {
  fs.mkdirSync(pluginsDir, { recursive: true })
  const entries = collectPluginExports({ pluginsDir, npmPackages, verbose })
  const source = renderPluginIndex(entries, {
    warn: (message) => {
      if (verbose) console.warn(styleText("yellow", `⚠`), message)
    },
  })
  fs.writeFileSync(path.join(pluginsDir, "index.ts"), source)
  return entries
}

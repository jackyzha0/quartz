/**
 * Migrate quartz.config.yaml entries of plugins that are now built into Quartz core
 * (see quartz/plugins/builtins/index.ts):
 *
 *   @quartz-community/crawl-links    → configuration.links
 *   @quartz-community/remove-draft   → configuration.drafts
 *   @quartz-community/content-index  → configuration.contentIndex
 *   note-properties `delimiters` / `language` options → configuration.frontmatter
 *
 * Pure: takes the parsed config, returns a migrated copy and a list of human-readable changes.
 * Used by `quartz plugin doctor --fix`. The build applies the same mapping on the fly
 * (planBuiltins), so un-migrated configs keep working — this only makes it explicit.
 */

const ABSORBED = {
  "crawl-links": {
    key: "links",
    defaultOrder: 60,
    // crawl-links defaulted to "absolute"; the built-in defaults to "shortest"
    legacyDefaults: { markdownLinkResolution: "absolute" },
  },
  "remove-draft": { key: "drafts", defaultOrder: 50, legacyDefaults: {} },
  "content-index": { key: "contentIndex", defaultOrder: 50, legacyDefaults: {} },
}

const FRONTMATTER_DEFAULTS = { delimiters: "---", language: "yaml" }

/** Short name of an official quartz-community plugin source, else undefined (mirrors core). */
export function officialPluginName(source) {
  if (source && typeof source === "object") return officialPluginName(source.repo)
  if (typeof source !== "string") return undefined
  const npm = source.match(/^@quartz-community\/([a-z0-9-]+)(?:@.*)?$/)
  if (npm) return npm[1]
  const github = source.match(
    /^(?:github:|git\+https:\/\/github\.com\/|https:\/\/github\.com\/)quartz-community\/([a-z0-9-]+?)(?:\.git)?(?:#.*)?$/,
  )
  return github?.[1]
}

/** Entries that `migrateBuiltinEntries` would change (for doctor's report). */
export function findBuiltinMigrations(data) {
  const plugins = Array.isArray(data?.plugins) ? data.plugins : []
  const found = []
  for (const entry of plugins) {
    const name = officialPluginName(entry?.source)
    if (name && ABSORBED[name]) {
      found.push({ name, key: ABSORBED[name].key, entry })
    } else if (name === "note-properties") {
      const opts = entry?.options ?? {}
      if ("delimiters" in opts || "language" in opts) {
        found.push({ name, key: "frontmatter", entry })
      }
    }
  }
  return found
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

export function migrateBuiltinEntries(input) {
  const data = structuredClone(input ?? {})
  const changes = []
  if (!Array.isArray(data.plugins)) return { data, changes }
  data.configuration = isPlainObject(data.configuration) ? data.configuration : {}
  const cfg = data.configuration

  const kept = []
  for (const entry of data.plugins) {
    const name = officialPluginName(entry?.source)
    const absorbed = name ? ABSORBED[name] : undefined

    if (absorbed) {
      const existing = cfg[absorbed.key]
      const target = isPlainObject(existing)
        ? existing
        : typeof existing === "boolean"
          ? { enabled: existing }
          : {}
      const moved = []
      if (entry.enabled === false) {
        if (absorbed.key === "drafts") {
          if (target.publish === undefined && target.enabled === undefined) {
            target.publish = true
            moved.push("publish: true")
          }
        } else if (target.enabled === undefined) {
          target.enabled = false
          moved.push("enabled: false")
        }
      } else {
        const options = { ...absorbed.legacyDefaults, ...(entry.options ?? {}) }
        for (const [key, value] of Object.entries(options)) {
          if (target[key] === undefined) {
            target[key] = value
            moved.push(key)
          }
        }
      }
      if (typeof entry.order === "number" && entry.order !== absorbed.defaultOrder) {
        if (target.order === undefined) {
          target.order = entry.order
          moved.push("order")
        }
      }
      if (Object.keys(target).length > 0) cfg[absorbed.key] = target
      changes.push(
        `${name}: removed from plugins (built into Quartz)` +
          (moved.length > 0 ? `; moved ${moved.join(", ")} to configuration.${absorbed.key}` : ""),
      )
      continue
    }

    if (name === "note-properties" && isPlainObject(entry.options)) {
      const moved = []
      const target = isPlainObject(cfg.frontmatter) ? cfg.frontmatter : {}
      for (const key of ["delimiters", "language"]) {
        if (!(key in entry.options)) continue
        const value = entry.options[key]
        delete entry.options[key]
        if (value === FRONTMATTER_DEFAULTS[key] || target[key] !== undefined) {
          moved.push(`dropped ${key} (default or already set)`)
          continue
        }
        target[key] = value
        moved.push(`moved ${key} to configuration.frontmatter`)
      }
      if (Object.keys(target).length > 0) cfg.frontmatter = target
      if (moved.length > 0) changes.push(`note-properties: ${moved.join(", ")}`)
    }
    kept.push(entry)
  }
  data.plugins = kept
  return { data, changes }
}

/**
 * When a CLI command names a plugin that is built into core now (by short name or official
 * source), the configuration key to point the user to; otherwise undefined.
 */
export function builtinKeyFor(nameOrSource) {
  // object sources: { repo: "github:quartz-community/crawl-links", … }
  if (typeof nameOrSource?.repo === "string") nameOrSource = nameOrSource.repo
  if (typeof nameOrSource !== "string") return undefined
  const name = officialPluginName(nameOrSource) ?? nameOrSource
  return ABSORBED[name]?.key
}

/** One-line explanation for CLI commands that target a built-in. */
export function builtinMessage(nameOrSource) {
  const key = builtinKeyFor(nameOrSource)
  if (!key) return undefined
  if (typeof nameOrSource?.repo === "string") nameOrSource = nameOrSource.repo
  const name = officialPluginName(nameOrSource) ?? nameOrSource
  const toggle = key === "drafts" ? "publish: true" : "enabled: false"
  return (
    `${name} is built into Quartz now — configure it under configuration.${key} in quartz.config.yaml ` +
    `(e.g. \`${key}: { ${toggle} }\`). See https://quartz.jzhao.xyz/features/built-in-processing`
  )
}

/** Summary of the built-ins for `quartz plugin list`. */
export function describeBuiltins(configuration = {}) {
  const rows = [
    ["frontmatter", "frontmatter parsing (titles, tags, aliases, dates)"],
    ["links", "link resolution, backlinks/graph data (was crawl-links)"],
    ["drafts", "hides `draft: true` pages (was remove-draft)"],
    ["contentIndex", "contentIndex.json, sitemap, RSS (was content-index)"],
  ]
  return rows.map(([key, description]) => {
    const value = configuration?.[key]
    const enabled =
      value === false || (isPlainObject(value) && value.enabled === false)
        ? false
        : key === "drafts" && isPlainObject(value) && value.publish === true
          ? false
          : true
    return { key, description, enabled }
  })
}

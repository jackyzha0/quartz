// Pure helpers for validating quartz.config.yaml plugin entries and options.
//
// This module is plain JavaScript without side effects so it can be shared by
// the CLI (run directly by Node) and the build-time config loader (TypeScript,
// see plugin-validation.d.ts).

/** Top-level keys allowed on a plugin entry (mirrors quartz-plugins.schema.json). */
export const PLUGIN_ENTRY_KEYS = ["source", "enabled", "options", "order", "layout"]

/** Keys allowed on an object-form `source`. */
export const SOURCE_OBJECT_KEYS = ["repo", "subdir", "ref", "name"]

/** Keys allowed in a plugin entry's `layout` block. */
export const LAYOUT_KEYS = ["position", "priority", "display", "condition", "group", "groupOptions"]

/** The slots the config loader fills (see LayoutPosition in plugins/loader/types.ts). */
export const LAYOUT_POSITIONS = ["header", "beforeBody", "left", "right", "afterBody", "footer"]

export const LAYOUT_DISPLAYS = ["all", "mobile-only", "desktop-only"]

/**
 * Edit distance (optimal string alignment: insertions, deletions,
 * substitutions and adjacent transpositions each cost 1).
 * @param {string} a
 * @param {string} b
 */
export function levenshtein(a, b) {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
      }
    }
  }
  return d[a.length][b.length]
}

/**
 * Return the candidate closest to `input`, or null when nothing is close enough.
 * Case-only differences always match.
 * @param {string} input
 * @param {Iterable<string>} candidates
 */
export function suggestClosest(input, candidates) {
  const lower = String(input).toLowerCase()
  let best = null
  let bestDistance = Infinity
  for (const candidate of candidates) {
    if (candidate === input) continue
    const candLower = candidate.toLowerCase()
    if (candLower === lower) return candidate
    const distance = levenshtein(lower, candLower)
    const threshold = Math.max(1, Math.floor(Math.max(lower.length, candLower.length) / 3))
    if (distance <= threshold && distance < bestDistance) {
      best = candidate
      bestDistance = distance
    } else if (
      bestDistance === Infinity &&
      lower.length >= 4 &&
      (candLower.startsWith(lower) || lower.startsWith(candLower))
    ) {
      best = candidate
      bestDistance = threshold + 1
    }
  }
  return best
}

/** "@quartz-community/explorer" → "explorer"; anything else unchanged. */
export function shortPluginName(name) {
  if (typeof name !== "string") return String(name)
  if (name.startsWith("@") && name.includes("/")) return name.slice(name.indexOf("/") + 1)
  return name
}

function describeType(value) {
  if (value === null) return "null"
  if (Array.isArray(value)) return "array"
  return typeof value
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

/**
 * Find config entries matching a user-supplied plugin name.
 *
 * Matching (first level that yields results wins):
 *   1. exact name (`extractName(source)`), display source, or raw source string
 *   2. short name, e.g. "explorer" for "@quartz-community/explorer"
 *
 * @param {Array<{source: unknown}>} plugins
 * @param {string} query
 * @param {{ extractName: (source: unknown) => string, formatSource: (source: unknown) => string }} helpers
 * @returns {{ indices: number[], suggestion: string | null }}
 */
export function findConfigEntries(plugins, query, { extractName, formatSource }) {
  const list = Array.isArray(plugins) ? plugins : []
  const names = list.map((entry) => {
    try {
      return extractName(entry.source)
    } catch {
      return String(entry?.source)
    }
  })
  const formatted = list.map((entry) => {
    try {
      return formatSource(entry.source)
    } catch {
      return String(entry?.source)
    }
  })

  const exact = []
  list.forEach((entry, i) => {
    if (names[i] === query || formatted[i] === query || entry?.source === query) exact.push(i)
  })
  if (exact.length > 0) return { indices: exact, suggestion: null }

  const queryShort = shortPluginName(query)
  const short = []
  names.forEach((name, i) => {
    if (shortPluginName(name) === queryShort) short.push(i)
  })
  if (short.length > 0) return { indices: short, suggestion: null }

  const candidates = new Set([...names, ...names.map(shortPluginName)])
  const suggestion = suggestClosest(queryShort, candidates) ?? suggestClosest(query, candidates)
  return { indices: [], suggestion }
}

/**
 * Validate a plugin's options against its manifest (`defaultOptions` and, when
 * present, `configSchema`). Unknown keys are only flagged as warnings when they
 * look like a typo of a known key (or the schema forbids extra keys), because
 * many plugins accept options that have no default.
 *
 * @param {unknown} options
 * @param {{ defaultOptions?: Record<string, unknown>, configSchema?: any } | null | undefined} manifest
 * @param {string} [prefix]
 * @returns {Array<{ severity: "warning" | "info", path: string, message: string, suggestion?: string }>}
 */
export function validatePluginOptions(options, manifest, prefix = "") {
  const issues = []
  if (!isPlainObject(options) || !manifest) return issues

  const defaults = isPlainObject(manifest.defaultOptions) ? manifest.defaultOptions : {}
  const schema = isPlainObject(manifest.configSchema) ? manifest.configSchema : null
  const schemaProps = schema && isPlainObject(schema.properties) ? schema.properties : {}
  const known = new Set([...Object.keys(defaults), ...Object.keys(schemaProps)])
  if (known.size === 0) return issues

  for (const [key, value] of Object.entries(options)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (!known.has(key)) {
      const suggestion = suggestClosest(key, known)
      if (suggestion) {
        issues.push({
          severity: "warning",
          path,
          suggestion,
          message: `unknown option "${path}" — did you mean "${prefix ? `${prefix}.` : ""}${suggestion}"?`,
        })
      } else if (schema && schema.additionalProperties === false) {
        issues.push({
          severity: "warning",
          path,
          message: `unknown option "${path}" (known options: ${[...known].join(", ")})`,
        })
      } else {
        issues.push({
          severity: "info",
          path,
          message: `option "${path}" is not one of the plugin's documented defaults (${[...known].join(", ")})`,
        })
      }
      continue
    }

    if (value === null || value === undefined) continue

    const prop = schemaProps[key]
    if (isPlainObject(prop) && Array.isArray(prop.enum) && !prop.enum.includes(value)) {
      const suggestion =
        typeof value === "string" ? suggestClosest(value, prop.enum.map(String)) : null
      issues.push({
        severity: "warning",
        path,
        ...(suggestion && { suggestion }),
        message:
          `option "${path}" must be one of ${prop.enum.map((v) => JSON.stringify(v)).join(", ")}, got ${JSON.stringify(value)}` +
          (suggestion ? ` — did you mean ${JSON.stringify(suggestion)}?` : ""),
      })
      continue
    }

    const expected =
      isPlainObject(prop) && typeof prop.type === "string"
        ? prop.type === "integer"
          ? "number"
          : prop.type
        : key in defaults && defaults[key] !== null && defaults[key] !== undefined
          ? describeType(defaults[key])
          : null
    const actual = describeType(value)
    if (expected && expected !== actual) {
      const shown = key in defaults ? ` (default: ${JSON.stringify(defaults[key])})` : ""
      issues.push({
        severity: "warning",
        path,
        message: `option "${path}" should be ${expected === "array" || expected === "object" ? "an" : "a"} ${expected}${shown}, got ${actual} ${JSON.stringify(value)}`,
      })
      continue
    }

    if (isPlainObject(value) && isPlainObject(defaults[key]) && Object.keys(defaults[key]).length) {
      const nested = validatePluginOptions(value, { defaultOptions: defaults[key] }, path)
      issues.push(...nested.filter((issue) => issue.severity === "warning"))
    }
  }
  return issues
}

/**
 * Structural checks for one `plugins:` entry that the build would otherwise
 * silently ignore (typoed keys, string booleans, missing `enabled`, …).
 *
 * @param {any} entry
 * @returns {Array<{ severity: "error" | "warning", message: string, suggestion?: string }>}
 */
export function validatePluginEntry(entry) {
  const issues = []
  if (!isPlainObject(entry)) {
    issues.push({ severity: "error", message: "plugin entry must be a mapping with a `source`" })
    return issues
  }

  for (const key of Object.keys(entry)) {
    if (PLUGIN_ENTRY_KEYS.includes(key)) continue
    const suggestion = suggestClosest(key, PLUGIN_ENTRY_KEYS)
    issues.push({
      severity: "warning",
      ...(suggestion && { suggestion }),
      message: suggestion
        ? `unknown key "${key}" — did you mean "${suggestion}"? (it is ignored as written)`
        : `unknown key "${key}" is ignored (allowed: ${PLUGIN_ENTRY_KEYS.join(", ")})`,
    })
  }

  if (entry.source === undefined || entry.source === null || entry.source === "") {
    issues.push({ severity: "error", message: "missing `source`" })
  } else if (isPlainObject(entry.source)) {
    if (typeof entry.source.repo !== "string") {
      issues.push({ severity: "error", message: "object `source` needs a `repo` string" })
    }
    for (const key of Object.keys(entry.source)) {
      if (SOURCE_OBJECT_KEYS.includes(key)) continue
      const suggestion = suggestClosest(key, SOURCE_OBJECT_KEYS)
      issues.push({
        severity: "warning",
        ...(suggestion && { suggestion }),
        message: suggestion
          ? `unknown source key "${key}" — did you mean "${suggestion}"?`
          : `unknown source key "${key}" (allowed: ${SOURCE_OBJECT_KEYS.join(", ")})`,
      })
    }
  } else if (typeof entry.source !== "string") {
    issues.push({ severity: "error", message: "`source` must be a string or a { repo, … } object" })
  }

  if (!("enabled" in entry)) {
    issues.push({
      severity: "warning",
      message: "no `enabled` field — the plugin is treated as disabled. Add `enabled: true`",
    })
  } else if (typeof entry.enabled !== "boolean") {
    issues.push({
      severity: "warning",
      message: `\`enabled\` should be true or false, got ${JSON.stringify(entry.enabled)} (treated as ${entry.enabled ? "enabled" : "disabled"})`,
    })
  }

  if ("options" in entry && entry.options !== null && !isPlainObject(entry.options)) {
    issues.push({ severity: "error", message: "`options` must be a mapping of option names" })
  }

  if ("order" in entry && typeof entry.order !== "number") {
    issues.push({
      severity: "warning",
      message: `\`order\` should be a number, got ${JSON.stringify(entry.order)}`,
    })
  }

  if ("layout" in entry && entry.layout !== null) {
    if (!isPlainObject(entry.layout)) {
      issues.push({ severity: "error", message: "`layout` must be a mapping" })
    } else {
      for (const key of Object.keys(entry.layout)) {
        if (LAYOUT_KEYS.includes(key)) continue
        const suggestion = suggestClosest(key, LAYOUT_KEYS)
        issues.push({
          severity: "warning",
          ...(suggestion && { suggestion }),
          message: suggestion
            ? `unknown layout key "${key}" — did you mean "${suggestion}"?`
            : `unknown layout key "${key}" (allowed: ${LAYOUT_KEYS.join(", ")})`,
        })
      }
      const { position, display } = entry.layout
      if (position !== undefined && !LAYOUT_POSITIONS.includes(position)) {
        const suggestion = suggestClosest(String(position), LAYOUT_POSITIONS)
        issues.push({
          severity: "warning",
          ...(suggestion && { suggestion }),
          message:
            `layout.position ${JSON.stringify(position)} is not a known slot (${LAYOUT_POSITIONS.join(", ")})` +
            (suggestion ? ` — did you mean "${suggestion}"?` : ""),
        })
      }
      if (display !== undefined && !LAYOUT_DISPLAYS.includes(display)) {
        const suggestion = suggestClosest(String(display), LAYOUT_DISPLAYS)
        issues.push({
          severity: "warning",
          ...(suggestion && { suggestion }),
          message:
            `layout.display ${JSON.stringify(display)} is not valid (${LAYOUT_DISPLAYS.join(", ")})` +
            (suggestion ? ` — did you mean "${suggestion}"?` : ""),
        })
      }
    }
  }

  return issues
}

/**
 * Parse a `--set` path like "a.b.c" into segments. Keys that genuinely contain
 * dots can be written with brackets: `["my.key"]`.
 * @param {string} keyPath
 */
export function parseOptionPath(keyPath) {
  const segments = []
  const re = /\[["']([^"']+)["']\]|([^.[\]]+)/g
  let match
  while ((match = re.exec(keyPath)) !== null) {
    segments.push(match[1] ?? match[2])
  }
  return segments
}

/** Set a nested value, creating intermediate objects. */
export function setOptionPath(target, segments, value) {
  let node = target
  for (let i = 0; i < segments.length - 1; i++) {
    const seg = segments[i]
    if (!isPlainObject(node[seg])) node[seg] = {}
    node = node[seg]
  }
  node[segments[segments.length - 1]] = value
}

/** Delete a nested value; prunes now-empty parent objects. Returns true if something was removed. */
export function unsetOptionPath(target, segments) {
  const parents = []
  let node = target
  for (let i = 0; i < segments.length - 1; i++) {
    if (!isPlainObject(node?.[segments[i]])) return false
    parents.push([node, segments[i]])
    node = node[segments[i]]
  }
  const last = segments[segments.length - 1]
  if (!isPlainObject(node) || !(last in node)) return false
  delete node[last]
  for (let i = parents.length - 1; i >= 0; i--) {
    const [parent, key] = parents[i]
    if (Object.keys(parent[key]).length === 0) delete parent[key]
    else break
  }
  return true
}

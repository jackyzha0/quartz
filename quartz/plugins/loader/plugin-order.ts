/**
 * Plugin order: numeric `order` first, then checked `before:` / `after:` constraints (#2440).
 *
 * - Plugins run by `order` (lower first), as before. `before`/`after` never move a plugin past
 *   a plugin with a different `order`: they are checked against it, and a contradiction
 *   (`after: X` while X has a higher order) is an error that names both orders.
 * - Between plugins with the same `order`, the constraints decide; otherwise the list order does
 *   (built-ins first, then the config's order), as before.
 * - Names are plugin names, matched loosely (`obsidian-flavored-markdown`,
 *   `ObsidianFlavoredMarkdown` and `@quartz-community/obsidian-flavored-markdown` are the same;
 *   built-ins answer to their instance name and config key, e.g. `Links` / `links`).
 * - A name that is not in the config at all is an error (likely a typo). A plugin that is in
 *   the config but disabled, or runs in another category, is skipped: the constraint only
 *   applies where both plugins run. A cycle among equal orders is an error.
 *
 * Constraints are plain data on config entries, so a later dependency-based scheme (e.g. from
 * the manifests' `dependencies`) can feed the same checks.
 */

/** A configuration mistake: reported by its message alone (no stack trace). */
export class PluginOrderError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "PluginOrderError"
    this.stack = `${this.name}: ${message}`
  }
}

/** Loose plugin name: lowercase, scope and punctuation removed. */
export function normalizePluginName(name: string): string {
  const bare = name.trim().replace(/^@[^/]+\//, "")
  return bare.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export interface OrderItem<T> {
  instance: T
  order: number
  /** Display name used in messages. */
  label: string
  /** Every name this plugin answers to. */
  names: string[]
  before?: string[]
  after?: string[]
}

/** Accepts `before: X` and `before: [X, Y]`; anything else is an error. */
export function constraintList(value: unknown, field: string, label: string): string[] {
  if (value === undefined || value === null) return []
  const list = Array.isArray(value) ? value : [value]
  for (const v of list) {
    if (typeof v !== "string" || v.trim() === "") {
      throw new PluginOrderError(
        `plugin "${label}": "${field}" must be a plugin name or a list of plugin names`,
      )
    }
  }
  return list as string[]
}

/**
 * Sort one category's plugins. `known` holds the normalized names of every plugin in the
 * config (enabled or not, any category) and of the built-ins, to tell typos from plugins that
 * just don't run here.
 */
export function orderPlugins<T>(items: OrderItem<T>[], known: ReadonlySet<string>): T[] {
  const indexed = items.map((item, index) => ({ ...item, index }))
  const byName = new Map<string, (typeof indexed)[number]>()
  for (const item of indexed) {
    for (const name of item.names) {
      const key = normalizePluginName(name)
      if (!byName.has(key)) byName.set(key, item)
    }
  }

  // edges: earlier → later
  const later = new Map<number, Set<number>>()
  const addEdge = (
    first: (typeof indexed)[number],
    second: (typeof indexed)[number],
    why: string,
  ) => {
    if (first === second) {
      throw new PluginOrderError(`plugin "${first.label}": ${why} names the plugin itself`)
    }
    if (first.order > second.order) {
      throw new PluginOrderError(
        `plugin "${second.label}" (order ${second.order}) ${why}, but "${first.label}" has order ${first.order}, so it runs later. ` +
          `Give "${second.label}" an order above ${first.order}, or "${first.label}" one below ${second.order}.`,
      )
    }
    if (!later.has(first.index)) later.set(first.index, new Set())
    later.get(first.index)!.add(second.index)
  }

  for (const item of indexed) {
    for (const [field, names] of [
      ["after", item.after ?? []],
      ["before", item.before ?? []],
    ] as const) {
      for (const name of names) {
        const key = normalizePluginName(name)
        const other = byName.get(key)
        if (!other) {
          if (!known.has(key)) {
            throw new PluginOrderError(
              `plugin "${item.label}": ${field}: "${name}" is not a plugin in this config`,
            )
          }
          continue // disabled, or not in this category
        }
        if (field === "after") addEdge(other, item, `must run after "${other.label}"`)
        else {
          // phrase the message from the constrained plugin's point of view
          if (item.order > other.order) {
            throw new PluginOrderError(
              `plugin "${item.label}" (order ${item.order}) must run before "${other.label}", but "${other.label}" has order ${other.order}, so it runs earlier. ` +
                `Give "${item.label}" an order below ${other.order}, or "${other.label}" one above ${item.order}.`,
            )
          }
          addEdge(item, other, `must run before "${other.label}"`)
        }
      }
    }
  }

  // numeric order, then list position; within one order, a stable topological sort
  const sorted = [...indexed].sort((a, b) => a.order - b.order || a.index - b.index)
  if (later.size === 0) return sorted.map((i) => i.instance)

  const result: (typeof indexed)[number][] = []
  let start = 0
  while (start < sorted.length) {
    let end = start
    while (end < sorted.length && sorted[end].order === sorted[start].order) end++
    const group = sorted.slice(start, end)
    const inGroup = new Set(group.map((g) => g.index))
    const indegree = new Map(group.map((g) => [g.index, 0]))
    for (const g of group) {
      for (const next of later.get(g.index) ?? []) {
        if (inGroup.has(next)) indegree.set(next, indegree.get(next)! + 1)
      }
    }
    const remaining = [...group]
    while (remaining.length > 0) {
      const pos = remaining.findIndex((g) => indegree.get(g.index) === 0)
      if (pos === -1) {
        throw new PluginOrderError(
          `"before"/"after" form a cycle among plugins with order ${group[0].order}: ${remaining.map((g) => g.label).join(", ")}`,
        )
      }
      const [next] = remaining.splice(pos, 1)
      result.push(next)
      for (const n of later.get(next.index) ?? []) {
        if (inGroup.has(n)) indegree.set(n, indegree.get(n)! - 1)
      }
    }
    start = end
  }
  return result.map((i) => i.instance)
}

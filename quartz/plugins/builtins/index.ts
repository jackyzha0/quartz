/**
 * Built-in processing: the parts of the pipeline every site needs, which used to be separate
 * default plugins and silently broke the site when disabled or misordered.
 *
 * | built-in      | configuration key            | formerly                             |
 * |---------------|------------------------------|--------------------------------------|
 * | frontmatter   | `configuration.frontmatter`  | parsing half of note-properties      |
 * | links         | `configuration.links`        | crawl-links                          |
 * | drafts        | `configuration.drafts`       | remove-draft                         |
 * | contentIndex  | `configuration.contentIndex` | content-index                        |
 *
 * Each built-in:
 * - is configured under `configuration.<key>` and can be turned off with `enabled: false`;
 * - yields to an enabled plugin that declares it provides the same capability (e.g. a plugin
 *   with `quartz.capabilities.provides.data: ["links"]` replaces built-in links), so alternative
 *   implementations stay possible;
 * - absorbs the config entry of the official plugin it replaces (`@quartz-community/crawl-links`
 *   etc.): that entry's options and order are applied to the built-in and the package is not
 *   loaded, so existing quartz.config.yaml files keep working unchanged.
 *
 * `planBuiltins` is pure (no I/O) so the decision logic is unit-testable.
 */
import { GlobalConfiguration } from "../../cfg"
import type { CapabilityList, CapabilityRequirements } from "../loader/capabilities"
import type { PluginJsonEntry, PluginSource } from "../loader/types"
import {
  QuartzEmitterPluginInstance,
  QuartzFilterPluginInstance,
  QuartzTransformerPluginInstance,
} from "../types"
import { ContentIndex, contentIndexDefaults } from "./contentIndex"
import { Drafts } from "./drafts"
import { Frontmatter, frontmatterDefaults } from "./frontmatter"
import { Links, legacyCrawlLinksDefaults, linksDefaults } from "./links"
import { registerPluginOrigin } from "../../util/diagnostics"

export { ContentIndex, Drafts, Frontmatter, Links }
export {
  buildContentIndex,
  applyContentIndexExtensions,
  collectContentIndexExtensions,
  serializeContentIndex,
} from "./contentIndex"

export type BuiltinId = "frontmatter" | "links" | "drafts" | "contentIndex"
type BuiltinCategory = "transformer" | "filter" | "emitter"
type BuiltinInstance =
  QuartzTransformerPluginInstance | QuartzFilterPluginInstance | QuartzEmitterPluginInstance

export interface BuiltinSpec {
  id: BuiltinId
  configKey: "frontmatter" | "links" | "drafts" | "contentIndex"
  category: BuiltinCategory
  /** Position among plugins of the same category (same scale as plugin `defaultOrder`). */
  order: number
  /** Option defaults (used for option validation and docs). */
  defaults: Record<string, unknown>
  /** Official plugins whose config entries are absorbed (short names). */
  absorbs: string[]
  /** Option defaults of the absorbed plugin that differ from the built-in's. */
  absorbedDefaults?: Record<string, unknown>
  /** Options taken from another (still supported) plugin's entry when not set in configuration. */
  optionDonors?: { plugin: string; keys: string[] }[]
  /** A plugin providing any of these replaces the built-in. */
  replacedBy: CapabilityList
  capabilities: { provides: CapabilityList; requires?: CapabilityRequirements }
  create: (options: Record<string, unknown>) => BuiltinInstance
}

export const BUILTINS: BuiltinSpec[] = [
  {
    id: "frontmatter",
    configKey: "frontmatter",
    category: "transformer",
    order: 0,
    defaults: frontmatterDefaults,
    absorbs: [],
    optionDonors: [{ plugin: "note-properties", keys: ["delimiters", "language"] }],
    replacedBy: { data: ["frontmatter"] },
    capabilities: { provides: { data: ["frontmatter", "aliases", "frontmatterLinks"] } },
    create: (o) => Frontmatter(o),
  },
  {
    id: "links",
    configKey: "links",
    category: "transformer",
    order: 60,
    defaults: linksDefaults,
    absorbs: ["crawl-links"],
    absorbedDefaults: legacyCrawlLinksDefaults,
    replacedBy: { data: ["links"] },
    capabilities: {
      provides: { data: ["links"], dom: [".internal", ".external", ".broken"] },
      requires: { data: ["slug"] },
    },
    create: (o) => Links(o),
  },
  {
    id: "drafts",
    configKey: "drafts",
    category: "filter",
    order: 50,
    defaults: { publish: false },
    absorbs: ["remove-draft"],
    replacedBy: {},
    capabilities: {
      provides: {},
      requires: {
        data: [
          {
            name: "frontmatter",
            reason: "frontmatter is not parsed, so pages marked `draft: true` ARE PUBLISHED",
          },
        ],
      },
    },
    create: (o) => Drafts(o),
  },
  {
    id: "contentIndex",
    configKey: "contentIndex",
    category: "emitter",
    order: 50,
    defaults: contentIndexDefaults,
    absorbs: ["content-index"],
    replacedBy: { files: ["static/contentIndex.json"] },
    capabilities: {
      provides: { files: ["static/contentIndex.json", "sitemap.xml"] },
    },
    create: (o) => ContentIndex(o),
  },
]

/** Short name of an official `quartz-community` plugin source, or undefined for anything else. */
export function officialPluginName(source: PluginSource): string | undefined {
  if (typeof source === "object" && source !== null) {
    return officialPluginName(source.repo)
  }
  const npm = source.match(/^@quartz-community\/([a-z0-9-]+)(?:@.*)?$/)
  if (npm) return npm[1]
  const github = source.match(
    /^(?:github:|git\+https:\/\/github\.com\/|https:\/\/github\.com\/)quartz-community\/([a-z0-9-]+?)(?:\.git)?(?:#.*)?$/,
  )
  return github?.[1]
}

/** The built-in that absorbs this entry (its plugin now lives in core), if any. */
export function absorbingBuiltin(entry: PluginJsonEntry): BuiltinSpec | undefined {
  const name = officialPluginName(entry.source)
  if (!name) return undefined
  return BUILTINS.find((b) => b.absorbs.includes(name))
}

export interface PlannedBuiltin {
  spec: BuiltinSpec
  enabled: boolean
  options: Record<string, unknown>
  order: number
  /** Why it is disabled, or where its options came from. */
  note?: string
  /** Plugin that replaces it (when disabled because of a provider). */
  replacedBy?: string
  /** Config entry that was absorbed into it. */
  absorbed?: PluginJsonEntry
}

export interface BuiltinPlan {
  builtins: PlannedBuiltin[]
  /** Entries handled by core — not installed, loaded or capability-checked as plugins. */
  absorbedEntries: Set<PluginJsonEntry>
  /** One-line notices for the user (deprecations, replacements, unknown options). */
  notices: string[]
}

export interface PlanInput {
  configuration: Partial<GlobalConfiguration>
  entries: PluginJsonEntry[]
  /** Display name of an entry (manifest name or source-derived). */
  nameOf: (entry: PluginJsonEntry) => string
  /** Declared `capabilities.provides` of an enabled entry (from its manifest). */
  providesOf: (entry: PluginJsonEntry) => CapabilityList | undefined
}

function overlaps(a: CapabilityList, b: CapabilityList | undefined): boolean {
  if (!b) return false
  for (const [kind, names] of Object.entries(a)) {
    const other = (b as Record<string, string[] | undefined>)[kind] ?? []
    const normalized = new Set(other.map((n) => n.replace(/^\/+/, "")))
    if ((names ?? []).some((n) => normalized.has(n.replace(/^\/+/, "")))) return true
  }
  return false
}

function shortName(entry: PluginJsonEntry, nameOf: PlanInput["nameOf"]): string {
  return officialPluginName(entry.source) ?? nameOf(entry).replace(/^@[^/]+\//, "")
}

/** Decide which built-ins run, with which options and order. */
export function planBuiltins(input: PlanInput): BuiltinPlan {
  const notices: string[] = []
  const absorbedEntries = new Set<PluginJsonEntry>()
  const builtins: PlannedBuiltin[] = []

  for (const spec of BUILTINS) {
    const raw = input.configuration[spec.configKey] as Record<string, unknown> | boolean | undefined
    // allow `links: false` as shorthand for `links: { enabled: false }`
    const configured: Record<string, unknown> =
      typeof raw === "boolean" ? { enabled: raw } : raw && typeof raw === "object" ? raw : {}
    const { enabled: explicitEnabled, order: configuredOrder, ...configuredOptions } = configured

    for (const key of Object.keys(configuredOptions)) {
      if (!(key in spec.defaults)) {
        notices.push(
          `configuration.${spec.configKey}.${key} is not a known option (known: enabled, order, ${Object.keys(spec.defaults).join(", ")}).`,
        )
      }
    }

    let options: Record<string, unknown> = { ...spec.defaults }
    let order = spec.order
    let enabled = explicitEnabled !== false
    let note: string | undefined =
      explicitEnabled === false ? "disabled in configuration" : undefined
    let absorbed: PluginJsonEntry | undefined
    let replacedBy: string | undefined

    // 1. Absorb the config entry of the official plugin this built-in replaces.
    const legacy = input.entries.filter((e) => absorbingBuiltin(e) === spec)
    for (const entry of legacy) absorbedEntries.add(entry)
    const legacyEntry = legacy.find((e) => e.enabled) ?? legacy[0]
    if (legacyEntry) {
      absorbed = legacyEntry
      const name = shortName(legacyEntry, input.nameOf)
      if (legacyEntry.enabled) {
        options = { ...options, ...spec.absorbedDefaults, ...legacyEntry.options }
        if (legacyEntry.order !== undefined) order = legacyEntry.order
        notices.push(
          `"${name}" is built into Quartz now: its entry in quartz.config.yaml is applied to configuration.${spec.configKey} ` +
            `(run \`npx quartz plugin doctor --fix\` to move it).`,
        )
      } else if (explicitEnabled === undefined) {
        enabled = false
        note = `disabled because "${name}" is disabled in quartz.config.yaml`
        notices.push(
          `"${name}" is built into Quartz now and disabled in quartz.config.yaml, so configuration.${spec.configKey} is off ` +
            `(run \`npx quartz plugin doctor --fix\` to move this setting).`,
        )
      }
    }

    // 2. Options donated by a still-supported plugin (e.g. note-properties' delimiters).
    for (const donor of spec.optionDonors ?? []) {
      const entry = input.entries.find(
        (e) => e.enabled && shortName(e, input.nameOf) === donor.plugin,
      )
      for (const key of donor.keys) {
        const value = entry?.options?.[key]
        if (value !== undefined && configuredOptions[key] === undefined) options[key] = value
      }
    }

    options = { ...options, ...configuredOptions }
    if (typeof configuredOrder === "number") order = configuredOrder

    // 3. Yield to an enabled plugin that provides the same capability (unless forced on).
    if (enabled && explicitEnabled !== true) {
      const provider = input.entries.find(
        (e) =>
          e.enabled &&
          !absorbedEntries.has(e) &&
          !legacy.includes(e) &&
          overlaps(spec.replacedBy, input.providesOf(e)),
      )
      if (provider) {
        enabled = false
        replacedBy = input.nameOf(provider)
        note = `replaced by plugin "${replacedBy}"`
      }
    }

    builtins.push({ spec, enabled, options, order, note, replacedBy, absorbed })
  }

  return { builtins, absorbedEntries, notices }
}

/** Instantiate the enabled built-ins of one category, each with its order. */
export function instantiateBuiltins<C extends BuiltinCategory>(
  plan: BuiltinPlan,
  category: C,
): { order: number; instance: BuiltinInstance }[] {
  return (
    plan.builtins
      .filter((b) => b.enabled && b.spec.category === category)
      // drafts.publish: true → nothing to filter
      .filter((b) => !(b.spec.id === "drafts" && b.options.publish === true))
      .map((b) => {
        const instance = b.spec.create(b.options)
        registerPluginOrigin(instance, {
          name: instance.name,
          displayName: `configuration.${b.spec.configKey}`,
          source: "built-in",
          category: b.spec.category,
          builtin: true,
        })
        return { order: b.order, instance }
      })
  )
}

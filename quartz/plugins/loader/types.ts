import {
  QuartzTransformerPlugin,
  QuartzFilterPlugin,
  QuartzEmitterPlugin,
  QuartzPageTypePlugin,
} from "../types"
import { BuildCtx } from "../../util/ctx"
import type { PluginCapabilities } from "./capabilities"

export type PluginCategory = "transformer" | "filter" | "emitter" | "pageType" | "component"

export type LayoutPosition = "left" | "right" | "beforeBody" | "afterBody" | "header" | "footer"

export type LayoutDisplay = "all" | "mobile-only" | "desktop-only"

/**
 * Component manifest metadata
 */
export interface ComponentManifest {
  name: string
  displayName: string
  description: string
  version: string
  quartzVersion?: string
  author?: string
  homepage?: string
}

/**
 * Layout defaults for a component declared in a plugin manifest.
 * These are used as fallback values when no user layout config is specified.
 */
export interface ComponentLayoutDefaults {
  displayName: string
  description?: string
  defaultPosition?: LayoutPosition
  defaultPriority?: number
}

/**
 * Plugin manifest metadata for discovery and documentation.
 *
 * This corresponds to the `quartz` field in a plugin's `package.json`.
 */
export interface PluginManifest {
  name: string
  displayName: string
  description: string
  version: string
  author?: string
  homepage?: string
  /** Where to report bugs (from package.json `bugs` / `repository`). */
  issues?: string
  keywords?: string[]
  category?: PluginCategory | PluginCategory[]
  quartzVersion?: string
  /** Set when the plugin is deprecated: why, and what replaces it (warned about at build time). */
  deprecated?: string
  /** Plugin sources this plugin depends on (e.g., "@quartz-community/crawl-links") */
  dependencies?: string[]
  /** Default numeric execution order (0-100 convention, lower = runs first). Defaults to 50. */
  defaultOrder?: number
  /** Whether the plugin is enabled by default on install. Defaults to true. */
  defaultEnabled?: boolean
  /** Default options applied when no user options are specified */
  defaultOptions?: Record<string, unknown>
  /** JSON Schema for the plugin's options object, used for validation and TUI generation */
  configSchema?: object
  /** Components provided by this plugin, keyed by component export name */
  components?: Record<string, ComponentManifest & ComponentLayoutDefaults>
  /** Page frames provided by this plugin, keyed by export name. Each entry maps to a PageFrame object. */
  frames?: Record<string, { exportName: string }>
  /** Whether the plugin requires `npm install` after cloning (e.g. for native dependencies like sharp). */
  requiresInstall?: boolean
  /** Declared provided / required capabilities (data keys, DOM, globals, events, files, CSS vars). See capabilities.ts. */
  capabilities?: PluginCapabilities
}

/**
 * Loaded plugin with metadata
 */
export interface LoadedPlugin {
  plugin: QuartzTransformerPlugin | QuartzFilterPlugin | QuartzEmitterPlugin | QuartzPageTypePlugin
  manifest: PluginManifest
  type: PluginCategory
  source: string
}

/**
 * Plugin resolution result
 */
export interface PluginResolution {
  /** Successfully loaded plugins */
  plugins: LoadedPlugin[]
  /** Errors that occurred during resolution */
  errors: PluginResolutionError[]
}

/**
 * Plugin resolution error
 */
export interface PluginResolutionError {
  /** Plugin name that failed to load */
  plugin: string
  /** Error message */
  message: string
  /** Error type */
  type: "not-found" | "invalid-manifest" | "version-mismatch" | "import-error"
}

/**
 * Options for plugin resolution
 */
export interface PluginResolutionOptions {
  /** Current Quartz version for compatibility checking */
  quartzVersion: string
  /** Build context for logging */
  ctx: BuildCtx
  /** Whether to enable verbose logging */
  verbose?: boolean
}

/**
 * Plugin specifier - can be:
 * - String package name (e.g., "@quartz-community/my-plugin")
 * - Object with name and options (e.g., { name: "@quartz-community/my-plugin", options: {...} })
 * - Inline plugin object (already loaded plugin instance)
 */
export type PluginSpecifier =
  | string
  | { name: string; options?: unknown }
  | { plugin: LoadedPlugin["plugin"]; manifest?: Partial<PluginManifest> }

/** Layout declaration for a component-providing plugin in quartz.config.yaml */
export interface PluginLayoutDeclaration {
  position: LayoutPosition
  priority: number
  display?: LayoutDisplay
  condition?: string
  group?: string
  groupOptions?: {
    grow?: boolean
    shrink?: boolean
    basis?: string
    order?: number
    align?: "start" | "end" | "center" | "stretch"
    justify?: "start" | "end" | "center" | "between" | "around"
  }
}

/** Object form of a plugin source (for monorepo / advanced config) */
export interface PluginSourceObject {
  repo: string
  subdir?: string
  ref?: string
  name?: string
}

/** A plugin source can be a string shorthand or an object with additional fields */
export type PluginSource = string | PluginSourceObject

/** A single plugin entry in quartz.config.yaml */
export interface PluginJsonEntry {
  source: PluginSource
  enabled: boolean
  options?: Record<string, unknown>
  order?: number
  layout?: PluginLayoutDeclaration
}

/** Flex group configuration in the top-level layout section */
export interface FlexGroupConfig {
  /** Explicit priority for the group. Overrides first-member priority. Lower = renders first. */
  priority?: number
  direction?: "row" | "row-reverse" | "column" | "column-reverse"
  wrap?: "nowrap" | "wrap" | "wrap-reverse"
  gap?: string
}

/** Per-page-type layout overrides */
export interface PageTypeLayoutOverride {
  exclude?: string[]
  positions?: Partial<Record<LayoutPosition, PluginLayoutDeclaration[]>>
  /** Override the page frame template (e.g. "default", "full-width", "minimal") */
  template?: string
  /** Override sidebar modes for this page type (merged over `layout.sidebars`) */
  sidebars?: { left?: string; right?: string }
}

/** Top-level layout section of quartz.config.yaml */
export interface LayoutConfig {
  groups?: Record<string, FlexGroupConfig>
  /** How each sidebar handles content taller than the screen: fit (default), scroll, static */
  sidebars?: { left?: string; right?: string }
  byPageType?: Record<string, PageTypeLayoutOverride>
}

/** Root type for quartz.config.yaml */
export interface QuartzPluginsJson {
  $schema?: string
  configuration: Record<string, unknown>
  plugins: PluginJsonEntry[]
  layout?: LayoutConfig
}

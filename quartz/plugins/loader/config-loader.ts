import fs from "fs"
import path from "path"
import YAML from "yaml"
import { styleText } from "util"
import { fileURLToPath } from "node:url"
import { QuartzConfig, GlobalConfiguration, FullPageLayout } from "../../cfg"
import { QuartzComponent, QuartzComponentConstructor } from "../../components/types"
import { PluginTypes } from "../types"
import {
  PluginManifest,
  PluginJsonEntry,
  PluginSource,
  QuartzPluginsJson,
  LayoutConfig,
  PluginLayoutDeclaration,
  FlexGroupConfig,
} from "./types"
import {
  parsePluginSource,
  installPlugin,
  installNativeDeps,
  getPluginEntryPoint,
  toFileUrl,
  isLocalSource,
} from "./gitLoader"
import { loadComponentsFromPackage } from "./componentLoader"
import { loadFramesFromPackage } from "./frameLoader"
import { componentRegistry } from "../../components/registry"
import { getCondition } from "./conditions"
import Flex from "../../components/Flex"
import MobileOnly from "../../components/MobileOnly"
import DesktopOnly from "../../components/DesktopOnly"
import ConditionalRender from "../../components/ConditionalRender"

const CONFIG_YAML_PATH = path.join(process.cwd(), "quartz.config.yaml")
const DEFAULT_CONFIG_YAML_PATH = path.join(process.cwd(), "quartz.config.default.yaml")
const LEGACY_PLUGINS_JSON_PATH = path.join(process.cwd(), "quartz.plugins.json")
const LEGACY_DEFAULT_PLUGINS_JSON_PATH = path.join(process.cwd(), "quartz.plugins.default.json")

function resolveConfigPath(): string {
  if (fs.existsSync(CONFIG_YAML_PATH)) return CONFIG_YAML_PATH
  if (fs.existsSync(LEGACY_PLUGINS_JSON_PATH)) return LEGACY_PLUGINS_JSON_PATH
  if (fs.existsSync(DEFAULT_CONFIG_YAML_PATH)) return DEFAULT_CONFIG_YAML_PATH
  if (fs.existsSync(LEGACY_DEFAULT_PLUGINS_JSON_PATH)) return LEGACY_DEFAULT_PLUGINS_JSON_PATH
  return CONFIG_YAML_PATH
}
function readPluginsJson(): QuartzPluginsJson | null {
  const configPath = resolveConfigPath()
  if (!fs.existsSync(configPath)) {
    return null
  }
  const raw = fs.readFileSync(configPath, "utf-8")
  if (configPath.endsWith(".yaml") || configPath.endsWith(".yml")) {
    return YAML.parse(raw) as QuartzPluginsJson
  }
  return JSON.parse(raw) as QuartzPluginsJson
}

function extractPluginName(source: PluginSource): string {
  if (typeof source === "object" && source !== null) {
    if (source.name) return source.name
    return extractPluginName(source.repo)
  }

  if (isLocalSource(source)) {
    return path.basename(source.replace(/[\/]+$/, ""))
  }
  if (source.startsWith("github:")) {
    const withoutPrefix = source.replace("github:", "")
    const [repoPath] = withoutPrefix.split("#")
    const parts = repoPath.split("/")
    return parts[parts.length - 1]
  }
  if (source.startsWith("git+") || source.startsWith("https://")) {
    const url = source.replace("git+", "")
    const match = url.match(/\/([^/]+?)(?:\.git)?(?:#|$)/)
    return match?.[1] ?? source
  }
  return source
}

function formatSourceDisplay(source: PluginSource): string {
  if (typeof source === "string") return source
  const parts = [source.repo]
  if (source.subdir) parts.push(`(subdir: ${source.subdir})`)
  if (source.ref) parts.push(`(ref: ${source.ref})`)
  return parts.join(" ")
}

function sourceKey(source: PluginSource): string {
  if (typeof source === "string") return source
  return JSON.stringify(source)
}

interface DependencyValidationResult {
  errors: string[]
  warnings: string[]
}

function validateDependencies(
  entries: PluginJsonEntry[],
  manifests: Map<string, PluginManifest>,
): DependencyValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  const sourceToEntry = new Map<string, PluginJsonEntry>()
  const nameToSource = new Map<string, string>()
  for (const entry of entries) {
    sourceToEntry.set(sourceKey(entry.source), entry)
    nameToSource.set(extractPluginName(entry.source), sourceKey(entry.source))
  }

  for (const entry of entries) {
    if (!entry.enabled) continue
    const manifest = manifests.get(sourceKey(entry.source))
    if (!manifest?.dependencies?.length) continue

    const pluginName = manifest.displayName || extractPluginName(entry.source)
    const pluginOrder = entry.order ?? manifest.defaultOrder ?? 50

    for (const dep of manifest.dependencies) {
      const depEntry = sourceToEntry.get(dep)
      const depName = extractPluginName(dep)

      if (!depEntry) {
        errors.push(
          `Plugin "${pluginName}" requires "${depName}". Run: npx quartz plugin add ${dep}`,
        )
        continue
      }

      if (!depEntry.enabled) {
        warnings.push(
          `Plugin "${pluginName}" depends on "${depName}" which is disabled. "${pluginName}" may not function correctly.`,
        )
      }

      const depManifest = manifests.get(dep)
      const depOrder = depEntry.order ?? depManifest?.defaultOrder ?? 50

      if (pluginOrder < depOrder) {
        errors.push(
          `Plugin "${pluginName}" (order: ${pluginOrder}) depends on "${depName}" (order: ${depOrder}), ` +
            `but "${pluginName}" is configured to run first. Either increase "${pluginName}"'s order above ${depOrder} ` +
            `or decrease "${depName}"'s order below ${pluginOrder}.`,
        )
      }
    }
  }

  const graph = new Map<string, string[]>()
  for (const entry of entries) {
    const manifest = manifests.get(sourceKey(entry.source))
    if (manifest?.dependencies?.length) {
      graph.set(sourceKey(entry.source), manifest.dependencies)
    }
  }

  const visited = new Set<string>()
  const inStack = new Set<string>()

  function detectCycle(node: string, pathSoFar: string[]): string[] | null {
    if (inStack.has(node)) {
      const cycleStart = pathSoFar.indexOf(node)
      return pathSoFar.slice(cycleStart).concat(node)
    }
    if (visited.has(node)) return null

    visited.add(node)
    inStack.add(node)

    for (const dep of graph.get(node) ?? []) {
      const cycle = detectCycle(dep, [...pathSoFar, node])
      if (cycle) return cycle
    }

    inStack.delete(node)
    return null
  }

  for (const node of graph.keys()) {
    const cycle = detectCycle(node, [])
    if (cycle) {
      const names = cycle.map(extractPluginName)
      errors.push(`Circular dependency detected: ${names.join(" → ")}`)
      break
    }
  }

  return { errors, warnings }
}

async function resolvePluginManifest(source: PluginSource): Promise<PluginManifest | null> {
  try {
    const gitSpec = parsePluginSource(source)
    const entryPoint = getPluginEntryPoint(gitSpec.name)
    const module = await import(toFileUrl(entryPoint))
    return module.manifest ?? null
  } catch {
    return null
  }
}

async function readManifestFromPackageJson(source: PluginSource): Promise<PluginManifest | null> {
  try {
    const gitSpec = parsePluginSource(source)
    let pkgPath: string
    if (gitSpec.npmPackage) {
      pkgPath = fileURLToPath(import.meta.resolve(`${gitSpec.name}/package.json`))
    } else {
      const pluginDir = path.join(process.cwd(), ".quartz", "plugins", gitSpec.name)
      pkgPath = path.join(pluginDir, "package.json")
    }
    if (!fs.existsSync(pkgPath)) return null

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
    if (!pkg.quartz) return null

    const q = pkg.quartz
    return {
      name: q.name ?? gitSpec.name,
      displayName: q.displayName ?? q.name ?? gitSpec.name,
      description: q.description ?? pkg.description ?? "No description",
      version: q.version ?? pkg.version ?? "1.0.0",
      author: q.author ?? pkg.author,
      homepage: q.homepage ?? pkg.homepage,
      category: q.category,
      quartzVersion: q.quartzVersion,
      dependencies: q.dependencies,
      defaultOrder: q.defaultOrder,
      defaultEnabled: q.defaultEnabled,
      defaultOptions: q.defaultOptions,
      configSchema: q.configSchema,
      components: q.components,
      frames: q.frames,
    }
  } catch {
    return null
  }
}

async function getManifest(source: PluginSource): Promise<PluginManifest | null> {
  // Try package.json quartz field first (preferred), then fall back to manifest.ts export
  return (await readManifestFromPackageJson(source)) ?? (await resolvePluginManifest(source))
}

export async function loadQuartzConfig(
  configOverrides?: Partial<GlobalConfiguration>,
): Promise<QuartzConfig> {
  const json = readPluginsJson()

  if (!json) {
    // Fallback: import old-style config directly
    const oldConfig = await import("../../../quartz")
    return oldConfig.default
  }

  const configuration = {
    ...(json.configuration as unknown as GlobalConfiguration),
    ...configOverrides,
  }

  const enabledEntries = json.plugins.filter((e) => e.enabled)
  const manifests = new Map<string, PluginManifest>()

  // Ensure all plugins are installed and collect native deps
  const allNativeDeps = new Map<string, Map<string, string>>()
  for (const entry of enabledEntries) {
    try {
      const gitSpec = parsePluginSource(entry.source)
      if (gitSpec.npmPackage) {
        continue
      }
      const result = await installPlugin(gitSpec, { verbose: false })
      if (result.nativeDeps.size > 0) {
        allNativeDeps.set(gitSpec.name, result.nativeDeps)
      }
    } catch (err) {
      console.error(
        styleText("red", `✗`) +
          ` Failed to install plugin: ${styleText("yellow", formatSourceDisplay(entry.source))}\n` +
          `  ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }

  if (allNativeDeps.size > 0) {
    installNativeDeps(allNativeDeps, { verbose: false })
  }

  // Collect manifests (requires native deps to be installed first)
  for (const entry of enabledEntries) {
    try {
      const manifest = await getManifest(entry.source)
      if (manifest) {
        manifests.set(sourceKey(entry.source), manifest)
      }
    } catch (err) {
      console.error(
        styleText("red", `✗`) +
          ` Failed to load manifest: ${styleText("yellow", formatSourceDisplay(entry.source))}\n` +
          `  ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }

  // Validate dependencies
  const validation = validateDependencies(enabledEntries, manifests)
  for (const warning of validation.warnings) {
    console.warn(styleText("yellow", `⚠`) + ` ${warning}`)
  }
  if (validation.errors.length > 0) {
    for (const error of validation.errors) {
      console.error(styleText("red", `✗`) + ` ${error}`)
    }
    throw new Error(
      `Plugin dependency validation failed with ${validation.errors.length} error(s). See above for details.`,
    )
  }

  // Categorize and sort plugins
  const transformers: { entry: PluginJsonEntry; manifest: PluginManifest | undefined }[] = []
  const filters: { entry: PluginJsonEntry; manifest: PluginManifest | undefined }[] = []
  const emitters: { entry: PluginJsonEntry; manifest: PluginManifest | undefined }[] = []
  const pageTypes: { entry: PluginJsonEntry; manifest: PluginManifest | undefined }[] = []

  for (const entry of enabledEntries) {
    const manifest = manifests.get(sourceKey(entry.source))
    const category = manifest?.category
    // Resolve processing categories: for array categories (e.g. ["transformer", "pageType", "component"]),
    // push the plugin into ALL matching processing category buckets.
    // "component" is handled separately via loadComponentsFromPackage during instantiation.
    const processingCategories = ["transformer", "filter", "emitter", "pageType"] as const
    const categoryMap: Record<string, typeof transformers> = {
      transformer: transformers,
      filter: filters,
      emitter: emitters,
      pageType: pageTypes,
    }

    const categories = Array.isArray(category) ? category : category ? [category] : []
    const matchedProcessing = categories.filter((c) =>
      (processingCategories as readonly string[]).includes(c),
    )

    if (matchedProcessing.length > 0) {
      for (const cat of matchedProcessing) {
        categoryMap[cat].push({ entry, manifest })
      }
    } else {
      const gitSpec = parsePluginSource(entry.source)
      const isComponentOnly = categories.length > 0 && categories.every((c) => c === "component")

      if (isComponentOnly) {
        // Always import the main entry point for component-only plugins.
        // Some plugins (e.g. Bases view registrations) rely on side effects
        // in their index module to register functionality.
        const entryPoint = getPluginEntryPoint(gitSpec.name)
        try {
          const module = await import(toFileUrl(entryPoint))
          // If the module exports an init() function, call it with merged options
          // so component-only plugins can receive user configuration from YAML.
          if (typeof module.init === "function") {
            const initOverrides = componentRegistry.getOptionOverrides(gitSpec.name)
            const options = { ...manifest?.defaultOptions, ...entry.options, ...initOverrides }
            await module.init(Object.keys(options).length > 0 ? options : undefined)
          }
        } catch (e) {
          // Side-effect import failed — continue with manifest-based loading
        }
        if (manifest?.components && Object.keys(manifest.components).length > 0) {
          await loadComponentsFromPackage(gitSpec.name, manifest)
        }
        if (manifest?.frames && Object.keys(manifest.frames).length > 0) {
          await loadFramesFromPackage(gitSpec.name, manifest)
        }
      } else {
        const entryPoint = getPluginEntryPoint(gitSpec.name)
        try {
          const module = await import(toFileUrl(entryPoint))
          const detected = detectCategoryFromModule(module)
          if (detected) {
            categoryMap[detected].push({ entry, manifest })
          } else if (manifest?.components && Object.keys(manifest.components).length > 0) {
            await loadComponentsFromPackage(gitSpec.name, manifest)
            if (manifest?.frames && Object.keys(manifest.frames).length > 0) {
              await loadFramesFromPackage(gitSpec.name, manifest)
            }
          } else {
            console.warn(
              styleText("yellow", `⚠`) +
                ` Could not determine category for plugin "${extractPluginName(entry.source)}". Skipping.`,
            )
          }
        } catch {
          const hasComponents = manifest?.components && Object.keys(manifest.components).length > 0
          const hasFrames = manifest?.frames && Object.keys(manifest.frames).length > 0
          if (hasComponents) {
            await loadComponentsFromPackage(gitSpec.name, manifest)
          }
          if (hasFrames) {
            await loadFramesFromPackage(gitSpec.name, manifest)
          }
          if (!hasComponents && !hasFrames) {
            console.warn(
              styleText("yellow", `⚠`) +
                ` Could not load plugin "${extractPluginName(entry.source)}" to detect category. Skipping.`,
            )
          }
        }
      }
    }
  }

  // Sort by order within each category
  const sortByOrder = (
    a: { entry: PluginJsonEntry; manifest: PluginManifest | undefined },
    b: { entry: PluginJsonEntry; manifest: PluginManifest | undefined },
  ) => {
    const orderA = a.entry.order ?? a.manifest?.defaultOrder ?? 50
    const orderB = b.entry.order ?? b.manifest?.defaultOrder ?? 50
    return orderA - orderB
  }

  transformers.sort(sortByOrder)
  filters.sort(sortByOrder)
  emitters.sort(sortByOrder)
  pageTypes.sort(sortByOrder)

  // Instantiate plugins
  const instantiate = async (
    items: { entry: PluginJsonEntry; manifest: PluginManifest | undefined }[],
    expectedCategory: ProcessingCategory,
  ) => {
    const instances = []
    for (const { entry, manifest } of items) {
      try {
        const spec = parsePluginSource(entry.source)
        let module
        if (spec.npmPackage) {
          module = await import(spec.name)
        } else {
          const entryPoint = getPluginEntryPoint(spec.name)
          module = await import(toFileUrl(entryPoint))
        }
        const pluginName = spec.npmPackage ? spec.name : spec.name
        if (manifest?.components && Object.keys(manifest.components).length > 0) {
          await loadComponentsFromPackage(pluginName, manifest)
        }
        if (manifest?.frames && Object.keys(manifest.frames).length > 0) {
          await loadFramesFromPackage(pluginName, manifest)
        }

        const factory = findFactory(module, expectedCategory)
        if (!factory) {
          console.warn(
            styleText("yellow", `⚠`) +
              ` Plugin "${extractPluginName(entry.source)}" has no factory function for category "${expectedCategory}". ` +
              `Ensure your plugin exports a default function, a "plugin" named export, or a single exported function.`,
          )
          continue
        }
        const pluginOverrides = componentRegistry.getOptionOverrides(spec.name)
        const options = { ...manifest?.defaultOptions, ...entry.options, ...pluginOverrides }
        const instance = factory(Object.keys(options).length > 0 ? options : undefined)
        if (!instance || typeof instance !== "object") {
          console.warn(
            styleText("yellow", `⚠`) +
              ` Plugin "${extractPluginName(entry.source)}" factory did not return a valid plugin instance. Skipping.`,
          )
          continue
        }
        if (!validateCategory(instance, expectedCategory)) {
          console.warn(
            styleText("yellow", `⚠`) +
              ` Plugin "${extractPluginName(entry.source)}" declares category "${expectedCategory}" ` +
              `but its factory returned an instance missing the required methods. Skipping.`,
          )
          continue
        }
        instances.push(instance)
      } catch (err) {
        console.error(
          styleText("red", `✗`) +
            ` Failed to instantiate plugin "${extractPluginName(entry.source)}": ${err instanceof Error ? err.message : String(err)}`,
        )
      }
    }
    return instances
  }

  // Import built-in plugins
  const builtinPlugins = await import("../index")
  const builtinTransformers: unknown[] = []
  const builtinEmitters = [
    builtinPlugins.ComponentResources(),
    builtinPlugins.Assets(),
    builtinPlugins.Static(),
  ]
  const builtinPageTypes = [builtinPlugins.PageTypes.NotFoundPageType()]

  const plugins: PluginTypes = {
    transformers: [...builtinTransformers, ...(await instantiate(transformers, "transformer"))],
    filters: await instantiate(filters, "filter"),
    emitters: [...builtinEmitters, ...(await instantiate(emitters, "emitter"))],
    pageTypes: [...(await instantiate(pageTypes, "pageType")), ...builtinPageTypes],
  }

  // Load layout and add PageTypeDispatcher to emitters.
  // This must happen after plugin instantiation so the component registry is populated.
  const layout = await loadQuartzLayout()
  plugins.emitters.push(
    builtinPlugins.PageTypes.PageTypeDispatcher({
      defaults: layout.defaults,
      byPageType: layout.byPageType,
    }),
  )
  return {
    configuration,
    plugins,
  }
}

type ProcessingCategory = "transformer" | "filter" | "emitter" | "pageType"

/**
 * Validate that a plugin instance has the required methods for its declared category.
 * Called AFTER real instantiation — never used to probe/discover category.
 */
function validateCategory(
  instance: Record<string, unknown>,
  expected: ProcessingCategory,
): boolean {
  switch (expected) {
    case "pageType":
      return "match" in instance && "body" in instance && "layout" in instance
    case "emitter":
      return "emit" in instance
    case "filter":
      return "shouldPublish" in instance
    case "transformer":
      return (
        "textTransform" in instance ||
        "markdownPlugins" in instance ||
        "htmlPlugins" in instance ||
        "slugify" in instance
      )
  }
}

/**
 * Find the factory function from a plugin module by export convention.
 * Prefers `default` export, then `plugin` named export, then the sole exported function.
 * For multi-export modules with an expectedCategory, probes candidate functions to find
 * the one matching the category shape.
 */
function findFactory(
  module: Record<string, unknown>,
  expectedCategory?: ProcessingCategory,
): Function | null {
  if (typeof module.default === "function") {
    return module.default as Function
  }
  if (typeof module.plugin === "function") {
    return module.plugin as Function
  }

  const exportedFunctions = Object.entries(module).filter(
    ([key, value]) => typeof value === "function" && !key.startsWith("__"),
  )

  if (exportedFunctions.length === 1) {
    return exportedFunctions[0][1] as Function
  }

  // Multiple exports: probe candidates to find the one matching the expected category.
  // This is the only code path that calls factory() for discovery, and only when
  // there is no default/plugin export and multiple functions are exported.
  if (exportedFunctions.length > 1 && expectedCategory) {
    for (const [, fn] of exportedFunctions) {
      try {
        const instance = (fn as Function)()
        if (
          instance &&
          typeof instance === "object" &&
          validateCategory(instance, expectedCategory)
        ) {
          return fn as Function
        }
      } catch {
        // This export doesn't work without args — skip it
      }
    }
  }

  return null
}

function detectCategoryFromModule(module: unknown): ProcessingCategory | null {
  if (!module || typeof module !== "object") return null
  const mod = module as Record<string, unknown>

  // Prefer static category marker on the factory if available
  const factory = findFactory(mod as Record<string, unknown>)
  if (factory && "quartzCategory" in factory) {
    const cat = (factory as Record<string, unknown>).quartzCategory
    if (cat === "transformer" || cat === "filter" || cat === "emitter" || cat === "pageType") {
      return cat
    }
  }

  // Fallback: try instantiating with no args and inspect the result.
  // This may fail for plugins that do I/O or require options during construction.
  if (typeof factory === "function") {
    try {
      const instance = factory()
      if (instance && typeof instance === "object") {
        if ("match" in instance && "body" in instance && "layout" in instance) return "pageType"
        if ("emit" in instance) return "emitter"
        if ("shouldPublish" in instance) return "filter"
        if (
          "textTransform" in instance ||
          "markdownPlugins" in instance ||
          "htmlPlugins" in instance ||
          "slugify" in instance
        )
          return "transformer"
      }
    } catch {
      // Factory requires arguments or does I/O — cannot detect category by probing.
      // Plugin should declare category in package.json quartz.category field.
    }
  }

  return null
}

export async function loadQuartzLayout(layoutOverrides?: {
  defaults?: Partial<FullPageLayout>
  byPageType?: Record<string, Partial<FullPageLayout>>
}): Promise<{
  defaults: Partial<FullPageLayout>
  byPageType: Record<string, Partial<FullPageLayout>>
}> {
  const json = readPluginsJson()

  if (!json) {
    // Fallback: import old-style layout directly
    const oldLayout = await import("../../../quartz")
    return oldLayout.layout
  }

  const enabledWithLayout = json.plugins.filter((e) => e.enabled)
  const layoutConfig = json.layout ?? {}

  // Build default layout for all page types
  const defaultLayout = buildLayoutForEntries(enabledWithLayout, layoutConfig)

  // Build per-page-type overrides
  const byPageType: Record<string, Partial<FullPageLayout>> = {}
  if (layoutConfig.byPageType) {
    for (const [pageType, override] of Object.entries(layoutConfig.byPageType)) {
      let filteredEntries = enabledWithLayout

      // Apply exclusions
      if (override.exclude?.length) {
        filteredEntries = filteredEntries.filter((e) => {
          const name = extractPluginName(e.source)
          return !override.exclude!.includes(name)
        })
      }

      const ptLayout = buildLayoutForEntries(filteredEntries, layoutConfig)

      // Apply position overrides (empty array = clear position)
      if (override.positions) {
        for (const [pos, components] of Object.entries(override.positions)) {
          if (Array.isArray(components) && components.length === 0) {
            const key = pos as keyof Pick<
              FullPageLayout,
              "header" | "left" | "right" | "beforeBody" | "afterBody" | "footer"
            >
            if (key in ptLayout) {
              ;(ptLayout as Record<string, unknown>)[key] = []
            }
          }
        }
      }

      // Apply frame template override
      if (override.template) {
        ptLayout.frame = override.template
      }

      byPageType[pageType] = ptLayout
    }
  }

  const HeadModule = await import("../../components/Head")
  const head = HeadModule.default()

  // Apply structural defaults
  defaultLayout.head = head
  defaultLayout.header = defaultLayout.header ?? []
  defaultLayout.footer = defaultLayout.footer ?? []

  // Ensure all byPageType entries inherit structural slots
  for (const pageType of Object.keys(byPageType)) {
    const pt = byPageType[pageType]
    if (!pt.head) pt.head = head
    if (!pt.header) pt.header = defaultLayout.header
    if (!pt.footer) pt.footer = defaultLayout.footer
  }

  const mergedDefaults = { ...defaultLayout, ...layoutOverrides?.defaults }
  const mergedByPageType = { ...byPageType }
  if (layoutOverrides?.byPageType) {
    for (const [pageType, overrideLayout] of Object.entries(layoutOverrides.byPageType)) {
      mergedByPageType[pageType] = { ...mergedByPageType[pageType], ...overrideLayout }
    }
  }

  return { defaults: mergedDefaults, byPageType: mergedByPageType }
}

/** @internal Exported for testing only. */
export function buildLayoutForEntries(
  entries: PluginJsonEntry[],
  layoutConfig: LayoutConfig,
): Partial<FullPageLayout> {
  const positions: Record<
    string,
    {
      component: QuartzComponent
      priority: number
      group?: string
      groupOptions?: PluginLayoutDeclaration["groupOptions"]
    }[]
  > = {
    header: [],
    left: [],
    right: [],
    beforeBody: [],
    afterBody: [],
    footer: [],
  }

  for (const entry of entries) {
    if (!entry.layout) continue

    const layout = entry.layout
    const name = extractPluginName(entry.source)

    // Look up component from registry
    const registered =
      componentRegistry.get(name) ??
      componentRegistry.get(`${formatSourceDisplay(entry.source)}/${name}`)
    if (!registered) {
      // Try common naming patterns
      const pascalName = name
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("")
      const altRegistered = componentRegistry.get(pascalName)
      if (!altRegistered) continue
    }

    const reg =
      registered ??
      componentRegistry.get(
        name
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(""),
      )
    if (!reg) continue

    let component: QuartzComponent
    if (typeof reg.component === "function" && !("displayName" in reg.component)) {
      // It's a constructor — use registry cache to avoid duplicate instances
      // (and duplicate afterDOMLoaded scripts) across page-type layouts
      const tsOverrides = componentRegistry.getOptionOverrides(name)
      const opts = { ...entry.options, ...tsOverrides }
      const optsArg = Object.keys(opts).length > 0 ? opts : undefined
      component = componentRegistry.instantiate(
        reg.component as QuartzComponentConstructor,
        optsArg,
      )
    } else {
      component = reg.component as QuartzComponent
    }

    // Apply display modifier
    if (layout.display && layout.display !== "all") {
      component = applyDisplayWrapper(component, layout.display)
    }

    // Apply condition
    if (layout.condition) {
      component = applyConditionWrapper(component, layout.condition)
    }

    const posArray = positions[layout.position]
    if (posArray) {
      posArray.push({
        component,
        priority: layout.priority,
        group: layout.group,
        groupOptions: layout.groupOptions,
      })
    }
  }

  for (const entry of entries) {
    if (!entry.enabled || entry.layout) continue

    const name = extractPluginName(entry.source)
    const registered =
      componentRegistry.get(name) ??
      componentRegistry.get(`${formatSourceDisplay(entry.source)}/${name}`)
    const pascalName = name
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("")
    const reg = registered ?? componentRegistry.get(pascalName)
    if (!reg) continue

    const layoutDefaults = reg.manifest
    const defaultPosition = layoutDefaults?.defaultPosition
    if (!defaultPosition) continue

    const posArray = positions[defaultPosition]
    if (!posArray) {
      continue
    }

    let component: QuartzComponent
    if (typeof reg.component === "function" && !("displayName" in reg.component)) {
      const tsOverrides = componentRegistry.getOptionOverrides(name)
      const opts = { ...entry.options, ...tsOverrides }
      const optsArg = Object.keys(opts).length > 0 ? opts : undefined
      component = componentRegistry.instantiate(
        reg.component as QuartzComponentConstructor,
        optsArg,
      )
    } else {
      component = reg.component as QuartzComponent
    }

    posArray.push({
      component,
      priority: layoutDefaults?.defaultPriority ?? 50,
    })
  }

  // Sort by priority and resolve groups
  const result: Partial<FullPageLayout> = {}

  for (const [position, items] of Object.entries(positions)) {
    items.sort((a, b) => a.priority - b.priority)

    const resolved = resolveGroups(items, layoutConfig.groups ?? {})
    const key = position as keyof Pick<
      FullPageLayout,
      "header" | "left" | "right" | "beforeBody" | "afterBody" | "footer"
    >
    ;(result as Record<string, QuartzComponent[]>)[key] = resolved
  }

  return result
}

/** @internal Exported for testing only. */
export function resolveGroups(
  items: {
    component: QuartzComponent
    priority: number
    group?: string
    groupOptions?: PluginLayoutDeclaration["groupOptions"]
  }[],
  groups: Record<string, FlexGroupConfig>,
): QuartzComponent[] {
  // Collect grouped components and track the effective priority for each group.
  // Effective priority = explicit group config priority ?? first member's priority.
  const groupedComponents = new Map<
    string,
    { component: QuartzComponent; groupOptions?: PluginLayoutDeclaration["groupOptions"] }[]
  >()
  const groupPriority = new Map<string, number>()

  for (const item of items) {
    if (item.group) {
      if (!groupedComponents.has(item.group)) {
        groupedComponents.set(item.group, [])
        // Use explicit group priority from config if set, otherwise fall back to first member's priority
        const groupConfig = groups[item.group]
        groupPriority.set(item.group, groupConfig?.priority ?? item.priority)
      }
      const groupMembers = groupedComponents.get(item.group)
      if (groupMembers) {
        groupMembers.push({
          component: item.component,
          groupOptions: item.groupOptions,
        })
      }
    }
  }

  // Build a unified list of renderable entries (ungrouped components + flex groups),
  // each with a priority, so we can sort them together.
  type RenderEntry = { priority: number; component: QuartzComponent }
  const entries: RenderEntry[] = []
  const processedGroups = new Set<string>()

  for (const item of items) {
    if (item.group) {
      // Only emit the flex group once (on first encounter)
      if (processedGroups.has(item.group)) continue
      processedGroups.add(item.group)

      const members = groupedComponents.get(item.group)
      if (!members) continue
      const groupConfig = groups[item.group] ?? {}

      const flexComponents = members.map((m) => ({
        Component: m.component,
        grow: m.groupOptions?.grow,
        shrink: m.groupOptions?.shrink,
        basis: m.groupOptions?.basis,
        order: m.groupOptions?.order,
        align: m.groupOptions?.align,
        justify: m.groupOptions?.justify,
      }))

      const flexComponent = Flex({
        components: flexComponents,
        direction: groupConfig.direction ?? "row",
        wrap: groupConfig.wrap,
        gap: groupConfig.gap ?? "1rem",
      }) as QuartzComponent

      entries.push({ priority: groupPriority.get(item.group) ?? 50, component: flexComponent })
    } else {
      entries.push({ priority: item.priority, component: item.component })
    }
  }

  // Stable sort by priority (items already arrive sorted, so equal priorities preserve order)
  entries.sort((a, b) => a.priority - b.priority)

  return entries.map((e) => e.component)
}

function applyDisplayWrapper(
  component: QuartzComponent,
  display: "mobile-only" | "desktop-only",
): QuartzComponent {
  if (display === "mobile-only") {
    return MobileOnly(component) as QuartzComponent
  } else {
    return DesktopOnly(component) as QuartzComponent
  }
}

function applyConditionWrapper(component: QuartzComponent, conditionName: string): QuartzComponent {
  const predicate = getCondition(conditionName)
  if (!predicate) {
    console.warn(
      styleText("yellow", `⚠`) +
        ` Unknown condition "${conditionName}". Component will always render.`,
    )
    return component
  }

  return ConditionalRender({
    component,
    condition: predicate,
  }) as QuartzComponent
}

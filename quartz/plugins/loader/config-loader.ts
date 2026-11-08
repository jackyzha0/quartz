import fs from "fs"
import path from "path"
import YAML from "yaml"
import { styleText } from "util"
import { fileURLToPath } from "node:url"
import {
  QuartzConfig,
  GlobalConfiguration,
  FullPageLayout,
  SIDEBAR_MODES,
  SidebarMode,
  SidebarModes,
} from "../../cfg"
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
  LayoutPosition,
  PageTypeLayoutOverride,
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
import { attributeComponentExport, shortPluginName } from "../../components/attribution"
import { loadFramesFromPackage } from "./frameLoader"
import {
  validatePluginCapabilities,
  printCapabilityWarnings,
  parseCapabilities,
  CapabilityPlugin,
} from "./capabilities"
import { absorbingBuiltin, BuiltinPlan, instantiateBuiltins, planBuiltins } from "../builtins"
import { registerPluginOrigin, reportError, warn } from "../../util/diagnostics"
import { firstPluginFrame } from "../../util/trace"
import {
  checkQuartzRequirement,
  describeDeprecation,
  describeRequirementProblem,
  incompatiblePluginsFailBuild,
  brokenPluginsFailBuild,
  readQuartzVersion,
} from "../../cli/compat.js"
import { collectPluginConfigWarnings, printPluginConfigWarnings } from "./option-validation"
import { componentRegistry, RegisteredComponent } from "../../components/registry"
import { frameRegistry } from "../../components/frames/registry"
import { getCondition, getAllConditionNames } from "./conditions"
import {
  LAYOUT_SLOTS,
  LayoutDiagnostics,
  LayoutPlacement,
  LayoutReport,
  emptyLayoutReport,
  isLayoutSlot,
  printLayoutWarnings,
  setLayoutReport,
  suggest,
} from "./layoutReport"
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

/**
 * @internal Exported for testing only.
 * Also matches the bare name, since an npm source keeps its scope.
 */
export function isExcluded(source: PluginSource, exclude: string[]): boolean {
  const name = extractPluginName(source)
  return exclude.includes(name) || exclude.includes(name.slice(name.lastIndexOf("/") + 1))
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

/**
 * Import a plugin's entry module: npm plugins resolve from node_modules, git/local plugins from
 * .quartz/plugins/<name>. (Importing .quartz/plugins/<name> for npm plugins used to fail silently,
 * so their init(options) and entry-module side effects never ran.)
 */
async function importPluginModule(spec: ReturnType<typeof parsePluginSource>) {
  return spec.npmPackage
    ? await import(spec.name)
    : await import(toFileUrl(getPluginEntryPoint(spec.name)))
}

async function resolvePluginManifest(source: PluginSource): Promise<PluginManifest | null> {
  try {
    const module = await importPluginModule(parsePluginSource(source))
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
      // the package version is the real one; quartz.version is often a stale copy
      version: pkg.version ?? q.version ?? "1.0.0",
      author: q.author ?? pkg.author,
      homepage: q.homepage ?? pkg.homepage,
      issues: issuesUrl(pkg),
      category: q.category,
      quartzVersion: q.quartzVersion,
      deprecated: q.deprecated,
      dependencies: q.dependencies,
      capabilities: q.capabilities,
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

/** Where to report bugs for a package: `bugs`, else its GitHub repository's issues page. */
function issuesUrl(pkg: {
  bugs?: string | { url?: string }
  repository?: string | { url?: string }
}): string | undefined {
  const bugs = typeof pkg.bugs === "string" ? pkg.bugs : pkg.bugs?.url
  if (bugs) return bugs
  const repo = typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url
  const match =
    repo?.match(/github\.com[/:]([^/]+\/[^/#.]+)/) ?? repo?.match(/^github:([^/]+\/[^/#]+)/)
  return match ? `https://github.com/${match[1].replace(/\.git$/, "")}/issues` : undefined
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

  // Entries of official plugins that are now built into core (crawl-links, remove-draft,
  // content-index) are handled by the built-ins below and never installed or loaded.
  const pluginEntries = json.plugins.filter((e) => !absorbingBuiltin(e))
  const enabledEntries = pluginEntries.filter((e) => e.enabled)
  const manifests = new Map<string, PluginManifest>()

  // Ensure all plugins are installed and collect native deps
  // Plugins that could not be installed, imported or instantiated. The build continues without
  // them locally (so the rest of the site can be checked) and fails in CI (brokenPluginsFailBuild).
  const loadFailures: string[] = []
  const pluginLoadFailed = (
    entry: PluginJsonEntry,
    manifest: PluginManifest | undefined,
    what: string,
    err?: unknown,
  ) => {
    const name = manifest?.name ?? extractPluginName(entry.source)
    const label = manifest?.version ? `${name}@${manifest.version}` : name
    const detail = err === undefined ? "" : `: ${err instanceof Error ? err.message : String(err)}`
    const frame = firstPluginFrame(err)
    reportError({
      area: "plugins",
      plugin: name,
      message: `${label} ${what}${detail}`,
      hint: [
        frame && `at ${frame}`,
        `source: ${formatSourceDisplay(entry.source)}`,
        `Try \`npx quartz plugin doctor\`, update or disable it (\`npx quartz plugin disable ${name}\`); ` +
          `report it${manifest?.issues ? ` at ${manifest.issues}` : " to the plugin's author"} with the output of \`npx quartz info\`.`,
      ]
        .filter(Boolean)
        .join("\n"),
    })
    if (!loadFailures.includes(name)) loadFailures.push(name)
  }

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
      pluginLoadFailed(entry, undefined, "could not be installed", err)
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
      pluginLoadFailed(entry, undefined, "has an unreadable manifest (package.json → quartz)", err)
    }
  }

  // Quartz version requirements (package.json → quartz.quartzVersion), see cli/compat.js
  // Locally a mismatch only warns; in CI it fails the build (incompatiblePluginsFailBuild).
  const quartzVersion = readQuartzVersion()
  const incompatible: string[] = []
  for (const entry of enabledEntries) {
    const manifest = manifests.get(sourceKey(entry.source))
    if (!manifest) continue
    const name = manifest.name ?? extractPluginName(entry.source)
    const requirement = checkQuartzRequirement(manifest.quartzVersion, quartzVersion)
    const problem = describeRequirementProblem(name, requirement, manifest.version)
    if (problem) warn({ area: "versions", plugin: name, ...problem })
    if (requirement.status === "incompatible") incompatible.push(name)
    const deprecation = describeDeprecation(name, manifest.deprecated)
    if (deprecation) warn({ area: "plugins", plugin: name, ...deprecation })
  }
  // The quiet install-plugins prebuild pass doesn't print, so the real build reports the failure.
  if (
    incompatible.length > 0 &&
    incompatiblePluginsFailBuild() &&
    process.env.QUARTZ_CONFIG_QUIET !== "1"
  ) {
    throw new Error(
      `${incompatible.length} enabled plugin${incompatible.length === 1 ? " does" : "s do"} not support Quartz ${quartzVersion}: ${incompatible.join(", ")} (see above). ` +
        `Builds in CI fail on this; locally it is a warning. Set QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS=1 to build anyway.`,
    )
  }

  // Decide which built-ins (frontmatter, links, drafts, content index) run — see builtins/index.ts
  const builtinPlan = planBuiltins({
    configuration,
    entries: json.plugins,
    nameOf: (entry) =>
      manifests.get(sourceKey(entry.source))?.name ?? extractPluginName(entry.source),
    providesOf: (entry) =>
      parseCapabilities(manifests.get(sourceKey(entry.source))?.capabilities, "").capabilities
        ?.provides,
  })
  activeBuiltinPlan = builtinPlan
  printBuiltinNotices(builtinPlan)
  // Expose the effective settings (incl. options migrated from old plugin entries) as
  // ctx.cfg.configuration.<key>, so plugins and emitters can read e.g. links.markdownLinkResolution.
  for (const b of builtinPlan.builtins) {
    ;(configuration as unknown as Record<string, unknown>)[b.spec.configKey] = {
      ...b.options,
      enabled: b.enabled,
      order: b.order,
    }
  }

  // Validate declared capabilities (quartz.capabilities, opt-in, warnings only — see capabilities.ts)
  const capabilityReport = await validatePluginCapabilities({
    entries: pluginEntries,
    nameOf: (entry) => extractPluginName(entry.source),
    manifestFor: (entry) => manifests.get(sourceKey(entry.source)) ?? getManifest(entry.source),
    configuration,
    builtins: builtinCapabilityPlugins(builtinPlan),
  })
  printCapabilityWarnings(capabilityReport)

  // Warn about likely typos in plugin entries/options (warnings only — see option-validation.ts)
  printPluginConfigWarnings(
    collectPluginConfigWarnings(
      pluginEntries,
      (entry) => manifests.get(sourceKey(entry.source)),
      (entry) => extractPluginName(entry.source),
    ),
  )

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

      if (categories.length > 0 || manifest?.components) {
        registerPluginOrigin(
          {},
          {
            name: manifest?.name ?? extractPluginName(entry.source),
            displayName: manifest?.name ?? extractPluginName(entry.source),
            source: formatSourceDisplay(entry.source),
            version: manifest?.version,
            category: "component",
            issues: manifest?.issues,
            quartzVersion: manifest?.quartzVersion,
          },
        )
      }
      if (isComponentOnly) {
        // Always import the main entry point for component-only plugins.
        // Some plugins (e.g. Bases view registrations) rely on side effects
        // in their index module to register functionality.
        try {
          const module = await importPluginModule(gitSpec)
          // If the module exports an init() function, call it with merged options
          // so component-only plugins can receive user configuration from YAML.
          if (typeof module.init === "function") {
            const initOverrides = componentRegistry.getOptionOverrides(gitSpec.name)
            const options = { ...manifest?.defaultOptions, ...entry.options, ...initOverrides }
            await module.init(Object.keys(options).length > 0 ? options : undefined)
          }
        } catch (err) {
          // Components listed in the manifest are still loaded below, but whatever the entry
          // module registers or initialises (Bases views, init(options) …) is missing.
          pluginLoadFailed(entry, manifest, "failed to load its entry module", err)
        }
        if (manifest?.components && Object.keys(manifest.components).length > 0) {
          await loadComponentsFromPackage(gitSpec.name, manifest)
        }
        if (manifest?.frames && Object.keys(manifest.frames).length > 0) {
          await loadFramesFromPackage(gitSpec.name, manifest)
        }
      } else {
        try {
          const module = await importPluginModule(gitSpec)
          const detected = detectCategoryFromModule(module)
          if (detected) {
            categoryMap[detected].push({ entry, manifest })
          } else if (manifest?.components && Object.keys(manifest.components).length > 0) {
            await loadComponentsFromPackage(gitSpec.name, manifest)
            if (manifest?.frames && Object.keys(manifest.frames).length > 0) {
              await loadFramesFromPackage(gitSpec.name, manifest)
            }
          } else {
            pluginLoadFailed(
              entry,
              manifest,
              "was skipped: its category could not be determined (set quartz.category in its package.json)",
            )
          }
        } catch (err) {
          const hasComponents = manifest?.components && Object.keys(manifest.components).length > 0
          const hasFrames = manifest?.frames && Object.keys(manifest.frames).length > 0
          if (hasComponents) {
            await loadComponentsFromPackage(gitSpec.name, manifest)
          }
          if (hasFrames) {
            await loadFramesFromPackage(gitSpec.name, manifest)
          }
          pluginLoadFailed(
            entry,
            manifest,
            hasComponents || hasFrames
              ? "failed to load its entry module (only its components/frames were loaded)"
              : "was skipped: its entry module failed to load",
            err,
          )
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
    const instances: { order: number; instance: any }[] = []
    for (const { entry, manifest } of items) {
      try {
        const spec = parsePluginSource(entry.source)
        const module = await importPluginModule(spec)
        const pluginName = spec.name
        if (manifest?.components && Object.keys(manifest.components).length > 0) {
          await loadComponentsFromPackage(pluginName, manifest)
        }
        if (manifest?.frames && Object.keys(manifest.frames).length > 0) {
          await loadFramesFromPackage(pluginName, manifest)
        }

        const factory = findFactory(module, expectedCategory)
        if (!factory) {
          pluginLoadFailed(
            entry,
            manifest,
            `was skipped: no ${expectedCategory} factory found (export a default function, a "plugin" named export, or a single function)`,
          )
          continue
        }
        const pluginOverrides = componentRegistry.getOptionOverrides(spec.name)
        const options = { ...manifest?.defaultOptions, ...entry.options, ...pluginOverrides }
        const instance = factory(Object.keys(options).length > 0 ? options : undefined)
        if (!instance || typeof instance !== "object") {
          pluginLoadFailed(
            entry,
            manifest,
            "was skipped: its factory did not return a plugin instance",
          )
          continue
        }
        if (!validateCategory(instance, expectedCategory)) {
          pluginLoadFailed(
            entry,
            manifest,
            `was skipped: it declares category "${expectedCategory}" but its instance lacks the required methods`,
          )
          continue
        }
        // Page-type bodies (e.g. the content page article) get the same
        // data-quartz-plugin / data-quartz-component attribution as layout components.
        if (expectedCategory === "pageType" && typeof instance.body === "function") {
          instance.body = attributeComponentExport(instance.body, {
            plugin: shortPluginName(extractPluginName(entry.source)),
            component: typeof instance.name === "string" ? instance.name : "Body",
          })
        }
        registerPluginOrigin(instance, {
          name: typeof instance.name === "string" ? instance.name : extractPluginName(entry.source),
          displayName: manifest?.name ?? extractPluginName(entry.source),
          source: formatSourceDisplay(entry.source),
          version: manifest?.version,
          category: expectedCategory,
          issues: manifest?.issues,
          quartzVersion: manifest?.quartzVersion,
        })
        instances.push({ order: entry.order ?? manifest?.defaultOrder ?? 50, instance })
      } catch (err) {
        pluginLoadFailed(entry, manifest, "was skipped: it failed to initialise", err)
      }
    }
    return instances
  }

  // Import built-in plugins
  const builtinPlugins = await import("../index")
  const builtinEmitters = [
    builtinPlugins.ComponentResources(),
    builtinPlugins.Assets(),
    builtinPlugins.Static(),
  ]
  const builtinPageTypes = [builtinPlugins.PageTypes.NotFoundPageType()]

  // Built-in processing steps take their place in plugin order (frontmatter at 0, links at 60 …);
  // on equal order a built-in runs before plugins (stable sort, built-ins listed first).
  const withBuiltins = <T>(
    builtins: { order: number; instance: unknown }[],
    instances: { order: number; instance: T }[],
  ): T[] =>
    [...builtins, ...instances]
      .map((item, index) => ({ ...item, index }))
      .sort((a, b) => a.order - b.order || a.index - b.index)
      .map((item) => item.instance as T)

  const plugins: PluginTypes = {
    transformers: withBuiltins(
      instantiateBuiltins(builtinPlan, "transformer"),
      await instantiate(transformers, "transformer"),
    ),
    filters: withBuiltins(
      instantiateBuiltins(builtinPlan, "filter"),
      await instantiate(filters, "filter"),
    ),
    emitters: [
      ...builtinEmitters,
      ...withBuiltins(
        instantiateBuiltins(builtinPlan, "emitter"),
        await instantiate(emitters, "emitter"),
      ),
    ],
    pageTypes: [
      ...(await instantiate(pageTypes, "pageType")).map((item) => item.instance),
      ...builtinPageTypes,
    ],
  }

  // Load layout and add PageTypeDispatcher to emitters.
  // This must happen after plugin instantiation so the component registry is populated.
  const layout = await loadQuartzLayout()
  activeLayout = layout
  plugins.emitters.push(
    builtinPlugins.PageTypes.PageTypeDispatcher({
      defaults: layout.defaults,
      byPageType: layout.byPageType,
    }),
  )
  if (
    loadFailures.length > 0 &&
    brokenPluginsFailBuild() &&
    process.env.QUARTZ_CONFIG_QUIET !== "1"
  ) {
    throw new Error(
      `${loadFailures.length} enabled plugin${loadFailures.length === 1 ? "" : "s"} could not be loaded: ${loadFailures.join(", ")} (see above). ` +
        `Builds in CI fail on this; locally the build continues without them. Set QUARTZ_ALLOW_BROKEN_PLUGINS=1 to build anyway.`,
    )
  }
  return {
    configuration,
    plugins,
  }
}

type ProcessingCategory = "transformer" | "filter" | "emitter" | "pageType"

let activeBuiltinPlan: BuiltinPlan | undefined

/** The built-in plan of the last loaded config (for `quartz build --verbose`, doctor, tests). */
export function getBuiltinPlan(): BuiltinPlan | undefined {
  return activeBuiltinPlan
}

// Process-wide: the config loader can be loaded as several module copies (CLI + bundled build).
const printedBuiltinNotices: Set<string> = ((globalThis as Record<symbol, unknown>)[
  Symbol.for("quartz.printedBuiltinNotices")
] ??= new Set<string>()) as Set<string>
function printBuiltinNotices(plan: BuiltinPlan): void {
  for (const notice of plan.notices) {
    if (printedBuiltinNotices.has(notice)) continue
    printedBuiltinNotices.add(notice)
    warn({ area: "config", message: notice })
  }
}

/** Built-ins as capability providers: enabled ones provide, disabled ones are suggested. */
function builtinCapabilityPlugins(plan: BuiltinPlan): {
  enabled: CapabilityPlugin[]
  available: CapabilityPlugin[]
} {
  const enabled: CapabilityPlugin[] = []
  const available: CapabilityPlugin[] = []
  for (const b of plan.builtins) {
    const plugin: CapabilityPlugin = {
      name: b.enabled ? `built-in ${b.spec.id}` : `configuration.${b.spec.configKey}`,
      aliases: [...b.spec.absorbs, `quartz:${b.spec.id}`],
      capabilities: b.spec.capabilities,
    }
    ;(b.enabled ? enabled : available).push(plugin)
  }
  return { enabled, available }
}

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
        "textTransform" in instance || "markdownPlugins" in instance || "htmlPlugins" in instance
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
          "htmlPlugins" in instance
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

export interface LayoutOverrides {
  defaults?: Partial<FullPageLayout>
  byPageType?: Record<string, Partial<FullPageLayout>>
}

export interface QuartzLayout {
  defaults: Partial<FullPageLayout>
  byPageType: Record<string, Partial<FullPageLayout>>
}

/**
 * The layout object handed to the PageTypeDispatcher by loadQuartzConfig().
 * A later `loadQuartzLayout(overrides)` call from quartz.ts updates it in place,
 * so TypeScript layout overrides actually reach the renderer.
 */
let activeLayout: QuartzLayout | undefined

function replaceContents(target: object, source: object): void {
  const t = target as Record<string, unknown>
  for (const key of Object.keys(t)) delete t[key]
  Object.assign(t, source)
}

const BUILTIN_FRAME_NAMES = ["default", "full-width", "minimal"]

/**
 * Names a plugin may be referred to by in layout config (e.g. byPageType
 * `exclude`): the name derived from its source and, for scoped npm specifiers
 * ("@quartz-community/reader-mode"), the bare package name ("reader-mode").
 */
function layoutNameAliases(pluginName: string): string[] {
  const slash = pluginName.indexOf("/")
  if (pluginName.startsWith("@") && slash > 0) {
    return [pluginName, pluginName.slice(slash + 1)]
  }
  return [pluginName]
}
const PAGE_TYPE_OVERRIDE_KEYS = ["exclude", "positions", "template", "sidebars"]

/** @internal Exported for testing. Read `layout.sidebars` (or a page type's override): `{ left?, right? }` of fit | scroll | static. */
export function parseSidebars(
  raw: unknown,
  where: string,
  warn: (message: string) => void,
): SidebarModes {
  if (raw === undefined || raw === null) return {}
  if (typeof raw !== "object" || Array.isArray(raw)) {
    warn(`${where}: expected { left, right } with fit, scroll or static — ignored.`)
    return {}
  }
  const modes: SidebarModes = {}
  for (const [side, value] of Object.entries(raw as Record<string, unknown>)) {
    if (side !== "left" && side !== "right") {
      warn(`${where}: unknown sidebar "${side}" — use left or right.`)
      continue
    }
    if (!SIDEBAR_MODES.includes(value as SidebarMode)) {
      const hint = suggest(String(value), [...SIDEBAR_MODES])
      warn(
        `${where}.${side}: unknown mode ${JSON.stringify(value)}${hint ? ` (did you mean "${hint}"?)` : ""} — using fit. Modes: ${SIDEBAR_MODES.join(", ")}.`,
      )
      continue
    }
    modes[side] = value as SidebarMode
  }
  return modes
}

/**
 * Build the layout (defaults + per-page-type overrides) from a parsed
 * quartz.config.yaml. Pure apart from the component registry lookups.
 *
 * Precedence per slot, highest first: quartz.ts `byPageType` override →
 * YAML `layout.byPageType` changes (exclude / cleared positions) → quartz.ts
 * `defaults` override → layout built from plugin `layout:` blocks.
 *
 * @internal Exported for testing only.
 */
export function buildQuartzLayout(
  json: QuartzPluginsJson,
  head: QuartzComponent,
  layoutOverrides?: LayoutOverrides,
): { layout: QuartzLayout; report: LayoutReport } {
  const report = emptyLayoutReport()
  const warn = (w: string) => {
    if (!report.warnings.includes(w)) report.warnings.push(w)
  }

  const allEntries = Array.isArray(json.plugins) ? json.plugins : []
  const enabledEntries = allEntries.filter((e) => e.enabled)
  const layoutConfig = json.layout ?? {}

  // Build default layout for all page types
  const defaultDiag = new LayoutDiagnostics()
  const defaultLayout = buildLayoutForEntries(enabledEntries, layoutConfig, defaultDiag)
  report.defaults = defaultDiag.placements
  defaultDiag.warnings.forEach(warn)
  const defaultSidebars = parseSidebars(layoutConfig.sidebars, "layout.sidebars", warn)
  if (Object.keys(defaultSidebars).length > 0) defaultLayout.sidebars = defaultSidebars

  const knownPluginNames = allEntries.flatMap((e) => layoutNameAliases(extractPluginName(e.source)))
  const enabledPluginNames = new Set(
    enabledEntries.flatMap((e) => layoutNameAliases(extractPluginName(e.source))),
  )
  const excludedBy = (exclude: string[], pluginName: string) =>
    layoutNameAliases(pluginName).some((alias) => exclude.includes(alias))

  // Build per-page-type overrides. Only slots that actually differ from the
  // defaults are stored, so unchanged slots fall back to the (possibly
  // TS-overridden) defaults in resolveLayout().
  const byPageType: Record<string, Partial<FullPageLayout>> = {}
  for (const [pageType, rawOverride] of Object.entries(layoutConfig.byPageType ?? {})) {
    const override = (rawOverride ?? {}) as PageTypeLayoutOverride
    for (const key of Object.keys(override)) {
      if (!PAGE_TYPE_OVERRIDE_KEYS.includes(key)) {
        const hint = suggest(key, PAGE_TYPE_OVERRIDE_KEYS)
        warn(
          `byPageType.${pageType}: unknown key "${key}"${hint ? ` (did you mean "${hint}"?)` : ""} — ignored. Supported: ${PAGE_TYPE_OVERRIDE_KEYS.join(", ")}.`,
        )
      }
    }

    const exclude = Array.isArray(override.exclude) ? override.exclude : []
    for (const name of exclude) {
      if (!knownPluginNames.includes(name)) {
        const hint = suggest(name, knownPluginNames)
        warn(
          `byPageType.${pageType}.exclude: no plugin named "${name}"${hint ? ` (did you mean "${hint}"?)` : ""} — nothing excluded.`,
        )
      }
    }
    const filteredEntries = enabledEntries.filter(
      (e) => !excludedBy(exclude, extractPluginName(e.source)),
    )

    const ptDiag = new LayoutDiagnostics()
    const ptLayout = buildLayoutForEntries(filteredEntries, layoutConfig, ptDiag)
    ptDiag.warnings.forEach(warn)

    const customized = new Set<LayoutPosition>()
    for (const p of report.defaults) {
      if (excludedBy(exclude, p.plugin)) customized.add(p.slot)
    }

    // Position overrides: only `[]` (clear the slot) is supported
    const cleared: LayoutPosition[] = []
    for (const [pos, components] of Object.entries(override.positions ?? {})) {
      if (!isLayoutSlot(pos)) {
        const hint = suggest(pos, LAYOUT_SLOTS)
        warn(
          `byPageType.${pageType}.positions: unknown position "${pos}"${hint ? ` (did you mean "${hint}"?)` : ""} — ignored. Valid positions: ${LAYOUT_SLOTS.join(", ")}.`,
        )
        continue
      }
      if (Array.isArray(components) && components.length === 0) {
        ;(ptLayout as Record<string, unknown>)[pos] = []
        cleared.push(pos)
        customized.add(pos)
      } else {
        warn(
          `byPageType.${pageType}.positions.${pos}: only an empty list ([]) is supported (clears the slot) — ignored. To move a component on this page type, use exclude plus the plugin's layout block.`,
        )
      }
    }

    const entry: Partial<FullPageLayout> = {}
    for (const slot of customized) {
      ;(entry as Record<string, unknown>)[slot] = (ptLayout as Record<string, unknown>)[slot]
    }

    if (override.template) {
      if (
        !BUILTIN_FRAME_NAMES.includes(override.template) &&
        !frameRegistry.has(override.template)
      ) {
        const available = [...BUILTIN_FRAME_NAMES, ...frameRegistry.getAll().keys()]
        warn(
          `byPageType.${pageType}.template: unknown frame "${override.template}" — pages will use "default". Available: ${available.join(", ")}.`,
        )
      }
      entry.frame = override.template
    }

    if (override.sidebars !== undefined) {
      entry.sidebars = {
        ...defaultSidebars,
        ...parseSidebars(override.sidebars, `byPageType.${pageType}.sidebars`, warn),
      }
    }

    byPageType[pageType] = entry
    report.byPageType[pageType] = {
      exclude: exclude.filter((n) => enabledPluginNames.has(n)),
      cleared,
      template: override.template,
      customizedSlots: LAYOUT_SLOTS.filter((s) => customized.has(s)),
      placements: ptDiag.placements.filter((p) => !cleared.includes(p.slot)),
    }
  }

  // Apply structural defaults
  defaultLayout.head = head
  defaultLayout.header = defaultLayout.header ?? []
  defaultLayout.footer = defaultLayout.footer ?? []

  const tsDefaults = layoutOverrides?.defaults ?? {}
  report.tsOverrides.defaults = Object.keys(tsDefaults)
  const mergedDefaults = { ...defaultLayout, ...tsDefaults }
  const mergedByPageType = { ...byPageType }
  for (const [pageType, overrideLayout] of Object.entries(layoutOverrides?.byPageType ?? {})) {
    mergedByPageType[pageType] = { ...mergedByPageType[pageType], ...overrideLayout }
    report.tsOverrides.byPageType[pageType] = Object.keys(overrideLayout ?? {})
  }

  return { layout: { defaults: mergedDefaults, byPageType: mergedByPageType }, report }
}

/**
 * Build the page layout from quartz.config.yaml.
 *
 * Called by loadQuartzConfig() (which wires the result into the page renderer)
 * and optionally from quartz.ts with TypeScript `layoutOverrides`; in that case
 * the renderer's layout is updated in place with the overrides applied.
 */
export async function loadQuartzLayout(layoutOverrides?: LayoutOverrides): Promise<QuartzLayout> {
  const json = readPluginsJson()

  if (!json) {
    // Fallback: import old-style layout directly
    const oldLayout = await import("../../../quartz")
    return oldLayout.layout
  }

  const HeadModule = await import("../../components/Head")
  const head = HeadModule.default()

  const { layout, report } = buildQuartzLayout(json, head, layoutOverrides)
  setLayoutReport(report)
  printLayoutWarnings(report.warnings)

  if (layoutOverrides && activeLayout) {
    replaceContents(activeLayout.defaults, layout.defaults)
    replaceContents(activeLayout.byPageType, layout.byPageType)
    return activeLayout
  }
  return layout
}

type SlotItem = {
  component: QuartzComponent
  priority: number
  group?: string
  groupOptions?: PluginLayoutDeclaration["groupOptions"]
  placement: LayoutPlacement
  rank: number
  seq: number
}

function lookupRegisteredComponent(entry: PluginJsonEntry): RegisteredComponent | undefined {
  const name = extractPluginName(entry.source)
  const pascalName = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("")
  return (
    componentRegistry.get(name) ??
    componentRegistry.get(`${formatSourceDisplay(entry.source)}/${name}`) ??
    componentRegistry.get(pascalName)
  )
}

function instantiateRegistered(
  reg: RegisteredComponent,
  name: string,
  entry: PluginJsonEntry,
): QuartzComponent {
  if (typeof reg.component === "function" && !("displayName" in reg.component)) {
    // It's a constructor — use registry cache to avoid duplicate instances
    // (and duplicate afterDOMLoaded scripts) across page-type layouts
    const tsOverrides = componentRegistry.getOptionOverrides(name)
    const opts = { ...entry.options, ...tsOverrides }
    const optsArg = Object.keys(opts).length > 0 ? opts : undefined
    return componentRegistry.instantiate(reg.component as QuartzComponentConstructor, optsArg)
  }
  return reg.component as QuartzComponent
}

/**
 * Place every enabled component plugin into its layout slot.
 *
 * Position/priority come from the entry's `layout:` block, falling back to
 * the plugin manifest's `defaultPosition` / `defaultPriority` (so a layout
 * block may set only e.g. `condition` or `display`). Problems (unknown
 * positions, display modes or conditions, unregistered components, duplicate
 * entries) are reported to `diag` instead of being silently dropped.
 *
 * Within a slot, components sort by priority; ties keep config order, with
 * explicit `layout:` entries before plugins placed by their manifest default.
 *
 * @internal Exported for testing only.
 */
export function buildLayoutForEntries(
  entries: PluginJsonEntry[],
  layoutConfig: LayoutConfig,
  diag: LayoutDiagnostics = new LayoutDiagnostics(),
): Partial<FullPageLayout> {
  const positions: Record<LayoutPosition, SlotItem[]> = {
    header: [],
    left: [],
    right: [],
    beforeBody: [],
    afterBody: [],
    footer: [],
  }

  const placedPlugins = new Set<string>()
  let seq = 0

  for (const entry of entries) {
    if (!entry.enabled) continue

    const name = extractPluginName(entry.source)
    const layout = (entry.layout ?? undefined) as Partial<PluginLayoutDeclaration> | undefined
    const reg = lookupRegisteredComponent(entry)
    if (!reg) {
      if (layout) {
        diag.warn(
          `plugin "${name}" has a layout block but no component is registered for it — not placed. (Does the plugin provide a component, and did it load?)`,
        )
      }
      continue
    }

    const manifest = reg.manifest
    const fromConfig = layout?.position !== undefined && layout?.position !== null
    const position = fromConfig ? layout!.position : manifest?.defaultPosition
    if (position === undefined || position === null) {
      if (layout) {
        diag.warn(
          `plugin "${name}": layout block has no position and the plugin declares no defaultPosition — not placed. Add layout.position (${LAYOUT_SLOTS.join(", ")}).`,
        )
      }
      continue
    }
    if (!isLayoutSlot(position)) {
      const hint = suggest(String(position), LAYOUT_SLOTS)
      diag.warn(
        fromConfig
          ? `plugin "${name}": unknown layout position "${position}"${hint ? ` (did you mean "${hint}"?)` : ""} — not placed. Valid positions: ${LAYOUT_SLOTS.join(", ")}.`
          : `plugin "${name}" declares unsupported defaultPosition "${position}" — not placed. Set layout.position in quartz.config.yaml to show it.`,
      )
      continue
    }

    let priority = layout?.priority ?? manifest?.defaultPriority ?? 50
    if (typeof priority !== "number" || Number.isNaN(priority)) {
      diag.warn(`plugin "${name}": layout priority "${priority}" is not a number — using 50.`)
      priority = 50
    }

    if (placedPlugins.has(name)) {
      diag.warn(
        `plugin "${name}" is listed more than once in quartz.config.yaml — its component is rendered once per entry.`,
      )
    }
    placedPlugins.add(name)

    let component = instantiateRegistered(reg, name, entry)
    const placement: LayoutPlacement = {
      plugin: name,
      component: component.displayName ?? reg.manifest?.displayName,
      slot: position,
      priority,
      origin: layout ? "config" : "manifest",
    }

    // Apply display modifier
    const display = layout?.display
    if (display === "mobile-only" || display === "desktop-only") {
      component = applyDisplayWrapper(component, display)
      placement.display = display
    } else if (display !== undefined && display !== null && display !== "all") {
      diag.warn(
        `plugin "${name}": unknown display "${display}" — ignored (shown everywhere). Valid: all, mobile-only, desktop-only.`,
      )
    }

    // Apply condition
    if (layout?.condition) {
      placement.condition = layout.condition
      const wrapped = applyConditionWrapper(component, layout.condition)
      if (wrapped === component) {
        placement.conditionUnknown = true
        const known = getAllConditionNames()
        const hint = suggest(layout.condition, known)
        diag.warn(
          `plugin "${name}": unknown condition "${layout.condition}"${hint ? ` (did you mean "${hint}"?)` : ""} — component will always render. Known conditions: ${known.join(", ")}.`,
        )
      }
      component = wrapped
    }

    if (layout?.group) placement.group = layout.group

    positions[position].push({
      component,
      priority,
      group: layout?.group,
      groupOptions: layout?.groupOptions,
      placement,
      rank: layout ? 0 : 1,
      seq: seq++,
    })
  }

  // Sort by priority and resolve groups
  const result: Partial<FullPageLayout> = {}

  for (const [position, items] of Object.entries(positions)) {
    items.sort((a, b) => a.priority - b.priority || a.rank - b.rank || a.seq - b.seq)
    for (const item of items) diag.place(item.placement)

    const resolved = resolveGroups(items, layoutConfig.groups ?? {})
    ;(result as Record<string, QuartzComponent[]>)[position] = resolved
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
  // Unknown conditions are reported by buildLayoutForEntries (deduplicated)
  if (!predicate) return component

  return ConditionalRender({
    component,
    condition: predicate,
  }) as QuartzComponent
}

import { styleText } from "util"
import { checkQuartzRequirement } from "../../cli/compat.js"
import {
  PluginManifest,
  PluginCategory,
  LoadedPlugin,
  PluginResolution,
  PluginResolutionError,
  PluginResolutionOptions,
  PluginSpecifier,
} from "./types"
import {
  QuartzTransformerPlugin,
  QuartzFilterPlugin,
  QuartzEmitterPlugin,
  QuartzPageTypePlugin,
} from "../types"
import {
  parsePluginSource,
  installPlugin,
  getPluginEntryPoint,
  toFileUrl,
  isLocalSource,
  validatePluginExternals,
} from "./gitLoader"

const MINIMUM_QUARTZ_VERSION = "4.5.0"

function satisfiesVersion(required: string | undefined, current: string): boolean {
  // Real semver ranges (">=5.1.0", "^5.0.0"); the old hand-rolled parser read ">=5" as 0.
  const result = checkQuartzRequirement(required, current)
  return result.status !== "incompatible"
}

async function tryImportPlugin(packageName: string): Promise<{
  module: unknown
  manifest: PluginManifest | null
}> {
  try {
    const module = await import(packageName)

    const manifest: PluginManifest | null = module.manifest ?? null

    return { module, manifest }
  } catch (error) {
    throw new Error(
      `Failed to import package: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

function detectPluginType(
  module: unknown,
): "transformer" | "filter" | "emitter" | "pageType" | null {
  if (!module || typeof module !== "object") return null

  const mod = module as Record<string, unknown>

  if (typeof mod.default === "function") {
    return null
  }

  const hasPageTypeProps = ["match", "body", "layout"].every((key) => key in mod)

  const hasTransformerProps = ["textTransform", "markdownPlugins", "htmlPlugins"].some(
    (key) => key in mod && (typeof mod[key] === "function" || mod[key] === undefined),
  )

  const hasFilterProps = ["shouldPublish"].some(
    (key) => key in mod && typeof mod[key] === "function",
  )

  const hasEmitterProps = ["emit"].some((key) => key in mod && typeof mod[key] === "function")

  if (hasPageTypeProps) return "pageType"
  if (hasEmitterProps) return "emitter"
  if (hasFilterProps) return "filter"
  if (hasTransformerProps) return "transformer"

  return null
}

function extractPluginFactory(
  module: unknown,
  type: "transformer" | "filter" | "emitter" | "pageType",
):
  QuartzTransformerPlugin | QuartzFilterPlugin | QuartzEmitterPlugin | QuartzPageTypePlugin | null {
  if (!module || typeof module !== "object") return null

  const mod = module as Record<string, unknown>

  const factory = mod.default ?? mod[type] ?? mod.plugin ?? null

  if (typeof factory === "function") {
    return factory as
      QuartzTransformerPlugin | QuartzFilterPlugin | QuartzEmitterPlugin | QuartzPageTypePlugin
  }

  return null
}

function isGitSource(source: string): boolean {
  // Check if it's a Git-based or local file path source
  return (
    isLocalSource(source) ||
    source.startsWith("github:") ||
    source.startsWith("git+") ||
    source.startsWith("https://github.com/") ||
    source.startsWith("https://gitlab.com/") ||
    source.startsWith("https://bitbucket.org/")
  )
}

async function resolveSinglePlugin(
  specifier: PluginSpecifier,
  options: PluginResolutionOptions,
): Promise<{ plugin: LoadedPlugin | null; error: PluginResolutionError | null }> {
  let packageName: string
  let manifest: Partial<PluginManifest> = {}
  let pluginSource = "npm"

  if (typeof specifier === "string") {
    packageName = specifier
    // Check if it's a Git-based source
    if (isGitSource(specifier)) {
      pluginSource = "git"
    }
  } else if ("name" in specifier) {
    packageName = specifier.name
    if (isGitSource(specifier.name)) {
      pluginSource = "git"
    }
  } else if ("plugin" in specifier) {
    const rawType = specifier.manifest?.category ?? "transformer"
    const type = Array.isArray(rawType) ? rawType[0] : rawType
    return {
      plugin: {
        plugin: specifier.plugin as QuartzTransformerPlugin,
        manifest: {
          name: specifier.manifest?.name ?? "inline-plugin",
          displayName: specifier.manifest?.displayName ?? "Inline Plugin",
          description: specifier.manifest?.description ?? "Inline plugin instance",
          version: specifier.manifest?.version ?? "1.0.0",
          category: rawType,
          ...specifier.manifest,
        } as PluginManifest,
        type,
        source: "inline",
      },
      error: null,
    }
  } else {
    return {
      plugin: null,
      error: {
        plugin: "unknown",
        message: "Invalid plugin specifier format",
        type: "invalid-manifest",
      },
    }
  }

  if (pluginSource === "git") {
    try {
      const gitSpec = parsePluginSource(packageName)
      await installPlugin(gitSpec, { verbose: options.verbose })
      const entryPoint = getPluginEntryPoint(gitSpec.name)

      // Import the plugin
      const module = await import(toFileUrl(entryPoint))
      const importedManifest: PluginManifest | null = module.manifest ?? null

      validatePluginExternals(gitSpec.name, entryPoint, { verbose: options.verbose })

      manifest = importedManifest ?? {}

      const categoryOrCategories = manifest.category ?? detectPluginType(module)

      if (!categoryOrCategories) {
        return {
          plugin: null,
          error: {
            plugin: packageName,
            message: "Could not detect plugin type from Git source",
            type: "invalid-manifest",
          },
        }
      }

      // Normalize to single processing category for factory extraction
      const processingCategories = ["transformer", "filter", "emitter", "pageType"] as const
      type ProcessingCategory = (typeof processingCategories)[number]
      const detectedType: PluginCategory = Array.isArray(categoryOrCategories)
        ? categoryOrCategories[0]
        : categoryOrCategories
      const processingType: ProcessingCategory | undefined = Array.isArray(categoryOrCategories)
        ? (categoryOrCategories.find((c) =>
            (processingCategories as readonly string[]).includes(c),
          ) as ProcessingCategory | undefined)
        : (processingCategories as readonly string[]).includes(categoryOrCategories)
          ? (categoryOrCategories as ProcessingCategory)
          : undefined

      // Component-only plugins don't have a processing factory
      if (!processingType) {
        const fullManifest: PluginManifest = {
          name: manifest.name ?? gitSpec.name,
          displayName: manifest.displayName ?? gitSpec.name,
          description: manifest.description ?? "No description provided",
          version: manifest.version ?? "1.0.0",
          author: manifest.author,
          homepage: manifest.homepage,
          keywords: manifest.keywords,
          category: manifest.category ?? detectedType,
          quartzVersion: manifest.quartzVersion,
          configSchema: manifest.configSchema,
        }

        if (options.verbose) {
          console.log(
            styleText("green", `\u2713`) +
              ` Loaded ${detectedType} plugin: ${styleText("cyan", fullManifest.displayName)}@${fullManifest.version} ${styleText("gray", `(from ${gitSpec.repo})`)}`,
          )
        }

        return { plugin: null, error: null }
      }

      const factory = extractPluginFactory(module, processingType)
      if (!factory) {
        return {
          plugin: null,
          error: {
            plugin: packageName,
            message: "Could not find plugin factory in Git source",
            type: "invalid-manifest",
          },
        }
      }

      const fullManifest: PluginManifest = {
        name: manifest.name ?? gitSpec.name,
        displayName: manifest.displayName ?? gitSpec.name,
        description: manifest.description ?? "No description provided",
        version: manifest.version ?? "1.0.0",
        author: manifest.author,
        homepage: manifest.homepage,
        keywords: manifest.keywords,
        category: manifest.category ?? detectedType,
        quartzVersion: manifest.quartzVersion,
        configSchema: manifest.configSchema,
      }

      const loadedPlugin: LoadedPlugin = {
        plugin: factory,
        manifest: fullManifest,
        type: detectedType,
        source: gitSpec.local ? `local:${gitSpec.repo}` : `${gitSpec.repo}#${gitSpec.ref}`,
      }

      if (options.verbose) {
        console.log(
          styleText("green", `✓`) +
            ` Loaded ${detectedType} plugin: ${styleText("cyan", fullManifest.displayName)}@${fullManifest.version} ${styleText("gray", `(from ${gitSpec.repo})`)}`,
        )
      }

      return { plugin: loadedPlugin, error: null }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      return {
        plugin: null,
        error: {
          plugin: packageName,
          message: `Failed to load Git plugin: ${errorMessage}`,
          type: "import-error",
        },
      }
    }
  }

  try {
    const { module: importedModule, manifest: importedManifest } =
      await tryImportPlugin(packageName)

    manifest = importedManifest ?? {}

    // Load components if the plugin declares any
    if (manifest.components && Object.keys(manifest.components).length > 0) {
      const { loadComponentsFromPackage } = await import("./componentLoader")
      await loadComponentsFromPackage(packageName, manifest as PluginManifest)
    }

    const categoryOrCategories = manifest.category ?? detectPluginType(importedModule)

    if (!categoryOrCategories) {
      return {
        plugin: null,
        error: {
          plugin: packageName,
          message: `Could not detect plugin type. Ensure the plugin exports a valid factory function or has a 'category' field in its manifest.`,
          type: "invalid-manifest",
        },
      }
    }

    // Normalize to single processing category for factory extraction
    const processingCategories = ["transformer", "filter", "emitter", "pageType"] as const
    type ProcessingCategory = (typeof processingCategories)[number]
    const detectedType: PluginCategory = Array.isArray(categoryOrCategories)
      ? categoryOrCategories[0]
      : categoryOrCategories
    const processingType: ProcessingCategory | undefined = Array.isArray(categoryOrCategories)
      ? (categoryOrCategories.find((c) =>
          (processingCategories as readonly string[]).includes(c),
        ) as ProcessingCategory | undefined)
      : (processingCategories as readonly string[]).includes(categoryOrCategories)
        ? (categoryOrCategories as ProcessingCategory)
        : undefined

    if (
      manifest.quartzVersion &&
      !satisfiesVersion(manifest.quartzVersion, options.quartzVersion)
    ) {
      return {
        plugin: null,
        error: {
          plugin: packageName,
          message: `Plugin requires Quartz ${manifest.quartzVersion} but current version is ${options.quartzVersion}`,
          type: "version-mismatch",
        },
      }
    }

    // Component-only plugins don't have a processing factory
    if (!processingType) {
      const fullManifest: PluginManifest = {
        name: manifest.name ?? packageName,
        displayName: manifest.displayName ?? packageName,
        description: manifest.description ?? "No description provided",
        version: manifest.version ?? "1.0.0",
        author: manifest.author,
        homepage: manifest.homepage,
        keywords: manifest.keywords,
        category: manifest.category ?? detectedType,
        quartzVersion: manifest.quartzVersion,
        configSchema: manifest.configSchema,
      }

      if (options.verbose) {
        console.log(
          styleText("green", `\u2713`) +
            ` Loaded ${detectedType} plugin: ${styleText("cyan", fullManifest.displayName)}@${fullManifest.version}`,
        )
      }

      return { plugin: null, error: null }
    }

    const factory = extractPluginFactory(importedModule, processingType)
    if (!factory) {
      return {
        plugin: null,
        error: {
          plugin: packageName,
          message: `Could not find plugin factory in module. Expected 'export default' or '${processingType}' export.`,
          type: "invalid-manifest",
        },
      }
    }

    const fullManifest: PluginManifest = {
      name: manifest.name ?? packageName,
      displayName: manifest.displayName ?? packageName,
      description: manifest.description ?? "No description provided",
      version: manifest.version ?? "1.0.0",
      author: manifest.author,
      homepage: manifest.homepage,
      keywords: manifest.keywords,
      category: manifest.category ?? detectedType,
      quartzVersion: manifest.quartzVersion,
      configSchema: manifest.configSchema,
    }

    const loadedPlugin: LoadedPlugin = {
      plugin: factory,
      manifest: fullManifest,
      type: detectedType,
      source: packageName,
    }

    if (options.verbose) {
      console.log(
        styleText("green", `✓`) +
          ` Loaded ${detectedType} plugin: ${styleText("cyan", fullManifest.displayName)}@${fullManifest.version}`,
      )
    }

    return { plugin: loadedPlugin, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)

    if (errorMessage.includes("Cannot find module") || errorMessage.includes("MODULE_NOT_FOUND")) {
      return {
        plugin: null,
        error: {
          plugin: packageName,
          message: `Plugin package not found. Run 'npm install ${packageName}' to install it.`,
          type: "not-found",
        },
      }
    }

    return {
      plugin: null,
      error: {
        plugin: packageName,
        message: errorMessage,
        type: "import-error",
      },
    }
  }
}

export async function resolvePlugins(
  specifiers: PluginSpecifier[],
  options: PluginResolutionOptions,
): Promise<PluginResolution> {
  const plugins: LoadedPlugin[] = []
  const errors: PluginResolutionError[] = []

  if (options.verbose) {
    console.log(styleText("cyan", `Resolving ${specifiers.length} external plugin(s)...`))
  }

  for (const specifier of specifiers) {
    const { plugin, error } = await resolveSinglePlugin(specifier, options)

    if (plugin) {
      plugins.push(plugin)
    } else if (error) {
      errors.push(error)
      console.error(
        styleText("red", `✗`) +
          ` Failed to load plugin: ${styleText("yellow", error.plugin)}\n` +
          `  ${error.message}`,
      )
    }
  }

  if (options.verbose && plugins.length > 0) {
    const byType = plugins.reduce(
      (acc, p) => {
        acc[p.type] = (acc[p.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    console.log(
      styleText("cyan", `External plugins loaded:`) +
        ` ${byType.transformer ?? 0} transformers, ${byType.filter ?? 0} filters, ${byType.emitter ?? 0} emitters, ${byType.pageType ?? 0} pageTypes`,
    )
  }

  return { plugins, errors }
}

export function instantiatePlugin<T>(
  loadedPlugin: LoadedPlugin,
  options?: T,
): ReturnType<typeof loadedPlugin.plugin> {
  const factory = loadedPlugin.plugin as (opts?: T) => ReturnType<typeof loadedPlugin.plugin>
  return factory(options)
}

export { satisfiesVersion, MINIMUM_QUARTZ_VERSION }

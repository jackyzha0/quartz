#!/usr/bin/env node
import fs from "fs"
import path from "path"
import YAML from "yaml"
import { installPlugins, parsePluginSource, regeneratePluginIndex } from "./gitLoader.js"
import type { PluginSource, QuartzPluginsJson } from "./types.js"
import { absorbingBuiltin } from "../builtins/index.js"

function resolveConfigPath(): string {
  const configYamlPath = path.join(process.cwd(), "quartz.config.yaml")
  const defaultConfigYamlPath = path.join(process.cwd(), "quartz.config.default.yaml")
  const legacyPluginsJsonPath = path.join(process.cwd(), "quartz.plugins.json")
  const legacyDefaultPluginsJsonPath = path.join(process.cwd(), "quartz.plugins.default.json")

  if (fs.existsSync(configYamlPath)) return configYamlPath
  if (fs.existsSync(legacyPluginsJsonPath)) return legacyPluginsJsonPath
  if (fs.existsSync(defaultConfigYamlPath)) return defaultConfigYamlPath
  if (fs.existsSync(legacyDefaultPluginsJsonPath)) return legacyDefaultPluginsJsonPath
  return configYamlPath
}

function readPluginsJson(): QuartzPluginsJson | null {
  const configPath = resolveConfigPath()
  if (!fs.existsSync(configPath)) return null
  const raw = fs.readFileSync(configPath, "utf-8")
  if (configPath.endsWith(".yaml") || configPath.endsWith(".yml")) {
    return YAML.parse(raw)
  }
  return JSON.parse(raw)
}

async function getExternalPluginSources(): Promise<PluginSource[]> {
  try {
    // Loading quartz.ts runs the full config loader; its warnings are printed again by the build
    // that follows (prebuild → build), so keep this pass quiet.
    process.env.QUARTZ_CONFIG_QUIET = "1"
    const module = await import("../../../quartz.js")
    const config = module.default ?? module
    const externalPlugins = config.externalPlugins
    if (Array.isArray(externalPlugins) && externalPlugins.length > 0) {
      return externalPlugins as PluginSource[]
    }
  } catch {
    // fall back to config yaml parsing
  }

  const pluginsJson = readPluginsJson()
  const entries = pluginsJson?.plugins ?? []
  return entries.filter((entry) => entry.enabled !== false).map((entry) => entry.source)
}

async function main() {
  // Official plugins that are built into core now (crawl-links, …) are never installed.
  const externalPlugins = (await getExternalPluginSources()).filter(
    (source) => !absorbingBuiltin({ source, enabled: true }),
  )

  if (externalPlugins.length === 0) {
    console.log("No external plugins to install.")
    return
  }

  const specs = externalPlugins
    .map((source: PluginSource) => parsePluginSource(source))
    .filter((spec) => !spec.npmPackage)

  const npmSpecs = externalPlugins
    .map((source: PluginSource) => parsePluginSource(source))
    .filter((spec) => spec.npmPackage)

  if (specs.length === 0 && npmSpecs.length === 0) {
    console.log("No external plugins to install.")
    return
  }

  if (specs.length > 0) {
    console.log(`Installing ${specs.length} plugin(s) from Git...`)
    const installed = await installPlugins(specs, { verbose: true })

    if (installed.size === specs.length) {
      console.log("✓ All Git plugins installed successfully")
    } else {
      console.error(`✗ Only ${installed.size}/${specs.length} Git plugins installed`)
      process.exit(1)
    }
  }

  if (npmSpecs.length > 0) {
    console.log(`Found ${npmSpecs.length} npm plugin(s), regenerating plugin index...`)
    await regeneratePluginIndex({ verbose: true, npmPackages: npmSpecs.map((s) => s.name) })
  }
}

main().catch((err) => {
  console.error("Failed to install plugins:", err)
  process.exit(1)
})

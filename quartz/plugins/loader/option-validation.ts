import { styleText } from "util"
import { recordDiagnostic } from "../../util/diagnostics"
import { PluginJsonEntry, PluginManifest } from "./types"
import { validatePluginEntry, validatePluginOptions } from "../../cli/plugin-validation.js"

export interface PluginConfigWarning {
  plugin: string
  message: string
}

/**
 * Collect likely mistakes in `plugins:` entries of quartz.config.yaml that the
 * loader would otherwise ignore silently: misspelled entry keys (`enable:`),
 * non-boolean `enabled`, options that look like typos of a plugin's
 * `defaultOptions` keys, and options with the wrong type.
 *
 * Informational findings (options the manifest does not document) are left to
 * `quartz plugin doctor --verbose`; this only returns actionable warnings.
 */
export function collectPluginConfigWarnings(
  entries: PluginJsonEntry[],
  manifestFor: (entry: PluginJsonEntry) => PluginManifest | undefined,
  nameOf: (entry: PluginJsonEntry) => string,
): PluginConfigWarning[] {
  const warnings: PluginConfigWarning[] = []
  for (const entry of entries) {
    let plugin: string
    try {
      plugin = nameOf(entry)
    } catch {
      plugin = String((entry as { source?: unknown })?.source ?? "plugin")
    }
    for (const issue of validatePluginEntry(entry)) {
      warnings.push({ plugin, message: issue.message })
    }
    if (!entry?.enabled) continue
    for (const issue of validatePluginOptions(entry.options, manifestFor(entry))) {
      if (issue.severity === "warning") warnings.push({ plugin, message: issue.message })
    }
  }
  return warnings
}

export function printPluginConfigWarnings(warnings: PluginConfigWarning[]): void {
  for (const { plugin, message } of warnings) {
    recordDiagnostic({
      severity: "warning",
      area: "config",
      plugin,
      message: `quartz.config.yaml: ${plugin}: ${message}`,
    })
  }
  if (process.env.QUARTZ_CONFIG_QUIET === "1") return
  for (const { plugin, message } of warnings) {
    console.warn(
      styleText("yellow", `⚠`) + ` quartz.config.yaml: ${styleText("cyan", plugin)}: ${message}`,
    )
  }
  if (warnings.length > 0) {
    console.warn(
      styleText("gray", `  Run 'npx quartz plugin doctor' for a full check of your plugin setup.`),
    )
  }
}

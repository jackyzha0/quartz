import { componentRegistry } from "../../components/registry"
import { ComponentManifest, PluginManifest } from "./types"
import { QuartzComponentConstructor } from "../../components/types"
import { getPluginSubpathEntry, toFileUrl } from "./gitLoader"
import { attributeComponentExport, shortPluginName } from "../../components/attribution"

export async function loadComponentsFromPackage(
  pluginName: string,
  manifest: PluginManifest | null,
): Promise<void> {
  if (!manifest?.components) return

  try {
    const componentsPath = getPluginSubpathEntry(pluginName, "./components")

    let componentsModule: Record<string, unknown>
    if (componentsPath) {
      componentsModule = await import(toFileUrl(componentsPath))
    } else {
      componentsModule = await import(`${pluginName}/components`)
    }

    const componentEntries = Object.entries(manifest.components)
    // Wrap each export once so rendered roots carry data-quartz-plugin /
    // data-quartz-component (see components/attribution.ts). The same wrapper
    // is registered under every key, keeping registry dedupe/caching intact.
    const attributed = new Map<string, unknown>()
    const resolveExport = (exportName: string): unknown => {
      if (!attributed.has(exportName)) {
        const raw = componentsModule[exportName]
        attributed.set(
          exportName,
          raw
            ? attributeComponentExport(raw as QuartzComponentConstructor, {
                plugin: shortPluginName(pluginName),
                component: exportName,
              })
            : raw,
        )
      }
      return attributed.get(exportName)
    }
    for (const [exportName, componentManifest] of componentEntries) {
      const component = resolveExport(exportName)
      if (!component) {
        console.warn(
          `Component "${exportName}" declared in manifest but not found in ${pluginName}/components`,
        )
        continue
      }

      // Register under the fully-qualified key (pluginName/exportName)
      componentRegistry.register(
        `${pluginName}/${exportName}`,
        component as QuartzComponentConstructor,
        pluginName,
        componentManifest as ComponentManifest,
      )

      // Also register under just the export name (e.g. "Footer", "NotePropertiesComponent")
      // so buildLayoutForEntries can find it via PascalCase conversion of plugin name
      if (!componentRegistry.get(exportName)) {
        componentRegistry.register(
          exportName,
          component as QuartzComponentConstructor,
          pluginName,
          componentManifest as ComponentManifest,
        )
      }
    }

    // If plugin has exactly one component, also register under just the plugin name
    // (e.g. "footer", "note-properties") for direct kebab-case lookup
    if (componentEntries.length === 1) {
      const [exportName] = componentEntries[0]
      const component = resolveExport(exportName)
      if (component && !componentRegistry.get(pluginName)) {
        componentRegistry.register(
          pluginName,
          component as QuartzComponentConstructor,
          pluginName,
          componentEntries[0][1] as ComponentManifest,
        )
      }
    }
  } catch {
    if (manifest.components && Object.keys(manifest.components).length > 0) {
      console.warn(`Plugin "${pluginName}" declares components but failed to load them`)
    }
  }
}

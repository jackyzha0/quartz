export interface PluginIndexEntry {
  overridable: string[]
  passthrough: string[]
  types: string[]
  importPath: string
  registryKey: string
}
export function parseExportsFromDts(content: string): string[]
export function isOverridableExport(
  name: string,
  dtsContent: string,
  dtsPath?: string,
  depth?: number,
): boolean
export function collectPluginExports(options: {
  pluginsDir: string
  npmPackages?: string[]
  verbose?: boolean
}): Map<string, PluginIndexEntry>
export function renderPluginIndex(
  entries: Map<string, PluginIndexEntry>,
  options?: { warn?: (message: string) => void },
): string
export function writePluginIndex(options: {
  pluginsDir: string
  npmPackages?: string[]
  verbose?: boolean
}): Map<string, PluginIndexEntry>

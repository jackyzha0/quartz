export interface OptionIssue {
  severity: "warning" | "info"
  path: string
  message: string
  suggestion?: string
}

export interface EntryIssue {
  severity: "error" | "warning"
  message: string
  suggestion?: string
}

export declare const PLUGIN_ENTRY_KEYS: string[]
export declare const SOURCE_OBJECT_KEYS: string[]
export declare const LAYOUT_KEYS: string[]
export declare const LAYOUT_POSITIONS: string[]
export declare const LAYOUT_DISPLAYS: string[]

export declare function levenshtein(a: string, b: string): number
export declare function suggestClosest(input: string, candidates: Iterable<string>): string | null
export declare function shortPluginName(name: string): string
export declare function findConfigEntries(
  plugins: Array<{ source: unknown }>,
  query: string,
  helpers: {
    extractName: (source: unknown) => string
    formatSource: (source: unknown) => string
  },
): { indices: number[]; suggestion: string | null }
export declare function validatePluginOptions(
  options: unknown,
  manifest: { defaultOptions?: Record<string, unknown>; configSchema?: unknown } | null | undefined,
  prefix?: string,
): OptionIssue[]
export declare function validatePluginEntry(entry: unknown): EntryIssue[]
export declare function parseOptionPath(keyPath: string): string[]
export declare function setOptionPath(
  target: Record<string, unknown>,
  segments: string[],
  value: unknown,
): void
export declare function unsetOptionPath(
  target: Record<string, unknown>,
  segments: string[],
): boolean

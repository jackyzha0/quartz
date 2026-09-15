import { QuartzTransformerPluginInstance } from "../plugins/types"
import { FilePath, FullSlug, slugifyFilePath } from "./path"

export type SlugifyFn = (fp: FilePath, excludeExt?: boolean) => FullSlug

/**
 * Resolves the slugify function to use for a build: the built-in
 * `slugifyFilePath`, unless exactly one enabled transformer plugin overrides
 * it via its `slugify` field. Throws if more than one plugin defines one, so
 * a misconfiguration fails fast instead of one override silently winning.
 */
export function resolveSlugify(transformers: QuartzTransformerPluginInstance[]): SlugifyFn {
  const overrides = transformers.filter(
    (plugin): plugin is QuartzTransformerPluginInstance & { slugify: SlugifyFn } =>
      plugin.slugify !== undefined,
  )

  if (overrides.length > 1) {
    throw new Error(
      "Multiple transformer plugins define a custom `slugify`: " +
        `${overrides.map((plugin) => plugin.name).join(", ")}. ` +
        "Only one plugin may override slug generation.",
    )
  }

  return overrides[0]?.slugify ?? slugifyFilePath
}

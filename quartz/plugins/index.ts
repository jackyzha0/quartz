import { StaticResources } from "../resources"
import { PluginTypes } from "./types"
import { FilePath, ServerSlug } from "../path"

export function getStaticResourcesFromPlugins(plugins: PluginTypes) {
  const staticResources: StaticResources = {
    css: [],
    js: [],
  }

  for (const transformer of plugins.transformers) {
    const res = transformer.externalResources ? transformer.externalResources() : {}
    if (res?.js) {
      staticResources.js.push(...res.js)
    }
    if (res?.css) {
      staticResources.css.push(...res.css)
    }
  }

  return staticResources
}

export * from "./transformers"
export * from "./filters"
export * from "./emitters"

declare module "vfile" {
  // inserted in processors.ts
  interface DataMap {
    slug: ServerSlug
    allSlugs: ServerSlug[]
    filePath: FilePath
  }
}

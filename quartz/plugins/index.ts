import { StaticResources } from '../resources'
import { PluginTypes } from './types'

export function getStaticResourcesFromPlugins(plugins: PluginTypes) {
  const staticResources: StaticResources = {
    css: [],
    js: [],
  }

  for (const plugin of plugins.transformers) {
    const res = plugin.externalResources
    if (res?.js) {
      staticResources.js = staticResources.js.concat(res.js)
    }
    if (res?.css) {
      staticResources.css = staticResources.css.concat(res.css)
    }
  }

  return staticResources
}

export * from './transformers'
export * from './filters'
export * from './emitters'

declare module 'vfile' {
  // inserted in processors.ts
  interface DataMap {
    slug: string
    filePath: string
  }
}

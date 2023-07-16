import { GlobalConfiguration } from '../cfg'
import { QuartzComponent } from '../components/types'
import { StaticResources } from '../resources'
import { joinStyles } from '../theme'
import { EmitCallback, PluginTypes } from './types'
import styles from '../styles/base.scss'
import { FilePath, ServerSlug } from '../path'

export type ComponentResources = {
  css: string[],
  beforeDOMLoaded: string[],
  afterDOMLoaded: string[]
}

export function getComponentResources(plugins: PluginTypes): ComponentResources {
  const allComponents: Set<QuartzComponent> = new Set()
  for (const emitter of plugins.emitters) {
    const components = emitter.getQuartzComponents()
    for (const component of components) {
      allComponents.add(component)
    }
  }

  const componentResources = {
    css: new Set<string>(),
    beforeDOMLoaded: new Set<string>(),
    afterDOMLoaded: new Set<string>()
  }

  for (const component of allComponents) {
    const { css, beforeDOMLoaded, afterDOMLoaded } = component
    if (css) {
      componentResources.css.add(css)
    }
    if (beforeDOMLoaded) {
      componentResources.beforeDOMLoaded.add(beforeDOMLoaded)
    }
    if (afterDOMLoaded) {
      componentResources.afterDOMLoaded.add(afterDOMLoaded)
    }
  }
  
  return {
    css: [...componentResources.css],
    beforeDOMLoaded: [...componentResources.beforeDOMLoaded],
    afterDOMLoaded: [...componentResources.afterDOMLoaded]
  }
}

function joinScripts(scripts: string[]): string {
  // wrap with iife to prevent scope collision
  return scripts.map(script => `(function () {${script}})();`).join("\n")
}

export async function emitComponentResources(cfg: GlobalConfiguration, res: ComponentResources, emit: EmitCallback): Promise<FilePath[]> {
  const fps = await Promise.all([
    emit({
      slug: "index" as ServerSlug,
      ext: ".css",
      content: joinStyles(cfg.theme, styles, ...res.css)
    }),
    emit({
      slug: "prescript" as ServerSlug,
      ext: ".js",
      content: joinScripts(res.beforeDOMLoaded)
    }),
    emit({
      slug: "postscript" as ServerSlug,
      ext: ".js",
      content: joinScripts(res.afterDOMLoaded)
    })
  ])
  return fps

}

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

export * from './transformers'
export * from './filters'
export * from './emitters'

declare module 'vfile' {
  // inserted in processors.ts
  interface DataMap {
    slug: ServerSlug
    allSlugs: ServerSlug[]
    filePath: FilePath
  }
}

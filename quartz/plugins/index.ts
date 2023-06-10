import { GlobalConfiguration } from '../cfg'
import { QuartzComponent } from '../components/types'
import { StaticResources } from '../resources'
import { googleFontHref, joinStyles } from '../theme'
import { EmitCallback, PluginTypes } from './types'
import styles from '../styles/base.scss'
// @ts-ignore
import spaRouterScript from '../components/scripts/spa.inline'

export type ComponentResources = {
  css: string[],
  beforeDOMLoaded: string[],
  afterDOMLoaded: string[]
}

function joinScripts(scripts: string[]): string {
  return scripts.join("\n")
}

export function emitComponentResources(cfg: GlobalConfiguration, resources: StaticResources, plugins: PluginTypes, emit: EmitCallback) {
  const fps: string[] = []
  const allComponents: Set<QuartzComponent> = new Set()
  for (const emitter of plugins.emitters) {
    const components = emitter.getQuartzComponents()
    for (const component of components) {
      allComponents.add(component)
    }
  }

  const componentResources: ComponentResources = {
    css: [],
    beforeDOMLoaded: [],
    afterDOMLoaded: []
  }

  if (cfg.enableSPA) {
    componentResources.afterDOMLoaded.push(spaRouterScript)
  }

  for (const component of allComponents) {
    const { css, beforeDOMLoaded, afterDOMLoaded } = component
    if (css) {
      componentResources.css.push(css)
    }
    if (beforeDOMLoaded) {
      componentResources.beforeDOMLoaded.push(beforeDOMLoaded)
    }
    if (afterDOMLoaded) {
      componentResources.afterDOMLoaded.push(afterDOMLoaded)
    }
  }

  emit({
    slug: "index",
    ext: ".css",
    content: joinStyles(cfg.theme, styles, ...componentResources.css)
  })
  emit({
    slug: "prescript",
    ext: ".js",
    content: joinScripts(componentResources.beforeDOMLoaded)
  })
  emit({
    slug: "postscript",
    ext: ".js",
    content: joinScripts(componentResources.afterDOMLoaded)
  })

  fps.push("index.css", "prescript.js", "postscript.js")
  resources.css.push(googleFontHref(cfg.theme))
  return fps
}

export function getStaticResourcesFromPlugins(plugins: PluginTypes) {
  const staticResources: StaticResources = {
    css: [],
    js: [],
  }

  for (const transformer of plugins.transformers) {
    const res = transformer.externalResources
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

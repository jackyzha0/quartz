import { randomUUID } from "crypto"
import { JSX } from "preact/jsx-runtime"
import { QuartzPluginData } from "../plugins/vfile"

export type JSResource = {
  loadTime: "beforeDOMReady" | "afterDOMReady"
  moduleType?: "module"
  spaPreserve?: boolean
} & (
  | {
      src: string
      contentType: "external"
    }
  | {
      script: string
      contentType: "inline"
    }
)

export type CSSResource = {
  content: string
  inline?: boolean
  spaPreserve?: boolean
}

export function JSResourceToScriptElement(resource: JSResource, preserve?: boolean): JSX.Element {
  const scriptType = resource.moduleType ?? "application/javascript"
  const spaPreserve = preserve ?? resource.spaPreserve

  if (resource.contentType === "external") {
    return (
      <script key={resource.src} src={resource.src} type={scriptType} data-persist={spaPreserve} />
    )
  } else {
    const content = resource.script
    return (
      <script
        key={randomUUID()}
        type={scriptType}
        data-persist={spaPreserve}
        dangerouslySetInnerHTML={{ __html: content }}
      ></script>
    )
  }
}

export function CSSResourceToStyleElement(resource: CSSResource, preserve?: boolean): JSX.Element {
  const spaPreserve = preserve ?? resource.spaPreserve
  if (resource.inline ?? false) {
    return <style dangerouslySetInnerHTML={{ __html: resource.content }} />
  } else {
    return (
      <link
        key={resource.content}
        href={resource.content}
        rel="stylesheet"
        type="text/css"
        data-persist={spaPreserve}
      />
    )
  }
}

/**
 * A file or directory a plugin ships with the site (Quartz 5.1+), copied to
 * `<output>/static/plugins/<to>`. Client scripts get its URL from the `quartzStaticUrl` page
 * global: `new URL("plugins/<to>/…", window.quartzStaticUrl)`. Use this for large or optional
 * client code (load it with `import()` only on pages that need it) instead of inline scripts,
 * which every page downloads.
 */
export interface StaticAsset {
  /** Absolute path of a file or directory on disk (e.g. resolved from a dependency). */
  from: string
  /** Destination below `static/plugins/`, e.g. "obsidian-flavored-markdown/pele". */
  to: string
}

export interface StaticResources {
  css: CSSResource[]
  js: JSResource[]
  additionalHead: (JSX.Element | ((pageData: QuartzPluginData) => JSX.Element))[]
  /** Files copied into the output (see StaticAsset). Ignored by Quartz versions before 5.1. */
  assets?: StaticAsset[]
}

export type StringResource = string | string[] | undefined

export function normalizeResource(resource: StringResource): string[] {
  if (!resource) return []
  if (Array.isArray(resource)) return resource
  return [resource]
}

export function concatenateResources(...resources: StringResource[]): StringResource {
  return resources
    .filter((resource): resource is string | string[] => resource !== undefined)
    .flat()
}

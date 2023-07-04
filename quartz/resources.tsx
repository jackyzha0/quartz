import { randomUUID } from "crypto"
import { JSX } from "preact/jsx-runtime"

export type JSResource = {
  loadTime: 'beforeDOMReady' | 'afterDOMReady'
  moduleType?: 'module',
  spaPreserve?: boolean
} & ({
  src: string
  contentType: 'external'
} | {
  script: string
  contentType: 'inline'
})

export function JSResourceToScriptElement(resource: JSResource, preserve?: boolean): JSX.Element {
  const scriptType = resource.moduleType ?? 'application/javascript'
  const spaPreserve = preserve ?? resource.spaPreserve
  if (resource.contentType === 'external') {
    return <script key={resource.src} src={resource.src} type={scriptType} spa-preserve={spaPreserve}/>
  } else {
    const content = resource.script
    return <script key={randomUUID()} type={scriptType} spa-preserve={spaPreserve}>{content}</script>
  }
}

export interface StaticResources {
  css: string[],
  js: JSResource[]
}

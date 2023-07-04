import { ComponentType, JSX } from "preact"
import { StaticResources } from "../resources"
import { QuartzPluginData } from "../plugins/vfile"
import { GlobalConfiguration } from "../cfg"
import { Node } from "hast"

export type QuartzComponentProps = {
  externalResources: StaticResources
  fileData: QuartzPluginData
  cfg: GlobalConfiguration
  children: (QuartzComponent | JSX.Element)[]
  tree: Node<QuartzPluginData>
  allFiles: QuartzPluginData[]
  displayClass?: 'mobile-only' | 'desktop-only'
} & JSX.IntrinsicAttributes & {
  [key: string]: any
}

export type QuartzComponent = ComponentType<QuartzComponentProps> & {
  css?: string,
  beforeDOMLoaded?: string,
  afterDOMLoaded?: string,
}

export type QuartzComponentConstructor<Options extends object | undefined = undefined> = (opts: Options) => QuartzComponent

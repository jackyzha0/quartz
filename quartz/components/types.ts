import { ComponentType, JSX } from "preact"
import { StaticResources } from "../resources"
import { QuartzPluginData } from "../plugins/vfile"
import { GlobalConfiguration } from "../cfg"

export type QuartzComponentProps = {
  externalResources: StaticResources
  fileData: QuartzPluginData
  cfg: GlobalConfiguration
  children: QuartzComponent[] | JSX.Element[]
}

export type QuartzComponent = ComponentType<QuartzComponentProps> & {
  css?: string,
  beforeDOMLoaded?: string,
  afterDOMLoaded?: string,
}

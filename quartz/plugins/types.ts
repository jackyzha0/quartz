import { PluggableList } from "unified"
import { StaticResources } from "../resources"
import { ProcessedContent } from "./vfile"
import { GlobalConfiguration } from "../cfg"
import { QuartzComponent } from "../components/types"
import { FilePath, ServerSlug } from "../path"

export interface PluginTypes {
  transformers: QuartzTransformerPluginInstance[],
  filters: QuartzFilterPluginInstance[],
  emitters: QuartzEmitterPluginInstance[],
}

type OptionType = object | undefined
export type QuartzTransformerPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzTransformerPluginInstance
export type QuartzTransformerPluginInstance = {
  name: string
  textTransform?: (src: string | Buffer) => string | Buffer
  markdownPlugins?: () => PluggableList
  htmlPlugins?: () => PluggableList
  externalResources?: () => Partial<StaticResources>
}

export type QuartzFilterPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzFilterPluginInstance 
export type QuartzFilterPluginInstance = {
  name: string
  shouldPublish(content: ProcessedContent): boolean
}

export type QuartzEmitterPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzEmitterPluginInstance 
export type QuartzEmitterPluginInstance = {
  name: string
  emit(contentDir: string, cfg: GlobalConfiguration, content: ProcessedContent[], resources: StaticResources, emitCallback: EmitCallback): Promise<FilePath[]>
  getQuartzComponents(): QuartzComponent[]
}

export interface EmitOptions {
  slug: ServerSlug
  ext: `.${string}` | ""
  content: string
}

export type EmitCallback = (data: EmitOptions) => Promise<FilePath>

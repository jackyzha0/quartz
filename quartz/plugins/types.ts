import { PluggableList } from "unified"
import { StaticResources } from "../resources"
import { ProcessedContent } from "./vfile"
import { GlobalConfiguration } from "../cfg"
import { QuartzComponent } from "../components/types"

export interface PluginTypes {
  transformers: QuartzTransformerPluginInstance[],
  filters: QuartzFilterPluginInstance[],
  emitters: QuartzEmitterPluginInstance[],
}

type OptionType = object | undefined
export type QuartzTransformerPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzTransformerPluginInstance
export type QuartzTransformerPluginInstance = {
  name: string
  markdownPlugins(): PluggableList
  htmlPlugins(): PluggableList
  externalResources?: Partial<StaticResources>
}

export type QuartzFilterPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzFilterPluginInstance 
export type QuartzFilterPluginInstance = {
  name: string
  shouldPublish(content: ProcessedContent): boolean
}

export type QuartzEmitterPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzEmitterPluginInstance 
export type QuartzEmitterPluginInstance = {
  name: string
  emit(cfg: GlobalConfiguration, content: ProcessedContent[], resources: StaticResources, emitCallback: EmitCallback): Promise<string[]>
  getQuartzComponents(): QuartzComponent[]
}

export interface EmitOptions {
  slug: string
  ext: `.${string}`
  content: string
}

export type EmitCallback = (data: EmitOptions) => Promise<string>

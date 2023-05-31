import { PluggableList } from "unified"
import { StaticResources } from "../resources"
import { ProcessedContent } from "./vfile"

export abstract class QuartzTransformerPlugin {
  abstract name: string
  abstract markdownPlugins(): PluggableList
  abstract htmlPlugins(): PluggableList
  externalResources?: Partial<StaticResources>
}

export abstract class QuartzFilterPlugin {
  abstract name: string
  abstract shouldPublish(content: ProcessedContent): boolean
}

export interface EmitOptions {
  slug: string
  ext: `.${string}`
  content: string
}

export type EmitCallback = (data: EmitOptions) => Promise<string>
export abstract class QuartzEmitterPlugin {
  abstract name: string
  abstract emit(content: ProcessedContent[], resources: StaticResources, emitCallback: EmitCallback): Promise<string[]>
}

export interface PluginTypes {
  transformers: QuartzTransformerPlugin[],
  filters: QuartzFilterPlugin[],
  emitters: QuartzEmitterPlugin[],
}

import { PluggableList } from "unified"
import { StaticResources } from "../util/resources"
import { ProcessedContent } from "./vfile"
import { QuartzComponent } from "../components/types"
import { FilePath } from "../util/path"
import { BuildCtx } from "../util/ctx"
import DepGraph from "../depgraph"

type OptionType = object | undefined
export interface PluginTypes {
  transformers: QuartzTransformerPluginInstance
  filters: QuartzFilterPluginInstance[]
  emitters: QuartzEmitterPluginInstance[]
}

export type TextTransformerPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => TextTransformerPluginInstance
export type TextTransformerPluginInstance = {
  name: string
  transformation: (ctx: BuildCtx, src: string | Buffer) => string | Buffer
}

export type MarkdownTransformerPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => MarkdownTransformerPluginInstance
export type MarkdownTransformerPluginInstance = {
  name: string
  transformation: (ctx: BuildCtx) => PluggableList
}

export type HtmlTransformerPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => HtmlTransformerPluginInstance
export type HtmlTransformerPluginInstance = {
  name: string
  transformation: (ctx: BuildCtx) => PluggableList
}

export type ExternalResourcePlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => ExternalResourcePluginInstance
export type ExternalResourcePluginInstance = {
  name: string
  transformation: (ctx: BuildCtx) => Partial<StaticResources>
}

export type QuartzTransformerPlugin = (
  textTransformers: TextTransformerPlugin,
  markdownTransformers: MarkdownTransformerPlugin,
  htmlTransformers: HtmlTransformerPlugin,
  externalResources: ExternalResourcePlugin,
) => QuartzTransformerPluginInstance
export type QuartzTransformerPluginInstance = {
  //name: string,
  textTransformers: TextTransformerPluginInstance[]
  markdownTransformers: MarkdownTransformerPluginInstance[]
  htmlTransformers: HtmlTransformerPluginInstance[]
  externalResources: ExternalResourcePluginInstance[]
}

export type QuartzFilterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzFilterPluginInstance
export type QuartzFilterPluginInstance = {
  name: string
  shouldPublish(ctx: BuildCtx, content: ProcessedContent): boolean
}

export type QuartzEmitterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzEmitterPluginInstance
export type QuartzEmitterPluginInstance = {
  name: string
  emit(ctx: BuildCtx, content: ProcessedContent[], resources: StaticResources): Promise<FilePath[]>
  getQuartzComponents(ctx: BuildCtx): QuartzComponent[]
  getDependencyGraph?(
    ctx: BuildCtx,
    content: ProcessedContent[],
    resources: StaticResources,
  ): Promise<DepGraph<FilePath>>
}

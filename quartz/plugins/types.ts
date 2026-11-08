import { PluggableList } from "unified"
import { StaticResources } from "../util/resources"
import { ProcessedContent, QuartzPluginData } from "./vfile"
import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "../components/types"
import { FilePath, FullSlug, SimpleSlug } from "../util/path"
import { BuildCtx } from "../util/ctx"
import { GlobalConfiguration } from "../cfg"
import { VFile } from "vfile"
import { Root } from "hast"

export interface PluginTypes {
  transformers: QuartzTransformerPluginInstance[]
  filters: QuartzFilterPluginInstance[]
  emitters: QuartzEmitterPluginInstance[]
  pageTypes?: PageTypePluginEntry[]
}

type OptionType = object | undefined
type ExternalResourcesFn = (ctx: BuildCtx) => Partial<StaticResources> | undefined

/** One page's entry in `static/contentIndex.json` (built-in content index). */
export type ContentDetails = {
  slug: FullSlug
  filePath: FilePath
  title: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  richContent?: string
  /** RSS / sitemap only — not written to contentIndex.json. */
  date?: Date
  /** RSS / sitemap only — not written to contentIndex.json. */
  description?: string
  /** Fields added by plugins through `extendContentIndex`. */
  [extra: string]: unknown
}

/**
 * Optional hook available on every plugin instance: return extra JSON-serialisable fields for a
 * page's entry in `static/contentIndex.json`. Core fields cannot be overridden.
 * See quartz/plugins/builtins/contentIndex.ts.
 */
export type ContentIndexExtension = (args: {
  ctx: BuildCtx
  fileData: QuartzPluginData
  entry: Readonly<ContentDetails>
}) => Record<string, unknown> | undefined | void

interface PluginHooks {
  extendContentIndex?: ContentIndexExtension
}
export type QuartzTransformerPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzTransformerPluginInstance
export type QuartzTransformerPluginInstance = PluginHooks & {
  name: string
  textTransform?: (ctx: BuildCtx, src: string) => string
  markdownPlugins?: (ctx: BuildCtx) => PluggableList
  htmlPlugins?: (ctx: BuildCtx) => PluggableList
  externalResources?: ExternalResourcesFn
}

export type QuartzFilterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzFilterPluginInstance
export type QuartzFilterPluginInstance = PluginHooks & {
  name: string
  shouldPublish(ctx: BuildCtx, content: ProcessedContent): boolean
}

export type ChangeEvent = {
  type: "add" | "change" | "delete"
  path: FilePath
  file?: VFile
}

export type QuartzEmitterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzEmitterPluginInstance
export type QuartzEmitterPluginInstance = PluginHooks & {
  name: string
  emit: (
    ctx: BuildCtx,
    content: ProcessedContent[],
    resources: StaticResources,
  ) => Promise<FilePath[]> | AsyncGenerator<FilePath>
  partialEmit?: (
    ctx: BuildCtx,
    content: ProcessedContent[],
    resources: StaticResources,
    changeEvents: ChangeEvent[],
  ) => Promise<FilePath[]> | AsyncGenerator<FilePath> | null
  /**
   * Returns the components (if any) that are used in rendering the page.
   * This helps Quartz optimize the page by only including necessary resources
   * for components that are actually used.
   */
  getQuartzComponents?: (ctx: BuildCtx) => QuartzComponent[]
  externalResources?: ExternalResourcesFn
}

// ============================================================================
// PageType Plugin Types
// ============================================================================

export type PageMatcher = (args: {
  slug: string
  fileData: QuartzPluginData
  cfg: GlobalConfiguration
  [key: string]: unknown
}) => boolean

export interface VirtualPage {
  slug: string
  title: string
  data: Partial<QuartzPluginData> & Record<string, unknown>
}

export type PageGenerator = (args: {
  content: ProcessedContent[]
  cfg: GlobalConfiguration
  ctx: BuildCtx
  [key: string]: unknown
}) => VirtualPage[]

/** A function that mutates a HAST tree at render time, when allFiles is available. */
export type TreeTransform = (
  root: Root,
  slug: FullSlug,
  componentData: QuartzComponentProps,
) => void

export type QuartzPageTypePlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzPageTypePluginInstance

export interface QuartzPageTypePluginInstance extends PluginHooks {
  name: string
  priority?: number
  fileExtensions?: string[]
  match: PageMatcher
  generate?: PageGenerator
  layout: string
  /** Optional page frame name (e.g. "default", "full-width", "minimal"). Defaults to "default". */
  frame?: string
  body: QuartzComponentConstructor
  /** Optional render-time HAST tree transforms (e.g. resolving inline codeblocks). */
  treeTransforms?: (ctx: BuildCtx) => TreeTransform[]
}

// Structural supertype accepted in plugin configuration arrays.
// Community plugins use a differently-branded FullSlug in their PageMatcher,
// making them incompatible with the internal PageMatcher under strict
// function-parameter contravariance. This wider entry type avoids forcing
// casts in quartz.ts while the dispatcher safely calls match/generate
// with the correct arguments at runtime.
export interface PageTypePluginEntry {
  name: string
  priority?: number
  fileExtensions?: string[]
  match: (...args: never[]) => boolean
  generate?: (...args: never[]) => VirtualPage[]
  layout: string
  /** Optional page frame name (e.g. "default", "full-width", "minimal"). Defaults to "default". */
  frame?: string
  body: QuartzComponentConstructor
  treeTransforms?: (...args: never[]) => TreeTransform[]
}

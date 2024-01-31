import { ComponentType, JSX } from "preact"
import { StaticResources } from "../util/resources"
import { QuartzPluginData } from "../plugins/vfile"
import { GlobalConfiguration } from "../cfg"
import { Node } from "hast"

export type QuartzComponentProps = {
  externalResources: StaticResources
  fileData: QuartzPluginData
  cfg: GlobalConfiguration
  children: (QuartzComponent | JSX.Element)[]
  tree: Node
  allFiles: QuartzPluginData[]
  displayClass?: "mobile-only" | "desktop-only"
} & JSX.IntrinsicAttributes & {
    [key: string]: any
  }

export type QuartzComponent = ComponentType<QuartzComponentProps> & {
  css?: string
  beforeDOMLoaded?: string
  afterDOMLoaded?: string
}

export type QuartzComponentConstructor<Options extends object | undefined = undefined> = (
  opts: Options,
) => QuartzComponent

export type IconFolderOptions = {
  /** Icon root folder, ie `quartz/static/icon`
   * Set to `undefined` to disable (default)
   */
  rootIconFolder?: string
  /** Default icon if needed */
  default: {
    /** Default icon for file, used in ArticleTitle for example, without root rootIconFolder string
     * e.g. `file`
     * set disable to only use the frontmatter icon
     */
    file?: string
    /** Default icon for folder, used in Explorer, without root rootIconFolder string
     * e.g. `folder`
     * set disable to don't use folder icon before title
     * For index, they will use the frontmatter icon if exists
     */
    folder?: string
  }
}

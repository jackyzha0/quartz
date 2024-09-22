import { QuartzTransformerPlugin } from "../types"
import {
  Root,
  Html,
  BlockContent,
  DefinitionContent,
  Paragraph,
  Code,
  Text,
  Link,
  Parent,
} from "mdast"
import { Element, Literal, Root as HtmlRoot } from "hast"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import rehypeRaw from "rehype-raw"
import { SKIP, visit } from "unist-util-visit"
import path from "path"
import { splitAnchor } from "../../util/path"
import { JSResource } from "../../util/resources"
// @ts-ignore
import calloutScript from "../../components/scripts/callout.inline.ts"
// @ts-ignore
import checkboxScript from "../../components/scripts/checkbox.inline.ts"
import { FilePath, pathToRoot, slugTag, slugifyFilePath } from "../../util/path"
import { toHast } from "mdast-util-to-hast"
import { toHtml } from "hast-util-to-html"
import { PhrasingContent } from "mdast-util-find-and-replace/lib"
import { capitalize } from "../../util/lang"
import { Pluggable, PluggableList } from "unified"
import { Node } from "unist"
import { VFile } from "vfile"
import { BuildVisitor } from "unist-util-visit"
import remarkGfm from "remark-gfm"
import smartypants from "remark-smartypants"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

import { GitHubLinkheadings, GitHubSmartypants } from "../parsers/github"

import {
  ObsidianArrow,
  ObsidianBlockReference,
  ObsidianCallouts,
  ObsidianCheckboxes,
  ObsidianComments,
  ObsidianHighlights,
  ObsidianHtml,
  ObsidianMermaid,
  ObsidianTags,
  ObsidianVideo,
  ObsidianWikilinks,
  ObsidianYouTube,
} from "../parsers/obsidian"

export interface CommonMarkOptions {
  option1: Boolean
}

const defaultCommonMarkOptions: CommonMarkOptions = {
  option1: true,
}

export interface CustomOptions {
  option1: Boolean
}

const defaultCustomOptions: CustomOptions = {
  option1: true,
}

export interface GitHubOptions {
  enableSmartyPants: boolean
  linkHeadings: boolean
}

const defaultGitHubOptions: GitHubOptions = {
  enableSmartyPants: true,
  linkHeadings: true,
}

export interface ObsidianOptions {
  comments: boolean
  highlight: boolean
  wikilinks: boolean
  callouts: boolean
  mermaid: boolean
  parseTags: boolean
  parseArrows: boolean
  parseBlockReferences: boolean
  enableInHtmlEmbed: boolean
  enableYouTubeEmbed: boolean
  enableVideoEmbed: boolean
  enableCheckbox: boolean
}

const defaultObsidianOptions: ObsidianOptions = {
  comments: true,
  highlight: true,
  wikilinks: true,
  callouts: true,
  mermaid: true,
  parseTags: true,
  parseArrows: true,
  parseBlockReferences: true,
  enableInHtmlEmbed: false,
  enableYouTubeEmbed: true,
  enableVideoEmbed: true,
  enableCheckbox: false,
}

export interface OxHugoOptions {
  /** Replace {{ relref }} with quartz wikilinks []() */
  wikilinks: boolean
  /** Remove pre-defined anchor (see https://ox-hugo.scripter.co/doc/anchors/) */
  removePredefinedAnchor: boolean
  /** Remove hugo shortcode syntax */
  removeHugoShortcode: boolean
  /** Replace <figure/> with ![]() */
  replaceFigureWithMdImg: boolean

  /** Replace org latex fragments with $ and $$ */
  replaceOrgLatex: boolean
}

const defaultOxHugoOptions: OxHugoOptions = {
  wikilinks: true,
  removePredefinedAnchor: true,
  removeHugoShortcode: true,
  replaceFigureWithMdImg: true,
  replaceOrgLatex: true,
}

export interface RoamOptions {
  orComponent: boolean
  TODOComponent: boolean
  DONEComponent: boolean
  videoComponent: boolean
  audioComponent: boolean
  pdfComponent: boolean
  blockquoteComponent: boolean
  tableComponent: boolean
  attributeComponent: boolean
}

const defaultRoamOptions: RoamOptions = {
  orComponent: true,
  TODOComponent: true,
  DONEComponent: true,
  videoComponent: true,
  audioComponent: true,
  pdfComponent: true,
  blockquoteComponent: true,
  tableComponent: true,
  attributeComponent: true,
}

export const mdastToHtml = (ast: PhrasingContent | Paragraph) => {
  const hast = toHast(ast, { allowDangerousHtml: true })!
  return toHtml(hast, { allowDangerousHtml: true })
}

export const mdastFindReplaceInHtml = (
  tree: Root,
  replacements: [RegExp, string | ReplaceFunction][],
  inHtml: Boolean,
) => {
  if (inHtml) {
    visit(tree, "html", (node: Html) => {
      for (const [regex, replace] of replacements) {
        if (typeof replace === "string") {
          node.value = node.value.replace(regex, replace)
        } else {
          node.value = node.value.replace(regex, (substring: string, ...args) => {
            const replaceValue = replace(substring, ...args)
            if (typeof replaceValue === "string") {
              return replaceValue
            } else if (Array.isArray(replaceValue)) {
              return replaceValue.map(mdastToHtml).join("")
            } else if (typeof replaceValue === "object" && replaceValue !== null) {
              return mdastToHtml(replaceValue)
            } else {
              return substring
            }
          })
        }
      }
    })
  } else {
    mdastFindReplace(tree, replacements)
  }
}

export const CommonMarkFlavoredMarkdown: QuartzTransformerPlugin<Partial<CommonMarkOptions>> = (
  userOpts,
) => {
  const opts = { ...defaultCommonMarkOptions, ...userOpts }
  return {
    name: "CommonMarkFlavoredMarkdown",
    textTransform(ctx, src) {
      return src
    },
    markdownPlugins(ctx) {
      const plugins: PluggableList = []

      return plugins
    },
    htmlPlugins() {
      const plugins: PluggableList = []

      return plugins
    },
    externalResources() {
      const js: JSResource[] = []

      return { js }
    },
  }
}

export const CustomFlavoredMarkdown: QuartzTransformerPlugin<Partial<CustomOptions>> = (
  userOpts,
) => {
  const opts = { ...defaultCustomOptions, ...userOpts }
  return {
    name: "CustomFlavoredMarkdown",
    textTransform(ctx, src) {
      return src
    },
    markdownPlugins(ctx) {
      const plugins: PluggableList = []

      return plugins
    },
    htmlPlugins() {
      const plugins: PluggableList = []

      return plugins
    },
    externalResources() {
      const js: JSResource[] = []

      return { js }
    },
  }
}

export const GitHubFlavoredMarkdown: QuartzTransformerPlugin<Partial<GitHubOptions>> = (
  userOpts,
) => {
  const opts = { ...defaultGitHubOptions, ...userOpts }
  return {
    name: "GitHubFlavoredMarkdown",
    /*textTransform(ctx, src) {
      return src
    },*/
    markdownPlugins() {
      const plugins: PluggableList = [remarkGfm]

      plugins.push(
        GitHubSmartypants({ enabled: opts.enableSmartyPants }).markdownPlugins() as Pluggable,
      )

      return plugins
    },
    htmlPlugins() {
      const plugins: PluggableList = []

      plugins.push(GitHubLinkheadings({ enabled: opts.linkHeadings }).htmlPlugins())

      return plugins
    },
    /*externalResources() {
      const js: JSResource[] = []

      return { js }
    },*/
  }
}

export const ObsidianFlavoredMarkdown: QuartzTransformerPlugin<Partial<ObsidianOptions>> = (
  userOpts,
) => {
  const opts = { ...defaultObsidianOptions, ...userOpts }
  return {
    name: "ObsidianFlavoredMarkdown",
    textTransform(ctx, src) {
      src = ObsidianComments({ enabled: opts.comments }).textTransform(ctx, src)
      src = ObsidianCallouts({ enabled: opts.callouts }).textTransform(ctx, src)
      src = ObsidianWikilinks({ enabled: opts.wikilinks }).textTransform(ctx, src)

      return src
    },
    markdownPlugins(_ctx) {
      const plugins: PluggableList = []

      plugins.push((tree: Root, file) => {
        const replacements: [RegExp, string | ReplaceFunction][] = []
        if (file !== undefined && file.data !== undefined) {
          const base = pathToRoot(file.data.slug!)
        }

        replacements.push(
          ObsidianWikilinks({ enabled: opts.wikilinks }).markdownPlugins() as [
            RegExp,
            string | ReplaceFunction,
          ],
        )
        replacements.push(
          ObsidianHighlights({ enabled: opts.highlight }).markdownPlugins() as [
            RegExp,
            string | ReplaceFunction,
          ],
        )
        replacements.push(
          ObsidianArrow({ enabled: opts.parseArrows }).markdownPlugins() as [
            RegExp,
            string | ReplaceFunction,
          ],
        )
        replacements.push(
          ObsidianTags({ enabled: opts.parseTags }).markdownPlugins() as [
            RegExp,
            string | ReplaceFunction,
          ],
        )

        /*ObsidianHtml({ enabled: opts.enableInHtmlEmbed }).markdownPlugins(
              tree,
              undefined,
              replacements,
            )*/

        mdastFindReplace(tree, replacements)
      })

      /*plugins.push(() => {
        return (tree: Root, file) =>
          ObsidianVideo({ enabled: opts.enableVideoEmbed }).markdownPlugins(tree)
      })
      plugins.push(() => {
        return (tree: Root, file) =>
          ObsidianCallouts({ enabled: opts.callouts }).markdownPlugins(tree)
      })
      plugins.push(() => {
        return (tree: Root, file) =>
          ObsidianMermaid({ enabled: opts.mermaid }).markdownPlugins(tree)
      })*/

      return plugins
    },
    htmlPlugins() {
      const plugins: PluggableList = [rehypeRaw]

      plugins.push(() => {
        return (tree: HtmlRoot, file) =>
          ObsidianBlockReference({ enabled: opts.parseBlockReferences }).htmlPlugins(tree, file)
      })
      plugins.push(() => {
        return (tree: HtmlRoot, file) =>
          ObsidianYouTube({ enabled: opts.enableYouTubeEmbed }).htmlPlugins(tree, file)
      })
      /*plugins.push(() => {
        return (tree: HtmlRoot, file) => ObsidianCheckboxes({ enabled: opts.enableCheckbox }).htmlPlugins() as Pluggable}
      )*/

      return plugins
    },
    externalResources() {
      const js: JSResource[] = []

      js.push(
        ObsidianCheckboxes({ enabled: opts.enableCheckbox }).externalResources() as JSResource,
      )
      js.push(ObsidianCallouts({ enabled: opts.callouts }).externalResources() as JSResource)
      js.push(ObsidianMermaid({ enabled: opts.mermaid }).externalResources() as JSResource)

      return { js }
    },
  }
}

export const OxHugoFlavoredMarkdown: QuartzTransformerPlugin<Partial<OxHugoOptions>> = (
  userOpts,
) => {
  const opts = { ...defaultOxHugoOptions, ...userOpts }
  return {
    name: "OxHugoFlavoredMarkdown",
    textTransform(ctx, src) {
      return src
    },
    markdownPlugins(ctx) {
      const plugins: PluggableList = []

      return plugins
    },
    htmlPlugins() {
      const plugins: PluggableList = []

      return plugins
    },
    externalResources() {
      const js: JSResource[] = []

      return { js }
    },
  }
}

export const RoamFlavoredMarkdown: QuartzTransformerPlugin<Partial<RoamOptions> | undefined> = (
  userOpts,
) => {
  const opts = { ...defaultRoamOptions, ...userOpts }
  return {
    name: "RoamFlavoredMarkdown",
    textTransform(ctx, src) {
      return src
    },
    markdownPlugins(ctx) {
      const plugins: PluggableList = []

      return plugins
    },
    htmlPlugins() {
      const plugins: PluggableList = []

      return plugins
    },
    externalResources() {
      const js: JSResource[] = []

      return { js }
    },
  }
}

declare module "vfile" {
  interface DataMap {
    blocks: Record<string, Element>
    htmlAst: HtmlRoot
  }
}

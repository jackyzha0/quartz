import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { Element, Root as HtmlRoot } from "hast"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import rehypeRaw from "rehype-raw"
import { JSResource } from "../../util/resources"
import { pathToRoot } from "../../util/path"
import { PluggableList } from "unified"

import { arrowRegexReplacement } from "./obsidian/arrows"
import { blockReferencePlugin } from "./obsidian/blockReferences"
import { calloutPlugin, calloutResources, calloutTextTransform } from './obsidian/callouts';
import { checkboxPlugin, checkboxResources } from "./obsidian/checkbox"
import { commentsTextTransform } from './obsidian/comments';
import { markdownHTMLEmbedReplacements } from "./obsidian/embedHTML"
import { videoEmbedPlugin } from "./obsidian/embedVideo"
import { embedYoutubePlugin } from "./obsidian/embedYoutube"
import { highlightRegexReplacement } from "./obsidian/highlights"
import { mermaidPlugin, mermaidResources } from "./obsidian/mermaid"
import { tagsRegexReplacement } from "./obsidian/tags"
import { customTaskStatusPlugin } from "./obsidian/tasks"
import { wikilinkRegexReplacment, wikilinkTextTransform } from "./obsidian/wikilinks"

export interface Options {
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
  taskStatusStyling: boolean
}

const defaultOptions: Options = {
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
  taskStatusStyling: true,
}

export const ObsidianFlavoredMarkdown: QuartzTransformerPlugin<Partial<Options> | undefined> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "ObsidianFlavoredMarkdown",
    textTransform(_ctx, src: string | Buffer) {
      if (opts.comments) commentsTextTransform(src);
      if (opts.callouts) calloutTextTransform(src);
      if (opts.wikilinks) wikilinkTextTransform(src);
      return src
    },
    markdownPlugins(ctx) {
      const plugins: PluggableList = []

      // regex replacements
      plugins.push(() => {
        return (tree: Root, file) => {
          const replacements: [RegExp, string | ReplaceFunction][] = []
          const base = pathToRoot(file.data.slug!)

          if (opts.wikilinks) replacements.push(wikilinkRegexReplacment)
          if (opts.highlight) replacements.push(highlightRegexReplacement)
          if (opts.parseArrows) replacements.push(arrowRegexReplacement)
          if (opts.parseTags) replacements.push(tagsRegexReplacement(file, base))
          if (opts.enableInHtmlEmbed) markdownHTMLEmbedReplacements(tree, replacements)

          mdastFindReplace(tree, replacements)
        }
      })

      if (opts.enableVideoEmbed) plugins.push(videoEmbedPlugin)
      if (opts.callouts) plugins.push(calloutPlugin)
      if (opts.mermaid) plugins.push(mermaidPlugin)
      if (opts.taskStatusStyling) plugins.push(customTaskStatusPlugin)

      return plugins;
    },

    htmlPlugins() {
      const plugins: PluggableList = [rehypeRaw]

      if (opts.parseBlockReferences) plugins.push(blockReferencePlugin)
      if (opts.enableYouTubeEmbed) plugins.push(embedYoutubePlugin)
      if (opts.enableCheckbox) plugins.push(checkboxPlugin);

      return plugins
    },

    externalResources() {
      const js: JSResource[] = []

      if (opts.enableCheckbox) checkboxResources(js)
      if (opts.callouts) calloutResources(js)
      if (opts.mermaid) mermaidResources(js)

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

declare module "mdast" {
  interface ListItem {
    marker: string
  }
}

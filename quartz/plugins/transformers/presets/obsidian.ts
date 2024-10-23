import { QuartzTransformerPlugin } from "../../types"
import * as Text from "../text"
import * as Markdown from "../markdown"
import * as Html from "../html"
import * as Resources from "../resources"

export const ObsidianPreset: QuartzTransformerPlugin = () => {
  return {
    textTransformers: [
      Text.ObsidianFlavoredMarkdownComments(),
      Text.ObsidianFlavoredMarkdownCallouts(),
      Text.ObsidianFlavoredMarkdownWikilinks(),
    ],
    markdownTransformers: [
      Markdown.FrontMatter(),
      Markdown.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Markdown.ObsidianFlavoredMarkdownWikilinks(),
      Markdown.ObsidianFlavoredMarkdownHighlight(),
      Markdown.ObsidianFlavoredMarkdownArrow(),
      Markdown.ObsidianFlavoredMarkdownTags(),
      Markdown.ObsidianFlavoredMarkdownVideoEmbed(),
      Markdown.ObsidianFlavoredMarkdownCallouts(),
      Markdown.ObsidianFlavoredMarkdownMermaid(),
      Markdown.TableOfContents(),
      Markdown.Latex(),
    ],
    htmlTransformers: [
      Html.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Html.ObsidianFlavoredMarkdownBlockReferences(),
      Html.ObsidianFlavoredMarkdownYouTubeEmbed(),
      Html.ObsidianFlavoredMarkdownCheckbox(),
      Html.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Html.Description(),
      Html.Latex({ renderEngine: "katex" }),
    ],
    externalResources: [
      Resources.ObsidianFlavoredMarkdownCheckbox(),
      Resources.ObsidianFlavoredMarkdownCallouts(),
      Resources.ObsidianFlavoredMarkdownMermaid(),
      Resources.Latex({ renderEngine: "katex" }),
    ],
  }
}

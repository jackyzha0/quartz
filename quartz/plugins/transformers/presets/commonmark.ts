import { QuartzTransformerPlugin } from "../../types"
import * as Text from "../text"
import * as Markdown from "../markdown"
import * as Html from "../html"
import * as Resources from "../resources"

// TODO: commonmark compatibility pass
export const CommonMarkPreset: QuartzTransformerPlugin = () => {
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
      // TODO: regular markdown links
      //Markdown.ObsidianFlavoredMarkdownWikilinks(),
      Markdown.ObsidianFlavoredMarkdownHighlight(),
      Markdown.ObsidianFlavoredMarkdownArrow(),
      Markdown.ObsidianFlavoredMarkdownTags(),
      Markdown.ObsidianFlavoredMarkdownVideoEmbed(),
      Markdown.ObsidianFlavoredMarkdownCallouts(),
      Markdown.ObsidianFlavoredMarkdownMermaid(),
      Markdown.GitHubFlavoredMarkdownRemark(),
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
      Html.GitHubFlavoredMarkdownLinkHeadings(),
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

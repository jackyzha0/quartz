import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import * as Text from "./quartz/plugins/transformers/text"
import * as Markdown from "./quartz/plugins/transformers/markdown"
import * as Html from "./quartz/plugins/transformers/html"
import * as Resources from "./quartz/plugins/transformers/resources"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🪴 Quartz 4.0",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: {
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
    },
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config

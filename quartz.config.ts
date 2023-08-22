import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Pelayo Arbués",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "pelayoarbues.github.io",
    ignorePatterns: ["private", "templates"],
    theme: {
      typography: {
        header: "Newsreader",
        body: "Spectral",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#F8F6F2",
          lightgray: "#E7E5E0",
          gray: "#707070",
          darkgray: "#D2D0C9",
          dark: "#0E0A14",
          secondary: "#63767F",
          tertiary: "#8EBCB7",
          highlight: "#FFD17D",
        },
        darkMode: {
          light: "#27262c",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#6F6F6F",
          dark: "#E6E2D3",
          secondary: "#7A9DB9",
          tertiary: "#A0B1A8",
          highlight: "r#F2B579",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"], // you can add 'git' here for last modified from Git but this makes the build slower
      }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
    ],
  },
}

export default config

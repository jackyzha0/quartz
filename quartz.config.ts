import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "jahinzee",
    enableSPA: false,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "jahinzee.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "published",
    theme: {
      typography: {
        header: "Fira Sans Medium",
        body: "Fira Sans",
        code: "Fira Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#252525",
          dark: "#000000",
          secondary: "#5454b4",
          tertiary: "#3f3f86",
          highlight: "rgba(#5454b4, 0.15)",
        },
        darkMode: {
          light: "#000000",
          lightgray: "#252525",
          gray: "#b8b8b8",
          darkgray: "#e5e5e5",
          dark: "#ffffff",
          secondary: "#9292da",
          tertiary: "#ababff",
          highlight: "rgba(#9292da, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        // you can add 'git' here for last modified from Git
        // if you do rely on git for dates, ensure defaultDateType is 'modified'
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Latex({ renderEngine: "katex" }),
      // Plugin.Description(),
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
      Plugin.NotFoundPage(),
    ],
  },
}

export default config

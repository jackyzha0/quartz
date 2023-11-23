import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Forgetful Notes",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "forgetfulnotes.com",
    ignorePatterns: ["private", "templates"],
    defaultDateType: "created",
    theme: {
      typography: {
        header: "Bitter", // Schibsted Grotesk
        body: "Bitter", // Source Sans Pro, Poppins
        code: "Fira Mono", // IBM Plex Mono
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#2e2e2e", // #4e4e4e
          dark: "#1c1c1c", // #2b2b2b
          secondary: "#091217", // #2844b63, #152733
          tertiary: "#242e3b", // #84a59d
          highlight: "rgba(143, 159, 169, 0.15)", // #8f9fa926
        },
        darkMode: {
          light: "#1e1e2e",
          lightgray: "#6c7086",
          gray: "#a6adc8",
          darkgray: "#cdd6f4",
          dark: "#cdd6f4",
          secondary: "#9be895", // #a6e3a1
          tertiary: "#d62edf", // #89dceb, #c072c4
          highlight: "rgba(143, 159, 169, 0.1)", // rgba(143, 159, 169, 0.15)
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents({ collapseByDefault: true }),
      // Plugin.CreatedModifiedDate({ priority: ["frontmatter", "filesystem"], }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      // Plugin.Latex({ renderEngine: "katex" }),
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
      Plugin.NotFoundPage(),
    ],
  },
}

export default config

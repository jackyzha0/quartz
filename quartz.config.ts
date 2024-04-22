import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Forgetful Notes",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "forgetfulnotes.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Bitter", // Schibsted Grotesk
        body: "Poppins", // Source Sans Pro
        code: "Fira Mono", // IBM Plex Mono
      },
      colors: {
        lightMode: {
          light: "#faf8f8", // background
          lightgray: "#e5e5e5", // borders
          gray: "#8f8f8f", // graph links, heavy borders
          darkgray: "#2e2e2e", // body text
          dark: "#1c1c1c", // header text, icons
          secondary: "#091217", // links, nodes
          tertiary: "#AA336A", // hover states, visited
          highlight: "rgba(143, 159, 169, 0.2)", // internal link background
        },
        darkMode: {
          light: "#1e1e2e", // background
          lightgray: "#6c7086", // borders
          gray: "#a6adc8", // graph links, heavy borders
          darkgray: "#cdd6f4", // body text
          dark: "#cdd6f4", // header text, icons
          secondary: "#9be895", // links, nodes
          tertiary: "#c072c4", // hover states, visited
          highlight: "rgba(143, 159, 169, 0.2)", // internal link background
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown(),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
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

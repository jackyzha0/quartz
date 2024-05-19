import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "📝 Matrix Notes",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-IN",
    baseUrl: "notes.trixtertempdrive.eu.org",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Montserrat",
        body: "Karla",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#ebeef9",          // Background color
          lightgray: "#aab7d5",      // Surface color
          gray: "#a6adc1",           // Mid-tone gray for borders and dividers
          darkgray: "#6e738a",       // Dark gray for text
          dark: "#565c71",           // Near-black for highlights and important elements
          secondary:"#7a5fb7",      // Slightly darker lavender for links and secondary actions
          tertiary: "#78b0a0",       // Muted teal for tertiary elements
          highlight: "rgba(122, 95, 183, 0.15)"// Lighter shade of secondary with transparency
        },
        darkMode: {
          light: "#1d1f30",          // Background color
          lightgray: "#333546",      // Surface color
          gray: "#3f4254",           // Mid-tone gray for borders and dividers
          darkgray: "#b0b2c3",       // Light gray for text
          dark: "#e8eaf4",           // Near-white for highlights and important elements
          secondary: "#4db8b6",      // Teal for links and secondary actions
          tertiary: "#f3d250",       // Muted yellow for tertiary elements
          highlight: "rgba(77, 184, 182, 0.15)" // Teal highlight with opacity
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
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
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

import {QuartzConfig} from "./quartz/cfg"
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
    defaultDateType: "created",
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
          light: "#F8F8F8",
          lightgray: "#E5E5E5",
          gray: "#B8B8B8", // #8F8F8F
          darkgray: "#4E4E4E", // #2E2E2E
          dark: "#2B2B2B", // #1C1C1C
          secondary: "#284B63", // #091217
          tertiary: "#84A59D", // #AA336A
          highlight: "#8F9FA925",
        },
        darkMode: {
          light: "#1E1E2E", // background // #161618
          lightgray: "#6C7086", // borders // #393639
          gray: "#A6ADC8", // graph links, heavy borders // #646464
          darkgray: "#CDD6F4", // body text // #D4D4D4
          dark: "#CDD6F4", // header text, icons // #EBEBEC
          secondary: "#9BE895", // links, nodes // #7B97AA
          tertiary: "#C072C4", // hover states, visited links // #84A59D
          highlight: "#8F9FA925", // internal link background
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
      Plugin.Latex({renderEngine: "katex"}),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({enableInHtmlEmbed: false}),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({markdownLinkResolution: "shortest"}),
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

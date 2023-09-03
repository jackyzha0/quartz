import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    defaultDateType: "published",
    pageTitle: "🌱 be-far",
    enableSPA: false,
    enablePopovers: true,
    analytics: null,
    baseUrl: "be-far.com",
    ignorePatterns: ["private", "**/templates"],
    theme: {
      typography: {
        header: "Lora",
        body: "Inter",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#eff1f5",
          lightgray: "#dce0e8",
          gray: "#8c8fa1",
          darkgray: "#4c4f69",
          dark: "#4f4f7f",
          secondary: "#40a02b",
          tertiary: "#209fb5",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "#1e1e2e",
          lightgray: "#6c7086",
          gray: "#a6adc8",
          darkgray: "#cdd6f4",
          dark: "#cdd6f4",
          secondary: "#a6e3a1",
          tertiary: "#89dceb",
          highlight: "rgba(143, 159, 169, 0.15)",
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
      Plugin.Remark42({ host: "https://be-far.com/comments", site_id: "remark", theme: "dark", no_footer: true }),
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

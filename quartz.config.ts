import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    defaultDateType: "modified",
    pageTitle: "🌱 Projects & Privacy",
    enableSPA: true,
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
          light: "#dce0e8", // Backg
          lightgray: "#bcc0cc", // Code Backg
          gray: "#8c8fa1", // Unread nodes and subtitles
          darkgray: "#4c4f69", // Text
          dark: "#4c4f69", // Code text
          secondary: "#40a02b", // Links, title, and current node
          tertiary: "#209fb5", // Visited nodes
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "#292c3c",// Backg
          lightgray: "#6c7086", // Code Backg
          gray: "#a6adc8", // Unread nodes and subtitles
          darkgray: "#cdd6f4", // Text
          dark: "#cdd6f4", // Code text
          secondary: "#a6e3a1", // Links, title, and current node
          tertiary: "#89dceb", // Visited nodes
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
        priority: ["frontmatter"], // you can add 'git' here for last modified from Git but this makes the build slower
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
      Plugin.NotFoundPage(),
    ],
  },
}

export default config

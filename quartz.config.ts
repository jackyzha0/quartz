import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

// adapted from:
// https://github.com/catppuccin/catppuccin#-palette
const mocha = {
  light:     "#11111b", // Mocha/Crust
  lightgray: "#1e1e2e", // Mocha/Base
  gray:      "#585b70", // Mocha/Surface2
  darkgray:  "#a6adc8", // Mocha/Subtext0
  dark:      "#cdd6f4", // Mocha/Text
  secondary: "#f5e0dc", // Mocha/Flamingo
  tertiary:  "#f5e0dc", // Mocha/Rosewater
  highlight: "#313244", // Mocha/Surface0
};

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
        lightMode: mocha,
        darkMode: mocha
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

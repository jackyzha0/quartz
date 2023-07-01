import { PageLayout, QuartzConfig } from "./quartz/cfg"
import * as Component from "./quartz/components"
import * as Plugin from "./quartz/plugins"

const sharedPageComponents = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Spacer(),
    Component.Search(),
    Component.Darkmode()
  ],
  footer: Component.Footer({
    authorName: "Jacky",
    links: {
      "GitHub": "https://github.com/jackyzha0",
      "Twitter": "https://twitter.com/_jzhao"
    }
  })
}

const contentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ReadingTime(),
    Component.TagList(),
  ],
  left: [],
  right: [
    Component.Graph(),
    Component.TableOfContents(),
    Component.Backlinks()
  ],
}

const listPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle()
  ],
  left: [],
  right: [],
}

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🪴 Quartz 4.0",
    enableSPA: true,
    enablePopovers: true,
    canonicalUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates"],
    theme: {
      typography: { // loaded from Google Fonts
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: '#faf8f8',
          lightgray: '#e8e8e8',
          gray: '#dadada',
          darkgray: '#4e4e4e',
          dark: '#141021',
          secondary: '#284b63',
          tertiary: '#84a59d',
          highlight: 'rgba(143, 159, 169, 0.15)',
        },
        darkMode: {
          light: '#161618',
          lightgray: '#292629',
          gray: '#343434',
          darkgray: '#d4d4d4',
          dark: '#fbfffe',
          secondary: '#7b97aa',
          tertiary: '#84a59d',
          highlight: 'rgba(143, 159, 169, 0.15)',
        },
      }
    }
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        priority: ['frontmatter', 'filesystem'] // you can add 'git' here for last modified from Git but this makes the build slower
      }),
      Plugin.ObsidianFlavoredMarkdown(),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks(),
      Plugin.SyntaxHighlighting(),
      Plugin.Katex(),
      Plugin.Description(),
    ],
    filters: [
      Plugin.RemoveDrafts(),
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ContentPage({
        ...sharedPageComponents,
        ...contentPageLayout,
        pageBody: Component.Content(),
      }),
      Plugin.TagPage({
        ...sharedPageComponents,
        ...listPageLayout,
        pageBody: Component.TagContent(),
      }),
      Plugin.FolderPage({
        ...sharedPageComponents,
        ...listPageLayout,
        pageBody: Component.FolderContent(),
      }),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
    ]
  },
}

export default config

import { QuartzConfig } from "./quartz/cfg"
import * as Component from "./quartz/components"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    enableSPA: true,
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
      Plugin.Description(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        priority: ['frontmatter', 'filesystem'] // you can add 'git' here for last modified from Git but this makes the build slower
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.ObsidianFlavoredMarkdown(),
      Plugin.ResolveLinks(),
      Plugin.SyntaxHighlighting(),
      Plugin.Katex(),
    ],
    filters: [
      Plugin.RemoveDrafts()
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ContentPage({
        head: Component.Head(),
        header: [
          Component.PageTitle({ title: "🪴 Quartz 4.0" }),
          Component.Spacer(),
          Component.Darkmode()
        ],
        beforeBody: [
          Component.ArticleTitle(),
          Component.ReadingTime(),
          Component.TagList(),
        ],
        content: Component.Content(),
        left: [
        ],
        right: [
          Component.Graph(),
          Component.TableOfContents(),
        ],
        footer: []
      }),
      Plugin.ContentIndex(), // you can exclude this if you don't plan on using popovers, graph, or backlinks,
      Plugin.CNAME({ domain: "yoursite.xyz" }) // set this to your final deployed domain
    ]
  },
}

export default config

import { QuartzConfig } from "./quartz/cfg"
import * as Component from "./quartz/components"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    siteTitle: "🪴 Quartz 4.0",
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
          light: '#1e1e21',
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
      new Plugin.FrontMatter(),
      new Plugin.Description(),
      new Plugin.TableOfContents({ showByDefault: true }),
      new Plugin.CreatedModifiedDate({
        priority: ['frontmatter', 'filesystem'] // you can add 'git' here for last modified from Git but this makes the build slower
      }),
      new Plugin.GitHubFlavoredMarkdown(),
      new Plugin.ObsidianFlavoredMarkdown(),
      new Plugin.ResolveLinks(),
      new Plugin.SyntaxHighlighting(),
      new Plugin.Katex(),
    ],
    filters: [
      new Plugin.RemoveDrafts()
    ],
    emitters: [
      new Plugin.ContentPage({
        head: Component.Head,
        header: [Component.PageTitle, Component.Spacer, Component.Darkmode],
        body: [Component.ArticleTitle, Component.ReadingTime, Component.TableOfContents, Component.Content]
      })
    ]
  },
}

export default config

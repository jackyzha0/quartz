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
      Plugin.FrontMatter(),
      Plugin.Description(),
      Plugin.TableOfContents({ showByDefault: true }),
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
      Plugin.ContentPage({
        head: Component.Head(),
        header: [Component.PageTitle(), Component.Spacer(), Component.Darkmode()],
        body: [Component.ArticleTitle(), Component.ReadingTime(), Component.TableOfContents(), Component.Content()]
      })
    ]
  },
}

export default config

import { buildQuartz } from "./quartz"
import { ContentPage, CreatedModifiedDate, Description, FrontMatter, GitHubFlavoredMarkdown, Katex, RemoveDrafts } from "./quartz/plugins"

export default buildQuartz({
  configuration: {
    siteTitle: "🪴 Quartz 4.0",
    prettyLinks: true,
    markdownLinkResolution: 'absolute',
    enableLatex: true,
    enableSPA: true,
    ignorePatterns: [],
  },
  plugins: {
    transformers: [
      new FrontMatter(),
      new GitHubFlavoredMarkdown(),
      new Katex(),
      new Description(),
      new CreatedModifiedDate()
    ],
    filters: [
      new RemoveDrafts()
    ],
    emitters: [
      new ContentPage()
    ]
  },
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
})

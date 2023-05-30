import { PluginTypes } from "./plugins"

export interface ColorScheme {
  light: string,
  lightgray: string,
  gray: string,
  darkgray: string,
  dark: string,
  secondary: string,
  tertiary: string,
  highlight: string
}

export interface QuartzConfig {
  configuration: {
    siteTitle: string,
    /** How to resolve Markdown paths */
    markdownLinkResolution: 'absolute' | 'relative'
    /** Strips folders from a link so that it looks nice */
    prettyLinks: boolean
    /** Whether to process and render latex (increases bundle size) */
    enableLatex: boolean,
    /** Whether to enable single-page-app style rendering. this prevents flashes of unstyled content and improves smoothness of Quartz */
    enableSPA: boolean,
    /** Glob patterns to not search */
    ignorePatterns: string[],
  },
  plugins: PluginTypes,
  theme: {
    typography: {
      header: string,
      body: string,
      code: string
    },
    colors: {
      lightMode: ColorScheme,
      darkMode: ColorScheme
    }
  }
}

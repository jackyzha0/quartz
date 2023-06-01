import { PluginTypes } from "./plugins/types"
import { Theme } from "./theme"

export interface GlobalConfiguration {
  siteTitle: string,
  /** Whether to enable single-page-app style rendering. this prevents flashes of unstyled content and improves smoothness of Quartz */
  enableSPA: boolean,
  /** Glob patterns to not search */
  ignorePatterns: string[],
  theme: Theme
}

export interface QuartzConfig {
  configuration: GlobalConfiguration,
  plugins: PluginTypes,
}

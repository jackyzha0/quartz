import { QuartzComponent } from "./components/types"
import { PluginTypes } from "./plugins/types"
import { Theme } from "./theme"

export interface GlobalConfiguration {
  /** Whether to enable single-page-app style rendering. this prevents flashes of unstyled content and improves smoothness of Quartz */
  enableSPA: boolean,
  /** Whether to display Wikipedia-style popovers when hovering over links */
  enablePopovers: boolean,
  /** Glob patterns to not search */
  ignorePatterns: string[],
  theme: Theme
}

export interface QuartzConfig {
  configuration: GlobalConfiguration,
  plugins: PluginTypes,
}

export interface FullPageLayout {
  head: QuartzComponent
  header: QuartzComponent[],
  beforeBody: QuartzComponent[],
  pageBody: QuartzComponent,
  left: QuartzComponent[],
  right: QuartzComponent[],
  footer: QuartzComponent,
}

export type PageLayout = Pick<FullPageLayout, "beforeBody" | "left" | "right">

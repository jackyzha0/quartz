import { ValidDateType } from "./components/Date"
import { QuartzComponent } from "./components/types"
import { PluginTypes } from "./plugins/types"
import { Theme } from "./util/theme"

export type Analytics =
  | null
  | {
      provider: "plausible"
      host?: string
    }
  | {
      provider: "google"
      tagId: string
    }
  | {
      provider: "umami"
      websiteId: string
      host?: string
    }

export interface GlobalConfiguration {
  pageTitle: string
  /** Whether to enable single-page-app style rendering. this prevents flashes of unstyled content and improves smoothness of Quartz */
  enableSPA: boolean
  /** Whether to display Wikipedia-style popovers when hovering over links */
  enablePopovers: boolean
  /** Analytics mode */
  analytics: Analytics
  /** Glob patterns to not search */
  ignorePatterns: string[]
  /** Whether to use created, modified, or published as the default type of date */
  defaultDateType: ValidDateType
  /** Base URL to use for CNAME files, sitemaps, and RSS feeds that require an absolute URL.
   *   Quartz will avoid using this as much as possible and use relative URLs most of the time
   */
  baseUrl?: string
  theme: Theme
  /**
   * Allow to translate the date in the language of your choice.
   * Also used for UI translation (default: en-US)
   * Need to be formated following the IETF language tag format (https://en.wikipedia.org/wiki/IETF_language_tag)
   */
  locale?: string
}

export interface QuartzConfig {
  configuration: GlobalConfiguration
  plugins: PluginTypes
}

export interface FullPageLayout {
  head: QuartzComponent
  header: QuartzComponent[]
  beforeBody: QuartzComponent[]
  pageBody: QuartzComponent
  left: QuartzComponent[]
  right: QuartzComponent[]
  footer: QuartzComponent
}

export type PageLayout = Pick<FullPageLayout, "beforeBody" | "left" | "right">
export type SharedLayout = Pick<FullPageLayout, "head" | "header" | "footer">

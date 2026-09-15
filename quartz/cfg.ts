import { QuartzComponent } from "./components/types"
import { ValidLocale } from "./i18n"
import { PluginSpecifier } from "./plugins/loader/types"
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
  | {
      provider: "goatcounter"
      websiteId: string
      host?: string
      scriptSrc?: string
    }
  | {
      provider: "posthog"
      apiKey: string
      host?: string
    }
  | {
      provider: "tinylytics"
      siteId: string
    }
  | {
      provider: "cabin"
      host?: string
    }
  | {
      provider: "clarity"
      projectId?: string
    }
  | {
      provider: "matomo"
      host: string
      siteId: string
    }
  | {
      provider: "vercel"
    }
  | {
      provider: "rybbit"
      siteId: string
      host?: string
    }

export interface GlobalConfiguration {
  pageTitle: string
  pageTitleSuffix?: string
  /** Whether to enable single-page-app style rendering. this prevents flashes of unstyled content and improves smoothness of Quartz */
  enableSPA: boolean
  /** Whether to display Wikipedia-style popovers when hovering over links */
  enablePopovers: boolean
  /** Analytics mode */
  analytics: Analytics
  /** Glob patterns to not search */
  ignorePatterns: string[]
  /** Base URL to use for CNAME files, sitemaps, and RSS feeds that require an absolute URL.
   *   Quartz will avoid using this as much as possible and use relative URLs most of the time
   */
  baseUrl?: string
  theme: Theme
  /**
   * Allow to translate the date in the language of your choice.
   * Also used for UI translation (default: en-US)
   * Need to be formatted following BCP 47: https://en.wikipedia.org/wiki/IETF_language_tag
   * The first part is the language (en) and the second part is the script/region (US)
   * Language Codes: https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
   * Region Codes: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  locale: ValidLocale
  /**
   * Controls which assets are copied to public/
   * - "all": Copy all non-markdown files (backwards compatible, default)
   * - "referenced": Only copy assets referenced by published pages
   */
  publishAssets?: "all" | "referenced"
}

export interface QuartzConfig {
  configuration: GlobalConfiguration
  plugins: PluginTypes
  externalPlugins?: PluginSpecifier[]
}

export interface FullPageLayout {
  head: QuartzComponent
  header: QuartzComponent[]
  beforeBody: QuartzComponent[]
  pageBody: QuartzComponent
  afterBody: QuartzComponent[]
  left: QuartzComponent[]
  right: QuartzComponent[]
  footer: QuartzComponent[]
  /** Page frame name (e.g. "default", "full-width", "minimal"). Defaults to "default". */
  frame?: string
}

export type PageLayout = Pick<FullPageLayout, "beforeBody" | "left" | "right">
export type SharedLayout = Pick<FullPageLayout, "head" | "header" | "footer" | "afterBody">

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
      script?: string
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
      apiHost?: string
      uiHost?: string
      personProfiles?: "always" | "never" | "identified_only"
      /** @deprecated Use `apiHost` instead. */
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
  /**
   * Fetch pages before their links are followed, so they open at once (works with and without
   * SPA routing). `viewport` (default): links on screen, while the browser is idle, and links
   * pointed at. `hover`: only links pointed at, focused or touched. `off`: never.
   */
  prefetch?: "viewport" | "hover" | "off"
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
  /** Built-in frontmatter parsing (title, tags, aliases, dates, …). See docs/features/built-in processing. */
  frontmatter?: FrontmatterConfig | boolean
  /** Built-in link resolution (relative hrefs, `file.data.links` for backlinks/graph). */
  links?: LinksConfig | boolean
  /** Built-in draft handling: pages with `draft: true` are not published. */
  drafts?: DraftsConfig | boolean
  /** Built-in content index: `static/contentIndex.json`, sitemap and RSS. */
  contentIndex?: ContentIndexConfig | boolean
  /**
   * Controls which assets are copied to public/
   * - "all": Copy all non-markdown files (backwards compatible, default)
   * - "referenced": Only copy assets referenced by published pages
   */
  publishAssets?: "all" | "referenced"
}

/** Shared by every built-in: `enabled: false` turns it off (e.g. to replace it with a plugin). */
interface BuiltinToggle {
  enabled?: boolean
  /** Position among plugins of the same category (same scale as plugin `order`). */
  order?: number
}

export interface FrontmatterConfig extends BuiltinToggle {
  /** Frontmatter delimiters. Default `"---"`. */
  delimiters?: string | [string, string]
  /** Frontmatter language. Default `"yaml"`. */
  language?: "yaml" | "toml"
}

export interface LinksConfig extends BuiltinToggle {
  /** How to resolve Markdown link paths. Default `"shortest"` (Obsidian's default). */
  markdownLinkResolution?: "absolute" | "relative" | "shortest"
  /** Strip folders from link text (`folder/note` → `note`). Default `true`. */
  prettyLinks?: boolean
  /** Open external links in a new tab. Default `false`. */
  openLinksInNewTab?: boolean
  /** Add `loading="lazy"` to images, videos, audio and iframes. Default `false`. */
  lazyLoad?: boolean
  /** Add an icon after external links. Default `true`. */
  externalLinkIcon?: boolean
  /** Add a `broken` class to internal links whose target does not exist. Default `false`. */
  disableBrokenWikilinks?: boolean
}

export interface DraftsConfig extends BuiltinToggle {
  /** Publish pages marked `draft: true` anyway. Default `false`. */
  publish?: boolean
}

export interface ContentIndexConfig extends BuiltinToggle {
  /** Emit `sitemap.xml`. Default `true`. */
  enableSiteMap?: boolean
  /** Emit an RSS feed. Default `true`. */
  enableRSS?: boolean
  /** Maximum number of RSS items. Default `10`. */
  rssLimit?: number
  /** Put the full page HTML in RSS items instead of the description. Default `false`. */
  rssFullHtml?: boolean
  /** Slug of the RSS feed (`index` → `index.xml`). Default `"index"`. */
  rssSlug?: string
  /** Include pages without text content. Default `true`. */
  includeEmptyFiles?: boolean
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
  /** How each sidebar handles content taller than the screen (`layout.sidebars`). */
  sidebars?: SidebarModes
}

/**
 * - `fit` (default): the sidebar stays in view and is exactly one screen tall; components shrink
 *   and scroll themselves.
 * - `scroll`: the sidebar stays in view and scrolls itself; components take their natural height.
 * - `static`: the sidebar scrolls away with the page.
 */
export type SidebarMode = "fit" | "scroll" | "static"
export const SIDEBAR_MODES: readonly SidebarMode[] = ["fit", "scroll", "static"]
export interface SidebarModes {
  left?: SidebarMode
  right?: SidebarMode
}

export type PageLayout = Pick<FullPageLayout, "beforeBody" | "left" | "right">
export type SharedLayout = Pick<FullPageLayout, "head" | "header" | "footer" | "afterBody">

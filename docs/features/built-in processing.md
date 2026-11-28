---
title: Built-in processing
description: Core content processing and opt-in static features that are part of Quartz itself.
tags:
  - feature
---

Some processing steps and tightly integrated static features are built into Quartz instead of being separately installed plugins:

| Built-in                             | Configure under                 | What it does                                                                                    | Formerly                              |
| ------------------------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------- |
| [[Frontmatter\|frontmatter]]         | `configuration.frontmatter`     | Parses frontmatter: titles, tags, aliases, dates, `draft`, `permalink`, …                       | the parsing half of `note-properties` |
| [[CrawlLinks\|links]]                | `configuration.links`           | Makes internal links relative, classifies links, records outgoing links for backlinks and graph | `crawl-links`                         |
| [[RemoveDrafts\|drafts]]             | `configuration.drafts`          | Does not publish pages with `draft: true`                                                       | `remove-draft`                        |
| [[ContentIndex\|contentIndex]]       | `configuration.contentIndex`    | Emits `static/contentIndex.json` (search, explorer, graph, …), `sitemap.xml` and the RSS feed   | `content-index`                       |
| [[Fonts\|fonts]]                     | `configuration.fonts`           | Loads fonts (Google Fonts, self-hosted or local), per-heading fonts, theme font handling        | `quartz-fonts`                        |
| [[ShortPermalinks\|shortPermalinks]] | `configuration.shortPermalinks` | Emits stable, path-hashed short links as static redirect pages                                  | —                                     |

Without the core processing steps a site would silently break: pages titled "Untitled", links that 404 on nested pages, empty backlinks and graph, drafts published, no search.

## Configuration

The core processing built-ins are on by default. `shortPermalinks` is opt-in. Options go under their key in the `configuration` section of `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
configuration:
  pageTitle: My garden
  frontmatter:
    language: yaml # or toml
    delimiters: "---"
  links:
    markdownLinkResolution: shortest # absolute | relative | shortest
    prettyLinks: true
    openLinksInNewTab: false
    lazyLoad: false
    externalLinkIcon: true
    disableBrokenWikilinks: true
  drafts:
    publish: false # true = publish drafts anyway (e.g. preview deployments)
  contentIndex:
    enableSiteMap: true
    enableRSS: true
    rssLimit: 10
    rssFullHtml: false
    rssSlug: index
    includeEmptyFiles: true
  fonts:
    fontOrigin: googleFonts # googleFonts | selfHosted | local
    h1: Playfair Display # per-heading fonts; title/header/body/code override theme.typography
  shortPermalinks:
    prefix: s
    hashLength: 8
    onCollision: disambiguation-page # disambiguation-page | skip
```

Each built-in also accepts:

- `enabled: false` (or the shorthand `links: false`) to turn it off;
- `order` to change where it runs relative to plugins of the same kind (frontmatter runs at `0`, links at `60`, the same scale as plugin `order`).

See the individual pages for every option: [[Frontmatter]], [[CrawlLinks]], [[RemoveDrafts]], [[ContentIndex]], [[Fonts]], [[ShortPermalinks]].

## Replacing a built-in

A plugin can take over a built-in by declaring that it provides the same thing in its [[plugin capabilities|capabilities]] (`package.json` → `quartz.capabilities.provides`):

| Built-in     | Replaced by a plugin that provides         |
| ------------ | ------------------------------------------ |
| frontmatter  | `data: ["frontmatter"]`                    |
| links        | `data: ["links"]`                          |
| contentIndex | `files: ["static/contentIndex.json"]`      |
| fonts        | `files: ["static/fonts/quartz-fonts.css"]` |

When such a plugin is enabled, the built-in steps aside (`quartz build --verbose` shows `off — replaced by plugin "…"`). Set `enabled: true` on the built-in to run both.

Drafts and shortPermalinks can't be replaced. A filter plugin runs in addition to built-in drafts; disable shortPermalinks before using another short-link emitter.

## Upgrading from the plugins

Existing `quartz.config.yaml` files keep working: entries for `@quartz-community/crawl-links`, `@quartz-community/remove-draft`, `@quartz-community/content-index` and (since 5.2) `@quartz-community/quartz-fonts` are applied to the matching built-in (options, `order` and `enabled: false` carry over) and the packages are no longer loaded. The build prints a notice for each.

To update the file, run:

```shell
npx quartz plugin doctor --fix
```

It moves the options into `configuration`, removes the old entries, and moves note-properties' `delimiters`/`language` options to `configuration.frontmatter`. Comments elsewhere in the file are kept.

> [!note]
> `crawl-links` defaulted to `markdownLinkResolution: absolute`; the built-in defaults to `shortest` (Obsidian's default). Migrated entries keep `absolute` unless you set something else.

The [[Frontmatter#Properties panel|properties panel]] is still a plugin (`note-properties`) — it now only renders the panel.

## For plugin authors

- The data the built-ins produce is unchanged: `file.data.frontmatter`, `aliases`, `frontmatterLinks`, `links`, and the same `contentIndex.json` format. Plugins that read them need no changes.
- Built-ins count as providers for [[plugin capabilities]], so a requirement such as `requires: { data: ["links"] }` is satisfied without any plugin. Built-in links also provides the classes it puts on links: `.internal`, `.external` and `.broken` (`dom` capabilities). In `from`, name the built-ins `quartz:frontmatter`, `quartz:links`, `quartz:drafts`, `quartz:contentIndex` and `quartz:fonts`.
- Don't list `@quartz-community/crawl-links`, `remove-draft` or `content-index` in your manifest's [[plugin manifest#dependencies|`dependencies`]]: Quartz 5.1 treats them as satisfied by the built-ins, but Quartz 5.0 fails the build when the plugin isn't in the config. To run after built-in links, set a `defaultOrder` above 60 (a transformer with a lower order that depends on `crawl-links` fails the build).
- Plugins can add their own fields to `contentIndex.json` — see [[making plugins#Extending the content index]].

---
title: Built-in processing
description: Frontmatter parsing, link resolution, drafts and the content index are part of Quartz itself.
tags:
  - feature
---

Some processing steps are needed by every Quartz site. They are built into Quartz instead of being plugins, so they cannot be removed by accident or run in the wrong order:

| Built-in                       | Configure under              | What it does                                                                                    | Formerly                              |
| ------------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------- |
| [[Frontmatter\|frontmatter]]   | `configuration.frontmatter`  | Parses frontmatter: titles, tags, aliases, dates, `draft`, `permalink`, …                       | the parsing half of `note-properties` |
| [[CrawlLinks\|links]]          | `configuration.links`        | Makes internal links relative, classifies links, records outgoing links for backlinks and graph | `crawl-links`                         |
| [[RemoveDrafts\|drafts]]       | `configuration.drafts`       | Does not publish pages with `draft: true`                                                       | `remove-draft`                        |
| [[ContentIndex\|contentIndex]] | `configuration.contentIndex` | Emits `static/contentIndex.json` (search, explorer, graph, …), `sitemap.xml` and the RSS feed   | `content-index`                       |

Without them a site would silently break: pages titled "Untitled", links that 404 on nested pages, empty backlinks and graph, drafts published, no search.

## Configuration

All built-ins are on by default. Options go under their key in the `configuration` section of `quartz.config.yaml`:

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
    disableBrokenWikilinks: false
  drafts:
    publish: false # true = publish drafts anyway (e.g. preview deployments)
  contentIndex:
    enableSiteMap: true
    enableRSS: true
    rssLimit: 10
    rssFullHtml: false
    rssSlug: index
    includeEmptyFiles: true
```

Each built-in also accepts:

- `enabled: false` (or the shorthand `links: false`) to turn it off;
- `order` to change where it runs relative to plugins of the same kind (frontmatter runs at `0`, links at `60`, the same scale as plugin `order`).

See the individual pages for every option: [[Frontmatter]], [[CrawlLinks]], [[RemoveDrafts]], [[ContentIndex]].

## Replacing a built-in

A plugin can take over a built-in by declaring that it provides the same thing in its [[plugin capabilities|capabilities]] (`package.json` → `quartz.capabilities.provides`):

| Built-in     | Replaced by a plugin that provides    |
| ------------ | ------------------------------------- |
| frontmatter  | `data: ["frontmatter"]`               |
| links        | `data: ["links"]`                     |
| contentIndex | `files: ["static/contentIndex.json"]` |

When such a plugin is enabled, the built-in steps aside (`quartz build --verbose` shows `off — replaced by plugin "…"`). Set `enabled: true` on the built-in to run both.

## Upgrading from the plugins

Existing `quartz.config.yaml` files keep working: entries for `@quartz-community/crawl-links`, `@quartz-community/remove-draft` and `@quartz-community/content-index` are applied to the matching built-in (options, `order` and `enabled: false` carry over) and the packages are no longer loaded. The build prints a notice for each.

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
- Built-ins count as providers for [[plugin capabilities]], so a requirement such as `requires: { data: ["links"] }` is satisfied without any plugin.
- Plugins can add their own fields to `contentIndex.json` — see [[making plugins#Extending the content index]].

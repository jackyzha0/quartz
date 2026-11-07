---
title: ContentIndex
description: Built-in content index, sitemap and RSS feed (formerly the content-index plugin). Configured under configuration.contentIndex.
aliases:
  - contentIndex
  - content-index
tags:
  - plugin/emitter
  - built-in
image:
enabled: true
required: false
---

The content index is [[built-in processing|built into Quartz]] (it used to be the `content-index` plugin). It emits both RSS and an XML sitemap for your site. The [[RSS Feed]] allows users to subscribe to content on your site and the sitemap allows search engines to better index your site. It also emits a `contentIndex.json` file which is used by dynamic frontend components like search and graph.

Configure it under `configuration.contentIndex` in `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
configuration:
  contentIndex:
    enableSiteMap: true
    enableRSS: true
```

Options:

- `enableSiteMap`: If `true` (default), generates a sitemap XML file (`sitemap.xml`) listing all site URLs for search engines in content discovery.
- `enableRSS`: If `true` (default), produces an RSS feed (`index.xml`) with recent content updates.
- `rssLimit`: Defines the maximum number of entries to include in the RSS feed, helping to focus on the most recent or relevant content. Defaults to `10`.
- `rssFullHtml`: If `true`, the RSS feed includes the full rendered HTML content of each page. Defaults to `false`.
- `rssSlug`: Slug to the generated RSS feed XML file. Defaults to `"index"`.
- `includeEmptyFiles`: If `true` (default), content files with no body text are included in the generated index and resources.
- `enabled`: set to `false` to emit none of these files ([[full-text search|search]], [[features/explorer|explorer]] and the [[graph view]] then have no data).

> [!note]
> An existing `@quartz-community/content-index` entry is applied to `configuration.contentIndex` automatically. Run `npx quartz plugin doctor --fix` to move it.

## Adding fields

Plugins can add their own fields to each entry of `contentIndex.json` with `extendContentIndex` — see [[making plugins#Extending the content index]].

## API

- Category: Emitter (built-in)
- Source: [`quartz/plugins/builtins/contentIndex.ts`](https://github.com/jackyzha0/quartz/blob/v5/quartz/plugins/builtins/contentIndex.ts)
- Can be replaced by a plugin that declares `quartz.capabilities.provides.files: ["static/contentIndex.json"]`.

---
title: ContentIndex
tags:
  - plugin/emitter
---

This plugin creates a comprehensive index of the site's content, generating additional resources like a sitemap and RSS feed.

> [!note]
> For information on how to add, remove or configure plugins, see the [[Configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `enableSiteMap`: When `true` (default), generates a sitemap XML file (`sitemap.xml`) listing all site URLs for search engines in content discovery.
- `enableRSS`: When `true` (default), produces an RSS feed (`index.xml`) with recent content updates.
- `rssLimit`: Defines the maximum number of entries to include in the RSS feed, helping to focus on the most recent or relevant content. Defaults to `10`.
- `rssFullHtml`: When `true`, the RSS feed includes full HTML content. Otherwise it includes just summaries.
- `includeEmptyFiles`: When `true` (default), content files with no body text are included in the generated index and resources.

## Technical Details

- Category: Emitter
- Function name: `Plugin.ContentIndex()`.
- Source: [`quartz/plugins/emitters/contentIndex.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/contentIndex.ts).


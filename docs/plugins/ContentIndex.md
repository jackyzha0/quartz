---
title: ContentIndex
tags:
  - plugin/emitter
---

This plugin creates a comprehensive index of the site's content, generating additional resources like a sitemap and RSS feed.

- To remove this functionality, delete all usages of `Plugin.ContentIndex()` from `quartz.config.ts`.
- To customize, use the configuration options of the plugin:
	- `enableSiteMap`: When `true` (default), generates a sitemap XML file (`sitemap.xml`) listing all site URLs for search engines in content discovery.
	- `enableRSS`: When `true` (default), produces an RSS feed (`index.xml`) with recent content updates.
	- `rssLimit`: Defines the maximum number of entries to include in the RSS feed, helping to focus on the most recent or relevant content. Defaults to `10`.
	- `rssFullHtml`: When `true`, the RSS feed includes full HTML content. Otherwise it includes just summaries.
	- `includeEmptyFiles`: When `true` (default), content files with no body text are included in the generated index and resources.
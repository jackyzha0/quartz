---
title: CrawlLinks
tags:
  - plugin/transformer
---

This plugin parses links and processes them to point to the right places. It is also needed for embedded links (like images).

- To remove link processing, remove, delete all usages of `Plugin.CrawlLinks()` from `quartz.config.ts`. This is _not_ recommended and will likely break the page.
- To customize link processing, use the configuration options of the plugin:
	- `markdownLinkResolution`: Defines the strategy for resolving Markdown paths, can be `"absolute"` (default), `"relative"` or `"shortest"`.
	- `prettyLinks`: When `true` (default), simplifies links by removing folder paths, making them more user-friendly.
	- `openLinksInNewTab`: When `true`, configures external links to open in a new tab. Defaults to `false`.
	- `lazyLoad`: When `true`, adds lazy loading to resource elements (`img`, `video`, etc.) to improve page load performance. Defaults to `false`.
	- `externalLinkIcon`: Adds an icon next to external links when `true` (default) to visually distinguishing them from internal links.
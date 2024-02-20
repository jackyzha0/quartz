---
title: RemoveDrafts
tags:
  - plugin/filter
---

This plugin is designed to filter out draft content from the publishing pipeline, so only finalized content is made available. It operates by checking the `draft` flag in the frontmatter of each file. See [[private pages]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[Configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## Technical Details

- Category: Filter
- Function name: `Plugin.RemoveDrafts()`.
- Source: [`quartz/plugins/filters/draft.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/filters/draft.ts).

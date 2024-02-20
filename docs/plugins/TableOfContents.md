---
title: TableOfContents
tags:
  - plugin/transformer
---

This plugin generates a Table of Contents (TOC) for Markdown documents. By default it is displayed in the right side bar.

- To remove the TOC from all pages, delete all usages of `Plugin.TableOfContents()` from `quartz.config.ts`.
- To configure the TOC, use the configuration options of the plugin:
	- `maxDepth`: Limits the depth of headings included in the TOC, ranging from `1` (top-level headings only) to `6` (all heading levels). Default is `3`.
	- `minEntries`: The minimum number of heading entries required for the TOC to be displayed. Default is `1`.
	- `showByDefault`: When `true` (default), the TOC should be shown by default. Can be overridden by frontmatter settings.
	- `collapseByDefault`: When `true` the TOC starts in a collapsed state. Default is `false`.
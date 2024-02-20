---
title: GitHubFlavoredMarkdown
tags:
  - plugin/transformer
---

This plugin enhances Markdown processing to support GitHub Flavored Markdown (GFM) which adds features like autolink literals, footnotes, strikethrough, tables and tasklists.

In addition, this plugin adds optional features for typographic refinement (such as converting straight quotes to curly quotes, dashes to en-dashes/em-dashes, and ellipses) and automatic heading links as a symbol that appears next to the heading on hover.


- To remove recognizing the GitHub Markdown style, delete all usages of `Plugin.GitHubFlavoredMarkdown()` from `quartz.config.ts`.
- `enableSmartyPants`: When true, enables typographic enhancements. Default is true.
- `linkHeadings`: When true, automatically adds links to headings. Default is true.
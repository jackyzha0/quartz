---
title: "Table of Contents"
tags:
  - component
  - feature/transformer
---

Quartz can automatically generate a table of contents (TOC) from a list of headings on each page. It will also show you your current scrolling position on the page by highlighting headings you've scrolled through with a different color.

You can hide the TOC on a page by adding `enableToc: false` to the frontmatter for that page.

By default, the TOC shows all headings from H1 (`# Title`) to H3 (`### Title`) and is only displayed if there is more than one heading on the page.

TOC entries link to the heading ids that [[GitHubFlavoredMarkdown]] gives headings, and both use the same slug function as [[wikilinks#Heading anchors|heading links]], so they always agree. Since GitHubFlavoredMarkdown 2.1 a heading containing `--` gets GitHub's id (`## Range 1--2` → `#range-1--2`, previously `#range-12`); update hand-written links to the old id.

## Customization

The table of contents is a functionality of the [[TableOfContents]] plugin. See the plugin page for more customization options.

The same plugin entry provides the `TableOfContents` component, which is displayed in the right sidebar by default. You can change this with the entry's `layout` block (see [[layout]]). The component's style is set with the `layout` option, which can either be `modern` (default) or `legacy`.

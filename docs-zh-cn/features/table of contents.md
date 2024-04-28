---
title: "Table of Contents"
tags:
  - component
  - feature/transformer
---

Quartz can automatically generate a table of contents (TOC) from a list of headings on each page. It will also show you your current scrolling position on the page by highlighting headings you've scrolled through with a different color.

You can hide the TOC on a page by adding `enableToc: false` to the frontmatter for that page.

By default, the TOC shows all headings from H1 (`# Title`) to H3 (`### Title`) and is only displayed if there is more than one heading on the page.

## Customization

The table of contents is a functionality of the [[TableOfContents]] plugin. See the plugin page for more customization options.

It also needs the `TableOfContents` component, which is displayed in the right sidebar by default. You can change this by customizing the [[layout]]. The TOC component can be configured with the `layout` parameter, which can either be `modern` (default) or `legacy`.

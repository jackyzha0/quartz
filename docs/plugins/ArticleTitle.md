---
title: ArticleTitle
description: Renders the article title as an h1 heading.
tags:
  - plugin/component
image:
repository: "[quartz-community/article-title](https://github.com/quartz-community/article-title)"
enabled: true
required: false
---

This plugin renders the article title from the page's frontmatter as an `<h1>` heading at the top of the page content. It reads the `title` field from frontmatter (falling back to the filename if no title is set).

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Component
- Function name: `ExternalPlugin.ArticleTitle()`.
- Source: [`quartz-community/article-title`](https://github.com/quartz-community/article-title)
- Install: `npx quartz plugin add @quartz-community/article-title` (included in the default configuration)

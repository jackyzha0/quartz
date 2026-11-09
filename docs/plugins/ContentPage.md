---
title: ContentPage
description: Generates HTML pages for Markdown content.
tags:
  - plugin/pageType
image:
repository: "[quartz-community/content-page](https://github.com/quartz-community/content-page)"
enabled: true
required: false
---

This plugin is a page type plugin for the Quartz framework. It generates the HTML pages for each piece of Markdown content. It emits the full-page [[layout]], including headers, footers, and body content, among others. It uses the `default` [[layout#Page Frames|page frame]] (three-column layout with sidebars). Like other page types, it is configured as an ordinary entry in the `plugins` list of `quartz.config.yaml`; the layout of content pages can be adjusted under `layout.byPageType.content` (see [[layout]]).

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

```yaml title="quartz.config.yaml"
- source: "@quartz-community/content-page"
  enabled: true
```

## API

- Category: Page Type
- Function name: `ExternalPlugin.ContentPage()`.
- Source: [`quartz-community/content-page`](https://github.com/quartz-community/content-page)
- Install: `npx quartz plugin add @quartz-community/content-page`

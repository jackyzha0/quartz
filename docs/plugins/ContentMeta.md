---
title: ContentMeta
description: Displays the page date and reading time.
tags:
  - plugin/component
image:
repository: "[quartz-community/content-meta](https://github.com/quartz-community/content-meta)"
enabled: true
required: false
---

This plugin displays content metadata below the article title: the page's date and the estimated reading time.

The date shown is the one selected by the `defaultDateType` option of [[CreatedModifiedDate]] (`modified` by default), so no date is shown when that plugin is disabled. Pages without text content show no metadata.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Configuration

This plugin accepts the following configuration options:

- `showReadingTime`: Whether to display the estimated reading time. Defaults to `true`.
- `showComma`: Whether to display a comma between metadata items. Defaults to `true`.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/content-meta"
  enabled: true
  options:
    showReadingTime: true
    showComma: true
  layout:
    position: beforeBody
    priority: 20
```

## API

- Category: Component
- Function name: `ExternalPlugin.ContentMeta()`.
- Source: [`quartz-community/content-meta`](https://github.com/quartz-community/content-meta)
- Install: `npx quartz plugin add @quartz-community/content-meta`

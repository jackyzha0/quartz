---
title: ReaderMode
description: Distraction-free reading mode toggle.
tags:
  - plugin/component
image:
new-in-v5: true
repository: "[quartz-community/reader-mode](https://github.com/quartz-community/reader-mode)"
enabled: true
required: false
---

Distraction-free reading mode.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[reader mode]] for detailed usage information.

## Configuration

This plugin has no options. Use the entry's `enabled` field to turn it on or off, and `layout` to place the toggle button.

On [[layout#Per-page-type overrides|folder and tag pages]] the default config leaves the button out (`layout.byPageType.folder.exclude: [reader-mode]`).

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/reader-mode"
  enabled: true
  layout:
    position: left
    priority: 35
    group: toolbar
```

## API

- Category: Component
- Function name: `ExternalPlugin.ReaderMode()`.
- Source: [`quartz-community/reader-mode`](https://github.com/quartz-community/reader-mode)
- Install: `npx quartz plugin add @quartz-community/reader-mode` (included in the default configuration)

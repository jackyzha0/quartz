---
title: Darkmode
description: Toggle between light and dark themes.
tags:
  - plugin/component
image: "#0052cc"
repository: "[quartz-community/darkmode](https://github.com/quartz-community/darkmode)"
enabled: true
required: false
---

Dark mode toggle.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[features/darkmode|Darkmode]] for detailed usage information.

## Configuration

This plugin has no configuration options. To remove the toggle, set `enabled: false` on its entry.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/darkmode"
  enabled: true
  layout:
    position: left
    priority: 30
    group: toolbar
```

## API

- Category: Component
- Function name: `ExternalPlugin.Darkmode()`.
- Source: [`quartz-community/darkmode`](https://github.com/quartz-community/darkmode)
- Install: `npx quartz plugin add @quartz-community/darkmode`

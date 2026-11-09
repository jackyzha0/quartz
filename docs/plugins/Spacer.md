---
title: Spacer
description: Flexible spacer for layout groups.
tags:
  - plugin/component
image:
new-in-v5: true
repository: "[quartz-community/spacer](https://github.com/quartz-community/spacer)"
enabled: true
required: false
---

This plugin renders a flexible spacer element that pushes adjacent components apart within a layout group. It uses CSS `flex: 2 1 auto` to fill available space, making it useful for spacing out items in toolbars or sidebars (for example, separating the search bar from the darkmode toggle in the left sidebar toolbar).

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Component
- Function name: `ExternalPlugin.Spacer()`.
- Source: [`quartz-community/spacer`](https://github.com/quartz-community/spacer)
- Install: `npx quartz plugin add @quartz-community/spacer` (included in the default configuration)

---
title: Favicon
description: Emits the site favicon.
tags:
  - plugin/emitter
image:
repository: "[quartz-community/favicon](https://github.com/quartz-community/favicon)"
enabled: true
required: false
---

This plugin emits a `favicon.ico` into the `public` folder. It creates the favicon from `icon.png` located in the `quartz/static` folder.
The plugin resizes `icon.png` to 48x48px to make it as small as possible.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Emitter
- Function name: `ExternalPlugin.Favicon()`.
- Source: [`quartz-community/favicon`](https://github.com/quartz-community/favicon)
- Install: `npx quartz plugin add @quartz-community/favicon` (included in the default configuration)

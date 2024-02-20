---
title: Assets
tags:
  - plugin/emitter
---

This plugin emits all non-Markdown static assets (like images, scripts, stylesheets, etc.) from your vault content under the directory `content`.

Note that all static assets will then be accessible through its path on your generated site, i.e: `host.me/path/to/static.pdf`

> [!note]
> For information on how to add, remove or configure plugins, see the [[Configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Emitter
- Function name: `Plugin.Assets()`.
- Source: [`quartz/plugins/emitters/assets.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/assets.ts).

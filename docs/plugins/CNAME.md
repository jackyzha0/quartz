---
title: CNAME
tags:
  - plugin/emitter
---

This plugin generates a `CNAME` file as part of the site's output. This is needed for configuring custom domain names on platforms like GitHub Pages. The domain name is extracted from the site's base URL, which is then written to a `CNAME` file in the root of the output directory.

> [!note]
> For information on how to add, remove or configure plugins, see the [[Configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## Technical Details

- Category: Emitter
- Function name: `Plugin.CNAME()`.
- Source: [`quartz/plugins/emitters/cname.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/cname.ts).

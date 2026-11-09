---
title: Assets
tags:
  - plugin/emitter
image: https://images.unsplash.com/photo-1526304640581-d334cdbbf45e
---

This plugin emits the non-Markdown static assets in your content folder (like images, videos, PDFs, HTML, etc). The plugin respects the `ignorePatterns` in the global [[configuration]]. Files that a page type renders as pages (such as `.base` and `.canvas` files) are not copied as assets.

Which assets are emitted depends on `configuration.publishAssets`:

- `"all"` (default): every asset in the content folder is copied.
- `"referenced"`: only assets that published pages link to or embed (`src`, `href`, `data`, `poster` and `srcset` attributes) are copied. Use this together with [[private pages|publish filters]] so that images used only by unpublished notes don't end up on your site.

```yaml title="quartz.config.yaml"
configuration:
  publishAssets: referenced
```

Assets are written to their slugified path, so `content/path/to/My File.pdf` becomes `host.me/path/to/My-File.pdf`.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no options of its own; it is always enabled.

## API

- Category: Emitter
- Function name: `Plugin.Assets()` (internal plugin).
- Source: [`quartz/plugins/emitters/assets.ts`](https://github.com/jackyzha0/quartz/blob/v5/quartz/plugins/emitters/assets.ts).

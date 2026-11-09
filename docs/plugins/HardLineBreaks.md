---
title: HardLineBreaks
description: Treats single newlines as hard line breaks.
tags:
  - plugin/transformer
image: "#ff8000"
repository: "[quartz-community/hard-line-breaks](https://github.com/quartz-community/hard-line-breaks)"
enabled: false
required: false
---

> [!warning] Deprecated
> Line breaks are handled by [[ObsidianFlavoredMarkdown]] 2.0+: a single line break renders as a `<br>` by default (`preset: "legacy"`), as in Obsidian. Set its `strictLineBreaks` option to `true` to render it as a space instead. Remove this plugin (`npx quartz plugin remove hard-line-breaks`) unless your site doesn't use ObsidianFlavoredMarkdown; Quartz warns while it is enabled.

This plugin converts single line breaks in Markdown text into hard line breaks in the HTML output.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Transformer
- Function name: `ExternalPlugin.HardLineBreaks()`.
- Source: [`quartz-community/hard-line-breaks`](https://github.com/quartz-community/hard-line-breaks)
- Install: `npx quartz plugin add @quartz-community/hard-line-breaks`

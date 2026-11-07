---
title: RoamFlavoredMarkdown
description: Compatibility for Roam Research export format.
tags:
  - plugin/transformer
image:
repository: "[quartz-community/roam](https://github.com/quartz-community/roam)"
enabled: false
required: false
---

This plugin provides support for [Roam Research](https://roamresearch.com) compatibility. See [[Roam Research compatibility]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `orComponent`: If `true` (default), converts Roam `{{ or:ONE|TWO|THREE }}` shortcodes into HTML Dropdown options.
- `TODOComponent`: If `true` (default), converts Roam `{{[[TODO]]}}` shortcodes into HTML check boxes.
- `DONEComponent`: If `true` (default), converts Roam `{{[[DONE]]}}` shortcodes into checked HTML check boxes.
- `videoComponent`: If `true` (default), converts Roam `{{[[video]]:URL}}` shortcodes into embedded HTML video.
- `audioComponent`: If `true` (default), converts Roam `{{[[audio]]:URL}}` shortcodes into embedded HTML audio.
- `pdfComponent`: If `true` (default), converts Roam `{{[[pdf]]:URL}}` shortcodes into embedded HTML PDF viewer.
- `blockquoteComponent`: If `true` (default), converts Roam `{{[[>]]}}` shortcodes into Quartz blockquotes.
- `tableComponent`: If `true` (default), converts Roam table syntax into HTML tables.
- `attributeComponent`: If `true` (default), converts Roam attribute syntax into rendered attributes.

## API

- Category: Transformer
- Function name: `ExternalPlugin.RoamFlavoredMarkdown()`.
- Source: [`quartz-community/roam`](https://github.com/quartz-community/roam)
- Install: `npx quartz plugin add github:quartz-community/roam`

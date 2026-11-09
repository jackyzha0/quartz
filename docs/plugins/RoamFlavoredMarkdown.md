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

- `orComponent`: If `true` (default), converts Roam `{{or:ONE|TWO|THREE}}` shortcodes into HTML dropdowns.
- `TODOComponent`: If `true` (default), converts Roam `{{[[TODO]]}}` shortcodes into HTML check boxes.
- `DONEComponent`: If `true` (default), converts Roam `{{[[DONE]]}}` shortcodes into checked HTML check boxes.
- `videoComponent`: If `true` (default), converts Roam `{{[[video]]:URL}}` shortcodes into embedded video (YouTube links become a YouTube embed).
- `audioComponent`: If `true` (default), converts Roam `{{[[audio]]:URL}}` shortcodes into embedded HTML audio.
- `pdfComponent`: If `true` (default), converts Roam `{{[[pdf]]:URL}}` shortcodes into an embedded PDF viewer.
- `blockquoteComponent`: If `true` (default), converts Roam `[[>]] text` blockquotes into HTML blockquotes.
- `tableComponent`, `attributeComponent`: accepted, but currently not used by the plugin.

Roam's `^^highlight^^` and `__italic__` syntax is always converted (to a highlight and to emphasis).

### Default options

The default config has a disabled entry for this plugin. Set `enabled: true` to use it:

```yaml title="quartz.config.yaml"
- source: "@quartz-community/roam"
  enabled: true
  order: 92
```

## API

- Category: Transformer
- Function name: `ExternalPlugin.RoamFlavoredMarkdown()`.
- Source: [`quartz-community/roam`](https://github.com/quartz-community/roam)
- Install: `npx quartz plugin add @quartz-community/roam`

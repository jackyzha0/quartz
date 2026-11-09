---
title: ThemesCore
aliases:
  - QuartzThemes
  - Quartz Themes
description: Obsidian community themes for Quartz, with per-aspect mix-and-match.
tags:
  - plugin/transformer
image:
new-in-v5: true
repository: "[quartz-themes/core](https://github.com/quartz-themes/core)"
enabled: false
required: false
---

This plugin styles your site with an Obsidian community theme from [Quartz Themes](https://github.com/saberzero1/quartz-themes): hundreds of themes, converted from their Obsidian CSS. The theme's CSS is added to every page; the [[features/darkmode|dark mode]] toggle switches between its light and dark variants.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

A theme colours the page through Obsidian's CSS variables, so `configuration.theme.colors` then has little or no effect; see [[configuration#General Configuration|Configuration]] for overriding a theme's colours. With [[Fonts]] enabled, the theme's fonts are used as defaults (Quartz Themes runs first, at order `10`).

## Configuration

This plugin accepts the following configuration options:

- `theme`: The theme's id, e.g. `tokyo-night`, `catppuccin`, `minimal`. Defaults to `"tokyo-night"`.
- `mode`: `"both"`, `"light"` or `"dark"`. Defaults to `"both"`. With a single mode (or a theme that only has one), the dark mode toggle is hidden and the site stays in that mode.
- `variation`: A variation of the theme, if it has any (e.g. `frappe` for `catppuccin`).
- `aspects`: Take single aspects from other themes, or leave them out with `false`, e.g. `{ callouts: anuppuccin, code: false }`. Aspects: `base`, `headings`, `typography`, `callouts`, `tables`, `code`, `links`, `blockquotes`, `checkboxes`, `images`, `embeds`, `cards`, `search`, `scrollbars`, `explorer`, `toc`, `graph`, `popover`, `footer`, `recentNotes`, `listPage`, `darkmode`, `breadcrumbs`, `lists`, `canvas`, `bases`, `properties`, `stacked`, `misc`.
- `include`: Only include these aspects (plus those set in `aspects`). Defaults to all.
- `themeFonts`: Whether to include the theme's fonts. Defaults to `true`.
- `styleSettings`: Settings for themes that support the Obsidian [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin: an export from that plugin, or the path to a JSON file holding one. Keys look like `minimal-style@@bg1`.

### Default options

The default config has a disabled entry for this plugin. Set `enabled: true` to use it:

```yaml title="quartz.config.yaml"
- source: "@quartz-themes/core"
  enabled: true
  options:
    theme: tokyo-night
    mode: both
```

Mixing aspects:

```yaml title="quartz.config.yaml"
- source: "@quartz-themes/core"
  enabled: true
  options:
    theme: tokyo-night
    mode: both
    aspects:
      callouts: anuppuccin
      tables: minimal
      code: false
```

## API

- Category: Transformer
- Function name: `ExternalPlugin.QuartzTheme()`.
- Source: [`quartz-themes/core`](https://github.com/quartz-themes/core)
- Install: `npx quartz plugin add @quartz-themes/core`

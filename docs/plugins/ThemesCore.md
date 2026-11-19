---
title: ThemesCore
aliases:
  - QuartzThemes
  - Quartz Themes
description: Use any Obsidian community theme, converted at build time.
tags:
  - plugin/transformer
image:
new-in-v5: true
repository: "[quartz-themes/core](https://github.com/quartz-themes/core)"
enabled: false
required: false
---

This plugin styles your site with any Obsidian community theme. You name the theme; at build time the plugin downloads it (the same file Obsidian installs) and converts its CSS for Quartz. The [[features/darkmode|dark mode]] toggle switches between the theme's light and dark variants, and [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) exports apply as they do in Obsidian.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

A theme colours the page through Obsidian's CSS variables, so `configuration.theme.colors` then has little or no effect; see [[configuration#General Configuration|Configuration]] for overriding a theme's colours. With [[Fonts]] enabled, configured fonts still apply to Quartz's own interface; the theme keeps its fonts for content unless you set `header`/`h1`–`h6` explicitly.

## Configuration

This plugin accepts the following configuration options:

- `theme`: The theme. Defaults to `"Tokyo Night"`. Accepts:
  - a community theme name, as listed in Obsidian (`Minimal`, `AnuPpuccin`);
  - a GitHub repository for themes outside the registry (`kepano/obsidian-minimal`);
  - a URL to a `theme.css`, or a local path (`./themes/My Theme`, `./my-theme.css`);
  - an id from earlier versions (`tokyo-night`, `catppuccin.frappe`), which maps to the theme and the Style Settings preset it used.
- `mode`: `"both"`, `"light"` or `"dark"`. Defaults to `"both"`. With a single mode (or a theme that only has one), the dark mode toggle is hidden and the site stays in that mode.
- `styleSettings`: An export from the Style Settings plugin, or the path to a JSON file holding one. Keys look like `minimal-style@@h1-color@@dark`.
- `snippets`: Obsidian CSS snippets (paths or URLs), applied after the theme.
- `version`: Pin a community theme to a release version. Defaults to the latest.
- `themeFonts`: Whether to include the theme's own web fonts. Defaults to `true`.
- `cacheDir`: Where downloaded themes are cached. Defaults to `.quartz-cache/quartz-themes`. Builds work offline from the cache.
- `cacheHours`: How long before checking for a new theme version. Defaults to `24`.

### Default options

The default config has a disabled entry for this plugin. Set `enabled: true` to use it:

```yaml title="quartz.config.yaml"
- source: "@quartz-themes/core"
  enabled: true
  options:
    theme: Tokyo Night
    mode: both
```

With Style Settings:

```yaml title="quartz.config.yaml"
- source: "@quartz-themes/core"
  enabled: true
  options:
    theme: Minimal
    styleSettings: ./style-settings.json
```

> [!info] Upgrading from 2.x
> Per-theme `@quartz-themes/<theme>` packages are no longer used and can be removed. `aspects`, `include`, `calloutStyle` and `fonts` were removed: themes are converted whole. Theme ids from 2.x keep working.

## API

- Category: Transformer
- Function name: `ExternalPlugin.QuartzTheme()`.
- Source: [`quartz-themes/core`](https://github.com/quartz-themes/core)
- Install: `npx quartz plugin add @quartz-themes/core`

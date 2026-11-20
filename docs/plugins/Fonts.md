---
title: Fonts
description: Built-in font loading — Google Fonts, self-hosted or local — with per-heading fonts.
tags:
  - feature
  - built-in
---

Font loading is [[built-in processing|built into Quartz]] (since 5.2; formerly the `@quartz-community/quartz-fonts` plugin). It loads the fonts set in `configuration.theme.typography`, and adds per-heading fonts, an interface font, and self-hosting.

## Configuration

Options go under `configuration.fonts` in `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
configuration:
  theme:
    typography:
      header: Schibsted Grotesk
      body: Source Sans Pro
      code: IBM Plex Mono
  fonts:
    fontOrigin: selfHosted
    h1: { name: Playfair Display, weights: [700] }
```

- `fontOrigin`: where fonts load from. Default `"googleFonts"`.
  - `"googleFonts"`: link the fonts from Google Fonts.
  - `"selfHosted"`: download them from Google Fonts at build time and serve them from your site (`static/fonts/`), so the site is self-contained.
  - `"local"`: don't load anything; the fonts must be available otherwise.
- `title`, `header`, `body`, `code`: override the matching `theme.typography` font.
- `interface`: font for interface elements (Obsidian's `--font-interface`).
- `h1` … `h6`: per-heading fonts. Unset headings use `header`.
- `useThemeFonts`: use the fonts of a theme plugin such as [[ThemesCore|Quartz Themes]]. Default `true`.
- `enabled: false` turns font handling off; `order` changes when it runs.

A font is a name (any [Google Font](https://fonts.google.com/)) or `{ name, weights, includeItalic }`; see [[configuration#Fonts|Fonts in the configuration]].

## With Quartz Themes

An Obsidian theme sets its own fonts, including heading fonts. With [[ThemesCore|Quartz Themes]] enabled, Quartz leaves them to the theme and only applies the fonts you set explicitly here (for example `h1`, or `header` for all headings).

## Upgrading from the plugin

An existing `@quartz-community/quartz-fonts` entry keeps working: its options are applied to `configuration.fonts` and the package is no longer loaded. Run `npx quartz plugin doctor --fix` to move them.

---
title: Fonts
description: Fine-grained font control with per-heading support, Google Fonts integration, and theme font discovery.
tags:
  - plugin/transformer
  - plugin/emitter
image:
repository: "[quartz-community/fonts](https://github.com/quartz-community/fonts)"
enabled: true
required: false
---

This plugin provides fine-grained control over fonts in your Quartz site. It supports per-heading font families, automatic theme font discovery when used with [[ThemesCore|Quartz Themes]], Google Fonts integration with automatic weight and italic loading, and otherwise falls back to the fonts set in `configuration.theme.typography`.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Why use Fonts?

Quartz uses three CSS variables for fonts: `--headerFont`, `--bodyFont`, and `--codeFont`. Obsidian themes use a different system with per-heading variables (`--h1-font` through `--h6-font`), `--font-text`, and `--font-monospace`. These two systems don't bridge correctly, causing heading fonts to not render as themes intend.

Fonts solves this by:

1. Bridging the Obsidian and Quartz font systems
2. Emitting **unlayered** CSS that correctly overrides Quartz's base heading styles
3. Providing per-heading font control that neither system offers alone
4. Optionally loading fonts from Google Fonts with fine-grained weight and italic control

## Configuration

Font options accept either a CSS font-family string or an object with Google Fonts loading control:

```yaml
# String form
body: '"Inter", sans-serif'

# Object form (for Google Fonts weight/italic control)
body:
  name: Inter
  weights: [400, 600, 700]
  includeItalic: true
```

This plugin accepts the following configuration options:

| Option          | Type                | Default          | Description                                                                                                            |
| --------------- | ------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `title`         | `FontSpecification` | `header` value   | Font family for the site title.                                                                                        |
| `body`          | `FontSpecification` | see below        | Font family for body text.                                                                                             |
| `header`        | `FontSpecification` | see below        | Default font family for all headings (h1-h6).                                                                          |
| `code`          | `FontSpecification` | see below        | Font family for code and monospace elements.                                                                           |
| `interface`     | `FontSpecification` | Obsidian default | Font family for UI elements.                                                                                           |
| `h1` – `h6`     | `FontSpecification` | `header` value   | Per-heading font family overrides.                                                                                     |
| `useThemeFonts` | `boolean`           | `true`           | Use fonts from [[ThemesCore\|Quartz Themes]] as defaults when it is enabled.                                           |
| `fontOrigin`    | `string`            | `"googleFonts"`  | `"googleFonts"` to load from Google Fonts CDN, `"selfHosted"` to download and serve locally, `"local"` for no loading. |

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/quartz-fonts"
  enabled: true
  options:
    useThemeFonts: true
    fontOrigin: googleFonts
```

### Font resolution

Fonts are resolved using a priority chain:

```
Plugin option
  → Theme font (from Quartz Themes, if enabled and useThemeFonts is on)
    → configuration.theme.typography (header, body, code, title)
      → Quartz defaults (Schibsted Grotesk, Source Sans Pro, IBM Plex Mono)
```

For individual headings:

```
h1 option → theme --h1-font → header option → theme body font → resolved header font
```

For the site title:

```
title option → configuration.theme.typography.title → resolved header font
```

The `interface` font comes from the option, then the theme's `--font-interface`, then Obsidian's default sans-serif stack.

With `fontOrigin: googleFonts` or `selfHosted`, the header, body, code and title fonts are loaded from Google Fonts: the plugin options if set, otherwise `configuration.theme.typography`, otherwise the Quartz defaults.

## Usage with Quartz Themes

When [[ThemesCore|Quartz Themes]] is enabled, Fonts automatically discovers the theme's font metadata and uses it as defaults. Any options you explicitly set in Fonts will override the theme fonts.

Fonts must run **after** Quartz Themes. This is handled automatically by plugin ordering (Quartz Themes = 10, Fonts = 60).

> [!warning]
> If Quartz Themes is enabled but hasn't run yet when Fonts executes, you'll see a warning in the console. Make sure Quartz Themes has a lower `defaultOrder` than Fonts.

## Usage without Quartz Themes

Fonts works standalone. Without a theme, it uses `configuration.theme.typography` (or the Quartz defaults). You can set fonts explicitly via the plugin options.

## Examples

```yaml title="quartz.config.yaml"
# Use theme fonts automatically (default behavior)
- source: "@quartz-community/quartz-fonts"
  enabled: true

# Override just the heading font
- source: "@quartz-community/quartz-fonts"
  enabled: true
  options:
    header: '"Playfair Display", serif'

# Full control with per-heading fonts
- source: "@quartz-community/quartz-fonts"
  enabled: true
  options:
    body: '"Inter", sans-serif'
    header: '"Playfair Display", serif'
    code: '"JetBrains Mono", monospace'
    h1: '"Playfair Display", serif'
    h2: '"Lora", serif'

# Load from Google Fonts automatically
- source: "@quartz-community/quartz-fonts"
  enabled: true
  options:
    fontOrigin: googleFonts
    body: Inter
    header: Playfair Display
    code: JetBrains Mono

# Google Fonts with weight/italic control
- source: "@quartz-community/quartz-fonts"
  enabled: true
  options:
    fontOrigin: googleFonts
    body:
      name: Inter
      weights: [400, 600, 700]
      includeItalic: true
    header:
      name: Playfair Display
      weights: [400, 700]
    code:
      name: JetBrains Mono
      weights: [400]

# Custom title font (separate from header)
- source: "@quartz-community/quartz-fonts"
  enabled: true
  options:
    fontOrigin: googleFonts
    title: Abril Fatface
    header: Playfair Display
    body: Inter
    code: JetBrains Mono

# Self-hosted fonts (downloaded at build time, no external requests)
- source: "@quartz-community/quartz-fonts"
  enabled: true
  options:
    fontOrigin: selfHosted
    body: Inter
    header: Playfair Display
    code: JetBrains Mono

# Ignore theme fonts entirely
- source: "@quartz-community/quartz-fonts"
  enabled: true
  options:
    useThemeFonts: false
    body: '"Inter", sans-serif'
```

## Self-Hosted Fonts

When `fontOrigin: selfHosted` is set, Fonts downloads fonts from Google Fonts during the build and serves them from your site's `static/fonts/` directory. This makes your site fully self-contained with no external requests to Google at runtime.

At build time, the plugin:

1. Fetches the Google Fonts CSS for your configured fonts
2. Downloads each font file (`.woff2`, `.woff`, etc.)
3. Writes the font files to `static/fonts/` in your build output
4. Generates a `quartz-fonts.css` file with `@font-face` rules pointing to the local files

The stylesheet is linked relative to each page and the font files relative to the stylesheet, so self-hosted fonts work on `localhost`, on any host and under a base path; `baseUrl` is not needed.

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/quartz-fonts"
    enabled: true
    options:
      fontOrigin: selfHosted
      body: Inter
      header: Playfair Display
      code: JetBrains Mono
```

## Google Fonts Validation

When `fontOrigin: googleFonts` is set and the optional [`google-font-metadata`](https://www.npmjs.com/package/google-font-metadata) package is installed, Fonts validates your font configuration at build time:

- Checks that font family names exist in Google Fonts.
- Warns if requested weights are not available for a font.
- Warns if italic is requested but the font doesn't support it.

Install it to enable validation:

```bash
npm install google-font-metadata
```

Validation warnings are logged to the console but do not block the build.

## API

- Category: Transformer, Emitter
- Function name: `ExternalPlugin.Fonts()` (transformer), `ExternalPlugin.FontsEmitter()` (emitter).
- Source: [`quartz-community/fonts`](https://github.com/quartz-community/fonts)
- Install: `npx quartz plugin add @quartz-community/quartz-fonts` (included in the default configuration)

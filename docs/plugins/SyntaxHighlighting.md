---
title: SyntaxHighlighting
description: Syntax highlighting for code blocks.
tags:
  - plugin/transformer
image: https://images.unsplash.com/photo-1580569214296-5cf2bffc5ccd
repository: "[quartz-community/syntax-highlighting](https://github.com/quartz-community/syntax-highlighting)"
enabled: true
required: false
---

This plugin is used to add syntax highlighting to code blocks in Quartz. See [[syntax highlighting]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `theme`: a separate id of one of the [themes bundled with Shiki](https://shiki.style/themes). One for light mode and one for dark mode. Defaults to `theme: { light: "github-light", dark: "github-dark" }`.
- `keepBackground`: If set to `true`, the background of the Shiki theme will be used. With `false` (default) the Quartz theme color for background will be used instead.
- `clipboard`: Whether to add a copy-to-clipboard button to code blocks. Defaults to `true`.
- `tokenClassification`: Whether to add a `data-token-type` attribute to each highlighted token (`keyword`, `string`, `comment`, `function`, `property`, …), so themes and custom CSS can restyle tokens by kind, e.g. `span[data-token-type="keyword"]`. The theme's own colours are kept. Defaults to `true`.

Highlighting is done with [rehype-pretty-code](https://rehype-pretty.pages.dev/), so its other options (such as `defaultLang`) can be passed too.

In addition, you can further override the colours in the `quartz/styles/syntax.scss` file.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/syntax-highlighting"
  enabled: true
  options:
    theme:
      light: github-light
      dark: github-dark
    keepBackground: false
  order: 20
```

## API

- Category: Transformer
- Function name: `ExternalPlugin.SyntaxHighlighting()`.
- Source: [`quartz-community/syntax-highlighting`](https://github.com/quartz-community/syntax-highlighting)
- Install: `npx quartz plugin add @quartz-community/syntax-highlighting` (included in the default configuration)

---
title: Latex
description: Renders LaTeX math expressions via KaTeX, MathJax or Typst.
tags:
  - plugin/transformer
image:
repository: "[quartz-community/latex](https://github.com/quartz-community/latex)"
enabled: true
required: false
---

This plugin adds LaTeX support to Quartz. See [[features/Latex|Latex]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `renderEngine`: the engine to use to render LaTeX equations. Can be `"katex"` for [KaTeX](https://katex.org/), `"mathjax"` for [MathJax](https://www.mathjax.org/) [SVG rendering](https://docs.mathjax.org/en/latest/output/svg.html), or `"typst"` for [Typst](https://typst.app/) (a new way to compose LaTeX equation). Defaults to `"katex"`.
- `customMacros`: custom macros for all LaTeX blocks. It takes the form of a key-value pair where the key is a new command name and the value is the expansion of the macro. For example: `{"\\R": "\\mathbb{R}"}`. Used by KaTeX and MathJax; Typst ignores it.
- `katexOptions`: Additional options passed to the KaTeX renderer. See the [KaTeX docs](https://katex.org/docs/options) for available options.
- `mathJaxOptions`: Additional options passed to the MathJax renderer. See the [MathJax docs](https://docs.mathjax.org/en/latest/options/) for available options.
- `typstOptions`: Additional options passed to the Typst renderer.

With KaTeX, the KaTeX stylesheet and its copy-tex script are loaded from jsDelivr.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/latex"
  enabled: true
  options:
    renderEngine: katex
  order: 80
```

## API

- Category: Transformer
- Function name: `ExternalPlugin.Latex()`.
- Source: [`quartz-community/latex`](https://github.com/quartz-community/latex)
- Install: `npx quartz plugin add @quartz-community/latex` (included in the default configuration)

---
title: "Latex"
tags:
  - plugin/transformer
---

This plugin adds LaTeX support to Quartz. See [[features/Latex|Latex]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `renderEngine`: the engine to use to render LaTeX equations. Can be `"katex"` for [KaTeX](https://katex.org/) or `"mathjax"` for [MathJax](https://www.mathjax.org/) [SVG rendering](https://docs.mathjax.org/en/latest/output/svg.html). Defaults to KaTeX.

## API

- Category: Transformer
- Function name: `Plugin.Latex()`.
- Source: [`quartz/plugins/transformers/latex.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/latex.ts).

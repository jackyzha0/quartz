---
title: "Latex"
tags:
  - plugin/transformer
---

This plugin adds LaTeX support to Quartz. See [[features/Latex|Latex]] for more information.

- To remove Latex support, delete all usages of `Plugin.Latex()` from `quartz.config.ts`.
- To customize Latex support, use the configuration options of the plugin:
  - `renderEngine`: the engine to use to render LaTeX equations. Can be `"katex"` for KaTeX or `"mathjax"` for MathJax. Defaults to KaTeX.

The source of this plugin can be found in [`quartz/plugins/transformers/latex.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/latex.ts).

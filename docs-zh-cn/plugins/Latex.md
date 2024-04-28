---
title: "Latex"
tags:
  - plugin/transformer
---

此插件为Quartz添加了对LaTeX的支持。查看[[features/Latex|Latex]]了解更多信息。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件接受以下配置选项：

- `renderEngine`: the engine to use to render LaTeX equations. Can be `"katex"` for [KaTeX](https://katex.org/) or `"mathjax"` for [MathJax](https://www.mathjax.org/) [SVG rendering](https://docs.mathjax.org/en/latest/output/svg.html). Defaults to KaTeX.用于渲染LaTeX方程的引擎。可以是[KaTeX](https://katex.org/) 的`"katex"`或[MathJax](https://www.mathjax.org/)[SVG rendering](https://docs.mathjax.org/en/latest/output/svg.html)的`"mathjax"`。 默认为KaTeX。

## API

- 分类: 转换器
- 函数名 `Plugin.Latex()`.
- 源码: [`quartz/plugins/transformers/latex.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/latex.ts).

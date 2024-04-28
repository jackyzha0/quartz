---
title: 标注语法
tags:
  - feature/transformer
---

Quartz支持与Obsidian相同的警告标注语法。

这包括

- 12种不同的标注类型（每种都有多个别名）
- 可折叠标注

```
> [!info] Title
> This is a callout!
```

请参阅[此处的支持类型和语法文档](https://help.obsidian.md/Editing+和+格式化/标注)。

> [!warning]
> 想知道为什么即使启用了callout也不会显示？您可能需要对插件进行重新排序，让[[ObsidianFlavoredMarkdown]]在[[SyntaxHighlighting]]之后。

## 自定义

callout是[[ObsidianFlavoredMarkdown]]插件的一个功能。请参阅插件页面，了解如何启用或禁用它们。

您可以通过自定义`quartz/styles/callouts.scss`来编辑图标。

### 添加自定义标注

默认情况下，通过应用`note`样式来处理自定义标注。要制作精美的，您必须将这些行添加到`custom.scss`中。

```scss title="quartz/styles/custom.scss"
.callout {
  &[data-callout="custom"] {
    --color: #customcolor;
    --border: #custombordercolor;
    --bg: #custombg;
    --callout-icon: url("data:image/svg+xml; utf8, <custom formatted svg>"); //SVG icon code
  }
}
```

> [!warning]
> 在将SVG放入CSS之前，不要忘记确保它是URL编码的。你可以使用像[this one](https://yoksel.github.io/url-encoder/) 这样的工具帮助你做到这一点。

## 示例

> [!info]
> Default title

> [!question]+ Can callouts be _nested_?
>
> > [!todo]- Yes!, they can. And collapsed!
> >
> > > [!example] You can even use multiple layers of nesting.

> [!note]
> Aliases: "note"

> [!abstract]
> Aliases: "abstract", "summary", "tldr"

> [!info]
> Aliases: "info"

> [!todo]
> Aliases: "todo"

> [!tip]
> Aliases: "tip", "hint", "important"

> [!success]
> Aliases: "success", "check", "done"

> [!question]
> Aliases: "question", "help", "faq"

> [!warning]
> Aliases: "warning", "attention", "caution"

> [!failure]
> Aliases: "failure", "missing", "fail"

> [!danger]
> Aliases: "danger", "error"

> [!bug]
> Aliases: "bug"

> [!example]
> Aliases: "example"

> [!quote]
> Aliases: "quote", "cite"

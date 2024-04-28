---
title: 创作内容
---

Quartz中的所有内容都应放在`/content`文件夹中。Quartz主页的内容位于`content/index.md`.中。如果你已经有[[index#🪴 快速上手|setup Quartz]]，该文件夹应该已经被初始化了。此文件夹中的任何Markdown都将由Quartz处理。

建议您使用[Obsidian](https://obsidian.md/)作为编辑和维护Quartz的一种方式。它提供了一个不错的编辑器和图形界面，用于预览、编辑和链接您的本地文件和附件。

一切都安排好了吗？让我们[[build]]并在本地预览您的Quartz！
## 语法

由于Quartz使用Markdown文件作为编写内容的主要方式，因此它完全支持Markdown语法。默认情况下，Quartz还附带了一些语法扩展，如[Github风格的Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)（脚注、删除线、表格、任务列表）和 [Obsidian风格的Markdown](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown) （[[callouts]], [[wikilinks]]）。

此外，Quartz还允许您在名为**frontmatter**的笔记中指定其他元数据。

```md title="content/note.md"
---
title: Example Title
draft: false
tags:
  - example-tag
---

The rest of your content lives here. You can use **Markdown** here :)
```

一些常见的由Quartz原生支持的frontmatter字段：

- `title`: 页面的标题。如果没有提供，Quartz将使用文件名作为标题。
- `description`: 用于链接预览的说明。
- `aliases`: 笔记的其他名称。为字符串列表。
- `tags`: 笔记的标签。
- `draft`: 是否发布页面。这是在Quartz中创建[[private pages|private pages]]的一种方法。
- `date`: 表示发布日期的字符串。通常使用“YYYY-MM-DD”格式。

## 同步您的内容

当你的Quartz达到你满意的程度时，你可以将你的更改保存到GitHub。
首先，确保你已经[[setting up your GitHub repository|已经设置了你的GitHub存储库]]，然后执行`npx quartz sync`。

## 自定义

`title`、 `tags`、 `aliases` 和`cssclasses`的Frontmatter解析是[[Frontmatter]]插件的一项功能，`date`由[[CreatedModifiedDate]]插件处理，“description”由[[Description]]插件处理。有关自定义选项，请参阅插件页面。
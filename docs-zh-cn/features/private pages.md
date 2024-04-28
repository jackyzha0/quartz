---
title: 私有页面
tags:
  - feature/filter
---


您可能希望避免将某些笔记作为网站发布。Quartz通过两种可结合使用的机制来支持这一点：

## 过滤器插件

[[making plugins#Filters|Filter plugins]]是根据特定标准过滤内容的插件。默认情况下，Quartz使用[[RemoveDrafts]]插件过滤掉任何在标题中有 `draft: true` 的笔记。

如果您只想发布选定数量的笔记，则可以使用[[ExplicitPublish]]，它将过滤掉所有笔记，但在标题中具有`publish: true`的笔记除外。

> [!warning]
> 无论使用何种过滤插件，**所有非Markdown文件都将在最终版本中发布并公开。**这包括图像、录音、PDF等文件。防止这种情况并仍然能够嵌入本地图像的一种方法是创建一个专门用于公共媒体的文件夹，并将以下两种模式添加到ignorePatterns数组中。
>
> `"!(PublicMedia)**/!(*.md)", "!(*.md)"`

## `ignorePatterns`

这是主目录下`quartz.config.ts` 中的一个字段[[configuration]] 这允许您指定一个模式列表，以有效地将其排除在一起进行解析。任何有效的[fast-glob](https://github.com/mrmlnc/fast-glob#pattern-syntax)模式在这里工作。

> [!note]
> Bash的glob语法与fastglob的略有不同，使用Bash的语法可能会导致意外的结果。

常见的例子包括：

- `some/folder`：排除整个some/folder` 目录
- `*.md`：排除所有扩展名为`.md`的文件
- `!*.md`排除不具有`.md`扩展名的所有文件
- `**/private`：在任何嵌套级别排除任何名为`private`的文件或文件夹

> [!warning]
> 通过插件或`ignorePatterns` 模式将某些内容标记为私有内容只会阻止页面包含在最终构建的网站中。如果你的GitHub存储库是公共的，也一定要为Quartz的`.gitignore`中的存储库添加一个ignore。请参阅`git`[文档](https://git-scm.com/docs/gitignore#_pattern_format)了解更多信息。

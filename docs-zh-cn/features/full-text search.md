---
title: 全文搜索
tags:
  - component
---

Quartz中的全文搜索由[Flexsearch](https://github.com/nextapps-de/flexsearch)提供支持。它足够快，可以在不到10ms的时间内返回50万个单词的Quartz的搜索结果。

它可以通过点击搜索栏或按`⌘`/`ctrl` + `K`打开。每个查询都会显示前5个搜索结果。突出显示匹配的子句，并摘录最相关的30个单词。单击搜索结果将导航到该页面。

要按标签搜索内容，您可以按`⌘`/`ctrl` + `shift` + `K` ，也可以用`#`（例如`#components`）开始查询。

该组件也可以通过键盘访问：Tab和Shift+Tab将在搜索结果中前后循环，Enter将导航到高亮显示的结果（默认情况下为第一个结果）。您还可以使用“向上箭头”和“向下箭头”导航搜索结果。

> [!info]
> 搜索要求`ContentIndex` 生成插件存在于[[configuration]].

### 索引行为

默认情况下，它会对网站上的每个页面进行索引，删除**Markdown语法**。这意味着链接URL（例如）没有索引。

它正确地标记中文、韩语和日语字符，并为标题、内容和标签构建单独的索引，在内容匹配之上权衡标题匹配。

## 自定义

- 删除搜索：从 `quartery.layout.ts`中删除`Component.Search()`。
- 组件: `quartz/components/Search.tsx`
- 样式: `quartz/components/styles/search.scss`
- 脚本: `quartz/components/scripts/search.inline.ts`
  - 您可以编辑`contextWindowWords`、`numSearchResults` 或 `numTagResults` 以满足您的需要

---
title: 目录
tags:
  - component
  - feature/transformer
---

Quartz可以根据每页的标题列表自动生成目录（TOC）。它还将用不同的颜色突出显示您滚动过的标题，从而显示您在页面上的当前滚动位置。

您可以通过在页面的首页添加`enableToc: false`来隐藏页面上的TOC。

默认情况下，TOC显示从H1（`# Title`）到H3（`### Title`）的所有标题，并且只有当页面上有多个标题时才会显示。

## 自定义

目录是[[TableOfContents]]插件的一个功能。有关更多自定义选项，请参阅插件页面。

它还需要`TableOfContents` 组件，默认情况下会显示在右侧边栏中。您可以通过自定义[[layout]]. TOC组件可以用`layout` 参数配置，该参数可以是`modern`（默认）或 `legacy`。
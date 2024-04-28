---
title: OxHugo 兼容性
tags:
  - feature/transformer
---

[org-roam](https://www.orgroam.com/) 是[emacs](https://en.wikipedia.org/wiki/Emacs).的纯文本个人知识管理系统。 [ox-hugo](https://github.com/kaushalmodi/ox-hugo)是组织导出器后端，将 `org-mode` 文件导出到兼容Markdown的[Hugo](https://gohugo.io/) 。

因为ox-hugo生成的Markdown不是纯Markdown，而是hugo特有的，所以我们需要将其转换为Quartz。这是由[[OxHugoFlavoredMarkdown]]插件完成的。尽管这个插件是在考虑`ox-hugo` 的情况下编写的，但它应该适用于任何特定于hugo的Markdown。

```typescript title="quartz.config.ts"
plugins: {
  transformers: [
    Plugin.FrontMatter({ delims: "+++", language: "toml" }), // if toml frontmatter
    // ...
    Plugin.OxHugoFlavouredMarkdown(),
    Plugin.GitHubFlavoredMarkdown(),
    // ...
  ],
},
```

## 用法

Quartz默认不理解`org-roam` 文件，因为它们不是Markdown。您负责使用像`ox-hugo` 这样的外部工具将`org-roam` 文件作为Markdown内容导出到Quartz，并管理静态资产，使其在最终输出中可用。

## 配置

此功能由[[OxHugoFlavoredMarkdown]]插件提供。有关自定义选项，请参阅插件页面。

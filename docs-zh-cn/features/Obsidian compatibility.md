---
title: Obsidian兼容性
tags:
  - feature/transformer
---

Quartz最初是作为一种工具设计的，用于将Obsidian vaults发布为网站。尽管Quartz的范围随着时间的推移而扩大，但它并没有失去与Obsidian无缝互操作的能力。

默认情况下，Quartz附带[[ObsidianFlavoredMarkdown]]插件，这是一个转换器插件，增加了对[Obsidian Flavored Markdown](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown)的支持。这包括对[[wikilinks]]和[[Mermaid diagrams]].

它还附带了对[frontmatter parsing](https://help.obsidian.md/Editing+and+formatting/Properties)的支持，并使用与Obsidian通过[[Frontmatter]]转换器插件使用的字段相同的字段。

最后，Quartz还提供了[[CrawlLinks]]插件，允许您自定义Quartz的链接解析行为以匹配Obsidian。

## 配置

此功能由[[ObsidianFlavoredMarkdown]]、[[Frontmater]]和[[CrawlLinks]]插件提供。有关自定义选项，请参阅插件页面。

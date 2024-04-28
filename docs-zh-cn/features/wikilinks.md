---
title: Wikilinks
---

Wikilinks是由早期的互联网Wiki开创的，它可以更容易地在页面之间编写链接，而无需每次都编写Markdown或HTML链接。

Quartz默认支持Wikilinks，这些链接由Quartz使用[[CrawlLinks]]插件解析。请参阅[内部链接上的Obsidian帮助页面](https://help.obsidian.md/Linking+notes+和+files/Internal+links)，以获取有关Wikilink语法的更多信息。

这是作为[[Obsidian compatibility]] 的一部分并且可以从该插件进行配置和启用/禁用。

## 语法

- `[[Path to file]]`: 生成一个指向`Path to file.md`（或`Path-to-file.md`）的链接，其文本为`Path to file`
- `[[Path to file | Here's the title override]]`: 生成一个指向`Path to file.md`的链接，其文本为`Here's the title override`
- `[[Path to file#Anchor]]`: 生成指向文件`Path to file.md`中的锚点`Anchor`的链接
- `[[Path to file#^block-ref]]`: 生成指向文件`Path to file.md`中特定块`block-ref`的链接

### 嵌入

- `![[Path to image]]`: 将图像嵌入到页面中
- `![[Path to image|100x145]]`: 将尺寸为100px * 145px的图像嵌入到页面中
- `![[Path to file]]`: 覆盖整个页面
- `![[Path to file#Anchor]]`: 嵌入标题`Anchor`下的所有内容
- `![[Path to file#^b15695]]`: 嵌入包含ID为`^b15695`的块

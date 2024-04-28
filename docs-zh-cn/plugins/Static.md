---
title: Static
tags:
  - plugin/emitter
---

这个插件生成Quartz所需的所有静态资源。例如，这用于需要稳定位置的字体和图像，如横幅和图标。该插件不违背全局[[configuration]]中的`ignorePatterns` 。

> [!important]
> 这与[[Assets]]不同。来自[[Static]] 插件的资源位于`quartz/static`下，而[[Assets]] 是出现在`content`下的所有静态资源，并用于您的markdown内容直接引用的图像、视频、音频等。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件没有配置选项。

## API

- 分类: 生成器
- 函数名: `Plugin.Static()`.
- 源码: [`quartz/plugins/emitters/static.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/static.ts).

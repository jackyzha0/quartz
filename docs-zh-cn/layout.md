---
title: 布局
---

某些 emitters 也许会输出[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) 文件。为了更简单的自定义，这些emitters允许你完全重新安排您的页面布局。页面布局可以在 `quartz.layout.ts` 文件进行配置。

每个页面都是由许多包含`QuartzComponents`的部分组成。下面代码列出了可以在其中添加组件的。

```typescript title="quartz/cfg.ts"
export interface FullPageLayout {
  head: QuartzComponent // single component
  header: QuartzComponent[] // laid out horizontally
  beforeBody: QuartzComponent[] // laid out vertically
  pageBody: QuartzComponent // single component
  left: QuartzComponent[] // vertical on desktop, horizontal on mobile
  right: QuartzComponent[] // vertical on desktop, horizontal on mobile
  footer: QuartzComponent // single component
}
```

这些对应于页面的以下部分：

![[quartz layout.png|800]]

> [!note]
> 有两个额外的属性没有在上面的代码中展示。
> 
> 1. `head` 是在HTML中渲染 `<head>` [标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head) 的唯一的组件。这不会直观地显示在页面上，只负责文档的元数据，如选项卡标题、脚本和样式。
> 2. `header`是一组水平排列的组件，出现在“beforeBody”部分之前。这使您能够复制旧的`Quartz 3`标题栏，其中包括标题、搜索栏和暗模式切换。默认情况下，`Quartz 4`不会在 `header`中放置任何组件。

Quartz **组件**与插件一样，可以采用其他属性作为配置选项。如果您熟悉React术语，您可以将其视为高阶组件。

有关所有可用组件及其配置选项，请参见[所有组件的列表](component.md) 。如果您有兴趣进一步定制Quartz的行为，也可以查看[[创建组件]]指南。

### 样式

大多数的样式更改，如配色方案和字体，都可以简单地通过[[configuration#General Configuration|常规配置]]选项来完成。然而，如果你想进行更多的风格改变，你可以通过编写自己的样式来做到这一点。Quartz 4和Quartz 3一样使用[Sass](https://sass-lang.com/guide/)编写样式。

您可以在 `quartz/styles/base.scss` 中看到基础的样式并且您可以在`quartz/styles/custom.scss` 中定义您自己的样式。

> [!note]
> 某些组件也可能提供自己的样式！例如，“quartery/components/Darkmode.tsx”从“quarter/components/styles/Darkmode.scss”导入样式。如果要自定义特定零部件的样式，请仔细检查零部件定义，查看其样式是如何定义的。

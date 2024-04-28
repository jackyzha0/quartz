---
title: 配置
---
Quartz是非常可配置的，即使你不知道任何编码。您需要的大部分配置都可以通过编辑`quartz.layout.ts`或更改[[layout|layout]]来完成。

> [!tip]
> 如果您使用具有TypeScript语言支持（如VSCode）的文本编辑器编辑Quartz配置，当您在配置中出错时，它会警告您，帮助您避免配置错误！

Quartz的配置可分为两个主要部分：

```ts title="quartz.config.ts"
const config: QuartzConfig = {
  configuration: { ... },
  plugins: { ... },
}
```

## 常规配置

这部分配置涉及任何可能影响整个站点的内容。以下是您可以配置的所有内容的列表：

- `pageTitle`: 网站的标题。这也用于为您的网站生成 [[RSS订阅]]。
- `enableSPA`: 是否在您的网站上启用[[SPA Routing]] 。
- `enablePopovers`: 是否在您的网站上启用[[popover previews]]。
- `analytics`: 用于网站分析的内容。值可以是：
  - `null`: 不使用分析；
  - `{ provider: 'google', tagId: '<your-google-tag>' }`: 使用谷歌分析；
  - `{ provider: 'plausible' }` (managed) or `{ provider: 'plausible', host: '<your-plausible-host>' }` (self-hosted): use [Plausible](https://plausible.io/);
  - `{ provider: 'umami', host: '<your-umami-host>', websiteId: '<your-umami-website-id>' }`: 使用 [Umami](https://umami.is/);
  - `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id' }` (managed) or `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id', host: 'my-goatcounter-domain.com', scriptSrc: 'https://my-url.to/counter.js' }` (self-hosted) 使用 [GoatCounter](https://goatcounter.com)
  - `{ provider: 'posthog', apiKey: '<your-posthog-project-apiKey>', host: '<your-posthog-host>' }`: 使用 [Posthog](https://posthog.com/);
- `locale`: 用于[[i18n]]和日期格式。
- `baseUrl`: 这用于需要绝对URL才能知道网站的规范“主页”所在位置的网站地图和RSS源。这通常是您网站的已部署URL（例如，此网站的“quartz.jzhao.xyz”）。不要包含协议（即“https://”）或任何前导或尾随斜杠。
  - 如果你在没有[[hosting|发布]]到自定义域的GitHub页面上，这也应该包括子路径。例如，如果我的存储库是`jackyzha0/quartz`，GitHub页面将部署到`https://jackyzha0.github.io/quartz`并且 `baseUrl` 将是`jackyzha0.github.io/quartz`。
  - 请注意，Quartz 4将尽可能避免使用此功能，并尽可能使用相对URL，以确保您的网站无论在哪里实际部署都能正常工作。
- `ignorePatterns`: 忽略文件列表，Quartz在 `content` 文件夹中查找文件时应忽略这些模式而不进行搜索。有关详细信息，请参阅[[private pages]]。
- `defaultDateType`: 是否将创建、修改或发布作为默认日期显示在页面和页面列表中。
- `theme`: 配置网站的外观。
  - `cdnCaching`: 如果为true（默认值），请使用Google CDN缓存字体。这通常会更快。如果您希望Quartz下载独立的字体，请禁用（“false”）此选项。
  - `typography`: 使用什么字体。[Google Fonts](https://fonts.google.com/) 上任何的字体都可用。
    - `header`: 用于页眉的字体
    - `code`: 代码的字体。
    - `body`: 所有内容的字体。
  - `colors`: 控制网站的主题。
    - `light`: 页面背景
    - `lightgray`: 边框
    - `gray`: 图形链接，较重的边框
    - `darkgray`: 正文
    - `dark`: 标题文本和图标
    - `secondary`: 链接颜色，当前[[graph view|graph]]节点
    - `tertiary`: 悬停状态和访问的[[graph view|graph]]节点
    - `highlight`: 内部链接背景，高亮显示的文本，[[syntax highlighting|高亮显示的代码行]]

## 插件

您可以将Quartz插件视为对内容的一系列转换。

![[quartz transform pipeline.png]]

```ts title="quartz.config.ts"
plugins: {
  transformers: [...],
  filters: [...],
  emitters: [...],
}
```

- [[tags/plugin/transformer|Transformers]] **映射**内容（例如解析`frontmatter`、生成描述）
- [[tags/plugin/filter|Filters]] **过滤**内容（例如过滤掉草稿）
- [[tags/plugin/emitter|Emitters]] **减少**过度内容（例如，创建RSS提要或列出带有特定标签的所有文件的页面）

您可以通过在`transformers`、`filters` 和 `emitters` 字段中添加、删除和重新排序插件来自定义Quartz的行为。

> [!note]
> 每个transformer按顺序修改每个节点。有些转换器是位置敏感的，所以你可能需要特别注意它们是否需要在某些其他插件之前或之后出现。

您应该注意将插件添加到与其插件类型相对应的正确条目中。例如，要添加[[ExplicitPublish]]插件（[[tags/plugin/filter|Filter]]），您需要添加以下行：

```ts title="quartz.config.ts"
filters: [
  ...
  Plugin.ExplicitPublish(),
  ...
],
```

要删除一个插件，您应该删除`quartz.config.ts`中出现的所有插件。

为了进一步自定义插件，一些插件可能也有自己的配置设置，你可以传入。如果你不传入配置，插件将使用其默认设置。

例如，[[plugins/Latex|Latex]] 插件允许您传入一个指定`renderEngine`的字段，以便在Katex和MathJax之间进行选择。

```ts title="quartz.config.ts"
transformers: [
  Plugin.FrontMatter(), // use default options
  Plugin.Latex({ renderEngine: "katex" }), // set some custom options
]
```

一些插件默认包含在[ `quartz.config.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz.config.ts)中，还有更多可用的。

您可以看到所有插件及其配置选项的列表[[tags/plugin|here]]。

如果你想制作自己的插件，请参阅[[making plugins|制作自定义插件]]指南。
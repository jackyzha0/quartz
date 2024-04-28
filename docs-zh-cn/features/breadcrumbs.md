---
title: 面包屑导航
tags:
  - component
---
Breadcrumb提供了一种使用其父文件夹列表在网站内浏览页面层次结构的方法。

默认情况下，页面最顶部的元素是面包屑导航栏（也可以在该页面的顶部看到！）。

## 自定义

大多数配置都可以通过将选项传递给``Component.Breadcrumbs()``。

例如，以下是默认配置的样子：

```typescript title="quartz.layout.ts"
Component.Breadcrumbs({
  spacerSymbol: "❯", // symbol between crumbs
  rootName: "Home", // name of first/root element
  resolveFrontmatterTitle: true, // whether to resolve folder names through frontmatter titles
  hideOnRoot: true, // whether to hide breadcrumbs on root `index.md` page
  showCurrentPage: true, // whether to display the current page in the breadcrumbs
})
```

在传递自己的选项时，如果希望保留这些字段的默认值，则可以省略其中的任何或全部字段。

也可以通过调整[[layout]] （向上或向下移动`Component.Breadcrumbs()`）

想进一步定制吗？

- 删除面包屑：从`quarter.layout.ts`中删除`Component.Breadcrumbs()` 。
- 组件: `quartz/components/Breadcrumbs.tsx`
- 样式: `quartz/components/styles/breadcrumbs.scss`
- 脚本: 内联在 `quartz/components/Breadcrumbs.tsx`

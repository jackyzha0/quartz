---
title: 反向链接
tags:
  - component
---

一个笔记的反向链接是从另一个笔记到该笔记的链接。如果启用了丰富的[[popover previews]] 功能，则反向链接窗格中的链接也具有该功能。

## 自定义

- 删除反向链接：从`quartz.layout.ts`删除`Component.Backlinks()` 。
- 组件: `quartz/components/Backlinks.tsx`
- 样式: `quartz/components/styles/backlinks.scss`
- 脚本: `quartz/components/scripts/search.inline.ts`

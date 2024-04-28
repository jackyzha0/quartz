---
title: 弹出式预览
---


就像维基百科一样，当你把鼠标悬停在Quartz中的一个链接上时，会弹出一个页面预览，你可以滚动查看整个内容。指向标题的链接也会滚动弹出窗口，在视图中显示特定的标题。

默认情况下，由于[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).的原因，Quartz只获取vault内页面的预览。它通过使用`popover-hint` 类选择所有HTML元素来实现这一点。对于大多数页面，这包括页面标题、页面元数据（如单词和阅读时间）、标记和实际页面内容。

当[[创建组件|自定义组件]]的时候，您可以将这个 `popover-hint`类包含在popover中。

与Obsidian类似，[[quartz layout.png|使用Wiki链接引用的图像]]也可以作为弹出窗口查看。
## 配置

- 删除popovers：将`quartz.config.ts`中的`enablePopovers` f字段设置为`false`.。
- 样式: `quartz/components/styles/popover.scss`
- 脚本: `quartz/components/scripts/popover.inline.ts`

---
title: 单页路由
---

单页应用程序风格的渲染。这可以防止未格式化内容的闪烁，并提高Quartz的平滑度。

在后台，这是通过劫持页面导航来实现的，而不是通过`GET` 请求获取HTML，然后使用 [micromorph](https://github.com/natemoo-re/micromorph) 来区分和选择性地替换页面的部分。这使我们可以在不完全刷新页面的情况下更改页面的内容，从而减少浏览器需要加载的内容量。

## 配置

- 禁用SPA路由：在[[configuration]] `quartz.config.ts`中设置的`enableSPA`字段`false`。

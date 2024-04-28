---
title: 深色模式
tags:
  - component
---

Quartz支持开箱即用的深色模式，尊重用户的主题偏好。暗模式开关的任何未来手动切换都将保存在浏览器的本地存储中，以便在未来的页面加载中保持不变。

## 自定义

- 删除暗模式：从`quartery.layout.ts`中删除`Component.Darkmode()`。
- 组件: `quartz/components/Darkmode.tsx`
- 样式: `quartz/components/styles/darkmode.scss`
- 脚本: `quartz/components/scripts/darkmode.inline.ts`

您还可以收听`themechange`事件，以便在主题更改时执行任何自定义逻辑。

```js
document.addEventListener("themechange", (e) => {
  console.log("Theme changed to " + e.detail.theme) // either "light" or "dark"
  // your logic here
})
```

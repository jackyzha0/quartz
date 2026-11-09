---
title: "Darkmode"
tags:
  - component
---

Quartz supports darkmode out of the box that respects the user's theme preference. Any future manual toggles of the darkmode switch will be saved in the browser's local storage so it can be persisted across future page loads.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Customization

- Removing darkmode: remove the `darkmode` entry from `quartz.config.yaml` or set `enabled: false`.
- Install: `npx quartz plugin add @quartz-community/darkmode`
- Source: [`quartz-community/darkmode`](https://github.com/quartz-community/darkmode)

You can also listen to the `themechange` event to perform any custom logic when the theme changes.

```js
document.addEventListener("themechange", (e) => {
  console.log("Theme changed to " + e.detail.theme) // either "light" or "dark"
  // your logic here
})
```

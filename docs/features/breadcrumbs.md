---
title: "Breadcrumbs"
tags:
  - component
---

Breadcrumbs provide a way to navigate a hierarchy of pages within your site using a list of its parent folders.

By default, the element at the very top of your page is the breadcrumb navigation bar (can also be seen at the top on this page!).

## Customization

Most configuration can be done by passing in options to `Component.Breadcrumbs()`.

For example, here's what the default configuration looks like:

```typescript title="quartz.layout.ts"
Component.Breadcrumbs({
  spacerSymbol: ">", // symbol between crumbs
  rootName: "Home", // name of first/root element
  resolveFrontmatterTitle: false, // wether to resolve folder names through frontmatter titles (more computationally expensive)
  hideOnRoot: true, // wether to hide breadcrumbs on root `index.md` page
})
```

When passing in your own options, you can omit any or all of these fields if you'd like to keep the default value for that field.

You can also adjust where the breadcrumbs will be displayed by adjusting the [[layout]] (moving `Component.Breadcrumbs()` up or down)

Want to customize it even more?

- Removing breadcrumbs: delete all usages of `Component.Breadcrumbs()` from `quartz.layout.ts`.
- Component: `quartz/components/Breadcrumbs.tsx`
- Style: `quartz/components/styles/breadcrumbs.scss`
- Script: inline at `quartz/components/Breadcrumbs.tsx`

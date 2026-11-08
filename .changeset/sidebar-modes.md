---
"@jackyzha0/quartz": minor
---

New `layout.sidebars` option: how each sidebar handles content taller than the screen. `fit` (default, unchanged) keeps it one screen tall and components shrink and scroll themselves; `scroll` keeps it in view and lets it scroll itself, so nothing is ever out of reach; `static` lets it scroll away with the page. Page types can override it (`byPageType.<type>.sidebars`). New `docs` template for documentation sites (`npx quartz create --template docs`), with both sidebars `static`. Frames receive the modes as a `sidebars` prop and put them on sidebar elements as `data-sidebar-mode`, which plugins can target in CSS.

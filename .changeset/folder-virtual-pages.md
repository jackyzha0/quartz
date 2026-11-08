---
"@jackyzha0/quartz": patch
---

The folder hierarchy used by folder pages and breadcrumbs now includes the pages of page types that render files (`.base`, `.canvas`, …): folder pages list them, and a folder that holds only such pages has its own node (#2576). Documented that while a page type's `generate` runs, `ctx.virtualPages` holds the virtual pages of the page types before it.

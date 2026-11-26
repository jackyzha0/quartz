---
"@jackyzha0/quartz": patch
---

Heading transclusions and their footnotes look through Obsidian's per-block wrappers (`div.el-h2 > h2`), which `@quartz-community/rehype-obsidian` now renders around each of a note's top-level blocks. `blockOf()` (in `components/transcludeScope.ts`) returns the block inside a wrapper, for other code that walks a page's top-level blocks.

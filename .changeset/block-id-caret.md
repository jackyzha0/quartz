---
"@jackyzha0/quartz": patch
---

Block anchors are `#^id`: with @quartz-community/utils 1.3.2 and rehype-obsidian 1.6.0, blocks get the id `^id` and links to them `#^id` (was `#id`), as in Obsidian, so block `^para-1` and heading `## Para 1` no longer share an id. A block transclusion finds its block whatever the case of its `^id` (`![[note#^Para-1]]`), and the popover scrolls to a block it links to.

---
"@jackyzha0/quartz": patch
---

Sites created with `npx quartz create` from a template (default, blog, docs, obsidian, ttrpg) run GitHubFlavoredMarkdown before ObsidianFlavoredMarkdown (orders 30 and 40), as the default config does and 5.1 requires. The templates still had the old orders (40 and 30). The obsidian and ttrpg templates no longer set `parseArrows`, which ObsidianFlavoredMarkdown doesn't have.

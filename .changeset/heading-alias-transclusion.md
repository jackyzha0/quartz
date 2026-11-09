---
"@jackyzha0/quartz": patch
---

Embedding a section by the anchor Obsidian writes for its heading works when that anchor differs from the heading's id: `![[note#Colon unspaced]]` now embeds `## Colon:unspaced`. It needs GitHubFlavoredMarkdown 2.1.0 or later, which marks those anchors on the heading.

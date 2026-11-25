---
"@jackyzha0/quartz": minor
---

Transclusions use Obsidian's embed markup: a `div.markdown-embed-title` (the note's title, for a whole-note embed; it was an `h1`), then the content in `div.markdown-embed-content > div.markdown-preview-view.markdown-rendered`, then the link to the original. Obsidian themes' embed styles apply (embed titles, padding, maximum height). The title looks as before without a theme. Obsidian's icon link to the note (`a.markdown-embed-link`, Lucide's maximize-2) follows; Quartz hides it, and Obsidian themes, through @quartz-themes/core, show it in the embed's corner.

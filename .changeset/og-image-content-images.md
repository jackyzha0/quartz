---
"@jackyzha0/quartz": patch
---

Plugin update: og-image 1.2.0. A page's social image (`socialImage`, or Obsidian's `image` / `cover` property) can be an image in the content folder, written as a wikilink (`[[cover.png]]`), a path from the content folder, a path relative to the note, or a bare file name. Before, every value that was not a URL was read as a path in `quartz/static/`.

---
"@jackyzha0/quartz": patch
---

Markdown links in frontmatter are read as CommonMark reads them: angle-bracket destinations with parentheses (`[b](<Note (2024).md>)`), balanced parentheses in plain destinations (`[d](Note_(2024).md)`), titles in `"…"`, `'…'` or `(…)` (`[c](<My Note.md> "t")`), and backslash escapes. They pointed at `note-(2024` and `my-note.md-t`, so the linked note got no backlink or graph edge.

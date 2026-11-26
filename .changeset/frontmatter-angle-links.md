---
"@jackyzha0/quartz": patch
---

Markdown links in frontmatter with an angle-bracket destination, which Obsidian writes for paths with spaces (`[Exec Briefing](<./Exec Briefing.md>)`), resolve to the note instead of a missing `….md` page, so the note gets the backlink and graph edge.

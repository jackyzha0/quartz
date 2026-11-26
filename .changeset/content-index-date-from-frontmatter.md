---
"@jackyzha0/quartz": minor
---

`contentIndex.json` entries have `dateFromFrontmatter: true` when their `date` is the one set in the page's frontmatter for the configured date type (not from git or the file system), so client-side components can tell explicit dates apart, e.g. for folder dates in the explorer.

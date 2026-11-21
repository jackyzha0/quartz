---
"@jackyzha0/quartz": patch
---

Updates `@quartz-community/obsidian-flavored-markdown` to 2.3.1, which renders callout titles in `.callout-title-inner` without a `<p>`, as in Obsidian (themes put the title below its icon otherwise). Callout titles are styled on `.callout-title-inner` itself (colour, margin, line height); the `> p` rule stays for sites on an older obsidian-flavored-markdown.

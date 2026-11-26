---
"@jackyzha0/quartz": patch
---

`slugs.stripDiacritics` reaches plugins and the browser: bases-page 1.5.3, breadcrumbs 1.0.4, canvas-page 1.1.1, explorer 1.2.1, folder-page 1.1.2, note-properties 1.2.1 and obsidian-flavored-markdown 2.5.1 bundle `@quartz-community/utils` 1.3, so their links, tag pages from inline tags, canvas file nodes and base views use the stripped addresses. Quartz also passes the option to scripts in the browser, so the explorer places folders and pages with accents where the build put them.

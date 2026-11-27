---
"@jackyzha0/quartz": patch
---

Plugin updates with the fixes from a test audit:

- note-properties: an empty `tags:` or `aliases:` no longer fails the build.
- bases-page: sorting, filters, formulas and group headings work as in Obsidian.
- encrypted-pages: a numeric `password` encrypts the page, and a custom `outputPath` works.
- darkmode, reader-mode, syntax-highlighting and comments: no double handlers after a page is unlocked.
- stacked-pages: links work under a base path.
- breadcrumbs: `resolveFrontmatterTitle` is honoured.
- canvas-page: a `#View` link selects that view.
- search: fields left out of `fieldPriority` are searched, and excerpts keep their last word.
- explorer: a note next to a folder of the same name stays listed, and folder options apply.
- folder-page, og-image, description, table-of-contents, graph, obsidian-flavored-markdown and utils: smaller fixes.
- latex: `customMacros` work with MathJax. ox-hugo: figure parameters in backticks.

---
"@jackyzha0/quartz": patch
---

Block anchors are `#^id`, as in Obsidian: `@quartz-community/utils` 1.3.2 and `@quartz-community/rehype-obsidian` 1.6.0, bundled by obsidian-flavored-markdown 2.5.3, github-flavored-markdown 2.2.2, canvas-page 1.1.4, note-properties 1.2.3 and bases-page 1.5.5, give blocks `id="^id"` and link to them as `#^id`. A block and a heading with the same name (`^para-1`, `## Para 1`) no longer share an id, so `[[#^para-1]]` and `[[#Para 1]]` each reach their own target. canvas-page also scopes the ids of text nodes rendered with `textNodeMarkdown: basic`.

---
"@jackyzha0/quartz": patch
---

Plugin fixes from the pre-release audit:

- `@quartz-community/latex` 1.1.2: KaTeX's stylesheet applies on pages whose maths comes from a transclusion or a popover, and after SPA navigation (it stayed print-only).
- `@quartz-community/obsidian-flavored-markdown` 2.5.2: bundles rehype-obsidian 1.5.1 and remark-obsidian 2.2.4, so same-page block links (`[[#^id]]`) work, only real YouTube hosts become embeds, large notes use less memory, and under `preset: strict` other plugins' text rewrites survive in notes with callouts; `math: false` works under `strict` with the LaTeX plugin; Markdown-link embeds with a query or in reference style are transcluded.
- `@quartz-community/github-flavored-markdown` 2.2.1: `replacements` leaves autolink text alone, applies to wikilink aliases, and honours backslash escapes; `data-heading` keeps the heading as written.
- `@quartz-community/canvas-page` 1.1.2 and `@quartz-community/tag-page` 1.0.7: file nodes find headings as Obsidian writes them (`#Sub Section`), embeds in text nodes are filled in, text-node tags get tag pages, and ids are unique per node; the tag index lists pages as `h3` under each tag.
- `@quartz-community/search` 1.1.2: Enter on a result navigates without a full reload, `#tags` match with `slugs.stripDiacritics`, and searches ignore accents (`creme` finds "Crème").
- `@quartz-community/explorer` 1.2.2: keeps the current page open after a `render` event without details (encrypted pages), and each explorer's phone button is named after its title.
- `@quartz-community/bases-page` 1.5.4: view tabs follow the WAI-ARIA tabs pattern (arrow keys, unique ids).
- `@quartz-community/graph` 1.0.8: no animation loop while the graph is idle, closed or removed.
- `@quartz-community/created-modified-date` 1.0.5: stand-in dates are marked, so they stay out of `contentIndex.json`, and git dates work for a symlinked vault in a content folder outside git.
- `@quartz-community/og-image` 1.1.3, `@quartz-community/ox-hugo` 1.0.3, `@quartz-community/breadcrumbs` 1.0.5, `@quartz-community/folder-page` 1.1.3, `@quartz-community/note-properties` 1.2.2: descriptions decoded once and keycap/flag emoji in social images; captioned figures and indented code in ox-hugo; utils 1.3.1 (Latin-only `stripDiacritics`).

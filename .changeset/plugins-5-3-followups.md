---
"@jackyzha0/quartz": patch
---

Plugin updates:

- `@quartz-community/explorer` 1.2.0: `sort` option (rules applied in sequence, e.g. folders first, then newest) and `rootFolder` option, so several explorers on one page work side by side; the `order` option is applied; scroll fixes (the bottom fade, the scroll position across SPA navigation with `layout.sidebars.left: scroll`, and opening a page no longer scrolls the page itself).
- `@quartz-community/obsidian-flavored-markdown` 2.5.0: notes, canvases and bases embedded with a Markdown link (`![](note.md#Section)`) are transcluded, as in Obsidian; `math` option (`false` leaves dollar signs as text). With `@quartz-community/rehype-obsidian` 1.5.1: same-page block links (`[[#^id]]`) reach their block, and only images on YouTube become YouTube embeds.
- `@quartz-community/github-flavored-markdown` 2.2.0: `singleTilde` option (`false` strikes only `~~text~~`, as Obsidian does) and `replacements` option (for example Quartz 4's arrows), empty by default.
- `@quartz-community/canvas-page` 1.1.0: the mouse wheel and trackpad pan the canvas, as in Obsidian (`wheelBehavior`); text nodes are rendered with the site's Markdown plugins, so Mermaid diagrams, callouts and math work in them (`textNodeMarkdown`).
- `@quartz-community/utils` 1.3.0: the `stripDiacritics` slug option reaches plugins too; links in embedded folder notes point at the right directory.
- `@quartz-community/created-modified-date` 1.0.4: git dates resolve when `content/` is a symlink to a vault in another git repository.
- `@quartz-community/ox-hugo` 1.0.2: the Markdown rewrites leave code alone and no longer match across unrelated text.

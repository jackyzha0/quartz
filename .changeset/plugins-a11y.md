---
"@jackyzha0/quartz": patch
---

Plugin updates for accessibility and page speed:

- Text in the table of contents, footer, folder and tag listings, search button and Bases group headings meets WCAG AA contrast in light and dark mode. Under an Obsidian theme from quartz-themes (`@quartz-themes/core` 3.2.1), the search button and Bases group headings keep the theme's faint text colour.
- Page listings in folder and tag pages use `<h2>` titles (at the previous size), so headings no longer skip a level.
- Valid ARIA and unique ids in the table of contents, explorer, backlinks, heading anchors and Bases views.
- The graph loads d3 and PixiJS only when it scrolls into view (or when the global graph opens), instead of on every page.
- KaTeX's stylesheet no longer blocks rendering on pages without math.
- `@quartz-community/remark-obsidian` 2.2.3: the `legacy` parser no longer uses memory that grows with the square of the note's length on notes with many tables, lists or other blocks.

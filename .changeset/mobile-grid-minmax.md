---
"@jackyzha0/quartz": patch
---

On phones and tablets, one too-wide item in the header row (a long page title, or an Obsidian theme's styled header) no longer widens the page past the screen. The content column is `minmax(0, 1fr)` instead of `auto` (also in the full-width and minimal frames), and text in the phone header row may break anywhere.

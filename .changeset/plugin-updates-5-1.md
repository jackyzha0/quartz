---
"@jackyzha0/quartz": minor
---

Updated default plugins (see each plugin's changelog for details):

- **Changed heading ids:** with SmartyPants on (the default), a heading containing `--` now gets the same id as on GitHub: `## Range 1--2` → `range-1--2` (was `range-12`). Links that hard-code the old id need updating; `[[page#Range 1--2]]` keeps working. Links Obsidian writes to headings containing `:`, `|`, `^`, `#` or `\` now reach them, and heading ids, links and table-of-contents entries share one slug function (GitHubFlavoredMarkdown 2.1.0, TableOfContents, CrawlLinks, utils 1.1).
- **Changed in Bases:** `file.name` includes the file's extension, as in Obsidian (`Note.md`, `Plan.canvas`); use `file.basename` for the name without it. Base views also list canvas and Excalidraw files with their real paths, `this` in a base embedded in a note is that note, `file.inFolder("")` matches the content root, and Quartz's generated pages (404, tags, folder listings) no longer appear as notes (BasesPage 1.1.0, CanvasPage, Excalidraw).
- Folder pages list folders that hold only canvas, base or other generated pages (FolderPage).
- A footnote referenced only from a table cell past the table's columns is rendered, as in Obsidian (ObsidianFlavoredMarkdown 2.1.1, with remark-obsidian 2.2.0: faster parsing and fixes for deeply nested notes and `\r\n` line endings).
- A short wikilink to an Obsidian folder note (`[[Topic]]` for `Topic/Topic.md`) reaches the folder page (utils 1.1).
- NoteProperties no longer bundles gray-matter's `eval`-based JavaScript frontmatter engine.

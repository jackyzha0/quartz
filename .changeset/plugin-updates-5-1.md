---
"@jackyzha0/quartz": minor
---

Updated default plugins (see each plugin's changelog for details):

- **Changed heading ids:** with SmartyPants on (the default), a heading containing `--` now gets the same id as on GitHub: `## Range 1--2` → `range-1--2` (was `range-12`). Links that hard-code the old id need updating; `[[page#Range 1--2]]` keeps working. Links Obsidian writes to headings containing `:`, `|`, `^`, `#` or `\` now reach them, and heading ids, links and table-of-contents entries share one slug function (GitHubFlavoredMarkdown 2.1.0, TableOfContents, CrawlLinks, utils 1.1).
- **Bases now behave as in Obsidian 1.15** (BasesPage 1.2.0, checked against real Obsidian): subtracting dates gives a duration (`(due - today()).days`); nested tags match (`file.tags.contains("#project")` finds `#project/x`); dates display in the site's locale, and `date()` reads only ISO-style dates; cards use Obsidian's aspect ratio and layout; `link()` with any URL is an external link; a base opens on its first view; tags link to their tag pages; `this.<property>` in an embedded base reads the embedding note. Base views also list canvas and Excalidraw files with their real paths, `this` in an embedded base is that note, and Quartz's generated pages (404, tags, folder listings) no longer appear as notes. **Changed:** `file.tags` keeps `#` and the original case, the `tags` property no longer includes inline tags, `hasTag(a, b)` matches any of its tags, the root folder is `/`, text `contains` ignores case, and the cards' `imageAspectRatio` is height/width (it was inverted). `file.name` is as in Obsidian: a Markdown note's name has no extension (`Note`), other files keep theirs (`Plan.canvas`); `file.fullname` has the extension for every file.
- Folder pages list folders that hold only canvas, base or other generated pages (FolderPage).
- A footnote referenced only from a table cell past the table's columns is rendered, as in Obsidian (ObsidianFlavoredMarkdown 2.1.1, with remark-obsidian 2.2.0: faster parsing and fixes for deeply nested notes and `\r\n` line endings).
- A short wikilink to an Obsidian folder note (`[[Topic]]` for `Topic/Topic.md`) reaches the folder page (utils 1.1).
- NoteProperties no longer bundles gray-matter's `eval`-based JavaScript frontmatter engine.

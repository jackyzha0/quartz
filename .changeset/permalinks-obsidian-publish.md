---
"@jackyzha0/quartz": minor
---

Permalinks work as in Obsidian Publish (jackyzha0/quartz#2572): `permalink: page` makes the note's address `/page`, whatever its file path. Links to the note, backlinks, the graph, the sitemap, RSS and the content index use the permalink, links inside the note still resolve relative to its file, and the note's file path redirects to the permalink (with AliasRedirects, like `aliases`). Previously the permalink was only a redirect to the file path. A permalink that is already another page's address is ignored with a warning. In navigation (the content trie used by the explorer, folder pages and breadcrumbs) the note stays in its folder, as on Obsidian Publish sites.

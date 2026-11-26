---
"@jackyzha0/quartz": minor
---

Links: `disableBrokenWikilinks` is on by default. Internal links to pages that don't exist get the `broken` class, as Obsidian marks unresolved links (`is-unresolved`), so Quartz's and Obsidian themes' unresolved-link styles apply. Tag and folder pages, which are generated later, count as existing. Set `links.disableBrokenWikilinks: false` for the old behaviour.

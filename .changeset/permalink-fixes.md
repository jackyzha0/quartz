---
"@jackyzha0/quartz": patch
---

Permalinks work on large sites: sites of 192 or more files are parsed in worker threads, which didn't receive the permalinks, so a note with a `permalink` was published at its file path (#2644). A permalink with `.` or `..` segments is ignored with a warning instead of writing pages outside the output folder (#2641). With `prettyLinks`, a wikilink to a note whose name has a space or a non-ASCII letter reads as the note's name without its folder, as other links do (#2643).

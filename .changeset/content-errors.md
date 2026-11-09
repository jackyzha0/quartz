---
"@jackyzha0/quartz": patch
---

More build errors caused by content are reported as content problems ("fix the file and build again") instead of "This is likely a Quartz bug": frontmatter that holds a single value or a list instead of properties, Markdown files and assets Quartz can't read (permission denied, a directory named like a note). Plugins can do the same by throwing an `Error` with `quartzContent = true` (see "Reporting problems in content" in Making plugins).

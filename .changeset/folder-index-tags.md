---
"@jackyzha0/quartz": patch
---

Layout conditions: `is-folder-index` is false on tag pages. The all-tags page (`tags/index`) matched it, so components meant for folder pages showed there; nothing under `tags/` counts as a folder index now.

---
"@jackyzha0/quartz": patch
---

Local plugins are stored in `quartz.lock.json` as a path relative to the repo, so `plugin install` can link them on another machine. An absolute path already in the lockfile still works, and a path on another Windows drive stays absolute.

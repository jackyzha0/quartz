---
"@jackyzha0/quartz": patch
---

`quartz plugin install` moves a plugin to its pinned commit even when the plugin's build left tracked files changed (its `package-lock.json`). In CI, a plugin cache restored through `restore-keys` kept those changes, and installing an updated plugin failed with "Please commit your changes or stash them" (#2639).

---
"@jackyzha0/quartz": minor
---

Plugins that fail to load (can't be installed, throw on import, export no plugin) are reported as errors with the plugin, version, the file and line where it failed and what to do, and listed again at the top of the end-of-build summary. Previously some of these failures were silent. Locally the build continues without them; in CI (`CI` set) it fails unless `QUARTZ_ALLOW_BROKEN_PLUGINS=1`. Fixed along the way: the entry module of npm-installed component plugins (and npm plugins without a declared category) was never imported, so their `init(options)` never ran.

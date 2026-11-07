---
"@jackyzha0/quartz": minor
---

Plugin version requirements are enforced: a plugin's `quartzVersion` (`package.json` → `quartz.quartzVersion`, any semver range) is checked when the config loads (a warning locally; in CI — `CI` set — the build fails unless `QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS=1`), by `plugin add` and by `plugin doctor`, with a message saying whether to update Quartz or the plugin. Previously the field was never checked (and the old checker read `">=5.0.0"` as `0.0.0`).

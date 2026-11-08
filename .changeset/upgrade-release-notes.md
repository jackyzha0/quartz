---
"@jackyzha0/quartz": minor
---

`npx quartz upgrade` shows the release notes of every version between the old and the new Quartz, then runs the new version's checks: it restores plugins, runs `plugin doctor` (plugin entries that are built in now, plugins that don't support the new version …) and lists plugin updates. Plugin install/restore skip plugins that are built into Quartz now, and `plugin doctor --fix` also removes their unused lockfile pins.

---
"@jackyzha0/quartz": minor
---

Plugin management: plugin commands exit non-zero on failure, CLI edits keep comments in `quartz.config.yaml`, lockfile pins are honoured everywhere, npm plugins show up in `plugin list`, `plugin add` detects duplicates, misspelled plugin options are flagged, and the new `plugin doctor` checks config, lockfile and installs. `plugin config --set a.b=1` now writes a nested key.

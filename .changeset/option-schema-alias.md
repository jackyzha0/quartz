---
"@jackyzha0/quartz": patch
---

Plugin option checks use the plugin's schema when it is declared as `quartz.optionSchema`, the name first-party plugins and Quartz Syncer use, as well as `quartz.configSchema`. Before, only `configSchema` was read, so the checks for misspelled options or wrong values never used the schemas of first-party plugins.

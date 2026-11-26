---
"@jackyzha0/quartz": minor
---

Experimental `extends` in `quartz.config.yaml`: `extends: default` (or a path) starts from `quartz.config.default.yaml` and applies only the changes in your file. `configuration` and `layout` merge key by key, plugin entries merge with the default entry of the same plugin. Configs without `extends` behave exactly as before.

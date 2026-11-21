---
"@jackyzha0/quartz": minor
---

`quartz build --config <path>` (or `-C`) reads the site configuration from another file than `./quartz.config.yaml`, so the config can live with the content outside the Quartz folder, and one Quartz install can build several content repositories (#2646). With `--watch`/`--serve`, changes to that file trigger a rebuild.

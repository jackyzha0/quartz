---
"@jackyzha0/quartz": minor
---

Plugins can declare what they provide and need (`quartz.capabilities`); the build warns when a required provider is missing (e.g. "backlinks requires data `links` … enable configuration.links"). Rendered plugin components carry `data-quartz-plugin` / `data-quartz-component` attributes, so you can tell which plugin rendered which part of a page. `fetchData` resolves to `{}` instead of rejecting when `contentIndex.json` is missing.

---
"@jackyzha0/quartz": patch
---

Layout fixes: the `has-backlinks` condition works, `byPageType.exclude` matches npm plugin sources, layout overrides in `quartz.ts` are applied, `position: footer` is accepted by the config schema, and typos in positions, display values, frames or page types produce a "did you mean" warning instead of silently dropping the component. `quartz build --verbose` prints a layout report.

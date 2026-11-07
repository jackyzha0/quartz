---
"@jackyzha0/quartz": minor
---

Plugins can ship files with the site: `externalResources()` may return `assets: [{ from, to }]` (a file or directory on disk), which Quartz copies to `static/plugins/<to>`. Client scripts find them through the new `window.quartzStaticUrl` page global (absolute URL of `static/`, valid across SPA navigations). Use it for large or optional client code loaded with `import()` only where needed, instead of inline scripts, which every page downloads. Invalid or conflicting targets and missing sources are build warnings.

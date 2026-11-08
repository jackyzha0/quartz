---
"@jackyzha0/quartz": minor
---

A page type's `generate` can be async: it may return a promise of its virtual pages, which Quartz awaits in full and incremental builds. Page types that create pages from other files (like `.mdx`) can now run content through the site's transformers or bundle with esbuild; previously a promise crashed the build with "virtualPages is not iterable" (#2575).

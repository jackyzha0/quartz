---
"@jackyzha0/quartz": patch
---

Plugins can declare `window.quartzStaticUrl` and `window.quartzPrefetch` in `capabilities.requires.globals` without a false "nothing provides it" warning: Quartz counts both as its own (`quartzPrefetch` unless `prefetch` is off).

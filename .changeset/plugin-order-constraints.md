---
"@jackyzha0/quartz": minor
---

Plugin entries can declare `before:` / `after:` (plugin names). They are checked against `order`: between plugins with the same order they decide, and a contradiction, a cycle or an unknown name stops the build with a clear error. `extends:` also accepts an `https://` URL, fetched with a timeout and cached in `.quartz-cache/extends/` for offline builds (`QUARTZ_EXTENDS_OFFLINE=1`).

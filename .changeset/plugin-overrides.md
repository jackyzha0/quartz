---
"@jackyzha0/quartz": patch
---

`quartz.ts` overrides (`ExternalPlugin.Explorer({...})`) work for npm plugins and for component plugins (#2565): overrides are registered under the key the loader looks up (the package name for npm plugins), and component constructors re-exported from a plugin's sub-module are wrapped too. The wrapper also returns what the plugin returns, so `ExternalPlugin.X(...)` works both as a statement and as a component in a layout override. `quartz plugin …` commands no longer drop npm plugins from the generated `.quartz/plugins/index.ts`; both generators are now one shared module.

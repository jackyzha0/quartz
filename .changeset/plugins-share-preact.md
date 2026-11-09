---
"@jackyzha0/quartz": patch
---

Plugins use Quartz's own Preact instead of each bundling a copy, so components can use hooks and context across plugins (a component using `preact/hooks` with another plugin's components crashed), and plugin bundles are smaller. The default plugins and the plugin template are updated; a third-party plugin made from the template before this release still bundles its own copy until it updates its `tsup.config.ts` (see quartz-community/plugin-template).

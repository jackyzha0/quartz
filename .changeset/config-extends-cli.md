---
"@jackyzha0/quartz": patch
---

`extends` (experimental): `npx quartz plugin list`, `status`, `doctor`, `install`, `prune` and `npx quartz info` read the merged configuration, as the build does. Before, they saw only the entries in your own file, so `list` showed a handful of plugins and `doctor` warned that overlay entries without `enabled` are disabled. `enable`, `disable` and `config` now work on plugins from a base by adding or changing your own entry for them (only that change is written; the merged configuration never is), `config --unset` resets an option a base sets with `null`, and `remove` refuses a plugin that comes from a base. `npx quartz build --serve` also rebuilds when a local base file changes.

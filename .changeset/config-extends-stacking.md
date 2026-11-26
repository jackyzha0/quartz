---
"@jackyzha0/quartz": patch
---

`extends` (experimental): presets in a list now stack. With `extends: [./a.yaml, ./b.yaml]`, where both extend `default`, everything `a.yaml` changed was lost, because `b.yaml` was merged on top with all of `default` again. Each file of the `extends` chain is now applied once, after the bases it extends, so the order is `default` → `a.yaml` → `b.yaml` → your file, and later entries win only where they change the same thing.

Also: a plugin source with a `subdir` and no `name` is matched by repository and folder, so an entry for one plugin of a monorepo no longer changes another; `extends: []` extends nothing; an empty base file is an empty config; `HTTPS://` URLs are accepted; and `plugins:` that isn't a list gets a clear error.

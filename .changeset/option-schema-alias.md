---
"@jackyzha0/quartz": patch
---

Plugin option checks use the option schemas first-party plugins ship. These are declared as `quartz.optionSchema`, the name Quartz Syncer reads, as a flat map of option to type (`{ limit: { type: "number" }, mode: { type: "enum", values: [...] } }`). Before, only a JSON Schema in `quartz.configSchema` was read, so no first-party plugin's schema was used. A misspelled option, an enum value that isn't allowed, or a value of the wrong type is now a warning. A value of the same type as the plugin's default is always accepted, even where a schema disagrees.

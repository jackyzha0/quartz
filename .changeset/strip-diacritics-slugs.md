---
"@jackyzha0/quartz": minor
---

New opt-in `configuration.slugs.stripDiacritics`: strips accents and other diacritics from generated slugs (`české/čeština.md` → `/ceske/cestina`). Links, embeds, aliases, permalinks, tags and folder pages resolve to the stripped addresses, and the old addresses redirect to them; heading anchors keep their diacritics. Letters without a separate accent (`ł`, `ø`, `ß`) are kept, as are Korean, Japanese, Chinese, Indic, Hebrew and Arabic text. Plugins that make slugs follow the option when they bundle `@quartz-community/utils` 1.3 or later, as the plugins updated in this release do.

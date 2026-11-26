---
"@jackyzha0/quartz": minor
---

New opt-in `configuration.slugs.stripDiacritics`: strips accents and other diacritics from generated slugs (`české/čeština.md` → `/ceske/cestina`). Links, embeds, aliases, permalinks, tags and folder pages resolve to the stripped addresses, and the old addresses redirect to them; heading anchors keep their diacritics. Only Latin letters change: they lose their accents and fold to ASCII (`ł` → `l`, `ø` → `o`, `ß` → `ss`, `æ` → `ae`); other scripts (Korean, Japanese, Chinese, Greek, Cyrillic, Indic, Hebrew, Arabic, …) are left as written. Plugins that make slugs follow the option when they bundle `@quartz-community/utils` 1.3 or later, as the plugins updated in this release do (1.3.1 for the ASCII folding).

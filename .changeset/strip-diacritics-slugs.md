---
"@jackyzha0/quartz": minor
---

New opt-in `configuration.slugs.stripDiacritics`: strips accents and other diacritics from generated slugs (`české/čeština.md` → `/ceske/cestina`). Links, embeds, aliases, permalinks and folder pages resolve to the stripped addresses; heading anchors and non-Latin scripts are unchanged. With `@quartz-community/utils` 1.3+ the option also reaches plugins that slug through utils (tag pages, canvas, bases, alias-redirects).

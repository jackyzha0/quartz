---
"@jackyzha0/quartz": minor
---

New opt-in `configuration.slugs.stripDiacritics`: strips accents and other diacritics from generated slugs (`české/čeština.md` → `/ceske/cestina`). Links, embeds, aliases, permalinks and folder pages resolve to the stripped addresses; heading anchors, tag pages and non-Latin scripts are unchanged.

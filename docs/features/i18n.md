---
title: Internationalization
---

Internationalization allows users to translate text in the Quartz interface into various supported languages without needing to make extensive code changes. This can be changed via the `locale` [[configuration]] field in `quartz.config.ts`.

The locale field generally follows a certain format: `{language}-{REGION}`

- `{language}` is usually a [2-letter lowercase language code](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes).
- `{REGION}` is usually a [2-letter uppercase region code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)

> [!tip] Interested in contributing?
> We [gladly welcome translation PRs](https://github.com/jackyzha0/quartz/tree/v4/quartz/i18n/locales)! To contribute a translation, do the following things:
>
> 1. In the `quartz/i18n/locales` folder, copy the `en-US.ts` file.
> 2. Rename it to `{language}-{REGION}.ts` so it matches a locale of the format shown above.
> 3. Fill in the translations!
> 4. Add the entry under `TRANSLATIONS` in `quartz/i18n/index.ts`.

---
title: Callouts
tags:
  - plugin/transformer
---

Quartz supports the same Admonition-callout syntax as Obsidian.

This includes

- 12 Distinct callout types (each with several aliases)
- Collapsable callouts

```
> [!info] Title
> This is a callout!
```

See [documentation on supported types and syntax here](https://help.obsidian.md/Editing+and+formatting/Callouts).

> [!warning]
> Wondering why callouts may not be showing up even if you have them enabled? You may need to reorder your plugins so that `Plugin.ObsidianFlavoredMarkdown()` is _after_ `Plugin.SyntaxHighlighting()`.

## Customization

- Disable callouts: simply pass `callouts: false` to the plugin: `Plugin.ObsidianFlavoredMarkdown({ callouts: false })`
- Editing icons: `quartz/plugins/transformers/ofm.ts`

## Showcase

> [!info]
> Default title

> [!question]+ Can callouts be nested?
>
> > [!todo]- Yes!, they can.
> >
> > > [!example] You can even use multiple layers of nesting.

> [!EXAMPLE] Examples
>
> Aliases: example

> [!note] Notes
>
> Aliases: note

> [!abstract] Summaries
>
> Aliases: abstract, summary, tldr

> [!info] Info
>
> Aliases: info, todo

> [!tip] Hint
>
> Aliases: tip, hint, important

> [!success] Success
>
> Aliases: success, check, done

> [!question] Question
>
> Aliases: question, help, faq

> [!warning] Warning
>
> Aliases: warning, caution, attention

> [!failure] Failure
>
> Aliases: failure, fail, missing

> [!danger] Error
>
> Aliases: danger, error

> [!bug] Bug
>
> Aliases: bug

> [!quote] Quote
>
> Aliases: quote, cite

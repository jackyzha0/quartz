---
page-title: Callouts - Obsidian Help
url: https://help.obsidian.md/Editing+and+formatting/Callouts
date: 2023-07-06 18:28:59
tags:
  - callouts
  - boxes
  - alerts
public: true
created: 2024-02-03
updated: 2024-02-11
---
%%
[[Obsidian|Obsidian]]
%%

Use callouts to include additional content without breaking the flow of your notes.

To create a callout, add `[!info]` to the first line of a blockquote, where `info` is the *type identifier*. The type identifier determines how the callout looks and feels. To see all available types, refer to [Supported types](https://help.obsidian.md/Editing+and+formatting/Callouts#Supported%20types).

```
> [!info]
> Here's a callout block.
> It supports **Markdown**, [[Internal link|Wikilinks]], and [[Embed files|embeds]]!
> ![[og-image.png]]
```

> [!info]
> Here's a callout block.
> It supports **Markdown**, Wikilinks, and Embeds!

If you're also using the Admonitions plugin, you should update it to at least version 8.0.0 to avoid problems with the new callout feature.

### Change the title

By default, the title of the callout is its type identifier in title case. You can change it by adding text after the type identifier:

```
> [!tip] Callouts can have custom titles
> Like this one.
```

> [!tip] Callouts can have custom titles
> Like this one.
Callouts can have custom titles

Like this one.

You can even omit the body to create title-only callouts:

```
> [!tip] Title-only callout
```

> [!tip] Title-only callout
> 
### Foldable callouts

You can make a callout foldable by adding a plus (+) or a minus (-) directly after the type identifier.

A plus sign expands the callout by default, and a minus sign collapses it instead.

```
> [!faq]- Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.
```

> [!faq]- Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.

### Nested callouts

You can nest callouts in multiple levels.

```
> [!question] Can callouts be nested?
> > [!todo] Yes!, they can.
> > > [!example]  You can even use multiple layers of nesting.
```

You can even use multiple layers of nesting.

### Customize callouts

To define a custom callout, create the following CSS block:

```
.callout[data-callout="custom-question-type"] {
    --callout-color: 0, 0, 0;
    --callout-icon: lucide-alert-circle;
}
```

The value of the `data-callout` attribute is the type identifier you want to use, for example `[!custom-question-type]`.

-   `--callout-color` defines the background color using numbers (0–255) for red, green, and blue.
-   `--callout-icon` can be an icon ID from [lucide.dev](https://lucide.dev/), or an SVG element.

Instead of using a Lucide icon, you can also use a SVG element as the callout icon.

```
--callout-icon: '<svg>...custom svg...</svg>';
```

### Supported types

You can use several callout types and aliases. Each type comes with a different background color and icon.

To use these default styles, replace `info` in the examples with any of these types, such as `[!tip]` or `[!warning]`.

Unless you [Customize callouts](https://help.obsidian.md/Editing+and+formatting/Callouts#Customize%20callouts), any unsupported type defaults to the `note` type. The type identifier is case-insensitive.
___
> [!note]
> Lorem ipsum dolor sit amet

```
> [!note]
> Lorem ipsum dolor sit amet
```
___
> [!abstract]
> Lorem ipsum dolor sit amet

```
> [!abstract]
> Lorem ipsum dolor sit amet
```
Aliases: `summary`, `tldr`
___
> [!info]
> Lorem ipsum dolor sit amet

```
> [!info]
> Lorem ipsum dolor sit amet
```
___
> [!todo]
> Lorem ipsum dolor sit amet

```
> [!todo]
> Lorem ipsum dolor sit amet
```
___
> [!tip]
> Lorem ipsum dolor sit amet

```
> [!tip]
> Lorem ipsum dolor sit amet
```
Aliases: `hint`, `important`
___
> [!success]
> Lorem ipsum dolor sit amet

```
> [!success]
> Lorem ipsum dolor sit amet
```
Aliases: `check`, `done`
___
> [!question]
> Lorem ipsum dolor sit amet

```
> [!question]
> Lorem ipsum dolor sit amet
```
Aliases: `help`, `faq`
___
> [!warning]
> Lorem ipsum dolor sit amet

```
> [!warning]
> Lorem ipsum dolor sit amet
```

Aliases: `caution`, `attention`
___
> [!failure]
> Lorem ipsum dolor sit amet

```
> [!failure]
> Lorem ipsum dolor sit amet
```
Aliases: `fail`, `missing`
___
> [!danger]
> Lorem ipsum dolor sit amet

```
> [!danger]
> Lorem ipsum dolor sit amet
```
Alias: `error`
___
> [!bug]
> Lorem ipsum dolor sit amet

```
> [!bug]
> Lorem ipsum dolor sit amet
```
___
> [!example]
> Lorem ipsum dolor sit amet

```
> [!example]
> Lorem ipsum dolor sit amet
```
___
> [!quote]
> Lorem ipsum dolor sit amet
```
> [!quote]
> Lorem ipsum dolor sit amet
```
Alias: `cite`
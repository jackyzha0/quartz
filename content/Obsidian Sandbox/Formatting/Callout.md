As of v0.14.0, Obsidian supports callout blocks, sometimes called "admonitions". Callout blocks are written as a blockquote, inspired by the "alert" syntax from Microsoft Docs.

Callouts are also be supported natively on Obsidian Publish.

> [!NOTE]
> For compatibility reasons, if you're also using the Admonitions plugin, you should update it to at least v8.0.0 to avoid problems with the new callout system.

Use the following syntax to denote a callout block: `> [!INFO]`.

```markdown
> [!INFO]
> Here's a callout block.
> It supports **markdown** and [[Internal link|wikilinks]].
```

It will show up like this:
> [!INFO]
> Here's a callout block.
> It supports **markdown** and [[Internal link|wikilinks]].

### Types

By default, there are 12 distinct callout types, each with several aliases. Each type comes with a different background color and icon.

To use these default styles, replace `INFO` in the examples with any of these types. Any unrecognized type will default to the "note" type, unless they are [[#Customizations|customized]]. The type identifier is case insensitive.

- note
- abstract, summary, tldr
- info, todo
- tip, hint, important
- success, check, done
- question, help, faq
- warning, caution, attention
- failure, fail, missing
- danger, error
- bug
- example
- quote, cite

### Title and body

You can define the title of the callout block, and you can also have a callout without body content.

```markdown
> [!TIP] Callouts can have custom titles, which also supports **markdown**!
```

### Folding

Additionally, you can create a folding callout by adding `+` (default expanded) or `-` (default collapsed) after the block.

```markdown
> [!FAQ]- Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden until it is expanded.
```

Will show up as:

> [!FAQ]- Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden until it is expanded.

### Customizations

Snippets and plugins can define custom callouts, too, or overwrite the default options. Callout types and icons are defined in CSS, where the color is an `r, g, b` tuple and the icon is the icon ID from any internally supported icon (like `lucide-info`). Alternatively, you can specify an SVG icon as a string.

```CSS
.callout[data-callout="my-callout-type"] {
    --callout-color: 0, 0, 0;
    --callout-icon: icon-id;
    --callout-icon: '<svg>...custom svg...</svg>';
}
```

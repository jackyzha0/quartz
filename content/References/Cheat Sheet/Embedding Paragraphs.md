---
public: true
tags:
  - example
  - obsidian
  - parapraph
  - embed
created: 2024-02-06
updated: 2024-02-09
---
You can link to paragraphs using the `^` operator.

You can then link to that paragraph using the `#` attribute in a [[Wikilink|Wikilink]] similarly to linking to a heading.

## Paragraph Example
```markdown
# Title
Paragraph
^paragraph
```

## Embedded Link Example
```markdown
![[Title#^paragraph]]
```
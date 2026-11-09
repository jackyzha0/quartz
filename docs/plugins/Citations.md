---
title: Citations
description: Academic citation and bibliography support via BibTeX.
tags:
  - plugin/transformer
image: https://images.unsplash.com/photo-1582079133805-43655f026448
repository: "[quartz-community/citations](https://github.com/quartz-community/citations)"
enabled: false
required: false
---

This plugin adds Citation support to Quartz.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `bibliographyFile`: the path to the bibliography file. Defaults to `./bibliography.bib`. This is relative to git source of your vault.
- `suppressBibliography`: whether to suppress the bibliography at the end of the document. Defaults to `false`.
- `linkCitations`: whether to link citations to the bibliography. Defaults to `false`.
- `csl`: the citation style to use. Defaults to `apa`. Reference [rehype-citation](https://rehype-citation.netlify.app/custom-csl) for more options.

## API

- Category: Transformer
- Function name: `ExternalPlugin.Citations()`.
- Source: [`quartz-community/citations`](https://github.com/quartz-community/citations)
- Install: `npx quartz plugin add @quartz-community/citations`

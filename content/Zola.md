---
title: Zola
description: Zola is a fast static site generator in a single binary with everything built-in.
compartir: true
---

## Introduction

[Zola](https:) is a fast [[./Static Site Generators|static site generator]] (SSG) contained in a single binary with everything built-in, it has no other dependencies. It is _by far_ my preferred way to build static websites.

SSGs use dynamic templates to transform content into static HTML pages. Static sites are thus very fast and require no databases, making them easy to host. Content is written in [[./Markdown|Markdown]].

## Useful Commands

```sh
# Initiate Zola project
zola init

# Serve Zola website
zola serve

# Build check
zola check

# Build w/ Options
zola --root /path/to/project --config config.staging.toml build --base-url $DEPLOY_URL --output-dir $DOCUMENT_ROOT
```

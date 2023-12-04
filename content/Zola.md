---
title: Zola
description: Zola is a fast static site generator in a single binary with everything built-in.
updated: 2023-12-04
compartir: true
---


[Zola](https:) is a fast [[./Static Site Generators|static site generator]] contained in a single binary with everything built-in. It is _by far_ my preferred way to build static websites.

## Useful Commands

```bash
zola build --base-url $DEPLOY_URL
```

```bash
zola build --output-dir $DOCUMENT_ROOT
```

```bash
zola --config config.staging.toml build
```

```bash
zola --root /path/to/project build
```

```bash
zola init
```

```bash
zola serve
```

```bash
zola check
```

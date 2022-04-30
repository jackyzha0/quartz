---
title: "Ignoring Notes"
---

### Quartz Ignore
Edit `ignoreFiles` in `config.toml` to include paths you'd like to exclude from being rendered.

```toml
...
ignoreFiles = [  
    "/content/templates/*",  
    "/content/private/*", 
    "<your path here>"
]
```

`ignoreFiles` supports the use of Regular Expressions (RegEx) so you can ignore patterns as well (e.g. ignoring all `.png`s by doing `\\.png$`).
To ignore a specific file, you can also add the tag `draft: true` to the frontmatter of a note.

```markdown
---
title: Some Private Note
draft: true
---
...
```

More details in [Hugo's documentation](https://gohugo.io/getting-started/configuration/#ignore-content-and-data-files-when-rendering).

### Global Ignore
However, just adding to the `ignoreFiles` will only prevent the page from being access through Quartz. If you want to prevent the file from being pushed to GitHub (for example if you have a public repository), you need to also add the path to the `.gitignore` file at the root of the repository.
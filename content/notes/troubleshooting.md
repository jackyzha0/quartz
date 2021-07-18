---
title: "Troubleshooting and FAQ"
---

## Common Pitfalls
### How come my notes aren't being rendered?
You probably forgot to include front matter in your Markdown files. You can either setup [Obsidian](notes/obsidian) to do this for you or you need to manually define it. More details in [the 'how to edit' guide](notes/editing.md).

### My custom domain isn't working!
Walk through the steps in [the hosting guide](notes/hosting.md) again. Make sure you wait 30 min to 1 hour for changes to take effect.

### How do I setup Google Analytics?
You can edit it in `config.toml` and either use a V3 (UA-) or V4 (G-) tag.

### How do I change the content on the home page?
To edit the main home page, open `/content/_index.md`.

### How do I change the colours?
You can change the theme by editing `assets/custom.scss`. More details on customization and themeing can be found in the [customization guide](notes/config.md).

### How do I add images?
You can put images anywhere in the `/content` folder. The only caveat is that you should reference them in your Markdown by prefixing it with a `/`.

```markdown
Example image (source is in content/notes/images/example.png)
![Example Image](/content/notes/images/example.png)
```

### My Interactive Graph and Backlinks aren't up to date
By default, the `linkIndex.yaml` (which Quartz needs to generate the Interactive Graph and Backlinks) are not regenerated locally. To set that up, see the guide on [local editing](notes/editing.md)

### Can I use React/Vue/some other framework?
Not out of the box. You could probably make it work by editing `/layouts/_default/single.html` but that's not what Quartz is designed to work with. 99% of things you are trying to do with those frameworks you can accomplish perfectly fine using just vanilla HTML/CSS/JS.

## Still Stuck?
Quartz isn't perfect! If you're still having troubles, file an issue in the GitHub repo with as much information as you can reasonably provide.

🐛 [Submit an Issue](https://github.com/jackyzha0/quartz/issues)
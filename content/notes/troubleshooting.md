---
title: "Troubleshooting and FAQ"
---

Still having trouble? Here are a list of common questions and problems people encounter when installing Quartz.

While you're here, join our [Discord](https://discord.gg/cRFFHYye7t) :)

### Does Quartz have Latex support?
Not by default! You can create a partial using something like Katex under `head/katex.html` and render the partial somewhere using  `{{ partial "head/katex.html" . }}` (most likely in `layouts/_default/single.html`).

```html
<link rel="stylesheet" href="[https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css](https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css)" integrity="sha384-R4558gYOUz8mP9YWpZJjofhk+zx0AS11p36HnD2ZKj/6JR5z27gSSULCNHIRReVs" crossorigin="anonymous">
<script defer src="[https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js](https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js)" integrity="sha384-z1fJDqw8ZApjGO3/unPWUPsIymfsJmyrDVWC8Tv/a1HeOtGmkwNd/7xUS0Xcnvsx" crossorigin="anonymous"></script>
<script defer src="[https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/contrib/auto-render.min.js](https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/contrib/auto-render.min.js)" integrity="sha384-+XBljXPPiv+OzfbB3cVmLHf4hdUFHlWNZN5spNQ7rmHTXpd7WvJum6fIACpNNfIR" crossorigin="anonymous"
onload="renderMathInElement(document.body);"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
	renderMathInElement(document.body, {
		delimiters: [
			{left: '$$', right: '$$', display: true},
			{left: '$', right: '$', display: false},
			{left: '\\(', right: '\\)', display: false},
			{left: '\\[', right: '\\]', display: true}
		],
		throwOnError : false
	});
});
</script>
```

Example page: [jzhao.xyz/thoughts/object-classification](https://jzhao.xyz/thoughts/object-classification/)

### My <\iframe\> is not rendering!

Hugo's safeHTML enables this! This is disabled by default for security reasons but you can do this manually by changing `{{.Content}}` to `{{.Content | safeHTML}}` in `layouts/_default/single.html`.

### Can I use \<Obsidian Plugin\> in Quartz?
Unless it produces direct Markdown output in the file, no. There currently is no way to bundle plugin code with Quartz.

The easiest way would be to add your own HTML partial that supports the functionality you are looking for.

### My GitHub pages is just showing the README and not Quartz
Make sure you set the source to deploy from `master` (and not `hugo`) using `/ (root)`! See more in the [hosting](/notes/hosting) guide

### Some of my pages have 'January 1, 0001' as the last modified date
This is a problem caused by `git` treating files as case-insensitive by default and some of your posts probably have capitalized file names. You can turn this off in your Quartz by running this command.

```shell
# in the root of your Quartz (same folder as config.toml)
git config core.ignorecase true

# or globally (not recommended)
git config --global core.ignorecase true
```

### Can I publish only a subset of my pages?
Yes! Quartz makes selective publishing really easy. Heres a guide on [excluding pages from being published](notes/ignore%20notes.md).

### Can I host this myself and not on GitHub Pages?
Yes! All built files can be found under `/public` in the `master` branch. More details under [hosting](notes/hosting.md).

### `command not found: hugo-obsidian`
Make sure you set your `GOPATH` correctly! This will allow your terminal to correctly recognize `hugo-obsidian` as an executable.

```shell
# Add the following 2 lines to your ~/.bash_profile
export GOPATH=/Users/$USER/go
export PATH=$GOPATH/bin:$PATH

# In your current terminal, to reload the session
source ~/.bash_profile
```

### How come my notes aren't being rendered?
You probably forgot to include front matter in your Markdown files. You can either setup [Obsidian](notes/obsidian.md) to do this for you or you need to manually define it. More details in [the 'how to edit' guide](notes/editing.md).

### My custom domain isn't working!
Walk through the steps in [the hosting guide](notes/hosting.md) again. Make sure you wait 30 min to 1 hour for changes to take effect.

### How do I setup Google Analytics?
You can edit it in `config.toml` and either use a V3 (UA-) or V4 (G-) tag.

### How do I change the content on the home page?
To edit the main home page, open `/content/_index.md`.

### How do I change the colours?
You can change the theme by editing `assets/custom.scss`. More details on customization and themeing can be found in the [customization guide](notes/config.md).

### How do I add images?
You can put images anywhere in the `/content` folder.

```markdown
Example image (source is in content/notes/images/example.png)
![Example Image](/content/notes/images/example.png)
```

### My Interactive Graph and Backlinks aren't up to date
By default, the `linkIndex.json` (which Quartz needs to generate the Interactive Graph and Backlinks) are not regenerated locally. To set that up, see the guide on [local editing](notes/editing.md)

### Can I use React/Vue/some other framework?
Not out of the box. You could probably make it work by editing `/layouts/_default/single.html` but that's not what Quartz is designed to work with. 99% of things you are trying to do with those frameworks you can accomplish perfectly fine using just vanilla HTML/CSS/JS.

## Still Stuck?
Quartz isn't perfect! If you're still having troubles, file an issue in the GitHub repo with as much information as you can reasonably provide. Alternatively, you can message me on [Twitter](https://twitter.com/_jzhao) and I'll try to get back to you as soon as I can.

🐛 [Submit an Issue](https://github.com/jackyzha0/quartz/issues)
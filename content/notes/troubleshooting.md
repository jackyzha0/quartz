---
title: "Troubleshooting and FAQ"
---

Still having trouble? Here are a list of common questions and problems people encounter when installing Quartz.

While you're here, join our [Discord](https://discord.gg/cRFFHYye7t) :)

### Does Quartz have Latex support?
Yes! See [CJK + Latex Support (测试)](notes/CJK%20+%20Latex%20Support%20(测试).md) for a brief demo.

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
# Add the following 2 lines to your ~/.bash_profile (~/.zshrc if you are on Mac)
export GOPATH=/Users/$USER/go
export PATH=$GOPATH/bin:$PATH

# In your current terminal, to reload the session
source ~/.bash_profile # again, (~/.zshrc if you are on Mac)
```

### How come my notes aren't being rendered?
You probably forgot to include front matter in your Markdown files. You can either setup [Obsidian](notes/obsidian.md) to do this for you or you need to manually define it. More details in [the 'how to edit' guide](notes/editing.md).

### My custom domain isn't working!
Walk through the steps in [the hosting guide](notes/hosting.md) again. Make sure you wait 30 min to 1 hour for changes to take effect.

### How do I setup analytics?
Quartz by default uses [Plausible](https://plausible.io/) for analytics. 

If you would prefer to use Google Analytics, you can follow this [guide in the Hugo documentation](https://gohugo.io/templates/internal/#google-analytics). 

Alternatively, you can also import your Google Analytics data into Plausible by [following this guide](https://plausible.io/docs/google-analytics-import).


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

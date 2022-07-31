---
title: "Updating"
aliases:
- update
---

Haven't updated Quartz in a while and want all the cool new optimizations? On Unix/Mac systems you can run the following command for a one-line update! This command will show you a log summary of all commits since you last updated, press `q` to acknowledge this. Then, it will show you each change in turn and press `y` to accept the patch or `n` to reject it. Usually you should press `y` for most of these unless it conflicts with existing changes you've made! 

```shell
make update
```

Or, if you don't want the interactive parts and just want to force update your local garden (this assumed that you are okay with some of your personalizations been overriden!)

```shell
make update-force
```

Or, manually checkout the changes yourself.

> [!warning] Warning!
>
> If you customized the files in `data/`, or anything inside `layouts/`, your customization may be overwritten!
> Make sure you have a copy of these changes if you don't want to lose them.


```shell
# add Quartz as a remote host
git remote add upstream git@github.com:jackyzha0/quartz.git

# index and fetch changes
git fetch upstream
git checkout -p upstream/hugo -- layouts .github Makefile assets/js assets/styles/base.scss assets/styles/darkmode.scss config.toml data 
```

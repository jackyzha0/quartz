---
title: "Setup"
tags:
- setup
---

## Making your own Quartz
Setting up Quartz requires a basic understanding of `git`. If you are unfamiliar, [this resource](https://resources.nwplus.io/2-beginner/how-to-git-github.html) is a great place to start!

### Forking
> A fork is a copy of a repository. Forking a repository allows you to freely experiment with changes without affecting the original project.

Navigate to the GitHub repository for the Quartz project:

📁 [Quartz Repository](https://github.com/jackyzha0/quartz)

Then, Fork the repository into your own GitHub account. If you don't have an account, you can make on for free [here](https://github.com/join). More details about forking a repo can be found on [GitHub's documentation](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

### Cloning
After you've made a fork of the repository, you need to download the files locally onto your machine. Ensure you have `git`, then type the following command replacing `YOUR-USERNAME` with your GitHub username.

```shell
$ git clone https://github.com/YOUR-USERNAME/quartz
```

## Editing
Great! Now you have everything you need to start editing and growing your digital garden. If you're ready to start writing content already, check out the recommended flow for editing notes in Quartz.

✏️ [Editing Notes in Quartz](notes/editing.md)

Having problems? Checkout our [FAQ and Troubleshooting guide](notes/troubleshooting.md).

## Updating
Haven't updated Quartz in a while and want all the cool new optimizations? On Unix/Mac systems you can run the following command for a one-line update! This command will show you a log summary of all commits since you last updated, press `q` to acknowledge this. Then, it will show you each change in turn and press `y` to accept the patch or `n` to reject it. Usually you should press `y` for most of these unless it conflicts with existing changes you've made! 

```shell
make update

# or, if you don't want the interactive parts and just want the update
make update-force
```

Or, manually checkout the changes yourself.

> ⚠️ **WARNING** ⚠️
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

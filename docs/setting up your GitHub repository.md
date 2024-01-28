---
title: Setting up your GitHub repository
---

First, make sure you have Quartz [[index#🪴 Get Started|cloned and setup locally]].

Then, create a new repository on GitHub.com. Do **not** initialize the new repository with `README`, license, or `gitignore` files.

![[github-init-repo-options.png]]

At the top of your repository on GitHub.com's Quick Setup page, click the clipboard to copy the remote repository URL.

![[github-quick-setup.png]]

In your terminal of choice, navigate to the root of your Quartz folder. Then, run the following commands, replacing `REMOTE-URL` with the URL you just copied from the previous step.

```bash
# list all the repositories that are tracked
git remote -v

# if the origin doesn't match your own repository, set your repository as the origin
git remote set-url origin REMOTE-URL

# if you don't have upstream as a remote, add it so updates work
git remote add upstream https://github.com/jackyzha0/quartz.git
```

Then, you can sync the content to upload it to your repository. This is a helper command that will do the initial push of your content to your repository.

```bash
npx quartz sync --no-pull
```

> [!warning]- `fatal: --[no-]autostash option is only valid with --rebase`
> You may have an outdated version of `git`. Updating `git` should fix this issue.

In future updates, you can simply run `npx quartz sync` every time you want to push updates to your repository.

> [!hint] Flags and options
> For full help options, you can run `npx quartz sync --help`.
>
> Most of these have sensible defaults but you can override them if you have a custom setup:
>
> - `-d` or `--directory`: the content folder. This is normally just `content`
> - `-v` or `--verbose`: print out extra logging information
> - `--commit` or `--no-commit`: whether to make a `git` commit for your changes
> - `--push` or `--no-push`: whether to push updates to your GitHub fork of Quartz
> - `--pull` or `--no-pull`: whether to try and pull in any updates from your GitHub fork (i.e. from other devices) before pushing

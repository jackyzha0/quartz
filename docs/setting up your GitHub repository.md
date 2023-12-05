---
title: Setting up your GitHub repository
---

First, make sure you have Quartz [[index#🪴 Get Started|cloned and setup locally]].

Then, create a new repository on GitHub.com. Do **not** initialize the new repository with `README`, license, or `gitignore` files.

![[github-init-repo-options.png]]

At the top of your repository on GitHub.com's Quick Setup page, click the clipboard to copy the remote repository URL.

![[github-quick-setup.png]]

In your terminal of choice, navigate to the root of your Quartz folder. Then, run the following command, replacing `REMOTE-URL` with the URL you just copied from the previous step.

```bash
git remote add origin REMOTE-URL
```

To verify that you set the remote URL correctly, run the following command.

```bash
git remote -v
```

Then, you can sync the content to upload it to your repository.

```bash
npx quartz sync
```

---
title: "Upgrading Quartz"
---

> [!note]
> This is specifically a guide for upgrading Quartz 4 version to a more recent update. If you are coming from Quartz 3, check out the [[migrating from Quartz 3|migration guide]] for more info.

To fetch the latest Quartz updates, simply run

```bash
npx quartz upgrade
```

As Quartz uses [git](https://git-scm.com/) under the hood for versioning, updating effectively 'pulls' in the updates from the official Quartz GitHub repository. If you have local changes that might conflict with the updates, you may need to resolve these manually yourself (or, pull manually using `git pull origin upstream`).

If you have the [GitHub desktop app](https://desktop.github.com/), this will automatically open to help you resolve the conflicts. Otherwise, you will need to resolve this in a text editor like VSCode. For more help on resolving conflicts manually, check out the [GitHub guide on resolving merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line#competing-line-change-merge-conflicts).

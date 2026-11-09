---
title: quartz sync
---

The `sync` command automates the process of pushing your local changes to GitHub and pulling updates from your remote repository. It simplifies the Git workflow for users who want to keep their site updated without running manual Git commands.

## Flags

| Flag          | Shorthand | Description                         | Default                    |
| ------------- | --------- | ----------------------------------- | -------------------------- |
| `--directory` | `-d`      | The content folder                  | `content`                  |
| `--verbose`   | `-v`      | Enable detailed logging             | `false`                    |
| `--commit`    |           | Whether to commit changes           | `true`                     |
| `--no-commit` |           | Skip committing changes             | `false`                    |
| `--message`   | `-m`      | Custom commit message               | `Quartz sync: <date time>` |
| `--push`      |           | Whether to (force-)push to remote   | `true`                     |
| `--no-push`   |           | Skip pushing changes                | `false`                    |
| `--pull`      |           | Whether to pull changes from remote | `true`                     |
| `--no-pull`   |           | Skip pulling changes                | `false`                    |

## Workflow

When you run `npx quartz sync`, Quartz performs the following steps:

1. **Commit**: It stages all new and modified files in your project (`git add .`) and commits them.
2. **Pull**: It merges the `v5` branch of your repository (`origin`) into your branch.
3. **Push**: It force-pushes your current branch to `origin` (`git push -uf`).

> [!warning] `sync` force-pushes
> The push overwrites the remote branch with your local one. If you skip the pull (`--no-pull`) while the remote has commits you don't have — for example from another device or a GitHub edit — those commits are lost on the remote.

## Common Workflows

### Regular Sync

The most common usage is to simply run the command with no flags. This commits, pulls, and pushes everything.

```shell
npx quartz sync
```

### First Sync

If you have just set up a new repository and haven't pushed anything yet, you might want to skip the pull step.

```shell
npx quartz sync --no-pull
```

### Custom Commit Message

You can provide a more descriptive message for your changes.

```shell
npx quartz sync --message "add new notes about gardening"
```

### Sync from Another Device

If you are working on a different computer and just want to get the latest changes without pushing anything back yet.

```shell
npx quartz sync --no-push --no-commit
```

## Troubleshooting

### Git Buffer

If you have a very large number of changes, Git might occasionally fail due to buffer limits. If this happens, try syncing smaller batches of files or increasing your Git post buffer size.

### Autostash

Quartz pulls with `git pull --no-rebase --autostash --no-edit --allow-unrelated-histories`: remote changes are merged (not rebased) without opening an editor, and uncommitted changes (e.g. with `--no-commit`) are set aside during the pull and brought back afterwards. If a conflict occurs, resolve it with standard Git tools, commit, and run `npx quartz sync --no-pull`.

For more information on initial setup, see [[installation]].

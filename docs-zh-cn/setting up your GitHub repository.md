---
title: 设置GitHub仓库
---

First, make sure you have Quartz [[index#🪴 Get Started|cloned and setup locally]].
首先，确保您有Quartz[[index#🪴 快速上手|克隆并在本地安装]]。

然后，在GitHub.com上创建一个新的存储库。**不要**使用“README”、许可证或“gitignore”文件初始化新存储库。

![[github-init-repo-options.png]]

在GitHub.com的“Quick Setup”页面上的存储库顶部，单击clipboard复制远程仓库地址。

![[github-quick-setup.png]]

在您选择的终端中，导航到Quartz文件夹的根目录。然后，运行以下命令，将`REMOTE-URL`替换为您刚刚从上一步复制的URL。

```bash
# list all the repositories that are tracked
git remote -v

# if the origin doesn't match your own repository, set your repository as the origin
git remote set-url origin REMOTE-URL

# if you don't have upstream as a remote, add it so updates work
git remote add upstream https://github.com/jackyzha0/quartz.git
```

然后，您可以同步内容以将其上传到仓库。这是一个助手命令，用于将内容初始推送到存储库。

```bash
npx quartz sync --no-pull
```

> [!warning]- `fatal: --[no-]autostash option is only valid with --rebase`
> 你可能有一个过时的`git`.版本。更新`git`.应该可以解决此问题。

在未来的更新中，每次您想将更新推送到存储库时，只需运行 `npx quartz sync` 即可。

> [!hint] Flags and options
> 有关完整帮助选项，您可以运行`npx-quarter-sync--help`。
> 
> 其中大多数都有合理的默认值，但如果您有自定义设置，则可以覆盖它们：
>
> - `-d` or `--directory`:  `content`内容文件夹。默认是`content``
> - `-v` or `--verbose`: 打印出额外的日志信息
> - `--commit` or `--no-commit`: 是否对您的更改进行 `git` 提交
> - `--push` or `--no-push`: 是否将更新推送到Quartz的GitHub分支
> - `--pull` or `--no-pull`: 在推送之前，是否尝试从你的GitHub（即从其他设备）获取任何更新

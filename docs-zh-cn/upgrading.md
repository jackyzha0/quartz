---
title: 升级 Quartz
---

> [!note]
> 这是一个专门用于将Quartz 4版本升级到最新更新的指南。如果您来自Quartz 3，请查看[[migrating from Quartz 3|迁移指南]]了解更多信息。

要获取最新的Quartz更新，只需运行

```bash
npx quartz update
```

Quartz使用[git](https://git-scm.com/)在版本控制的框架下，从官方Quartz GitHub仓库中拉取更新。如果您的更新与本地更改冲突，您可能需要自己手动解决这些问题（或者，使用`git pull origin upstream`手动拉取）。

> [!hint]
> Quartz将尝试在更新前缓存您的内容，以防止合并冲突。如果在合并过程中遇到冲突，可以停止合并，然后运行`npx quartz restore` 从缓存中恢复内容。

如果你有[GitHub桌面应用程序](https://desktop.github.com/)，这将自动打开以帮助您解决冲突。否则，您将需要在像VSCode这样的文本编辑器中解决此问题。有关手动解决冲突的更多帮助，请查看[GitHub解决合并冲突指南](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line#competing-行更改合并冲突)。

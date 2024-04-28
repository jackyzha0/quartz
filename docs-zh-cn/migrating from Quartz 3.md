---
title: 从Quartz 3迁移
---

由于您已经在本地拥有Quartz，因此不需要创建分支或克隆它。只需检出alpha分支，安装依赖项，然后导入旧的vault。

```bash
git fetch
git checkout v4
git pull upstream v4
npm i
npx quartz create
```

如果您遇到类似 `fatal: 'upstream' does not appear to be a git repository`的错误，请确保将`upstream` 添加为远端来源：

```shell
git remote add upstream https://github.com/jackyzha0/quartz.git
```

当运行 `npx quartz create`,时，系统将提示您如何初始化内容文件夹。在这里，你可以选择导入或链接你以前的内容文件夹，Quartz应该能像你期望的那样工作。

> [!note]
> 如果要使用的存在内容文件夹位于不同分支上的同一路径，请在不同路径的某个位置再次克隆repo以使用它。

## 关键变化

1.  **删除Hugo和`hugo-obsidian`**：Hugo在早期版本的Quartz中运行良好，但这也让Golang和Hugo社区以外的人很难完全了解Quartz在引擎盖下做了什么，并能够根据他们的需求进行适当的定制。Quartz 4现在使用基于节点的静态站点生成过程，这将导致更有用的错误消息和更流畅的用户体验。
2. **完全热更新**：`hugo-obsidian`与hugo集成的许多粗糙边缘意味着观察模式不会重新触发`hugo-obsidian` 更新内容索引。这导致了许多观察模式输出不准确的奇怪情况。Quartz 4现在使用了一个内聚的解析、过滤和发送管道，它在每次更改时都会运行，因此热更新加载总是准确的。
3. **用JSX替换Go模板语法**：Quartz 3使用[Go templates](https://pkg.go.dev/text/template)以创建页面布局。然而，该语法不适合进行任何类型的复杂渲染（如[文本处理](https://github.com/jackyzha0/quartz/blob/hugo/layouts/partials/textprocessing.html))并且很难对Quartz 3进行任何有意义的布局更改。Quartz 4使用了一个名为JSX的JavaScript语法扩展，它允许您在JavaScript中编写看起来像HTML的布局代码，这明显更容易理解和维护。
4. **一个新的可扩展[[configuration]]和[[configuration#Plugins|插件]]系统**：Quartz 3在没有技术知识的情况下很难配置Hugo的部分是如何工作的。甚至很难去扩展。Quartz 4的配置和插件系统旨在由用户扩展，同时使更新到新版本的Quartz变得容易。

## 需要更新的内容

- 您将需要更新您的部署脚本。有关更多详细信息，请参阅[[hosting]]指南。
- 确保您在GitHub上的默认分支已从“hugo”更新为“v4”。
- [[folder and tag listings|folder and tag listings]] 也发生了更改。
  - 文件夹描述应位于`content/<folder-name>/index.md` 下，其中`<folder-name>`是文件夹的名称。
  - Tag 描述应位于`content/tags/<tag-name>.md`下，其中`<tag-name>` 是标记的名称。
- Quartz 3和Quartz 4之间的某些HTML布局可能不相同。如果您依赖于特定的HTML层次结构或类名，则可能需要更新自定义CSS以反映这些更改。
- 如果您自定义了Quartz 3的布局，您可能需要将这些更改从Go模板转换回JSX，因为Quartz 4不再使用Hugo。对于组件，请查看有关[[创建组件]]的指南以了解更多详细信息。

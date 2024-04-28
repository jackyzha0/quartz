---
title: 欢迎来到 Quartz 4
---

Quartz 是一款快速、开箱即用的静态博客生成器。能将 Markdown 内容转换成功能齐全的网站。许多的学生、开发者和老师[[showcase|已经在使用 Quartz]]发布个人笔记、网站和[数字花园](https://jzhao.xyz/posts/networked-thought)到网上。

## 🪴 快速上手

Quartz 需要 [Node](https://nodejs.org/) 版本 **v18.14** 和 `npm` 版本 v9.3.1 以上才能正常工作。请确保您的设备上已经安装了再继续。

然后，打开您的命令行工具，输入下面的命令：

```shell
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create
```

这将指导您初始化Quartz。完成后再进行下面的步骤：

1. 在 Quartz 中 [[authoring content|写入内容]]
2. 修改Quartz的[[configuration|配置]]
3. 更改Quartz的[[layout|布局]]
4. [[build|打包并预览]]Quartz
5. 同步更新到[[setting up your GitHub repository|Gihub]]上
6. [[hosting|部署]]Quartz到线上


如何您更喜欢视频形式的介绍，您可以观看`Nicole van der Hoeven` 的视频 [video guide on how to set up Quartz!](https://www.youtube.com/watch?v=6s6DT1yN4dw&t=227s)。

## 🔧 功能

- [[Obsidian compatibility|Obsidian兼容性]], [[full-text search|全文搜索]], [[graph view|关系图谱]], 笔记翻译, [[wikilinks]], [[backlinks|反向链接]], [[features/Latex|Latex]], [[syntax highlighting|高亮语法]], [[popover previews|弹出式预览]], [[Docker Support|Doker支持]], [[i18n|国际化]] 和 [更多](./features) 开箱即用的功能。
- 配置和内容的热更新
- 简单的JSX布局和[[creating components|页面组件]]
- [[SPA Routing|页面加载速度快得离谱]]并且包体积很小
- 通过[[making plugins|插件]]可以实现完全自定义的解析、过滤和页面生成

完整的功能列表可以访问[功能页面](/features)。您可以在[[philosophy|哲学]]页面上阅读更多关于这些功能的信息并且在 [[architecture|架构设计]]页面了解技术概述。

## 🚧 故障排除 + 更新

有任何关于Quartz的问题？请尝试在issue中搜索。如果没有解决，请[[upgrading|升级]]Quartz最新的版本查看问题是否修复。

如果您仍然有问题，如果您觉得发现了一个bug, 请提交[issue](https://github.com/jackyzha0/quartz/issues)或者在我们的[社区](https://discord.gg/cRFFHYye7t)中寻求帮助。

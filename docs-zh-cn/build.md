---
title: 构建Quartz
---

一旦你有了[[index#🪴 快速上手|初始化]]的Quartz，让我们看看它在本地是什么样子的：

```bash
npx quartz build --serve
```

这将启动一个本地web服务器，在您的计算机上运行Quartz。打开web浏览器并访问`http://localhost:8080/`查看它。

> [!hint] 标志和选项
> 有关完整的帮助选项，您可以运行`npx-quarter-build--help`。
>
> 其中大多数都有合理的默认值，但如果您有自定义设置，则可以覆盖它们：
>
> - `-d` or `--directory`: 内容文件夹。通常都是`content`
> - `-v` or `--verbose`: 打印出额外的日志信息
> - `-o` or `--output`: 输出文件夹。通常都是`public``
> - `--serve`: 运行本地热更新加载服务器以预览Quartz
> - `--port`: 运行本地预览服务器的端口
> - `--concurrency`: 要使用多少个线程来分析笔记

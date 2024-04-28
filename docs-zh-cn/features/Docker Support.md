---
title: Docker 支持
---

Quartz附带了一个Docker镜像，可以让您在不安装Node的情况下在本地预览Quartz。

您可以在Docker中运行下面的行来运行Quartz。

```sh
docker run --rm -itp 8080:8080 $(docker build -q .)
```

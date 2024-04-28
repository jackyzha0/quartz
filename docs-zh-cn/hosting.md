---
title: 部署
---

Quartz有效地将您的Markdown文件和其他资源转化为HTML、JS和CSS文件的捆绑包（一个网站！）。

然而，如果你想向全世界发布你的网站，你需要一种在线托管的方式。本指南将详细介绍如何使用常见的托管提供商进行部署，但任何允许您部署静态HTML的服务都应该同样有效。

> [!warning]
> 本指南的其余部分假设您已经为Quartz创建了自己的GitHub仓库。如果你还没有，请[[setting up your GitHub repository|确保你这样做]]。

> [!hint]
> 一些Quartz功能（如[[RSS订阅]]和网站地图生成）需要在您的[[configuration]] 以正常工作。请确保在部署之前设置了此项！

## Cloudflare Pages

1. 登录[Cloudflare](https://dash.cloudflare.com/)并选择您的帐户。
2. 在“帐户主页”中，选择**工作人员和页面***>**创建应用程序**>**页面**>**连接到Git**。
3. 选择您创建的新GitHub仓库，并在**设置构建和部署**部分提供以下信息：

| Configuration option   | Value              |
| ---------------------- | ------------------ |
| Production branch      | `v4`               |
| Framework preset       | `None`             |
| Build command          | `npx quartz build` |
| Build output directory | `public`           |
按“保存并部署”，Cloudflare应该会在大约一分钟内部署好您的站点版本。然后，每次您将Quartz更改同步到GitHub时，您的网站都应该更新。

要添加自定义域，请查看[Cloudflare的文档](https://developers.cloudflare.com/pages/platform/custom-domains/).

> [!warning]
> Cloudflare Pages默认情况下执行浅层克隆，因此，如果您依赖“git”来获取时间戳，建议您在构建命令的开头添加 `git fetch --unshallow &&`（例如，`git fetch --unshallow && npx quartz build`）。

## GitHub Pages

在您的本地Quartz中，创建一个新文件 `quartz/.github/workflows/deploy.yml`。

```yaml title="quartz/.github/workflows/deploy.yml"
name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - v4

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Fetch all history for git info
      - uses: actions/setup-node@v3
        with:
          node-version: 18.14
      - name: Install Dependencies
        run: npm ci
      - name: Build Quartz
        run: npx quartz build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: public

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

然后:

1. 前往仓库的“Settings”选项卡，在侧边栏中单击“Pages”。在“源”下，选择“GitHub Actions”。
2. 通过执行`npx quartz sync`来提交这些更改。这应该将您的网站部署到`<github username>.github.io/<repository name>`。

> [!hint]
> 如果您收到由于环境保护规则而不允许部署到 `github-pages` 的错误，请确保删除任何现有的GitHub pages 环境。
>
> 您可以通过转到GitHub分叉上的“Settings”页面，转到“Environments”选项卡并按下trash图标来完成此操作。GitHub操作将在下次同步Quartz时为您正确地重新创建环境。

> [!info]
> Quartz生成的文件格式为`file.html`，而不是 `file/index.html`，这意味着删除了_非文件夹路径_的尾部斜杠。由于GitHub页面不进行重定向，这可能会导致指向您的网站的现有链接使用尾部斜杠来断开。如果不破坏现有链接对您来说很重要（例如，您正在从Quartz 3迁移），请考虑使用[[#Cloudflare Pages]]。

### 自定义域名

以下是如何将自定义域名添加到GitHub pages部署中。

1. 前往仓库的“Settings”选项卡。
2. 在侧边栏的“Code and automation”部分，单击“Pages”。
3. 在“Custom Domain”下，键入您的自定义域名，然后单击“Save”。
4. 下一步取决于您使用的是顶级域（`example.com`）还是子域名（`subdomain.example.com`）。
   - 如果您使用的是顶级域名，请导航到您的DNS提供商并创建一个“A”记录，将您的顶点域指向具有以下IP地址的GitHub名称服务器：
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - 如果您正在使用子域名，请导航到您的DNS提供商，并创建一个“CNAME”记录，将您的子域指向站点的默认域。例如，如果您想为您的用户站点使用子域`quartz.example.com` ，请创建一个“CNAME”记录，将`quartz.example.com` 指向`<github-username>.github.io`。

![[dns records.png]]
_上面显示了为“jzhao.xyz”（顶级域）和“quartz.jzhao.xyz”（子域名）配置的Google域的屏幕截图_

请参阅[GitHub文档](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain)，了解如何使用GitHub Pages设置自己的自定义域名的更多细节。

> [!question] Why aren't my changes showing up?
> 您的更改没有显示可能有很多不同的原因，但最可能的原因是您忘记将更改推送到GitHub。
>
> 确保您将更改保存到Git，并通过`npx quartz sync`将其同步到GitHub。这也将确保从其他设备中提取您可能进行的任何更新，以便您在本地进行更新。

## Vercel

### 处理地址

在部署到Vercel之前，项目目录的根目录中需要一个`vercel.json`文件。它需要包含以下配置，这样URL就不需要“.html”扩展名：

```json title="vercel.json"
{
  "cleanUrls": true
}
```

### 部署到 Vercel

1. 登录[Vercel](https://vercel.com/dashboard)然后单击"Add New..." > Project
2. 导入包含Quartz项目的Git存储库。
3. 为项目命名（仅限小写字符和连字符）
4. 检查是否设置了这些配置选项：

| Configuration option                      | Value              |
| ----------------------------------------- | ------------------ |
| Framework Preset                          | `Other`            |
| Root 目录                                   | `./`               |
| Build and Output Settings > Build Command | `npx quartz build` |

5. 按Deploy。一旦它上线，您将有2个`*.vercel.app` URL来查看页面。

### 自定义域名

> [!note]
> 如果域中已经存在了某些内容，则在不替换以前的内容的情况下，这些步骤将不起作用。作为一种变通方法，您可以使用Next.js重写或使用下一节创建子域。

1. 如果有必要，请更新`quartz.config.js`中的`baseUrl`。
2. 跳转到 [Domains - Dashboard](https://vercel.com/dashboard/domains) 页面。
3. 将域连接到Vercel
4. 按“Add”将自定义域连接到Vercel。
5. 选择您的Quartz存储库，然后按Continue。
6. 输入要连接到的域名。
7. 按照说明更新DNS记录，直到您看到“Valid Configuration”
### 使用子域名

使用`docs.example.com`就是子域的一个例子。它们是将多个部署连接到一个域名的简单方法。

1. 如果有必要，请更新`quartz.config.js`中的`baseUrl`。
2. 确保您的域已添加到[Domains - Dashboard](https://vercel.com/dashboard/domains)的页面。
3. 跳转到[Vercel Dashboard](https://vercel.com/dashboard)并选择您的Quartz项目。
4. 转到“Settings”选项卡，然后单击侧边栏中的“Domains”
5. 在字段中输入您的子域名，然后按“Add”

## Netlify

1. 登录[Netify](https://app.netlify.com/)然后单击“Add new site”。
2. 选择包含Quartz项目的Git提供商和仓库。
3. 4.在“Build command”下，输入`npx quartz Build`。
4. 5.在“Publish directory”下，输入`public`。
5. 按Deploy。一旦它上线，您将有一个`*.netlify.app` 地址来查看页面。
6. 要添加自定义域，请选中左侧边栏中的“Domain management”，就像使用Vercel一样。

## GitLab Pages

在本地Quartz中，创建一个新文件`.gitlab-ci.yaml`。

```yaml title=".gitlab-ci.yaml"
stages:
  - build
  - deploy

variables:
  NODE_VERSION: "18.14"

build:
  stage: build
  rules:
    - if: '$CI_COMMIT_REF_NAME == "v4"'
  before_script:
    - apt-get update -q && apt-get install -y nodejs npm
    - npm install -g n
    - n $NODE_VERSION
    - hash -r
    - npm ci
  script:
    - npx quartz build
  artifacts:
    paths:
      - public
  cache:
    paths:
      - ~/.npm/
    key: "${CI_COMMIT_REF_SLUG}-node-${CI_COMMIT_REF_NAME}"
  tags:
    - docker

pages:
  stage: deploy
  rules:
    - if: '$CI_COMMIT_REF_NAME == "v4"'
  script:
    - echo "Deploying to GitLab Pages..."
  artifacts:
    paths:
      - public
```

当`.gitlab-ci.yaml`提交后，gitlab将以GitLab Page.的形式构建和部署网站。您可以在侧边栏的 `Deploy > Pages` 下找到url。

默认情况下，该页面是私有的，只有在登录到具有存储库访问权限的GitLab帐户时才可见，但可以在`Deploy` -> `Pages`下的设置中打开。

## 自有服务器

将 `public` 目录复制到web服务器，并将其配置为提供文件。您可以使用任何web服务器来托管您的网站。由于Quartz生成的链接不包括“.html”扩展名，您需要让您的web服务器知道如何处理它。

### 配置 Nginx

以下是如何使用Nginx执行此操作的示例：

```nginx title="nginx.conf"
server {
    listen 80;
    server_name example.com;
    root /path/to/quartz/public;
    index index.html;
    error_page 404 /404.html;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }
}
```

### 配置 Caddy

以下是如何使用Caddy进行此操作的示例：

```caddy title="Caddyfile"
example.com {
    root * /path/to/quartz/public
    try_files {path} {path}.html {path}/ =404
    file_server
    encode gzip

    handle_errors {
        rewrite * /{err.status_code}.html
        file_server
    }
}
```

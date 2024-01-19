---
title: Hosting
---

Quartz effectively turns your Markdown files and other resources into a bundle of HTML, JS, and CSS files (a website!).

However, if you'd like to publish your site to the world, you need a way to host it online. This guide will detail how to deploy with common hosting providers but any service that allows you to deploy static HTML should work as well.

> [!warning]
> The rest of this guide assumes that you've already created your own GitHub repository for Quartz. If you haven't already, [[setting up your GitHub repository|make sure you do so]].

> [!hint]
> Some Quartz features (like [[RSS Feed]] and sitemap generation) require `baseUrl` to be configured properly in your [[configuration]] to work properly. Make sure you set this before deploying!

## Cloudflare Pages

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

| Configuration option   | Value              |
| ---------------------- | ------------------ |
| Production branch      | `v4`               |
| Framework preset       | `None`             |
| Build command          | `npx quartz build` |
| Build output directory | `public`           |

Press "Save and deploy" and Cloudflare should have a deployed version of your site in about a minute. Then, every time you sync your Quartz changes to GitHub, your site should be updated.

To add a custom domain, check out [Cloudflare's documentation](https://developers.cloudflare.com/pages/platform/custom-domains/).

> [!warning]
> Cloudflare Pages only allows shallow `git` clones so if you rely on `git` for timestamps, it is recommended you either add dates to your frontmatter (see [[authoring content#Syntax]]) or use another hosting provider.

## GitHub Pages

In your local Quartz, create a new file `quartz/.github/workflows/deploy.yml`.

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

Then:

1. Head to "Settings" tab of your forked repository and in the sidebar, click "Pages". Under "Source", select "GitHub Actions".
2. Commit these changes by doing `npx quartz sync`. This should deploy your site to `<github-username>.github.io/<repository-name>`.

> [!hint]
> If you get an error about not being allowed to deploy to `github-pages` due to environment protection rules, make sure you remove any existing GitHub pages environments.
>
> You can do this by going to your Settings page on your GitHub fork and going to the Environments tab and pressing the trash icon. The GitHub action will recreate the environment for you correctly the next time you sync your Quartz.

> [!info]
> Quartz generates files in the format of `file.html` instead of `file/index.html` which means the trailing slashes for _non-folder paths_ are dropped. As GitHub pages does not do this redirect, this may cause existing links to your site that use trailing slashes to break. If not breaking existing links is important to you (e.g. you are migrating from Quartz 3), consider using [[#Cloudflare Pages]].

### Custom Domain

Here's how to add a custom domain to your GitHub pages deployment.

1. Head to the "Settings" tab of your forked repository.
2. In the "Code and automation" section of the sidebar, click "Pages".
3. Under "Custom Domain", type your custom domain and click "Save".
4. This next step depends on whether you are using an apex domain (`example.com`) or a subdomain (`subdomain.example.com`).
   - If you are using an apex domain, navigate to your DNS provider and create an `A` record that points your apex domain to GitHub's name servers which have the following IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - If you are using a subdomain, navigate to your DNS provider and create a `CNAME` record that points your subdomain to the default domain for your site. For example, if you want to use the subdomain `quartz.example.com` for your user site, create a `CNAME` record that points `quartz.example.com` to `<github-username>.github.io`.

![[dns records.png]]_The above shows a screenshot of Google Domains configured for both `jzhao.xyz` (an apex domain) and `quartz.jzhao.xyz` (a subdomain)._

See the [GitHub documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain) for more detail about how to setup your own custom domain with GitHub Pages.

> [!question] Why aren't my changes showing up?
> There could be many different reasons why your changes aren't showing up but the most likely reason is that you forgot to push your changes to GitHub.
>
> Make sure you save your changes to Git and sync it to GitHub by doing `npx quartz sync`. This will also make sure to pull any updates you may have made from other devices so you have them locally.

## Vercel

### Fix URLs

Before deploying to Vercel, a `vercel.json` file is required at the root of the project directory. It needs to contain the following configuration so that URLs don't require the `.html` extension:

```json title="vercel.json"
{
  "cleanUrls": true
}
```

### Deploy to Vercel

1. Log in to the [Vercel Dashboard](https://vercel.com/dashboard) and click "Add New..." > Project
2. Import the Git repository containing your Quartz project.
3. Give the project a name (lowercase characters and hyphens only)
4. Check that these configuration options are set:

| Configuration option                      | Value              |
| ----------------------------------------- | ------------------ |
| Framework Preset                          | `Other`            |
| Root Directory                            | `./`               |
| Build and Output Settings > Build Command | `npx quartz build` |

5. Press Deploy. Once it's live, you'll have 2 `*.vercel.app` URLs to view the page.

### Custom Domain

> [!note]
> If there is something already hosted on the domain, these steps will not work without replacing the previous content. As a workaround, you could use Next.js rewrites or use the next section to create a subdomain.

1. Update the `baseUrl` in `quartz.config.js` if necessary.
2. Go to the [Domains - Dashboard](https://vercel.com/dashboard/domains) page in Vercel.
3. Connect the domain to Vercel
4. Press "Add" to connect a custom domain to Vercel.
5. Select your Quartz repository and press Continue.
6. Enter the domain you want to connect it to.
7. Follow the instructions to update your DNS records until you see "Valid Configuration"

### Use a Subdomain

Using `docs.example.com` is an example of a subdomain. They're a simple way of connecting multiple deployments to one domain.

1. Update the `baseUrl` in `quartz.config.js` if necessary.
2. Ensure your domain has been added to the [Domains - Dashboard](https://vercel.com/dashboard/domains) page in Vercel.
3. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and select your Quartz project.
4. Go to the Settings tab and then click Domains in the sidebar
5. Enter your subdomain into the field and press Add

## Netlify

1. Log in to the [Netlify dashboard](https://app.netlify.com/) and click "Add new site".
2. Select your Git provider and repository containing your Quartz project.
3. Under "Build command", enter `npx quartz build`.
4. Under "Publish directory", enter `public`.
5. Press Deploy. Once it's live, you'll have a `*.netlify.app` URL to view the page.
6. To add a custom domain, check "Domain management" in the left sidebar, just like with Vercel.

## GitLab Pages

In your local Quartz, create a new file `.gitlab-ci.yaml`.

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

When `.gitlab-ci.yaml` is committed, GitLab will build and deploy the website as a GitLab Page. You can find the url under `Deploy > Pages` in the sidebar.

By default, the page is private and only visible when logged in to a GitLab account with access to the repository but can be opened in the settings under `Deploy` -> `Pages`.

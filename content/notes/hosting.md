---
title: "Deploying Quartz to the Web"
---

## GitHub Pages
Quartz is designed to be effortless to deploy. If you forked and cloned Quartz directly from the repository, everything should already be good to go! You can head to `<YOUR-GITHUB-USERNAME.github.io/quartz` to see it live.

### Enable GitHub Actions
By default, GitHub disables workflows from running automatically on Forked Repostories. Head to the 'Actions' tab of your forked repository and Enable Workflows to setup deploying your Quartz site!

![Enable GitHub Actions](/notes/images/github-actions.png)*Enable GitHub Actions*

### Enable GitHub Pages

Head to the 'Settings' tab of your forked repository and go to the 'Pages' tab.

1. Set the source to deploy from `master` using `/ (root)`
2. Set a custom domain here if you have one!

![Enable GitHub Pages](/notes/images/github-pages.png)*Enable GitHub Pages*

### Pushing Changes
To see your changes on the internet, we need to push it them to GitHub. Quartz is essentially a `git` repository so updating it is the same workflow as you would follow as normal.

```shell
# Navigate to Quartz folder
cd <path-to-quartz>

# Commit all changes
git add .
git commit -m "message describing changes"

# Push to GitHub to update site
git push origin hugo
```

### Setting up the Site
Now let's get this site up and running. Never hosted a site before? No problem. Have a fancy custom domain you already own or want to subdomain your Quartz? That's easy too.

Here, we take advantage of GitHub's free page hosting to deploy our site. Change `baseURL` in `/config.toml`. If you don't have a custom domain to use, you can use `<YOUR-USERNAME>.github.io` (which GitHub gives to you for free!) as your domain.

[Reference.](https://github.com/jackyzha0/quartz/blob/hugo/config.toml)

```toml
baseURL = "https://<YOUR-DOMAIN>/"
```

Change `cname` in `/.github/workflows/deploy.yaml`. Again, if you don't have a custom domain to use, you can use `<YOUR-USERNAME>.github.io`.

[Reference.](https://github.com/jackyzha0/quartz/blob/hugo/.github/workflows/deploy.yaml)

```yaml
- name: Deploy  
  uses: peaceiris/actions-gh-pages@v3  
  with:  
	github_token: ${{ secrets.GITHUB_TOKEN }} # this can stay as is, GitHub fills this in for us!
	publish_dir: ./public  
	publish_branch: master
	cname: <YOUR-DOMAIN>
```

### Registrar
This step is only applicable if you are using a **custom domain**! If you are using `<YOUR-USERNAME>.github.io`, you can skip this step.

For this last bit to take effect, you also need to create a CNAME record with the DNS provider you register your domain with (i.e. NameCheap, Google Domains).

GitHub has some [documentation on this](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), but the tldr; is to

1. Go to your forked repository (`github.com/<YOUR-GITHUB-USERNAME>/quartz`) settings page and go to the Pages tab. Under "Custom domain", type your custom domain, then click **Save**.
2. Go to your DNS Provider and create a CNAME record that points from your domain to `<YOUR-GITHUB-USERNAME.github.io.` (yes, with the trailing period).

	![Example Configuration for Quartz](/notes/images/google-domains.png)*Example Configuration for Quartz*
3. Wait 30 minutes to an hour for the network changes to kick in.
4. Done!

## External Hosting
Don't want to use GitHub Pages? Hugo builds everything for you! Everything is a packaged set of static files ready to deploy in `/public`. You can then upload this folder to a cloud provider to deploy. Alternatively, most providers also give users the option to link a GitHub repository and a folder to deploy. When doing this, ensure you select `/public` folder under the `master` branch.

---

Now that your Quartz is live, let's figure out how to make Quartz really *yours*!

🎨 [Customizing Quartz](notes/config.md)

Having problems? Checkout our [FAQ and Troubleshooting guide](notes/troubleshooting.md).
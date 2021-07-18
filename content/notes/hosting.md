---
title: "Deploying to GitHub Pages"
---


## GitHub Pages
Quartz is designed to be effortless to deploy. If you forked and cloned Quartz directly from the repository, everything should already be good to go! You can head to `<YOUR-GITHUB-USERNAME.github.io/quartz` to see it live.

By default, Github Actions will run on forks of repos. You should not need to do any more config to see it up to date.

### Custom subdomain
Have a fancy custom domain or want to subdomain your Quartz? That's easy too.

Change `baseURL` in `/config.toml`. [Reference.](https://github.com/jackyzha0/quartz/blob/hugo/config.toml)

```toml
baseURL = "https://<YOUR-DOMAIN>/"
```

Change `cname` in `/.github/workflows/deploy.yaml`. [Reference.](https://github.com/jackyzha0/quartz/blob/hugo/.github/workflows/deploy.yaml)

```yaml
- name: Deploy  
  uses: peaceiris/actions-gh-pages@v3  
  with:  
	github_token: ${{ secrets.GITHUB_TOKEN }}  
	publish_dir: ./public  
	publish_branch: master
	cname: <YOUR-DOMAIN>
```

### Registrar
For this last bit to take effect, you also need to create a CNAME record with the DNS provider you register your domain with (i.e. NameCheap, Google Domains).

GitHub has some [documentation on this](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), but the tldr; is to

1. Go to your forked repository (`github.com/<YOUR-GITHUB-USERNAME>/quartz`) settings page and go to the Pages tab. Under "Custom domain", type your custom domain, then click **Save**.
2. Go to your DNS Provider and create a CNAME record that points from your domain to `<YOUR-GITHUB-USERNAME.github.io.` (yes, with the trailing period).

	![Example Configuration for Quartz](/notes/images/google-domains.png)*Example Configuration for Quartz*
3. Wait 30 minutes to an hour for the network changes to kick in.
4. Done!


Now that your Quartz is live, let's figure out how to make Quartz really *yours*!

🎨 [Customizing Quarts](notes/config.md)

Having problems? Checkout our [FAQ and Troubleshooting guide](notes/troubleshooting.md).
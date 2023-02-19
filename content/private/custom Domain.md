---
title: "Custom Domain"
---

### Registrar
This step is only applicable if you are using a **custom domain**! If you are using a `<YOUR-USERNAME>.github.io` domain, you can skip this step.

For this last bit to take effect, you also need to create a CNAME record with the DNS provider you register your domain with (i.e. NameCheap, Google Domains).

GitHub has some [documentation on this](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), but the tldr; is to

1. Go to your forked repository (`github.com/<YOUR-GITHUB-USERNAME>/quartz`) settings page and go to the Pages tab. Under "Custom domain", type your custom domain, then click **Save**.
2. Go to your DNS Provider and create a CNAME record that points from your domain to `<YOUR-GITHUB-USERNAME.github.io.` (yes, with the trailing period).

	![Example Configuration for Quartz](/notes/images/google-domains.png)*Example Configuration for Quartz*
3. Wait 30 minutes to an hour for the network changes to kick in.
4. Done!
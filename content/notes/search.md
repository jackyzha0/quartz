---
title: "Search"
---

Quartz supports two modes of searching through content.

## Full-text
Full-text search is the default in Quartz. It produces results that *exactly* match the search query. This is easier to setup but usually produces lower quality matches.

```yaml {title="data/config.yaml"}
# the default option
enableSemanticSearch: false
```

## Natural Language
Natural language search is powered by [Operand](https://beta.operand.ai/). It understands language like a person does and finds results that best match user intent. In this sense, it is closer to how Google Search works.

Natural language search tends to produce higher quality results than full-text search.

Here's how to set it up.

1. Login or Register for a new Operand account. Click the verification link sent to your email, and you'll be redirected to the dashboard. (Note) You do not need to enter a credit card to create an account, or get started with the Operand API. The first $10 of usage each month is free. To learn more, see pricing. If you go over your free quota, we'll (politely) reach out and ask you to configure billing.
2. Create your first index. On the dashboard, under "Indexes", enter the name and description of your index, and click "Create Index". Note down the ID of the index (obtained by clicking on the index name in the list of indexes), as you'll need it in the next step. IDs are unique to each index, and look something like `uqv1duxxbdxu`.
3. Click into the index you've created. Under "Index Something", select "SITEMAP" from the dropdown and click "Add Source".
4. For the "Sitemap.xml URL", put your deployed site's base URL followed by `sitemap.xml`. For example, for `quartz.jzhao.xyz`, put `https://quartz.jzhao.xyz/sitemap.xml`. Leave the URL Regex empty. 
5. Get your API key. On the dashboard, under "API Keys", you can manage your API keys. If you don't already have an API key, click "Create API Key". You'll need this for the next step.
6. Open `data/config.yaml`. Set `enableSemanticSearch` to `true`, `operandApiKey` to your copied key, and `operandIndexId` to the ID of the index we created from earlier..

```yaml {title="data/config.yaml"}
# the default option
search:
  enableSemanticSearch: true
  operandApiKey: "jp9k5hudse2a828z98kxd6z3payi8u90rnjf"
  operandIndexId: "s0kf3bd6tldw"
```
7. Push your changes to the site and wait for it to deploy.
8. Check the Operand dashboard and wait for your site to index. Enjoy natural language search powered by Operand!

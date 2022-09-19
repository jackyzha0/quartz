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
Natural language search is powered by [Operand](https://operand.ai/). It understands language like a person does and finds results that best match user intent. In this sense, it is closer to how Google Search works.

Natural language search tends to produce higher quality results than full-text search.

Here's how to set it up.

1. Create an Operand Account on [their website](https://operand.ai/).
2. Go to Dashboard > Settings > Integrations.
3. Follow the steps to setup the GitHub integration. Operand needs access to GitHub in order to index your digital garden properly!
4. Head over to Dashboard > Objects and press `(Cmd + K)` to open the omnibar and select 'Create Collection'.
	1. Set the 'Collection Label' to something that will help you remember it.
	2. You can leave the 'Parent Collection' field empty.
5. Click into your newly made Collection.
	1. Press the 'share' button that looks like three dots connected by lines.
	2. Set the 'Interface Type' to `object-search` and click 'Create'.
	3. This will bring you to a new page with a search bar. Ignore this for now.
6. Go back to Dashboard > Settings > API Keys and find your Quartz-specific Operand API key under 'Other keys'.
	1. Copy the key (which looks something like `0e733a7f-9b9c-48c6-9691-b54fa1c8b910`).
	2. Open `data/config.yaml`. Set `enableSemanticSearch` to `true` and `operandApiKey` to your copied key.

```yaml {title="data/config.yaml"}
# the default option
enableSemanticSearch: true
operandApiKey: "0e733a7f-9b9c-48c6-9691-b54fa1c8b910"
```
7. Make a commit and push your changes to GitHub. See the [[notes/hosting|hosting]] page if you haven't done this already.
	1. This step is *required* for Operand to be able to properly index your content. 
	2. Head over to Dashboard > Objects and select the collection that you made earlier
8. Press `(Cmd + K)` to open the omnibar again and select 'Create GitHub Repo'
	1. Set the 'Repository Label' to `Quartz`
	2. Set the 'Repository Owner' to your GitHub username
	3. Set the 'Repository Ref' to `master`
	4. Set the 'Repository Name' to the name of your repository (usually just `quartz` if you forked the repository without changing the name)
	5. Leave 'Root Path' and 'Root URL' empty
9. Wait for your repository to index and enjoy natural language search in Quartz! Operand refreshes the index every 2h so all you need to do is just push to GitHub to update the contents in the search.
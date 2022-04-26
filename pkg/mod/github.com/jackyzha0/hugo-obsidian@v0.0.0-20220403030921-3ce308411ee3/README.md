# Obsidian Link Scrapper
Used by [Quartz](https://github.com/jackyzha0/quartz)

This repository comes to you in two parts.

1. GitHub Action (scrapes links into a `.json` file)
2. Hugo Partial (turns `.json` file into graphs and tables)

## GitHub Action
GitHub action and binary to scrape [Obsidian](http://obsidian.md/) vault for links and exposes them as a `.json` file for easy consumption by [Hugo](https://gohugo.io/).
### Example Usage (Binary)
Read Markdown from the `/content` folder and place the resulting `linkIndex.json` (and `contentIndex.yaml` if the `index` flag is enabled) into `/data`

```shell
# Installation
go install github.com/jackyzha0/hugo-obsidian

# Run
hugo-obsidian -input=content -output=data -index=true
```

### Example Usage (GitHub Action)

Add 'Build Link Index' as a build step in your workflow file (e.g. `.github/workflows/deploy.yaml`)
```yaml
...

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
      - name: Build Link Index
        uses: jackyzha0/hugo-obsidian@v2.1
        with:
          input: content # input folder
          output: data   # output folder
          index: true    # whether to index content
      ...
```

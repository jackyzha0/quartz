---
title: "Preview Changes"
---

If you'd like to preview what your Quartz site looks like before deploying it to the internet, here's exactly how to do that!

## Install `hugo-obsidian`
This step will generate the list of backlinks for Hugo to parse. Ensure you have [Go](https://golang.org/doc/install) (>= 1.16) installed.

```shell
# Install and link `hugo-obsidian` locally
$ go install github.com/jackyzha0/hugo-obsidian@latest

# Navigate to your local Quartz folder
$ cd <location-of-your-local-quartz>

# Scrape all links in your Quartz folder and generate info for Quartz
$ hugo-obsidian -input=content -output=data -index -root=.
```

Afterwards, start the Hugo server as shown above and your local backlinks and interactive graph should be populated!

##  Installing Hugo
Hugo is the static site generator that powers Quartz. [Install Hugo](https://gohugo.io/getting-started/installing/) first. Then,

```
# Navigate to your local Quartz folder
$ cd <location-of-your-local-quartz>

# Start local server
$ hugo server

# View your site in a browser at http://localhost:1313/
```
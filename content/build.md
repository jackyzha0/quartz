---
title: "Building your Quartz"
---

Once you've [[index#🪴 Get Started|initialized]] Quartz, let's see what it looks like locally.

```bash
npx quartz build --serve
```

Then, open a web browser and visit `http://localhost:8080/` to view it.

Want to change how Quartz looks? You can edit `quartz.config.ts` to customize and configure your Quartz, including styles, layout, and more. Read the [[configuration]] page for more information on what each field in the configuration does.

Once you're happy with it, let's see how to [[hosting|deploy Quartz to the web]]!

> [!hint] Flags and options
> For full help options, you can run `npx quartz build --help`.
>
> Most of these have sensible defaults but you can override them if you have a custom setup:
>
> - `-d` or `--directory`: the content folder. This is normally just `content`
> - `-v` or `--verbose`: print out extra logging information
> - `-o` or `--output`: the output folder. This is normally just `public`
> - `--serve`: run a local hot-reloading server to preview your Quartz
> - `--port`: what port to run the local preview server on

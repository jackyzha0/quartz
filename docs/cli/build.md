---
title: quartz build
aliases:
  - build
---

The `build` command transforms your Markdown content into a static HTML website. It processes your files through the configured plugins and outputs the final site to a directory of your choice.

## Flags

| Flag              | Shorthand | Description                                                                        | Default            |
| ----------------- | --------- | ---------------------------------------------------------------------------------- | ------------------ |
| `--directory`     | `-d`      | The content folder                                                                 | `content`          |
| `--verbose`       | `-v`      | Print detailed build information (see [[#Verbose output]])                         | `false`            |
| `--output`        | `-o`      | The directory where the built site will be saved                                   | `public`           |
| `--serve`         |           | Start a local development server                                                   | `false`            |
| `--watch`         |           | Rebuild the site when files change                                                 | `false`            |
| `--port`          |           | The port for the development server                                                | `8080`             |
| `--wsPort`        |           | The port for the WebSocket hot-reload server                                       | `3001`             |
| `--baseDir`       |           | Base path the development server serves the site under                             | `""` (none)        |
| `--remoteDevHost` |           | Hostname for the hot-reload WebSocket when not developing on localhost             | `""` (`localhost`) |
| `--bundleInfo`    |           | Print an analysis of Quartz's own esbuild bundle (files and sizes) to the terminal | `false`            |
| `--concurrency`   | `-c`      | Number of worker threads to use for building                                       | CPU core count     |

## Examples

### Basic Build

Generate your site into the `public` folder.

```shell
npx quartz build
```

### Development Mode

Start a local server and watch for changes. This is the most common way to preview your site while writing.

```shell
npx quartz build --serve
```

### Custom Output and Port

Build to a specific folder and run the server on a different port.

```shell
npx quartz build --serve --output dist --port 3000
```

### Performance Tuning

If you have a very large vault, you can limit the number of concurrent workers to save memory.

```shell
npx quartz build --concurrency 2
```

### Verbose output

`npx quartz build --verbose` also prints:

- the plugins loaded, in the order they run (transformers, filters, emitters, page types)
- the [[built-in processing|built-ins]] and whether each is on (with its order) or off, and why
- a layout report: which components each page type renders in each slot (see [[layout#Checking your layout]])
- every link to a page that is not on the site (including links to drafts) — without `--verbose` the end-of-build summary counts them and shows a few examples
- every file each emitter writes

### In CI

When the `CI` environment variable is set (GitHub Actions, Cloudflare Pages, Netlify, Vercel, … set it), the build fails on plugins that fail to load or that need a newer Quartz, instead of warning. Set `QUARTZ_ALLOW_BROKEN_PLUGINS=1` or `QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS=1` to build anyway. See [[troubleshooting#Reading build output]].

## Serve vs Watch

The `--serve` and `--watch` flags control different behaviors:

- **`--serve`** starts a local development server AND automatically watches for changes (implies `--watch`). This is the recommended mode for local development.
- **`--watch`** only watches for file changes and rebuilds automatically, without starting a server. This is useful for CI pipelines or custom server setups where you want automatic rebuilds but handle serving separately.

In most cases, you want `--serve`:

```shell
npx quartz build --serve
```

## Development Server

The `--serve` flag starts a local web server. This server is intended for development and previewing only. It is not designed for production use. For information on how to deploy your site, see [[hosting]].

### Hot Reloading

When running with `--serve`, Quartz automatically enables `--watch`. It uses a WebSocket connection (on the port specified by `--wsPort`) to notify your browser when a file has changed. The browser will then automatically refresh to show the latest version of your content.

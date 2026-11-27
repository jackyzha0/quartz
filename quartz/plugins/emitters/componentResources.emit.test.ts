import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { registerHooks } from "node:module"
import test, { after, describe } from "node:test"
import { createContext, runInContext } from "node:vm"
import type { BuildCtx } from "../../util/ctx"
import type { QuartzComponent } from "../../components/types"
import type { StaticResources } from "../../util/resources"
import type { GlobalConfiguration } from "../../cfg"

// The emitter imports SCSS and inline browser scripts that esbuild bundles in a real build. Under
// tsx each one is replaced by a marker: `.stub-<name>{--stub:<name>}` for SCSS, `window.__stub_<name>`
// for scripts, so the tests can tell where each one ends up.
registerHooks({
  load(url, context, next) {
    const name = path.basename(new URL(url).pathname).replace(/\.(inline\.ts|scss)$/, "")
    if (url.endsWith(".scss")) {
      const css = `.stub-${name.replace(/\W/g, "_")}{--stub:${name.replace(/\W/g, "_")}}`
      return {
        format: "module",
        source: `export default ${JSON.stringify(css)}`,
        shortCircuit: true,
      }
    }
    if (/\.inline\.ts$/.test(url)) {
      const js = `window.__stub_${name} = 1`
      return {
        format: "module",
        source: `export default ${JSON.stringify(js)}`,
        shortCircuit: true,
      }
    }
    return next(url, context)
  },
})
const { ComponentResources } = await import("./componentResources")

const theme = {
  fontOrigin: "local",
  cdnCaching: true,
  typography: { header: "Header Font", body: "Body Font", code: "Code Font" },
  colors: {
    lightMode: {
      light: "#fff",
      lightgray: "#eee",
      gray: "#999",
      darkgray: "#444",
      dark: "#222",
      secondary: "#00f",
      tertiary: "#0f0",
      highlight: "#ff0",
      textHighlight: "#ff08",
    },
    darkMode: {
      light: "#000",
      lightgray: "#111",
      gray: "#666",
      darkgray: "#bbb",
      dark: "#ddd",
      secondary: "#88f",
      tertiary: "#8f8",
      highlight: "#880",
      textHighlight: "#8808",
    },
  },
}

const Widget: QuartzComponent = Object.assign(() => null, {
  css: ".widget{color:blue}",
  beforeDOMLoaded: "window.__widgetBefore = 1",
  afterDOMLoaded: "window.__widgetAfter = 1",
})
const Other: QuartzComponent = Object.assign(() => null, {
  css: [".other{color:green}"],
  afterDOMLoaded: ["window.__otherAfter = 1"],
})

const dirs: string[] = []
after(() => {
  for (const dir of dirs) fs.rmSync(dir, { recursive: true, force: true })
})

async function emit(
  configuration: Partial<GlobalConfiguration>,
  {
    serve = false,
    resources = { css: [], js: [], additionalHead: [] } as StaticResources,
    // the same component from two emitters is collected once; an emitter may have none
    emitters = [
      { getQuartzComponents: () => [Widget, Other] },
      { getQuartzComponents: () => [Widget] },
      {},
    ] as unknown[],
  } = {},
) {
  const output = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-component-resources-"))
  dirs.push(output)
  const ctx = {
    argv: { output, serve },
    cfg: {
      configuration: { enableSPA: true, enablePopovers: true, theme, ...configuration },
      plugins: { emitters },
    },
  } as unknown as BuildCtx
  const written: string[] = []
  for await (const fp of ComponentResources().emit(ctx, [], resources) as AsyncIterable<string>) {
    written.push(path.relative(output, fp))
  }
  const read = (name: string) => fs.readFileSync(path.join(output, name), "utf8")
  return { ctx, written, read }
}

/** The script files postscript.js imports, in its order, with whether each is awaited alone. */
function importedScripts(postscript: string) {
  return [...postscript.matchAll(/import\("\.\/([^"]+)"\)/g)].map((m) => m[1])
}

describe("ComponentResources emitter", () => {
  test("production: content-hashed index.css / prescript / postscript, named in ctx.hashedResourceNames", async () => {
    const { ctx, written, read } = await emit({})
    const names = ctx.hashedResourceNames!
    assert.match(names["index.css"], /^index-[0-9a-f]{8}\.css$/)
    assert.match(names["prescript.js"], /^prescript-[0-9a-f]{8}\.js$/)
    assert.match(names["postscript.js"], /^postscript-[0-9a-f]{8}\.js$/)
    for (const file of Object.values(names)) assert.ok(written.includes(file), file)

    // components' beforeDOMLoaded scripts go in the prescript (once, though listed twice)
    const prescript = read(names["prescript.js"])
    assert.equal(prescript.split("__widgetBefore").length, 2)
  })

  test("production: postscript loads component scripts in parallel and the SPA router last", async () => {
    const { ctx, written, read } = await emit({ prefetch: "hover" })
    const postscript = read(ctx.hashedResourceNames!["postscript.js"])
    const scripts = importedScripts(postscript)
    for (const s of scripts) {
      assert.match(s, /^static\/scripts\/script-\d+-[0-9a-f]{8}\.js$/)
      assert.ok(written.includes(s), s)
    }
    const contents = scripts.map(read)
    // component scripts, then the global ones: popover, prefetch (with its settings), router
    assert.deepEqual(
      contents.map((c) =>
        c.includes("__widgetAfter")
          ? "widget"
          : c.includes("__otherAfter")
            ? "other"
            : c.includes("__stub_popover")
              ? "popover"
              : c.includes("__stub_prefetch")
                ? "prefetch"
                : c.includes("__stub_spa")
                  ? "spa"
                  : c,
      ),
      ["widget", "other", "popover", "prefetch", "spa"],
    )
    assert.match(
      contents[3],
      /window\.__quartzPrefetchMode = "hover";\nwindow\.__quartzSpa = true;/,
    )
    // all but the router are imported together; the router (which dispatches the first `nav`)
    // only after they all registered their listeners
    const last = scripts[scripts.length - 1]
    const [parallel, rest] = postscript.split(`await import("./${last}")`)
    assert.ok(parallel.startsWith("await Promise.all(["), postscript)
    assert.ok(!parallel.includes("__stub_spa") && !parallel.includes(last), postscript)
    for (const s of scripts.slice(0, -1)) assert.ok(parallel.includes(`import("./${s}")`), s)
    assert.equal(rest.trim(), ";")
  })

  test("prefetching defaults to viewport mode", async () => {
    const { ctx, read } = await emit({ prefetch: undefined })
    const scripts = importedScripts(read(ctx.hashedResourceNames!["postscript.js"])).map(read)
    const prefetch = scripts.find((s) => s.includes("__stub_prefetch"))!
    assert.match(prefetch, /^window\.__quartzPrefetchMode = "viewport";/)
  })

  test("without SPA routing the last script dispatches the first nav itself; prefetch: false loads no prefetcher", async () => {
    const { ctx, read } = await emit({
      enableSPA: false,
      enablePopovers: false,
      prefetch: false as never,
    })
    const scripts = importedScripts(read(ctx.hashedResourceNames!["postscript.js"])).map(read)
    assert.ok(!scripts.some((s) => s.includes("__stub_spa")))
    assert.ok(!scripts.some((s) => s.includes("__stub_prefetch") || s.includes("__stub_popover")))
    assert.match(scripts[scripts.length - 1], /new CustomEvent\("nav"/)
    assert.ok(!read(ctx.hashedResourceNames!["index.css"]).includes("stub-popover"))
  })

  test("component CSS goes into one component stylesheet; index.css has theme, global and base styles", async () => {
    const { ctx, written, read } = await emit({})
    const componentFile = written.find((f) => /^component-[0-9a-f]{8}\.css$/.test(f))
    assert.ok(componentFile, written.join(", "))
    const componentCss = read(componentFile)
    assert.match(componentCss, /\.widget\{color:#00f\}/)
    assert.match(componentCss, /\.other\{color:green\}/)
    assert.equal(ctx.componentCssMap!.get(".widget{color:blue}"), componentFile)
    assert.equal(ctx.componentCssMap!.get(".other{color:green}"), componentFile)

    const index = read(ctx.hashedResourceNames!["index.css"])
    assert.ok(!index.includes(".widget"), "component CSS is not duplicated into index.css")
    // the popover's CSS (added globally) and base styles in the quartz-base layer, then custom.scss
    assert.match(
      index,
      /^@layer quartz-base\{.*\.stub-popover\{.*\.stub-base\{.*\}\.stub-custom\{/s,
    )
    assert.match(index, /--secondary:#00f/)
    assert.match(index, /--titleFont:"Header Font"/)
  })

  test("inline plugin CSS/JS resources are moved to files named in ctx.extractedInlineResources", async () => {
    const resources = {
      css: [
        { content: ".plugin-inline { color: red; }", inline: true },
        { content: "https://example.com/external.css" },
      ],
      js: [
        { script: "window.__early = 1", loadTime: "beforeDOMReady", contentType: "inline" },
        { script: "window.__late = 1", loadTime: "afterDOMReady", contentType: "inline" },
        { src: "https://example.com/x.js", loadTime: "afterDOMReady", contentType: "external" },
      ],
      additionalHead: [],
    } as unknown as StaticResources
    const { ctx, written, read } = await emit({}, { resources })
    const map = ctx.extractedInlineResources!
    assert.equal(map.size, 3)
    const css = map.get(".plugin-inline { color: red; }")!
    assert.match(css, /^static\/resource-style-[0-9a-f]{8}\.css$/)
    assert.equal(read(css), ".plugin-inline{color:red}")
    const early = map.get("window.__early = 1")!
    const late = map.get("window.__late = 1")!
    assert.match(early, /^static\/resource-before-[0-9a-f]{8}\.js$/)
    assert.match(late, /^static\/resource-after-[0-9a-f]{8}\.js$/)
    assert.match(read(late), /window\.__late=1/)
    for (const f of [css, early, late]) assert.ok(written.includes(f), f)
    // the resources themselves are left as they are (partial rebuilds reuse them)
    assert.equal(resources.css.length, 2)
  })

  test("CSS a plugin marks inline that lightningcss can't parse is written as it is", async () => {
    const broken = ".a { color: red"
    const resources = {
      css: [
        { content: "@media (", inline: true },
        { content: broken, inline: true },
      ],
      js: [],
      additionalHead: [],
    } as unknown as StaticResources
    const { ctx, read } = await emit({}, { resources })
    assert.equal(read(ctx.extractedInlineResources!.get("@media (")!), "@media (")
  })

  test("serve mode: unhashed names and one minified postscript bundle in order", async () => {
    const { ctx, written, read } = await emit({}, { serve: true })
    assert.deepEqual(ctx.hashedResourceNames, {
      "index.css": "index.css",
      "prescript.js": "prescript.js",
      "postscript.js": "postscript.js",
    })
    assert.ok(!written.some((f) => f.startsWith("static/scripts/")))
    const postscript = read("postscript.js")
    const order = [
      "__widgetAfter",
      "__otherAfter",
      "__stub_popover",
      "__stub_prefetch",
      "__stub_spa",
    ].map((marker) => postscript.indexOf(marker))
    assert.ok(order.every((at) => at >= 0))
    assert.deepEqual(
      [...order].sort((a, b) => a - b),
      order,
    )
    // minified by esbuild
    assert.ok(!postscript.includes("window.__widgetAfter = 1"), postscript)
  })

  test("postscript.js is a valid module: the parallel imports are comma-separated", async () => {
    const { ctx, read } = await emit({})
    const postscript = read(ctx.hashedResourceNames!["postscript.js"])
    const AsyncFunction = (async () => {}).constructor as new (code: string) => unknown
    assert.doesNotThrow(() => new AsyncFunction(postscript), postscript)
    assert.equal(importedScripts(postscript).length, 5)
  })

  test("without component CSS no component stylesheet is emitted", async () => {
    const { ctx, written } = await emit({}, { emitters: [] })
    assert.ok(!written.some((f) => f.startsWith("component-")), written.join(", "))
    assert.equal(ctx.componentCssMap!.size, 0)
  })
})

describe("analytics scripts", () => {
  /** Run the site's analytics script in a fake page; returns the URLs of the scripts it loads. */
  async function loadedScripts(analytics: Record<string, unknown>) {
    const { ctx, read } = await emit(
      {
        analytics: analytics as GlobalConfiguration["analytics"],
        enablePopovers: false,
        prefetch: false as never,
      },
      { emitters: [] },
    )
    const scripts = importedScripts(read(ctx.hashedResourceNames!["postscript.js"])).map(read)
    // the analytics script(s), before the router
    const ours = scripts.slice(0, -1)
    const loaded: { src: string; attributes: Record<string, string> }[] = []
    const element = () => ({
      attributes: {} as Record<string, string>,
      setAttribute(name: string, value: string) {
        this.attributes[name] = value
      },
    })
    const firstScript = { parentNode: { insertBefore: (s: never) => loaded.push(s) } }
    const document = Object.assign(new EventTarget(), {
      title: "Page",
      createElement: element,
      head: { appendChild: (s: never) => loaded.push(s) },
      getElementsByTagName: () => [firstScript],
    })
    const context = createContext({
      document,
      location: { hostname: "garden.example", pathname: "/", href: "https://garden.example/" },
    })
    context.window = context
    for (const script of ours) runInContext(script, context)
    return { loaded: loaded.map((s) => ({ src: s.src, attributes: s.attributes })), context, ours }
  }

  const cases: [Record<string, unknown>, string, Record<string, string>?][] = [
    [{ provider: "google", tagId: "G-1" }, "https://www.googletagmanager.com/gtag/js?id=G-1"],
    [
      { provider: "plausible" },
      "https://plausible.io/js/script.manual.js",
      { "data-domain": "garden.example" },
    ],
    [{ provider: "plausible", host: "https://p.example" }, "https://p.example/js/script.manual.js"],
    [
      { provider: "umami", websiteId: "w1" },
      "https://analytics.umami.is/script.js",
      { "data-website-id": "w1" },
    ],
    [
      { provider: "umami", websiteId: "w1", host: "https://u.example", script: "u.js" },
      "https://u.example/u.js",
    ],
    [{ provider: "goatcounter", websiteId: "g1" }, "https://gc.zgo.at/count.js"],
    [{ provider: "posthog", apiKey: "k" }, "https://app.posthog.com/static/array.js"],
    [
      { provider: "posthog", apiKey: "k", host: "https://ph.example" },
      "https://ph.example/static/array.js",
    ],
    [
      { provider: "posthog", apiKey: "k", host: "https://h", apiHost: "https://api.h" },
      "https://api.h/static/array.js",
    ],
    [{ provider: "tinylytics", siteId: "t 1" }, "https://tinylytics.app/embed/t%201.js?spa"],
    [{ provider: "cabin" }, "https://scripts.withcabin.com/hello.js"],
    [{ provider: "cabin", host: "https://c.example" }, "https://c.example/hello.js"],
    [{ provider: "clarity", projectId: "c1" }, "https://www.clarity.ms/tag/c1"],
    [{ provider: "matomo", host: "m.example", siteId: "3" }, "//m.example/matomo.js"],
    [{ provider: "vercel" }, "/_vercel/insights/script.js"],
    [
      { provider: "rybbit", siteId: "r1" },
      "https://app.rybbit.io/api/script.js",
      { "data-site-id": "r1" },
    ],
    [
      { provider: "rybbit", siteId: "r1", host: "https://r.example" },
      "https://r.example/api/script.js",
    ],
  ]
  for (const [analytics, src, attributes] of cases) {
    test(`${JSON.stringify(analytics)} loads ${src}`, async () => {
      const { loaded } = await loadedScripts(analytics)
      assert.deepEqual(
        loaded.map((s) => s.src),
        [src],
      )
      for (const [name, value] of Object.entries(attributes ?? {})) {
        assert.equal(loaded[0].attributes[name], value, name)
      }
    })
  }

  test("goatcounter counts at the site's endpoint; posthog gets its options", async () => {
    const gc = await loadedScripts({ provider: "goatcounter", websiteId: "g1", host: "gc.example" })
    assert.ok(gc.ours.join("\n").includes('"https://" + "g1" + "." + "gc.example" + "/count"'))
    const ph = await loadedScripts({
      provider: "posthog",
      apiKey: "k",
      uiHost: "https://ui.example",
      personProfiles: "identified_only",
    })
    const init = (ph.context.posthog as { _i: [string, Record<string, unknown>][] })._i[0]
    assert.deepEqual(init[0], "k")
    assert.deepEqual(
      { ...init[1] },
      {
        api_host: "https://app.posthog.com",
        ui_host: "https://ui.example",
        person_profiles: "identified_only",
        capture_pageview: false,
      },
    )
  })

  test("vercel's queue stub is defined in the prescript, before any script runs", async () => {
    const { ctx, read } = await emit({ analytics: { provider: "vercel" } }, { emitters: [] })
    const context = createContext({})
    context.window = context
    runInContext(read(ctx.hashedResourceNames!["prescript.js"]), context)
    assert.equal(typeof context.va, "function")
    context.va("event", "x")
    assert.deepEqual(
      [...(context.vaq as unknown[][])].map((args) => [...args]),
      [["event", "x"]],
    )
  })

  test("no analytics, no analytics script", async () => {
    const { ours } = await loadedScripts({})
    assert.deepEqual(ours, [])
  })
})

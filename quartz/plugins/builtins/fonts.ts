import fs from "node:fs/promises"
import path from "node:path"
import { createRequire } from "node:module"
import { h } from "preact"
import { FontsConfig, FontSpecification } from "../../cfg"
import { BuildCtx } from "../../util/ctx"
import { FilePath, FullSlug, pathToRoot } from "../../util/path"
import { CSSResource } from "../../util/resources"
import { QuartzEmitterPlugin } from "../types"

/**
 * Built-in fonts (formerly `@quartz-community/quartz-fonts`).
 *
 * - Loads the configured fonts (`configuration.fonts`, falling back to
 *   `configuration.theme.typography`) from Google Fonts, from the build output
 *   (`fontOrigin: "selfHosted"`, downloaded at build time), or not at all (`"local"`).
 * - Sets Quartz's font variables, plus Obsidian's (`--font-text`, `--h1-font`, …) and
 *   per-heading fonts.
 * - With a theme plugin that registers its fonts (`globalThis.__quartzFonts`, e.g.
 *   @quartz-themes/core) the theme owns Obsidian's font variables and heading fonts: only roles
 *   configured explicitly here override it.
 */

const HEADING_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const
type HeadingLevel = (typeof HEADING_LEVELS)[number]
type FontRole = "title" | "header" | "body" | "code" | "interface"

export const SELF_HOSTED_STYLESHEET = "static/fonts/quartz-fonts.css"
export const QUARTZ_DEFAULT_HEADER = "Schibsted Grotesk"
export const QUARTZ_DEFAULT_BODY = "Source Sans Pro"
export const QUARTZ_DEFAULT_CODE = "IBM Plex Mono"

const OBSIDIAN_SANS_STACK =
  'ui-sans-serif, -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Inter", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif'
const OBSIDIAN_MONO_STACK =
  'ui-monospace, SFMono-Regular, "Cascadia Mono", "Roboto Mono", "DejaVu Sans Mono", "Liberation Mono", Menlo, Monaco, "Consolas", "Source Code Pro", monospace'

const DEFAULT_WEIGHTS: Record<FontRole, number[]> = {
  title: [400, 700],
  header: [400, 700],
  body: [400, 600],
  code: [400, 600],
  interface: [400, 600],
}
const DEFAULT_ITALIC: Record<FontRole, boolean> = {
  title: false,
  header: false,
  body: true,
  code: false,
  interface: false,
}

/** Option defaults; every key is listed so unknown options can be reported. */
export const fontsDefaults: Record<string, unknown> = {
  title: undefined,
  body: undefined,
  header: undefined,
  code: undefined,
  interface: undefined,
  h1: undefined,
  h2: undefined,
  h3: undefined,
  h4: undefined,
  h5: undefined,
  h6: undefined,
  useThemeFonts: true,
  fontOrigin: "googleFonts",
}

// ---- font registry (theme plugins) -------------------------------------------

interface QuartzFontRegistry {
  themeName: string
  fonts: Record<string, string>
}

function readFontRegistry(): QuartzFontRegistry | undefined {
  const registry = (globalThis as Record<string, unknown>).__quartzFonts
  if (registry && typeof registry === "object" && "themeName" in registry && "fonts" in registry) {
    return registry as QuartzFontRegistry
  }
  return undefined
}

// ---- typography ----------------------------------------------------------------

interface ConfiguredTypography {
  title?: FontSpecification
  header?: FontSpecification
  body?: FontSpecification
  code?: FontSpecification
}

const isFontSpecification = (value: unknown): value is FontSpecification =>
  (typeof value === "string" && value.trim().length > 0) ||
  (typeof value === "object" &&
    value !== null &&
    typeof (value as { name?: unknown }).name === "string")

export function readConfiguredTypography(ctx: BuildCtx | undefined): ConfiguredTypography {
  const typography = (ctx?.cfg?.configuration?.theme as { typography?: unknown } | undefined)
    ?.typography
  if (typeof typography !== "object" || typography === null) return {}
  const result: ConfiguredTypography = {}
  for (const role of ["title", "header", "body", "code"] as const) {
    const spec = (typography as Record<string, unknown>)[role]
    if (isFontSpecification(spec)) result[role] = spec
  }
  return result
}

/**
 * Options first, then `configuration.theme.typography`, then Quartz's defaults. The interface
 * and per-heading fonts exist only as options.
 */
export function resolveFontSpecs(options: FontsConfig, typography: ConfiguredTypography) {
  return {
    title: options.title ?? typography.title,
    header: options.header ?? typography.header ?? QUARTZ_DEFAULT_HEADER,
    body: options.body ?? typography.body ?? QUARTZ_DEFAULT_BODY,
    code: options.code ?? typography.code ?? QUARTZ_DEFAULT_CODE,
    interface: options.interface,
    headings: HEADING_LEVELS.map((l) => options[l]).filter(
      (spec): spec is FontSpecification => spec !== undefined,
    ),
  }
}

const fontName = (spec: FontSpecification) => (typeof spec === "string" ? spec : spec.name)

// ---- Google Fonts --------------------------------------------------------------

interface MergedFont {
  name: string
  weights: Set<number>
  italic: boolean
}

function mergeInto(map: Map<string, MergedFont>, role: FontRole, spec: FontSpecification) {
  const { name, weights, includeItalic } = typeof spec === "string" ? { name: spec } : spec
  const resolvedWeights = weights ?? DEFAULT_WEIGHTS[role]
  const italic = includeItalic ?? DEFAULT_ITALIC[role]
  const existing = map.get(name)
  if (existing) {
    for (const w of resolvedWeights) existing.weights.add(w)
    if (italic) existing.italic = true
  } else {
    map.set(name, { name, weights: new Set(resolvedWeights), italic })
  }
}

/** Google Fonts css2 `family` value; a single weight still names its axis unless it's 400. */
function formatMerged(entry: MergedFont): string {
  const weights = [...entry.weights].sort((a, b) => a - b)
  const defaultWeight = weights.length === 1 && weights[0] === 400
  if (entry.italic) {
    if (defaultWeight) return `${entry.name}:ital@0;1`
    const tuples = [...weights.map((w) => `0,${w}`), ...weights.map((w) => `1,${w}`)]
    return `${entry.name}:ital,wght@${tuples.join(";")}`
  }
  return defaultWeight ? entry.name : `${entry.name}:wght@${weights.join(";")}`
}

export function googleFontHref(fonts: ReturnType<typeof resolveFontSpecs>): string {
  const merged = new Map<string, MergedFont>()
  mergeInto(merged, "header", fonts.header)
  mergeInto(merged, "body", fonts.body)
  mergeInto(merged, "code", fonts.code)
  if (fonts.title) mergeInto(merged, "title", fonts.title)
  if (fonts.interface) mergeInto(merged, "interface", fonts.interface)
  for (const spec of fonts.headings) mergeInto(merged, "header", spec)
  const params = [...merged.values()]
    .map(formatMerged)
    .map((f) => `family=${encodeURIComponent(f)}`)
    .join("&")
  return `https://fonts.googleapis.com/css2?${params}&display=swap`
}

const fontMime: Record<string, string> = {
  truetype: "ttf",
  woff: "woff",
  woff2: "woff2",
  opentype: "otf",
}
const fontUrlPattern =
  /url\((https:\/\/fonts.gstatic.com\/.+(?:\/|(?:kit=))(.+?)[.&].+?)\)\sformat\('(\w+?)'\);/g

/** Rewrite Google Fonts URLs to files next to the stylesheet (works under any base path). */
export function processGoogleFonts(stylesheet: string) {
  const fontFiles: { url: string; filename: string; extension: string }[] = []
  const processedStylesheet = stylesheet.replace(
    fontUrlPattern,
    (match, url: string, filename: string, format: string) => {
      const extension = fontMime[format] ?? format
      fontFiles.push({ url, filename, extension })
      return match.replace(url, `${filename}.${extension}`)
    },
  )
  return { processedStylesheet, fontFiles }
}

/** Warn about fonts Google Fonts doesn't have, when `google-font-metadata` is installed. */
function validate(options: FontsConfig) {
  let metadata: Record<string, { weights: number[]; styles: string[] }> | undefined
  try {
    metadata = createRequire(import.meta.url)("google-font-metadata").APIv1
  } catch {
    return
  }
  const check = (role: string, spec: FontSpecification | undefined, fontRole: FontRole) => {
    if (!spec || !metadata) return
    const name = fontName(spec)
    const entry = metadata[name.toLowerCase().replace(/\s+/g, "-")]
    if (!entry) {
      console.warn(`[fonts] ${role}: "${name}" is not a recognized Google Font.`)
      return
    }
    const weights =
      typeof spec === "object" && spec.weights ? spec.weights : DEFAULT_WEIGHTS[fontRole]
    for (const w of weights)
      if (!entry.weights.includes(w))
        console.warn(`[fonts] ${role}: "${name}" does not support weight ${w}.`)
  }
  check("title", options.title, "title")
  check("header", options.header, "header")
  check("body", options.body, "body")
  check("code", options.code, "code")
  check("interface", options.interface, "interface")
  for (const level of HEADING_LEVELS) check(level, options[level], "header")
}

// ---- CSS -------------------------------------------------------------------------

type ResolvedFonts = Record<
  "title" | "body" | "header" | "code" | "interface" | HeadingLevel,
  string
>

export function resolveFonts(
  options: FontsConfig,
  typography: ConfiguredTypography,
): ResolvedFonts {
  const registry = options.useThemeFonts !== false ? readFontRegistry() : undefined
  const theme = registry?.fonts ?? {}
  const pick = (spec: FontSpecification | undefined, ...fallbacks: (string | undefined)[]) =>
    spec !== undefined
      ? fontName(spec)
      : (fallbacks.find((f) => f !== undefined) ?? OBSIDIAN_SANS_STACK)

  const body = pick(
    options.body,
    theme["--font-text"],
    typography.body && fontName(typography.body),
    QUARTZ_DEFAULT_BODY,
  )
  const header = pick(
    options.header,
    theme["--font-text"],
    typography.header && fontName(typography.header),
    QUARTZ_DEFAULT_HEADER,
  )
  const code = pick(
    options.code,
    theme["--font-monospace"],
    typography.code && fontName(typography.code),
    QUARTZ_DEFAULT_CODE,
    OBSIDIAN_MONO_STACK,
  )
  const iface = pick(options.interface, theme["--font-interface"], OBSIDIAN_SANS_STACK)
  const title = pick(options.title, typography.title && fontName(typography.title), header)
  const heading = (level: HeadingLevel) =>
    options[level] !== undefined
      ? fontName(options[level]!)
      : (theme[`--${level}-font`] ??
        (options.header !== undefined
          ? fontName(options.header)
          : (theme["--font-text"] ?? header)))
  return {
    title,
    body,
    header,
    code,
    interface: iface,
    h1: heading("h1"),
    h2: heading("h2"),
    h3: heading("h3"),
    h4: heading("h4"),
    h5: heading("h5"),
    h6: heading("h6"),
  }
}

const isExplicit = (options: FontsConfig, key: keyof FontsConfig) =>
  options[key] !== undefined ||
  ((HEADING_LEVELS as readonly string[]).includes(key) && options.header !== undefined)

export function buildLayeredCSS(fonts: ResolvedFonts, options: FontsConfig, themeActive: boolean) {
  const obsidianVars: [string, string, keyof FontsConfig][] = [
    ["--font-text", fonts.body, "body"],
    ["--font-interface", fonts.interface, "interface"],
    ["--font-monospace", fonts.code, "code"],
    ...HEADING_LEVELS.map(
      (l) => [`--${l}-font`, fonts[l], l] as [string, string, keyof FontsConfig],
    ),
  ]
  return [
    "@layer quartz-fonts {",
    "  :root {",
    `    --titleFont: ${fonts.title};`,
    `    --bodyFont: ${fonts.body};`,
    `    --headerFont: ${fonts.header};`,
    `    --codeFont: ${fonts.code};`,
    ...obsidianVars
      .filter(([, , key]) => !themeActive || isExplicit(options, key))
      .map(([name, value]) => `    ${name}: ${value};`),
    "  }",
    "}",
  ].join("\n")
}

/** Obsidian's override variables for the body, interface and code roles. */
const OBSIDIAN_OVERRIDES: [string, "body" | "interface" | "code"][] = [
  ["--font-text-override", "body"],
  ["--font-interface-override", "interface"],
  ["--font-monospace-override", "code"],
]

/**
 * Unlayered heading fonts beat every layer; with a theme, only explicitly configured ones.
 *
 * Explicitly configured body/interface/code fonts also go to Obsidian's `--font-*-override`
 * variables on `body`: an Obsidian theme's app.css sets `--font-text` and friends on `body`
 * itself, so the `:root` values from {@link buildLayeredCSS} never reach the page. This holds
 * whether or not the theme registers its fonts (with `themeFonts: false` it maps the overrides
 * to Quartz's font variables on `body`), so the selector is `html body`, which wins over a
 * theme's `body` rule regardless of stylesheet order. Without an Obsidian theme nothing reads
 * the overrides.
 */
export function buildUnlayeredCSS(
  fonts: ResolvedFonts,
  options: FontsConfig,
  themeActive: boolean,
) {
  const rules = HEADING_LEVELS.filter((l) => !themeActive || isExplicit(options, l)).map(
    (l) => `${l} { font-family: ${fonts[l]}; }`,
  )
  const overrides = OBSIDIAN_OVERRIDES.filter(([, key]) => options[key] !== undefined).map(
    ([name, key]) => `  ${name}: ${fonts[key]};`,
  )
  if (overrides.length > 0) rules.push(["html body {", ...overrides, "}"].join("\n"))
  return rules.join("\n")
}

// ---- plugin ------------------------------------------------------------------------

export const Fonts: QuartzEmitterPlugin<FontsConfig> = (userOpts) => {
  const options: FontsConfig = { ...fontsDefaults, ...userOpts }
  if (options.fontOrigin === "googleFonts") validate(options)

  return {
    name: "Fonts",
    externalResources(ctx) {
      const typography = readConfiguredTypography(ctx)
      const fonts = resolveFonts(options, typography)
      const themeActive = options.useThemeFonts !== false && readFontRegistry() !== undefined
      const css: CSSResource[] = [
        { content: buildLayeredCSS(fonts, options, themeActive), inline: true },
      ]
      const unlayered = buildUnlayeredCSS(fonts, options, themeActive)
      if (unlayered) css.push({ content: unlayered, inline: true })

      let additionalHead: unknown[] = []
      // Quartz's <Head> already links configuration.theme.typography from Google Fonts when
      // theme.cdnCaching is on; only add a link for fonts configured here on top of that.
      const theme = ctx?.cfg?.configuration?.theme as
        { cdnCaching?: boolean; fontOrigin?: string } | undefined
      const headLinksTypography = theme?.cdnCaching === true && theme?.fontOrigin === "googleFonts"
      const overridesTypography = (
        ["title", "header", "body", "code", "interface", ...HEADING_LEVELS] as const
      ).some((k) => options[k] !== undefined)
      if (options.fontOrigin === "googleFonts" && (!headLinksTypography || overridesTypography)) {
        const href = googleFontHref(resolveFontSpecs(options, typography))
        additionalHead = [
          h("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
          h("link", {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "anonymous",
          }),
          h("link", { rel: "stylesheet", href }),
        ]
      } else if (options.fontOrigin === "selfHosted") {
        // Relative to the page so it works on localhost and under a base path (#2547).
        additionalHead = [
          (fileData: { slug?: string }) =>
            h("link", {
              rel: "stylesheet",
              href: `${pathToRoot((fileData?.slug ?? "index") as FullSlug)}/${SELF_HOSTED_STYLESHEET}`,
            }),
        ]
      }
      return { css, js: [], additionalHead: additionalHead as never }
    },
    async emit(ctx) {
      if (options.fontOrigin !== "selfHosted") return []
      const href = googleFontHref(resolveFontSpecs(options, readConfiguredTypography(ctx)))
      const res = await fetch(href)
      if (!res.ok)
        throw new Error(`[fonts] Failed to fetch Google Fonts CSS: ${res.status} ${res.statusText}`)
      const { processedStylesheet, fontFiles } = processGoogleFonts(await res.text())
      const fontsDir = path.join(ctx.argv.output, "static", "fonts")
      await fs.mkdir(fontsDir, { recursive: true })
      const written: FilePath[] = []
      for (const file of fontFiles) {
        const r = await fetch(file.url)
        if (!r.ok)
          throw new Error(
            `[fonts] Failed to fetch font file: ${file.url} (${r.status} ${r.statusText})`,
          )
        const out = path.join(fontsDir, `${file.filename}.${file.extension}`)
        await fs.writeFile(out, Buffer.from(await r.arrayBuffer()))
        written.push(out as FilePath)
      }
      const cssPath = path.join(fontsDir, "quartz-fonts.css")
      await fs.writeFile(cssPath, processedStylesheet)
      written.push(cssPath as FilePath)
      return written
    },
  }
}

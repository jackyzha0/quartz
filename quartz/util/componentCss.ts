import { Features, Targets, transform } from "lightningcss"
import { recordDiagnostic } from "./diagnostics"

/**
 * One component's CSS, parsed on its own and printed back balanced. All components' CSS goes
 * into one stylesheet: an unclosed `{`, `/*` or string in one would swallow every later
 * component's rules, and a stray `}` close the shared layer (and fail the build). Parsed alone,
 * the end of the chunk closes what it left open, as a stylesheet of its own would in a browser;
 * a chunk that doesn't parse is printed with the rules that do, with a warning naming the
 * component.
 */
export function isolateComponentCss(css: string, owner = ""): string {
  const name = owner ? `component ${owner}` : "a component"
  const parse = (errorRecovery: boolean) =>
    transform({ filename: "component.css", code: Buffer.from(css), errorRecovery })
  try {
    return parse(false).code.toString()
  } catch (err) {
    const loc = (err as { loc?: { line: number; column: number } }).loc
    recordDiagnostic({
      severity: "warning",
      area: "css",
      message:
        `The CSS of ${name} has a syntax error (${(err as Error).message}` +
        `${loc ? ` at line ${loc.line}, column ${loc.column}` : ""}); the rules that parse are kept.`,
    })
    try {
      return parse(true).code.toString()
    } catch {
      return ""
    }
  }
}

/**
 * All components' CSS as ComponentResources emits it: each chunk isolated, in order, in one
 * `quartz-base` layer, minified.
 */
export function componentStylesheet(
  chunks: string[],
  ownerOf: (css: string) => string | undefined = () => undefined,
  targets?: Targets,
): string {
  const isolated = chunks.map((c) => isolateComponentCss(c, ownerOf(c)))
  const wrapped = `@layer quartz-base {\n${isolated.join("\n")}\n}`
  return transform({
    filename: "component.css",
    code: Buffer.from(wrapped),
    minify: true,
    targets,
    include: Features.MediaQueries,
  }).code.toString()
}

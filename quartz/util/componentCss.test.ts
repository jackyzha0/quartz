import assert from "node:assert/strict"
import test, { beforeEach, describe } from "node:test"
import { Features, transform } from "lightningcss"
import { componentStylesheet, isolateComponentCss } from "./componentCss"
import { getDiagnostics, resetDiagnostics } from "./diagnostics"

/** The component stylesheet as ComponentResources builds it. */
const sheet = (chunks: string[]) => componentStylesheet(chunks, () => "Bad")

describe("isolateComponentCss", () => {
  beforeEach(() => resetDiagnostics())
  const later = ".later{color:red}"
  for (const [what, bad] of [
    ["a missing }", ".bad{color:blue"],
    ["an unclosed comment", ".bad{color:blue} /* note"],
    ["an unclosed @media", ".bad{color:blue} @media (min-width: 1px) { .x { color: red }"],
    ["an unclosed string", '.bad{content:"x'],
  ]) {
    test(`${what} in one component doesn't swallow the next one's rules`, () => {
      assert.match(sheet([bad, later]), /@layer quartz-base\{.*\.later\{color:red\}\}$/)
      // the end of the chunk closes what it left open: not an error
      assert.deepEqual(getDiagnostics(), [])
    })
  }

  test("a stray } doesn't fail the stylesheet", () => {
    assert.match(sheet([".bad{color:blue}}", later]), /\.bad\{color:#00f\}.*\.later\{color:red\}/)
    assert.deepEqual(
      getDiagnostics().map((d) => d.message.split(" has ")[0]),
      ["The CSS of component Bad"],
    )
  })

  test("CSS that doesn't parse keeps the rules that do, with a warning naming the component", () => {
    assert.equal(
      isolateComponentCss(".bad{color:blue}}", "Explorer"),
      ".bad {\n  color: #00f;\n}\n",
    )
    assert.deepEqual(getDiagnostics(), [
      {
        severity: "warning",
        area: "css",
        message:
          "The CSS of component Explorer has a syntax error (Unexpected end of input at line 1, column 18); the rules that parse are kept.",
      },
    ])
    resetDiagnostics()
    isolateComponentCss(".bad{color:blue}}")
    assert.match(getDiagnostics()[0].message, /^The CSS of a component has a syntax error/)
  })

  test("balanced CSS comes out as it did before", () => {
    const css = ".a{color:red;& .b{margin:0}}@media (max-width:800px){.a{display:none}}"
    const raw = transform({
      filename: "component.css",
      code: Buffer.from(`@layer quartz-base {\n${css}\n${later}\n}`),
      minify: true,
      include: Features.MediaQueries,
    }).code.toString()
    assert.equal(sheet([css, later]), raw)
    assert.deepEqual(getDiagnostics(), [])
  })
})

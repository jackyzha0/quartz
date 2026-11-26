import assert from "node:assert/strict"
import test, { describe } from "node:test"
import { Features, transform } from "lightningcss"
import { isolateComponentCss } from "./componentCss"

/** The component stylesheet as ComponentResources builds it. */
const sheet = (chunks: string[]) =>
  transform({
    filename: "component.css",
    code: Buffer.from(
      `@layer quartz-base {\n${chunks.map((c) => isolateComponentCss(c, "Bad")).join("\n")}\n}`,
    ),
    minify: true,
    include: Features.MediaQueries,
  }).code.toString()

describe("isolateComponentCss", () => {
  const later = ".later{color:red}"
  for (const [what, bad] of [
    ["a missing }", ".bad{color:blue"],
    ["an unclosed comment", ".bad{color:blue} /* note"],
    ["an unclosed @media", ".bad{color:blue} @media (min-width: 1px) { .x { color: red }"],
    ["an unclosed string", '.bad{content:"x'],
  ]) {
    test(`${what} in one component doesn't swallow the next one's rules`, () => {
      assert.match(sheet([bad, later]), /@layer quartz-base\{.*\.later\{color:red\}\}$/)
    })
  }

  test("a stray } doesn't fail the stylesheet", () => {
    assert.match(sheet([".bad{color:blue}}", later]), /\.bad\{color:#00f\}.*\.later\{color:red\}/)
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
  })
})

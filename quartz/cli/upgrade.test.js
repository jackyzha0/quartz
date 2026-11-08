import test, { describe } from "node:test"
import assert from "node:assert"
import { changelogSections, formatChangelog } from "./upgrade.js"

const CHANGELOG = `# @jackyzha0/quartz

## 5.2.0

### Minor Changes

- abc1234: Something new

## 5.1.1

### Patch Changes

- def5678: A fix

## 5.1.0

### Minor Changes

- Built-in processing

## 5.0.0

- Plugin system
`

describe("changelogSections", () => {
  test("returns the versions after `from` up to `to`, newest first", () => {
    const sections = changelogSections(CHANGELOG, "5.1.0", "5.2.0")
    assert.deepStrictEqual(
      sections.map((s) => s.version),
      ["5.2.0", "5.1.1"],
    )
    assert.match(sections[1].body, /### Patch Changes\n\n- def5678: A fix/)
  })

  test("skipping several releases includes all of them; nothing newer than `to`", () => {
    assert.deepStrictEqual(
      changelogSections(CHANGELOG, "5.0.0", "5.1.1").map((s) => s.version),
      ["5.1.1", "5.1.0"],
    )
  })

  test("no changelog or same version → nothing", () => {
    assert.deepStrictEqual(changelogSections("", "5.0.0", "5.1.0"), [])
    assert.deepStrictEqual(changelogSections(CHANGELOG, "5.2.0", "5.2.0"), [])
  })
})

describe("formatChangelog", () => {
  test("cuts long notes off with a link to the releases", () => {
    const text = formatChangelog(changelogSections(CHANGELOG, "5.0.0", "5.2.0"), {
      maxLines: 5,
    }).replace(/\x1b\[[0-9;]*m/g, "")
    assert.strictEqual(text.split("\n").length, 6)
    assert.match(text, /^Quartz 5\.2\.0/)
    assert.match(text, /github\.com\/jackyzha0\/quartz\/releases$/)
  })
})

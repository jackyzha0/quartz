import test, { describe } from "node:test"
import assert from "node:assert"
import {
  checkQuartzRequirement,
  describeDeprecation,
  describeRequirementProblem,
  formatQuartzVersion,
  brokenPluginsFailBuild,
  incompatiblePluginsFailBuild,
  readQuartzVersion,
} from "./compat.js"
import { redactRemote, formatInfoMarkdown } from "./info.js"

describe("checkQuartzRequirement", () => {
  test("real semver ranges", () => {
    assert.strictEqual(checkQuartzRequirement(">=5.0.0", "5.0.0").status, "ok")
    assert.strictEqual(checkQuartzRequirement(">=5.1.0", "5.0.0").status, "incompatible")
    assert.strictEqual(checkQuartzRequirement("^5.1.0", "6.0.0").status, "incompatible")
    assert.strictEqual(checkQuartzRequirement(">=5.1.0 <7", "6.2.0").status, "ok")
  })

  test("prereleases of a satisfying version count", () => {
    assert.strictEqual(checkQuartzRequirement(">=5.0.0", "5.1.0-beta.1").status, "ok")
  })

  test("missing, invalid and unknown", () => {
    assert.strictEqual(checkQuartzRequirement(undefined, "5.0.0").status, "none")
    assert.strictEqual(checkQuartzRequirement("five", "5.0.0").status, "invalid")
    assert.strictEqual(checkQuartzRequirement(">=5.0.0", undefined).status, "unknown")
  })
})

describe("describeRequirementProblem", () => {
  test("too old Quartz → suggests upgrading Quartz", () => {
    const p = describeRequirementProblem(
      "graph",
      checkQuartzRequirement(">=5.1.0", "5.0.0"),
      "2.0.0",
    )
    assert.match(p.message, /graph@2\.0\.0 requires Quartz >=5\.1\.0, but this is Quartz 5\.0\.0/)
    assert.match(p.hint, /npx quartz upgrade/)
  })

  test("too new Quartz → suggests a newer plugin", () => {
    const p = describeRequirementProblem("graph", checkQuartzRequirement("^5.0.0", "6.0.0"))
    assert.match(p.hint, /newer release of the plugin/)
  })

  test("nothing to say when compatible", () => {
    assert.strictEqual(
      describeRequirementProblem("graph", checkQuartzRequirement(">=5.0.0", "5.0.0")),
      undefined,
    )
  })
})

describe("incompatiblePluginsFailBuild", () => {
  test("fails in CI, warns locally, can be overridden", () => {
    assert.strictEqual(incompatiblePluginsFailBuild({}), false)
    assert.strictEqual(incompatiblePluginsFailBuild({ CI: "true" }), true)
    assert.strictEqual(incompatiblePluginsFailBuild({ CI: "1" }), true)
    assert.strictEqual(incompatiblePluginsFailBuild({ CI: "false" }), false)
    assert.strictEqual(incompatiblePluginsFailBuild({ CI: "0" }), false)
    assert.strictEqual(
      incompatiblePluginsFailBuild({ CI: "true", QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS: "1" }),
      false,
    )
  })

  test("broken plugins have their own override", () => {
    assert.strictEqual(brokenPluginsFailBuild({}), false)
    assert.strictEqual(brokenPluginsFailBuild({ CI: "true" }), true)
    assert.strictEqual(
      brokenPluginsFailBuild({ CI: "true", QUARTZ_ALLOW_BROKEN_PLUGINS: "1" }),
      false,
    )
    assert.strictEqual(
      brokenPluginsFailBuild({ CI: "true", QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS: "1" }),
      true,
    )
  })
})

describe("describeDeprecation", () => {
  test("turns quartz.deprecated into a warning with a fix", () => {
    const d = describeDeprecation("hard-line-breaks", "  Use OFM's strictLineBreaks.  ")
    assert.strictEqual(d.message, "hard-line-breaks is deprecated: Use OFM's strictLineBreaks.")
    assert.match(d.hint, /npx quartz plugin remove hard-line-breaks/)
    assert.strictEqual(describeDeprecation("x", undefined), undefined)
    assert.strictEqual(describeDeprecation("x", ""), undefined)
    assert.strictEqual(describeDeprecation("x", true), undefined)
  })
})

describe("version display", () => {
  test("readQuartzVersion reads this checkout's package.json", () => {
    assert.match(readQuartzVersion() ?? "", /^\d+\.\d+\.\d+/)
  })

  test("formatQuartzVersion adds git describe only off a release", () => {
    assert.strictEqual(formatQuartzVersion("5.1.0", { describe: "v5.1.0" }), "5.1.0")
    assert.strictEqual(
      formatQuartzVersion("5.1.0", { describe: "v5.1.0-3-g1a2b3c4-dirty" }),
      "5.1.0 (v5.1.0-3-g1a2b3c4-dirty)",
    )
    assert.strictEqual(formatQuartzVersion(undefined, {}), "unknown")
  })
})

describe("quartz info", () => {
  test("redacts credentials in remote URLs", () => {
    assert.strictEqual(
      redactRemote("https://ghp_secret@github.com/me/quartz.git"),
      "https://github.com/me/quartz.git",
    )
    assert.strictEqual(redactRemote("git@github.com:me/quartz.git"), "git@github.com:me/quartz.git")
  })

  test("markdown lists incompatible plugins prominently", () => {
    const md = formatInfoMarkdown({
      quartz: { display: "5.0.0 (abc1234-dirty)", branch: "main", modified: true },
      environment: { node: "v22.0.0", npm: "10.0.0", os: "linux" },
      config: { file: "quartz.config.yaml", plugins: 2, enabled: 2 },
      builtins: [{ key: "links", enabled: true }],
      plugins: [
        {
          name: "graph",
          enabled: true,
          version: "2.0.0",
          source: "@quartz-community/graph",
          quartzVersion: ">=5.1.0",
          compatibility: "incompatible",
        },
        {
          name: "mine",
          enabled: true,
          version: "0.1.0",
          commit: "1a2b3c4",
          source: "github:me/mine",
          compatibility: "none",
        },
      ],
    })
    assert.match(md, /\*\*Quartz:\*\* 5\.0\.0 \(abc1234-dirty\) — branch `main`, local changes/)
    assert.match(md, /\*\*Incompatible plugins:\*\* graph \(needs Quartz >=5\.1\.0\)/)
    assert.match(md, /\| mine \| yes \| 0\.1\.0 @1a2b3c4 \| github:me\/mine \| – \|/)
  })
})

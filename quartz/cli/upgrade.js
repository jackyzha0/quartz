/**
 * The part of `npx quartz upgrade` that runs after the new Quartz has been pulled.
 *
 * `handleUpgrade` is executed by the *old* Quartz (the code that was checked out when the command
 * started). After `git pull` + `npm i` it runs `finishUpgrade` from the freshly pulled code in a new
 * Node process, so the checks below are always the ones of the version being upgraded to — e.g. its
 * `plugin doctor` knows about plugins that became built-ins and new plugin version requirements.
 */
import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"
import { styleText } from "node:util"
import semver from "semver"
import { describeQuartzCheckout, formatQuartzVersion, readQuartzVersion } from "./compat.js"

const RELEASES_URL = "https://github.com/jackyzha0/quartz/releases"

/**
 * Sections of a changesets CHANGELOG.md ("## 5.1.0" headings) for versions after `from` up to and
 * including `to`, newest first.
 */
export function changelogSections(markdown, from, to) {
  const sections = []
  let current
  for (const line of markdown.split("\n")) {
    const heading = line.match(/^## (\S+)\s*$/)
    if (heading) {
      current = semver.valid(heading[1]) ? { version: heading[1], lines: [] } : undefined
      if (current) sections.push(current)
      continue
    }
    current?.lines.push(line)
  }
  return sections
    .filter(
      (s) =>
        (!from || !semver.valid(from) || semver.gt(s.version, from)) &&
        (!to || !semver.valid(to) || semver.lte(s.version, to)),
    )
    .sort((a, b) => semver.rcompare(a.version, b.version))
    .map((s) => ({ version: s.version, body: s.lines.join("\n").trim() }))
}

/** Changelog sections as terminal text, cut off after `maxLines` with a link to the releases. */
export function formatChangelog(sections, { maxLines = 60 } = {}) {
  const lines = []
  for (const s of sections) {
    lines.push(styleText("bold", `Quartz ${s.version}`), ...s.body.split("\n"), "")
  }
  if (lines.length > maxLines) {
    return [
      ...lines.slice(0, maxLines),
      styleText("gray", `… see the full release notes: ${RELEASES_URL}`),
    ].join("\n")
  }
  return lines.join("\n").trimEnd()
}

function commitsSince(commit, root) {
  if (!commit) return undefined
  try {
    const out = execFileSync("git", ["rev-list", "--count", `${commit}..HEAD`], {
      cwd: root,
      encoding: "utf8",
      timeout: 5000,
      stdio: ["ignore", "pipe", "ignore"],
    })
    return Number(out.trim())
  } catch {
    return undefined
  }
}

/** What changed between the old and the new checkout, plus the release notes in between. */
export function describeUpgrade({ fromVersion, fromCommit, root = process.cwd() }) {
  const toVersion = readQuartzVersion(root)
  const display = formatQuartzVersion(toVersion, describeQuartzCheckout(root))
  const lines = []
  if (fromVersion && toVersion && fromVersion !== toVersion) {
    lines.push(styleText("cyan", `Upgraded Quartz ${fromVersion} → ${display}`))
    let markdown = ""
    try {
      markdown = fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8")
    } catch {}
    const sections = changelogSections(markdown, fromVersion, toVersion)
    if (sections.length > 0) {
      lines.push("", formatChangelog(sections), "")
    } else {
      lines.push(styleText("gray", `Release notes: ${RELEASES_URL}`))
    }
  } else {
    const count = commitsSince(fromCommit, root)
    lines.push(
      count
        ? styleText(
            "cyan",
            `Pulled ${count} new commit${count === 1 ? "" : "s"} — Quartz ${display} (not released yet; changes are listed in .changeset/)`,
          )
        : styleText("gray", `Quartz is already up to date (${display})`),
    )
  }
  return lines.join("\n")
}

/** Run by `npx quartz upgrade` from the newly pulled code (see top of file). */
export async function finishUpgrade({ fromVersion, fromCommit } = {}) {
  console.log(describeUpgrade({ fromVersion, fromCommit }))

  const { handlePluginRestore, handlePluginDoctor, handlePluginCheck } =
    await import("./plugin-git-handlers.js")
  console.log()
  await handlePluginRestore()

  console.log("\nChecking your config and plugins against this Quartz version...")
  await handlePluginDoctor()

  console.log("\nChecking for plugin updates...")
  await handlePluginCheck()
}

/**
 * LegacyRedirects emitter — writes redirect stub HTML for CASED legacy v4 URLs
 * verbatim into the output. v5's alias-redirects plugin lowercases alias
 * targets, so cased legacy URLs (e.g. the load-bearing `/NER_2025`, and all
 * `/09-Citations/<camelCase>` paths that v4 actually served) would 404 without
 * this. Stub format mirrors the plugin's redirectHtml.
 */
import fs from "fs"
import path from "path"

function stubHtml(target: string): string {
  // Root-absolute target: correct from any stub depth (a "./x" target would
  // resolve relative to the stub's own folder and break for nested stubs).
  return `<!DOCTYPE html>
<html lang="en-us">
<head>
<title>${target}</title>
<link rel="canonical" href="/${target}">
<meta name="robots" content="noindex">
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=/${target}">
</head>
</html>
`
}

function slugifyStem(name: string): string {
  // Must match Quartz v5's slugifyFilePath for these filenames — note it
  // PRESERVES dots (e.g. "keithl.downing…" stays "keithl.downing…").
  return name
    .normalize("NFKD")
    .replace(/ /g, "-")
    .replace(/'/g, "")
    .replace(/[^A-Za-z0-9_.\-/()]/g, "")
    .toLowerCase()
}

export default function LegacyRedirects() {
  return {
    name: "legacy-redirects",
    async *emit(ctx: any) {
      const out = ctx.argv.output as string
      const contentDir = ctx.argv.directory as string

      const stubs: Array<[string, string]> = [
        ["NER_2025", "research/ner-2025/"],
        ["ner_2025", "research/ner-2025/"],
        // legacy folder pages
        ["01-Blog-Posts/index", "writing/"],
        ["01-blog-posts/index", "writing/"],
        ["09-Citations/index", "wiki/citations/"],
        ["09-citations/index", "wiki/citations/"],
        [
          "01-Blog-Posts/Back-Propagation-without-Calculus",
          "writing/back-propagation-without-calculus/",
        ],
        [
          "01-blog-posts/back-propagation-without-calculus",
          "writing/back-propagation-without-calculus/",
        ],
        [
          "01-Blog-Posts/Neuro-Inspired-Timing-Mechanisms-for-Machine-Learning",
          "writing/neuro-inspired-timing-mechanisms-for-machine-learning/",
        ],
        [
          "01-blog-posts/neuro-inspired-timing-mechanisms-for-machine-learning",
          "writing/neuro-inspired-timing-mechanisms-for-machine-learning/",
        ],
      ]

      const citDir = path.join(contentDir, "wiki", "citations")
      if (fs.existsSync(citDir)) {
        for (const fn of fs.readdirSync(citDir)) {
          if (!fn.endsWith(".md")) continue
          const stem = fn.slice(0, -3)
          const target = `wiki/citations/${slugifyStem(stem)}/`
          stubs.push([`09-Citations/${stem.replace(/ /g, "-")}`, target])
          stubs.push([`09-citations/${slugifyStem(stem)}`, target])
        }
      }

      for (const [stubPath, target] of stubs) {
        const dest = path.join(out, stubPath + ".html")
        await fs.promises.mkdir(path.dirname(dest), { recursive: true })
        await fs.promises.writeFile(dest, stubHtml(target))
        yield dest
      }
    },
    async *partialEmit() {},
  }
}

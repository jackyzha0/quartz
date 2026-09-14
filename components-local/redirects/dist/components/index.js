// components-local/redirects/src/index.ts
import fs from "fs";
import path from "path";
function stubHtml(target) {
  return `<!DOCTYPE html>
<html lang="en-us">
<head>
<title>${target}</title>
<link rel="canonical" href="./${target}">
<meta name="robots" content="noindex">
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=./${target}">
</head>
</html>
`;
}
function slugifyStem(name) {
  return name.normalize("NFKD").replace(/ /g, "-").replace(/'/g, "").replace(/[^A-Za-z0-9_\-/()]/g, "").toLowerCase();
}
function LegacyRedirects() {
  return {
    name: "legacy-redirects",
    async *emit(ctx) {
      const out = ctx.argv.output;
      const contentDir = ctx.argv.directory;
      const stubs = [
        ["NER_2025", "research/ner-2025/"],
        ["ner_2025", "research/ner-2025/"],
        [
          "01-Blog-Posts/Back-Propagation-without-Calculus",
          "writing/back-propagation-without-calculus/"
        ],
        [
          "01-blog-posts/back-propagation-without-calculus",
          "writing/back-propagation-without-calculus/"
        ],
        [
          "01-Blog-Posts/Neuro-Inspired-Timing-Mechanisms-for-Machine-Learning",
          "writing/neuro-inspired-timing-mechanisms-for-machine-learning/"
        ],
        [
          "01-blog-posts/neuro-inspired-timing-mechanisms-for-machine-learning",
          "writing/neuro-inspired-timing-mechanisms-for-machine-learning/"
        ]
      ];
      const citDir = path.join(contentDir, "wiki", "citations");
      if (fs.existsSync(citDir)) {
        for (const fn of fs.readdirSync(citDir)) {
          if (!fn.endsWith(".md")) continue;
          const stem = fn.slice(0, -3);
          const target = `wiki/citations/${slugifyStem(stem)}/`;
          stubs.push([`09-Citations/${stem.replace(/ /g, "-")}`, target]);
          stubs.push([`09-citations/${slugifyStem(stem)}`, target]);
        }
      }
      for (const [stubPath, target] of stubs) {
        const dest = path.join(out, stubPath + ".html");
        await fs.promises.mkdir(path.dirname(dest), { recursive: true });
        await fs.promises.writeFile(dest, stubHtml(target));
        yield dest;
      }
    },
    async *partialEmit() {
    }
  };
}
export {
  LegacyRedirects as default
};

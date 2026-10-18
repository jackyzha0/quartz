import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { AtpAgent, RichText } from "@atproto/api";

const SITE_URL = (process.env.SITE_URL || "").replace(/\/$/, "");
const { MASTODON_URL, MASTODON_TOKEN, BLUESKY_HANDLE, BLUESKY_APP_PASSWORD } = process.env;
if (!SITE_URL) throw new Error("Defina a variável SITE_URL no GitHub.");

// Posts criados ou alterados no último commit
let files = [];
try {
  files = execSync("git diff --name-only --diff-filter=AM HEAD^ HEAD -- content/posts", { encoding: "utf8" })
    .split("\n").filter((f) => f.endsWith(".md"));
} catch {
  files = execSync("git ls-files content/posts", { encoding: "utf8" }).split("\n").filter((f) => f.endsWith(".md"));
}

// Ignora _index.md e outros arquivos que não são posts
files = files.filter((f) => !path.basename(f).startsWith("_"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForSite(url) {
  for (let i = 0; i < 24; i++) { // até ~6 min
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (res.ok) return;
    } catch {}
    await sleep(15000);
  }
  throw new Error(`Site não ficou no ar a tempo: ${url}`);
}

function buildText(title, summary, url, limit) {
  const base = [title, summary].filter(Boolean).join("\n\n");
  const room = limit - url.length - 2;
  const body = base.length > room ? base.slice(0, room - 1).trimEnd() + "…" : base;
  return `${body}\n\n${url}`;
}

async function toMastodon(title, summary, url, slug) {
  if (!MASTODON_URL || !MASTODON_TOKEN) return null;
  const res = await fetch(`${MASTODON_URL.replace(/\/$/, "")}/api/v1/statuses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MASTODON_TOKEN}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `blog-${slug}`,
    },
    body: JSON.stringify({ status: buildText(title, summary, url, 480), visibility: "public", language: "pt" }),
  });
  if (!res.ok) throw new Error(`Mastodon ${res.status}: ${await res.text()}`);
  return true;
}

let bsky;
async function toBluesky(title, summary, url) {
  if (!BLUESKY_HANDLE || !BLUESKY_APP_PASSWORD) return null;
  if (!bsky) {
    bsky = new AtpAgent({ service: "https://bsky.social" });
    await bsky.login({ identifier: BLUESKY_HANDLE, password: BLUESKY_APP_PASSWORD });
  }
  const rt = new RichText({ text: buildText(title, summary, url, 290) });
  await rt.detectFacets(bsky);
  await bsky.post({
    text: rt.text,
    facets: rt.facets,
    langs: ["pt"],
    embed: { $type: "app.bsky.embed.external", external: { uri: url, title, description: summary || "" } },
    createdAt: new Date().toISOString(),
  });
  return true;
}

let failed = false;

for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const { data } = matter(raw);
  if (data.draft === true || data.syndicated === true) continue;

  const slug = path.basename(file, ".md");
  const url = `${SITE_URL}/posts/${slug}/`;
  console.log(`→ ${file}`);

  try {
    await waitForSite(url);
  } catch (e) {
    console.error(e.message); failed = true; continue;
  }

  const results = [];
  for (const [name, fn] of [
    ["Mastodon", () => toMastodon(data.title, data.summary, url, slug)],
    ["Bluesky", () => toBluesky(data.title, data.summary, url)],
  ]) {
    try {
      const ok = await fn();
      if (ok) { console.log(`  ✓ ${name}`); results.push(name); }
    } catch (e) {
      console.error(`  ✗ ${name}: ${e.message}`); failed = true;
    }
  }

  if (results.length) {
    const updated = /^syndicated:.*$/m.test(raw)
      ? raw.replace(/^syndicated:.*$/m, "syndicated: true")
      : raw.replace(/^---\r?\n/, "---\nsyndicated: true\n");
    writeFileSync(file, updated);
  }
}

if (failed) process.exit(1);

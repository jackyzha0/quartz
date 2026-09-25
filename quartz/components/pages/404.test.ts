import assert from "node:assert"
import { readFileSync } from "node:fs"
import test, { describe } from "node:test"
import { runInNewContext } from "node:vm"

type ContentIndex = Readonly<Record<string, Readonly<{ title: string; content: string }>>>

type RandomLink = {
  href: string
  hidden: boolean
}

type ScriptScenario = {
  readonly index: ContentIndex
  readonly basePath: string
  readonly pathname: string
  readonly random: number
}

function readNotFoundScript(): string {
  const source = readFileSync(new URL("./404.tsx", import.meta.url), "utf8")
  const match = source.match(/__html: `([\s\S]*?)`\s*,/)
  assert.ok(match, "404 page should contain an inline browser script")
  return match[1]
}

function runNotFoundScript({ index, basePath, pathname, random }: ScriptScenario): RandomLink {
  const randomLink: RandomLink = { href: basePath || "/", hidden: true }

  runInNewContext(readNotFoundScript(), {
    document: {
      body: { dataset: { basepath: basePath } },
      querySelector: (selector: string) => (selector === "[data-random-note]" ? randomLink : null),
    },
    fetchData: {
      then: (callback: (contentIndex: ContentIndex) => void) => callback(index),
    },
    Math: {
      floor: Math.floor,
      random: () => random,
    },
    window: {
      location: {
        pathname,
        replace: () => undefined,
      },
    },
  })

  return randomLink
}

describe("404 random note recovery", () => {
  test("shows a random published note when eligible notes exist", () => {
    // Given
    const index = {
      index: { title: "Home", content: "" },
      "404": { title: "Not Found", content: "" },
      alpha: { title: "Alpha", content: "Alpha note" },
      beta: { title: "Beta", content: "Beta note" },
      "tags/generated": { title: "Generated tag", content: "" },
    } satisfies ContentIndex

    // When
    const randomLink = runNotFoundScript({
      index,
      basePath: "/garden",
      pathname: "/garden/missing",
      random: 0.99,
    })

    // Then
    assert.equal(randomLink.href, "/garden/beta")
    assert.equal(randomLink.hidden, false)
  })

  test("keeps the home fallback hidden when no eligible note exists", () => {
    // Given
    const index = {
      index: { title: "Home", content: "" },
      "404": { title: "Not Found", content: "" },
    } satisfies ContentIndex

    // When
    const randomLink = runNotFoundScript({ index, basePath: "", pathname: "/missing", random: 0 })

    // Then
    assert.equal(randomLink.href, "/")
    assert.equal(randomLink.hidden, true)
  })

  test("labels the random note link as a wander, not the explorer", () => {
    // Given
    const source = readFileSync(new URL("./404.tsx", import.meta.url), "utf8")

    // Then
    assert.match(source, /components\.randomWander/)
    assert.doesNotMatch(source, /components\.explorer/)
  })
})

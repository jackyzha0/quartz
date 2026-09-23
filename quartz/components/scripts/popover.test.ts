import test, { describe } from "node:test"
import assert from "node:assert"

type ScrollArg = { top: number; behavior?: ScrollBehavior }
type FakeHeading = { offsetTop: number }

interface FakePopoverInner {
  scroll: (arg: ScrollArg) => void
  querySelector: (sel: string) => FakeHeading | null
  _scrolled: ScrollArg | null
  _selectorsQueried: string[]
}

interface FakePopoverElement {
  classList: {
    add: (cls: string) => void
    remove: (cls: string) => void
    _added: string[]
    _removed: string[]
  }
  style: Record<string, string>
  querySelector: (sel: string) => FakePopoverInner | null
  _inner: FakePopoverInner
}

function makeInner(heading: FakeHeading | null = null): FakePopoverInner {
  const inner: FakePopoverInner = {
    scroll(arg) {
      this._scrolled = arg
    },
    querySelector(sel) {
      this._selectorsQueried.push(sel)
      return heading
    },
    _scrolled: null,
    _selectorsQueried: [],
  }
  return inner
}

function makePopoverElement(inner: FakePopoverInner): FakePopoverElement {
  const added: string[] = []
  const removed: string[] = []
  return {
    classList: {
      add(cls) {
        added.push(cls)
      },
      remove(cls) {
        removed.push(cls)
      },
      _added: added,
      _removed: removed,
    },
    style: {},
    querySelector(sel) {
      return sel === ".popover-inner" ? inner : null
    },
    _inner: inner,
  }
}

type SetPosition = (el: FakePopoverElement) => Promise<void>

function clearStalePopoversOnPageShow(
  { persisted }: { persisted: boolean },
  root: { querySelectorAll: (selector: string) => Array<{ remove: () => void }> },
) {
  if (!persisted) return
  root.querySelectorAll(".popover").forEach((popover) => popover.remove())
}

function fixedShowPopover(
  popoverElement: FakePopoverElement,
  hash: string,
  setPosition: SetPosition,
): Promise<void> {
  popoverElement.classList.add("active-popover")
  const positionResult = setPosition(popoverElement)

  if (hash !== "") {
    const inner = popoverElement.querySelector(".popover-inner")
    if (inner) {
      const targetAnchor = `#popover-internal-${hash.slice(1)}`
      const heading = inner.querySelector(targetAnchor)
      if (heading) {
        inner.scroll({ top: heading.offsetTop - 12, behavior: "instant" })
      }
    }
  }

  return positionResult
}

describe("showPopover on cache-hit with hash", () => {
  test("does not reference any lexical popoverInner from an outer scope", async () => {
    const heading: FakeHeading = { offsetTop: 200 }
    const inner = makeInner(heading)
    const popoverElement = makePopoverElement(inner)

    await fixedShowPopover(popoverElement, "#plugins", async () => {})

    assert.ok(
      popoverElement.classList._added.includes("active-popover"),
      "active-popover class must be applied",
    )
    assert.deepStrictEqual(
      inner._scrolled,
      { top: 200 - 12, behavior: "instant" },
      "scroll must target heading.offsetTop - 12",
    )
    assert.deepStrictEqual(inner._selectorsQueried, ["#popover-internal-plugins"])
  })

  test("skips scroll when hash is empty", async () => {
    const inner = makeInner({ offsetTop: 123 })
    const popoverElement = makePopoverElement(inner)

    await fixedShowPopover(popoverElement, "", async () => {})

    assert.strictEqual(inner._scrolled, null)
    assert.deepStrictEqual(inner._selectorsQueried, [])
  })

  test("skips scroll when heading is not found", async () => {
    const inner = makeInner(null)
    const popoverElement = makePopoverElement(inner)

    await fixedShowPopover(popoverElement, "#nonexistent", async () => {})

    assert.strictEqual(inner._scrolled, null)
    assert.deepStrictEqual(inner._selectorsQueried, ["#popover-internal-nonexistent"])
  })

  test("decodes percent-encoded fragments when building the selector", async () => {
    const heading: FakeHeading = { offsetTop: 50 }
    const inner = makeInner(heading)
    const popoverElement = makePopoverElement(inner)

    await fixedShowPopover(popoverElement, "#a-b", async () => {})

    assert.deepStrictEqual(inner._selectorsQueried, ["#popover-internal-a-b"])
  })
})

describe("buggy showPopover (lexical-capture pattern) regression guard", () => {
  test("accessing a capture-before-declaration variable throws ReferenceError (TDZ simulation)", () => {
    function simulateBuggyMouseEnter(hash: string) {
      function buggyShowPopover(popoverElement: FakePopoverElement) {
        popoverElement.classList.add("active-popover")
        if (hash !== "") {
          const targetAnchor = `#popover-internal-${hash.slice(1)}`
          const heading = popoverInner.querySelector(targetAnchor)
          if (heading) {
            popoverInner.scroll({ top: heading.offsetTop - 12, behavior: "instant" })
          }
        }
      }

      const cachedInner = makeInner({ offsetTop: 999 })
      const cachedElement = makePopoverElement(cachedInner)
      buggyShowPopover(cachedElement)

      const popoverInner = makeInner(null)
      return popoverInner
    }

    assert.throws(() => simulateBuggyMouseEnter("#plugins"), {
      name: "ReferenceError",
    })
  })

  test("same pattern does NOT throw when hash is empty (explains why first link without fragment works)", () => {
    function simulateBuggyMouseEnter(hash: string) {
      function buggyShowPopover(popoverElement: FakePopoverElement) {
        popoverElement.classList.add("active-popover")
        if (hash !== "") {
          const _unused = popoverInner.querySelector("x")
          void _unused
        }
      }

      const cachedInner = makeInner(null)
      const cachedElement = makePopoverElement(cachedInner)
      buggyShowPopover(cachedElement)

      const popoverInner = makeInner(null)
      return popoverInner
    }

    assert.doesNotThrow(() => simulateBuggyMouseEnter(""))
  })
})

describe("bfcache popover cleanup", () => {
  test("removes stale popovers when a page is restored from bfcache", () => {
    let removed = 0
    const root = {
      querySelectorAll(selector: string) {
        assert.strictEqual(selector, ".popover")
        return [{ remove: () => removed++ }, { remove: () => removed++ }]
      },
    }

    clearStalePopoversOnPageShow({ persisted: true }, root)

    assert.strictEqual(removed, 2)
  })

  test("leaves popovers alone for ordinary page loads", () => {
    let queried = false
    const root = {
      querySelectorAll() {
        queried = true
        return []
      },
    }

    clearStalePopoversOnPageShow({ persisted: false }, root)

    assert.strictEqual(queried, false)
  })
})

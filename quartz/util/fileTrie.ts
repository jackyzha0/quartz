import type { ContentDetails } from "../plugins/types"
import { FullSlug, joinSegments } from "./path"

interface FileTrieData {
  slug: string
  title: string
  filePath: string
}

export class FileTrieNode<T extends FileTrieData = ContentDetails> {
  isFolder: boolean
  children: Array<FileTrieNode<T>>

  private slugSegments: string[]
  // prefer showing the file path segment over the slug segment
  // so that folders that dont have index files can be shown as is
  // without dashes in the slug
  private fileSegmentHint?: string
  private displayNameOverride?: string
  data: T | null

  constructor(segments: string[], data?: T) {
    this.children = []
    this.slugSegments = segments
    this.data = data ?? null
    this.isFolder = false
    this.displayNameOverride = undefined
  }

  get displayName(): string {
    const nonIndexTitle = this.data?.title === "index" ? undefined : this.data?.title
    return (
      this.displayNameOverride ?? nonIndexTitle ?? this.fileSegmentHint ?? this.slugSegment ?? ""
    )
  }

  set displayName(name: string) {
    this.displayNameOverride = name
  }

  get slug(): FullSlug {
    const path = joinSegments(...this.slugSegments) as FullSlug
    if (this.isFolder) {
      return joinSegments(path, "index") as FullSlug
    }

    return path
  }

  get slugSegment(): string {
    return this.slugSegments[this.slugSegments.length - 1]
  }

  private makeChild(path: string[], file?: T) {
    const fullPath = [...this.slugSegments, path[0]]
    const child = new FileTrieNode<T>(fullPath, file)
    this.children.push(child)
    return child
  }

  private insert(path: string[], file: T) {
    if (path.length === 0) {
      throw new Error("path is empty")
    }

    // if we are inserting, we are a folder
    this.isFolder = true
    const segment = path[0]
    if (path.length === 1) {
      // base case, we are at the end of the path
      if (segment === "index") {
        // Last-insert-wins on collision. Matches the emitter's last-write-wins
        // semantics at plugins/emitters/helpers.ts so the trie's data and the
        // file on disk agree on which source file "owns" a colliding slug.
        // Collision detection happens upstream in build.ts; this assignment is
        // the fallback for any duplicates that still reach the trie.
        this.data = file
      } else {
        this.makeChild(path, file)
      }
    } else if (path.length > 1) {
      // recursive case, we are not at the end of the path
      const child =
        this.children.find((c) => c.slugSegment === segment) ?? this.makeChild(path, undefined)

      const fileParts = file.filePath.split("/")
      child.fileSegmentHint = fileParts.at(-path.length)
      child.insert(path.slice(1), file)
    }
  }

  // Add new file to trie
  /**
   * Add a page at `position` (its slug by default). The build passes the page's slugified file
   * path, so a note with a permalink stays in its folder for navigation (explorer, folder pages,
   * breadcrumbs) while `data.slug` — what links point at — is its permalink.
   */
  add(file: T, position: string = file.slug) {
    this.insert(position.split("/"), file)
  }

  findNode(path: string[]): FileTrieNode<T> | undefined {
    if (path.length === 0 || (path.length === 1 && path[0] === "index")) {
      return this
    }

    return this.children.find((c) => c.slugSegment === path[0])?.findNode(path.slice(1))
  }

  ancestryChain(path: string[]): Array<FileTrieNode<T>> | undefined {
    if (path.length === 0 || (path.length === 1 && path[0] === "index")) {
      return [this]
    }

    const child = this.children.find((c) => c.slugSegment === path[0])
    if (!child) {
      return undefined
    }

    const childPath = child.ancestryChain(path.slice(1))
    if (!childPath) {
      return undefined
    }

    return [this, ...childPath]
  }

  /**
   * Filter trie nodes. Behaves similar to `Array.prototype.filter()`, but modifies tree in place
   */
  filter(filterFn: (node: FileTrieNode<T>) => boolean) {
    this.children = this.children.filter(filterFn)
    this.children.forEach((child) => child.filter(filterFn))
  }

  /**
   * Map over trie nodes. Behaves similar to `Array.prototype.map()`, but modifies tree in place
   */
  map(mapFn: (node: FileTrieNode<T>) => void) {
    mapFn(this)
    this.children.forEach((child) => child.map(mapFn))
  }

  /**
   * Sort trie nodes according to sort/compare function
   */
  sort(sortFn: (a: FileTrieNode<T>, b: FileTrieNode<T>) => number) {
    this.children = this.children.sort(sortFn)
    this.children.forEach((e) => e.sort(sortFn))
  }

  static fromEntries<T extends FileTrieData>(entries: [FullSlug, T][]) {
    const trie = new FileTrieNode<T>([])
    entries.forEach(([, entry]) => trie.add(entry))
    return trie
  }

  /**
   * Get all entries in the trie
   * in the a flat array including the full path and the node
   */
  entries(): [FullSlug, FileTrieNode<T>][] {
    const traverse = (node: FileTrieNode<T>): [FullSlug, FileTrieNode<T>][] => {
      const result: [FullSlug, FileTrieNode<T>][] = [[node.slug, node]]
      return result.concat(...node.children.map(traverse))
    }

    return traverse(this)
  }

  /**
   * Get all folder paths in the trie
   * @returns array containing folder state for trie
   */
  getFolderPaths() {
    return this.entries()
      .filter(([_, node]) => node.isFolder)
      .map(([path, _]) => path)
  }
}

export declare global {
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K] | UIEvent): void
  }
  /** A page fetched ahead by prefetch.inline.ts (`url` is where it came from, after redirects). */
  interface PrefetchedPage {
    url: string
    contentType: string
    /** The HTML; missing when the link turned out not to be a page. */
    text?: string
  }
  interface Window {
    spaNavigate(url: URL, isBack: boolean = false)
    addCleanup(fn: (...args: any[]) => void)
    /**
     * Set when prefetching is on: the page at `url` from the prefetch cache, or fetched now and
     * kept (undefined if it could not be fetched).
     */
    quartzPrefetch?: {
      load(url: URL): Promise<PrefetchedPage | undefined>
    }
    /** Absolute URL of the site's static/ folder (renderPage.tsx) */
    quartzStaticUrl?: string
    /** Prefetch settings, written by componentResources.ts ahead of prefetch.inline.ts */
    __quartzPrefetchMode?: "viewport" | "hover"
    __quartzSpa?: boolean
  }
}

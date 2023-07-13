declare module '*.scss' {
  const content: string
  export = content
}

// dom custom event
interface CustomEventMap {
  "nav": CustomEvent<{ url: CanonicalSlug }>;
}

declare const fetchData: Promise<ContentIndex>

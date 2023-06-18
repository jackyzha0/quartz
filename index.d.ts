declare module '*.scss' {
  const content: string
  export = content
}

// dom custom event
interface CustomEventMap {
  "nav": CustomEvent<{ url: string }>;
}

declare const fetchData: Promise<ContentIndex>

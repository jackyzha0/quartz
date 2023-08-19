declare module "*.scss" {
  const content: string
  export = content
}

// dom custom event
interface CustomEventMap {
  nav: CustomEvent<{ url: FullSlug }>
}

declare const fetchData: Promise<ContentIndex>

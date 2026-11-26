declare module "*.scss" {
  const content: string
  export = content
}

// micromorph ships these types, but its package.json "exports" don't list them, so TypeScript's
// "bundler" resolution doesn't find them
declare module "micromorph" {
  export default function micromorph(from: Node, to: Node): Promise<void>
}

// dom custom event
interface CustomEventMap {
  prenav: CustomEvent<{}>
  nav: CustomEvent<{ url: FullSlug }>
  themechange: CustomEvent<{ theme: "light" | "dark" }>
  readermodechange: CustomEvent<{ mode: "on" | "off" }>
  render: CustomEvent<{}>
}

type ContentIndex = Record<FullSlug, ContentDetails>
declare const fetchData: Promise<ContentIndex>

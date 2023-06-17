declare module '*.scss' {
  const content: string
  export = content
}

// dom custom event
interface CustomEventMap {
  "spa_nav": CustomEvent<{ url: string }>;
}

declare global {
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
}

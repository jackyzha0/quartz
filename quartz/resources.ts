export interface JSResource {
  src: string
  loadTime: 'beforeDOMReady' | 'afterDOMReady'
}

export interface StaticResources {
  css: string[],
  js: JSResource[]
}

export interface JSResource {
  src: string
  loadTime: 'beforeDOMReady' | 'afterDOMReady'
  type?: 'module'
}

export interface StaticResources {
  css: string[],
  js: JSResource[]
}

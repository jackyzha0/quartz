export { TextEncoder, TextDecoder, ReadableStream } from "./package.js"
// import { Blob as NodeBlob } from "./blob.node.js"
import { Blob as WebBlob } from "./blob.js"

/** @type {typeof globalThis.Blob} */
// Our first choise is to use global `Blob` because it may be available e.g. in
// electron renderrer process. If not available fall back to node native
// implementation, if also not available use our implementation.
export const Blob =
  globalThis.Blob || 
  // Disable node native blob until impractical perf issue is fixed
  // @see https://github.com/nodejs/node/issues/42108
  // NodeBlob ||
  WebBlob

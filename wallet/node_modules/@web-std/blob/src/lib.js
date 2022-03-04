export { TextEncoder, TextDecoder, ReadableStream } from "./package.js"

// On the web we just export native Blob implementation
export const { Blob } = globalThis

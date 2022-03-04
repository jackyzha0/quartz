// In node `export { TextEncoder }` throws:
// "Export 'TextEncoder' is not defined in module"
// To workaround we first define constants and then export with as.
const Encoder = TextEncoder
const Decoder = TextDecoder

export { Encoder as TextEncoder, Decoder as TextDecoder }

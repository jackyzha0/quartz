import { TextEncoder, TextDecoder } from "web-encoding"

export const encode = (text:string):Uint8Array =>
  new TextEncoder().encode(text)

export const decode = (bytes:Uint8Array):string =>
  new TextDecoder().decode(bytes)

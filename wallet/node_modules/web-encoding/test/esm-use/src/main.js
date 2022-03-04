// @ts-check

import { TextEncoder, TextDecoder } from "web-encoding"

/**
 * @param {string} text
 * @returns {Uint8Array}
 */
export const encode = (text) =>
  new TextEncoder().encode(text)

/**
 * @param {Uint8Array} bytes
 * @returns {string}
 */
export const decode = (bytes) =>
  new TextDecoder().decode(bytes)

// @ts-check

const { TextEncoder, TextDecoder } = require("web-encoding")

/**
 * @param {string} text
 * @returns {Uint8Array}
 */
const encode = (text) =>
  new TextEncoder().encode(text)

/**
 * @param {Uint8Array} bytes
 * @returns {string}
 */
const decode = (bytes) =>
  new TextDecoder().decode(bytes)

module.exports = { encode, decode }

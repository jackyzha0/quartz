import * as builtin from "buffer"

/**
 * @returns {typeof globalThis.Blob|null}
 */
const use = () => {
  try {
    // @ts-ignore
    const { Blob } = builtin
    const view = new Uint16Array(1)
    // Checks if critical issue with node implementation of Blob is fixed
    // @see https://github.com/nodejs/node/issues/40705
    const isBugFixed = new Blob([view]).size === view.byteLength
    return isBugFixed ? Blob : null
  } catch (error) {
    return null
  }
}

export const Blob = use()

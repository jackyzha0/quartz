import { ReadableStream, TextEncoder, TextDecoder } from "./package.js"

/**
 * @implements {globalThis.Blob}
 */
const WebBlob = class Blob {
  /**
   * @param {BlobPart[]} [init]
   * @param {BlobPropertyBag} [options]
   */
  constructor(init = [], options = {}) {
    /** @type {Uint8Array[]} */
    const parts = []

    let size = 0
    for (const part of init) {
      if (typeof part === "string") {
        const bytes = new TextEncoder().encode(part)
        parts.push(bytes)
        size += bytes.byteLength
      } else if (part instanceof WebBlob) {
        size += part.size
        // @ts-ignore - `_parts` is marked private so TS will complain about
        // accessing it.
        parts.push(...part._parts)
      } else if (part instanceof ArrayBuffer) {
        parts.push(new Uint8Array(part))
        size += part.byteLength
      } else if (part instanceof Uint8Array) {
        parts.push(part)
        size += part.byteLength
      } else if (ArrayBuffer.isView(part)) {
        const { buffer, byteOffset, byteLength } = part
        parts.push(new Uint8Array(buffer, byteOffset, byteLength))
        size += byteLength
      } else {
        const bytes = new TextEncoder().encode(String(part))
        parts.push(bytes)
        size += bytes.byteLength
      }
    }

    /** @private */
    this._size = size
    /** @private */
    this._type = readType(options.type)
    /** @private */
    this._parts = parts

    Object.defineProperties(this, {
      _size: { enumerable: false },
      _type: { enumerable: false },
      _parts: { enumerable: false },
    })
  }

  /**
   * A string indicating the MIME type of the data contained in the Blob.
   * If the type is unknown, this string is empty.
   * @type {string}
   */
  get type() {
    return this._type
  }
  /**
   * The size, in bytes, of the data contained in the Blob object.
   * @type {number}
   */
  get size() {
    return this._size
  }

  /**
   * Returns a new Blob object containing the data in the specified range of
   * bytes of the blob on which it's called.
   * @param {number} [start=0] - An index into the Blob indicating the first
   * byte to include in the new Blob. If you specify a negative value, it's
   * treated as an offset from the end of the Blob toward the beginning. For
   * example, `-10` would be the 10th from last byte in the Blob. The default
   * value is `0`. If you specify a value for start that is larger than the
   * size of the source Blob, the returned Blob has size 0 and contains no
   * data.
   * @param {number} [end] - An index into the `Blob` indicating the first byte
   *  that will *not* be included in the new `Blob` (i.e. the byte exactly at
   * this index is not included). If you specify a negative value, it's treated
   * as an offset from the end of the Blob toward the beginning. For example,
   * `-10` would be the 10th from last byte in the `Blob`. The default value is
   * size.
   * @param {string} [type] - The content type to assign to the new Blob;
   * this will be the value of its type property. The default value is an empty
   * string.
   * @returns {Blob}
   */
  slice(start = 0, end = this.size, type = "") {
    const { size, _parts } = this
    let offset = start < 0 ? Math.max(size + start, 0) : Math.min(start, size)

    let limit = end < 0 ? Math.max(size + end, 0) : Math.min(end, size)
    const span = Math.max(limit - offset, 0)
    const blob = new Blob([], { type })

    if (span === 0) {
      return blob
    }

    let blobSize = 0
    const blobParts = []
    for (const part of _parts) {
      const { byteLength } = part
      if (offset > 0 && byteLength <= offset) {
        offset -= byteLength
        limit -= byteLength
      } else {
        const chunk = part.subarray(offset, Math.min(byteLength, limit))
        blobParts.push(chunk)
        blobSize += chunk.byteLength
        // no longer need to take that into account
        offset = 0

        // don't add the overflow to new blobParts
        if (blobSize >= span) {
          break
        }
      }
    }

    blob._parts = blobParts
    blob._size = blobSize

    return blob
  }

  /**
   * Returns a promise that resolves with an ArrayBuffer containing the entire
   * contents of the Blob as binary data.
   * @returns {Promise<ArrayBuffer>}
   */
  // eslint-disable-next-line require-await
  async arrayBuffer() {
    const buffer = new ArrayBuffer(this.size)
    const bytes = new Uint8Array(buffer)
    let offset = 0
    for (const part of this._parts) {
      bytes.set(part, offset)
      offset += part.byteLength
    }
    return buffer
  }

  /**
   * Returns a promise that resolves with a USVString containing the entire
   * contents of the Blob interpreted as UTF-8 text.
   * @returns {Promise<string>}
   */
  // eslint-disable-next-line require-await
  async text() {
    const decoder = new TextDecoder()
    let text = ""
    for (const part of this._parts) {
      text += decoder.decode(part)
    }
    return text
  }

  /**
   * @returns {BlobStream}
   */
  stream() {
    return new BlobStream(this._parts)
  }

  /**
   * @returns {string}
   */
  toString() {
    return "[object Blob]"
  }

  get [Symbol.toStringTag]() {
    return "Blob"
  }
}

// Marking export as a DOM File object instead of custom class.
/** @type {typeof globalThis.Blob} */
const Blob = WebBlob

/**
 * Blob stream is a `ReadableStream` extension optimized to have minimal
 * overhead when consumed as `AsyncIterable<Uint8Array>`.
 * @extends {ReadableStream<Uint8Array>}
 * @implements {AsyncIterable<Uint8Array>}
 */
class BlobStream extends ReadableStream {
  /**
   * @param {Uint8Array[]} chunks
   */
  constructor(chunks) {
    // @ts-ignore
    super(new BlobStreamController(chunks.values()), { type: "bytes" })
    /** @private */
    this._chunks = chunks
  }

  /**
   * @param {Object} [_options]
   * @property {boolean} [_options.preventCancel]
   * @returns {AsyncIterator<Uint8Array>}
   */
  async *[Symbol.asyncIterator](_options) {
    const reader = this.getReader()
    yield* this._chunks
    reader.releaseLock()
  }
}

class BlobStreamController {
  /**
   * @param {Iterator<Uint8Array>} chunks
   */
  constructor(chunks) {
    this.chunks = chunks
  }

  /**
   * @param {ReadableStreamDefaultController} controller
   */
  start(controller) {
    this.work(controller)
    this.isWorking = false
    this.isCancelled = false
  }
  /**
   *
   * @param {ReadableStreamDefaultController} controller
   */
  async work(controller) {
    const { chunks } = this

    this.isWorking = true
    while (!this.isCancelled && (controller.desiredSize || 0) > 0) {
      let next = null
      try {
        next = chunks.next()
      } catch (error) {
        controller.error(error)
        break
      }

      if (next) {
        if (!next.done && !this.isCancelled) {
          controller.enqueue(next.value)
        } else {
          controller.close()
        }
      }
    }

    this.isWorking = false
  }

  /**
   * @param {ReadableStreamDefaultController} controller
   */
  pull(controller) {
    if (!this.isWorking) {
      this.work(controller)
    }
  }
  cancel() {
    this.isCancelled = true
  }
}

/**
 * @param {string} [input]
 * @returns {string}
 */
const readType = (input = "") => {
  const type = String(input).toLowerCase()
  return /[^\u0020-\u007E]/.test(type) ? "" : type
}

export { Blob, ReadableStream, TextEncoder, TextDecoder }

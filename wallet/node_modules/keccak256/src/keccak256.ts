import BN from 'bn.js'
import buffer from 'buffer'
import createKeccakHash from 'keccak'

const Buffer = buffer.Buffer

function keccak256 (value: Buffer | BN | string | number) {
  value = toBuffer(value)
  return createKeccakHash('keccak256').update(value as Buffer).digest()
}

function toBuffer (value: any) {
  if (!Buffer.isBuffer(value)) {
    if (Array.isArray(value)) {
      value = Buffer.from(value)
    } else if (typeof value === 'string') {
      if (isHexString(value)) {
        value = Buffer.from(padToEven(stripHexPrefix(value)), 'hex')
      } else {
        value = Buffer.from(value)
      }
    } else if (typeof value === 'number') {
      value = intToBuffer(value)
    } else if (value === null || value === undefined) {
      value = Buffer.allocUnsafe(0)
    } else if (BN.isBN(value)) {
      value = value.toArrayLike(Buffer)
    } else if (value.toArray) {
      // converts a BN to a Buffer
      value = Buffer.from(value.toArray())
    } else {
      throw new Error('invalid type')
    }
  }

  return value
}

function isHexString (value: any, length?: number) {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  if (length && value.length !== 2 + 2 * length) {
    return false
  }

  return true
}

function padToEven (value: any) {
  if (typeof value !== 'string') {
    throw new Error(`while padding to even, value must be string, is currently ${typeof value}, while padToEven.`)
  }

  if (value.length % 2) {
    value = `0${value}`
  }

  return value
}

function stripHexPrefix (value: any) {
  if (typeof value !== 'string') {
    return value
  }

  return isHexPrefixed(value) ? value.slice(2) : value
}

function isHexPrefixed (value: any) {
  if (typeof value !== 'string') {
    throw new Error("value must be type 'string', is currently type " + (typeof value) + ', while checking isHexPrefixed.')
  }

  return value.slice(0, 2) === '0x'
}

function intToBuffer (i: number) {
  const hex = intToHex(i)
  return Buffer.from(padToEven(hex.slice(2)), 'hex')
}

function intToHex (i: number) {
  const hex = i.toString(16)
  return `0x${hex}`
}

if (typeof window !== 'undefined') {
  (window as any).keccak256 = keccak256
}

export = keccak256

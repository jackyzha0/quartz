"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bn_js_1 = __importDefault(require("bn.js"));
const buffer_1 = __importDefault(require("buffer"));
const keccak_1 = __importDefault(require("keccak"));
const Buffer = buffer_1.default.Buffer;
function keccak256(value) {
    value = toBuffer(value);
    return (0, keccak_1.default)('keccak256').update(value).digest();
}
function toBuffer(value) {
    if (!Buffer.isBuffer(value)) {
        if (Array.isArray(value)) {
            value = Buffer.from(value);
        }
        else if (typeof value === 'string') {
            if (isHexString(value)) {
                value = Buffer.from(padToEven(stripHexPrefix(value)), 'hex');
            }
            else {
                value = Buffer.from(value);
            }
        }
        else if (typeof value === 'number') {
            value = intToBuffer(value);
        }
        else if (value === null || value === undefined) {
            value = Buffer.allocUnsafe(0);
        }
        else if (bn_js_1.default.isBN(value)) {
            value = value.toArrayLike(Buffer);
        }
        else if (value.toArray) {
            // converts a BN to a Buffer
            value = Buffer.from(value.toArray());
        }
        else {
            throw new Error('invalid type');
        }
    }
    return value;
}
function isHexString(value, length) {
    if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}
function padToEven(value) {
    if (typeof value !== 'string') {
        throw new Error(`while padding to even, value must be string, is currently ${typeof value}, while padToEven.`);
    }
    if (value.length % 2) {
        value = `0${value}`;
    }
    return value;
}
function stripHexPrefix(value) {
    if (typeof value !== 'string') {
        return value;
    }
    return isHexPrefixed(value) ? value.slice(2) : value;
}
function isHexPrefixed(value) {
    if (typeof value !== 'string') {
        throw new Error("value must be type 'string', is currently type " + (typeof value) + ', while checking isHexPrefixed.');
    }
    return value.slice(0, 2) === '0x';
}
function intToBuffer(i) {
    const hex = intToHex(i);
    return Buffer.from(padToEven(hex.slice(2)), 'hex');
}
function intToHex(i) {
    const hex = i.toString(16);
    return `0x${hex}`;
}
if (typeof window !== 'undefined') {
    window.keccak256 = keccak256;
}
module.exports = keccak256;

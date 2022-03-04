const A = require("./array.js");

const at = (bytes, index) => parseInt(bytes.slice(index * 2 + 2, index * 2 + 4), 16);

const random = bytes => {
  let rnd;
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) rnd = window.crypto.getRandomValues(new Uint8Array(bytes));else if (typeof require !== "undefined") rnd = require("c" + "rypto").randomBytes(bytes);else throw "Safe random numbers not available.";
  let hex = "0x";
  for (let i = 0; i < bytes; ++i) hex += ("00" + rnd[i].toString(16)).slice(-2);
  return hex;
};

const length = a => (a.length - 2) / 2;

const flatten = a => "0x" + a.reduce((r, s) => r + s.slice(2), "");

const slice = (i, j, bs) => "0x" + bs.slice(i * 2 + 2, j * 2 + 2);

const reverse = hex => {
  let rev = "0x";
  for (let i = 0, l = length(hex); i < l; ++i) {
    rev += hex.slice((l - i) * 2, (l - i + 1) * 2);
  }
  return rev;
};

const pad = (l, hex) => hex.length === l * 2 + 2 ? hex : pad(l, "0x" + "0" + hex.slice(2));

const padRight = (l, hex) => hex.length === l * 2 + 2 ? hex : padRight(l, hex + "0");

const toArray = hex => {
  let arr = [];
  for (let i = 2, l = hex.length; i < l; i += 2) arr.push(parseInt(hex.slice(i, i + 2), 16));
  return arr;
};

const fromArray = arr => {
  let hex = "0x";
  for (let i = 0, l = arr.length; i < l; ++i) {
    let b = arr[i];
    hex += (b < 16 ? "0" : "") + b.toString(16);
  }
  return hex;
};

const toUint8Array = hex => new Uint8Array(toArray(hex));

const fromUint8Array = arr => fromArray([].slice.call(arr, 0));

const fromNumber = num => {
  let hex = num.toString(16);
  return hex.length % 2 === 0 ? "0x" + hex : "0x0" + hex;
};

const toNumber = hex => parseInt(hex.slice(2), 16);

const concat = (a, b) => a.concat(b.slice(2));

const fromNat = bn => bn === "0x0" ? "0x" : bn.length % 2 === 0 ? bn : "0x0" + bn.slice(2);

const toNat = bn => bn[2] === "0" ? "0x" + bn.slice(3) : bn;

const fromAscii = ascii => {
  let hex = "0x";
  for (let i = 0; i < ascii.length; ++i) hex += ("00" + ascii.charCodeAt(i).toString(16)).slice(-2);
  return hex;
};

const toAscii = hex => {
  let ascii = "";
  for (let i = 2; i < hex.length; i += 2) ascii += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
  return ascii;
};

// From https://gist.github.com/pascaldekloe/62546103a1576803dade9269ccf76330
const fromString = s => {
  const makeByte = uint8 => {
    const b = uint8.toString(16);
    return b.length < 2 ? "0" + b : b;
  };
  let bytes = "0x";
  for (let ci = 0; ci != s.length; ci++) {
    let c = s.charCodeAt(ci);
    if (c < 128) {
      bytes += makeByte(c);
      continue;
    }
    if (c < 2048) {
      bytes += makeByte(c >> 6 | 192);
    } else {
      if (c > 0xd7ff && c < 0xdc00) {
        if (++ci == s.length) return null;
        let c2 = s.charCodeAt(ci);
        if (c2 < 0xdc00 || c2 > 0xdfff) return null;
        c = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
        bytes += makeByte(c >> 18 | 240);
        bytes += makeByte(c >> 12 & 63 | 128);
      } else {
        // c <= 0xffff
        bytes += makeByte(c >> 12 | 224);
      }
      bytes += makeByte(c >> 6 & 63 | 128);
    }
    bytes += makeByte(c & 63 | 128);
  }
  return bytes;
};

const toString = bytes => {
  let s = '';
  let i = 0;
  let l = length(bytes);
  while (i < l) {
    let c = at(bytes, i++);
    if (c > 127) {
      if (c > 191 && c < 224) {
        if (i >= l) return null;
        c = (c & 31) << 6 | at(bytes, i) & 63;
      } else if (c > 223 && c < 240) {
        if (i + 1 >= l) return null;
        c = (c & 15) << 12 | (at(bytes, i) & 63) << 6 | at(bytes, ++i) & 63;
      } else if (c > 239 && c < 248) {
        if (i + 2 >= l) return null;
        c = (c & 7) << 18 | (at(bytes, i) & 63) << 12 | (at(bytes, ++i) & 63) << 6 | at(bytes, ++i) & 63;
      } else return null;
      ++i;
    }
    if (c <= 0xffff) s += String.fromCharCode(c);else if (c <= 0x10ffff) {
      c -= 0x10000;
      s += String.fromCharCode(c >> 10 | 0xd800);
      s += String.fromCharCode(c & 0x3FF | 0xdc00);
    } else return null;
  }
  return s;
};

module.exports = {
  random,
  length,
  concat,
  flatten,
  slice,
  reverse,
  pad,
  padRight,
  fromAscii,
  toAscii,
  fromString,
  toString,
  fromNumber,
  toNumber,
  fromNat,
  toNat,
  fromArray,
  toArray,
  fromUint8Array,
  toUint8Array
};
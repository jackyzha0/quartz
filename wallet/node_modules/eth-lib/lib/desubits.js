const Bytes = require("./bytes");

const inis = "pbtdkgxjfvlrmnsz".split("");

const mids = "auie".split("");

const back = [inis, mids].map(chars => {
  let map = {};
  for (let i = 0; i < chars.length; ++i) map[chars[i]] = i;
  return map;
});

const syllableFromB64 = b64 => {
  const ini = b64 >>> 2 & 15;
  const mid = b64 >>> 0 & 3;
  return inis[ini] + mids[mid];
};

const syllableToB64 = syllable => {
  const ini = back[0][syllable[0]];
  const mid = back[1][syllable[1]];
  return ini * 4 + mid;
};

const b64sFromBytes = bytes => {
  //BoooooBoooooBoooooBooooo
  //BoooooooBoooooooBooooooo
  let b64s = [],
      b64;
  for (let i = 0, l = Math.ceil(bytes.length * 8 / 6); i < l; ++i) {
    let j = i / 8 * 6 | 0;
    b64s.push(i % 4 === 0 ? bytes[j + 0] / 4 | 0 : i % 4 === 1 ? bytes[j + 0] % 4 * 16 + (bytes[j + 1] / 16 | 0) : i % 4 === 2 ? bytes[j + 0] % 16 * 4 + (bytes[j + 1] / 64 | 0) : bytes[j + 0] % 64 * 1);
  }
  return b64s;
};

const b64sToBytes = b64s => {
  let bytes = [];
  for (let i = 0, l = Math.floor(b64s.length * 6 / 8); i < l; ++i) {
    let j = i / 6 * 8 | 0;
    bytes.push(i % 3 === 0 ? b64s[j + 0] % 64 * 4 + (b64s[j + 1] / 16 | 0) : i % 3 === 1 ? b64s[j + 0] % 16 * 16 + (b64s[j + 1] / 4 | 0) : b64s[j + 0] % 4 * 64 + (b64s[j + 1] / 1 | 0));
  }
  return bytes;
};

const fromBytes = bytes => b64sFromBytes(Bytes.toArray(bytes)).map(syllableFromB64).join("");

const toBytes = syllables => Bytes.fromArray(b64sToBytes(syllables.match(/\w\w/g).map(syllableToB64)));

module.exports = {
  fromBytes,
  toBytes
};
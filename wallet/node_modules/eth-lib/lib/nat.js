const BN = require("bn.js");
const Bytes = require("./bytes");

const fromBN = bn => "0x" + bn.toString("hex");

const toBN = str => new BN(str.slice(2), 16);

const fromString = str => {
  const bn = "0x" + (str.slice(0, 2) === "0x" ? new BN(str.slice(2), 16) : new BN(str, 10)).toString("hex");
  return bn === "0x0" ? "0x" : bn;
};

const toEther = wei => toNumber(div(wei, fromString("10000000000"))) / 100000000;

const fromEther = eth => mul(fromNumber(Math.floor(eth * 100000000)), fromString("10000000000"));

const toString = a => toBN(a).toString(10);

const fromNumber = a => typeof a === "string" ? /^0x/.test(a) ? a : "0x" + a : "0x" + new BN(a).toString("hex");

const toNumber = a => toBN(a).toNumber();

const toUint256 = a => Bytes.pad(32, a);

const bin = method => (a, b) => fromBN(toBN(a)[method](toBN(b)));

const add = bin("add");
const mul = bin("mul");
const div = bin("div");
const sub = bin("sub");

module.exports = {
  toString,
  fromString,
  toNumber,
  fromNumber,
  toEther,
  fromEther,
  toUint256,
  add,
  mul,
  div,
  sub
};
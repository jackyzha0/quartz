// type Var = {
//   name: String
//   type: "uint256" | "bytes32" | ...
// }
//
// type Method = {
//   name: String
//   inputs: [Var]
//   output: [Var]
//   constant: Bool
//   payable: Bool
// }

const Bytes = require("./bytes");
const Nat = require("./nat");
const keccak256s = require("./hash").keccak256s;

// (type : String), JSType(type) -> {data: Bytes, dynamic: Bool}
//   ABI-encodes a single term.
const encode = (type, value) => {
  if (type === "bytes") {
    const length = Bytes.length(value);
    const nextMul32 = (((length - 1) / 32 | 0) + 1) * 32;
    const lengthEncoded = encode("uint256", Nat.fromNumber(length)).data;
    const bytesEncoded = Bytes.padRight(nextMul32, value);
    return {data: Bytes.concat(lengthEncoded, bytesEncoded), dynamic: true};
  } else if (type === "uint256" || type === "bytes32" || type === "address") {
    return {data: Bytes.pad(32, value), dynamic: false};
  } else {
    throw "Eth-lib can't encode ABI type " + type + " yet.";
  }
}

// (method : Method), [JSType(method.inputs[i].type)] -> Bytes
//   ABI-encodes the transaction data to call a method.
const methodData = (method, params) => {
  const methodSig = method.name + "(" + method.inputs.map(i => i.type).join(",") + ")";
  const methodHash = keccak256s(methodSig).slice(0,10);
  let encodedParams = params.map((param,i) => encode(method.inputs[i].type, param));
  var headBlock = "0x";
  let dataBlock = "0x";
  for (var i = 0; i < encodedParams.length; ++i) {
    if (encodedParams[i].dynamic) {
      var dataLoc = encodedParams.length * 32 + Bytes.length(dataBlock);
      headBlock = Bytes.concat(headBlock, Bytes.pad(32, Nat.fromNumber(dataLoc)));
      dataBlock = Bytes.concat(dataBlock, encodedParams[i].data);
    } else {
      headBlock = Bytes.concat(headBlock, encodedParams[i].data);
    }
  }
  return Bytes.flatten([methodHash, headBlock, dataBlock]);
};

module.exports = {
  encode,
  methodData
};

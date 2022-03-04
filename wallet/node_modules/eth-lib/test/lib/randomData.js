// () ~> HexString
const hexString = () => {
  let str = "";
  while (Math.random() < 0.95)
    str = str + ("00" + (Math.random() * 256 | 0).toString(16)).slice(-2);
  return "0x" + str;
}

// () ~> DataTree
const dataTree = () => {
  let list = [];
  while (Math.random() < 0.8) {
    if (Math.random() < 0.8)
      list.push(hexString());
    else
      list.push(dataTree());
  }
  return list;
}

module.exports = {
  hexString,
  dataTree
}

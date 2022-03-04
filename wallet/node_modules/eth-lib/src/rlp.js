// The RLP format
// Serialization and deserialization for the BytesTree type, under the following grammar:
// | First byte | Meaning                                                                    |
// | ---------- | -------------------------------------------------------------------------- |
// | 0   to 127 | HEX(leaf)                                                                  |
// | 128 to 183 | HEX(length_of_leaf + 128) + HEX(leaf)                                      |
// | 184 to 191 | HEX(length_of_length_of_leaf + 128 + 55) + HEX(length_of_leaf) + HEX(leaf) |
// | 192 to 247 | HEX(length_of_node + 192) + HEX(node)                                      |
// | 248 to 255 | HEX(length_of_length_of_node + 128 + 55) + HEX(length_of_node) + HEX(node) |

const encode = tree => {
  const padEven = str =>
    str.length % 2 === 0 ? str : "0" + str;

  const uint = num =>
    padEven(num.toString(16))

  const length = (len, add) =>
    len < 56 ? uint(add + len) : uint(add + uint(len).length / 2 + 55) + uint(len);

  const dataTree = tree => {
    if (typeof tree === "string") {
      const hex = tree.slice(2);
      const pre = hex.length != 2 || hex >= "80" ? length(hex.length / 2, 128) : "";
      return pre + hex;
    } else {
      const hex = tree.map(dataTree).join("");
      const pre = length(hex.length / 2, 192)
      return pre + hex;
    }
  }

  return "0x" + dataTree(tree);
};

const decode = hex => {
  let i = 2;

  const parseTree = () => {
    if (i >= hex.length) throw "";
    const head = hex.slice(i,i+2);
    return head < "80" ? (i+=2, "0x" + head)
        : head < "c0" ? parseHex()
        : parseList();
  }

  const parseLength = () => {
    const len = parseInt(hex.slice(i,i+=2), 16) % 64;
    return len < 56 ? len : parseInt(hex.slice(i, i += (len - 55) * 2), 16);
  }

  const parseHex = () => {
    const len = parseLength();
    return "0x" + hex.slice(i, i += len * 2);
  }

  const parseList = () => {
    const lim = parseLength() * 2 + i;
    let list = [];
    while (i < lim)
      list.push(parseTree());
    return list;
  }

  try {
    return parseTree();
  } catch (e) {
    return [];
  }
};

module.exports = {encode, decode};

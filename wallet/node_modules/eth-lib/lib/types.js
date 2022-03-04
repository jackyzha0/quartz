var F = require("forall");
var A = require("./array");
var B = require("./bytes");
var Account = require("./account");

F.Bytes = F(F.Type, {
  form: "a JavaScript String starting with a `0x`, followed by an even number of low-case hex chars (i.e., `0123456789abcdef`)",
  rand: function rand() {
    return "0x" + A.generate((Math.random() * 16 | 0) * 2, function () {
      return (Math.random() * 16 | 0).toString(16);
    }).join("");
  },
  test: function test(value) {
    return typeof value === "string" && /^0x([0-9a-f][0-9a-f])*$/.test(value);
  }
}).__name("Bytes").__desc("any arbitrary data");

F.NBytes = function (bytes) {
  return F(F.Type, {
    form: "a JavaScript String starting with a `0x`, followed by " + bytes * 2 + " low-case hex chars (i.e., `0123456789abcdef`)",
    test: function test(value) {
      return F.Bytes.test(value) && value.length === bytes * 2 + 2;
    },
    rand: function rand() {
      return "0x" + A.generate(bytes * 2, function () {
        return (Math.random() * 16 | 0).toString(16);
      }).join("");
    }
  }).__name("NBytes(" + bytes + ")").__desc("any arbitrary data of exactly " + bytes + "-byte" + (bytes > 1 ? "s" : ""));
};

F.Nat = F(F.Type, {
  form: "a JavaScript String starting with a `0x`, followed by at least one low-case hex char different from 0, followed by any number of low-case hex chars (i.e., `0123456789abcdef`)",
  test: function test(value) {
    return typeof value === "string" && /^0x[1-9a-f]([0-9a-f])*$/.test(value);
  },
  rand: function rand() {
    return "0x" + (Math.random() * Math.pow(2, 50) | 0).toString(16);
  }
}).__name("Nat").__desc("an arbitrarily long non-negative integer number");

F.Address = F(F.Type, {
  form: "a JavaScript String starting with a `0x`, followed by 40 hex chars (i.e., `0123456789abcdefABCDEF`), with the nth hex being uppercase iff the nth hex of the keccak256 of the lowercase address in ASCII is > 7",
  test: function test(address) {
    return (/^(0x)?[0-9a-f]{40}$/i.test(address) && Account.toChecksum(address.toLowerCase()) === address
    );
  },
  rand: function rand() {
    return F.Account.rand().address;
  }
}).__name("Address").__desc("an Ethereum public address");

F.Hash = F(F.Type, {
  form: F.NBytes(32).form,
  test: F.NBytes(32).test,
  rand: F.NBytes(32).rand
}).__name("Hash").__desc("a Keccak-256 hash");

F.PrivateKey = F(F.Type, {
  form: F.NBytes(32).form,
  test: F.NBytes(32).test,
  rand: F.NBytes(32).rand
}).__name("PrivateKey").__desc("an Ethereum private key");

F.Account = function () {
  var base = F.Struct({
    address: F.Address,
    privateKey: F.PrivateKey
  });
  return F(F.Type, {
    form: base.form,
    test: base.test,
    rand: function rand() {
      return Account.create("");
    }
  });
}().__name("Account").__desc("an Ethereum account");

F.BytesTree = F(F.Type, {
  form: "either " + F.Bytes.form + ", or a tree of nested JavaScript Arrays of BytesTrees",
  test: function test(value) {
    return F.Bytes.test(value) || value instanceof Array && value.reduce(function (r, v) {
      return F.BytesTree.test(v) && r;
    }, true);
  },
  rand: function rand() {
    var list = [];
    while (Math.random() < 0.8) {
      if (Math.random() < 0.8) list.push(F.Bytes.rand());else list.push(F.BytesTree.rand());
    }
    return list;
  }
}).__name("BytesTree").__desc("a tree of arbitrary binary data");

module.exports = F;
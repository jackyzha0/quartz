<h3 align="center">
  <br />
  <img src="https://user-images.githubusercontent.com/168240/83951171-85f48c80-a7e4-11ea-896e-529c28ffa18e.png" alt="merkletree.js logo" width="600" />
  <br />
  <br />
  <br />
</h3>

# MerkleTree.js

> Construct [Merkle Trees](https://en.wikipedia.org/wiki/Merkle_tree) and verify proofs in JavaScript.

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/miguelmota/merkletreejs/master/LICENSE)
[![Documentation](https://img.shields.io/badge/documentation-latest-blue.svg)](https://github.com/miguelmota/merkletreejs/tree/master/docs)
[![Build Status](https://travis-ci.org/miguelmota/merkletreejs.svg?branch=master)](https://travis-ci.org/miguelmota/merkletreejs)
[![dependencies Status](https://david-dm.org/miguelmota/merkletreejs/status.svg)](https://david-dm.org/miguelmota/merkletreejs)
[![NPM version](https://badge.fury.io/js/merkletreejs.svg)](http://badge.fury.io/js/merkletreejs)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

## Contents

- [Install](#install)
- [Example](#example)
- [Getting started](#Getting-started)
- [Diagrams](#diagrams)
- [Documentation](#documentation)
- [Test](#test)
- [FAQ](#faq)
- [Notes](#notes)
- [Resources](#resources)
- [Contributing](#contributing)
- [License](#license)

## Install

From [NPM](https://www.npmjs.com/package/merkletreejs):

```bash
npm install merkletreejs
```

### CDN

Available on [jsDelivr](https://www.jsdelivr.com/) CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/merkletreejs@latest/merkletree.js"></script>
```

## Example

[https://lab.miguelmota.com/merkletreejs](https://lab.miguelmota.com/merkletreejs)

## Getting started

Construct tree, generate proof, and verify proof:

```js
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

const leaves = ['a', 'b', 'c'].map(x => SHA256(x))
const tree = new MerkleTree(leaves, SHA256)
const root = tree.getRoot().toString('hex')
const leaf = SHA256('a')
const proof = tree.getProof(leaf)
console.log(tree.verify(proof, leaf, root)) // true


const badLeaves = ['a', 'x', 'c'].map(x => SHA256(x))
const badTree = new MerkleTree(badLeaves, SHA256)
const badLeaf = SHA256('x')
const badProof = tree.getProof(badLeaf)
console.log(tree.verify(badProof, leaf, root)) // false
```

Print tree to console:

```js
console.log(tree.toString())
```

Output:

```bash
└─ 7075152d03a5cd92104887b476862778ec0c87be5c2fa1c0a90f87c49fad6eff
   ├─ e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a
   │  ├─ ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb
   │  └─ 3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d
   └─ 2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6
      └─ 2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6
```

## Diagrams

▾ Visualization of Merkle Tree

<img src="https://user-images.githubusercontent.com/168240/43616375-15330c32-9671-11e8-9057-6e61c312c856.png" alt="Merkle Tree" width="500">

▾ Visualization of Merkle Tree Proof

<img src="https://user-images.githubusercontent.com/168240/43616387-27ec860a-9671-11e8-9f3f-0b871a6581a6.png" alt="Merkle Tree Proof" width="420">

▾ Visualization of Invalid Merkle Tree Proofs

<img src="https://user-images.githubusercontent.com/168240/43616398-33e20584-9671-11e8-9f62-9f48ce412898.png" alt="Merkle Tree Proof" width="420">

▾ Visualization of Bitcoin Merkle Tree

<img src="https://user-images.githubusercontent.com/168240/43616417-46d3293e-9671-11e8-81c3-8cdf7f8ddd77.png" alt="Merkle Tree Proof" width="420">

## Documentation

See [documentation](docs/classes/_src_merkletree_.merkletree.md) (under [docs/](docs/))

## Test

```bash
npm test
```

## FAQ

- Q: How do you verify merkle proofs in Solidity?
  - A: Check out the example repo [merkletreejs-solidity](https://github.com/miguelmota/merkletreejs-solidity) on how to generate merkle proofs with this library and verify them in Solidity.

- Q: How do you verify merkle [multiproofs](https://github.com/ethereum/eth2.0-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) in Solidity?
  - A: Check out the example repo [merkletreejs-multiproof-solidity](https://github.com/miguelmota/merkletreejs-multiproof-solidity) on how to generate merkle multiproofs with this library and verify them in Solidity.

- Q: Is there a CLI version?

  - Yes, see [merkletreejs-cli](https://github.com/miguelmota/merkletreejs-cli).

## Notes

As is, this implemenation is vulnerable to a [second pre-image attack](https://en.wikipedia.org/wiki/Merkle_tree#Second_preimage_attack). Use a difference hashing function for leaves and nodes, so that `H(x) != H'(x)`.

Also, as is, this implementation is vulnerable to a forgery attack for an unbalanced tree, where the last leaf node can be duplicated to create an artificial balanced tree, resulting in the same Merkle root hash. Do not accept unbalanced tree to prevent this.

More info [here](https://bitcointalk.org/?topic=102395).

## Resources

- [Bitcoin mining the hard way: the algorithms, protocols, and bytes](http://www.righto.com/2014/02/bitcoin-mining-hard-way-algorithms.html)

- [Bitcoin Talk - Merkle Trees](https://bitcointalk.org/index.php?topic=403231.msg9054025#msg9054025)

- [How Log Proofs Work](https://www.certificate-transparency.org/log-proofs-work)

- [Raiden Merkle Tree Implemenation](https://github.com/raiden-network/raiden/blob/f9cf12571891cdf54feb4667cd2fffcb3d5daa89/raiden/mtree.py)

- [Why aren't Solidity sha3 hashes not matching what other sha3 libraries produce?](https://ethereum.stackexchange.com/questions/559/why-arent-solidity-sha3-hashes-not-matching-what-other-sha3-libraries-produce)

- [What is the purpose of using different hash functions for the leaves and internals of a hash tree?](https://crypto.stackexchange.com/questions/2106/what-is-the-purpose-of-using-different-hash-functions-for-the-leaves-and-interna)

- [Why is the full Merkle path needed to verify a transaction?](https://bitcoin.stackexchange.com/questions/50674/why-is-the-full-merkle-path-needed-to-verify-a-transaction)

- [Where is Double hashing performed in Bitcoin?](https://bitcoin.stackexchange.com/questions/8443/where-is-double-hashing-performed-in-bitcoin)

- [Compact Merkle Multiproofs](https://arxiv.org/pdf/2002.07648.pdf)

- [Eth 2.0 specs - Merkle Multiproofs](https://github.com/ethereum/eth2.0-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs)

## Contributing

Pull requests are welcome!

For contributions please create a new branch and submit a pull request for review.

_Many thanks to all the [contributors](https://github.com/miguelmota/merkletreejs/graphs/contributors) that made this library better._

## License

[MIT](LICENSE)

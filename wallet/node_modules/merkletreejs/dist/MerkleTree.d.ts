/// <reference types="node" />
import Base from './Base';
declare type TValue = Buffer | string | number | null | undefined;
declare type THashFnResult = Buffer | string;
declare type THashFn = (value: TValue) => Buffer;
declare type TLeaf = Buffer;
declare type TFillDefaultHash = (idx?: number, hashFn?: THashFn) => THashFnResult;
export interface Options {
    /** If set to `true`, an odd node will be duplicated and combined to make a pair to generate the layer hash. */
    duplicateOdd?: boolean;
    /** If set to `true`, the leaves will hashed using the set hashing algorithms. */
    hashLeaves?: boolean;
    /** If set to `true`, constructs the Merkle Tree using the [Bitcoin Merkle Tree implementation](http://www.righto.com/2014/02/bitcoin-mining-hard-way-algorithms.html). Enable it when you need to replicate Bitcoin constructed Merkle Trees. In Bitcoin Merkle Trees, single nodes are combined with themselves, and each output hash is hashed again. */
    isBitcoinTree?: boolean;
    /** If set to `true`, the leaves will be sorted. */
    sortLeaves?: boolean;
    /** If set to `true`, the hashing pairs will be sorted. */
    sortPairs?: boolean;
    /** If set to `true`, the leaves and hashing pairs will be sorted. */
    sort?: boolean;
    /** If defined, the resulting hash of this function will be used to fill in odd numbered layers. */
    fillDefaultHash?: TFillDefaultHash | Buffer | string;
}
/**
 * Class reprensenting a Merkle Tree
 * @namespace MerkleTree
 */
export declare class MerkleTree extends Base {
    private duplicateOdd;
    private hashFn;
    private hashLeaves;
    private isBitcoinTree;
    private leaves;
    private layers;
    private sortLeaves;
    private sortPairs;
    private sort;
    private fillDefaultHash;
    /**
     * @desc Constructs a Merkle Tree.
     * All nodes and leaves are stored as Buffers.
     * Lonely leaf nodes are promoted to the next level up without being hashed again.
     * @param {Buffer[]} leaves - Array of hashed leaves. Each leaf must be a Buffer.
     * @param {Function} hashFunction - Hash function to use for hashing leaves and nodes
     * @param {Object} options - Additional options
     * @example
     *```js
     *const MerkleTree = require('merkletreejs')
     *const crypto = require('crypto')
     *
     *function sha256(data) {
     *  // returns Buffer
     *  return crypto.createHash('sha256').update(data).digest()
     *}
     *
     *const leaves = ['a', 'b', 'c'].map(value => keccak(value))
     *
     *const tree = new MerkleTree(leaves, sha256)
     *```
     */
    constructor(leaves: any[], hashFn?: any, options?: Options);
    private processLeaves;
    private _createHashes;
    /**
     * addLeaf
     * @desc Adds a leaf to the tree and re-calculates layers.
     * @param {String|Buffer} - Leaf
     * @param {Boolean} - Set to true if the leaf should be hashed before being added to tree.
     * @example
     *```js
     *tree.addLeaf(newLeaf)
     *```
     */
    addLeaf(leaf: TLeaf, shouldHash?: boolean): void;
    /**
     * addLeaves
     * @desc Adds multiple leaves to the tree and re-calculates layers.
     * @param {String[]|Buffer[]} - Array of leaves
     * @param {Boolean} - Set to true if the leaves should be hashed before being added to tree.
     * @example
     *```js
     *tree.addLeaves(newLeaves)
     *```
     */
    addLeaves(leaves: TLeaf[], shouldHash?: boolean): void;
    /**
     * getLeaves
     * @desc Returns array of leaves of Merkle Tree.
     * @return {Buffer[]}
     * @example
     *```js
     *const leaves = tree.getLeaves()
     *```
     */
    getLeaves(values?: any[]): Buffer[];
    /**
     * getLeaf
     * @desc Returns the leaf at the given index.
     * @param {Number} - Index number
     * @return {Buffer}
     * @example
     *```js
     *const leaf = tree.getLeaf(1)
     *```
     */
    getLeaf(index: number): Buffer;
    /**
     * getLeafIndex
     * @desc Returns the index of the given leaf, or -1 if the leaf is not found.
     * @param {String|Buffer} - Target leaf
     * @return {number}
     * @example
     *```js
     *const leaf = Buffer.from('abc')
     *const index = tree.getLeafIndex(leaf)
     *```
     */
    getLeafIndex(target: TLeaf): number;
    /**
     * getLeafCount
     * @desc Returns the total number of leaves.
     * @return {number}
     * @example
     *```js
     *const count = tree.getLeafCount()
     *```
     */
    getLeafCount(): number;
    /**
     * getHexLeaves
     * @desc Returns array of leaves of Merkle Tree as hex strings.
     * @return {String[]}
     * @example
     *```js
     *const leaves = tree.getHexLeaves()
     *```
     */
    getHexLeaves(): string[];
    /**
     * marshalLeaves
     * @desc Returns array of leaves of Merkle Tree as a JSON string.
     * @param {String[]|Buffer[]} - Merkle tree leaves
     * @return {String} - List of leaves as JSON string
     * @example
     *```js
     *const jsonStr = MerkleTree.marshalLeaves(leaves)
     *```
     */
    static marshalLeaves(leaves: any[]): string;
    /**
     * unmarshalLeaves
     * @desc Returns array of leaves of Merkle Tree as a Buffers.
     * @param {String|Object} - JSON stringified leaves
     * @return {Buffer[]} - Unmarshalled list of leaves
     * @example
     *```js
     *const leaves = MerkleTree.unmarshalLeaves(jsonStr)
     *```
     */
    static unmarshalLeaves(jsonStr: string | object): Buffer[];
    /**
     * getLayers
     * @desc Returns multi-dimensional array of all layers of Merkle Tree, including leaves and root.
     * @return {Buffer[]}
     * @example
     *```js
     *const layers = tree.getLayers()
     *```
     */
    getLayers(): Buffer[];
    /**
     * getHexLayers
     * @desc Returns multi-dimensional array of all layers of Merkle Tree, including leaves and root as hex strings.
     * @return {String[]}
     * @example
     *```js
     *const layers = tree.getHexLayers()
     *```
     */
    getHexLayers(): string[];
    /**
     * getLayersFlat
     * @desc Returns single flat array of all layers of Merkle Tree, including leaves and root.
     * @return {Buffer[]}
     * @example
     *```js
     *const layers = tree.getLayersFlat()
     *```
     */
    getLayersFlat(): Buffer[];
    /**
     * getHexLayersFlat
     * @desc Returns single flat array of all layers of Merkle Tree, including leaves and root as hex string.
     * @return {String[]}
     * @example
     *```js
     *const layers = tree.getHexLayersFlat()
     *```
     */
    getHexLayersFlat(): string[];
    /**
     * getLayerCount
     * @desc Returns the total number of layers.
     * @return {number}
     * @example
     *```js
     *const count = tree.getLayerCount()
     *```
     */
    getLayerCount(): number;
    /**
     * getRoot
     * @desc Returns the Merkle root hash as a Buffer.
     * @return {Buffer}
     * @example
     *```js
     *const root = tree.getRoot()
     *```
     */
    getRoot(): Buffer;
    /**
     * getHexRoot
     * @desc Returns the Merkle root hash as a hex string.
     * @return {String}
     * @example
     *```js
     *const root = tree.getHexRoot()
     *```
     */
    getHexRoot(): string;
    /**
     * getProof
     * @desc Returns the proof for a target leaf.
     * @param {Buffer} leaf - Target leaf
     * @param {Number} [index] - Target leaf index in leaves array.
     * Use if there are leaves containing duplicate data in order to distinguish it.
     * @return {Object[]} - Array of objects containing a position property of type string
     * with values of 'left' or 'right' and a data property of type Buffer.
     * @example
     * ```js
     *const proof = tree.getProof(leaves[2])
     *```
     *
     * @example
     *```js
     *const leaves = ['a', 'b', 'a'].map(value => keccak(value))
     *const tree = new MerkleTree(leaves, keccak)
     *const proof = tree.getProof(leaves[2], 2)
     *```
     */
    getProof(leaf: Buffer | string, index?: number): any[];
    /**
     * getHexProof
     * @desc Returns the proof for a target leaf as hex strings.
     * @param {Buffer} leaf - Target leaf
     * @param {Number} [index] - Target leaf index in leaves array.
     * Use if there are leaves containing duplicate data in order to distinguish it.
     * @return {String[]} - Proof array as hex strings.
     * @example
     * ```js
     *const proof = tree.getHexProof(leaves[2])
     *```
     */
    getHexProof(leaf: Buffer | string, index?: number): string[];
    /**
    * getPositionalHexProof
    * @desc Returns the proof for a target leaf as hex strings and the position in binary (left == 0).
    * @param {Buffer} leaf - Target leaf
    * @param {Number} [index] - Target leaf index in leaves array.
    * Use if there are leaves containing duplicate data in order to distinguish it.
    * @return {(string | number)[][]} - Proof array as hex strings. position at index 0
    * @example
    * ```js
    *const proof = tree.getPositionalHexProof(leaves[2])
    *```
    */
    getPositionalHexProof(leaf: Buffer | string, index?: number): (string | number)[][];
    /**
     * marshalProof
     * @desc Returns proof array as JSON string.
     * @param {String[]|Object[]} proof - Merkle tree proof array
     * @return {String} - Proof array as JSON string.
     * @example
     * ```js
     *const jsonStr = MerkleTree.marshalProof(proof)
     *```
     */
    static marshalProof(proof: any[]): string;
    /**
     * unmarshalProof
     * @desc Returns the proof for a target leaf as a list of Buffers.
     * @param {String|Object} - Merkle tree leaves
     * @return {String|Object} - Marshalled proof
     * @example
     * ```js
     *const proof = MerkleTree.unmarshalProof(jsonStr)
     *```
     */
    static unmarshalProof(jsonStr: string | object): any[];
    /**
     * getProofIndices
     * @desc Returns the proof indices for given tree indices.
     * @param {Number[]} treeIndices - Tree indices
     * @param {Number} depth - Tree depth; number of layers.
     * @return {Number[]} - Proof indices
     * @example
     * ```js
     *const proofIndices = tree.getProofIndices([2,5,6], 4)
     *console.log(proofIndices) // [ 23, 20, 19, 8, 3 ]
     *```
     */
    getProofIndices(treeIndices: number[], depth: number): number[];
    private getProofIndicesForUnevenTree;
    /**
     * getMultiProof
     * @desc Returns the multiproof for given tree indices.
     * @param {Number[]} indices - Tree indices.
     * @return {Buffer[]} - Multiproofs
     * @example
     * ```js
     *const indices = [2, 5, 6]
     *const proof = tree.getMultiProof(indices)
     *```
     */
    getMultiProof(tree?: any[], indices?: any[]): Buffer[];
    private getMultiProofForUnevenTree;
    /**
     * getHexMultiProof
     * @desc Returns the multiproof for given tree indices as hex strings.
     * @param {Number[]} indices - Tree indices.
     * @return {String[]} - Multiproofs as hex strings.
     * @example
     * ```js
     *const indices = [2, 5, 6]
     *const proof = tree.getHexMultiProof(indices)
     *```
     */
    getHexMultiProof(tree: Buffer[] | string[], indices: number[]): string[];
    /**
     * getProofFlags
     * @desc Returns list of booleans where proofs should be used instead of hashing.
     * Proof flags are used in the Solidity multiproof verifiers.
     * @param {Number[]|Buffer[]} leaves
     * @param {Buffer[]} proofs
     * @return {Boolean[]} - Boolean flags
     * @example
     * ```js
     *const indices = [2, 5, 6]
     *const proof = tree.getMultiProof(indices)
     *const proofFlags = tree.getProofFlags(leaves, proof)
     *```
     */
    getProofFlags(leaves: any[], proofs: Buffer[] | string[]): boolean[];
    /**
     * verify
     * @desc Returns true if the proof path (array of hashes) can connect the target node
     * to the Merkle root.
     * @param {Object[]} proof - Array of proof objects that should connect
     * target node to Merkle root.
     * @param {Buffer} targetNode - Target node Buffer
     * @param {Buffer} root - Merkle root Buffer
     * @return {Boolean}
     * @example
     *```js
     *const root = tree.getRoot()
     *const proof = tree.getProof(leaves[2])
     *const verified = tree.verify(proof, leaves[2], root)
     *```
     */
    verify(proof: any[], targetNode: Buffer | string, root: Buffer | string): boolean;
    /**
     * verifyMultiProof
     * @desc Returns true if the multiproofs can connect the leaves to the Merkle root.
     * @param {Buffer} root - Merkle tree root
     * @param {Number[]} proofIndices - Leave indices for proof
     * @param {Buffer[]} proofLeaves - Leaf values at indices for proof
     * @param {Number} leavesCount - Count of original leaves
     * @param {Buffer[]} proof - Multiproofs given indices
     * @return {Boolean}
     * @example
     *```js
     *const leaves = tree.getLeaves()
     *const root = tree.getRoot()
     *const treeFlat = tree.getLayersFlat()
     *const leavesCount = leaves.length
     *const proofIndices = [2, 5, 6]
     *const proofLeaves = proofIndices.map(i => leaves[i])
     *const proof = tree.getMultiProof(treeFlat, indices)
     *const verified = tree.verifyMultiProof(root, proofIndices, proofLeaves, leavesCount, proof)
     *```
     */
    verifyMultiProof(root: Buffer | string, proofIndices: number[], proofLeaves: Buffer[] | string[], leavesCount: number, proof: Buffer[] | string[]): boolean;
    verifyMultiProofWithFlags(root: Buffer | string, leaves: TLeaf[], proofs: Buffer[] | string[], proofFlag: boolean[]): boolean;
    private verifyMultiProofForUnevenTree;
    /**
     * getDepth
     * @desc Returns the tree depth (number of layers)
     * @return {Number}
     * @example
     *```js
     *const depth = tree.getDepth()
     *```
     */
    getDepth(): number;
    /**
     * getLayersAsObject
     * @desc Returns the layers as nested objects instead of an array.
     * @example
     *```js
     *const layersObj = tree.getLayersAsObject()
     *```
     */
    getLayersAsObject(): any;
    /**
     * verify
     * @desc Returns true if the proof path (array of hashes) can connect the target node
     * to the Merkle root.
     * @param {Object[]} proof - Array of proof objects that should connect
     * target node to Merkle root.
     * @param {Buffer} targetNode - Target node Buffer
     * @param {Buffer} root - Merkle root Buffer
     * @param {Function} hashFunction - Hash function for hashing leaves and nodes
     * @param {Object} options - Additional options
     * @return {Boolean}
     * @example
     *```js
     *const verified = MerkleTree.verify(proof, leaf, root, sha256, options)
     *```
     */
    static verify(proof: any[], targetNode: Buffer | string, root: Buffer | string, hashFn?: any, options?: Options): boolean;
    /**
     * getMultiProof
     * @desc Returns the multiproof for given tree indices.
     * @param {Buffer[]} tree - Tree as a flat array.
     * @param {Number[]} indices - Tree indices.
     * @return {Buffer[]} - Multiproofs
     *
     *@example
     * ```js
     *const flatTree = tree.getLayersFlat()
     *const indices = [2, 5, 6]
     *const proof = MerkleTree.getMultiProof(flatTree, indices)
     *```
     */
    static getMultiProof(tree: Buffer[] | string[], indices: number[]): Buffer[];
    /**
     * resetTree
     * @desc Resets the tree by clearing the leaves and layers.
     * @example
     *```js
     *tree.resetTree()
     *```
     */
    resetTree(): void;
    /**
     * getPairNode
     * @desc Returns the node at the index for given layer.
     * @param {Buffer[]} layer - Tree layer
     * @param {Number} index - Index at layer.
     * @return {Buffer} - Node
     *
     *@example
     * ```js
     *const node = tree.getPairNode(layer, index)
     *```
     */
    private _getPairNode;
    /**
     * toTreeString
     * @desc Returns a visual representation of the merkle tree as a string.
     * @return {String}
     * @example
     *```js
     *console.log(tree.toTreeString())
     *```
     */
    protected _toTreeString(): string;
    /**
     * toString
     * @desc Returns a visual representation of the merkle tree as a string.
     * @example
     *```js
     *console.log(tree.toString())
     *```
     */
    toString(): string;
    isUnevenTree(treeLayers?: any[]): boolean;
    private isPowOf2;
    private calculateRootForUnevenTree;
}
export default MerkleTree;

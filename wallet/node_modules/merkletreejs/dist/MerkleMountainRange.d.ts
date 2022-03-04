/// <reference types="node" />
import Base from './Base';
/**
 * @desc The index of this MMR implementation starts from 1 not 0.
 */
export declare class MerkleMountainRange extends Base {
    root: Buffer;
    size: number;
    width: number;
    hashes: any;
    data: any;
    hashLeafFn: any;
    peakBaggingFn: any;
    hashBranchFn: any;
    private hashFn;
    constructor(hashFn?: any, leaves?: any[], hashLeafFn?: any, peakBaggingFn?: any, hashBranchFn?: any);
    /**
     * @desc This only stores the hashed value of the leaf.
     * If you need to retrieve the detail data later, use a map to store them.
     */
    append(data: Buffer | string): void;
    /**
     * @desc It returns the hash of a leaf node with hash(M | DATA )
     *       M is the index of the node.
     */
    hashLeaf(index: number, dataHash: Buffer | string): any;
    /**
     * @desc It returns the hash a parent node with hash(M | Left child | Right child)
     *       M is the index of the node.
     */
    hashBranch(index: number, left: any, right: any): any;
    getPeaks(): any[];
    getLeafIndex(width: number): number;
    /**
     * @desc It returns all peaks of the smallest merkle mountain range tree which includes
     *       the given index(size).
     */
    getPeakIndexes(width: number): number[];
    numOfPeaks(width: number): number;
    peakBagging(width: number, peaks: any[]): any;
    /**
     * @desc It returns the size of the tree.
     */
    getSize(width: number): number;
    /**
     * @desc It returns the root value of the tree.
     */
    getRoot(): any;
    getHexRoot(): any;
    /**
     * @dev It returns the hash value of a node for the given position. Note that the index starts from 1.
     */
    getNode(index: number): any;
    /**
     * @desc It returns the height of the highest peak.
     */
    mountainHeight(size: number): number;
    /**
     * @desc It returns the height of the index.
     */
    heightAt(index: number): number;
    /**
     * @desc It returns whether the index is the leaf node or not
     */
    isLeaf(index: number): boolean;
    /**
     * @desc It returns the children when it is a parent node.
     */
    getChildren(index: number): number[];
    /**
     * @desc It returns a merkle proof for a leaf. Note that the index starts from 1.
     */
    getMerkleProof(index: number): {
        root: Buffer;
        width: number;
        peakBagging: any[];
        siblings: any[];
    };
    /**
     * @desc It returns true when the given params verifies that the given value exists in the tree or reverts the transaction.
     */
    verify(root: any, width: number, index: number, value: Buffer | string, peaks: any[], siblings: any[]): boolean;
    peaksToPeakMap(width: number, peaks: any[]): {};
    peakMapToPeaks(width: number, peakMap: any): any[];
    peakUpdate(width: number, prevPeakMap: any, itemHash: any): {};
    rollUp(root: any, width: number, peaks: any[], itemHashes: any[]): any;
    /**
     * @desc It returns the hash value of the node for the index.
     *      If the hash already exists it simply returns the stored value. On the other hand,
     *      it computes hashes recursively downward.
     *      Only appending an item calls this function.
     */
    private _getOrCreateNode;
}
export default MerkleMountainRange;

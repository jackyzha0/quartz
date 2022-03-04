import { MerkleTree } from "merkletreejs";
import { SHA256 } from "crypto-js";

/**
 * Convenience function to generate a merkle root from a list of strings.
 *
 * @param items - Any list of strings that will be hashed and added to the tree.
 * @returns - A merkle root (in hexadecimal).
 */
export function generateRoot(items: string[]): string {
  const tree = new MerkleTree(items, SHA256, {
    hashLeaves: true,
    sortLeaves: true,
  });
  return tree.getRoot().toString("hex");
}

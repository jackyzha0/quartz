import { BytesLike, ethers } from "ethers";

/**
 * Roles are used to handle permissions on modules that extend {@link ModuleWithRoles}.
 * @public
 */
export interface IRoles {
  /**
   * This admin role allows the wallet to modify contract metadata and {@link ModuleWithRoles.grantRole | grant} and {@link ModuleWithRoles.revokeRole | revoke} Roles.
   * @public
   */
  admin: "admin";
  /**
   * The minter role allows the wallet to mint new assets.
   * ({@link NFTModule.mint | NFTs}, {@link TokenModule.mint | Tokens}, {@link PackModule.create | Packs}, etc)
   * @public
   */
  minter: "minter";
  /**
   * The pauser role allows the wallet to pause all external contract interactions.
   * @public
   */
  pauser: "pauser";
  /**
   * The transfer role allows the wallet to transfer and receive assets
   * **even** when the module is set to be non-transferrable.
   * @public
   */
  transfer: "transfer";
  /**
   * The editor role allows the wallet to edit data in the {@link DatastoreModule}.
   * @alpha
   */
  editor: "editor";
  /**
   * The lister role allows the wallet to list assets on the {@link MarketModule}.
   * @public
   */
  lister: "lister";

  /**
   * The contract address allowed to list assets from
   * @internal
   */
  asset: "asset";
}

/**
 * {@inheritDoc IRoles}
 * @public
 */
export type Role = keyof IRoles;

export type SetAllRoles = {
  [key in keyof IRoles]?: string[];
};

/**
 *
 * @internal
 */
export const RolesMap: IRoles = {
  admin: "admin",
  minter: "minter",
  pauser: "pauser",
  transfer: "transfer",
  editor: "editor",
  lister: "lister",
  asset: "asset",
} as const;

/**
 *
 * @internal
 */
const _role: Record<Role, string> = {
  admin: "",
  transfer: "TRANSFER_ROLE",
  minter: "MINTER_ROLE",
  pauser: "PAUSER_ROLE",
  editor: "EDITOR_ROLE",
  lister: "LISTER_ROLE",
  asset: "ASSET_ROLE",
};

/**
 * @internal
 */
export function getRoleHash(role: Role): BytesLike {
  if (role === "admin") {
    return ethers.utils.hexZeroPad([0], 32);
  }
  return ethers.utils.id(_role[role]);
}

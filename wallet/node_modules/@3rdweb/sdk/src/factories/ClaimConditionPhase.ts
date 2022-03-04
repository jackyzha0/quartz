import { isAddress } from "@ethersproject/address";
import { BytesLike, hexZeroPad } from "@ethersproject/bytes";
import { AddressZero } from "@ethersproject/constants";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { InvalidAddressError } from "../common/error";
import { invariant } from "../common/invariant";
import { PublicMintCondition } from "../types/claim-conditions/PublicMintCondition";
import { SnapshotInfo } from "../types/snapshots/SnapshotInfo";

export default class ClaimConditionPhase {
  // In seconds
  private _conditionStartTime = Math.floor(Date.now() / 1000);

  private _currencyAddress = "";

  private _price: BigNumberish = 0;

  private _maxQuantity: BigNumberish = BigNumber.from(0);

  private _quantityLimitPerTransaction: BigNumberish =
    ethers.constants.MaxUint256;

  private _merkleRootHash: BytesLike = hexZeroPad([0], 32);

  private _merkleCondition?: SnapshotInfo = undefined;

  private _snapshot?: string[] = undefined;

  private createSnapshot: (leafs: string[]) => Promise<SnapshotInfo>;

  private _waitInSeconds: BigNumberish = 0;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(createSnapshotFunc: (leafs: string[]) => Promise<SnapshotInfo>) {
    this.createSnapshot = createSnapshotFunc;
  }

  /**
   * Set the price claim condition for the drop.
   *
   * @param price - The price of the currency in wei. Must be >= 0.
   * @param tokenAddress - The address of an ERC20 contract to use as the currency for the claim. By default this is the native currency address which is 0x0000000000000000000000000000000000000000 address.
   */
  public setPrice(
    price: BigNumberish,
    tokenAddress: string = AddressZero,
  ): ClaimConditionPhase {
    if (!isAddress(tokenAddress)) {
      throw new InvalidAddressError(tokenAddress);
    }
    invariant(price >= 0, "Price cannot be negative");

    this._price = price;
    this._currencyAddress = tokenAddress;
    return this;
  }

  /**
   * Set the start time for the claim condition.
   *
   * @param startTime - The start time for the claim condition. Can be a Date object or a number of seconds since the epoch.
   */
  public setConditionStartTime(when: Date | number): ClaimConditionPhase {
    if (typeof when === "number") {
      this._conditionStartTime = Math.floor(when);
    } else {
      // if its starting in the past, just set it to now
      this._conditionStartTime = Math.floor(when.getTime() / 1000);
    }
    return this;
  }

  /**
   * Override the maxQuantity for the claim condition after creating the phase.
   *
   * @param maxQuantity - The max quantity NFTs that can be claimed in this phase.
   */
  public setMaxQuantity(maxQuantity: BigNumberish): ClaimConditionPhase {
    this._maxQuantity = maxQuantity;
    return this;
  }

  /**
   * The max quantity of NFTs that can be claimed in a single transaction.
   *
   * @param max - The max quantity NFTs that can be claimed in a single transaction.
   */
  public setMaxQuantityPerTransaction(max: BigNumberish): ClaimConditionPhase {
    const maxQuantity = BigNumber.from(max);
    invariant(maxQuantity.gte(1), "Max quantity per transaction must be > 0");
    this._quantityLimitPerTransaction = maxQuantity;
    return this;
  }

  /**
   * Sets a merkle root hash for the claim condition.
   *
   * @param root - The merkle root hash
   */
  public setMerkleRoot(root: string): ClaimConditionPhase {
    this._merkleRootHash = root;
    return this;
  }

  /**
   * Sets a snapshot for the claim condition. You can use a snapshot
   * to verify a merkle tree condition.
   *
   * @param root - The merkle root hash
   */
  public setSnapshot(addresses: string[]): ClaimConditionPhase {
    this._snapshot = addresses;
    return this;
  }

  /**
   * @internal
   */
  public getSnapshot(): SnapshotInfo | undefined {
    return this._merkleCondition;
  }

  /**
   * Helper method that provides defaults for each claim condition.
   * @internal
   */
  public async buildPublicClaimCondition(): Promise<PublicMintCondition> {
    if (this._snapshot) {
      this._merkleCondition = await this.createSnapshot(this._snapshot);
    }

    return {
      startTimestamp: BigNumber.from(this._conditionStartTime.toString()),
      pricePerToken: this._price,
      currency: this._currencyAddress || AddressZero,
      maxMintSupply: this._maxQuantity,
      waitTimeSecondsLimitPerTransaction: this._waitInSeconds,
      quantityLimitPerTransaction: this._quantityLimitPerTransaction,
      currentMintSupply: 0,
      merkleRoot: this._merkleCondition?.merkleRoot
        ? this._merkleCondition.merkleRoot
        : this._merkleRootHash,
    };
  }

  /**
   * Wait time enforced after calling `claim` before the next `claim` can be called.
   *
   * @param waitInSeconds - The wait time in seconds.
   */
  public setWaitTimeBetweenClaims(
    waitInSeconds: BigNumberish,
  ): ClaimConditionPhase {
    this._waitInSeconds = waitInSeconds;
    return this;
  }
}

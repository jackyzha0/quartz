import { BigNumberish } from "ethers";

/**
 * The NewSplitRecipient interface describes the structure of a new split recipient.
 * The `shares` property is important for the calculation of the the total split.
 *
 * If there are two recipients each with 10 shares, they each will receive 50%
 * of the total royalties.
 *
 * If there are two recipients each with 1 share, they each will receive 50%
 * of the total royalties.
 *
 * I.e. the total number of shares is used to calculate the percentage of the
 * total royalties that is allocated to each recipient.
 */
export interface NewSplitRecipient {
  /**
   * The address of the recipient
   */
  address: string;

  /**
   * The number of shares for the recipient
   */
  shares: BigNumberish;
}

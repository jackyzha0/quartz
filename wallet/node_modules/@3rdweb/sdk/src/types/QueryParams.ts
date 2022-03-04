import { BigNumberish } from "ethers";

export const DEFAULT_QUERY_ALL_COUNT = 100;

// in the future we can support sorting too, but only pagination for now
export interface QueryAllParams {
  start: BigNumberish;
  count: BigNumberish;
}

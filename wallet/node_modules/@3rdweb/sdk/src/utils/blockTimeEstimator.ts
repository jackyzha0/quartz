import { Provider } from "@ethersproject/providers";
import {
  ChainId,
  SUPPORTED_CHAIN_ID,
  SUPPORTED_CHAIN_IDS,
} from "../common/chain";
import { invariant } from "../common/invariant";

/**
 * Fallback map of default block mining times in seconds.

 */
export const DEFAULT_BLOCK_TIMES_FALLBACK: Record<
  SUPPORTED_CHAIN_ID | ChainId.Hardhat,
  { secondsBetweenBlocks: number; synced: boolean }
> = {
  [ChainId.Mainnet]: {
    secondsBetweenBlocks: 15,
    synced: false,
  },
  [ChainId.Rinkeby]: {
    secondsBetweenBlocks: 15,
    synced: false,
  },
  [ChainId.Polygon]: {
    secondsBetweenBlocks: 2.5,
    synced: false,
  },
  [ChainId.Mumbai]: {
    secondsBetweenBlocks: 2.5,
    synced: false,
  },
  [ChainId.Fantom]: {
    secondsBetweenBlocks: 1,
    synced: false,
  },
  [ChainId.FantomTestnet]: {
    secondsBetweenBlocks: 1,
    synced: false,
  },
  [ChainId.Avalanche]: {
    secondsBetweenBlocks: 1,
    synced: false,
  },
  [ChainId.AvalancheFujiTestnet]: {
    secondsBetweenBlocks: 1,
    synced: false,
  },
  [ChainId.Hardhat]: {
    secondsBetweenBlocks: 1,
    synced: false,
  },
};

/**
 * Given a time in second, return the block number that the time is in.
 *
 * @param timeInEpochSeconds - The time in seconds.
 * @param chainId - The chain id.
 * @returns - The block number.
 */
export async function estimateBlockAtTime(
  timeInEpochSeconds: number,
  provider: Provider,
): Promise<number> {
  const secondsUntil = Math.floor(timeInEpochSeconds - Date.now() / 1000);

  const chainId = (await provider.getNetwork()).chainId as SUPPORTED_CHAIN_ID;
  invariant(
    SUPPORTED_CHAIN_IDS.includes(chainId),
    `Chain id ${chainId} is not supported`,
  );

  invariant(
    timeInEpochSeconds >= Date.now() / 1000,
    "This function should not be used to estimate past block times",
  );

  const estimateSecondsBetweenBlocks = async (): Promise<number> => {
    const blockTimes = [];

    const latest = await provider.getBlock("latest");
    for (let i = 0; i < 5; i++) {
      const current = await provider.getBlock(latest.number - i);
      const previous = await provider.getBlock(latest.number - i - 1);

      const diff = current.timestamp - previous.timestamp;
      blockTimes.push(diff);
    }

    const sum = blockTimes.reduce((result, a) => result + a, 0);
    return sum / blockTimes.length;
  };

  if (DEFAULT_BLOCK_TIMES_FALLBACK[chainId].synced) {
    return DEFAULT_BLOCK_TIMES_FALLBACK[chainId].secondsBetweenBlocks;
  }

  const latestBlock = await provider.getBlock("latest");

  let secondsBetweenBlocks: number;
  try {
    secondsBetweenBlocks = await estimateSecondsBetweenBlocks();
    DEFAULT_BLOCK_TIMES_FALLBACK[chainId] = {
      synced: true,
      secondsBetweenBlocks,
    };
  } catch (err) {
    secondsBetweenBlocks =
      DEFAULT_BLOCK_TIMES_FALLBACK[chainId].secondsBetweenBlocks;
  }

  console.log("Seconds until block", secondsUntil);
  const blocksUntil = Math.ceil(secondsUntil / secondsBetweenBlocks);
  return latestBlock.number + blocksUntil;
}

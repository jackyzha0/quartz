import { ChainId } from "./chain";

/**
 * @internal
 */
function getGasStationUrl(chainId?: number): string | null {
  if (!chainId) {
    return null;
  }

  if (chainId === ChainId.Polygon) {
    return "https://gasstation-mainnet.matic.network";
  }

  return null;
}

/**
 *
 * @returns the gas price
 * @internal
 */
export async function getGasPriceForChain(
  chainId: number,
  speed: string,
  maxGasPrice: number,
): Promise<number | null> {
  const gasStationUrl = getGasStationUrl(chainId);
  if (!gasStationUrl) {
    return null;
  }
  try {
    const data = await (await fetch(gasStationUrl)).json();
    let gas = data[speed];

    if (chainId === ChainId.Polygon || chainId === ChainId.Mumbai) {
      // the minimum gas on chain is 30, +1 for priority. prevent gas station report false price and cause tx to fail.
      gas = Math.max(gas, 31);
    }
    if (gas > 0) {
      return Math.min(gas, maxGasPrice);
    }
  } catch (e) {
    console.error("failed to fetch gas", e);
  }
  return null;
}

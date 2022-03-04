import { BaseContract, BigNumber } from "ethers";

/**
 * @internal
 */
export const ForwardRequest = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: "value", type: "uint256" },
  { name: "gas", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "data", type: "bytes" },
];

/**
 * @internal
 */
export const BiconomyForwarderAbi = [
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "uint256", name: "batchId", type: "uint256" },
    ],
    name: "getNonce",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const _nonces: Record<string, BigNumber> = {};
const _noncesSyncTimestamp: Record<string, number> = {};

/**
 * @internal
 */
export async function getAndIncrementNonce(
  forwarder: BaseContract,
  forwarderFunction: string,
  forwarderArgs: any[],
): Promise<BigNumber> {
  // address is only used for internal caching :)
  const address = forwarderArgs.join("|");

  const timestamp = _noncesSyncTimestamp[address];
  // if it's within 2 seconds we're optimistically increment the nonce
  // should we always sync?
  const shouldSync = Date.now() - timestamp >= 2000;

  if (!(address in _nonces) || shouldSync) {
    const nonceResult = await forwarder.functions[forwarderFunction](
      ...forwarderArgs,
    );
    if (Array.isArray(nonceResult) && nonceResult.length > 0) {
      _nonces[address] = BigNumber.from(nonceResult[0]);
    } else {
      _nonces[address] = BigNumber.from(nonceResult);
    }
    _noncesSyncTimestamp[address] = Date.now();
  }

  const nonce = _nonces[address];
  _nonces[address] = BigNumber.from(_nonces[address]).add(1);
  return nonce;
}

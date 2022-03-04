import { TypedDataField } from "@ethersproject/abstract-signer";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { ethers, Signer } from "ethers";

/**
 * @internal
 */
export interface EIP712StandardDomain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

/**
 * @internal
 */
export interface EIP712PolygonDomain {
  name: string;
  version: string;
  verifyingContract: string;
  salt: string;
}

/**
 * @internal
 */
export type EIP712Domain = EIP712StandardDomain | EIP712PolygonDomain;

/**
 * eip712 sign typed data with different wallet handling including ledger live
 * @internal
 */
export async function signTypedData(
  signer: Signer,
  domain: EIP712Domain,
  types: Record<string, Array<TypedDataField>>,
  message: Record<string, any>,
) {
  const provider = signer?.provider as JsonRpcProvider;
  if (!provider) {
    throw new Error("missing provider");
  }

  const payload = ethers.utils._TypedDataEncoder.getPayload(
    domain,
    types,
    message,
  );

  let signature = "";

  // an indirect way for accessing walletconnect's underlying provider
  if ((provider as any)?.provider?.isWalletConnect) {
    signature = await provider.send("eth_signTypedData", [
      (await signer.getAddress()).toLowerCase(),
      JSON.stringify(payload),
    ]);
  } else {
    try {
      signature = await (signer as JsonRpcSigner)._signTypedData(
        domain,
        types,
        message,
      );
    } catch (err: any) {
      if (err?.message?.includes("Method eth_signTypedData_v4 not supported")) {
        signature = await provider.send("eth_signTypedData", [
          (await signer.getAddress()).toLowerCase(),
          JSON.stringify(payload),
        ]);
      } else {
        throw err;
      }
    }
  }

  // fix ledger live where signature result in v = 0, 1. ethers magically fix it in split/join.
  return {
    payload,
    signature: ethers.utils.joinSignature(
      ethers.utils.splitSignature(signature),
    ),
  };
}

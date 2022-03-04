import { ERC20__factory } from "@3rdweb/contracts";
import { AddressZero } from "@ethersproject/constants";
import { Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { BigNumberish, Signer } from "ethers";
import { ProviderOrSigner } from "../core/types";
import { ChainId, SUPPORTED_CHAIN_ID } from "./chain";

/**
 * Currency metadata.
 * @public
 */
export interface Currency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface NativeToken extends Currency {
  wrapped: {
    address: string;
    name: string;
    symbol: string;
  };
}

/**
 * Currency metadata & value.
 * @public
 */
export interface CurrencyValue extends Currency {
  value: string;
  displayValue: string;
}

/**
 * @internal
 */
export const NATIVE_TOKEN_ADDRESS =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

const NATIVE_TOKENS: Record<SUPPORTED_CHAIN_ID | ChainId.Hardhat, NativeToken> =
  {
    [ChainId.Mainnet]: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      wrapped: {
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        name: "Wrapped Ether",
        symbol: "WETH",
      },
    },
    [ChainId.Rinkeby]: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      wrapped: {
        address: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        name: "Wrapped Ether",
        symbol: "WETH",
      },
    },
    [ChainId.Polygon]: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
      wrapped: {
        address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
        name: "Wrapped Matic",
        symbol: "WMATIC",
      },
    },
    [ChainId.Mumbai]: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
      wrapped: {
        address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
        name: "Wrapped Matic",
        symbol: "WMATIC",
      },
    },
    [ChainId.Avalanche]: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
      wrapped: {
        address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        name: "Wrapped AVAX",
        symbol: "WAVAX",
      },
    },
    [ChainId.AvalancheFujiTestnet]: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
      wrapped: {
        address: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
        name: "Wrapped AVAX",
        symbol: "WAVAX",
      },
    },
    [ChainId.Fantom]: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
      wrapped: {
        address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
        name: "Wrapped Fantom",
        symbol: "WFTM",
      },
    },
    [ChainId.FantomTestnet]: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
      wrapped: {
        address: "0xf1277d1Ed8AD466beddF92ef448A132661956621",
        name: "Wrapped Fantom",
        symbol: "WFTM",
      },
    },
    [ChainId.Hardhat]: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      wrapped: {
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        name: "Wrapped Ether",
        symbol: "WETH",
      },
    },
  };

/**
 * @internal
 */
export async function getCurrencyMetadata(
  providerOrSigner: ProviderOrSigner,
  asset: string,
): Promise<Currency> {
  try {
    if (isNativeToken(asset)) {
      let provider: Provider;
      if (Signer.isSigner(providerOrSigner)) {
        provider = (providerOrSigner as Signer).provider as Provider;
      } else {
        provider = providerOrSigner as Provider;
      }
      const network = await provider.getNetwork();
      const nativeToken = getNativeTokenByChainId(network.chainId);
      return {
        name: nativeToken.name,
        symbol: nativeToken.symbol,
        decimals: nativeToken.decimals,
      };
    } else {
      const erc20 = ERC20__factory.connect(asset, providerOrSigner);
      const [name, symbol, decimals] = await Promise.all([
        erc20.name(),
        erc20.symbol(),
        erc20.decimals(),
      ]);
      return {
        name,
        symbol,
        decimals,
      };
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return {
    name: "",
    symbol: "",
    decimals: 0,
  };
}

/**
 * @internal
 */
export async function getCurrencyValue(
  providerOrSigner: ProviderOrSigner,
  asset: string,
  price: BigNumberish,
): Promise<CurrencyValue> {
  const metadata = await getCurrencyMetadata(providerOrSigner, asset);
  return {
    ...metadata,
    value: price.toString(),
    displayValue: formatUnits(price, metadata.decimals),
  };
}

/**
 * @internal
 */
export function isNativeToken(tokenAddress: string): boolean {
  return (
    tokenAddress.toLowerCase() === NATIVE_TOKEN_ADDRESS ||
    tokenAddress.toLowerCase() === AddressZero
  );
}

/**
 * @internal
 */
export async function getCurrencyBalance(
  providerOrSigner: ProviderOrSigner,
  tokenAddress: string,
  walletAddress: string,
): Promise<CurrencyValue> {
  const provider = getProvider(providerOrSigner);
  let balance;
  if (isNativeToken(tokenAddress)) {
    balance = await provider.getBalance(walletAddress);
  } else {
    try {
      const erc20 = ERC20__factory.connect(tokenAddress, provider);
      balance = await erc20.balanceOf(walletAddress);
    } catch (e) {
      console.error(e);
      throw new Error("invalid ERC20 token address");
    }
  }

  return getCurrencyValue(providerOrSigner, tokenAddress, balance);
}

function getProvider(providerOrSigner: ProviderOrSigner): Provider {
  if (Signer.isSigner(providerOrSigner)) {
    return (providerOrSigner as Signer).provider as Provider;
  } else {
    return providerOrSigner as Provider;
  }
}

export function getNativeTokenByChainId(chainId: ChainId): NativeToken {
  return NATIVE_TOKENS[chainId as SUPPORTED_CHAIN_ID];
}

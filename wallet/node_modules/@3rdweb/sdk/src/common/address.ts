import { ethers } from "ethers";
import { ChainId, SUPPORTED_CHAIN_ID } from "./chain";

export const FORWARDER_ADDRESS = "0xc82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81";
export const CONTRACT_ADDRESSES: Record<
  SUPPORTED_CHAIN_ID | ChainId.Hardhat,
  Record<"registry" | "biconomyForwarder", string>
> = {
  [ChainId.Mainnet]: {
    registry: "0x902a29f2cfe9f8580ad672AaAD7E917d85ca9a2E",
    biconomyForwarder: "0x84a0856b038eaAd1cC7E297cF34A7e72685A8693",
  },
  [ChainId.Rinkeby]: {
    registry: "0x902a29f2cfe9f8580ad672AaAD7E917d85ca9a2E",
    biconomyForwarder: "0xFD4973FeB2031D4409fB57afEE5dF2051b171104",
  },
  [ChainId.Polygon]: {
    registry: "0x902a29f2cfe9f8580ad672AaAD7E917d85ca9a2E",
    biconomyForwarder: "0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8",
  },
  [ChainId.Mumbai]: {
    registry: "0x902a29f2cfe9f8580ad672AaAD7E917d85ca9a2E",
    biconomyForwarder: "0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b",
  },
  [ChainId.Avalanche]: {
    registry: "0x902a29f2cfe9f8580ad672AaAD7E917d85ca9a2E",
    biconomyForwarder: "0x64CD353384109423a966dCd3Aa30D884C9b2E057",
  },
  [ChainId.AvalancheFujiTestnet]: {
    registry: "0x902a29f2cfe9f8580ad672AaAD7E917d85ca9a2E",
    biconomyForwarder: "0x6271Ca63D30507f2Dcbf99B52787032506D75BBF",
  },
  [ChainId.Fantom]: {
    registry: "0x902a29f2cfe9f8580ad672AaAD7E917d85ca9a2E",
    biconomyForwarder: ethers.constants.AddressZero,
  },
  [ChainId.FantomTestnet]: {
    registry: "0x902a29f2cfe9f8580ad672AaAD7E917d85ca9a2E",
    biconomyForwarder: ethers.constants.AddressZero,
  },
  [ChainId.Hardhat]: {
    registry: "0x902a29f2cfe9f8580ad672AaAD7E917d85ca9a2E",
    biconomyForwarder: ethers.constants.AddressZero,
  },
};

export function getContractAddressByChainId(
  chainId: ChainId,
  contractName: "registry" | "biconomyForwarder" = "registry",
): string | undefined {
  return CONTRACT_ADDRESSES[chainId as SUPPORTED_CHAIN_ID][contractName];
}

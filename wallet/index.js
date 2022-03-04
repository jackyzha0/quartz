import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { Magic } from "magic-sdk";

const magic = new Magic()

// Magic.link wallet -> will be making the sdk contract calls
const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
const signer = provider.getSigner();

// Initialise the SDK instance with magic.link signer
const sdk = new ThirdwebSDK(signer);

// Access any modules using the SDK
sdk.getNFTModule("0x...");
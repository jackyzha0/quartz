import { BigNumber, BigNumberish, Contract, ethers, Signer } from "ethers";
import { EIP712Domain, EIP712StandardDomain, signTypedData } from "./sign";

const NAME_ABI = [
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const DOMAIN_SEPARATOR_ABI = [
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDomainSeperator",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
];

const NONCES_ABI = [
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getNonce",
    outputs: [{ internalType: "uint256", name: "nonce", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

async function getSignerNonce(signer: Signer, contractAddress: string) {
  const contract = new Contract(contractAddress, NONCES_ABI, signer);
  try {
    return await contract.nonces(await signer.getAddress());
  } catch (err) {
    return await contract.getNonce(await signer.getAddress());
  }
}

async function getDomainSeperator(signer: Signer, contractAddress: string) {
  const contract = new Contract(contractAddress, DOMAIN_SEPARATOR_ABI, signer);
  try {
    return await contract.DOMAIN_SEPARATOR();
  } catch (err) {
    return await contract.getDomainSeperator();
  }
}

async function getTokenName(signer: Signer, contractAddress: string) {
  return new Contract(contractAddress, NAME_ABI, signer).name();
}

/**
 * Polygon chain has different EIP712 domain separator for USDC, DAI compared to other chains and slightly different than EIP-2612.
 */
async function getChainDomainSeperator(
  signer: Signer,
  domain: EIP712StandardDomain,
) {
  const contractDomainSeparator = await getDomainSeperator(
    signer,
    domain.verifyingContract,
  );

  const polygonDomain: EIP712Domain = {
    name: domain.name,
    version: domain.version,
    verifyingContract: domain.verifyingContract,
    salt: ethers.utils.hexZeroPad(
      BigNumber.from(domain.chainId).toHexString(),
      32,
    ),
  };

  if (
    ethers.utils._TypedDataEncoder.hashDomain(polygonDomain) ===
    contractDomainSeparator
  ) {
    return polygonDomain;
  }

  return domain;
}

/**
 * @internal
 */
export async function signDAIPermit(
  signer: Signer,
  currencyAddress: string,
  owner: string,
  spender: string,
  allowed = true,
  deadline?: BigNumberish,
  nonce?: BigNumberish,
) {
  const domain = await getChainDomainSeperator(signer, {
    name: await getTokenName(signer, currencyAddress),
    version: "1",
    chainId: await signer.getChainId(),
    verifyingContract: currencyAddress,
  });

  nonce = nonce ?? (await getSignerNonce(signer, currencyAddress)).toString();
  deadline = deadline ?? ethers.constants.MaxUint256;

  const message = {
    owner,
    spender,
    nonce,
    deadline,
    value: 0,
    allowed,
  };

  const types = {
    Permit: [
      { name: "holder", type: "address" },
      { name: "spender", type: "address" },
      { name: "nonce", type: "uint256" },
      { name: "expiry", type: "uint256" },
      { name: "allowed", type: "bool" },
    ],
  };

  const { signature } = await signTypedData(signer, domain, types, {
    holder: owner,
    spender,
    nonce,
    expiry: deadline,
    allowed,
  });

  return {
    message,
    signature,
  };
}

/**
 * @internal
 */
export async function signEIP2612Permit(
  signer: Signer,
  currencyAddress: string,
  owner: string,
  spender: string,
  value: BigNumberish,
  deadline?: BigNumberish,
  nonce?: BigNumberish,
) {
  const domain = await getChainDomainSeperator(signer, {
    name: await getTokenName(signer, currencyAddress),
    version: "1",
    chainId: await signer.getChainId(),
    verifyingContract: currencyAddress,
  });

  nonce = nonce ?? (await getSignerNonce(signer, currencyAddress)).toString();
  deadline = deadline ?? ethers.constants.MaxUint256;

  const message = {
    owner,
    spender,
    value,
    nonce,
    deadline,
  };

  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };

  const { signature } = await signTypedData(signer, domain, types, message);
  return {
    message,
    signature,
  };
}

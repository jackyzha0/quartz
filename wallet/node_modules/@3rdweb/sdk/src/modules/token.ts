import { Coin, Coin__factory } from "@3rdweb/contracts";
import { AddressZero } from "@ethersproject/constants";
import { TransactionReceipt } from "@ethersproject/providers";
import { BigNumber, BigNumberish } from "ethers";
import { ModuleType, Role, RolesMap } from "../common";
import {
  Currency,
  CurrencyValue,
  getCurrencyMetadata,
  getCurrencyValue,
} from "../common/currency";
import { ModuleWithRoles } from "../core/module";
import { MetadataURIOrObject } from "../core/types";
import { ITransferable } from "../interfaces/contracts/ITransferable";

export interface ITokenMintArgs {
  address: string;
  amount: BigNumberish;
}

export interface ITokenMintFromArgs extends ITokenMintArgs {
  fromAddress: string;
}

/**
 * Create a standard crypto token or crypto currency.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@3rdweb/sdk";
 *
 * // You can switch out this provider with any wallet or provider setup you like.
 * const provider = ethers.Wallet.createRandom();
 * const sdk = new ThirdwebSDK(provider);
 * const module = sdk.getTokenModule("{{module_address}}");
 * ```
 *
 * @public
 */
export class TokenModule
  extends ModuleWithRoles<Coin>
  implements ITransferable
{
  public static moduleType: ModuleType = ModuleType.CURRENCY as const;

  public static roles = [
    RolesMap.admin,
    RolesMap.minter,
    RolesMap.pauser,
    RolesMap.transfer,
  ] as const;

  /**
   * @override
   * @internal
   */
  protected getModuleRoles(): readonly Role[] {
    return TokenModule.roles;
  }

  /**
   * @internal
   */
  protected connectContract(): Coin {
    return Coin__factory.connect(this.address, this.providerOrSigner);
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return TokenModule.moduleType;
  }

  public async get(): Promise<Currency> {
    return await getCurrencyMetadata(this.providerOrSigner, this.address);
  }

  public async getValue(value: BigNumberish): Promise<CurrencyValue> {
    return await getCurrencyValue(
      this.providerOrSigner,
      this.address,
      BigNumber.from(value),
    );
  }

  public async totalSupply(): Promise<BigNumber> {
    return await this.readOnlyContract.totalSupply();
  }

  public async balance(): Promise<CurrencyValue> {
    return await this.balanceOf(await this.getSignerAddress());
  }

  /**
   * Get Token Balance
   *
   * @remarks Get a wallets token balance.
   *
   * @example
   * ```javascript
   * // Address of the wallet to check token balance
   * const address = "{{wallet_address}}";
   *
   * const balance = await module.balanceOf(address);
   * console.log(balance);
   * ```
   *
   * @returns The balance of a specific wallet.
   */
  public async balanceOf(address: string): Promise<CurrencyValue> {
    return await this.getValue(await this.readOnlyContract.balanceOf(address));
  }

  public async allowance(spender: string): Promise<BigNumber> {
    return await this.allowanceOf(await this.getSignerAddress(), spender);
  }

  /**
   * Get Token Allowance
   *
   * @remarks Get the allowance of one wallet over another's funds - the allowance of a different address for a token is the amount of tokens that the wallet is allowed to spend on behalf of the connected wallet.
   *
   * @example
   * ```javascript
   * // Address of the wallet who owns the funds
   * const address = "{{wallet_address}}";
   *
   * // Address of the wallet to check token allowance
   * const otherAddress = "0x...";
   *
   * const allowance = await module.allowanceOf(address, otherAddress);
   * console.log(allowance);
   * ```
   *
   * @returns The allowance of one wallet over anothers funds.
   */
  public async allowanceOf(owner: string, spender: string): Promise<BigNumber> {
    return await this.readOnlyContract.allowance(owner, spender);
  }

  /**
   * Get your wallet voting power for the current checkpoints
   *
   * @returns the amount of voting power in tokens
   */
  public async getVoteBalance(): Promise<BigNumber> {
    return await this.getVoteBalanceOf(await this.getSignerAddress());
  }

  public async getVoteBalanceOf(account: string): Promise<BigNumber> {
    return await this.readOnlyContract.getVotes(account);
  }

  /**
   * Get your voting delegatee address
   *
   * @returns the address of your vote delegatee
   */
  public async getDelegation(): Promise<string> {
    return await this.getDelegationOf(await this.getSignerAddress());
  }

  public async getDelegationOf(account: string): Promise<string> {
    return await this.readOnlyContract.delegates(account);
  }

  /**
   * Lets you delegate your voting power to the delegateeAddress
   *
   * @param delegateeAddress - delegatee wallet address
   * @alpha
   */
  public async delegateTo(
    delegateeAddress: string,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("delegate", [delegateeAddress]);
  }

  /**
   * Transfer Tokens
   *
   * @remarks Transfer tokens from the connected wallet to another wallet.
   *
   * @example
   * ```javascript
   * // Address of the wallet you want to send the tokens to
   * const toAddress = "0x...";
   *
   * // The amount of tokens you want to send
   * const amount = 0;
   *
   * await module.transfer(toAddress, amount);
   * ```
   */
  public async transfer(
    to: string,
    amount: BigNumberish,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("transfer", [to, amount]);
  }

  public async setAllowance(
    spender: string,
    amount: BigNumber,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("approve", [spender, amount]);
  }

  // owner functions
  public async mint(amount: BigNumberish) {
    await this.mintTo(await this.getSignerAddress(), amount);
  }

  /**
   * Mint Tokens
   *
   * @remarks Mint tokens to a specified address
   *
   * @example
   * ```javascript
   * // Address of the wallet you want to mint the tokens to
   * const toAddress = "{{wallet_address}}";
   *
   * // The amount of this token you want to mint
   * const amount = ethers.utils.parseEther("1.5");
   *
   * await module.mintTo(toAddress, amount);
   * ```
   */
  public async mintTo(to: string, amount: BigNumberish) {
    await this.sendTransaction("mint", [to, amount]);
  }

  /**
   * Mint Tokens To Many Wallets
   *
   * @remarks Mint tokens to many different wallets
   *
   * @example
   * ```javascript
   * // Data of the tokens you want to mint
   * const data = [
   *   {
   *     address: "{{wallet_address}}", // Address to mint tokens to
   *     amount: 100, // How many tokens to mint to specified address
   *   },
   *  {
   *    address: "0x...",
   *    amount: 100,
   *  }
   * ]
   *
   * await module.mintBatchTo(data);
   * ```
   */
  public async mintBatchTo(args: ITokenMintArgs[]) {
    const encoded = [];
    for (const arg of args) {
      encoded.push(
        this.contract.interface.encodeFunctionData("mint", [
          arg.address,
          arg.amount,
        ]),
      );
    }
    await this.sendTransaction("multicall", [encoded]);
  }

  /**
   * Lets you get a all token holders and their corresponding balances
   * @beta - This can be very slow for large numbers of token holders
   * @param queryParams - Optional query params
   * @returns - A JSON object of all token holders and their corresponding balances
   */
  public async getAllHolderBalances(): Promise<Record<string, BigNumber>> {
    const a = await this.contract.queryFilter(this.contract.filters.Transfer());
    const txns = a.map((b) => b.args);
    const balances: {
      [key: string]: BigNumber;
    } = {};
    txns.forEach((item) => {
      const from = item.from;
      const to = item.to;
      const amount = item.value;

      if (!(from === AddressZero)) {
        if (!(from in balances)) {
          balances[from] = BigNumber.from(0);
        }
        balances[from] = balances[from].sub(amount);
      }
      if (!(to === AddressZero)) {
        if (!(to in balances)) {
          balances[to] = BigNumber.from(0);
        }
        balances[to] = balances[to].add(amount);
      }
    });
    return balances;
  }

  /**
   * Burn Tokens
   *
   * @remarks Burn tokens held by the connected wallet
   *
   * @example
   * ```javascript
   * // The amount of this token you want to burn
   * const amount = 100;
   *
   * await module.burn(amount);
   * ```
   */
  public async burn(amount: BigNumberish): Promise<TransactionReceipt> {
    return await this.sendTransaction("burn", [amount]);
  }

  public async burnFrom(
    from: string,
    amount: BigNumberish,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("burnFrom", [from, amount]);
  }

  /**
   * Transfer Tokens From Address
   *
   * @remarks Transfer tokens from one wallet to another
   *
   * @example
   * ```javascript
   * // Address of the wallet sending the tokens
   * const fromAddress = "{{wallet_address}}";
   * // Address of the wallet you want to send the tokens to
   * const toAddress = "0x...";
   * // The number of tokens you want to send
   * const amount = 100
   *
   * // Note that the connected wallet must have approval to transfer the tokens of the fromAddress
   * await module.transferFrom(fromAddress, toAddress, amount);
   * ```
   */
  public async transferFrom(
    from: string,
    to: string,
    amount: BigNumberish,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("transferFrom", [from, to, amount]);
  }

  public async setModuleMetadata(
    metadata: MetadataURIOrObject,
  ): Promise<TransactionReceipt> {
    const uri = await this.sdk.getStorage().uploadMetadata(metadata);
    return await this.sendTransaction("setContractURI", [uri]);
  }

  public async transferBatch(args: ITokenMintArgs[]) {
    const encoded = args.map((arg) =>
      this.contract.interface.encodeFunctionData("transfer", [
        arg.address,
        arg.amount,
      ]),
    );
    await this.sendTransaction("multicall", [encoded]);
  }

  public async transferFromBatch(args: ITokenMintFromArgs[]) {
    const encoded = args.map((arg) =>
      this.contract.interface.encodeFunctionData("transferFrom", [
        arg.fromAddress,
        arg.address,
        arg.amount,
      ]),
    );
    await this.sendTransaction("multicall", [encoded]);
  }

  public async isTransferRestricted(): Promise<boolean> {
    return this.readOnlyContract.transfersRestricted();
  }

  public async setRestrictedTransfer(
    restricted = false,
  ): Promise<TransactionReceipt> {
    await this.onlyRoles(["admin"], await this.getSignerAddress());
    return await this.sendTransaction("setRestrictedTransfer", [restricted]);
  }
}

/**
 * @deprecated - see {@link TokenModule}
 */
export class CurrencyModule extends TokenModule {}

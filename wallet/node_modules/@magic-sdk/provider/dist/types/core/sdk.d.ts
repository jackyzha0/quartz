import { EthNetworkConfiguration, SupportedLocale } from '@magic-sdk/types';
import type { AbstractProvider } from 'web3-core';
import { AuthModule } from '../modules/auth';
import { UserModule } from '../modules/user';
import { RPCProviderModule } from '../modules/rpc-provider';
import { ViewController } from './view-controller';
import { Extension } from '../modules/base-extension';
export declare type MagicSDKExtensionsOption<TCustomExtName extends string = string> = Extension<string>[] | {
    [P in TCustomExtName]: Extension<string>;
};
export interface MagicSDKAdditionalConfiguration<TCustomExtName extends string = string, TExt extends MagicSDKExtensionsOption<TCustomExtName> = any> {
    endpoint?: string;
    locale?: SupportedLocale;
    network?: EthNetworkConfiguration;
    extensions?: TExt;
    testMode?: boolean;
}
export declare class SDKBase {
    readonly apiKey: string;
    private static readonly __overlays__;
    protected readonly endpoint: string;
    protected readonly parameters: string;
    readonly testMode: boolean;
    /**
     * Contains methods for starting a Magic SDK authentication flow.
     */
    readonly auth: AuthModule;
    /**
     * Contains methods for interacting with user data, checking login
     * status, generating cryptographically-secure ID tokens, and more.
     */
    readonly user: UserModule;
    /**
     * Contains a Web3-compliant provider. Pass this module to your Web3/Ethers
     * instance for automatic compatibility with Ethereum methods.
     */
    readonly rpcProvider: RPCProviderModule & AbstractProvider;
    /**
     * Creates an instance of Magic SDK.
     */
    constructor(apiKey: string, options?: MagicSDKAdditionalConfiguration);
    /**
     * Represents the view controller associated with this `MagicSDK` instance.
     */
    protected get overlay(): ViewController;
    /**
     * Preloads the Magic view, allowing for faster initial requests in browser
     * environments. Awaiting the returned promise will signal when the Magic view
     * has completed loading and is ready for requests.
     */
    preload(): Promise<void>;
}

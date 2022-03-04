import { Network, Networkish } from "@ethersproject/networks";
import { ConnectionInfo } from "@ethersproject/web";
import { UrlJsonRpcProvider } from "./url-json-rpc-provider";
export declare class PocketProvider extends UrlJsonRpcProvider {
    readonly applicationId: string;
    readonly applicationSecretKey: string;
    readonly loadBalancer: boolean;
    constructor(network?: Networkish, apiKey?: any);
    static getApiKey(apiKey: any): any;
    static getUrl(network: Network, apiKey: any): ConnectionInfo;
    isCommunityResource(): boolean;
}
//# sourceMappingURL=pocket-provider.d.ts.map
export declare type EthNetworkName = 'mainnet' | 'rinkeby' | 'ropsten' | 'kovan';
export declare enum EthChainType {
    Harmony = "HARMONY"
}
export interface CustomNodeConfiguration {
    rpcUrl: string;
    chainId?: number;
    chainType?: EthChainType;
}
export declare type EthNetworkConfiguration = EthNetworkName | CustomNodeConfiguration;

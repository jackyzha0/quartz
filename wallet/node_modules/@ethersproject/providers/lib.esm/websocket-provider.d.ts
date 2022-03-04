import { Network, Networkish } from "@ethersproject/networks";
import { Event } from "./base-provider";
import { JsonRpcProvider } from "./json-rpc-provider";
export declare type InflightRequest = {
    callback: (error: Error, result: any) => void;
    payload: string;
};
export declare type Subscription = {
    tag: string;
    processFunc: (payload: any) => void;
};
export declare class WebSocketProvider extends JsonRpcProvider {
    readonly _websocket: any;
    readonly _requests: {
        [name: string]: InflightRequest;
    };
    readonly _detectNetwork: Promise<Network>;
    readonly _subIds: {
        [tag: string]: Promise<string>;
    };
    readonly _subs: {
        [name: string]: Subscription;
    };
    _wsReady: boolean;
    constructor(url: string, network?: Networkish);
    detectNetwork(): Promise<Network>;
    get pollingInterval(): number;
    resetEventsBlock(blockNumber: number): void;
    set pollingInterval(value: number);
    poll(): Promise<void>;
    set polling(value: boolean);
    send(method: string, params?: Array<any>): Promise<any>;
    static defaultUrl(): string;
    _subscribe(tag: string, param: Array<any>, processFunc: (result: any) => void): Promise<void>;
    _startEvent(event: Event): void;
    _stopEvent(event: Event): void;
    destroy(): Promise<void>;
}
//# sourceMappingURL=websocket-provider.d.ts.map
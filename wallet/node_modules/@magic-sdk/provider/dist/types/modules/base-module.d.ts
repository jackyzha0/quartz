import { JsonRpcRequestPayload } from '@magic-sdk/types';
import type { SDKBase } from '../core/sdk';
import type { ViewController } from '../core/view-controller';
import type { EventsDefinition } from '../util/events';
export declare class BaseModule {
    protected sdk: SDKBase;
    constructor(sdk: SDKBase);
    /**
     * The `ViewController` for the SDK instance registered to this module.
     */
    protected get overlay(): ViewController;
    /**
     * Emits promisified requests to the Magic `<iframe>` context.
     */
    protected request<ResultType = any, Events extends EventsDefinition = void>(payload: Partial<JsonRpcRequestPayload>): import("../util/promise-tools").PromiEvent<ResultType, Events extends void ? {
        done: (result: ResultType) => void;
        error: (reason: any) => void;
        settled: () => void;
    } : Events & {
        done: (result: ResultType) => void;
        error: (reason: any) => void;
        settled: () => void;
    }>;
}

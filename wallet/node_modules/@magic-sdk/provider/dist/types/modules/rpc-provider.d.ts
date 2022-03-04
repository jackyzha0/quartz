import { JsonRpcRequestPayload, JsonRpcRequestCallback, JsonRpcBatchRequestCallback, JsonRpcResponsePayload } from '@magic-sdk/types';
import { BaseModule } from './base-module';
import { PromiEvent } from '../util/promise-tools';
import { EventsDefinition, TypedEmitter } from '../util/events';
/** */
export declare class RPCProviderModule extends BaseModule implements TypedEmitter {
    readonly isMagic = true;
    sendAsync(payload: Partial<JsonRpcRequestPayload>, onRequestComplete: JsonRpcRequestCallback): void;
    sendAsync(payload: Partial<JsonRpcRequestPayload>[], onRequestComplete: JsonRpcBatchRequestCallback): void;
    sendAsync(payload: Partial<JsonRpcRequestPayload> | Partial<JsonRpcRequestPayload>[], onRequestComplete: JsonRpcRequestCallback | JsonRpcBatchRequestCallback): void;
    send<ResultType = any>(method: string, params?: any[]): PromiEvent<ResultType>;
    send(payload: JsonRpcRequestPayload | JsonRpcRequestPayload[], onRequestComplete: JsonRpcRequestCallback): void;
    send<ResultType>(payload: JsonRpcRequestPayload, none: void): JsonRpcResponsePayload<ResultType>;
    enable(): PromiEvent<string[], {
        done: (result: string[]) => void;
        error: (reason: any) => void;
        settled: () => void;
    }>;
    /**
     * Here, we wrap `BaseModule.request` with an additional check
     * to determine if the RPC method requires a test-mode prefix.
     */
    protected request<ResultType = any, Events extends EventsDefinition = void>(payload: Partial<JsonRpcRequestPayload>): PromiEvent<ResultType, Events extends void ? {
        done: (result: ResultType) => void;
        error: (reason: any) => void;
        settled: () => void;
    } : Events & {
        done: (result: ResultType) => void;
        error: (reason: any) => void;
        settled: () => void;
    }>;
    /**
     * Prefixes Ethereum RPC methods with a `testMode` identifier. This is done so
     * that Magic's <iframe> can handle signing methods using test-specific keys.
     */
    private prefixPayloadMethodForTestMode;
    on: (event: string | symbol, fn: (...args: any[]) => void, context?: any) => this;
    once: (event: string | symbol, fn: (...args: any[]) => void, context?: any) => this;
    addListener: (event: string | symbol, fn: (...args: any[]) => void, context?: any) => this;
    off: (event: string | symbol, fn?: ((...args: any[]) => void) | undefined, context?: any, once?: boolean | undefined) => this;
    removeListener: (event: string | symbol, fn?: ((...args: any[]) => void) | undefined, context?: any, once?: boolean | undefined) => this;
    removeAllListeners: (event?: string | symbol | undefined) => this;
    emit: <T extends string | symbol>(event: T, ...args: any[]) => boolean;
    eventNames: () => (string | symbol)[];
    listeners: <T extends string | symbol>(event: T) => ((...args: any[]) => void)[];
    listenerCount: (event: string | symbol) => number;
}

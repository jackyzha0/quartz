import { MagicIncomingWindowMessage, MagicOutgoingWindowMessage, JsonRpcRequestPayload, MagicMessageEvent, MagicMessageRequest } from '@magic-sdk/types';
import { JsonRpcResponse } from './json-rpc';
interface RemoveEventListenerFunction {
    (): void;
}
export declare abstract class ViewController {
    protected readonly endpoint: string;
    protected readonly parameters: string;
    ready: Promise<void>;
    protected readonly messageHandlers: Set<(event: MagicMessageEvent) => any>;
    /**
     * Create an instance of `ViewController`
     *
     * @param endpoint - The URL for the relevant iframe context.
     * @param parameters - The unique, encoded query parameters for the
     * relevant iframe context.
     */
    constructor(endpoint: string, parameters: string);
    protected abstract init(): void;
    protected abstract _post(data: MagicMessageRequest): Promise<void>;
    protected abstract hideOverlay(): void;
    protected abstract showOverlay(): void;
    /**
     * Send a payload to the Magic `<iframe>` for processing and automatically
     * handle the acknowledging follow-up event(s).
     *
     * @param msgType - The type of message to encode with the data.
     * @param payload - The JSON RPC payload to emit via `window.postMessage`.
     */
    post<ResultType = any>(msgType: MagicOutgoingWindowMessage, payload: JsonRpcRequestPayload[]): Promise<JsonRpcResponse<ResultType>[]>;
    post<ResultType = any>(msgType: MagicOutgoingWindowMessage, payload: JsonRpcRequestPayload): Promise<JsonRpcResponse<ResultType>>;
    /**
     * Listen for events received with the given `msgType`.
     *
     * @param msgType - The `msgType` encoded with the event data.
     * @param handler - A handler function to execute on each event received.
     * @return A `void` function to remove the attached event.
     */
    on(msgType: MagicIncomingWindowMessage, handler: (this: Window, event: MagicMessageEvent) => any): RemoveEventListenerFunction;
    private waitForReady;
    /**
     * Listen for messages sent from the underlying Magic `<WebView>`.
     */
    private listen;
}
export {};

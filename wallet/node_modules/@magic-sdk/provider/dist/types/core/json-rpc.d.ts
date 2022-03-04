import { JsonRpcRequestPayload, JsonRpcResponsePayload, JsonRpcError } from '@magic-sdk/types';
/**
 * Returns a full `JsonRpcRequestPayload` from a potentially incomplete payload
 * object. This method mutates the given `payload` to preserve compatibility
 * with external libraries that perform their own `JsonRpcRequestPayload.id`
 * check to associate responses (such as `web3`).
 *
 * This function is no-op if the payload has already been processed before.
 */
export declare function standardizeJsonRpcRequestPayload(payload: Partial<JsonRpcRequestPayload>): JsonRpcRequestPayload<any>;
/**
 * Build a valid JSON RPC payload for emitting to the Magic SDK iframe relayer.
 */
export declare function createJsonRpcRequestPayload(method: string, params?: any[]): JsonRpcRequestPayload;
/**
 * Formats and standardizes a JSON RPC 2.0 response from a number of potential
 * sources.
 */
export declare class JsonRpcResponse<ResultType = any> {
    private readonly _jsonrpc;
    private readonly _id;
    private _result?;
    private _error?;
    constructor(responsePayload: JsonRpcResponsePayload);
    constructor(response: JsonRpcResponse<ResultType>);
    constructor(requestPayload: JsonRpcRequestPayload);
    applyError(error?: JsonRpcError | null): this;
    applyResult(result?: ResultType | null): this;
    get hasError(): boolean;
    get hasResult(): boolean;
    get payload(): JsonRpcResponsePayload;
}

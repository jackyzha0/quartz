import { JsonRpcResponsePayload, JsonRpcError, JsonRpcRequestPayload } from './json-rpc-types';
export declare enum MagicIncomingWindowMessage {
    MAGIC_HANDLE_RESPONSE = "MAGIC_HANDLE_RESPONSE",
    MAGIC_OVERLAY_READY = "MAGIC_OVERLAY_READY",
    MAGIC_SHOW_OVERLAY = "MAGIC_SHOW_OVERLAY",
    MAGIC_HIDE_OVERLAY = "MAGIC_HIDE_OVERLAY",
    MAGIC_HANDLE_EVENT = "MAGIC_HANDLE_EVENT"
}
export declare enum MagicOutgoingWindowMessage {
    MAGIC_HANDLE_REQUEST = "MAGIC_HANDLE_REQUEST"
}
/** The shape of responding window message datas from the Magic iframe context. */
export interface MagicMessageRequest {
    msgType: string;
    payload: JsonRpcRequestPayload | JsonRpcRequestPayload[];
    rt?: string;
    jwt?: string;
}
/** The shape of responding window message datas from the Magic iframe context. */
export interface MagicMessageResponse<ResultType = any> {
    msgType: string;
    response: Partial<JsonRpcError> & Partial<JsonRpcResponsePayload<ResultType>>;
    rt?: string;
}
/** The expected message event returned by the Magic iframe context. */
export interface MagicMessageEvent extends Partial<MessageEvent> {
    data: MagicMessageResponse;
}

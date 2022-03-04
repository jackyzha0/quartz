/**
 * This file contains our type guards.
 *
 * Type guards are a feature of TypeScript which narrow the type signature of
 * intesection types (types that can be one thing or another).
 *
 * @see
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
 */
import { JsonRpcRequestPayload, JsonRpcResponsePayload, MagicPayloadMethod, RPCErrorCode } from '@magic-sdk/types';
/**
 * Assert `value` is a `JsonRpcRequestPayload` object.
 */
export declare function isJsonRpcRequestPayload(value?: JsonRpcRequestPayload): value is JsonRpcRequestPayload;
/**
 * Assert `value` is a `JsonRpcResponsePayload` object.
 */
export declare function isJsonRpcResponsePayload(value: any): value is JsonRpcResponsePayload;
/**
 * Assert `value` is a Magic SDK payload method identifier.
 */
export declare function isMagicPayloadMethod(value?: any): value is MagicPayloadMethod;
/**
 * Assert `value` is an expected JSON RPC error code.
 */
export declare function isJsonRpcErrorCode(value?: any): value is RPCErrorCode;
/**
 * Assert `value` is an empty, plain object.
 */
export declare function isEmpty(value?: any): value is {};

import { JsonRpcError, RPCErrorCode, SDKErrorCode, SDKWarningCode } from '@magic-sdk/types';
import { Extension } from '../modules/base-extension';
/**
 * This error type represents internal SDK errors. This could be developer
 * mistakes (or Magic's mistakes), or execution errors unrelated to standard
 * JavaScript exceptions.
 */
export declare class MagicSDKError extends Error {
    code: SDKErrorCode;
    rawMessage: string;
    __proto__: ErrorConstructor;
    constructor(code: SDKErrorCode, rawMessage: string);
}
/**
 * This error type communicates exceptions that occur during execution in the
 * Magic `<iframe>` context.
 */
export declare class MagicRPCError extends Error {
    __proto__: ErrorConstructor;
    code: RPCErrorCode | number;
    rawMessage: string;
    constructor(sourceError?: JsonRpcError | null);
}
/**
 * In contrast to `SDKError` objects, this "warning" type communicates important
 * context that does not rise to the level of an exception. These should be
 * logged rather than thrown.
 */
export declare class MagicSDKWarning {
    code: SDKWarningCode;
    rawMessage: string;
    message: string;
    constructor(code: SDKWarningCode, rawMessage: string);
    /**
     * Logs this warning to the console.
     */
    log(): void;
}
/**
 * This error type is reserved for communicating errors that arise during
 * execution of Magic SDK Extension methods. Compare this to the `SDKError`
 * type, specifically in context of Extensions.
 */
export declare class MagicExtensionError<TData = any> extends Error {
    code: string | number;
    rawMessage: string;
    data: TData;
    __proto__: ErrorConstructor;
    constructor(ext: Extension<string>, code: string | number, rawMessage: string, data: TData);
}
/**
 * In contrast to `MagicExtensionError` objects, this "warning" type
 * communicates important context that does not rise to the level of an
 * exception. These should be logged rather than thrown.
 */
export declare class MagicExtensionWarning {
    code: string | number;
    rawMessage: string;
    message: string;
    constructor(ext: Extension<string>, code: string | number, rawMessage: string);
    /**
     * Logs this warning to the console.
     */
    log(): void;
}
export declare function createMissingApiKeyError(): MagicSDKError;
export declare function createModalNotReadyError(): MagicSDKError;
export declare function createMalformedResponseError(): MagicSDKError;
export declare function createExtensionNotInitializedError(member: string): MagicSDKError;
export declare function createIncompatibleExtensionsError(extensions: Extension<string>[]): MagicSDKError;
export declare function createInvalidArgumentError(options: {
    procedure: string;
    argument: number;
    expected: string;
    received: string;
}): MagicSDKError;
export declare function createDuplicateIframeWarning(): MagicSDKWarning;
export declare function createSynchronousWeb3MethodWarning(): MagicSDKWarning;
export declare function createReactNativeEndpointConfigurationWarning(): MagicSDKWarning;
export declare function createDeprecationWarning(options: {
    method: string;
    removalVersions: {
        [P in 'magic-sdk' | '@magic-sdk/react-native']: string;
    };
    useInstead?: string;
}): MagicSDKWarning;

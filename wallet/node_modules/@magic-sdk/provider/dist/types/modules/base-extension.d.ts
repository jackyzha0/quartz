import { createJsonRpcRequestPayload, standardizeJsonRpcRequestPayload } from '../core/json-rpc';
import { BaseModule } from './base-module';
import { SDKBase, MagicSDKAdditionalConfiguration, MagicSDKExtensionsOption } from '../core/sdk';
import { MagicExtensionError, MagicExtensionWarning } from '../core/sdk-exceptions';
import { createPromiEvent, encodeJSON, decodeJSON, storage, isPromiEvent } from '../util';
declare type AnonymousExtension = 'anonymous extension';
interface BaseExtension<TName extends string = AnonymousExtension> extends BaseModule {
    /**
     * A structure describing the platform and version compatiblity of this
     * extension.
     */
    compat?: {
        'magic-sdk': boolean | string;
        '@magic-sdk/react-native': boolean | string;
    };
}
declare abstract class BaseExtension<TName extends string = AnonymousExtension> extends BaseModule {
    abstract readonly name: TName;
    private __sdk_access_field_descriptors__;
    private __is_initialized__;
    protected utils: {
        createPromiEvent: typeof createPromiEvent;
        isPromiEvent: typeof isPromiEvent;
        encodeJSON: typeof encodeJSON;
        decodeJSON: typeof decodeJSON;
        createJsonRpcRequestPayload: typeof createJsonRpcRequestPayload;
        standardizeJsonRpcRequestPayload: typeof standardizeJsonRpcRequestPayload;
        storage: typeof storage;
    };
    constructor();
    /**
     * Registers a Magic SDK instance with this Extension.
     *
     * @internal
     */
    init(sdk: SDKBase): void;
    /**
     * Creates a deprecation warning wrapped with a native Magic SDK warning type.
     * Best practice is to warn users of upcoming deprecations at least one major
     * version before the change is implemented. You can use this method to
     * communicate deprecations in a manner consistent with Magic SDK core code.
     */
    protected createDeprecationWarning(options: {
        method: string;
        removalVersion: string;
        useInstead?: string;
    }): MagicExtensionWarning;
    /**
     * Creates a warning wrapped with a native Magic SDK warning type. This
     * maintains consistency in warning messaging for consumers of Magic SDK and
     * this Extension.
     */
    protected createWarning(code: string | number, message: string): MagicExtensionWarning;
    /**
     * Creates an error wrapped with a native Magic SDK error type. This maintains
     * consistency in error handling for consumers of Magic SDK and this
     * Extension.
     */
    protected createError<TData = any>(code: string | number, message: string, data: TData): MagicExtensionError<TData>;
}
declare abstract class InternalExtension<TName extends string, TConfig extends any = any> extends BaseExtension<TName> {
    abstract readonly config: TConfig;
}
/**
 * A base class representing "extensions" to the core Magic JS APIs. Extensions
 * enable new functionality by composing Magic endpoints methods together.
 */
export declare abstract class Extension<TName extends string = AnonymousExtension> extends BaseExtension<TName> {
    /**
     * This is a special constructor used to mark "official" extensions. These
     * extensions are designed for special interaction with the Magic iframe using
     * custom JSON RPC methods, business logic, and global configurations. This is
     * intended for internal-use only (and provides no useful advantage to
     * open-source extension developers over the regular `Extension` class).
     *
     * @internal
     */
    static Internal: typeof InternalExtension;
    static Anonymous: AnonymousExtension;
}
/**
 * These fields are exposed on the `Extension` type,
 * but should be hidden from the public interface.
 */
declare type HiddenExtensionFields = 'name' | 'init' | 'config' | 'compat';
/**
 * Gets the type contained in an array type.
 */
declare type UnwrapArray<T extends any[]> = T extends Array<infer P> ? P : never;
/**
 * Create a union type of Extension names from an
 * array of Extension types given by `TExt`.
 */
declare type ExtensionNames<TExt extends Extension<string>[]> = UnwrapArray<TExt> extends Extension<infer R> ? R : never;
/**
 * From the literal Extension name type given by `TExtName`,
 * extract a dictionary of Extension types.
 */
declare type GetExtensionFromName<TExt extends Extension<string>[], TExtName extends string> = {
    [P in TExtName]: Extract<UnwrapArray<TExt>, Extension<TExtName>>;
}[TExtName];
/**
 * Wraps a Magic SDK constructor with the necessary type
 * information to support a strongly-typed `Extension` interface.
 */
export declare type WithExtensions<SDK extends SDKBase> = {
    new <TCustomExtName extends string, TExt extends MagicSDKExtensionsOption<TCustomExtName>>(apiKey: string, options?: MagicSDKAdditionalConfiguration<TCustomExtName, TExt>): InstanceWithExtensions<SDK, TExt>;
};
export declare type InstanceWithExtensions<SDK extends SDKBase, TExt extends MagicSDKExtensionsOption> = SDK & {
    [P in Exclude<TExt extends Extension<string>[] ? ExtensionNames<TExt> : keyof TExt, number | AnonymousExtension>]: TExt extends Extension<string>[] ? Omit<GetExtensionFromName<TExt, P>, HiddenExtensionFields> : TExt extends {
        [P in Exclude<TExt extends Extension<string>[] ? ExtensionNames<TExt> : keyof TExt, number | AnonymousExtension>]: Extension<string>;
    } ? Omit<TExt[P], HiddenExtensionFields> : never;
};
export {};

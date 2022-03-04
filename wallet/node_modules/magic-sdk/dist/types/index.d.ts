import { SDKBase, InstanceWithExtensions, MagicSDKExtensionsOption } from '@magic-sdk/provider';
export * from '@magic-sdk/commons';
export declare const Magic: import("@magic-sdk/provider").WithExtensions<SDKBase>;
export declare type Magic<T extends MagicSDKExtensionsOption<any> = MagicSDKExtensionsOption> = InstanceWithExtensions<SDKBase, T>;

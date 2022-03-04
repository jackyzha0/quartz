import { SDKBase } from '@magic-sdk/provider';
import * as publicAPI from '@magic-sdk/commons';
declare const Magic: import("@magic-sdk/provider").WithExtensions<SDKBase> & {
    Extension: typeof publicAPI.Extension;
    SDKError: typeof publicAPI.SDKError;
    ExtensionError: typeof publicAPI.ExtensionError;
    ExtensionWarning: typeof publicAPI.ExtensionWarning;
    RPCError: typeof publicAPI.RPCError;
    SDKWarning: typeof publicAPI.SDKWarning;
    isPromiEvent: typeof publicAPI.isPromiEvent;
    SDKErrorCode: typeof publicAPI.SDKErrorCode;
    SDKWarningCode: typeof publicAPI.SDKWarningCode;
    RPCErrorCode: typeof publicAPI.RPCErrorCode;
    MagicPayloadMethod: typeof publicAPI.MagicPayloadMethod;
    MagicIncomingWindowMessage: typeof publicAPI.MagicIncomingWindowMessage;
    MagicOutgoingWindowMessage: typeof publicAPI.MagicOutgoingWindowMessage;
    EthChainType: typeof publicAPI.EthChainType;
};
export default Magic;

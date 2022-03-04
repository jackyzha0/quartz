export declare enum SDKErrorCode {
    MissingApiKey = "MISSING_API_KEY",
    ModalNotReady = "MODAL_NOT_READY",
    MalformedResponse = "MALFORMED_RESPONSE",
    InvalidArgument = "INVALID_ARGUMENT",
    ExtensionNotInitialized = "EXTENSION_NOT_INITIALIZED",
    IncompatibleExtensions = "INCOMPATIBLE_EXTENSIONS"
}
export declare enum SDKWarningCode {
    SyncWeb3Method = "SYNC_WEB3_METHOD",
    DuplicateIframe = "DUPLICATE_IFRAME",
    ReactNativeEndpointConfiguration = "REACT_NATIVE_ENDPOINT_CONFIGURATION",
    DeprecationNotice = "DEPRECATION_NOTICE"
}
export declare enum RPCErrorCode {
    ParseError = -32700,
    InvalidRequest = -32600,
    MethodNotFound = -32601,
    InvalidParams = -32602,
    InternalError = -32603,
    MagicLinkFailedVerification = -10000,
    MagicLinkExpired = -10001,
    MagicLinkRateLimited = -10002,
    MagicLinkInvalidRedirectURL = -10006,
    UserAlreadyLoggedIn = -10003,
    UpdateEmailFailed = -10004,
    UserRequestEditEmail = -10005,
    InactiveRecipient = -10010,
    AccessDeniedToUser = -10011
}
export declare type ErrorCode = SDKErrorCode | RPCErrorCode;
export declare type WarningCode = SDKWarningCode;

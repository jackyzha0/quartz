"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketProvider = void 0;
var properties_1 = require("@ethersproject/properties");
var logger_1 = require("@ethersproject/logger");
var _version_1 = require("./_version");
var logger = new logger_1.Logger(_version_1.version);
var url_json_rpc_provider_1 = require("./url-json-rpc-provider");
// These are load-balancer-based application IDs
var defaultApplicationIds = {
    homestead: "6004bcd10040261633ade990",
    ropsten: "6004bd4d0040261633ade991",
    rinkeby: "6004bda20040261633ade994",
    goerli: "6004bd860040261633ade992",
};
var PocketProvider = /** @class */ (function (_super) {
    __extends(PocketProvider, _super);
    function PocketProvider(network, apiKey) {
        // We need a bit of creativity in the constructor because
        // Pocket uses different default API keys based on the network
        var _newTarget = this.constructor;
        var _this = this;
        if (apiKey == null) {
            var n = (0, properties_1.getStatic)(_newTarget, "getNetwork")(network);
            if (n) {
                var applicationId = defaultApplicationIds[n.name];
                if (applicationId) {
                    apiKey = {
                        applicationId: applicationId,
                        loadBalancer: true
                    };
                }
            }
            // If there was any issue above, we don't know this network
            if (apiKey == null) {
                logger.throwError("unsupported network", logger_1.Logger.errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
            }
        }
        _this = _super.call(this, network, apiKey) || this;
        return _this;
    }
    PocketProvider.getApiKey = function (apiKey) {
        // Most API Providers allow null to get the default configuration, but
        // Pocket requires the network to decide the default provider, so we
        // rely on hijacking the constructor to add a sensible default for us
        if (apiKey == null) {
            logger.throwArgumentError("PocketProvider.getApiKey does not support null apiKey", "apiKey", apiKey);
        }
        var apiKeyObj = {
            applicationId: null,
            loadBalancer: false,
            applicationSecretKey: null
        };
        // Parse applicationId and applicationSecretKey
        if (typeof (apiKey) === "string") {
            apiKeyObj.applicationId = apiKey;
        }
        else if (apiKey.applicationSecretKey != null) {
            logger.assertArgument((typeof (apiKey.applicationId) === "string"), "applicationSecretKey requires an applicationId", "applicationId", apiKey.applicationId);
            logger.assertArgument((typeof (apiKey.applicationSecretKey) === "string"), "invalid applicationSecretKey", "applicationSecretKey", "[REDACTED]");
            apiKeyObj.applicationId = apiKey.applicationId;
            apiKeyObj.applicationSecretKey = apiKey.applicationSecretKey;
            apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
        }
        else if (apiKey.applicationId) {
            logger.assertArgument((typeof (apiKey.applicationId) === "string"), "apiKey.applicationId must be a string", "apiKey.applicationId", apiKey.applicationId);
            apiKeyObj.applicationId = apiKey.applicationId;
            apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
        }
        else {
            logger.throwArgumentError("unsupported PocketProvider apiKey", "apiKey", apiKey);
        }
        return apiKeyObj;
    };
    PocketProvider.getUrl = function (network, apiKey) {
        var host = null;
        switch (network ? network.name : "unknown") {
            case "homestead":
                host = "eth-mainnet.gateway.pokt.network";
                break;
            case "ropsten":
                host = "eth-ropsten.gateway.pokt.network";
                break;
            case "rinkeby":
                host = "eth-rinkeby.gateway.pokt.network";
                break;
            case "goerli":
                host = "eth-goerli.gateway.pokt.network";
                break;
            default:
                logger.throwError("unsupported network", logger_1.Logger.errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
        }
        var url = null;
        if (apiKey.loadBalancer) {
            url = "https://" + host + "/v1/lb/" + apiKey.applicationId;
        }
        else {
            url = "https://" + host + "/v1/" + apiKey.applicationId;
        }
        var connection = { url: url };
        // Initialize empty headers
        connection.headers = {};
        // Apply application secret key
        if (apiKey.applicationSecretKey != null) {
            connection.user = "";
            connection.password = apiKey.applicationSecretKey;
        }
        return connection;
    };
    PocketProvider.prototype.isCommunityResource = function () {
        return (this.applicationId === defaultApplicationIds[this.network.name]);
    };
    return PocketProvider;
}(url_json_rpc_provider_1.UrlJsonRpcProvider));
exports.PocketProvider = PocketProvider;
//# sourceMappingURL=pocket-provider.js.map
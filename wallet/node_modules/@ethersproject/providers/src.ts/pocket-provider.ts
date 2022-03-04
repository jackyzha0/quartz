"use strict";

import { Network, Networkish } from "@ethersproject/networks";
import { getStatic } from "@ethersproject/properties";
import { ConnectionInfo } from "@ethersproject/web";

import { Logger } from "@ethersproject/logger";
import { version } from "./_version";
const logger = new Logger(version);

import { UrlJsonRpcProvider } from "./url-json-rpc-provider";

// These are load-balancer-based application IDs
const defaultApplicationIds: Record<string, string> = {
    homestead: "6004bcd10040261633ade990",
    ropsten: "6004bd4d0040261633ade991",
    rinkeby: "6004bda20040261633ade994",
    goerli: "6004bd860040261633ade992",
};

export class PocketProvider extends UrlJsonRpcProvider {
    readonly applicationId: string;
    readonly applicationSecretKey: string;
    readonly loadBalancer: boolean;

    constructor(network?: Networkish, apiKey?: any) {
        // We need a bit of creativity in the constructor because
        // Pocket uses different default API keys based on the network

        if (apiKey == null) {
            const n = getStatic<(network: Networkish) => Network>(new.target, "getNetwork")(network);
            if (n) {
                const applicationId = defaultApplicationIds[n.name];
                if (applicationId) {
                    apiKey = {
                        applicationId: applicationId,
                        loadBalancer: true
                    };
                }
            }

            // If there was any issue above, we don't know this network
            if (apiKey == null) {
                logger.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
            }

        }

        super(network, apiKey);
    }

    static getApiKey(apiKey: any): any {
        // Most API Providers allow null to get the default configuration, but
        // Pocket requires the network to decide the default provider, so we
        // rely on hijacking the constructor to add a sensible default for us

        if (apiKey == null) {
            logger.throwArgumentError("PocketProvider.getApiKey does not support null apiKey", "apiKey", apiKey);
        }

        const apiKeyObj: { applicationId: string, applicationSecretKey: string, loadBalancer: boolean } = {
            applicationId: null,
            loadBalancer: false,
            applicationSecretKey: null
        };

        // Parse applicationId and applicationSecretKey
        if (typeof (apiKey) === "string") {
            apiKeyObj.applicationId = apiKey;

        } else if (apiKey.applicationSecretKey != null) {
            logger.assertArgument((typeof (apiKey.applicationId) === "string"),
                "applicationSecretKey requires an applicationId", "applicationId", apiKey.applicationId);
            logger.assertArgument((typeof (apiKey.applicationSecretKey) === "string"),
                "invalid applicationSecretKey", "applicationSecretKey", "[REDACTED]");

            apiKeyObj.applicationId = apiKey.applicationId;
            apiKeyObj.applicationSecretKey = apiKey.applicationSecretKey;
            apiKeyObj.loadBalancer = !!apiKey.loadBalancer;

        } else if (apiKey.applicationId) {
            logger.assertArgument((typeof (apiKey.applicationId) === "string"),
                "apiKey.applicationId must be a string", "apiKey.applicationId", apiKey.applicationId);

            apiKeyObj.applicationId = apiKey.applicationId;
            apiKeyObj.loadBalancer = !!apiKey.loadBalancer;

        } else {
            logger.throwArgumentError("unsupported PocketProvider apiKey", "apiKey", apiKey);
        }

        return apiKeyObj;
    }

    static getUrl(network: Network, apiKey: any): ConnectionInfo {
        let host: string = null;
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
                logger.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
        }

        let url = null;
        if (apiKey.loadBalancer) {
            url = `https:/\/${ host }/v1/lb/${ apiKey.applicationId }`
        } else {
            url = `https:/\/${ host }/v1/${ apiKey.applicationId }`
        }

        const connection: ConnectionInfo = { url };

        // Initialize empty headers
        connection.headers = {}

        // Apply application secret key
        if (apiKey.applicationSecretKey != null) {
            connection.user = "";
            connection.password = apiKey.applicationSecretKey
        }

        return connection;
    }

    isCommunityResource(): boolean {
        return (this.applicationId === defaultApplicationIds[this.network.name]);
    }
}

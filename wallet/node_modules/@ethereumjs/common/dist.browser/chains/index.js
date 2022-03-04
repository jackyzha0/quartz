"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = exports._getInitializedChains = void 0;
var mainnet_json_1 = __importDefault(require("./mainnet.json"));
var ropsten_json_1 = __importDefault(require("./ropsten.json"));
var rinkeby_json_1 = __importDefault(require("./rinkeby.json"));
var kovan_json_1 = __importDefault(require("./kovan.json"));
var goerli_json_1 = __importDefault(require("./goerli.json"));
var sepolia_json_1 = __importDefault(require("./sepolia.json"));
/**
 * @hidden
 */
function _getInitializedChains(customChains) {
    var e_1, _a;
    var names = {
        '1': 'mainnet',
        '3': 'ropsten',
        '4': 'rinkeby',
        '42': 'kovan',
        '5': 'goerli',
        '11155111': 'sepolia',
    };
    var chains = {
        mainnet: mainnet_json_1.default,
        ropsten: ropsten_json_1.default,
        rinkeby: rinkeby_json_1.default,
        kovan: kovan_json_1.default,
        goerli: goerli_json_1.default,
        sepolia: sepolia_json_1.default,
    };
    if (customChains) {
        try {
            for (var customChains_1 = __values(customChains), customChains_1_1 = customChains_1.next(); !customChains_1_1.done; customChains_1_1 = customChains_1.next()) {
                var chain = customChains_1_1.value;
                var name_1 = chain.name;
                names[chain.chainId.toString()] = name_1;
                chains[name_1] = chain;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (customChains_1_1 && !customChains_1_1.done && (_a = customChains_1.return)) _a.call(customChains_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    chains['names'] = names;
    return chains;
}
exports._getInitializedChains = _getInitializedChains;
/**
 * @deprecated this constant will be internalized (removed)
 * on next major version update
 */
exports.chains = _getInitializedChains();
//# sourceMappingURL=index.js.map
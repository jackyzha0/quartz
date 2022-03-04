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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProvider = exports.Resolver = exports.Event = void 0;
var abstract_provider_1 = require("@ethersproject/abstract-provider");
var basex_1 = require("@ethersproject/basex");
var bignumber_1 = require("@ethersproject/bignumber");
var bytes_1 = require("@ethersproject/bytes");
var constants_1 = require("@ethersproject/constants");
var hash_1 = require("@ethersproject/hash");
var networks_1 = require("@ethersproject/networks");
var properties_1 = require("@ethersproject/properties");
var sha2_1 = require("@ethersproject/sha2");
var strings_1 = require("@ethersproject/strings");
var web_1 = require("@ethersproject/web");
var bech32_1 = __importDefault(require("bech32"));
var logger_1 = require("@ethersproject/logger");
var _version_1 = require("./_version");
var logger = new logger_1.Logger(_version_1.version);
var formatter_1 = require("./formatter");
//////////////////////////////
// Event Serializeing
function checkTopic(topic) {
    if (topic == null) {
        return "null";
    }
    if ((0, bytes_1.hexDataLength)(topic) !== 32) {
        logger.throwArgumentError("invalid topic", "topic", topic);
    }
    return topic.toLowerCase();
}
function serializeTopics(topics) {
    // Remove trailing null AND-topics; they are redundant
    topics = topics.slice();
    while (topics.length > 0 && topics[topics.length - 1] == null) {
        topics.pop();
    }
    return topics.map(function (topic) {
        if (Array.isArray(topic)) {
            // Only track unique OR-topics
            var unique_1 = {};
            topic.forEach(function (topic) {
                unique_1[checkTopic(topic)] = true;
            });
            // The order of OR-topics does not matter
            var sorted = Object.keys(unique_1);
            sorted.sort();
            return sorted.join("|");
        }
        else {
            return checkTopic(topic);
        }
    }).join("&");
}
function deserializeTopics(data) {
    if (data === "") {
        return [];
    }
    return data.split(/&/g).map(function (topic) {
        if (topic === "") {
            return [];
        }
        var comps = topic.split("|").map(function (topic) {
            return ((topic === "null") ? null : topic);
        });
        return ((comps.length === 1) ? comps[0] : comps);
    });
}
function getEventTag(eventName) {
    if (typeof (eventName) === "string") {
        eventName = eventName.toLowerCase();
        if ((0, bytes_1.hexDataLength)(eventName) === 32) {
            return "tx:" + eventName;
        }
        if (eventName.indexOf(":") === -1) {
            return eventName;
        }
    }
    else if (Array.isArray(eventName)) {
        return "filter:*:" + serializeTopics(eventName);
    }
    else if (abstract_provider_1.ForkEvent.isForkEvent(eventName)) {
        logger.warn("not implemented");
        throw new Error("not implemented");
    }
    else if (eventName && typeof (eventName) === "object") {
        return "filter:" + (eventName.address || "*") + ":" + serializeTopics(eventName.topics || []);
    }
    throw new Error("invalid event - " + eventName);
}
//////////////////////////////
// Helper Object
function getTime() {
    return (new Date()).getTime();
}
function stall(duration) {
    return new Promise(function (resolve) {
        setTimeout(resolve, duration);
    });
}
//////////////////////////////
// Provider Object
/**
 *  EventType
 *   - "block"
 *   - "poll"
 *   - "didPoll"
 *   - "pending"
 *   - "error"
 *   - "network"
 *   - filter
 *   - topics array
 *   - transaction hash
 */
var PollableEvents = ["block", "network", "pending", "poll"];
var Event = /** @class */ (function () {
    function Event(tag, listener, once) {
        (0, properties_1.defineReadOnly)(this, "tag", tag);
        (0, properties_1.defineReadOnly)(this, "listener", listener);
        (0, properties_1.defineReadOnly)(this, "once", once);
    }
    Object.defineProperty(Event.prototype, "event", {
        get: function () {
            switch (this.type) {
                case "tx":
                    return this.hash;
                case "filter":
                    return this.filter;
            }
            return this.tag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "type", {
        get: function () {
            return this.tag.split(":")[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "hash", {
        get: function () {
            var comps = this.tag.split(":");
            if (comps[0] !== "tx") {
                return null;
            }
            return comps[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "filter", {
        get: function () {
            var comps = this.tag.split(":");
            if (comps[0] !== "filter") {
                return null;
            }
            var address = comps[1];
            var topics = deserializeTopics(comps[2]);
            var filter = {};
            if (topics.length > 0) {
                filter.topics = topics;
            }
            if (address && address !== "*") {
                filter.address = address;
            }
            return filter;
        },
        enumerable: false,
        configurable: true
    });
    Event.prototype.pollable = function () {
        return (this.tag.indexOf(":") >= 0 || PollableEvents.indexOf(this.tag) >= 0);
    };
    return Event;
}());
exports.Event = Event;
;
// https://github.com/satoshilabs/slips/blob/master/slip-0044.md
var coinInfos = {
    "0": { symbol: "btc", p2pkh: 0x00, p2sh: 0x05, prefix: "bc" },
    "2": { symbol: "ltc", p2pkh: 0x30, p2sh: 0x32, prefix: "ltc" },
    "3": { symbol: "doge", p2pkh: 0x1e, p2sh: 0x16 },
    "60": { symbol: "eth", ilk: "eth" },
    "61": { symbol: "etc", ilk: "eth" },
    "700": { symbol: "xdai", ilk: "eth" },
};
function bytes32ify(value) {
    return (0, bytes_1.hexZeroPad)(bignumber_1.BigNumber.from(value).toHexString(), 32);
}
// Compute the Base58Check encoded data (checksum is first 4 bytes of sha256d)
function base58Encode(data) {
    return basex_1.Base58.encode((0, bytes_1.concat)([data, (0, bytes_1.hexDataSlice)((0, sha2_1.sha256)((0, sha2_1.sha256)(data)), 0, 4)]));
}
var matcherIpfs = new RegExp("^(ipfs):/\/(.*)$", "i");
var matchers = [
    new RegExp("^(https):/\/(.*)$", "i"),
    new RegExp("^(data):(.*)$", "i"),
    matcherIpfs,
    new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i"),
];
function _parseString(result) {
    try {
        return (0, strings_1.toUtf8String)(_parseBytes(result));
    }
    catch (error) { }
    return null;
}
function _parseBytes(result) {
    if (result === "0x") {
        return null;
    }
    var offset = bignumber_1.BigNumber.from((0, bytes_1.hexDataSlice)(result, 0, 32)).toNumber();
    var length = bignumber_1.BigNumber.from((0, bytes_1.hexDataSlice)(result, offset, offset + 32)).toNumber();
    return (0, bytes_1.hexDataSlice)(result, offset + 32, offset + 32 + length);
}
// Trim off the ipfs:// prefix and return the default gateway URL
function getIpfsLink(link) {
    if (link.match(/^ipfs:\/\/ipfs\//i)) {
        link = link.substring(12);
    }
    else if (link.match(/^ipfs:\/\//i)) {
        link = link.substring(7);
    }
    else {
        logger.throwArgumentError("unsupported IPFS format", "link", link);
    }
    return "https://gateway.ipfs.io/ipfs/" + link;
}
var Resolver = /** @class */ (function () {
    // The resolvedAddress is only for creating a ReverseLookup resolver
    function Resolver(provider, address, name, resolvedAddress) {
        (0, properties_1.defineReadOnly)(this, "provider", provider);
        (0, properties_1.defineReadOnly)(this, "name", name);
        (0, properties_1.defineReadOnly)(this, "address", provider.formatter.address(address));
        (0, properties_1.defineReadOnly)(this, "_resolvedAddress", resolvedAddress);
    }
    Resolver.prototype._fetchBytes = function (selector, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tx = {
                            to: this.address,
                            data: (0, bytes_1.hexConcat)([selector, (0, hash_1.namehash)(this.name), (parameters || "0x")])
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = _parseBytes;
                        return [4 /*yield*/, this.provider.call(tx)];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    case 3:
                        error_1 = _b.sent();
                        if (error_1.code === logger_1.Logger.errors.CALL_EXCEPTION) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Resolver.prototype._getAddress = function (coinType, hexBytes) {
        var coinInfo = coinInfos[String(coinType)];
        if (coinInfo == null) {
            logger.throwError("unsupported coin type: " + coinType, logger_1.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "getAddress(" + coinType + ")"
            });
        }
        if (coinInfo.ilk === "eth") {
            return this.provider.formatter.address(hexBytes);
        }
        var bytes = (0, bytes_1.arrayify)(hexBytes);
        // P2PKH: OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
        if (coinInfo.p2pkh != null) {
            var p2pkh = hexBytes.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
            if (p2pkh) {
                var length_1 = parseInt(p2pkh[1], 16);
                if (p2pkh[2].length === length_1 * 2 && length_1 >= 1 && length_1 <= 75) {
                    return base58Encode((0, bytes_1.concat)([[coinInfo.p2pkh], ("0x" + p2pkh[2])]));
                }
            }
        }
        // P2SH: OP_HASH160 <scriptHash> OP_EQUAL
        if (coinInfo.p2sh != null) {
            var p2sh = hexBytes.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
            if (p2sh) {
                var length_2 = parseInt(p2sh[1], 16);
                if (p2sh[2].length === length_2 * 2 && length_2 >= 1 && length_2 <= 75) {
                    return base58Encode((0, bytes_1.concat)([[coinInfo.p2sh], ("0x" + p2sh[2])]));
                }
            }
        }
        // Bech32
        if (coinInfo.prefix != null) {
            var length_3 = bytes[1];
            // https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki#witness-program
            var version_1 = bytes[0];
            if (version_1 === 0x00) {
                if (length_3 !== 20 && length_3 !== 32) {
                    version_1 = -1;
                }
            }
            else {
                version_1 = -1;
            }
            if (version_1 >= 0 && bytes.length === 2 + length_3 && length_3 >= 1 && length_3 <= 75) {
                var words = bech32_1.default.toWords(bytes.slice(2));
                words.unshift(version_1);
                return bech32_1.default.encode(coinInfo.prefix, words);
            }
        }
        return null;
    };
    Resolver.prototype.getAddress = function (coinType) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, hexBytes_1, error_2, hexBytes, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (coinType == null) {
                            coinType = 60;
                        }
                        if (!(coinType === 60)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        transaction = {
                            to: this.address,
                            data: ("0x3b3b57de" + (0, hash_1.namehash)(this.name).substring(2))
                        };
                        return [4 /*yield*/, this.provider.call(transaction)];
                    case 2:
                        hexBytes_1 = _a.sent();
                        // No address
                        if (hexBytes_1 === "0x" || hexBytes_1 === constants_1.HashZero) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, this.provider.formatter.callAddress(hexBytes_1)];
                    case 3:
                        error_2 = _a.sent();
                        if (error_2.code === logger_1.Logger.errors.CALL_EXCEPTION) {
                            return [2 /*return*/, null];
                        }
                        throw error_2;
                    case 4: return [4 /*yield*/, this._fetchBytes("0xf1cb7e06", bytes32ify(coinType))];
                    case 5:
                        hexBytes = _a.sent();
                        // No address
                        if (hexBytes == null || hexBytes === "0x") {
                            return [2 /*return*/, null];
                        }
                        address = this._getAddress(coinType, hexBytes);
                        if (address == null) {
                            logger.throwError("invalid or unsupported coin data", logger_1.Logger.errors.UNSUPPORTED_OPERATION, {
                                operation: "getAddress(" + coinType + ")",
                                coinType: coinType,
                                data: hexBytes
                            });
                        }
                        return [2 /*return*/, address];
                }
            });
        });
    };
    Resolver.prototype.getAvatar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var linkage, avatar, i, match, scheme, _a, selector, owner, _b, comps, addr, tokenId, tokenOwner, _c, _d, balance, _e, _f, tx, metadataUrl, _g, metadata, imageUrl, ipfs, error_3;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        linkage = [{ type: "name", content: this.name }];
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 19, , 20]);
                        return [4 /*yield*/, this.getText("avatar")];
                    case 2:
                        avatar = _h.sent();
                        if (avatar == null) {
                            return [2 /*return*/, null];
                        }
                        i = 0;
                        _h.label = 3;
                    case 3:
                        if (!(i < matchers.length)) return [3 /*break*/, 18];
                        match = avatar.match(matchers[i]);
                        if (match == null) {
                            return [3 /*break*/, 17];
                        }
                        scheme = match[1].toLowerCase();
                        _a = scheme;
                        switch (_a) {
                            case "https": return [3 /*break*/, 4];
                            case "data": return [3 /*break*/, 5];
                            case "ipfs": return [3 /*break*/, 6];
                            case "erc721": return [3 /*break*/, 7];
                            case "erc1155": return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 17];
                    case 4:
                        linkage.push({ type: "url", content: avatar });
                        return [2 /*return*/, { linkage: linkage, url: avatar }];
                    case 5:
                        linkage.push({ type: "data", content: avatar });
                        return [2 /*return*/, { linkage: linkage, url: avatar }];
                    case 6:
                        linkage.push({ type: "ipfs", content: avatar });
                        return [2 /*return*/, { linkage: linkage, url: getIpfsLink(avatar) }];
                    case 7:
                        selector = (scheme === "erc721") ? "0xc87b56dd" : "0x0e89341c";
                        linkage.push({ type: scheme, content: avatar });
                        _b = this._resolvedAddress;
                        if (_b) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.getAddress()];
                    case 8:
                        _b = (_h.sent());
                        _h.label = 9;
                    case 9:
                        owner = (_b);
                        comps = (match[2] || "").split("/");
                        if (comps.length !== 2) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.provider.formatter.address(comps[0])];
                    case 10:
                        addr = _h.sent();
                        tokenId = (0, bytes_1.hexZeroPad)(bignumber_1.BigNumber.from(comps[1]).toHexString(), 32);
                        if (!(scheme === "erc721")) return [3 /*break*/, 12];
                        _d = (_c = this.provider.formatter).callAddress;
                        return [4 /*yield*/, this.provider.call({
                                to: addr, data: (0, bytes_1.hexConcat)(["0x6352211e", tokenId])
                            })];
                    case 11:
                        tokenOwner = _d.apply(_c, [_h.sent()]);
                        if (owner !== tokenOwner) {
                            return [2 /*return*/, null];
                        }
                        linkage.push({ type: "owner", content: tokenOwner });
                        return [3 /*break*/, 14];
                    case 12:
                        if (!(scheme === "erc1155")) return [3 /*break*/, 14];
                        _f = (_e = bignumber_1.BigNumber).from;
                        return [4 /*yield*/, this.provider.call({
                                to: addr, data: (0, bytes_1.hexConcat)(["0x00fdd58e", (0, bytes_1.hexZeroPad)(owner, 32), tokenId])
                            })];
                    case 13:
                        balance = _f.apply(_e, [_h.sent()]);
                        if (balance.isZero()) {
                            return [2 /*return*/, null];
                        }
                        linkage.push({ type: "balance", content: balance.toString() });
                        _h.label = 14;
                    case 14:
                        tx = {
                            to: this.provider.formatter.address(comps[0]),
                            data: (0, bytes_1.hexConcat)([selector, tokenId])
                        };
                        _g = _parseString;
                        return [4 /*yield*/, this.provider.call(tx)];
                    case 15:
                        metadataUrl = _g.apply(void 0, [_h.sent()]);
                        if (metadataUrl == null) {
                            return [2 /*return*/, null];
                        }
                        linkage.push({ type: "metadata-url-base", content: metadataUrl });
                        // ERC-1155 allows a generic {id} in the URL
                        if (scheme === "erc1155") {
                            metadataUrl = metadataUrl.replace("{id}", tokenId.substring(2));
                            linkage.push({ type: "metadata-url-expanded", content: metadataUrl });
                        }
                        // Transform IPFS metadata links
                        if (metadataUrl.match(/^ipfs:/i)) {
                            metadataUrl = getIpfsLink(metadataUrl);
                        }
                        linkage.push({ type: "metadata-url", content: metadataUrl });
                        return [4 /*yield*/, (0, web_1.fetchJson)(metadataUrl)];
                    case 16:
                        metadata = _h.sent();
                        if (!metadata) {
                            return [2 /*return*/, null];
                        }
                        linkage.push({ type: "metadata", content: JSON.stringify(metadata) });
                        imageUrl = metadata.image;
                        if (typeof (imageUrl) !== "string") {
                            return [2 /*return*/, null];
                        }
                        if (imageUrl.match(/^(https:\/\/|data:)/i)) {
                            // Allow
                        }
                        else {
                            ipfs = imageUrl.match(matcherIpfs);
                            if (ipfs == null) {
                                return [2 /*return*/, null];
                            }
                            linkage.push({ type: "url-ipfs", content: imageUrl });
                            imageUrl = getIpfsLink(imageUrl);
                        }
                        linkage.push({ type: "url", content: imageUrl });
                        return [2 /*return*/, { linkage: linkage, url: imageUrl }];
                    case 17:
                        i++;
                        return [3 /*break*/, 3];
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        error_3 = _h.sent();
                        return [3 /*break*/, 20];
                    case 20: return [2 /*return*/, null];
                }
            });
        });
    };
    Resolver.prototype.getContentHash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hexBytes, ipfs, length_4, swarm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fetchBytes("0xbc1c58d1")];
                    case 1:
                        hexBytes = _a.sent();
                        // No contenthash
                        if (hexBytes == null || hexBytes === "0x") {
                            return [2 /*return*/, null];
                        }
                        ipfs = hexBytes.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
                        if (ipfs) {
                            length_4 = parseInt(ipfs[3], 16);
                            if (ipfs[4].length === length_4 * 2) {
                                return [2 /*return*/, "ipfs:/\/" + basex_1.Base58.encode("0x" + ipfs[1])];
                            }
                        }
                        swarm = hexBytes.match(/^0xe40101fa011b20([0-9a-f]*)$/);
                        if (swarm) {
                            if (swarm[1].length === (32 * 2)) {
                                return [2 /*return*/, "bzz:/\/" + swarm[1]];
                            }
                        }
                        return [2 /*return*/, logger.throwError("invalid or unsupported content hash data", logger_1.Logger.errors.UNSUPPORTED_OPERATION, {
                                operation: "getContentHash()",
                                data: hexBytes
                            })];
                }
            });
        });
    };
    Resolver.prototype.getText = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var keyBytes, hexBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyBytes = (0, strings_1.toUtf8Bytes)(key);
                        // The nodehash consumes the first slot, so the string pointer targets
                        // offset 64, with the length at offset 64 and data starting at offset 96
                        keyBytes = (0, bytes_1.concat)([bytes32ify(64), bytes32ify(keyBytes.length), keyBytes]);
                        // Pad to word-size (32 bytes)
                        if ((keyBytes.length % 32) !== 0) {
                            keyBytes = (0, bytes_1.concat)([keyBytes, (0, bytes_1.hexZeroPad)("0x", 32 - (key.length % 32))]);
                        }
                        return [4 /*yield*/, this._fetchBytes("0x59d1d43c", (0, bytes_1.hexlify)(keyBytes))];
                    case 1:
                        hexBytes = _a.sent();
                        if (hexBytes == null || hexBytes === "0x") {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, (0, strings_1.toUtf8String)(hexBytes)];
                }
            });
        });
    };
    return Resolver;
}());
exports.Resolver = Resolver;
var defaultFormatter = null;
var nextPollId = 1;
var BaseProvider = /** @class */ (function (_super) {
    __extends(BaseProvider, _super);
    /**
     *  ready
     *
     *  A Promise<Network> that resolves only once the provider is ready.
     *
     *  Sub-classes that call the super with a network without a chainId
     *  MUST set this. Standard named networks have a known chainId.
     *
     */
    function BaseProvider(network) {
        var _newTarget = this.constructor;
        var _this = this;
        logger.checkNew(_newTarget, abstract_provider_1.Provider);
        _this = _super.call(this) || this;
        // Events being listened to
        _this._events = [];
        _this._emitted = { block: -2 };
        _this.formatter = _newTarget.getFormatter();
        // If network is any, this Provider allows the underlying
        // network to change dynamically, and we auto-detect the
        // current network
        (0, properties_1.defineReadOnly)(_this, "anyNetwork", (network === "any"));
        if (_this.anyNetwork) {
            network = _this.detectNetwork();
        }
        if (network instanceof Promise) {
            _this._networkPromise = network;
            // Squash any "unhandled promise" errors; that do not need to be handled
            network.catch(function (error) { });
            // Trigger initial network setting (async)
            _this._ready().catch(function (error) { });
        }
        else {
            var knownNetwork = (0, properties_1.getStatic)(_newTarget, "getNetwork")(network);
            if (knownNetwork) {
                (0, properties_1.defineReadOnly)(_this, "_network", knownNetwork);
                _this.emit("network", knownNetwork, null);
            }
            else {
                logger.throwArgumentError("invalid network", "network", network);
            }
        }
        _this._maxInternalBlockNumber = -1024;
        _this._lastBlockNumber = -2;
        _this._pollingInterval = 4000;
        _this._fastQueryDate = 0;
        return _this;
    }
    BaseProvider.prototype._ready = function () {
        return __awaiter(this, void 0, void 0, function () {
            var network, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._network == null)) return [3 /*break*/, 7];
                        network = null;
                        if (!this._networkPromise) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._networkPromise];
                    case 2:
                        network = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(network == null)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.detectNetwork()];
                    case 5:
                        network = _a.sent();
                        _a.label = 6;
                    case 6:
                        // This should never happen; every Provider sub-class should have
                        // suggested a network by here (or have thrown).
                        if (!network) {
                            logger.throwError("no network detected", logger_1.Logger.errors.UNKNOWN_ERROR, {});
                        }
                        // Possible this call stacked so do not call defineReadOnly again
                        if (this._network == null) {
                            if (this.anyNetwork) {
                                this._network = network;
                            }
                            else {
                                (0, properties_1.defineReadOnly)(this, "_network", network);
                            }
                            this.emit("network", network, null);
                        }
                        _a.label = 7;
                    case 7: return [2 /*return*/, this._network];
                }
            });
        });
    };
    Object.defineProperty(BaseProvider.prototype, "ready", {
        // This will always return the most recently established network.
        // For "any", this can change (a "network" event is emitted before
        // any change is reflected); otherwise this cannot change
        get: function () {
            var _this = this;
            return (0, web_1.poll)(function () {
                return _this._ready().then(function (network) {
                    return network;
                }, function (error) {
                    // If the network isn't running yet, we will wait
                    if (error.code === logger_1.Logger.errors.NETWORK_ERROR && error.event === "noNetwork") {
                        return undefined;
                    }
                    throw error;
                });
            });
        },
        enumerable: false,
        configurable: true
    });
    // @TODO: Remove this and just create a singleton formatter
    BaseProvider.getFormatter = function () {
        if (defaultFormatter == null) {
            defaultFormatter = new formatter_1.Formatter();
        }
        return defaultFormatter;
    };
    // @TODO: Remove this and just use getNetwork
    BaseProvider.getNetwork = function (network) {
        return (0, networks_1.getNetwork)((network == null) ? "homestead" : network);
    };
    // Fetches the blockNumber, but will reuse any result that is less
    // than maxAge old or has been requested since the last request
    BaseProvider.prototype._getInternalBlockNumber = function (maxAge) {
        return __awaiter(this, void 0, void 0, function () {
            var internalBlockNumber, result, error_5, reqTime, checkInternalBlockNumber;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._ready()];
                    case 1:
                        _a.sent();
                        if (!(maxAge > 0)) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        if (!this._internalBlockNumber) return [3 /*break*/, 7];
                        internalBlockNumber = this._internalBlockNumber;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, internalBlockNumber];
                    case 4:
                        result = _a.sent();
                        if ((getTime() - result.respTime) <= maxAge) {
                            return [2 /*return*/, result.blockNumber];
                        }
                        // Too old; fetch a new value
                        return [3 /*break*/, 7];
                    case 5:
                        error_5 = _a.sent();
                        // The fetch rejected; if we are the first to get the
                        // rejection, drop through so we replace it with a new
                        // fetch; all others blocked will then get that fetch
                        // which won't match the one they "remembered" and loop
                        if (this._internalBlockNumber === internalBlockNumber) {
                            return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 2];
                    case 7:
                        reqTime = getTime();
                        checkInternalBlockNumber = (0, properties_1.resolveProperties)({
                            blockNumber: this.perform("getBlockNumber", {}),
                            networkError: this.getNetwork().then(function (network) { return (null); }, function (error) { return (error); })
                        }).then(function (_a) {
                            var blockNumber = _a.blockNumber, networkError = _a.networkError;
                            if (networkError) {
                                // Unremember this bad internal block number
                                if (_this._internalBlockNumber === checkInternalBlockNumber) {
                                    _this._internalBlockNumber = null;
                                }
                                throw networkError;
                            }
                            var respTime = getTime();
                            blockNumber = bignumber_1.BigNumber.from(blockNumber).toNumber();
                            if (blockNumber < _this._maxInternalBlockNumber) {
                                blockNumber = _this._maxInternalBlockNumber;
                            }
                            _this._maxInternalBlockNumber = blockNumber;
                            _this._setFastBlockNumber(blockNumber); // @TODO: Still need this?
                            return { blockNumber: blockNumber, reqTime: reqTime, respTime: respTime };
                        });
                        this._internalBlockNumber = checkInternalBlockNumber;
                        // Swallow unhandled exceptions; if needed they are handled else where
                        checkInternalBlockNumber.catch(function (error) {
                            // Don't null the dead (rejected) fetch, if it has already been updated
                            if (_this._internalBlockNumber === checkInternalBlockNumber) {
                                _this._internalBlockNumber = null;
                            }
                        });
                        return [4 /*yield*/, checkInternalBlockNumber];
                    case 8: return [2 /*return*/, (_a.sent()).blockNumber];
                }
            });
        });
    };
    BaseProvider.prototype.poll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pollId, runners, blockNumber, error_6, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pollId = nextPollId++;
                        runners = [];
                        blockNumber = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._getInternalBlockNumber(100 + this.pollingInterval / 2)];
                    case 2:
                        blockNumber = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        this.emit("error", error_6);
                        return [2 /*return*/];
                    case 4:
                        this._setFastBlockNumber(blockNumber);
                        // Emit a poll event after we have the latest (fast) block number
                        this.emit("poll", pollId, blockNumber);
                        // If the block has not changed, meh.
                        if (blockNumber === this._lastBlockNumber) {
                            this.emit("didPoll", pollId);
                            return [2 /*return*/];
                        }
                        // First polling cycle, trigger a "block" events
                        if (this._emitted.block === -2) {
                            this._emitted.block = blockNumber - 1;
                        }
                        if (Math.abs((this._emitted.block) - blockNumber) > 1000) {
                            logger.warn("network block skew detected; skipping block events (emitted=" + this._emitted.block + " blockNumber" + blockNumber + ")");
                            this.emit("error", logger.makeError("network block skew detected", logger_1.Logger.errors.NETWORK_ERROR, {
                                blockNumber: blockNumber,
                                event: "blockSkew",
                                previousBlockNumber: this._emitted.block
                            }));
                            this.emit("block", blockNumber);
                        }
                        else {
                            // Notify all listener for each block that has passed
                            for (i = this._emitted.block + 1; i <= blockNumber; i++) {
                                this.emit("block", i);
                            }
                        }
                        // The emitted block was updated, check for obsolete events
                        if (this._emitted.block !== blockNumber) {
                            this._emitted.block = blockNumber;
                            Object.keys(this._emitted).forEach(function (key) {
                                // The block event does not expire
                                if (key === "block") {
                                    return;
                                }
                                // The block we were at when we emitted this event
                                var eventBlockNumber = _this._emitted[key];
                                // We cannot garbage collect pending transactions or blocks here
                                // They should be garbage collected by the Provider when setting
                                // "pending" events
                                if (eventBlockNumber === "pending") {
                                    return;
                                }
                                // Evict any transaction hashes or block hashes over 12 blocks
                                // old, since they should not return null anyways
                                if (blockNumber - eventBlockNumber > 12) {
                                    delete _this._emitted[key];
                                }
                            });
                        }
                        // First polling cycle
                        if (this._lastBlockNumber === -2) {
                            this._lastBlockNumber = blockNumber - 1;
                        }
                        // Find all transaction hashes we are waiting on
                        this._events.forEach(function (event) {
                            switch (event.type) {
                                case "tx": {
                                    var hash_2 = event.hash;
                                    var runner = _this.getTransactionReceipt(hash_2).then(function (receipt) {
                                        if (!receipt || receipt.blockNumber == null) {
                                            return null;
                                        }
                                        _this._emitted["t:" + hash_2] = receipt.blockNumber;
                                        _this.emit(hash_2, receipt);
                                        return null;
                                    }).catch(function (error) { _this.emit("error", error); });
                                    runners.push(runner);
                                    break;
                                }
                                case "filter": {
                                    var filter_1 = event.filter;
                                    filter_1.fromBlock = _this._lastBlockNumber + 1;
                                    filter_1.toBlock = blockNumber;
                                    var runner = _this.getLogs(filter_1).then(function (logs) {
                                        if (logs.length === 0) {
                                            return;
                                        }
                                        logs.forEach(function (log) {
                                            _this._emitted["b:" + log.blockHash] = log.blockNumber;
                                            _this._emitted["t:" + log.transactionHash] = log.blockNumber;
                                            _this.emit(filter_1, log);
                                        });
                                    }).catch(function (error) { _this.emit("error", error); });
                                    runners.push(runner);
                                    break;
                                }
                            }
                        });
                        this._lastBlockNumber = blockNumber;
                        // Once all events for this loop have been processed, emit "didPoll"
                        Promise.all(runners).then(function () {
                            _this.emit("didPoll", pollId);
                        }).catch(function (error) { _this.emit("error", error); });
                        return [2 /*return*/];
                }
            });
        });
    };
    // Deprecated; do not use this
    BaseProvider.prototype.resetEventsBlock = function (blockNumber) {
        this._lastBlockNumber = blockNumber - 1;
        if (this.polling) {
            this.poll();
        }
    };
    Object.defineProperty(BaseProvider.prototype, "network", {
        get: function () {
            return this._network;
        },
        enumerable: false,
        configurable: true
    });
    // This method should query the network if the underlying network
    // can change, such as when connected to a JSON-RPC backend
    BaseProvider.prototype.detectNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, logger.throwError("provider does not support network detection", logger_1.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: "provider.detectNetwork"
                    })];
            });
        });
    };
    BaseProvider.prototype.getNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            var network, currentNetwork, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._ready()];
                    case 1:
                        network = _a.sent();
                        return [4 /*yield*/, this.detectNetwork()];
                    case 2:
                        currentNetwork = _a.sent();
                        if (!(network.chainId !== currentNetwork.chainId)) return [3 /*break*/, 5];
                        if (!this.anyNetwork) return [3 /*break*/, 4];
                        this._network = currentNetwork;
                        // Reset all internal block number guards and caches
                        this._lastBlockNumber = -2;
                        this._fastBlockNumber = null;
                        this._fastBlockNumberPromise = null;
                        this._fastQueryDate = 0;
                        this._emitted.block = -2;
                        this._maxInternalBlockNumber = -1024;
                        this._internalBlockNumber = null;
                        // The "network" event MUST happen before this method resolves
                        // so any events have a chance to unregister, so we stall an
                        // additional event loop before returning from /this/ call
                        this.emit("network", currentNetwork, network);
                        return [4 /*yield*/, stall(0)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this._network];
                    case 4:
                        error = logger.makeError("underlying network changed", logger_1.Logger.errors.NETWORK_ERROR, {
                            event: "changed",
                            network: network,
                            detectedNetwork: currentNetwork
                        });
                        this.emit("error", error);
                        throw error;
                    case 5: return [2 /*return*/, network];
                }
            });
        });
    };
    Object.defineProperty(BaseProvider.prototype, "blockNumber", {
        get: function () {
            var _this = this;
            this._getInternalBlockNumber(100 + this.pollingInterval / 2).then(function (blockNumber) {
                _this._setFastBlockNumber(blockNumber);
            }, function (error) { });
            return (this._fastBlockNumber != null) ? this._fastBlockNumber : -1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseProvider.prototype, "polling", {
        get: function () {
            return (this._poller != null);
        },
        set: function (value) {
            var _this = this;
            if (value && !this._poller) {
                this._poller = setInterval(function () { _this.poll(); }, this.pollingInterval);
                if (!this._bootstrapPoll) {
                    this._bootstrapPoll = setTimeout(function () {
                        _this.poll();
                        // We block additional polls until the polling interval
                        // is done, to prevent overwhelming the poll function
                        _this._bootstrapPoll = setTimeout(function () {
                            // If polling was disabled, something may require a poke
                            // since starting the bootstrap poll and it was disabled
                            if (!_this._poller) {
                                _this.poll();
                            }
                            // Clear out the bootstrap so we can do another
                            _this._bootstrapPoll = null;
                        }, _this.pollingInterval);
                    }, 0);
                }
            }
            else if (!value && this._poller) {
                clearInterval(this._poller);
                this._poller = null;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseProvider.prototype, "pollingInterval", {
        get: function () {
            return this._pollingInterval;
        },
        set: function (value) {
            var _this = this;
            if (typeof (value) !== "number" || value <= 0 || parseInt(String(value)) != value) {
                throw new Error("invalid polling interval");
            }
            this._pollingInterval = value;
            if (this._poller) {
                clearInterval(this._poller);
                this._poller = setInterval(function () { _this.poll(); }, this._pollingInterval);
            }
        },
        enumerable: false,
        configurable: true
    });
    BaseProvider.prototype._getFastBlockNumber = function () {
        var _this = this;
        var now = getTime();
        // Stale block number, request a newer value
        if ((now - this._fastQueryDate) > 2 * this._pollingInterval) {
            this._fastQueryDate = now;
            this._fastBlockNumberPromise = this.getBlockNumber().then(function (blockNumber) {
                if (_this._fastBlockNumber == null || blockNumber > _this._fastBlockNumber) {
                    _this._fastBlockNumber = blockNumber;
                }
                return _this._fastBlockNumber;
            });
        }
        return this._fastBlockNumberPromise;
    };
    BaseProvider.prototype._setFastBlockNumber = function (blockNumber) {
        // Older block, maybe a stale request
        if (this._fastBlockNumber != null && blockNumber < this._fastBlockNumber) {
            return;
        }
        // Update the time we updated the blocknumber
        this._fastQueryDate = getTime();
        // Newer block number, use  it
        if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
            this._fastBlockNumber = blockNumber;
            this._fastBlockNumberPromise = Promise.resolve(blockNumber);
        }
    };
    BaseProvider.prototype.waitForTransaction = function (transactionHash, confirmations, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._waitForTransaction(transactionHash, (confirmations == null) ? 1 : confirmations, timeout || 0, null)];
            });
        });
    };
    BaseProvider.prototype._waitForTransaction = function (transactionHash, confirmations, timeout, replaceable) {
        return __awaiter(this, void 0, void 0, function () {
            var receipt;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTransactionReceipt(transactionHash)];
                    case 1:
                        receipt = _a.sent();
                        // Receipt is already good
                        if ((receipt ? receipt.confirmations : 0) >= confirmations) {
                            return [2 /*return*/, receipt];
                        }
                        // Poll until the receipt is good...
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var cancelFuncs = [];
                                var done = false;
                                var alreadyDone = function () {
                                    if (done) {
                                        return true;
                                    }
                                    done = true;
                                    cancelFuncs.forEach(function (func) { func(); });
                                    return false;
                                };
                                var minedHandler = function (receipt) {
                                    if (receipt.confirmations < confirmations) {
                                        return;
                                    }
                                    if (alreadyDone()) {
                                        return;
                                    }
                                    resolve(receipt);
                                };
                                _this.on(transactionHash, minedHandler);
                                cancelFuncs.push(function () { _this.removeListener(transactionHash, minedHandler); });
                                if (replaceable) {
                                    var lastBlockNumber_1 = replaceable.startBlock;
                                    var scannedBlock_1 = null;
                                    var replaceHandler_1 = function (blockNumber) { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (done) {
                                                        return [2 /*return*/];
                                                    }
                                                    // Wait 1 second; this is only used in the case of a fault, so
                                                    // we will trade off a little bit of latency for more consistent
                                                    // results and fewer JSON-RPC calls
                                                    return [4 /*yield*/, stall(1000)];
                                                case 1:
                                                    // Wait 1 second; this is only used in the case of a fault, so
                                                    // we will trade off a little bit of latency for more consistent
                                                    // results and fewer JSON-RPC calls
                                                    _a.sent();
                                                    this.getTransactionCount(replaceable.from).then(function (nonce) { return __awaiter(_this, void 0, void 0, function () {
                                                        var mined, block, ti, tx, receipt_1, reason;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    if (done) {
                                                                        return [2 /*return*/];
                                                                    }
                                                                    if (!(nonce <= replaceable.nonce)) return [3 /*break*/, 1];
                                                                    lastBlockNumber_1 = blockNumber;
                                                                    return [3 /*break*/, 9];
                                                                case 1: return [4 /*yield*/, this.getTransaction(transactionHash)];
                                                                case 2:
                                                                    mined = _a.sent();
                                                                    if (mined && mined.blockNumber != null) {
                                                                        return [2 /*return*/];
                                                                    }
                                                                    // First time scanning. We start a little earlier for some
                                                                    // wiggle room here to handle the eventually consistent nature
                                                                    // of blockchain (e.g. the getTransactionCount was for a
                                                                    // different block)
                                                                    if (scannedBlock_1 == null) {
                                                                        scannedBlock_1 = lastBlockNumber_1 - 3;
                                                                        if (scannedBlock_1 < replaceable.startBlock) {
                                                                            scannedBlock_1 = replaceable.startBlock;
                                                                        }
                                                                    }
                                                                    _a.label = 3;
                                                                case 3:
                                                                    if (!(scannedBlock_1 <= blockNumber)) return [3 /*break*/, 9];
                                                                    if (done) {
                                                                        return [2 /*return*/];
                                                                    }
                                                                    return [4 /*yield*/, this.getBlockWithTransactions(scannedBlock_1)];
                                                                case 4:
                                                                    block = _a.sent();
                                                                    ti = 0;
                                                                    _a.label = 5;
                                                                case 5:
                                                                    if (!(ti < block.transactions.length)) return [3 /*break*/, 8];
                                                                    tx = block.transactions[ti];
                                                                    // Successfully mined!
                                                                    if (tx.hash === transactionHash) {
                                                                        return [2 /*return*/];
                                                                    }
                                                                    if (!(tx.from === replaceable.from && tx.nonce === replaceable.nonce)) return [3 /*break*/, 7];
                                                                    if (done) {
                                                                        return [2 /*return*/];
                                                                    }
                                                                    return [4 /*yield*/, this.waitForTransaction(tx.hash, confirmations)];
                                                                case 6:
                                                                    receipt_1 = _a.sent();
                                                                    // Already resolved or rejected (prolly a timeout)
                                                                    if (alreadyDone()) {
                                                                        return [2 /*return*/];
                                                                    }
                                                                    reason = "replaced";
                                                                    if (tx.data === replaceable.data && tx.to === replaceable.to && tx.value.eq(replaceable.value)) {
                                                                        reason = "repriced";
                                                                    }
                                                                    else if (tx.data === "0x" && tx.from === tx.to && tx.value.isZero()) {
                                                                        reason = "cancelled";
                                                                    }
                                                                    // Explain why we were replaced
                                                                    reject(logger.makeError("transaction was replaced", logger_1.Logger.errors.TRANSACTION_REPLACED, {
                                                                        cancelled: (reason === "replaced" || reason === "cancelled"),
                                                                        reason: reason,
                                                                        replacement: this._wrapTransaction(tx),
                                                                        hash: transactionHash,
                                                                        receipt: receipt_1
                                                                    }));
                                                                    return [2 /*return*/];
                                                                case 7:
                                                                    ti++;
                                                                    return [3 /*break*/, 5];
                                                                case 8:
                                                                    scannedBlock_1++;
                                                                    return [3 /*break*/, 3];
                                                                case 9:
                                                                    if (done) {
                                                                        return [2 /*return*/];
                                                                    }
                                                                    this.once("block", replaceHandler_1);
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); }, function (error) {
                                                        if (done) {
                                                            return;
                                                        }
                                                        _this.once("block", replaceHandler_1);
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); };
                                    if (done) {
                                        return;
                                    }
                                    _this.once("block", replaceHandler_1);
                                    cancelFuncs.push(function () {
                                        _this.removeListener("block", replaceHandler_1);
                                    });
                                }
                                if (typeof (timeout) === "number" && timeout > 0) {
                                    var timer_1 = setTimeout(function () {
                                        if (alreadyDone()) {
                                            return;
                                        }
                                        reject(logger.makeError("timeout exceeded", logger_1.Logger.errors.TIMEOUT, { timeout: timeout }));
                                    }, timeout);
                                    if (timer_1.unref) {
                                        timer_1.unref();
                                    }
                                    cancelFuncs.push(function () { clearTimeout(timer_1); });
                                }
                            })];
                }
            });
        });
    };
    BaseProvider.prototype.getBlockNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._getInternalBlockNumber(0)];
            });
        });
    };
    BaseProvider.prototype.getGasPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.perform("getGasPrice", {})];
                    case 2:
                        result = _a.sent();
                        try {
                            return [2 /*return*/, bignumber_1.BigNumber.from(result)];
                        }
                        catch (error) {
                            return [2 /*return*/, logger.throwError("bad result from backend", logger_1.Logger.errors.SERVER_ERROR, {
                                    method: "getGasPrice",
                                    result: result,
                                    error: error
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseProvider.prototype.getBalance = function (addressOrName, blockTag) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, properties_1.resolveProperties)({
                                address: this._getAddress(addressOrName),
                                blockTag: this._getBlockTag(blockTag)
                            })];
                    case 2:
                        params = _a.sent();
                        return [4 /*yield*/, this.perform("getBalance", params)];
                    case 3:
                        result = _a.sent();
                        try {
                            return [2 /*return*/, bignumber_1.BigNumber.from(result)];
                        }
                        catch (error) {
                            return [2 /*return*/, logger.throwError("bad result from backend", logger_1.Logger.errors.SERVER_ERROR, {
                                    method: "getBalance",
                                    params: params,
                                    result: result,
                                    error: error
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseProvider.prototype.getTransactionCount = function (addressOrName, blockTag) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, properties_1.resolveProperties)({
                                address: this._getAddress(addressOrName),
                                blockTag: this._getBlockTag(blockTag)
                            })];
                    case 2:
                        params = _a.sent();
                        return [4 /*yield*/, this.perform("getTransactionCount", params)];
                    case 3:
                        result = _a.sent();
                        try {
                            return [2 /*return*/, bignumber_1.BigNumber.from(result).toNumber()];
                        }
                        catch (error) {
                            return [2 /*return*/, logger.throwError("bad result from backend", logger_1.Logger.errors.SERVER_ERROR, {
                                    method: "getTransactionCount",
                                    params: params,
                                    result: result,
                                    error: error
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseProvider.prototype.getCode = function (addressOrName, blockTag) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, properties_1.resolveProperties)({
                                address: this._getAddress(addressOrName),
                                blockTag: this._getBlockTag(blockTag)
                            })];
                    case 2:
                        params = _a.sent();
                        return [4 /*yield*/, this.perform("getCode", params)];
                    case 3:
                        result = _a.sent();
                        try {
                            return [2 /*return*/, (0, bytes_1.hexlify)(result)];
                        }
                        catch (error) {
                            return [2 /*return*/, logger.throwError("bad result from backend", logger_1.Logger.errors.SERVER_ERROR, {
                                    method: "getCode",
                                    params: params,
                                    result: result,
                                    error: error
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseProvider.prototype.getStorageAt = function (addressOrName, position, blockTag) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, properties_1.resolveProperties)({
                                address: this._getAddress(addressOrName),
                                blockTag: this._getBlockTag(blockTag),
                                position: Promise.resolve(position).then(function (p) { return (0, bytes_1.hexValue)(p); })
                            })];
                    case 2:
                        params = _a.sent();
                        return [4 /*yield*/, this.perform("getStorageAt", params)];
                    case 3:
                        result = _a.sent();
                        try {
                            return [2 /*return*/, (0, bytes_1.hexlify)(result)];
                        }
                        catch (error) {
                            return [2 /*return*/, logger.throwError("bad result from backend", logger_1.Logger.errors.SERVER_ERROR, {
                                    method: "getStorageAt",
                                    params: params,
                                    result: result,
                                    error: error
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // This should be called by any subclass wrapping a TransactionResponse
    BaseProvider.prototype._wrapTransaction = function (tx, hash, startBlock) {
        var _this = this;
        if (hash != null && (0, bytes_1.hexDataLength)(hash) !== 32) {
            throw new Error("invalid response - sendTransaction");
        }
        var result = tx;
        // Check the hash we expect is the same as the hash the server reported
        if (hash != null && tx.hash !== hash) {
            logger.throwError("Transaction hash mismatch from Provider.sendTransaction.", logger_1.Logger.errors.UNKNOWN_ERROR, { expectedHash: tx.hash, returnedHash: hash });
        }
        result.wait = function (confirms, timeout) { return __awaiter(_this, void 0, void 0, function () {
            var replacement, receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (confirms == null) {
                            confirms = 1;
                        }
                        if (timeout == null) {
                            timeout = 0;
                        }
                        replacement = undefined;
                        if (confirms !== 0 && startBlock != null) {
                            replacement = {
                                data: tx.data,
                                from: tx.from,
                                nonce: tx.nonce,
                                to: tx.to,
                                value: tx.value,
                                startBlock: startBlock
                            };
                        }
                        return [4 /*yield*/, this._waitForTransaction(tx.hash, confirms, timeout, replacement)];
                    case 1:
                        receipt = _a.sent();
                        if (receipt == null && confirms === 0) {
                            return [2 /*return*/, null];
                        }
                        // No longer pending, allow the polling loop to garbage collect this
                        this._emitted["t:" + tx.hash] = receipt.blockNumber;
                        if (receipt.status === 0) {
                            logger.throwError("transaction failed", logger_1.Logger.errors.CALL_EXCEPTION, {
                                transactionHash: tx.hash,
                                transaction: tx,
                                receipt: receipt
                            });
                        }
                        return [2 /*return*/, receipt];
                }
            });
        }); };
        return result;
    };
    BaseProvider.prototype.sendTransaction = function (signedTransaction) {
        return __awaiter(this, void 0, void 0, function () {
            var hexTx, tx, blockNumber, hash, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Promise.resolve(signedTransaction).then(function (t) { return (0, bytes_1.hexlify)(t); })];
                    case 2:
                        hexTx = _a.sent();
                        tx = this.formatter.transaction(signedTransaction);
                        if (tx.confirmations == null) {
                            tx.confirmations = 0;
                        }
                        return [4 /*yield*/, this._getInternalBlockNumber(100 + 2 * this.pollingInterval)];
                    case 3:
                        blockNumber = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.perform("sendTransaction", { signedTransaction: hexTx })];
                    case 5:
                        hash = _a.sent();
                        return [2 /*return*/, this._wrapTransaction(tx, hash, blockNumber)];
                    case 6:
                        error_7 = _a.sent();
                        error_7.transaction = tx;
                        error_7.transactionHash = tx.hash;
                        throw error_7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BaseProvider.prototype._getTransactionRequest = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var values, tx, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, transaction];
                    case 1:
                        values = _c.sent();
                        tx = {};
                        ["from", "to"].forEach(function (key) {
                            if (values[key] == null) {
                                return;
                            }
                            tx[key] = Promise.resolve(values[key]).then(function (v) { return (v ? _this._getAddress(v) : null); });
                        });
                        ["gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "value"].forEach(function (key) {
                            if (values[key] == null) {
                                return;
                            }
                            tx[key] = Promise.resolve(values[key]).then(function (v) { return (v ? bignumber_1.BigNumber.from(v) : null); });
                        });
                        ["type"].forEach(function (key) {
                            if (values[key] == null) {
                                return;
                            }
                            tx[key] = Promise.resolve(values[key]).then(function (v) { return ((v != null) ? v : null); });
                        });
                        if (values.accessList) {
                            tx.accessList = this.formatter.accessList(values.accessList);
                        }
                        ["data"].forEach(function (key) {
                            if (values[key] == null) {
                                return;
                            }
                            tx[key] = Promise.resolve(values[key]).then(function (v) { return (v ? (0, bytes_1.hexlify)(v) : null); });
                        });
                        _b = (_a = this.formatter).transactionRequest;
                        return [4 /*yield*/, (0, properties_1.resolveProperties)(tx)];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    BaseProvider.prototype._getFilter = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, filter];
                    case 1:
                        filter = _c.sent();
                        result = {};
                        if (filter.address != null) {
                            result.address = this._getAddress(filter.address);
                        }
                        ["blockHash", "topics"].forEach(function (key) {
                            if (filter[key] == null) {
                                return;
                            }
                            result[key] = filter[key];
                        });
                        ["fromBlock", "toBlock"].forEach(function (key) {
                            if (filter[key] == null) {
                                return;
                            }
                            result[key] = _this._getBlockTag(filter[key]);
                        });
                        _b = (_a = this.formatter).filter;
                        return [4 /*yield*/, (0, properties_1.resolveProperties)(result)];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    BaseProvider.prototype.call = function (transaction, blockTag) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, properties_1.resolveProperties)({
                                transaction: this._getTransactionRequest(transaction),
                                blockTag: this._getBlockTag(blockTag)
                            })];
                    case 2:
                        params = _a.sent();
                        return [4 /*yield*/, this.perform("call", params)];
                    case 3:
                        result = _a.sent();
                        try {
                            return [2 /*return*/, (0, bytes_1.hexlify)(result)];
                        }
                        catch (error) {
                            return [2 /*return*/, logger.throwError("bad result from backend", logger_1.Logger.errors.SERVER_ERROR, {
                                    method: "call",
                                    params: params,
                                    result: result,
                                    error: error
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseProvider.prototype.estimateGas = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, properties_1.resolveProperties)({
                                transaction: this._getTransactionRequest(transaction)
                            })];
                    case 2:
                        params = _a.sent();
                        return [4 /*yield*/, this.perform("estimateGas", params)];
                    case 3:
                        result = _a.sent();
                        try {
                            return [2 /*return*/, bignumber_1.BigNumber.from(result)];
                        }
                        catch (error) {
                            return [2 /*return*/, logger.throwError("bad result from backend", logger_1.Logger.errors.SERVER_ERROR, {
                                    method: "estimateGas",
                                    params: params,
                                    result: result,
                                    error: error
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseProvider.prototype._getAddress = function (addressOrName) {
        return __awaiter(this, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, addressOrName];
                    case 1:
                        addressOrName = _a.sent();
                        if (typeof (addressOrName) !== "string") {
                            logger.throwArgumentError("invalid address or ENS name", "name", addressOrName);
                        }
                        return [4 /*yield*/, this.resolveName(addressOrName)];
                    case 2:
                        address = _a.sent();
                        if (address == null) {
                            logger.throwError("ENS name not configured", logger_1.Logger.errors.UNSUPPORTED_OPERATION, {
                                operation: "resolveName(" + JSON.stringify(addressOrName) + ")"
                            });
                        }
                        return [2 /*return*/, address];
                }
            });
        });
    };
    BaseProvider.prototype._getBlock = function (blockHashOrBlockTag, includeTransactions) {
        return __awaiter(this, void 0, void 0, function () {
            var blockNumber, params, _a, error_8;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, blockHashOrBlockTag];
                    case 2:
                        blockHashOrBlockTag = _b.sent();
                        blockNumber = -128;
                        params = {
                            includeTransactions: !!includeTransactions
                        };
                        if (!(0, bytes_1.isHexString)(blockHashOrBlockTag, 32)) return [3 /*break*/, 3];
                        params.blockHash = blockHashOrBlockTag;
                        return [3 /*break*/, 6];
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        _a = params;
                        return [4 /*yield*/, this._getBlockTag(blockHashOrBlockTag)];
                    case 4:
                        _a.blockTag = _b.sent();
                        if ((0, bytes_1.isHexString)(params.blockTag)) {
                            blockNumber = parseInt(params.blockTag.substring(2), 16);
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_8 = _b.sent();
                        logger.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", blockHashOrBlockTag);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, (0, web_1.poll)(function () { return __awaiter(_this, void 0, void 0, function () {
                            var block, blockNumber_1, i, tx, confirmations, blockWithTxs;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.perform("getBlock", params)];
                                    case 1:
                                        block = _a.sent();
                                        // Block was not found
                                        if (block == null) {
                                            // For blockhashes, if we didn't say it existed, that blockhash may
                                            // not exist. If we did see it though, perhaps from a log, we know
                                            // it exists, and this node is just not caught up yet.
                                            if (params.blockHash != null) {
                                                if (this._emitted["b:" + params.blockHash] == null) {
                                                    return [2 /*return*/, null];
                                                }
                                            }
                                            // For block tags, if we are asking for a future block, we return null
                                            if (params.blockTag != null) {
                                                if (blockNumber > this._emitted.block) {
                                                    return [2 /*return*/, null];
                                                }
                                            }
                                            // Retry on the next block
                                            return [2 /*return*/, undefined];
                                        }
                                        if (!includeTransactions) return [3 /*break*/, 8];
                                        blockNumber_1 = null;
                                        i = 0;
                                        _a.label = 2;
                                    case 2:
                                        if (!(i < block.transactions.length)) return [3 /*break*/, 7];
                                        tx = block.transactions[i];
                                        if (!(tx.blockNumber == null)) return [3 /*break*/, 3];
                                        tx.confirmations = 0;
                                        return [3 /*break*/, 6];
                                    case 3:
                                        if (!(tx.confirmations == null)) return [3 /*break*/, 6];
                                        if (!(blockNumber_1 == null)) return [3 /*break*/, 5];
                                        return [4 /*yield*/, this._getInternalBlockNumber(100 + 2 * this.pollingInterval)];
                                    case 4:
                                        blockNumber_1 = _a.sent();
                                        _a.label = 5;
                                    case 5:
                                        confirmations = (blockNumber_1 - tx.blockNumber) + 1;
                                        if (confirmations <= 0) {
                                            confirmations = 1;
                                        }
                                        tx.confirmations = confirmations;
                                        _a.label = 6;
                                    case 6:
                                        i++;
                                        return [3 /*break*/, 2];
                                    case 7:
                                        blockWithTxs = this.formatter.blockWithTransactions(block);
                                        blockWithTxs.transactions = blockWithTxs.transactions.map(function (tx) { return _this._wrapTransaction(tx); });
                                        return [2 /*return*/, blockWithTxs];
                                    case 8: return [2 /*return*/, this.formatter.block(block)];
                                }
                            });
                        }); }, { oncePoll: this })];
                }
            });
        });
    };
    BaseProvider.prototype.getBlock = function (blockHashOrBlockTag) {
        return (this._getBlock(blockHashOrBlockTag, false));
    };
    BaseProvider.prototype.getBlockWithTransactions = function (blockHashOrBlockTag) {
        return (this._getBlock(blockHashOrBlockTag, true));
    };
    BaseProvider.prototype.getTransaction = function (transactionHash) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, transactionHash];
                    case 2:
                        transactionHash = _a.sent();
                        params = { transactionHash: this.formatter.hash(transactionHash, true) };
                        return [2 /*return*/, (0, web_1.poll)(function () { return __awaiter(_this, void 0, void 0, function () {
                                var result, tx, blockNumber, confirmations;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.perform("getTransaction", params)];
                                        case 1:
                                            result = _a.sent();
                                            if (result == null) {
                                                if (this._emitted["t:" + transactionHash] == null) {
                                                    return [2 /*return*/, null];
                                                }
                                                return [2 /*return*/, undefined];
                                            }
                                            tx = this.formatter.transactionResponse(result);
                                            if (!(tx.blockNumber == null)) return [3 /*break*/, 2];
                                            tx.confirmations = 0;
                                            return [3 /*break*/, 4];
                                        case 2:
                                            if (!(tx.confirmations == null)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this._getInternalBlockNumber(100 + 2 * this.pollingInterval)];
                                        case 3:
                                            blockNumber = _a.sent();
                                            confirmations = (blockNumber - tx.blockNumber) + 1;
                                            if (confirmations <= 0) {
                                                confirmations = 1;
                                            }
                                            tx.confirmations = confirmations;
                                            _a.label = 4;
                                        case 4: return [2 /*return*/, this._wrapTransaction(tx)];
                                    }
                                });
                            }); }, { oncePoll: this })];
                }
            });
        });
    };
    BaseProvider.prototype.getTransactionReceipt = function (transactionHash) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, transactionHash];
                    case 2:
                        transactionHash = _a.sent();
                        params = { transactionHash: this.formatter.hash(transactionHash, true) };
                        return [2 /*return*/, (0, web_1.poll)(function () { return __awaiter(_this, void 0, void 0, function () {
                                var result, receipt, blockNumber, confirmations;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.perform("getTransactionReceipt", params)];
                                        case 1:
                                            result = _a.sent();
                                            if (result == null) {
                                                if (this._emitted["t:" + transactionHash] == null) {
                                                    return [2 /*return*/, null];
                                                }
                                                return [2 /*return*/, undefined];
                                            }
                                            // "geth-etc" returns receipts before they are ready
                                            if (result.blockHash == null) {
                                                return [2 /*return*/, undefined];
                                            }
                                            receipt = this.formatter.receipt(result);
                                            if (!(receipt.blockNumber == null)) return [3 /*break*/, 2];
                                            receipt.confirmations = 0;
                                            return [3 /*break*/, 4];
                                        case 2:
                                            if (!(receipt.confirmations == null)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this._getInternalBlockNumber(100 + 2 * this.pollingInterval)];
                                        case 3:
                                            blockNumber = _a.sent();
                                            confirmations = (blockNumber - receipt.blockNumber) + 1;
                                            if (confirmations <= 0) {
                                                confirmations = 1;
                                            }
                                            receipt.confirmations = confirmations;
                                            _a.label = 4;
                                        case 4: return [2 /*return*/, receipt];
                                    }
                                });
                            }); }, { oncePoll: this })];
                }
            });
        });
    };
    BaseProvider.prototype.getLogs = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var params, logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, properties_1.resolveProperties)({ filter: this._getFilter(filter) })];
                    case 2:
                        params = _a.sent();
                        return [4 /*yield*/, this.perform("getLogs", params)];
                    case 3:
                        logs = _a.sent();
                        logs.forEach(function (log) {
                            if (log.removed == null) {
                                log.removed = false;
                            }
                        });
                        return [2 /*return*/, formatter_1.Formatter.arrayOf(this.formatter.filterLog.bind(this.formatter))(logs)];
                }
            });
        });
    };
    BaseProvider.prototype.getEtherPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.perform("getEtherPrice", {})];
                }
            });
        });
    };
    BaseProvider.prototype._getBlockTag = function (blockTag) {
        return __awaiter(this, void 0, void 0, function () {
            var blockNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blockTag];
                    case 1:
                        blockTag = _a.sent();
                        if (!(typeof (blockTag) === "number" && blockTag < 0)) return [3 /*break*/, 3];
                        if (blockTag % 1) {
                            logger.throwArgumentError("invalid BlockTag", "blockTag", blockTag);
                        }
                        return [4 /*yield*/, this._getInternalBlockNumber(100 + 2 * this.pollingInterval)];
                    case 2:
                        blockNumber = _a.sent();
                        blockNumber += blockTag;
                        if (blockNumber < 0) {
                            blockNumber = 0;
                        }
                        return [2 /*return*/, this.formatter.blockTag(blockNumber)];
                    case 3: return [2 /*return*/, this.formatter.blockTag(blockTag)];
                }
            });
        });
    };
    BaseProvider.prototype.getResolver = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var address, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._getResolver(name)];
                    case 1:
                        address = _a.sent();
                        if (address == null) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, new Resolver(this, address, name)];
                    case 2:
                        error_9 = _a.sent();
                        if (error_9.code === logger_1.Logger.errors.CALL_EXCEPTION) {
                            return [2 /*return*/, null];
                        }
                        throw error_9;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseProvider.prototype._getResolver = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var network, transaction, _a, _b, error_10;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        network = _c.sent();
                        // No ENS...
                        if (!network.ensAddress) {
                            logger.throwError("network does not support ENS", logger_1.Logger.errors.UNSUPPORTED_OPERATION, { operation: "ENS", network: network.name });
                        }
                        transaction = {
                            to: network.ensAddress,
                            data: ("0x0178b8bf" + (0, hash_1.namehash)(name).substring(2))
                        };
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        _b = (_a = this.formatter).callAddress;
                        return [4 /*yield*/, this.call(transaction)];
                    case 3: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                    case 4:
                        error_10 = _c.sent();
                        if (error_10.code === logger_1.Logger.errors.CALL_EXCEPTION) {
                            return [2 /*return*/, null];
                        }
                        throw error_10;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BaseProvider.prototype.resolveName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var resolver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, name];
                    case 1:
                        name = _a.sent();
                        // If it is already an address, nothing to resolve
                        try {
                            return [2 /*return*/, Promise.resolve(this.formatter.address(name))];
                        }
                        catch (error) {
                            // If is is a hexstring, the address is bad (See #694)
                            if ((0, bytes_1.isHexString)(name)) {
                                throw error;
                            }
                        }
                        if (typeof (name) !== "string") {
                            logger.throwArgumentError("invalid ENS name", "name", name);
                        }
                        return [4 /*yield*/, this.getResolver(name)];
                    case 2:
                        resolver = _a.sent();
                        if (!resolver) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, resolver.getAddress()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseProvider.prototype.lookupAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var reverseName, resolverAddress, bytes, _a, length, name, addr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, address];
                    case 1:
                        address = _b.sent();
                        address = this.formatter.address(address);
                        reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
                        return [4 /*yield*/, this._getResolver(reverseName)];
                    case 2:
                        resolverAddress = _b.sent();
                        if (!resolverAddress) {
                            return [2 /*return*/, null];
                        }
                        _a = bytes_1.arrayify;
                        return [4 /*yield*/, this.call({
                                to: resolverAddress,
                                data: ("0x691f3431" + (0, hash_1.namehash)(reverseName).substring(2))
                            })];
                    case 3:
                        bytes = _a.apply(void 0, [_b.sent()]);
                        // Strip off the dynamic string pointer (0x20)
                        if (bytes.length < 32 || !bignumber_1.BigNumber.from(bytes.slice(0, 32)).eq(32)) {
                            return [2 /*return*/, null];
                        }
                        bytes = bytes.slice(32);
                        // Not a length-prefixed string
                        if (bytes.length < 32) {
                            return [2 /*return*/, null];
                        }
                        length = bignumber_1.BigNumber.from(bytes.slice(0, 32)).toNumber();
                        bytes = bytes.slice(32);
                        // Length longer than available data
                        if (length > bytes.length) {
                            return [2 /*return*/, null];
                        }
                        name = (0, strings_1.toUtf8String)(bytes.slice(0, length));
                        return [4 /*yield*/, this.resolveName(name)];
                    case 4:
                        addr = _b.sent();
                        if (addr != address) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, name];
                }
            });
        });
    };
    BaseProvider.prototype.getAvatar = function (nameOrAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var resolver, address, reverseName, resolverAddress, avatar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resolver = null;
                        if (!(0, bytes_1.isHexString)(nameOrAddress)) return [3 /*break*/, 2];
                        address = this.formatter.address(nameOrAddress);
                        reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
                        return [4 /*yield*/, this._getResolver(reverseName)];
                    case 1:
                        resolverAddress = _a.sent();
                        if (!resolverAddress) {
                            return [2 /*return*/, null];
                        }
                        resolver = new Resolver(this, resolverAddress, "_", address);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getResolver(nameOrAddress)];
                    case 3:
                        // ENS name; forward lookup
                        resolver = _a.sent();
                        if (!resolver) {
                            return [2 /*return*/, null];
                        }
                        _a.label = 4;
                    case 4: return [4 /*yield*/, resolver.getAvatar()];
                    case 5:
                        avatar = _a.sent();
                        if (avatar == null) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, avatar.url];
                }
            });
        });
    };
    BaseProvider.prototype.perform = function (method, params) {
        return logger.throwError(method + " not implemented", logger_1.Logger.errors.NOT_IMPLEMENTED, { operation: method });
    };
    BaseProvider.prototype._startEvent = function (event) {
        this.polling = (this._events.filter(function (e) { return e.pollable(); }).length > 0);
    };
    BaseProvider.prototype._stopEvent = function (event) {
        this.polling = (this._events.filter(function (e) { return e.pollable(); }).length > 0);
    };
    BaseProvider.prototype._addEventListener = function (eventName, listener, once) {
        var event = new Event(getEventTag(eventName), listener, once);
        this._events.push(event);
        this._startEvent(event);
        return this;
    };
    BaseProvider.prototype.on = function (eventName, listener) {
        return this._addEventListener(eventName, listener, false);
    };
    BaseProvider.prototype.once = function (eventName, listener) {
        return this._addEventListener(eventName, listener, true);
    };
    BaseProvider.prototype.emit = function (eventName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = false;
        var stopped = [];
        var eventTag = getEventTag(eventName);
        this._events = this._events.filter(function (event) {
            if (event.tag !== eventTag) {
                return true;
            }
            setTimeout(function () {
                event.listener.apply(_this, args);
            }, 0);
            result = true;
            if (event.once) {
                stopped.push(event);
                return false;
            }
            return true;
        });
        stopped.forEach(function (event) { _this._stopEvent(event); });
        return result;
    };
    BaseProvider.prototype.listenerCount = function (eventName) {
        if (!eventName) {
            return this._events.length;
        }
        var eventTag = getEventTag(eventName);
        return this._events.filter(function (event) {
            return (event.tag === eventTag);
        }).length;
    };
    BaseProvider.prototype.listeners = function (eventName) {
        if (eventName == null) {
            return this._events.map(function (event) { return event.listener; });
        }
        var eventTag = getEventTag(eventName);
        return this._events
            .filter(function (event) { return (event.tag === eventTag); })
            .map(function (event) { return event.listener; });
    };
    BaseProvider.prototype.off = function (eventName, listener) {
        var _this = this;
        if (listener == null) {
            return this.removeAllListeners(eventName);
        }
        var stopped = [];
        var found = false;
        var eventTag = getEventTag(eventName);
        this._events = this._events.filter(function (event) {
            if (event.tag !== eventTag || event.listener != listener) {
                return true;
            }
            if (found) {
                return true;
            }
            found = true;
            stopped.push(event);
            return false;
        });
        stopped.forEach(function (event) { _this._stopEvent(event); });
        return this;
    };
    BaseProvider.prototype.removeAllListeners = function (eventName) {
        var _this = this;
        var stopped = [];
        if (eventName == null) {
            stopped = this._events;
            this._events = [];
        }
        else {
            var eventTag_1 = getEventTag(eventName);
            this._events = this._events.filter(function (event) {
                if (event.tag !== eventTag_1) {
                    return true;
                }
                stopped.push(event);
                return false;
            });
        }
        stopped.forEach(function (event) { _this._stopEvent(event); });
        return this;
    };
    return BaseProvider;
}(abstract_provider_1.Provider));
exports.BaseProvider = BaseProvider;
//# sourceMappingURL=base-provider.js.map
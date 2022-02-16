"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.__esModule = true;
exports.KyveSDK = exports.KyveWallet = exports.KYVE_DECIMALS = void 0;
var stargate_1 = require("@cosmjs/stargate");
var axios_1 = __importDefault(require("axios"));
var bignumber_js_1 = require("bignumber.js");
var constants_1 = require("./utils/constants");
var registry_1 = require("./utils/registry");
var crypto_1 = require("@cosmjs/crypto");
var encoding_1 = require("@cosmjs/encoding");
var bech32 = __importStar(require("bech32"));
var constants_2 = require("./utils/constants");
__createBinding(exports, constants_2, "KYVE_DECIMALS");
var wallet_1 = require("./wallet");
__createBinding(exports, wallet_1, "KyveWallet");
var KyveSDK = /** @class */ (function () {
    function KyveSDK(endpoint, wallet) {
        this.endpoint = endpoint;
        this.wallet = wallet;
    }
    KyveSDK.prototype.getClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!!this.client) return [3 /*break*/, 4];
                        _a = this;
                        _c = (_b = stargate_1.SigningStargateClient).connectWithSigner;
                        _d = [this.endpoint];
                        return [4 /*yield*/, this.wallet.getSigner()];
                    case 1:
                        _d = _d.concat([_f.sent()]);
                        _e = {};
                        return [4 /*yield*/, (0, registry_1.createRegistry)()];
                    case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.registry = _f.sent(), _e)]))];
                    case 3:
                        _a.client = _f.sent();
                        _f.label = 4;
                    case 4: return [2 /*return*/, this.client];
                }
            });
        });
    };
    KyveSDK.prototype.fetchPoolState = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get("".concat(this.endpoint, "/kyve/registry/pool/").concat(id))];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data.Pool];
                }
            });
        });
    };
    KyveSDK.prototype.create = function (metadata, startHeight, bundleDelay, operatingCost, storageCost, bundleProposal, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/KYVENetwork.kyve.registry.MsgCreatePool",
                            value: {
                                creator: creator,
                                metadata: metadata,
                                startHeight: startHeight,
                                bundleDelay: bundleDelay,
                                operatingCost: operatingCost,
                                storageCost: storageCost,
                                bundleProposal: bundleProposal
                            }
                        };
                        return [4 /*yield*/, client.signAndBroadcast(creator, [msg], fee)];
                    case 3:
                        tx = _a.sent();
                        return [2 /*return*/, tx.transactionHash];
                }
            });
        });
    };
    KyveSDK.prototype.fund = function (id, amount, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/KYVENetwork.kyve.registry.MsgFundPool",
                            value: {
                                creator: creator,
                                id: id,
                                amount: amount
                            }
                        };
                        return [4 /*yield*/, client.signAndBroadcast(creator, [msg], fee)];
                    case 3:
                        tx = _a.sent();
                        return [2 /*return*/, tx.transactionHash];
                }
            });
        });
    };
    KyveSDK.prototype.transfer = function (recipient, amount, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, parsedAmount, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        parsedAmount = new bignumber_js_1.BigNumber(amount)
                            .multipliedBy(new bignumber_js_1.BigNumber(10).pow(constants_1.KYVE_DECIMALS))
                            .toNumber();
                        return [4 /*yield*/, client.sendTokens(creator, recipient, (0, stargate_1.coins)(parsedAmount, "kyve"), fee)];
                    case 3:
                        tx = _a.sent();
                        return [2 /*return*/, tx.transactionHash];
                }
            });
        });
    };
    /**
     * getLogs from all blocks within the range "fromBlock" (inclusive) and "toBlock" (inclusive)
     * @param fromBlock (inclusive)
     * @param toBlock (inclusive)
     */
    KyveSDK.prototype.getLogs = function (fromBlock, toBlock) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var client, _b, transactions, i, block, _i, _c, encodedTransaction, id, indexedTx, _d, _e, eventWrapper, _f, _g, event_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (!((_a = this.client) !== null && _a !== void 0)) return [3 /*break*/, 1];
                        _b = _a;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b = (_h.sent());
                        _h.label = 3;
                    case 3:
                        client = _b;
                        transactions = [];
                        i = fromBlock;
                        _h.label = 4;
                    case 4:
                        if (!(i <= toBlock)) return [3 /*break*/, 10];
                        return [4 /*yield*/, client.getBlock(i)];
                    case 5:
                        block = _h.sent();
                        _i = 0, _c = block.txs;
                        _h.label = 6;
                    case 6:
                        if (!(_i < _c.length)) return [3 /*break*/, 9];
                        encodedTransaction = _c[_i];
                        id = (0, encoding_1.toHex)((0, crypto_1.sha256)(encodedTransaction));
                        return [4 /*yield*/, client.getTx(id)];
                    case 7:
                        indexedTx = _h.sent();
                        // Extract event logs
                        if (indexedTx != null) {
                            for (_d = 0, _e = JSON.parse(indexedTx.rawLog); _d < _e.length; _d++) {
                                eventWrapper = _e[_d];
                                for (_f = 0, _g = eventWrapper.events; _f < _g.length; _f++) {
                                    event_1 = _g[_f];
                                    transactions.push(event_1);
                                }
                            }
                        }
                        _h.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9:
                        i++;
                        return [3 /*break*/, 4];
                    case 10: return [2 /*return*/, transactions];
                }
            });
        });
    };
    KyveSDK.prototype.isValidAddress = function (address) {
        try {
            bech32.bech32.decode(address);
            return true;
        }
        catch (_a) { }
        return false;
    };
    return KyveSDK;
}());
exports.KyveSDK = KyveSDK;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
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
var registry_1 = __importDefault(require("./utils/registry"));
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
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!!this.client) return [3 /*break*/, 3];
                        _a = this;
                        _c = (_b = stargate_1.SigningStargateClient).connectWithSigner;
                        _d = [this.endpoint];
                        return [4 /*yield*/, this.wallet.getSigner()];
                    case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent(), { registry: registry_1["default"] }]))];
                    case 2:
                        _a.client = _e.sent();
                        _e.label = 3;
                    case 3: return [2 /*return*/, this.client];
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
    return KyveSDK;
}());
exports.KyveSDK = KyveSDK;

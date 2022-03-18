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
var registry_1 = require("./utils/registry");
var crypto_1 = require("@cosmjs/crypto");
var encoding_1 = require("@cosmjs/encoding");
var bech32_1 = require("bech32");
var proto_signing_1 = require("@cosmjs/proto-signing");
var transactions_1 = require("./types/transactions");
var events_1 = require("./types/events");
var cosmos_1 = require("@keplr-wallet/cosmos");
var addresses_1 = require("@cosmjs/amino/build/addresses");
var tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
var long_1 = __importDefault(require("long"));
var constants_2 = require("./utils/constants");
__createBinding(exports, constants_2, "KYVE_DECIMALS");
var wallet_1 = require("./wallet");
__createBinding(exports, wallet_1, "KyveWallet");
var KyveSDK = /** @class */ (function () {
    function KyveSDK(wallet) {
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
                        _d = [constants_1.KYVE_ENDPOINTS[this.wallet.network].rpc];
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
                    case 0: return [4 /*yield*/, axios_1["default"].get("".concat(constants_1.KYVE_ENDPOINTS[this.wallet.network].rest, "/kyve/registry/v1beta1/pool/").concat(id))];
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
                            typeUrl: "/kyve.registry.v1beta1.MsgCreatePool",
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
            var client, creator, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/kyve.registry.v1beta1.MsgFundPool",
                            value: {
                                creator: creator,
                                id: id,
                                amount: amount.toString()
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
                }
            });
        });
    };
    KyveSDK.prototype.defund = function (id, amount, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/kyve.registry.v1beta1.MsgDefundPool",
                            value: {
                                creator: creator,
                                id: id,
                                amount: amount.toString()
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
                }
            });
        });
    };
    KyveSDK.prototype.stake = function (id, amount, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/kyve.registry.v1beta1.MsgStakePool",
                            value: {
                                creator: creator,
                                id: id,
                                amount: amount.toString()
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
                }
            });
        });
    };
    KyveSDK.prototype.unstake = function (id, amount, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/kyve.registry.v1beta1.MsgUnstakePool",
                            value: {
                                creator: creator,
                                id: id,
                                amount: amount.toString()
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
                }
            });
        });
    };
    KyveSDK.prototype.delegate = function (id, staker, amount, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/kyve.registry.v1beta1.MsgDelegatePool",
                            value: {
                                creator: creator,
                                id: id,
                                staker: staker,
                                amount: amount.toString()
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
                }
            });
        });
    };
    KyveSDK.prototype.undelegate = function (id, staker, amount, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/kyve.registry.v1beta1.MsgUndelegatePool",
                            value: {
                                creator: creator,
                                id: id,
                                staker: staker,
                                amount: amount.toString()
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
                }
            });
        });
    };
    KyveSDK.prototype.withdrawRewards = function (id, staker, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/kyve.registry.v1beta1.MsgWithdrawPool",
                            value: {
                                creator: creator,
                                id: id,
                                staker: staker
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
                }
            });
        });
    };
    KyveSDK.prototype.govDeposit = function (id, amount, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
                            value: {
                                proposalId: long_1["default"].fromString(id),
                                depositor: creator,
                                amount: (0, stargate_1.coins)(amount.toString(), "tkyve")
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
                }
            });
        });
    };
    KyveSDK.prototype.govVote = function (id, option, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, _option, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        _option = cosmos_1.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_UNSPECIFIED;
                        switch (option) {
                            case "Yes":
                                _option = cosmos_1.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_YES;
                                break;
                            case "Abstain":
                                _option = cosmos_1.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_ABSTAIN;
                                break;
                            case "No":
                                _option = cosmos_1.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO;
                                break;
                            case "NoWithVeto":
                                _option = cosmos_1.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO_WITH_VETO;
                                break;
                        }
                        msg = {
                            typeUrl: "/cosmos.gov.v1beta1.MsgVote",
                            value: {
                                proposalId: long_1["default"].fromString(id),
                                voter: creator,
                                option: _option
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
                }
            });
        });
    };
    KyveSDK.prototype.submitBundleProposal = function (id, bundleId, byteSize, bundleSize, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
                            value: {
                                creator: creator,
                                id: id,
                                bundleId: bundleId,
                                byteSize: byteSize,
                                bundleSize: bundleSize
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
                }
            });
        });
    };
    KyveSDK.prototype.voteProposal = function (id, bundleId, support, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/kyve.registry.v1beta1.MsgVoteProposal",
                            value: {
                                creator: creator,
                                id: id,
                                bundleId: bundleId,
                                support: support
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
                }
            });
        });
    };
    KyveSDK.prototype.claimUploaderRole = function (id, fee) {
        if (fee === void 0) { fee = constants_1.KYVE_DEFAULT_FEE; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
                            value: {
                                creator: creator,
                                id: id
                            }
                        };
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 3:
                        txRaw = _a.sent();
                        txBytes = tx_1.TxRaw.encode(txRaw).finish();
                        return [2 /*return*/, {
                                transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(txBytes)).toUpperCase(),
                                transactionBroadcast: client.broadcastTx(txBytes)
                            }];
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
                        return [4 /*yield*/, client.sendTokens(creator, recipient, (0, stargate_1.coins)(parsedAmount, "tkyve"), fee)];
                    case 3:
                        tx = _a.sent();
                        return [2 /*return*/, tx.transactionHash];
                }
            });
        });
    };
    /**
     * get message-logs from all blocks within the range "fromBlock" (inclusive) and "toBlock" (inclusive)
     * @param fromBlock (inclusive)
     * @param toBlock (inclusive)
     */
    KyveSDK.prototype.getDecodedTransactions = function (fromBlock, toBlock) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var client, _b, transactions, i, block, _i, _c, encodedTransaction, id, fullDecodedTransaction, indexedTx, decodedRaw, _d, _e, msg, _f, _g, eventWrapper, _h, _j, event_1;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        if (!((_a = this.client) !== null && _a !== void 0)) return [3 /*break*/, 1];
                        _b = _a;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b = (_k.sent());
                        _k.label = 3;
                    case 3:
                        client = _b;
                        transactions = [];
                        i = fromBlock;
                        _k.label = 4;
                    case 4:
                        if (!(i <= toBlock)) return [3 /*break*/, 10];
                        return [4 /*yield*/, client.getBlock(i)];
                    case 5:
                        block = _k.sent();
                        _i = 0, _c = block.txs;
                        _k.label = 6;
                    case 6:
                        if (!(_i < _c.length)) return [3 /*break*/, 9];
                        encodedTransaction = _c[_i];
                        id = (0, encoding_1.toHex)((0, crypto_1.sha256)(encodedTransaction));
                        fullDecodedTransaction = new transactions_1.FullDecodedTransaction();
                        return [4 /*yield*/, client.getTx(id)];
                    case 7:
                        indexedTx = _k.sent();
                        if (indexedTx != null) {
                            fullDecodedTransaction.indexedTx = indexedTx;
                            fullDecodedTransaction.blockTime = new Date(block.header.time);
                            fullDecodedTransaction.blockNumber = block.header.height;
                            decodedRaw = (0, proto_signing_1.decodeTxRaw)(indexedTx.tx);
                            fullDecodedTransaction.messages = [];
                            for (_d = 0, _e = decodedRaw.body.messages; _d < _e.length; _d++) {
                                msg = _e[_d];
                                if (msg.typeUrl.startsWith("/kyve")) {
                                    fullDecodedTransaction.messages.push({
                                        typeUrl: msg.typeUrl,
                                        value: client.registry.decode({
                                            typeUrl: msg.typeUrl,
                                            value: msg.value
                                        })
                                    });
                                }
                            }
                            fullDecodedTransaction.events = [];
                            // Extract event logs
                            try {
                                for (_f = 0, _g = JSON.parse(indexedTx.rawLog); _f < _g.length; _f++) {
                                    eventWrapper = _g[_f];
                                    for (_h = 0, _j = eventWrapper.events; _h < _j.length; _h++) {
                                        event_1 = _j[_h];
                                        fullDecodedTransaction.events.push(event_1);
                                    }
                                }
                            }
                            catch (e) { }
                        }
                        transactions.push(fullDecodedTransaction);
                        _k.label = 8;
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
    KyveSDK.prototype.getMessageEventLogs = function (fromBlock, toBlock) {
        return __awaiter(this, void 0, void 0, function () {
            var decodedTransactions, events, _i, decodedTransactions_1, tx, eventsArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDecodedTransactions(fromBlock, toBlock)];
                    case 1:
                        decodedTransactions = _a.sent();
                        events = [];
                        for (_i = 0, decodedTransactions_1 = decodedTransactions; _i < decodedTransactions_1.length; _i++) {
                            tx = decodedTransactions_1[_i];
                            if (tx.events && tx.events.length > 0) {
                                eventsArray = tx.events.find(function (value) { return value.type == "message"; })
                                    .attributes;
                                if (eventsArray.find(function (value) { return value.key == "module"; }) &&
                                    eventsArray.find(function (value) { return value.key == "action"; }) &&
                                    eventsArray.find(function (value) { return value.key == "sender"; })) {
                                    events.push(new events_1.MessageEvent(eventsArray, tx));
                                }
                            }
                        }
                        return [2 /*return*/, events];
                }
            });
        });
    };
    KyveSDK.prototype.isValidAddress = function (address) {
        try {
            bech32_1.bech32.decode(address);
            return true;
        }
        catch (_a) { }
        return false;
    };
    KyveSDK.prototype.signString = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!window.keplr) return [3 /*break*/, 4];
                        if (!(window === null || window === void 0)) return [3 /*break*/, 1];
                        _a = void 0;
                        return [3 /*break*/, 3];
                    case 1:
                        _c = (_b = window.keplr).signArbitrary;
                        _d = ["kyve-".concat(this.wallet.network)];
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        _a = _c.apply(_b, _d.concat([_e.sent(), message]));
                        _e.label = 3;
                    case 3: return [2 /*return*/, _a];
                    case 4: throw new Error("Keplr wallet not installed.");
                }
            });
        });
    };
    KyveSDK.prototype.verifyString = function (signature, data, pubKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, cosmos_1.verifyADR36Amino)("kyve", this.getAddressFromPubKey(pubKey), new TextEncoder().encode(data), (0, encoding_1.fromBase64)(pubKey), (0, encoding_1.fromBase64)(signature))];
            });
        });
    };
    KyveSDK.prototype.getAddressFromPubKey = function (pubKey) {
        return (0, addresses_1.pubkeyToAddress)({ type: "tendermint/PubKeySecp256k1", value: pubKey }, "kyve");
    };
    return KyveSDK;
}());
exports.KyveSDK = KyveSDK;

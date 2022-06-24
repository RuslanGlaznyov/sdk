"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
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
            var gasPrice, _a, _b, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!!this.client) return [3 /*break*/, 4];
                        gasPrice = stargate_1.GasPrice.fromString("0tkyve");
                        _a = this;
                        _c = (_b = stargate_1.SigningStargateClient).connectWithSigner;
                        _d = [this.wallet.network.rpc];
                        return [4 /*yield*/, this.wallet.getSigner()];
                    case 1:
                        _d = _d.concat([_f.sent()]);
                        _e = {};
                        return [4 /*yield*/, (0, registry_1.createRegistry)()];
                    case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.registry = _f.sent(), _e.gasPrice = gasPrice, _e)]))];
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
                    case 0: return [4 /*yield*/, axios_1["default"].get("".concat(this.wallet.network.rest, "/kyve/registry/v1beta1/pool/").concat(id))];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data.Pool];
                }
            });
        });
    };
    KyveSDK.prototype.fund = function (id, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
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
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.defund = function (id, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
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
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.stake = function (id, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
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
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.unstake = function (id, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
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
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.delegate = function (id, staker, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
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
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.undelegate = function (id, staker, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
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
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.withdrawRewards = function (id, staker) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
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
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.updateMetadata = function (id, commission, moniker, website, logo) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        msg = {
                            typeUrl: "/kyve.registry.v1beta1.MsgUpdateMetadata",
                            value: {
                                creator: creator,
                                id: id,
                                commission: commission,
                                moniker: moniker,
                                website: website,
                                logo: logo
                            }
                        };
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.govSubmitProposal = function (type, content, amount, isExpedited) {
        if (isExpedited === void 0) { isExpedited = false; }
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, typeUrl, encodedContent, msg, fee, txRaw, txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        creator = _a.sent();
                        switch (type) {
                            case "TextProposal":
                                typeUrl = "/cosmos.gov.v1beta1.TextProposal";
                                encodedContent = registry_1.TextProposal.encode(content).finish();
                                break;
                            case "ParameterChangeProposal":
                                typeUrl = "/cosmos.params.v1beta1.ParameterChangeProposal";
                                encodedContent = registry_1.ParameterChangeProposal.encode(content).finish();
                                break;
                            case "CreatePoolProposal":
                                typeUrl = "/kyve.registry.v1beta1.CreatePoolProposal";
                                encodedContent = registry_1.CreatePoolProposal.encode(content).finish();
                                break;
                            case "UpdatePoolProposal":
                                typeUrl = "/kyve.registry.v1beta1.UpdatePoolProposal";
                                encodedContent = registry_1.UpdatePoolProposal.encode(content).finish();
                                break;
                            case "PausePoolProposal":
                                typeUrl = "/kyve.registry.v1beta1.PausePoolProposal";
                                encodedContent = registry_1.PausePoolProposal.encode(content).finish();
                                break;
                            case "UnpausePoolProposal":
                                typeUrl = "/kyve.registry.v1beta1.UnpausePoolProposal";
                                encodedContent = registry_1.UnpausePoolProposal.encode(content).finish();
                                break;
                            case "SchedulePoolUpgradeProposal":
                                typeUrl = "/kyve.registry.v1beta1.SchedulePoolUpgradeProposal";
                                encodedContent = registry_1.SchedulePoolUpgradeProposal.encode(content).finish();
                                break;
                            case "CancelPoolUpgradeProposal":
                                typeUrl = "/kyve.registry.v1beta1.CancelPoolUpgradeProposal";
                                encodedContent = registry_1.CancelPoolUpgradeProposal.encode(content).finish();
                                break;
                        }
                        msg = {
                            typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
                            value: {
                                content: {
                                    typeUrl: typeUrl,
                                    value: encodedContent
                                },
                                initial_deposit: (0, stargate_1.coins)(amount.toString(), "tkyve"),
                                proposer: creator,
                                is_expedited: isExpedited
                            }
                        };
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.govDeposit = function (id, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
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
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.govVote = function (id, option) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, _option, msg, fee, txRaw, txBytes;
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
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.submitBundleProposal = function (id, bundleId, byteSize, fromHeight, toHeight, fromKey, toKey, toValue) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
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
                                fromHeight: fromHeight,
                                toHeight: toHeight,
                                fromKey: fromKey,
                                toKey: toKey,
                                toValue: toValue
                            }
                        };
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.voteProposal = function (id, bundleId, vote) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
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
                                vote: vote
                            }
                        };
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.claimUploaderRole = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var client, creator, msg, fee, txRaw, txBytes;
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
                        return [4 /*yield*/, this.fetchFee([msg])];
                    case 3:
                        fee = _a.sent();
                        return [4 /*yield*/, client.sign(creator, [msg], fee, "")];
                    case 4:
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
    KyveSDK.prototype.transfer = function (recipient, amount) {
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
                        return [4 /*yield*/, client.sendTokens(creator, recipient, (0, stargate_1.coins)(parsedAmount, "tkyve"), "auto")];
                    case 3:
                        tx = _a.sent();
                        return [2 /*return*/, tx.transactionHash];
                }
            });
        });
    };
    KyveSDK.prototype.getMessageEventLogs = function (fromBlock, toBlock) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var client, _f, tendermint, events, i, block, blockResult, e_1, _i, _g, encodedTransaction, id, fullDecodedTransaction, indexedTx, e_2, decodedRaw, _h, _j, msg, rawEventsArrays, _k, _l, eventWrapper, _m, _o, event_1, _p, rawEventsArrays_1, ev, kyveEvent, tx_sender, tx_action, singleEventArray, _q, _r, attr, eventsMessages, attributes, _s, eventsMessages_1, ev, decoder, decodedEvents, _t, attributes_1, ev, kyveEvent, tx_sender, tx_action, singleEventArray, _u, _v, attr;
            return __generator(this, function (_w) {
                switch (_w.label) {
                    case 0:
                        if (!((_a = this.client) !== null && _a !== void 0)) return [3 /*break*/, 1];
                        _f = _a;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.getClient()];
                    case 2:
                        _f = (_w.sent());
                        _w.label = 3;
                    case 3:
                        client = _f;
                        return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(this.wallet.network.rpc)];
                    case 4:
                        tendermint = _w.sent();
                        events = [];
                        i = fromBlock;
                        _w.label = 5;
                    case 5:
                        if (!(i <= toBlock)) return [3 /*break*/, 19];
                        return [4 /*yield*/, client.getBlock(i)];
                    case 6:
                        block = _w.sent();
                        blockResult = void 0;
                        _w.label = 7;
                    case 7:
                        _w.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, tendermint.blockResults(i)];
                    case 8:
                        blockResult = _w.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        e_1 = _w.sent();
                        events.push(new events_1.MessageEvent([
                            { key: "action", value: "ParsingError" },
                            { key: "stacktrace", value: JSON.stringify(e_1) },
                        ], new Date(block.header.time), block.header.height));
                        return [3 /*break*/, 10];
                    case 10:
                        _i = 0, _g = block.txs;
                        _w.label = 11;
                    case 11:
                        if (!(_i < _g.length)) return [3 /*break*/, 17];
                        encodedTransaction = _g[_i];
                        id = (0, encoding_1.toHex)((0, crypto_1.sha256)(encodedTransaction));
                        fullDecodedTransaction = new transactions_1.FullDecodedTransaction();
                        indexedTx = null;
                        _w.label = 12;
                    case 12:
                        _w.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, client.getTx(id)];
                    case 13:
                        indexedTx = _w.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        e_2 = _w.sent();
                        events.push(new events_1.MessageEvent([
                            { key: "action", value: "ParsingError" },
                            { key: "stacktrace", value: JSON.stringify(e_2) },
                        ], new Date(block.header.time), block.header.height));
                        return [3 /*break*/, 15];
                    case 15:
                        if (indexedTx != null) {
                            fullDecodedTransaction.indexedTx = indexedTx;
                            fullDecodedTransaction.blockTime = new Date(block.header.time);
                            fullDecodedTransaction.blockNumber = block.header.height;
                            decodedRaw = (0, proto_signing_1.decodeTxRaw)(indexedTx.tx);
                            fullDecodedTransaction.messages = [];
                            for (_h = 0, _j = decodedRaw.body.messages; _h < _j.length; _h++) {
                                msg = _j[_h];
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
                                rawEventsArrays = [];
                                for (_k = 0, _l = JSON.parse(indexedTx.rawLog); _k < _l.length; _k++) {
                                    eventWrapper = _l[_k];
                                    for (_m = 0, _o = eventWrapper.events; _m < _o.length; _m++) {
                                        event_1 = _o[_m];
                                        rawEventsArrays.push(event_1);
                                    }
                                }
                                for (_p = 0, rawEventsArrays_1 = rawEventsArrays; _p < rawEventsArrays_1.length; _p++) {
                                    ev = rawEventsArrays_1[_p];
                                    if (ev.type == "message") {
                                        kyveEvent = ev.attributes.filter(function (value) { return value.key == "EventName"; }).length;
                                        if (kyveEvent == 0) {
                                            events.push(new events_1.MessageEvent(ev.attributes, fullDecodedTransaction.blockTime, fullDecodedTransaction.blockNumber));
                                            fullDecodedTransaction.events.push(ev.attributes);
                                        }
                                        else {
                                            tx_sender = (_b = ev.attributes.find(function (value) { return value.key == "sender"; })) !== null && _b !== void 0 ? _b : { key: "sender", value: "" };
                                            tx_action = (_c = ev.attributes.find(function (value) { return value.key == "action"; })) !== null && _c !== void 0 ? _c : { key: "sender", value: "" };
                                            singleEventArray = [tx_sender, tx_action];
                                            for (_q = 0, _r = ev.attributes.reverse(); _q < _r.length; _q++) {
                                                attr = _r[_q];
                                                singleEventArray.push(attr);
                                                if (attr.key == "EventName") {
                                                    if (singleEventArray.length > 2) {
                                                        events.push(new events_1.MessageEvent(singleEventArray, fullDecodedTransaction.blockTime, fullDecodedTransaction.blockNumber));
                                                        fullDecodedTransaction.events.push(singleEventArray);
                                                    }
                                                    singleEventArray = [tx_sender, tx_action];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            catch (e) { }
                        }
                        _w.label = 16;
                    case 16:
                        _i++;
                        return [3 /*break*/, 11];
                    case 17:
                        // Iterate EndBlockEvents
                        if (blockResult != undefined) {
                            eventsMessages = blockResult.endBlockEvents.filter(function (value) { return value.type == "message"; });
                            attributes = [];
                            for (_s = 0, eventsMessages_1 = eventsMessages; _s < eventsMessages_1.length; _s++) {
                                ev = eventsMessages_1[_s];
                                attributes.push.apply(attributes, ev.attributes);
                            }
                            if (attributes.length > 0) {
                                decoder = new TextDecoder();
                                decodedEvents = [];
                                for (_t = 0, attributes_1 = attributes; _t < attributes_1.length; _t++) {
                                    ev = attributes_1[_t];
                                    decodedEvents.push({
                                        key: decoder.decode(ev.key),
                                        value: decoder.decode(ev.value)
                                    });
                                }
                                kyveEvent = decodedEvents.filter(function (value) { return value.key == "EventName"; }).length;
                                if (kyveEvent == 0) {
                                    events.push(new events_1.MessageEvent(decodedEvents, new Date(block.header.time), blockResult.height));
                                }
                                else {
                                    tx_sender = (_d = decodedEvents.find(function (value) { return value.key == "sender"; })) !== null && _d !== void 0 ? _d : { key: "sender", value: "" };
                                    tx_action = (_e = decodedEvents.find(function (value) { return value.key == "action"; })) !== null && _e !== void 0 ? _e : { key: "sender", value: "" };
                                    singleEventArray = [tx_sender, tx_action];
                                    for (_u = 0, _v = decodedEvents.reverse(); _u < _v.length; _u++) {
                                        attr = _v[_u];
                                        singleEventArray.push(attr);
                                        if (attr.key == "EventName") {
                                            if (singleEventArray.length > 2) {
                                                events.push(new events_1.MessageEvent(singleEventArray, new Date(block.header.time), blockResult.height));
                                            }
                                            singleEventArray = [tx_sender, tx_action];
                                        }
                                    }
                                }
                            }
                        }
                        _w.label = 18;
                    case 18:
                        i++;
                        return [3 /*break*/, 5];
                    case 19: return [2 /*return*/, events];
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
            var address, signDoc, signer, signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wallet.getAddress()];
                    case 1:
                        address = _a.sent();
                        if (!(typeof window !== "undefined")) return [3 /*break*/, 2];
                        if (window.keplr) {
                            return [2 /*return*/, window.keplr.signArbitrary(this.wallet.getChainId(), address, message)];
                        }
                        else {
                            throw new Error("Please install Keplr.");
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        signDoc = (0, cosmos_1.makeADR36AminoSignDoc)(address, message);
                        return [4 /*yield*/, this.wallet.getAminoSigner()];
                    case 3:
                        signer = _a.sent();
                        return [4 /*yield*/, signer.signAmino(address, signDoc)];
                    case 4:
                        signature = (_a.sent()).signature;
                        return [2 /*return*/, signature];
                    case 5: return [2 /*return*/];
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
    KyveSDK.prototype.fetchFee = function (messages) {
        return __awaiter(this, void 0, void 0, function () {
            var client, signer, estimation, multiplier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.wallet.getAddress()];
                    case 2:
                        signer = _a.sent();
                        return [4 /*yield*/, client.simulate(signer, messages, "")];
                    case 3:
                        estimation = _a.sent();
                        multiplier = 1.5;
                        return [2 /*return*/, {
                                amount: (0, stargate_1.coins)(0, "tkyve"),
                                gas: Math.floor(estimation * multiplier).toString()
                            }];
                }
            });
        });
    };
    return KyveSDK;
}());
exports.KyveSDK = KyveSDK;

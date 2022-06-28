"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.__esModule = true;
var stargate_1 = require("@cosmjs/stargate");
var tx_registry_1 = require("../../../registry/tx.registry");
var bignumber_js_1 = require("bignumber.js");
var constants_1 = require("../../../constants");
var events_1 = require("../../../types/events");
var tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
var encoding_1 = require("@cosmjs/encoding");
var crypto_1 = require("@cosmjs/crypto");
var transactions_1 = require("../../../types/transactions");
var proto_signing_1 = require("@cosmjs/proto-signing");
var constants_2 = require("../../../constants");
var KyveBaseMsg = /** @class */ (function () {
    function KyveBaseMsg(client, account) {
        this.account = account;
        this.nativeClient = client;
    }
    KyveBaseMsg.prototype.foundPool = function (value, options) {
        var tx = tx_registry_1.withTypeUrl.fundPool(__assign(__assign({}, value), { creator: this.account.address }));
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveBaseMsg.prototype.defundPool = function (value, options) {
        var tx = tx_registry_1.withTypeUrl.defundPool(__assign(__assign({}, value), { creator: this.account.address }));
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveBaseMsg.prototype.stakePool = function (value, options) {
        var tx = tx_registry_1.withTypeUrl.stakePool(__assign(__assign({}, value), { creator: this.account.address }));
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveBaseMsg.prototype.unstakePool = function (value, options) {
        var tx = tx_registry_1.withTypeUrl.unstakePool(__assign(__assign({}, value), { creator: this.account.address }));
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveBaseMsg.prototype.delegatePool = function (value, options) {
        var tx = tx_registry_1.withTypeUrl.delegatePool(__assign(__assign({}, value), { creator: this.account.address }));
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveBaseMsg.prototype.withdrawPool = function (value, options) {
        var tx = tx_registry_1.withTypeUrl.withdrawPool(__assign(__assign({}, value), { creator: this.account.address }));
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveBaseMsg.prototype.undelegatePool = function (value, options) {
        var tx = tx_registry_1.withTypeUrl.undelegatePool(__assign(__assign({}, value), { creator: this.account.address }));
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveBaseMsg.prototype.submitBundleProposal = function (value, options) {
        var tx = tx_registry_1.withTypeUrl.submitBundleProposal(__assign(__assign({}, value), { creator: this.account.address }));
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveBaseMsg.prototype.voteProposal = function (value, options) {
        var tx = tx_registry_1.withTypeUrl.voteProposal(__assign(__assign({}, value), { creator: this.account.address }));
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveBaseMsg.prototype.claimUploaderRole = function (value, options) {
        var tx = tx_registry_1.withTypeUrl.claimUploaderRole(__assign(__assign({}, value), { creator: this.account.address }));
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveBaseMsg.prototype.updateMetadata = function (value, options) {
        var tx = tx_registry_1.withTypeUrl.updateMetadata(__assign(__assign({}, value), { creator: this.account.address }));
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    //todo test
    KyveBaseMsg.prototype.transfer = function (recipient, amount, options) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedAmount;
            return __generator(this, function (_a) {
                parsedAmount = new bignumber_js_1.BigNumber(amount)
                    .multipliedBy(new bignumber_js_1.BigNumber(10).pow(constants_1.KYVE_DECIMALS))
                    .toNumber();
                return [2 /*return*/, this.nativeClient.sendTokens(this.account.address, recipient, (0, stargate_1.coins)(parsedAmount, constants_2.DENOM), (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo)];
            });
        });
    };
    //TODO refactor it :) !
    KyveBaseMsg.prototype.getMessageEventLogs = function (fromBlock, toBlock) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var client, tendermint, events, i, block, blockResult, e_1, _i, _e, encodedTransaction, id, fullDecodedTransaction, indexedTx, e_2, decodedRaw, _f, _g, msg, rawEventsArrays, _h, _j, eventWrapper, _k, _l, event_1, _m, rawEventsArrays_1, ev, kyveEvent, tx_sender, tx_action, singleEventArray, _o, _p, attr, eventsMessages, attributes, _q, eventsMessages_1, ev, decoder, decodedEvents, _r, attributes_1, ev, kyveEvent, tx_sender, tx_action, singleEventArray, _s, _t, attr;
            return __generator(this, function (_u) {
                switch (_u.label) {
                    case 0:
                        client = this.nativeClient;
                        return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(this.nativeClient.rpcEndpoint)];
                    case 1:
                        tendermint = _u.sent();
                        events = [];
                        i = fromBlock;
                        _u.label = 2;
                    case 2:
                        if (!(i <= toBlock)) return [3 /*break*/, 16];
                        return [4 /*yield*/, client.getBlock(i)];
                    case 3:
                        block = _u.sent();
                        blockResult = void 0;
                        _u.label = 4;
                    case 4:
                        _u.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, tendermint.blockResults(i)];
                    case 5:
                        blockResult = _u.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _u.sent();
                        events.push(new events_1.MessageEvent([
                            { key: "action", value: "ParsingError" },
                            { key: "stacktrace", value: JSON.stringify(e_1) },
                        ], new Date(block.header.time), block.header.height));
                        return [3 /*break*/, 7];
                    case 7:
                        _i = 0, _e = block.txs;
                        _u.label = 8;
                    case 8:
                        if (!(_i < _e.length)) return [3 /*break*/, 14];
                        encodedTransaction = _e[_i];
                        id = (0, encoding_1.toHex)((0, crypto_1.sha256)(encodedTransaction));
                        fullDecodedTransaction = new transactions_1.FullDecodedTransaction();
                        indexedTx = null;
                        _u.label = 9;
                    case 9:
                        _u.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, client.getTx(id)];
                    case 10:
                        indexedTx = _u.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_2 = _u.sent();
                        events.push(new events_1.MessageEvent([
                            { key: "action", value: "ParsingError" },
                            { key: "stacktrace", value: JSON.stringify(e_2) },
                        ], new Date(block.header.time), block.header.height));
                        return [3 /*break*/, 12];
                    case 12:
                        if (indexedTx != null) {
                            fullDecodedTransaction.indexedTx = indexedTx;
                            fullDecodedTransaction.blockTime = new Date(block.header.time);
                            fullDecodedTransaction.blockNumber = block.header.height;
                            decodedRaw = (0, proto_signing_1.decodeTxRaw)(indexedTx.tx);
                            fullDecodedTransaction.messages = [];
                            for (_f = 0, _g = decodedRaw.body.messages; _f < _g.length; _f++) {
                                msg = _g[_f];
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
                                for (_h = 0, _j = JSON.parse(indexedTx.rawLog); _h < _j.length; _h++) {
                                    eventWrapper = _j[_h];
                                    for (_k = 0, _l = eventWrapper.events; _k < _l.length; _k++) {
                                        event_1 = _l[_k];
                                        rawEventsArrays.push(event_1);
                                    }
                                }
                                for (_m = 0, rawEventsArrays_1 = rawEventsArrays; _m < rawEventsArrays_1.length; _m++) {
                                    ev = rawEventsArrays_1[_m];
                                    if (ev.type == "message") {
                                        kyveEvent = ev.attributes.filter(function (value) { return value.key == "EventName"; }).length;
                                        if (kyveEvent == 0) {
                                            events.push(new events_1.MessageEvent(ev.attributes, fullDecodedTransaction.blockTime, fullDecodedTransaction.blockNumber));
                                            fullDecodedTransaction.events.push(ev.attributes);
                                        }
                                        else {
                                            tx_sender = (_a = ev.attributes.find(function (value) { return value.key == "sender"; })) !== null && _a !== void 0 ? _a : { key: "sender", value: "" };
                                            tx_action = (_b = ev.attributes.find(function (value) { return value.key == "action"; })) !== null && _b !== void 0 ? _b : { key: "sender", value: "" };
                                            singleEventArray = [tx_sender, tx_action];
                                            for (_o = 0, _p = ev.attributes.reverse(); _o < _p.length; _o++) {
                                                attr = _p[_o];
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
                        _u.label = 13;
                    case 13:
                        _i++;
                        return [3 /*break*/, 8];
                    case 14:
                        // Iterate EndBlockEvents
                        if (blockResult != undefined) {
                            eventsMessages = blockResult.endBlockEvents.filter(function (value) { return value.type == "message"; });
                            attributes = [];
                            for (_q = 0, eventsMessages_1 = eventsMessages; _q < eventsMessages_1.length; _q++) {
                                ev = eventsMessages_1[_q];
                                attributes.push.apply(attributes, ev.attributes);
                            }
                            if (attributes.length > 0) {
                                decoder = new TextDecoder();
                                decodedEvents = [];
                                for (_r = 0, attributes_1 = attributes; _r < attributes_1.length; _r++) {
                                    ev = attributes_1[_r];
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
                                    tx_sender = (_c = decodedEvents.find(function (value) { return value.key == "sender"; })) !== null && _c !== void 0 ? _c : { key: "sender", value: "" };
                                    tx_action = (_d = decodedEvents.find(function (value) { return value.key == "action"; })) !== null && _d !== void 0 ? _d : { key: "sender", value: "" };
                                    singleEventArray = [tx_sender, tx_action];
                                    for (_s = 0, _t = decodedEvents.reverse(); _s < _t.length; _s++) {
                                        attr = _t[_s];
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
                        _u.label = 15;
                    case 15:
                        i++;
                        return [3 /*break*/, 2];
                    case 16: return [2 /*return*/, events];
                }
            });
        });
    };
    KyveBaseMsg.prototype.getKyveBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nativeClient.getBalance(this.account.address, constants_2.DENOM)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.amount];
                }
            });
        });
    };
    return KyveBaseMsg;
}());
exports["default"] = KyveBaseMsg;

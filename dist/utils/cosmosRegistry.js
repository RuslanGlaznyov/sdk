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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.MsgClientImpl = exports.MsgDepositResponse = exports.MsgDeposit = exports.MsgVoteWeightedResponse = exports.MsgVoteWeighted = exports.MsgVoteResponse = exports.MsgVote = exports.MsgSubmitProposalResponse = exports.MsgSubmitProposal = exports.protobufPackage = void 0;
/* eslint-disable */
var long_1 = __importDefault(require("long"));
var _m0 = __importStar(require("protobufjs/minimal"));
var any_1 = require("cosmjs-types/google/protobuf/any");
var gov_1 = require("cosmjs-types/cosmos/gov/v1beta1/gov");
var coin_1 = require("cosmjs-types/cosmos/base/v1beta1/coin");
exports.protobufPackage = "cosmos.gov.v1beta1";
function createBaseMsgSubmitProposal() {
    return {
        content: undefined,
        initialDeposit: [],
        proposer: "",
        isExpedited: false
    };
}
exports.MsgSubmitProposal = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.content !== undefined) {
            any_1.Any.encode(message.content, writer.uint32(10).fork()).ldelim();
        }
        for (var _i = 0, _a = message.initialDeposit; _i < _a.length; _i++) {
            var v = _a[_i];
            coin_1.Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.proposer !== "") {
            writer.uint32(26).string(message.proposer);
        }
        if (message.isExpedited) {
            writer.uint32(16).bool(message.isExpedited);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgSubmitProposal();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.content = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.initialDeposit.push(coin_1.Coin.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.proposer = reader.string();
                    break;
                case 4:
                    message.isExpedited = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            content: isSet(object.content) ? any_1.Any.fromJSON(object.content) : undefined,
            initialDeposit: Array.isArray(object === null || object === void 0 ? void 0 : object.initialDeposit)
                ? object.initialDeposit.map(function (e) { return coin_1.Coin.fromJSON(e); })
                : [],
            proposer: isSet(object.proposer) ? String(object.proposer) : "",
            isExpedited: isSet(object.isExpedited)
                ? Boolean(object.isExpedited)
                : false
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.content !== undefined &&
            (obj.content = message.content ? any_1.Any.toJSON(message.content) : undefined);
        if (message.initialDeposit) {
            obj.initialDeposit = message.initialDeposit.map(function (e) {
                return e ? coin_1.Coin.toJSON(e) : undefined;
            });
        }
        else {
            obj.initialDeposit = [];
        }
        message.proposer !== undefined && (obj.proposer = message.proposer);
        message.isExpedited !== undefined &&
            (obj.receiveEnabled = message.isExpedited);
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c;
        var message = createBaseMsgSubmitProposal();
        message.content =
            object.content !== undefined && object.content !== null
                ? any_1.Any.fromPartial(object.content)
                : undefined;
        message.initialDeposit =
            ((_a = object.initialDeposit) === null || _a === void 0 ? void 0 : _a.map(function (e) { return coin_1.Coin.fromPartial(e); })) || [];
        message.proposer = (_b = object.proposer) !== null && _b !== void 0 ? _b : "";
        message.isExpedited = (_c = object.isExpedited) !== null && _c !== void 0 ? _c : false;
        return message;
    }
};
function createBaseMsgSubmitProposalResponse() {
    return { proposalId: long_1["default"].UZERO };
}
exports.MsgSubmitProposalResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgSubmitProposalResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            proposalId: isSet(object.proposalId)
                ? long_1["default"].fromString(object.proposalId)
                : long_1["default"].UZERO
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.proposalId !== undefined &&
            (obj.proposalId = (message.proposalId || long_1["default"].UZERO).toString());
        return obj;
    },
    fromPartial: function (object) {
        var message = createBaseMsgSubmitProposalResponse();
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1["default"].fromValue(object.proposalId)
                : long_1["default"].UZERO;
        return message;
    }
};
function createBaseMsgVote() {
    return { proposalId: long_1["default"].UZERO, voter: "", option: 0 };
}
exports.MsgVote = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        if (message.option !== 0) {
            writer.uint32(24).int32(message.option);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgVote();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.voter = reader.string();
                    break;
                case 3:
                    message.option = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            proposalId: isSet(object.proposalId)
                ? long_1["default"].fromString(object.proposalId)
                : long_1["default"].UZERO,
            voter: isSet(object.voter) ? String(object.voter) : "",
            option: isSet(object.option) ? (0, gov_1.voteOptionFromJSON)(object.option) : 0
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.proposalId !== undefined &&
            (obj.proposalId = (message.proposalId || long_1["default"].UZERO).toString());
        message.voter !== undefined && (obj.voter = message.voter);
        message.option !== undefined &&
            (obj.option = (0, gov_1.voteOptionToJSON)(message.option));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseMsgVote();
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1["default"].fromValue(object.proposalId)
                : long_1["default"].UZERO;
        message.voter = (_a = object.voter) !== null && _a !== void 0 ? _a : "";
        message.option = (_b = object.option) !== null && _b !== void 0 ? _b : 0;
        return message;
    }
};
function createBaseMsgVoteResponse() {
    return {};
}
exports.MsgVoteResponse = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgVoteResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    fromPartial: function (_) {
        var message = createBaseMsgVoteResponse();
        return message;
    }
};
function createBaseMsgVoteWeighted() {
    return { proposalId: long_1["default"].UZERO, voter: "", options: [] };
}
exports.MsgVoteWeighted = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        for (var _i = 0, _a = message.options; _i < _a.length; _i++) {
            var v = _a[_i];
            gov_1.WeightedVoteOption.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgVoteWeighted();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.voter = reader.string();
                    break;
                case 3:
                    message.options.push(gov_1.WeightedVoteOption.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            proposalId: isSet(object.proposalId)
                ? long_1["default"].fromString(object.proposalId)
                : long_1["default"].UZERO,
            voter: isSet(object.voter) ? String(object.voter) : "",
            options: Array.isArray(object === null || object === void 0 ? void 0 : object.options)
                ? object.options.map(function (e) { return gov_1.WeightedVoteOption.fromJSON(e); })
                : []
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.proposalId !== undefined &&
            (obj.proposalId = (message.proposalId || long_1["default"].UZERO).toString());
        message.voter !== undefined && (obj.voter = message.voter);
        if (message.options) {
            obj.options = message.options.map(function (e) {
                return e ? gov_1.WeightedVoteOption.toJSON(e) : undefined;
            });
        }
        else {
            obj.options = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseMsgVoteWeighted();
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1["default"].fromValue(object.proposalId)
                : long_1["default"].UZERO;
        message.voter = (_a = object.voter) !== null && _a !== void 0 ? _a : "";
        message.options =
            ((_b = object.options) === null || _b === void 0 ? void 0 : _b.map(function (e) { return gov_1.WeightedVoteOption.fromPartial(e); })) || [];
        return message;
    }
};
function createBaseMsgVoteWeightedResponse() {
    return {};
}
exports.MsgVoteWeightedResponse = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgVoteWeightedResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    fromPartial: function (_) {
        var message = createBaseMsgVoteWeightedResponse();
        return message;
    }
};
function createBaseMsgDeposit() {
    return { proposalId: long_1["default"].UZERO, depositor: "", amount: [] };
}
exports.MsgDeposit = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
        }
        for (var _i = 0, _a = message.amount; _i < _a.length; _i++) {
            var v = _a[_i];
            coin_1.Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgDeposit();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.depositor = reader.string();
                    break;
                case 3:
                    message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            proposalId: isSet(object.proposalId)
                ? long_1["default"].fromString(object.proposalId)
                : long_1["default"].UZERO,
            depositor: isSet(object.depositor) ? String(object.depositor) : "",
            amount: Array.isArray(object === null || object === void 0 ? void 0 : object.amount)
                ? object.amount.map(function (e) { return coin_1.Coin.fromJSON(e); })
                : []
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.proposalId !== undefined &&
            (obj.proposalId = (message.proposalId || long_1["default"].UZERO).toString());
        message.depositor !== undefined && (obj.depositor = message.depositor);
        if (message.amount) {
            obj.amount = message.amount.map(function (e) { return (e ? coin_1.Coin.toJSON(e) : undefined); });
        }
        else {
            obj.amount = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseMsgDeposit();
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1["default"].fromValue(object.proposalId)
                : long_1["default"].UZERO;
        message.depositor = (_a = object.depositor) !== null && _a !== void 0 ? _a : "";
        message.amount = ((_b = object.amount) === null || _b === void 0 ? void 0 : _b.map(function (e) { return coin_1.Coin.fromPartial(e); })) || [];
        return message;
    }
};
function createBaseMsgDepositResponse() {
    return {};
}
exports.MsgDepositResponse = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgDepositResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    fromPartial: function (_) {
        var message = createBaseMsgDepositResponse();
        return message;
    }
};
var MsgClientImpl = /** @class */ (function () {
    function MsgClientImpl(rpc) {
        this.rpc = rpc;
        this.SubmitProposal = this.SubmitProposal.bind(this);
        this.Vote = this.Vote.bind(this);
        this.VoteWeighted = this.VoteWeighted.bind(this);
        this.Deposit = this.Deposit.bind(this);
    }
    MsgClientImpl.prototype.SubmitProposal = function (request) {
        var data = exports.MsgSubmitProposal.encode(request).finish();
        var promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "SubmitProposal", data);
        return promise.then(function (data) {
            return exports.MsgSubmitProposalResponse.decode(new _m0.Reader(data));
        });
    };
    MsgClientImpl.prototype.Vote = function (request) {
        var data = exports.MsgVote.encode(request).finish();
        var promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "Vote", data);
        return promise.then(function (data) { return exports.MsgVoteResponse.decode(new _m0.Reader(data)); });
    };
    MsgClientImpl.prototype.VoteWeighted = function (request) {
        var data = exports.MsgVoteWeighted.encode(request).finish();
        var promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "VoteWeighted", data);
        return promise.then(function (data) {
            return exports.MsgVoteWeightedResponse.decode(new _m0.Reader(data));
        });
    };
    MsgClientImpl.prototype.Deposit = function (request) {
        var data = exports.MsgDeposit.encode(request).finish();
        var promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "Deposit", data);
        return promise.then(function (data) {
            return exports.MsgDepositResponse.decode(new _m0.Reader(data));
        });
    };
    return MsgClientImpl;
}());
exports.MsgClientImpl = MsgClientImpl;
if (_m0.util.Long !== long_1["default"]) {
    _m0.util.Long = long_1["default"];
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}

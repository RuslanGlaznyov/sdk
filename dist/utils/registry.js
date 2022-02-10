"use strict";
exports.__esModule = true;
var proto_signing_1 = require("@cosmjs/proto-signing");
var protobufjs_1 = require("protobufjs");
//
var MsgFundPool = new protobufjs_1.Type("MsgFundPool")
    .add(new protobufjs_1.Field("creator", 1, "string"))
    .add(new protobufjs_1.Field("id", 2, "uint64"))
    .add(new protobufjs_1.Field("amount", 3, "uint64"));
var MsgStakePool = new protobufjs_1.Type("MsgStakePool")
    .add(new protobufjs_1.Field("creator", 1, "string"))
    .add(new protobufjs_1.Field("id", 2, "uint64"))
    .add(new protobufjs_1.Field("amount", 3, "uint64"));
//
exports["default"] = new proto_signing_1.Registry(Array.from([
    ["/KYVENetwork.kyve.registry.".concat(MsgFundPool.name), MsgFundPool],
    ["/KYVENetwork.kyve.registry.".concat(MsgStakePool.name), MsgStakePool],
]));

"use strict";
exports.__esModule = true;
var proto_signing_1 = require("@cosmjs/proto-signing");
var path_1 = require("path");
var protobufjs_1 = require("protobufjs");
var root = (0, protobufjs_1.loadSync)((0, path_1.join)(__dirname, "../proto/tx.proto"));
exports["default"] = new proto_signing_1.Registry(Array.from([
    [
        "/KYVENetwork.kyve.registry.MsgCreatePool",
        root.lookupType("MsgCreatePool"),
    ],
    ["/KYVENetwork.kyve.registry.MsgFundPool", root.lookupType("MsgFundPool")],
]));

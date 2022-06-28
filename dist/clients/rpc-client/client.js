"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var base_v1beta1_1 = __importDefault(require("./kyve/base.v1beta1"));
var gov_v1beta1_1 = __importDefault(require("./kyve/gov.v1beta1"));
var KyveClient = /** @class */ (function () {
    function KyveClient(client, account) {
        this.account = account;
        this.nativeClient = client;
        this.kyve = {
            v1beta1: {
                base: new base_v1beta1_1["default"](this.nativeClient, this.account),
                gov: new gov_v1beta1_1["default"](this.nativeClient, this.account)
            }
        };
    }
    return KyveClient;
}());
exports["default"] = KyveClient;

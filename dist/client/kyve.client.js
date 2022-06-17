"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var kyve_base_msg_1 = __importDefault(require("./kyve-base.msg"));
var gov_msg_1 = __importDefault(require("./gov.msg"));
var KyveClient = /** @class */ (function () {
    function KyveClient(client, account) {
        this.account = account;
        this.nativeClient = client;
        this.base = new kyve_base_msg_1["default"](this.nativeClient, this.account);
        this.gov = new gov_msg_1["default"](this.nativeClient, this.account);
    }
    return KyveClient;
}());
exports["default"] = KyveClient;

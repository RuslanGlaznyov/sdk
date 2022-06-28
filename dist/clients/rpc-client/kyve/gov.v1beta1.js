"use strict";
exports.__esModule = true;
var stargate_1 = require("@cosmjs/stargate");
var constants_1 = require("../../../constants");
var gov_1 = require("@kyve/proto/dist/proto/cosmos/gov/v1beta1/gov");
var params_1 = require("@kyve/proto/dist/proto/cosmos/params/v1beta1/params");
var gov_2 = require("@kyve/proto/dist/proto/kyve/registry/v1beta1/gov");
var KyveGovMsg = /** @class */ (function () {
    function KyveGovMsg(client, account) {
        this.account = account;
        this.nativeClient = client;
    }
    KyveGovMsg.prototype.createGovTx = function (amount, content, isExpedited) {
        if (isExpedited === void 0) { isExpedited = false; }
        return {
            typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            value: {
                content: content,
                initial_deposit: (0, stargate_1.coins)(amount.toString(), constants_1.DENOM),
                proposer: this.account.address,
                is_expedited: isExpedited
            }
        };
    };
    KyveGovMsg.prototype.submitTextProposal = function (amount, value, options) {
        var content = {
            typeUrl: "/cosmos.gov.v1beta1.TextProposal",
            value: gov_1.TextProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveGovMsg.prototype.parameterChangeProposal = function (amount, value, options) {
        var content = {
            typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
            value: params_1.ParameterChangeProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveGovMsg.prototype.updatePoolProposal = function (amount, value, options) {
        var content = {
            typeUrl: "/kyve.registry.v1beta1.UpdatePoolProposal",
            value: gov_2.UpdatePoolProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveGovMsg.prototype.pausePoolProposal = function (amount, value, options) {
        var content = {
            typeUrl: "/kyve.registry.v1beta1.PausePoolProposal",
            value: gov_2.PausePoolProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveGovMsg.prototype.unpausePoolProposal = function (amount, value, options) {
        var content = {
            typeUrl: "/kyve.registry.v1beta1.UnpausePoolProposal",
            value: gov_2.UnpausePoolProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveGovMsg.prototype.schedulePoolUpgradeProposal = function (amount, value, options) {
        var content = {
            typeUrl: "/kyve.registry.v1beta1.SchedulePoolUpgradeProposal",
            value: gov_2.SchedulePoolUpgradeProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    KyveGovMsg.prototype.cancelPoolUpgradeProposal = function (amount, value, options) {
        var content = {
            typeUrl: "/kyve.registry.v1beta1.CancelPoolUpgradeProposal",
            value: gov_2.CancelPoolUpgradeProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo);
    };
    return KyveGovMsg;
}());
exports["default"] = KyveGovMsg;

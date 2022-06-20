"use strict";
exports.__esModule = true;
var gov_1 = require("@kyve/proto/dist/proto/cosmos/gov/v1beta1/gov");
var params_1 = require("@kyve/proto/dist/proto/cosmos/params/v1beta1/params");
var stargate_1 = require("@cosmjs/stargate");
var gov_2 = require("@kyve/proto/dist/proto/kyve/registry/v1beta1/gov");
var GovMethods = /** @class */ (function () {
    function GovMethods(client, account) {
        this.account = account;
        this.nativeClient = client;
    }
    GovMethods.prototype.createGovTx = function (amount, content) {
        return {
            typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            value: {
                content: content,
                initialDeposit: (0, stargate_1.coins)(amount.toString(), "tkyve"),
                proposer: this.account.address
            }
        };
    };
    GovMethods.prototype.submitTextProposal = function (amount, value, fee, memo) {
        var content = {
            typeUrl: "/cosmos.gov.v1beta1.TextProposal",
            value: gov_1.TextProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : "auto", memo);
    };
    GovMethods.prototype.parameterChangeProposal = function (amount, value, fee, memo) {
        var content = {
            typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
            value: params_1.ParameterChangeProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : "auto", memo);
    };
    GovMethods.prototype.createPoolProposal = function (amount, value, fee, memo) {
        var content = {
            typeUrl: "/kyve.registry.v1beta1.CreatePoolProposal",
            value: gov_2.CreatePoolProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : "auto", memo);
    };
    GovMethods.prototype.updatePoolProposal = function (amount, value, fee, memo) {
        var content = {
            typeUrl: "/kyve.registry.v1beta1.UpdatePoolProposal",
            value: gov_2.UpdatePoolProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : "auto", memo);
    };
    GovMethods.prototype.pausePoolProposal = function (amount, value, fee, memo) {
        var content = {
            typeUrl: "/kyve.registry.v1beta1.PausePoolProposal",
            value: gov_2.PausePoolProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : "auto", memo);
    };
    GovMethods.prototype.unpausePoolProposal = function (amount, value, fee, memo) {
        var content = {
            typeUrl: "/kyve.registry.v1beta1.UnpausePoolProposal",
            value: gov_2.UnpausePoolProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : "auto", memo);
    };
    GovMethods.prototype.schedulePoolUpgradeProposal = function (amount, value, fee, memo) {
        var content = {
            typeUrl: "/kyve.registry.v1beta1.SchedulePoolUpgradeProposal",
            value: gov_2.SchedulePoolUpgradeProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : "auto", memo);
    };
    GovMethods.prototype.cancelPoolUpgradeProposal = function (amount, value, fee, memo) {
        var content = {
            typeUrl: "/kyve.registry.v1beta1.CancelPoolUpgradeProposal",
            value: gov_2.CancelPoolUpgradeProposal.encode(value).finish()
        };
        var tx = this.createGovTx(amount, content);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : "auto", memo);
    };
    return GovMethods;
}());
exports["default"] = GovMethods;

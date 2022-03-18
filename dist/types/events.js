"use strict";
exports.__esModule = true;
exports.MessageEvent = void 0;
var MessageEvent = /** @class */ (function () {
    function MessageEvent(eventsArray, decodedTx) {
        var _a;
        this.eventsArray = eventsArray;
        this.action = eventsArray
            .reverse()
            .find(function (value) { return value.key == "action"; }).value;
        this.module = eventsArray
            .reverse()
            .find(function (value) { return value.key == "module"; }).value;
        this.sender = eventsArray
            .reverse()
            .find(function (value) { return value.key == "sender"; }).value;
        this.time = decodedTx.blockTime;
        this.height = (_a = decodedTx.indexedTx) === null || _a === void 0 ? void 0 : _a.height;
        this.args = {};
        if (this.action == "Funded" ||
            this.action == "Defunded" ||
            this.action == "Staked" ||
            this.action == "Unstaked") {
            this.args.creator = this.get("Creator");
            this.args.poolId = this.get("PoolId");
            this.args.amount = this.get("Amount");
        }
        else if (this.action == "Delegated" || this.action == "Undelegated") {
            this.args.creator = this.get("Creator");
            this.args.poolId = this.get("PoolId");
            this.args.amount = this.get("Amount");
            this.args.staker = this.get("Staker");
        }
        else if (this.action == "ProposalEnded") {
            this.args.bundleId = this.get("BundleId");
            this.args.poolId = this.get("PoolId");
            this.args.byteSize = this.get("ByteSize");
            this.args.uploader = this.get("Uploader");
            this.args.nextUploader = this.get("NextUploader");
            this.args.bundleReward = this.get("BundleReward");
            this.args.valid = this.get("Valid");
            this.args.invalid = this.get("Invalid");
            this.args.fromHeight = this.get("FromHeight");
            this.args.toHeight = this.get("ToHeight");
            this.args.status = this.get("Status");
        }
        else if (this.action == "Voted") {
            this.args.creator = this.get("Creator");
            this.args.poolId = this.get("PoolId");
            this.args.bundleId = this.get("BundleId");
            this.args.support = this.get("Support");
        }
    }
    MessageEvent.prototype.get = function (key) {
        return this.eventsArray.find(function (value) { return (value === null || value === void 0 ? void 0 : value.key) == key; }).value;
    };
    return MessageEvent;
}());
exports.MessageEvent = MessageEvent;

"use strict";
/**
 *  Contains all events form the custom messages in the go/cosmos KYVE implementation.
 */
exports.__esModule = true;
exports.MessageEvent = void 0;
var MessageEvent = /** @class */ (function () {
    function MessageEvent(eventsArray, time, height) {
        var _a, _b, _c, _d, _e, _f;
        this.eventsArray = eventsArray;
        this.action =
            (_b = (_a = eventsArray.reverse().find(function (value) { return value.key == "action"; })) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
        this.module =
            (_d = (_c = eventsArray.reverse().find(function (value) { return value.key == "module"; })) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : "";
        this.sender =
            (_f = (_e = eventsArray.reverse().find(function (value) { return value.key == "sender"; })) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : "";
        this.time = time;
        this.height = height;
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

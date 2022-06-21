"use strict";
/**
 *  Contains all events form the custom messages in the go/cosmos KYVE implementation.
 */
exports.__esModule = true;
exports.MessageEvent = void 0;
var MessageEvent = /** @class */ (function () {
    function MessageEvent(eventsArray, time, height) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.eventsArray = eventsArray;
        var eventName = (_a = eventsArray.find(function (value) { return value.key == "EventName"; })) === null || _a === void 0 ? void 0 : _a.value;
        this.action =
            eventName !== null && eventName !== void 0 ? eventName : (_b = eventsArray.reverse().find(function (value) { return value.key == "action"; })) === null || _b === void 0 ? void 0 : _b.value;
        this.module =
            (_d = (_c = eventsArray.reverse().find(function (value) { return value.key == "module"; })) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : "";
        this.sender =
            (_f = (_e = eventsArray.reverse().find(function (value) { return value.key == "sender"; })) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : "";
        this.time = time;
        this.height = height;
        this.args = {};
        for (var _i = 0, eventsArray_1 = eventsArray; _i < eventsArray_1.length; _i++) {
            var pair = eventsArray_1[_i];
            this.args[pair.key[0].toLowerCase() + pair.key.slice(1)] = pair.value;
        }
        if (this.action == "Voted") {
            this.sender = (_g = this.args.creator) !== null && _g !== void 0 ? _g : "";
        }
    }
    return MessageEvent;
}());
exports.MessageEvent = MessageEvent;

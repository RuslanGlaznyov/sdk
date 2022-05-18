"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createRegistry = exports.CancelPoolUpgradeProposal = exports.SchedulePoolUpgradeProposal = exports.UnpausePoolProposal = exports.PausePoolProposal = exports.UpdatePoolProposal = exports.CreatePoolProposal = exports.ParameterChangeProposal = exports.TextProposal = void 0;
var proto_signing_1 = require("@cosmjs/proto-signing");
var stargate_1 = require("@cosmjs/stargate");
var path_1 = __importDefault(require("path"));
var protobufjs_1 = require("protobufjs");
exports.TextProposal = new protobufjs_1.Type("TextProposal")
    .add(new protobufjs_1.Field("title", 1, "string"))
    .add(new protobufjs_1.Field("description", 2, "string"));
var ParamsRoot = protobufjs_1.Root.fromJSON({
    nested: {
        ParamChange: {
            fields: {
                subspace: {
                    type: "string",
                    id: 1
                },
                key: {
                    type: "string",
                    id: 2
                },
                value: {
                    type: "string",
                    id: 3
                }
            }
        },
        ParameterChangeProposal: {
            fields: {
                title: {
                    type: "string",
                    id: 1
                },
                description: {
                    type: "string",
                    id: 2
                },
                changes: {
                    rule: "repeated",
                    type: "ParamChange",
                    id: 3
                }
            }
        }
    }
});
exports.ParameterChangeProposal = ParamsRoot.lookupType("ParameterChangeProposal");
exports.CreatePoolProposal = new protobufjs_1.Type("CreatePoolProposal")
    .add(new protobufjs_1.Field("title", 1, "string"))
    .add(new protobufjs_1.Field("description", 2, "string"))
    .add(new protobufjs_1.Field("name", 3, "string"))
    .add(new protobufjs_1.Field("runtime", 4, "string"))
    .add(new protobufjs_1.Field("logo", 5, "string"))
    .add(new protobufjs_1.Field("config", 6, "string"))
    .add(new protobufjs_1.Field("start_height", 7, "uint64"))
    .add(new protobufjs_1.Field("upload_interval", 8, "uint64"))
    .add(new protobufjs_1.Field("operating_cost", 9, "uint64"))
    .add(new protobufjs_1.Field("max_bundle_size", 10, "uint64"))
    .add(new protobufjs_1.Field("version", 11, "string"))
    .add(new protobufjs_1.Field("binaries", 12, "string"));
exports.UpdatePoolProposal = new protobufjs_1.Type("UpdatePoolProposal")
    .add(new protobufjs_1.Field("title", 1, "string"))
    .add(new protobufjs_1.Field("description", 2, "string"))
    .add(new protobufjs_1.Field("id", 3, "uint64"))
    .add(new protobufjs_1.Field("name", 4, "string"))
    .add(new protobufjs_1.Field("runtime", 5, "string"))
    .add(new protobufjs_1.Field("logo", 6, "string"))
    .add(new protobufjs_1.Field("config", 7, "string"))
    .add(new protobufjs_1.Field("upload_interval", 8, "uint64"))
    .add(new protobufjs_1.Field("operating_cost", 9, "uint64"))
    .add(new protobufjs_1.Field("max_bundle_size", 10, "uint64"));
exports.PausePoolProposal = new protobufjs_1.Type("PausePoolProposal")
    .add(new protobufjs_1.Field("title", 1, "string"))
    .add(new protobufjs_1.Field("description", 2, "string"))
    .add(new protobufjs_1.Field("id", 3, "uint64"));
exports.UnpausePoolProposal = new protobufjs_1.Type("UnpausePoolProposal")
    .add(new protobufjs_1.Field("title", 1, "string"))
    .add(new protobufjs_1.Field("description", 2, "string"))
    .add(new protobufjs_1.Field("id", 3, "uint64"));
exports.SchedulePoolUpgradeProposal = new protobufjs_1.Type("SchedulePoolUpgradeProposal")
    .add(new protobufjs_1.Field("title", 1, "string"))
    .add(new protobufjs_1.Field("description", 2, "string"))
    .add(new protobufjs_1.Field("id", 3, "uint64"))
    .add(new protobufjs_1.Field("version", 4, "string"))
    .add(new protobufjs_1.Field("scheduled_at", 5, "uint64"))
    .add(new protobufjs_1.Field("duration", 6, "uint64"))
    .add(new protobufjs_1.Field("binaries", 7, "string"));
exports.CancelPoolUpgradeProposal = new protobufjs_1.Type("CancelPoolUpgradeProposal")
    .add(new protobufjs_1.Field("title", 1, "string"))
    .add(new protobufjs_1.Field("description", 2, "string"))
    .add(new protobufjs_1.Field("id", 3, "uint64"));
var createRegistry = function () { return __awaiter(void 0, void 0, void 0, function () {
    var root;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, protobufjs_1.load)(path_1["default"].join(__dirname, "../proto/tx.proto"))];
            case 1:
                root = _a.sent();
                return [2 /*return*/, new proto_signing_1.Registry(Array.from(__spreadArray(__spreadArray([], stargate_1.defaultRegistryTypes, true), [
                        ["/kyve.registry.v1beta1.MsgFundPool", root.lookupType("MsgFundPool")],
                        [
                            "/kyve.registry.v1beta1.MsgDefundPool",
                            root.lookupType("MsgDefundPool"),
                        ],
                        ["/kyve.registry.v1beta1.MsgStakePool", root.lookupType("MsgStakePool")],
                        [
                            "/kyve.registry.v1beta1.MsgUnstakePool",
                            root.lookupType("MsgUnstakePool"),
                        ],
                        [
                            "/kyve.registry.v1beta1.MsgClaimUploaderRole",
                            root.lookupType("MsgClaimUploaderRole"),
                        ],
                        [
                            "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
                            root.lookupType("MsgSubmitBundleProposal"),
                        ],
                        [
                            "/kyve.registry.v1beta1.MsgVoteProposal",
                            root.lookupType("MsgVoteProposal"),
                        ],
                        [
                            "/kyve.registry.v1beta1.MsgDelegatePool",
                            root.lookupType("MsgDelegatePool"),
                        ],
                        [
                            "/kyve.registry.v1beta1.MsgUndelegatePool",
                            root.lookupType("MsgUndelegatePool"),
                        ],
                        [
                            "/kyve.registry.v1beta1.MsgWithdrawPool",
                            root.lookupType("MsgWithdrawPool"),
                        ],
                        [
                            "/kyve.registry.v1beta1.MsgUpdateMetadata",
                            root.lookupType("MsgUpdateMetadata"),
                        ],
                    ], false)))];
        }
    });
}); };
exports.createRegistry = createRegistry;

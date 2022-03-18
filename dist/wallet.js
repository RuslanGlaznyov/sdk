"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.KyveWallet = void 0;
var proto_signing_1 = require("@cosmjs/proto-signing");
var axios_1 = __importDefault(require("axios"));
var bignumber_js_1 = require("bignumber.js");
// @ts-ignore
var humanize_number_1 = __importDefault(require("humanize-number"));
var constants_1 = require("./utils/constants");
var KyveWallet = /** @class */ (function () {
    function KyveWallet(network, mnemonic) {
        this.network = network;
        this.mnemonic = mnemonic;
    }
    KyveWallet.prototype.getSigner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.signer) return [3 /*break*/, 8];
                        if (!this.mnemonic) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(this.mnemonic, constants_1.KYVE_WALLET_OPTIONS)];
                    case 1:
                        _a.signer = _b.sent();
                        return [3 /*break*/, 8];
                    case 2:
                        if (!window) return [3 /*break*/, 7];
                        if (!window.keplr) return [3 /*break*/, 5];
                        return [4 /*yield*/, window.keplr.experimentalSuggestChain(__assign(__assign({}, constants_1.KYVE_KEPLR_CONFIG), { rpc: constants_1.KYVE_ENDPOINTS[this.network].rpc, rest: constants_1.KYVE_ENDPOINTS[this.network].rest, chainId: "kyve-".concat(this.network), chainName: "KYVE - ".concat(this.network.toUpperCase()) }))];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, window.keplr.enable("kyve-".concat(this.network))];
                    case 4:
                        _b.sent();
                        this.signer = window.keplr.getOfflineSigner("kyve-".concat(this.network));
                        return [3 /*break*/, 6];
                    case 5: throw new Error("Please install Keplr.");
                    case 6: return [3 /*break*/, 8];
                    case 7: throw new Error("Unsupported.");
                    case 8: return [2 /*return*/, this.signer];
                }
            });
        });
    };
    KyveWallet.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signer, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.address) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getSigner()];
                    case 1:
                        signer = _a.sent();
                        return [4 /*yield*/, signer.getAccounts()];
                    case 2:
                        account = (_a.sent())[0];
                        this.address = account.address;
                        _a.label = 3;
                    case 3: return [2 /*return*/, this.address];
                }
            });
        });
    };
    KyveWallet.prototype.getName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(window && window.keplr)) return [3 /*break*/, 2];
                        return [4 /*yield*/, window.keplr.getKey("kyve-".concat(this.network))];
                    case 1:
                        name_1 = (_a.sent()).name;
                        return [2 /*return*/, name_1];
                    case 2: throw new Error("Unsupported.");
                }
            });
        });
    };
    KyveWallet.prototype.getBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAddress()];
                    case 1:
                        address = _a.sent();
                        return [4 /*yield*/, axios_1["default"].get("".concat(constants_1.KYVE_ENDPOINTS[this.network].rest, "/cosmos/bank/v1beta1/balances/").concat(address, "/by_denom?denom=tkyve"))];
                    case 2:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data.balance.amount];
                }
            });
        });
    };
    KyveWallet.prototype.formatBalance = function (balance, decimals) {
        if (decimals === void 0) { decimals = 2; }
        return (0, humanize_number_1["default"])(new bignumber_js_1.BigNumber(balance)
            .dividedBy(new bignumber_js_1.BigNumber(10).exponentiatedBy(constants_1.KYVE_DECIMALS))
            .toFixed(decimals));
    };
    KyveWallet.generate = function (network) {
        return __awaiter(this, void 0, void 0, function () {
            var mnemonic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.generate(24, constants_1.KYVE_WALLET_OPTIONS)];
                    case 1:
                        mnemonic = (_a.sent()).mnemonic;
                        return [2 /*return*/, new KyveWallet(network, mnemonic)];
                }
            });
        });
    };
    return KyveWallet;
}());
exports.KyveWallet = KyveWallet;

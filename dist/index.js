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
exports.__esModule = true;
var constants_1 = require("./constants");
var full_client_1 = require("./client/full-client");
var proto_signing_1 = require("@cosmjs/proto-signing");
var extension_client_1 = require("@cosmostation/extension-client");
var CosmostationSigner = /** @class */ (function () {
    function CosmostationSigner(cosmostationProvider, cosmostationAccount, network, cosmostationOption) {
        this.cosmostationProvider = cosmostationProvider;
        this.network = network;
        this.cosmostationAccount = cosmostationAccount;
        this.cosmostationOption = cosmostationOption;
    }
    CosmostationSigner.prototype.getAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [{
                            address: this.cosmostationAccount.address,
                            // Currently, only secp256k1 is supported.
                            algo: "secp256k1",
                            pubkey: this.cosmostationAccount.publicKey
                        }]];
            });
        });
    };
    ;
    CosmostationSigner.prototype.signDirect = function (signerAddress, signDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var signedResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cosmostationProvider.signDirect(this.network.chainId, {
                            chain_id: signDoc.chainId,
                            body_bytes: signDoc.bodyBytes,
                            auth_info_bytes: signDoc.authInfoBytes,
                            account_number: signDoc.accountNumber.toString()
                        }, this.cosmostationOption ? this.cosmostationOption : undefined)];
                    case 1:
                        signedResult = _a.sent();
                        return [2 /*return*/, {
                                signed: (0, proto_signing_1.makeSignDoc)(signedResult.signed_doc.body_bytes, signedResult.signed_doc.auth_info_bytes, signedResult.signed_doc.chain_id, Number(signedResult.signed_doc.account_number)),
                                signature: {
                                    pub_key: signedResult.pub_key,
                                    signature: signedResult.signature
                                }
                            }];
                }
            });
        });
    };
    return CosmostationSigner;
}());
var KyveSDK = /** @class */ (function () {
    function KyveSDK(network) {
        if (typeof network === "string") {
            this.network = constants_1.KYVE_ENDPOINTS[network];
        }
        else {
            this.network = network;
        }
    }
    KyveSDK.prototype.fromMnemonic = function (mnemonic) {
        return __awaiter(this, void 0, void 0, function () {
            var signedClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
                            prefix: constants_1.PREFIX
                        })];
                    case 1:
                        signedClient = _a.sent();
                        return [2 /*return*/, (0, full_client_1.getSigningKyveClient)(this.network.rpc, signedClient)];
                }
            });
        });
    };
    KyveSDK.prototype.fromKepler = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof window === "undefined")
                            throw new Error("Unsupported.");
                        if (!window.keplr)
                            throw new Error("Please install Keplr.");
                        return [4 /*yield*/, window.keplr.experimentalSuggestChain(__assign(__assign({}, constants_1.KYVE_KEPLR_CONFIG), { rpc: this.network.rpc, rest: this.network.rest, chainId: this.network.chainId, chainName: this.network.chainName }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, window.keplr.enable(this.network.chainId)];
                    case 2:
                        _a.sent();
                        signer = window.keplr.getOfflineSigner(this.network.chainId);
                        return [2 /*return*/, (0, full_client_1.getSigningKyveClient)(this.network.rpc, signer)];
                }
            });
        });
    };
    KyveSDK.prototype.fromCosmostation = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, chain, cosmostationAccount, cosmostationSigner, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, (0, extension_client_1.tendermint)()];
                    case 1:
                        provider = _a.sent();
                        return [4 /*yield*/, provider.getSupportedChains()];
                    case 2:
                        chain = _a.sent();
                        cosmostationAccount = void 0;
                        if (!chain.unofficial.includes(this.network.chainName)) return [3 /*break*/, 4];
                        return [4 /*yield*/, provider.getAccount(this.network.chainName)];
                    case 3:
                        cosmostationAccount = _a.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, provider.addChain(__assign(__assign({}, constants_1.KYVE_COSMOSTATION_CONFIG), { restURL: this.network.rest, chainId: this.network.chainId, chainName: this.network.chainName }))];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, provider.getAccount(this.network.chainName)];
                    case 6:
                        cosmostationAccount = _a.sent();
                        _a.label = 7;
                    case 7:
                        cosmostationSigner = new CosmostationSigner(provider, cosmostationAccount, this.network, config ? config : {});
                        return [2 /*return*/, (0, full_client_1.getSigningKyveClient)(this.network.rpc, cosmostationSigner)];
                    case 8:
                        e_1 = _a.sent();
                        if (e_1 instanceof extension_client_1.InstallError) {
                            console.log("not installed");
                        }
                        throw e_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return KyveSDK;
}());
exports["default"] = KyveSDK;

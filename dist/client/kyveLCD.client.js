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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.KyveLCDClient = exports.createKyveLCDClient = void 0;
var launchpad_1 = require("@cosmjs/launchpad");
var axios_1 = __importDefault(require("axios"));
function createKyveLCDClient(restEndpoint) {
    var lcdClient = launchpad_1.LcdClient.withExtensions({ apiUrl: restEndpoint }, launchpad_1.setupAuthExtension, launchpad_1.setupBankExtension, launchpad_1.setupDistributionExtension, launchpad_1.setupGovExtension, launchpad_1.setupMintExtension, launchpad_1.setupSlashingExtension, launchpad_1.setupStakingExtension, launchpad_1.setupSupplyExtension);
    lcdClient.kyve = new KyveLCDClient(restEndpoint);
    return lcdClient;
}
exports.createKyveLCDClient = createKyveLCDClient;
var KyveLCDClient = /** @class */ (function () {
    function KyveLCDClient(restEndpoint) {
        var _this = this;
        this.restEndpoint = restEndpoint;
        this.request = function (url, params) {
            return axios_1["default"]
                .get(new URL(url, _this.restEndpoint).href, { params: params })
                .then(function (res) { return res.data; });
        };
    }
    KyveLCDClient.prototype.params = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/params";
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Pool queries a pool by ID. */
    KyveLCDClient.prototype.pool = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/pool/".concat(params.id);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Pools queries for all pools. */
    KyveLCDClient.prototype.pools = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        if (typeof (params === null || params === void 0 ? void 0 : params.search) !== "undefined") {
                            parameters.search = params.search;
                        }
                        if (typeof (params === null || params === void 0 ? void 0 : params.runtime) !== "undefined") {
                            parameters.runtime = params.runtime;
                        }
                        if (typeof (params === null || params === void 0 ? void 0 : params.paused) !== "undefined") {
                            parameters.paused = params.paused;
                        }
                        endpoint = "kyve/registry/v1beta1/pools";
                        return [4 /*yield*/, this.request(endpoint, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* FundersList returns all funder addresses with their corresponding funding amount for a given pool */
    KyveLCDClient.prototype.fundersList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        endpoint = "kyve/registry/v1beta1/funders_list/".concat(params.poolId);
                        return [4 /*yield*/, this.request(endpoint, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Funder returns all funder info */
    KyveLCDClient.prototype.funder = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/funder/".concat(params.poolId, "/").concat(params.funder);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* StakersList returns all staker addresses with their corresponding staking amount for a given pool */
    KyveLCDClient.prototype.stakersList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/stakers_list/".concat(params.poolId);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Staker returns all staker info */
    KyveLCDClient.prototype.staker = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/staker/".concat(params.poolId, "/").concat(params.staker);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Proposal ... */
    KyveLCDClient.prototype.proposal = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/proposal/".concat(params.bundleId);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Proposals ... */
    KyveLCDClient.prototype.proposals = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        endpoint = "kyve/registry/v1beta1/proposals/".concat(params.poolId);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* ProposalByHeight ... */
    KyveLCDClient.prototype.proposalByHeight = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/proposal_by_height/".concat(params.poolId, "/").concat(params.height);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* CanPropose ... */
    KyveLCDClient.prototype.canPropose = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/can_propose/".concat(params.poolId, "/").concat(params.proposer, "/").concat(params.fromHeight);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* CanVote checks if voter on pool can still vote for the given bundle */
    KyveLCDClient.prototype.canVote = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/can_vote/".concat(params.poolId, "/").concat(params.voter, "/").concat(params.bundleId);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* StakeInfo returns necessary information to become a staker (used by the protocol nodes) */
    KyveLCDClient.prototype.stakeInfo = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/stake_info/".concat(params.poolId, "/").concat(params.staker);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* AccountAssets returns an overview of the sum of all balances for a given user. e.g. balance, staking, funding, etc. */
    KyveLCDClient.prototype.accountAssets = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/account_assets/".concat(params.address);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* AccountFundedList returns all pools the given user has funded into. */
    KyveLCDClient.prototype.accountFundedList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/account_funded_list/".concat(params.address);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* AccountStakedList ... */
    KyveLCDClient.prototype.accountStakedList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/account_staked_list/".concat(params.address);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* AccountDelegationList ... */
    KyveLCDClient.prototype.accountDelegationList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        endpoint = "kyve/registry/v1beta1/account_delegation_list/".concat(params.address);
                        return [4 /*yield*/, this.request(endpoint, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Delegator returns all delegation info */
    KyveLCDClient.prototype.delegator = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/delegator/".concat(params.poolId, "/").concat(params.staker, "/").concat(params.delegator);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* DelegatorsByPoolAndStaker ... */
    KyveLCDClient.prototype.delegatorsByPoolAndStaker = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        endpoint = "kyve/registry/v1beta1/delegators_by_pool_and_staker/".concat(params.poolId, "/").concat(params.staker);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* StakersByPoolAndDelegator ... */
    KyveLCDClient.prototype.stakersByPoolAndDelegator = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        endpoint = "kyve/registry/v1beta1/stakers_by_pool_and_delegator/".concat(params.poolId, "/").concat(params.delegator);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return KyveLCDClient;
}());
exports.KyveLCDClient = KyveLCDClient;

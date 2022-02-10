"use strict";
exports.__esModule = true;
exports.KYVE_WALLET_OPTIONS = exports.KYVE_KEPLR_CONFIG = exports.KYVE_ENDPOINTS = void 0;
var cosmos_1 = require("@keplr-wallet/cosmos");
exports.KYVE_ENDPOINTS = {
    rpc: "http://localhost:26657",
    rest: "http://localhost:1317"
};
exports.KYVE_KEPLR_CONFIG = {
    rpc: exports.KYVE_ENDPOINTS.rpc,
    rest: exports.KYVE_ENDPOINTS.rest,
    chainId: "kyve",
    chainName: "KYVE",
    stakeCurrency: {
        coinDenom: "KYVE",
        coinMinimalDenom: "ukyve",
        coinDecimals: 0
    },
    bip44: {
        coinType: 118
    },
    bech32Config: cosmos_1.Bech32Address.defaultBech32Config("kyve"),
    currencies: [
        { coinDenom: "KYVE", coinMinimalDenom: "ukyve", coinDecimals: 0 },
    ],
    feeCurrencies: [
        { coinDenom: "KYVE", coinMinimalDenom: "ukyve", coinDecimals: 0 },
    ],
    features: ["stargate"]
};
exports.KYVE_WALLET_OPTIONS = {
    prefix: "kyve"
};

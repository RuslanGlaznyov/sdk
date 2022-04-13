"use strict";
exports.__esModule = true;
exports.KYVE_KEPLR_CONFIG = exports.KYVE_ENDPOINTS = exports.KYVE_DECIMALS = void 0;
var cosmos_1 = require("@keplr-wallet/cosmos");
exports.KYVE_DECIMALS = 9;
exports.KYVE_ENDPOINTS = {
    local: {
        rpc: "http://localhost:26657",
        rest: "http://localhost:1317",
        chainId: "kyve-local",
        chainName: "KYVE - Local"
    },
    alpha: {
        rpc: "https://rpc.alpha.kyve.network",
        rest: "https://api.alpha.kyve.network",
        chainId: "kyve-alpha",
        chainName: "KYVE - Alpha"
    },
    beta: {
        rpc: "https://rpc.beta.kyve.network",
        rest: "https://api.beta.kyve.network",
        chainId: "kyve-beta",
        chainName: "KYVE - Beta"
    },
    korellia: {
        rpc: "https://rpc.korellia.kyve.network",
        rest: "https://api.korellia.kyve.network",
        chainId: "korellia",
        chainName: "Korellia"
    }
};
exports.KYVE_KEPLR_CONFIG = {
    rpc: "",
    rest: "",
    chainId: "",
    chainName: "",
    stakeCurrency: {
        coinDenom: "KYVE",
        coinMinimalDenom: "tkyve",
        coinDecimals: exports.KYVE_DECIMALS
    },
    bip44: {
        coinType: 118
    },
    bech32Config: cosmos_1.Bech32Address.defaultBech32Config("kyve"),
    currencies: [
        {
            coinDenom: "KYVE",
            coinMinimalDenom: "tkyve",
            coinDecimals: exports.KYVE_DECIMALS
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "KYVE",
            coinMinimalDenom: "tkyve",
            coinDecimals: exports.KYVE_DECIMALS
        },
    ],
    coinType: 118,
    gasPriceStep: { low: 0, average: 0, high: 0 },
    features: ["ibc-transfer", "ibc-go"]
};

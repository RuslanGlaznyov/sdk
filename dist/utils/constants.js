"use strict";
exports.__esModule = true;
exports.KYVE_WALLET_OPTIONS = exports.KYVE_KEPLR_CONFIG = void 0;
var cosmos_1 = require("@keplr-wallet/cosmos");
// TODO: Think about how to make endpoints configurable.
exports.KYVE_KEPLR_CONFIG = {
    rpc: "http://0.0.0.0:26657",
    rest: "http://0.0.0.0:1317",
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
    coinType: 118,
    features: ["stargate", "ibc-transfer"]
};
exports.KYVE_WALLET_OPTIONS = {
    prefix: "kyve"
};

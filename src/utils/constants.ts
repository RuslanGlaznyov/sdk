import { coins, DirectSecp256k1HdWalletOptions } from "@cosmjs/proto-signing";
import { Bech32Address } from "@keplr-wallet/cosmos";
import { ChainInfo } from "@keplr-wallet/types";

export const KYVE_DECIMALS = 9;

export const KYVE_DEFAULT_FEE = {
  amount: coins(0, "tkyve"),
  gas: "200000",
};

export const KYVE_ENDPOINTS = {
  alpha: {
    rpc: "https://rpc.alpha.kyve.network",
    rest: "https://api.alpha.kyve.network",
  },
  beta: {
    rpc: "https://rpc.beta.kyve.network",
    rest: "https://api.beta.kyve.network",
  },
  local: {
    rpc: "http://localhost:26657",
    rest: "http://localhost:1317",
  },
};

export const KYVE_KEPLR_CONFIG: ChainInfo = {
  rpc: "",
  rest: "",
  chainId: "",
  chainName: "",
  stakeCurrency: {
    coinDenom: "KYVE",
    coinMinimalDenom: "tkyve",
    coinDecimals: KYVE_DECIMALS,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("kyve"),
  currencies: [
    {
      coinDenom: "KYVE",
      coinMinimalDenom: "tkyve",
      coinDecimals: KYVE_DECIMALS,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "KYVE",
      coinMinimalDenom: "tkyve",
      coinDecimals: KYVE_DECIMALS,
    },
  ],
  coinType: 118,
  gasPriceStep: { low: 0, average: 0, high: 0 },
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer", "ibc-go"],
};

export const KYVE_WALLET_OPTIONS: Partial<DirectSecp256k1HdWalletOptions> = {
  prefix: "kyve",
};

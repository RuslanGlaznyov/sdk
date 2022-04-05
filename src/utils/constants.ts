import { coins, DirectSecp256k1HdWalletOptions } from "@cosmjs/proto-signing";
import { Bech32Address } from "@keplr-wallet/cosmos";
import { ChainInfo } from "@keplr-wallet/types";

export const KYVE_DECIMALS = 9;

export const KYVE_ENDPOINTS = {
  local: {
    rpc: "http://localhost:26657",
    rest: "http://localhost:1317",
    chainId: "kyve-local",
    chainName: "KYVE - Local",
  },
  alpha: {
    rpc: "https://rpc.alpha.kyve.network",
    rest: "https://api.alpha.kyve.network",
    chainId: "kyve-alpha",
    chainName: "KYVE - Alpha",
  },
  beta: {
    rpc: "https://rpc.beta.kyve.network",
    rest: "https://api.beta.kyve.network",
    chainId: "kyve-beta",
    chainName: "KYVE - Beta",
  },
  korellia: {
    rpc: "https://rpc.korellia.kyve.network",
    rest: "https://api.korellia.kyve.network",
    chainId: "korellia",
    chainName: "Korellia",
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

export type KYVE_NETWORK = "local" | "alpha" | "beta" | "korellia";

export const KYVE_WALLET_OPTIONS: Partial<DirectSecp256k1HdWalletOptions> = {
  prefix: "kyve",
};

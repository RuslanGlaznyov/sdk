import { DirectSecp256k1HdWalletOptions } from "@cosmjs/proto-signing";
import { Bech32Address } from "@keplr-wallet/cosmos";
import { ChainInfo } from "@keplr-wallet/types";

export const KYVE_ENDPOINTS = {
  rpc: "http://localhost:26657",
  rest: "http://localhost:1317",
};

export const KYVE_KEPLR_CONFIG: ChainInfo = {
  rpc: KYVE_ENDPOINTS.rpc,
  rest: KYVE_ENDPOINTS.rest,
  chainId: "kyve",
  chainName: "KYVE",
  stakeCurrency: {
    coinDenom: "KYVE",
    coinMinimalDenom: "ukyve",
    coinDecimals: 0,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("kyve"),
  currencies: [
    { coinDenom: "KYVE", coinMinimalDenom: "ukyve", coinDecimals: 0 },
  ],
  feeCurrencies: [
    { coinDenom: "KYVE", coinMinimalDenom: "ukyve", coinDecimals: 0 },
  ],
  features: ["stargate"],
};

export const KYVE_WALLET_OPTIONS: Partial<DirectSecp256k1HdWalletOptions> = {
  prefix: "kyve",
};

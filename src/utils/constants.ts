import { coins, DirectSecp256k1HdWalletOptions } from "@cosmjs/proto-signing";
import { Bech32Address } from "@keplr-wallet/cosmos";
import { ChainInfo } from "@keplr-wallet/types";

export const KYVE_DECIMALS = 0;

export const KYVE_DEFAULT_FEE = {
  amount: coins(0, "kyve"),
  gas: "200000",
};

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
    coinMinimalDenom: "kyve",
    coinDecimals: KYVE_DECIMALS,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("kyve"),
  currencies: [
    {
      coinDenom: "KYVE",
      coinMinimalDenom: "kyve",
      coinDecimals: KYVE_DECIMALS,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "KYVE",
      coinMinimalDenom: "kyve",
      coinDecimals: KYVE_DECIMALS,
    },
  ],
  coinType: 118,
  gasPriceStep: { low: 0, average: 0, high: 0 },
  features: ["stargate"],
};

export const KYVE_WALLET_OPTIONS: Partial<DirectSecp256k1HdWalletOptions> = {
  prefix: "kyve",
};

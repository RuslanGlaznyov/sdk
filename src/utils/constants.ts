import { DirectSecp256k1HdWalletOptions } from "@cosmjs/proto-signing";
import { Bech32Address } from "@keplr-wallet/cosmos";
import { ChainInfo } from "@keplr-wallet/types";

// TODO: Think about how to make endpoints configurable.
export const KYVE_KEPLR_CONFIG: ChainInfo = {
  rpc: "http://0.0.0.0:26657",
  rest: "http://0.0.0.0:1317",
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
  coinType: 118,
  features: ["stargate", "ibc-transfer"],
};

export const KYVE_WALLET_OPTIONS: Partial<DirectSecp256k1HdWalletOptions> = {
  prefix: "kyve",
};

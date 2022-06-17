import {
  KYVE_ENDPOINTS,
  KYVE_KEPLR_CONFIG,
  KYVE_NETWORK,
  Network,
  PREFIX,
} from "./utils/constants";
import { getSigningKyveClient } from "./client/full-client";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { Tendermint } from "@cosmostation/extension-client";
type Cosmostation = {
  tendermint: Tendermint;
};

declare global {
  interface Window extends KeplrWindow {
    cosmostation: Cosmostation;
  }
}
export default class KyveSDK {
  public readonly network: Network;
  constructor(network: KYVE_NETWORK | Network) {
    if (typeof network === "string") {
      this.network = KYVE_ENDPOINTS[network];
    } else {
      this.network = network;
    }
  }

  async fromMnemonic(mnemonic: string) {
    const signedClient = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: PREFIX,
    });
    return getSigningKyveClient(this.network.rpc, signedClient);
  }
  async fromKepler() {
    if (typeof window === "undefined") throw new Error("Unsupported.");
    if (!window.keplr) throw new Error("Please install Keplr.");
    await window.keplr.experimentalSuggestChain({
      ...KYVE_KEPLR_CONFIG,
      rpc: this.network.rpc,
      rest: this.network.rest,
      chainId: this.network.chainId,
      chainName: this.network.chainName,
    });

    await window.keplr.enable(this.network.chainId);
    const signer = window.keplr.getOfflineSigner(this.network.chainId);
    return getSigningKyveClient(this.network.rpc, signer);
  }

  fromCosmostation(config: { isEditFee: boolean; isEditMemo: boolean }) {
    if (typeof window === "undefined") throw new Error("Unsupported.");
    if (!window.cosmostation)
      throw new Error("Please install Cosmostation wallet.");
    throw new Error("Need to implement");
  }
}

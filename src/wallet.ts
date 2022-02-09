import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
  OfflineSigner,
} from "@cosmjs/proto-signing";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { KYVE_KEPLR_CONFIG, KYVE_WALLET_OPTIONS } from "./utils/constants";

declare global {
  interface Window extends KeplrWindow {}
}

type Signer = DirectSecp256k1HdWallet | (OfflineSigner & OfflineDirectSigner);

export class KyveWallet {
  private signer?: Signer;
  private address?: string;

  constructor(private readonly mnemonic?: string) {}

  async getSigner(): Promise<Signer> {
    if (!this.signer) {
      if (this.mnemonic) {
        this.signer = await DirectSecp256k1HdWallet.fromMnemonic(
          this.mnemonic,
          KYVE_WALLET_OPTIONS
        );
      } else {
        if (window) {
          if (window.keplr) {
            await window.keplr.experimentalSuggestChain(KYVE_KEPLR_CONFIG);
            await window.keplr.enable("kyve");
            this.signer = window.keplr.getOfflineSigner("kyve");
          } else {
            throw new Error("Please install Keplr.");
          }
        } else {
          throw new Error("Unsupported.");
        }
      }
    }

    return this.signer;
  }

  async getAddress(): Promise<string> {
    if (!this.address) {
      const signer = await this.getSigner();
      const account = (await signer.getAccounts())[0];

      this.address = account.address;
    }

    return this.address;
  }

  static async generate(): Promise<KyveWallet> {
    const { mnemonic } = await DirectSecp256k1HdWallet.generate(
      24,
      KYVE_WALLET_OPTIONS
    );
    return new KyveWallet(mnemonic);
  }
}

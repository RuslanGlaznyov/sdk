import {
  Coin,
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
  OfflineSigner,
} from "@cosmjs/proto-signing";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import axios from "axios";
import {
  KYVE_ENDPOINTS,
  KYVE_KEPLR_CONFIG,
  KYVE_WALLET_OPTIONS,
} from "./utils/constants";

declare global {
  interface Window extends KeplrWindow {}
}

interface BalanceResponse {
  height: string;
  result: Coin[];
}
interface Endpoints {
  rpc: string;
  rest: string;
}
type Signer = DirectSecp256k1HdWallet | (OfflineSigner & OfflineDirectSigner);

export class KyveWallet {
  private signer?: Signer;
  private address?: string;

  constructor(
    private readonly mnemonic?: string,
    private readonly endpoints: Endpoints = KYVE_ENDPOINTS
  ) {}

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
            await window.keplr.experimentalSuggestChain({
              ...KYVE_KEPLR_CONFIG,
              ...this.endpoints,
            });
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

  async getName(): Promise<string> {
    if (window && window.keplr) {
      const { name } = await window.keplr.getKey("kyve");
      return name;
    } else {
      throw new Error("Unsupported.");
    }
  }

  async getBalance(): Promise<string> {
    const address = await this.getAddress();

    const { data } = await axios.get<BalanceResponse>(
      `${this.endpoints.rest}/bank/balances/${address}`
    );
    const coin = data.result.find((coin) => coin.denom === "kyve");

    return coin ? coin.amount : "0";
  }

  static async generate(): Promise<KyveWallet> {
    const { mnemonic } = await DirectSecp256k1HdWallet.generate(
      24,
      KYVE_WALLET_OPTIONS
    );
    return new KyveWallet(mnemonic);
  }
}

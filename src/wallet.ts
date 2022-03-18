import {
  Coin,
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import axios from "axios";
import { BigNumber } from "bignumber.js";
// @ts-ignore
import humanize from "humanize-number";
import {
  KYVE_DECIMALS,
  KYVE_ENDPOINTS,
  KYVE_KEPLR_CONFIG,
  KYVE_WALLET_OPTIONS,
} from "./utils/constants";

declare global {
  interface Window extends KeplrWindow {}
}

interface BalanceResponse {
  balance: Coin;
}
interface Endpoints {
  rpc: string;
  rest: string;
}
type Signer = DirectSecp256k1HdWallet | OfflineDirectSigner;

export class KyveWallet {
  private signer?: Signer;
  private address?: string;

  constructor(
    public readonly network: "alpha" | "beta" | "local",
    private readonly mnemonic?: string
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
              rpc: KYVE_ENDPOINTS[this.network].rpc,
              rest: KYVE_ENDPOINTS[this.network].rest,
              chainId: `kyve-${this.network}`,
              chainName: `KYVE - ${this.network.toUpperCase()}`,
            });
            await window.keplr.enable(`kyve-${this.network}`);
            this.signer = window.keplr.getOfflineSigner(`kyve-${this.network}`);
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
      const { name } = await window.keplr.getKey(`kyve-${this.network}`);
      return name;
    } else {
      throw new Error("Unsupported.");
    }
  }

  async getBalance(): Promise<string> {
    const address = await this.getAddress();

    const { data } = await axios.get<BalanceResponse>(
      `${
        KYVE_ENDPOINTS[this.network].rest
      }/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=tkyve`
    );

    return data.balance.amount;
  }

  formatBalance(balance: string, decimals: number = 2): string {
    return humanize(
      new BigNumber(balance)
        .dividedBy(new BigNumber(10).exponentiatedBy(KYVE_DECIMALS))
        .toFixed(decimals)
    );
  }

  static async generate(
    network: "alpha" | "beta" | "local"
  ): Promise<KyveWallet> {
    const { mnemonic } = await DirectSecp256k1HdWallet.generate(
      24,
      KYVE_WALLET_OPTIONS
    );
    return new KyveWallet(network, mnemonic);
  }
}

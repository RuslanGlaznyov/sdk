import { OfflineAminoSigner, Secp256k1HdWallet } from "@cosmjs/amino";
import { toBase64 } from "@cosmjs/encoding";
import {
  AccountData,
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
  KYVE_NETWORK,
  Network,
} from "./utils/constants";

declare global {
  interface Window extends KeplrWindow {}
}

interface BalanceResponse {
  balance: Coin;
}
type AminoSigner = Secp256k1HdWallet | OfflineAminoSigner;
type Signer = DirectSecp256k1HdWallet | OfflineDirectSigner;

export class KyveWallet {
  public readonly network: Network;
  private aminoSigner?: AminoSigner;
  private signer?: Signer;
  private account?: AccountData;

  constructor(
    network: KYVE_NETWORK | Network,
    private readonly mnemonic?: string
  ) {
    if (typeof network === "string") {
      this.network = KYVE_ENDPOINTS[network];
    } else {
      this.network = network;
    }
  }

  private async getKeplrSigner(): Promise<
    OfflineAminoSigner & OfflineDirectSigner
  > {
    if (typeof window !== "undefined") {
      if (window.keplr) {
        await window.keplr.experimentalSuggestChain({
          ...KYVE_KEPLR_CONFIG,
          rpc: this.network.rpc,
          rest: this.network.rest,
          chainId: this.network.chainId,
          chainName: this.network.chainName,
        });

        await window.keplr.enable(this.network.chainId);

        return window.keplr.getOfflineSigner(this.network.chainId);
      } else {
        throw new Error("Please install Keplr.");
      }
    } else {
      throw new Error("Unsupported.");
    }
  }

  async getAminoSigner(): Promise<AminoSigner> {
    if (!this.aminoSigner) {
      if (this.mnemonic) {
        this.aminoSigner = await Secp256k1HdWallet.fromMnemonic(this.mnemonic, {
          prefix: "kyve",
        });
      } else {
        this.aminoSigner = await this.getKeplrSigner();
      }
    }

    return this.aminoSigner;
  }

  async getSigner(): Promise<Signer> {
    if (!this.signer) {
      if (this.mnemonic) {
        this.signer = await DirectSecp256k1HdWallet.fromMnemonic(
          this.mnemonic,
          { prefix: "kyve" }
        );
      } else {
        this.signer = await this.getKeplrSigner();
      }
    }

    return this.signer;
  }

  private async getAccount(): Promise<AccountData> {
    if (!this.account) {
      const signer = await this.getSigner();
      const accounts = await signer.getAccounts();

      this.account = accounts[0];
    }

    return this.account;
  }

  async getAddress(): Promise<string> {
    const account = await this.getAccount();
    return account.address;
  }

  async getPubKey(): Promise<string> {
    const account = await this.getAccount();
    return toBase64(account.pubkey);
  }

  async getName(): Promise<string> {
    if (typeof window !== "undefined") {
      if (window.keplr) {
        const { name } = await window.keplr.getKey(this.network.chainId);
        return name;
      } else {
        throw new Error("Please install Keplr.");
      }
    } else {
      throw new Error("Unsupported.");
    }
  }

  async getBalance(): Promise<string> {
    const address = await this.getAddress();

    const { data } = await axios.get<BalanceResponse>(
      `${this.network.rest}/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=tkyve`
    );

    return data.balance.amount;
  }

  getRestEndpoint(): string {
    return this.network.rest;
  }

  getRpcEndpoint(): string {
    return this.network.rpc;
  }

  getChainId(): string {
    return this.network.chainId;
  }

  formatBalance(balance: string, decimals: number = 2): string {
    return humanize(
      new BigNumber(balance)
        .dividedBy(new BigNumber(10).exponentiatedBy(KYVE_DECIMALS))
        .toFixed(decimals)
    );
  }

  static async generate(network: KYVE_NETWORK | Network): Promise<KyveWallet> {
    const { mnemonic } = await DirectSecp256k1HdWallet.generate(24, {
      prefix: "kyve",
    });
    return new KyveWallet(network, mnemonic);
  }
}

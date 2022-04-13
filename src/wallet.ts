import { OfflineAminoSigner, Secp256k1HdWallet } from "@cosmjs/amino";
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
  KYVE_NETWORK,
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
  private aminoSigner?: AminoSigner;
  private signer?: Signer;
  private address?: string;

  constructor(
    public readonly network: KYVE_NETWORK,
    private readonly mnemonic?: string
  ) {}

  async getAminoSigner(): Promise<AminoSigner> {
    if (!this.aminoSigner) {
      if (this.mnemonic) {
        this.aminoSigner = await Secp256k1HdWallet.fromMnemonic(this.mnemonic, {
          prefix: "kyve",
        });
      } else {
        throw new Error("Unsupported.");
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
        if (window) {
          if (window.keplr) {
            await window.keplr.experimentalSuggestChain({
              ...KYVE_KEPLR_CONFIG,
              rpc: KYVE_ENDPOINTS[this.network].rpc,
              rest: KYVE_ENDPOINTS[this.network].rest,
              chainId: KYVE_ENDPOINTS[this.network].chainId,
              chainName: KYVE_ENDPOINTS[this.network].chainName,
            });
            await window.keplr.enable(KYVE_ENDPOINTS[this.network].chainId);
            this.signer = window.keplr.getOfflineSigner(
              KYVE_ENDPOINTS[this.network].chainId
            );
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
      const { name } = await window.keplr.getKey(
        KYVE_ENDPOINTS[this.network].chainId
      );
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

  getRestEndpoint(): string {
    return KYVE_ENDPOINTS[this.network].rest;
  }

  getRpcEndpoint(): string {
    return KYVE_ENDPOINTS[this.network].rpc;
  }

  getChainId(): string {
    return KYVE_ENDPOINTS[this.network].chainId;
  }

  formatBalance(balance: string, decimals: number = 2): string {
    return humanize(
      new BigNumber(balance)
        .dividedBy(new BigNumber(10).exponentiatedBy(KYVE_DECIMALS))
        .toFixed(decimals)
    );
  }

  static async generate(network: KYVE_NETWORK): Promise<KyveWallet> {
    const { mnemonic } = await DirectSecp256k1HdWallet.generate(24, {
      prefix: "kyve",
    });
    return new KyveWallet(network, mnemonic);
  }
}

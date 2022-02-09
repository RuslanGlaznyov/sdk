import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { KYVE_WALLET_OPTIONS } from "./utils/constants";

export class KyveWallet {
  private signer?: DirectSecp256k1HdWallet;
  private address?: string;

  // TODO: Implement Keplr support.
  constructor(private readonly mnemonic: string) {}

  async getSigner(): Promise<DirectSecp256k1HdWallet> {
    if (!this.signer) {
      this.signer = await DirectSecp256k1HdWallet.fromMnemonic(
        this.mnemonic,
        KYVE_WALLET_OPTIONS
      );
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

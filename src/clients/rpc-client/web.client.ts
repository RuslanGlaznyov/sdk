import KyveClient from "./client";
import { AccountData } from "@cosmjs/amino/build/signer";
import {SigningStargateClient} from "@cosmjs/stargate";

export default class KyveWebClient extends KyveClient {
  private readonly walletName: string;
  constructor(client: SigningStargateClient, account: AccountData, walletName: string) {
    super(client, account);
    this.walletName = walletName;
  }

  public getWalletName() {
    return this.walletName;
  }
}

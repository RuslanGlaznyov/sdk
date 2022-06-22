import KyveClient from "./kyve.client";
import { Client } from "../types/client";
import { AccountData } from "@cosmjs/amino/build/signer";

export default class KyveWebClient extends KyveClient {
  private readonly walletName: string;
  constructor(client: Client, account: AccountData, walletName: string) {
    super(client, account);
    this.walletName = walletName;
  }

  public getWalletName() {
    return this.walletName;
  }
}

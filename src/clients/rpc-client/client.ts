import { AccountData } from "@cosmjs/amino/build/signer";
import KyveBaseMethods from "./kyve/registry.v1beta1";
import { Client } from "../../types/client";

export default class KyveClient {
  public nativeClient: Client;
  public readonly account: AccountData;
  public kyve: { registry: { v1beta1: KyveBaseMethods } };

  constructor(client: Client, account: AccountData) {
    this.account = account;
    this.nativeClient = client;
    this.kyve = {
      registry: {
        v1beta1: new KyveBaseMethods(this.nativeClient, this.account),
      },
    };
  }
}

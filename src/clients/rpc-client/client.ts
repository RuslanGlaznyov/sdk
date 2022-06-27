import { AccountData } from "@cosmjs/amino/build/signer";
import KyveBaseMethods from "./kyve/base.v1beta1";
import KyveGovMethods from "./kyve/gov.v1beta1";
import { Client } from "../../types/client";

export default class KyveClient {
  public nativeClient: Client;
  public readonly account: AccountData;
  public kyve: { v1beta1: { base: KyveBaseMethods, gov: KyveGovMethods} };

  constructor(client: Client, account: AccountData) {
    this.account = account;
    this.nativeClient = client;
    this.kyve = {
        v1beta1: {
          base: new KyveBaseMethods(this.nativeClient, this.account),
          gov:  new KyveGovMethods(this.nativeClient, this.account)
        },
    };
  }
}

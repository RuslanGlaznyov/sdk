import { SigningStargateClient } from "@cosmjs/stargate";
import { AccountData } from "@cosmjs/amino/build/signer";
import BaseMethods from "./kyve-base.msg";
import GovMethods from "./gov.msg";
import { extendedClientType } from "./faces";

export default class KyveClient {
  public nativeClient: extendedClientType;
  public readonly account: AccountData;
  public readonly base: BaseMethods;
  public readonly gov: GovMethods;

  constructor(client: extendedClientType, account: AccountData) {
    this.account = account;
    this.nativeClient = client;
    this.base = new BaseMethods(this.nativeClient, this.account);
    this.gov = new GovMethods(this.nativeClient, this.account);
  }
}

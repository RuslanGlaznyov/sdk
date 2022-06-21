import { AccountData } from "@cosmjs/amino/build/signer";
import BaseMethods from "./kyve-base.msg";
import GovMethods from "./gov.msg";
import { Client } from "../types/client";
export default class KyveClient {
    nativeClient: Client;
    readonly account: AccountData;
    readonly base: BaseMethods;
    readonly gov: GovMethods;
    constructor(client: Client, account: AccountData);
}

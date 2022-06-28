import { AccountData } from "@cosmjs/amino/build/signer";
import KyveBaseMethods from "./kyve/base.v1beta1";
import KyveGovMethods from "./kyve/gov.v1beta1";
import { Client } from "../../types/client";
export default class KyveClient {
    nativeClient: Client;
    readonly account: AccountData;
    kyve: {
        v1beta1: {
            base: KyveBaseMethods;
            gov: KyveGovMethods;
        };
    };
    constructor(client: Client, account: AccountData);
}

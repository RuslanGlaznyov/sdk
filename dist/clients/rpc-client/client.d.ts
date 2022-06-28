import { AccountData } from "@cosmjs/amino/build/signer";
import KyveBaseMethods from "./kyve/base.v1beta1";
import KyveGovMethods from "./kyve/gov.v1beta1";
import { SigningStargateClient } from "@cosmjs/stargate";
export default class KyveClient {
    nativeClient: SigningStargateClient;
    readonly account: AccountData;
    kyve: {
        v1beta1: {
            base: KyveBaseMethods;
            gov: KyveGovMethods;
        };
    };
    constructor(client: SigningStargateClient, account: AccountData);
}

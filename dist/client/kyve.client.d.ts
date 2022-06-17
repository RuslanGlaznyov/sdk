import { AccountData } from "@cosmjs/amino/build/signer";
import BaseMethods from "./kyve-base.msg";
import GovMethods from "./gov.msg";
import { extendedClientType } from "./faces";
export default class KyveClient {
    nativeClient: extendedClientType;
    readonly account: AccountData;
    readonly base: BaseMethods;
    readonly gov: GovMethods;
    constructor(client: extendedClientType, account: AccountData);
}

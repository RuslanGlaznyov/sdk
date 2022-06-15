import {SigningStargateClient} from "@cosmjs/stargate";
import {AccountData} from "@cosmjs/amino/build/signer";
import MsgMethods from "./main.msg";

export default class KyveClient {
    private nativeClient: SigningStargateClient;
    public readonly account: AccountData;
    public readonly msg: MsgMethods;
    public readonly gov: () => any;

    constructor(client: SigningStargateClient, account: AccountData) {
        this.account = account
        this.nativeClient = client;
        this.msg = new MsgMethods(this.nativeClient, this.account)
        this.gov = () => { throw "Need to implement"}
    }
}
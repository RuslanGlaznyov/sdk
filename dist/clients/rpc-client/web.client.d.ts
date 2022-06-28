import KyveClient from "./client";
import { Client } from "../../types/client";
import { AccountData } from "@cosmjs/amino/build/signer";
export default class KyveWebClient extends KyveClient {
    private readonly walletName;
    constructor(client: Client, account: AccountData, walletName: string);
    getWalletName(): string;
}

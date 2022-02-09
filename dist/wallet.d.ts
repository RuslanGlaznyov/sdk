import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
export declare class KyveWallet {
    private readonly mnemonic;
    private signer?;
    private address?;
    constructor(mnemonic: string);
    getSigner(): Promise<DirectSecp256k1HdWallet>;
    getAddress(): Promise<string>;
    static generate(): Promise<KyveWallet>;
}

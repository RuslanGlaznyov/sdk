import { DirectSecp256k1HdWallet, OfflineDirectSigner, OfflineSigner } from "@cosmjs/proto-signing";
import { Window as KeplrWindow } from "@keplr-wallet/types";
declare global {
    interface Window extends KeplrWindow {
    }
}
declare type Signer = DirectSecp256k1HdWallet | (OfflineSigner & OfflineDirectSigner);
export declare class KyveWallet {
    private readonly mnemonic?;
    private signer?;
    private address?;
    constructor(mnemonic?: string | undefined);
    getSigner(): Promise<Signer>;
    getAddress(): Promise<string>;
    static generate(): Promise<KyveWallet>;
}
export {};

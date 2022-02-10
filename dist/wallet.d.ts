import { DirectSecp256k1HdWallet, OfflineDirectSigner, OfflineSigner } from "@cosmjs/proto-signing";
import { Window as KeplrWindow } from "@keplr-wallet/types";
declare global {
    interface Window extends KeplrWindow {
    }
}
interface Endpoints {
    rpc: string;
    rest: string;
}
declare type Signer = DirectSecp256k1HdWallet | (OfflineSigner & OfflineDirectSigner);
export declare class KyveWallet {
    private readonly mnemonic?;
    private readonly endpoints;
    private signer?;
    private address?;
    constructor(mnemonic?: string | undefined, endpoints?: Endpoints);
    getSigner(): Promise<Signer>;
    getAddress(): Promise<string>;
    getName(): Promise<string>;
    getBalance(): Promise<string>;
    static generate(): Promise<KyveWallet>;
}
export {};

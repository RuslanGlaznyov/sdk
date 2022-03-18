import { DirectSecp256k1HdWallet, OfflineDirectSigner } from "@cosmjs/proto-signing";
import { Window as KeplrWindow } from "@keplr-wallet/types";
declare global {
    interface Window extends KeplrWindow {
    }
}
declare type Signer = DirectSecp256k1HdWallet | OfflineDirectSigner;
export declare class KyveWallet {
    readonly network: "alpha" | "beta" | "local";
    private readonly mnemonic?;
    private signer?;
    private address?;
    constructor(network: "alpha" | "beta" | "local", mnemonic?: string | undefined);
    getSigner(): Promise<Signer>;
    getAddress(): Promise<string>;
    getName(): Promise<string>;
    getBalance(): Promise<string>;
    getRestEndpoint(): string;
    getRpcEndpoint(): string;
    formatBalance(balance: string, decimals?: number): string;
    static generate(network: "alpha" | "beta" | "local"): Promise<KyveWallet>;
}
export {};

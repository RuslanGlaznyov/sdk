import { DirectSecp256k1HdWallet, OfflineDirectSigner } from "@cosmjs/proto-signing";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { KYVE_NETWORK } from "./utils/constants";
declare global {
    interface Window extends KeplrWindow {
    }
}
declare type Signer = DirectSecp256k1HdWallet | OfflineDirectSigner;
export declare class KyveWallet {
    readonly network: KYVE_NETWORK;
    private readonly mnemonic?;
    private signer?;
    private address?;
    constructor(network: KYVE_NETWORK, mnemonic?: string | undefined);
    getSigner(): Promise<Signer>;
    getAddress(): Promise<string>;
    getName(): Promise<string>;
    getBalance(): Promise<string>;
    getRestEndpoint(): string;
    getRpcEndpoint(): string;
    getChainId(): string;
    formatBalance(balance: string, decimals?: number): string;
    static generate(network: KYVE_NETWORK): Promise<KyveWallet>;
}
export {};

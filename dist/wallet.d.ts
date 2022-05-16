import { OfflineAminoSigner, Secp256k1HdWallet } from "@cosmjs/amino";
import { DirectSecp256k1HdWallet, OfflineDirectSigner } from "@cosmjs/proto-signing";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { KYVE_NETWORK, Network } from "./utils/constants";
declare global {
    interface Window extends KeplrWindow {
    }
}
declare type AminoSigner = Secp256k1HdWallet | OfflineAminoSigner;
declare type Signer = DirectSecp256k1HdWallet | OfflineDirectSigner;
export declare class KyveWallet {
    private readonly mnemonic?;
    readonly network: Network;
    private aminoSigner?;
    private signer?;
    private account?;
    constructor(network: KYVE_NETWORK | Network, mnemonic?: string | undefined);
    private getKeplrSigner;
    getAminoSigner(): Promise<AminoSigner>;
    getSigner(): Promise<Signer>;
    private getAccount;
    getAddress(): Promise<string>;
    getPubKey(): Promise<string>;
    getName(): Promise<string>;
    getBalance(): Promise<string>;
    getRestEndpoint(): string;
    getRpcEndpoint(): string;
    getChainId(): string;
    formatBalance(balance: string, decimals?: number): string;
    static generate(network: KYVE_NETWORK | Network): Promise<KyveWallet>;
}
export {};

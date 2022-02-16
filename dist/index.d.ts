import { IndexedTx, SigningStargateClient } from "@cosmjs/stargate";
import { KyveWallet } from "./wallet";
export { KYVE_DECIMALS } from "./utils/constants";
export { KyveWallet } from "./wallet";
export declare class KyveSDK {
    readonly endpoint: string;
    private readonly wallet;
    private client?;
    constructor(endpoint: string, wallet: KyveWallet);
    getClient(): Promise<SigningStargateClient>;
    fetchPoolState(id: number): Promise<any>;
    create(metadata: string, startHeight: number, bundleDelay: number, operatingCost: number, storageCost: number, bundleProposal: any, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<string>;
    fund(id: number, amount: number, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<string>;
    transfer(recipient: string, amount: number, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<string>;
    /**
     * getLogs from all blocks within the range "fromBlock" (inclusive) and "toBlock" (inclusive)
     * @param fromBlock (inclusive)
     * @param toBlock (inclusive)
     */
    getLogs(fromBlock: number, toBlock: number): Promise<IndexedTx[]>;
    isValidAddress(address: string): boolean;
}

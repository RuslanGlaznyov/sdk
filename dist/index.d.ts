import { SigningStargateClient } from "@cosmjs/stargate";
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
    fund(id: number, amount: number, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<string>;
    stake(id: number, amount: number, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<string>;
}

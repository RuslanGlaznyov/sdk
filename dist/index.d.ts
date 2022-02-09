import { SigningStargateClient } from "@cosmjs/stargate";
import { KyveWallet } from "./wallet";
export { KyveWallet } from "./wallet";
export declare class KyveSDK {
    readonly endpoint: string;
    private readonly wallet;
    private client?;
    constructor(endpoint: string, wallet: KyveWallet);
    getClient(): Promise<SigningStargateClient>;
    fundPool(id: number, amount: number): Promise<string>;
}

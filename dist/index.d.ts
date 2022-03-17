import { DeliverTxResponse, SigningStargateClient } from "@cosmjs/stargate";
import { BigNumber } from "bignumber.js";
import { KyveWallet } from "./wallet";
import { FullDecodedTransaction } from "./types/transactions";
import { MessageEvent } from "./types/events";
import { StdSignature } from "@cosmjs/launchpad/build/types";
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
    fund(id: number | string, amount: BigNumber, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    defund(id: number | string, amount: BigNumber, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    stake(id: number | string, amount: BigNumber, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    unstake(id: number | string, amount: BigNumber, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    delegate(id: number | string, staker: string, amount: BigNumber, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    undelegate(id: number | string, staker: string, amount: BigNumber, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    withdrawRewards(id: number | string, staker: string, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    govVote(id: number | string, option: number, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    transfer(recipient: string, amount: number, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<string>;
    /**
     * get message-logs from all blocks within the range "fromBlock" (inclusive) and "toBlock" (inclusive)
     * @param fromBlock (inclusive)
     * @param toBlock (inclusive)
     */
    getDecodedTransactions(fromBlock: number, toBlock: number): Promise<FullDecodedTransaction[]>;
    getMessageEventLogs(fromBlock: number, toBlock: number): Promise<MessageEvent[]>;
    isValidAddress(address: string): boolean;
    signString(message: string): Promise<StdSignature>;
    verifyString(signature: string, data: string, pubKey: string): Promise<boolean>;
    getAddressFromPubKey(pubKey: string): string;
}

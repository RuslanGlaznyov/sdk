import { DeliverTxResponse, SigningStargateClient } from "@cosmjs/stargate";
import { BigNumber } from "bignumber.js";
import { KyveWallet } from "./wallet";
import { MessageEvent } from "./types/events";
import { StdSignature } from "@cosmjs/launchpad/build/types";
export { KYVE_DECIMALS } from "./utils/constants";
export { KyveWallet } from "./wallet";
export declare class KyveSDK {
    private readonly wallet;
    private client?;
    constructor(wallet: KyveWallet);
    getClient(): Promise<SigningStargateClient>;
    fetchPoolState(id: number): Promise<any>;
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
    updateCommission(id: number | string, commission: string, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    govSubmitProposal(content: any, amount: BigNumber, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    govDeposit(id: string, amount: BigNumber, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    govVote(id: string, option: "Yes" | "Abstain" | "No" | "NoWithVeto", fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    submitBundleProposal(id: number | string, bundleId: string, byteSize: number, bundleSize: number, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    voteProposal(id: number | string, bundleId: string, support: boolean, fee?: {
        amount: import("@cosmjs/stargate").Coin[];
        gas: string;
    }): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    claimUploaderRole(id: number | string, fee?: {
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
    getMessageEventLogs(fromBlock: number, toBlock: number): Promise<MessageEvent[]>;
    isValidAddress(address: string): boolean;
    signString(message: string): Promise<StdSignature>;
    verifyString(signature: string, data: string, pubKey: string): Promise<boolean>;
    getAddressFromPubKey(pubKey: string): string;
}

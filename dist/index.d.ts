import { DeliverTxResponse, SigningStargateClient } from "@cosmjs/stargate";
import { BigNumber } from "bignumber.js";
import { KyveWallet } from "./wallet";
import { MessageEvent } from "./types/events";
import { StdSignature } from "@cosmjs/launchpad/build/types";
export { KYVE_DECIMALS } from "./utils/constants";
export { KyveWallet } from "./wallet";
export declare class KyveSDK {
    readonly wallet: KyveWallet;
    private client?;
    constructor(wallet: KyveWallet);
    getClient(): Promise<SigningStargateClient>;
    fetchPoolState(id: number): Promise<any>;
    fund(id: number | string, amount: BigNumber): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    defund(id: number | string, amount: BigNumber): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    stake(id: number | string, amount: BigNumber): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    unstake(id: number | string, amount: BigNumber): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    delegate(id: number | string, staker: string, amount: BigNumber): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    undelegate(id: number | string, staker: string, amount: BigNumber): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    withdrawRewards(id: number | string, staker: string): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    updateMetadata(id: number | string, commission: string, moniker: string, website: string, logo: string): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    govSubmitProposal(type: "TextProposal" | "ParameterChangeProposal" | "CreatePoolProposal" | "UpdatePoolProposal" | "PausePoolProposal" | "UnpausePoolProposal", content: Object, amount: BigNumber): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    govDeposit(id: string, amount: BigNumber): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    govVote(id: string, option: "Yes" | "Abstain" | "No" | "NoWithVeto"): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    submitBundleProposal(id: number | string, bundleId: string, byteSize: number, fromHeight: number, bundleSize: number): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    voteProposal(id: number | string, bundleId: string, support: boolean): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    claimUploaderRole(id: number | string): Promise<{
        transactionHash: string;
        transactionBroadcast: Promise<DeliverTxResponse>;
    }>;
    transfer(recipient: string, amount: number): Promise<string>;
    getMessageEventLogs(fromBlock: number, toBlock: number): Promise<MessageEvent[]>;
    isValidAddress(address: string): boolean;
    signString(message: string): Promise<StdSignature>;
    verifyString(signature: string, data: string, pubKey: string): Promise<boolean>;
    getAddressFromPubKey(pubKey: string): string;
    private fetchFee;
}

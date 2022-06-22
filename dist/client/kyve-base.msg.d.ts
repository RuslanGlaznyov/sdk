import { MsgClaimUploaderRole, MsgDefundPool, MsgDelegatePool, MsgFundPool, MsgStakePool, MsgSubmitBundleProposal, MsgUndelegatePool, MsgUnstakePool, MsgUpdateMetadata, MsgVoteProposal, MsgWithdrawPool } from "@kyve/proto/dist/proto/kyve/registry/v1beta1/tx";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import { MessageEvent } from "../types/events";
import { Client } from "../types/client";
export default class KyveBaseMsg {
    private nativeClient;
    readonly account: AccountData;
    constructor(client: Client, account: AccountData);
    foundPool(value: Omit<MsgFundPool, "creator">, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    defundPool(value: Omit<MsgDefundPool, "creator">, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    stakePool(value: Omit<MsgStakePool, "creator">, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    unstakePool(value: Omit<MsgUnstakePool, "creator">, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    delegatePool(value: Omit<MsgDelegatePool, "creator">, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    withdrawPool(value: Omit<MsgWithdrawPool, "creator">, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    undelegatePool(value: Omit<MsgUndelegatePool, "creator">, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    submitBundleProposal(value: Omit<MsgSubmitBundleProposal, "creator">, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    voteProposal(value: Omit<MsgVoteProposal, "creator">, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    claimUploaderRole(value: Omit<MsgClaimUploaderRole, "creator">, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    updateMetadata(value: Omit<MsgUpdateMetadata, "creator">, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    transfer(recipient: string, amount: string, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    getMessageEventLogs(fromBlock: number, toBlock: number): Promise<MessageEvent[]>;
    getKyveBalance(): Promise<string>;
}

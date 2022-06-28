import { MsgClaimUploaderRole, MsgDefundPool, MsgDelegatePool, MsgFundPool, MsgStakePool, MsgSubmitBundleProposal, MsgUndelegatePool, MsgUnstakePool, MsgUpdateMetadata, MsgVoteProposal, MsgWithdrawPool } from "@kyve/proto/dist/proto/kyve/registry/v1beta1/tx";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import { Client } from "../../../types/client";
export default class KyveBaseMsg {
    private nativeClient;
    readonly account: AccountData;
    constructor(client: Client, account: AccountData);
    foundPool(value: Omit<MsgFundPool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    defundPool(value: Omit<MsgDefundPool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    stakePool(value: Omit<MsgStakePool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    unstakePool(value: Omit<MsgUnstakePool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    delegatePool(value: Omit<MsgDelegatePool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    withdrawPool(value: Omit<MsgWithdrawPool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    undelegatePool(value: Omit<MsgUndelegatePool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    submitBundleProposal(value: Omit<MsgSubmitBundleProposal, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    voteProposal(value: Omit<MsgVoteProposal, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    claimUploaderRole(value: Omit<MsgClaimUploaderRole, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    updateMetadata(value: Omit<MsgUpdateMetadata, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    transfer(recipient: string, amount: string, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    getKyveBalance(): Promise<string>;
}

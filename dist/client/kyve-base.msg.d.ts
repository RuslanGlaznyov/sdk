import { MsgClaimUploaderRole, MsgDefundPool, MsgDelegatePool, MsgFundPool, MsgStakePool, MsgSubmitBundleProposal, MsgUndelegatePool, MsgUnstakePool, MsgUpdateMetadata, MsgVoteProposal, MsgWithdrawPool } from "@kyve/proto/dist/proto/kyve/registry/v1beta1/tx";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import { MessageEvent } from "../types/events";
import { extendedClientType } from "./faces";
export default class KyveBaseMsg {
    private nativeClient;
    readonly account: AccountData;
    constructor(client: extendedClientType, account: AccountData);
    foundPool(value: MsgFundPool, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    defundPool(value: MsgDefundPool, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    stakePool(value: MsgStakePool, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    unstakePool(value: MsgUnstakePool, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    delegatePool(value: MsgDelegatePool, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    withdrawPool(value: MsgWithdrawPool, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    undelegatePool(value: MsgUndelegatePool, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    submitBundleProposal(value: MsgSubmitBundleProposal, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    voteProposal(value: Omit<MsgVoteProposal, 'creator'>, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    claimUploaderRole(value: MsgClaimUploaderRole, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    updateMetadata(value: MsgUpdateMetadata, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    transfer(recipient: string, amount: string, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    getMessageEventLogs(fromBlock: number, toBlock: number): Promise<MessageEvent[]>;
}

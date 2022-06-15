import {
    MsgClaimUploaderRole,
    MsgDefundPool,
    MsgDelegatePool,
    MsgFundPool,
    MsgStakePool, MsgSubmitBundleProposal, MsgUndelegatePool,
    MsgUnstakePool, MsgUpdateMetadata, MsgVoteProposal, MsgWithdrawPool
} from "@kyve/proto/dist/proto/kyve/registry/v1beta1/tx";

import {SigningStargateClient} from "@cosmjs/stargate";
import {StdFee} from "@cosmjs/amino/build/signdoc";
import {withTypeUrl} from "../registry/tx.registry";
import { AccountData } from "@cosmjs/amino/build/signer";

export default class MsgMethods {
    private nativeClient: SigningStargateClient;
    public readonly account: AccountData;

    constructor(client: SigningStargateClient, account: AccountData) {
        this.account = account
        this.nativeClient = client;
    }

    public foundPool(value: MsgFundPool, fee?: StdFee | "auto" | number, memo?: string) {
        const tx = withTypeUrl.fundPool(value);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : 'auto', memo)
    }

    public defundPool(value: MsgDefundPool, fee?: StdFee | "auto" | number, memo?: string) {
        const tx = withTypeUrl.defundPool(value);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : 'auto', memo)
    }

    public stakePool(value: MsgStakePool, fee?: StdFee | "auto" | number, memo?: string) {
        const tx = withTypeUrl.stakePool(value);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : 'auto', memo)
    }

    public unstakePool(value: MsgUnstakePool, fee?: StdFee | "auto" | number, memo?: string) {
        const tx = withTypeUrl.unstakePool(value);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : 'auto', memo)
    }

    public delegatePool(value: MsgDelegatePool, fee?: StdFee | "auto" | number, memo?: string) {
        const tx = withTypeUrl.delegatePool(value);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : 'auto', memo)
    }

    public withdrawPool(value: MsgWithdrawPool, fee?: StdFee | "auto" | number, memo?: string) {
        const tx = withTypeUrl.withdrawPool(value);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : 'auto', memo)
    }

    //submitBundleProposal
    public undelegatePool(value: MsgUndelegatePool, fee?: StdFee | "auto" | number, memo?: string) {
        const tx = withTypeUrl.undelegatePool(value);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : 'auto', memo)
    }

    public submitBundleProposal(value: MsgSubmitBundleProposal, fee?: StdFee | "auto" | number, memo?: string) {
        const tx = withTypeUrl.submitBundleProposal(value);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : 'auto', memo)
    }

    public voteProposal(value: Omit<MsgVoteProposal, 'creator'>, fee?: StdFee | "auto" | number, memo?: string) {
        const newValue = value as MsgVoteProposal
        newValue.creator = this.account.address
        const tx = withTypeUrl.voteProposal(newValue);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : 'auto', memo)
    }

    public claimUploaderRole(value: MsgClaimUploaderRole, fee?: StdFee | "auto" | number, memo?: string) {
        const tx = withTypeUrl.claimUploaderRole(value);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : 'auto', memo)
    }

    public updateMetadata(value: MsgUpdateMetadata, fee?: StdFee | "auto" | number, memo?: string) {
        const tx = withTypeUrl.updateMetadata(value);
        return this.nativeClient.signAndBroadcast(this.account.address, [tx], fee ? fee : 'auto', memo)
    }
}
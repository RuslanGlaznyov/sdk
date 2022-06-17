import { TextProposal } from "@kyve/proto/dist/proto/cosmos/gov/v1beta1/gov";
import { ParameterChangeProposal } from "@kyve/proto/dist/proto/cosmos/params/v1beta1/params";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import { CreatePoolProposal, PausePoolProposal, UpdatePoolProposal, UnpausePoolProposal, SchedulePoolUpgradeProposal, CancelPoolUpgradeProposal } from "@kyve/proto/dist/proto/kyve/registry/v1beta1/gov";
import { extendedClientType } from "./faces";
export default class GovMethods {
    private nativeClient;
    readonly account: AccountData;
    constructor(client: extendedClientType, account: AccountData);
    private createGovTx;
    submitTextProposal(amount: string, value: TextProposal, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    parameterChangeProposal(amount: string, value: ParameterChangeProposal, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    createPoolProposal(amount: string, value: CreatePoolProposal, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    updatePoolProposal(amount: string, value: UpdatePoolProposal, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    pausePoolProposal(amount: string, value: PausePoolProposal, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    unpausePoolProposal(amount: string, value: UnpausePoolProposal, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    schedulePoolUpgradeProposal(amount: string, value: SchedulePoolUpgradeProposal, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    cancelPoolUpgradeProposal(amount: string, value: CancelPoolUpgradeProposal, fee?: StdFee | "auto" | number, memo?: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
}

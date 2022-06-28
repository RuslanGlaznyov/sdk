import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import { Client } from "../../../types/client";
import { TextProposal } from "@kyve/proto/dist/proto/cosmos/gov/v1beta1/gov";
import { ParameterChangeProposal } from "@kyve/proto/dist/proto/cosmos/params/v1beta1/params";
import { CancelPoolUpgradeProposal, PausePoolProposal, SchedulePoolUpgradeProposal, UnpausePoolProposal, UpdatePoolProposal } from "@kyve/proto/dist/proto/kyve/registry/v1beta1/gov";
export default class KyveGovMsg {
    private nativeClient;
    readonly account: AccountData;
    constructor(client: Client, account: AccountData);
    private createGovTx;
    submitTextProposal(amount: string, value: TextProposal, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
        isExpedited?: boolean;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    parameterChangeProposal(amount: string, value: ParameterChangeProposal, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
        isExpedited?: boolean;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    updatePoolProposal(amount: string, value: UpdatePoolProposal, options?: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    pausePoolProposal(amount: string, value: PausePoolProposal, options?: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    unpausePoolProposal(amount: string, value: UnpausePoolProposal, options?: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    schedulePoolUpgradeProposal(amount: string, value: SchedulePoolUpgradeProposal, options?: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    cancelPoolUpgradeProposal(amount: string, value: CancelPoolUpgradeProposal, options: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
}

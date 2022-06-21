import { TextProposal } from "@kyve/proto/dist/proto/cosmos/gov/v1beta1/gov";
import { ParameterChangeProposal } from "@kyve/proto/dist/proto/cosmos/params/v1beta1/params";
import { coins } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import {
  CreatePoolProposal,
  PausePoolProposal,
  UpdatePoolProposal,
  UnpausePoolProposal,
  SchedulePoolUpgradeProposal,
  CancelPoolUpgradeProposal,
} from "@kyve/proto/dist/proto/kyve/registry/v1beta1/gov";
import { Client } from "../types/client";

export default class GovMethods {
  private nativeClient: Client;
  public readonly account: AccountData;

  constructor(client: Client, account: AccountData) {
    this.account = account;
    this.nativeClient = client;
  }
  private createGovTx(
    amount: string,
    content: { typeUrl: string; value: Object }
  ) {
    return {
      typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
      value: {
        content,
        initialDeposit: coins(amount.toString(), "tkyve"),
        proposer: this.account.address,
      },
    };
  }
  public submitTextProposal(
    amount: string,
    value: TextProposal,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const content = {
      typeUrl: "/cosmos.gov.v1beta1.TextProposal",
      value: TextProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public parameterChangeProposal(
    amount: string,
    value: ParameterChangeProposal,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const content = {
      typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
      value: ParameterChangeProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public createPoolProposal(
    amount: string,
    value: CreatePoolProposal,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.CreatePoolProposal",
      value: CreatePoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public updatePoolProposal(
    amount: string,
    value: UpdatePoolProposal,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.UpdatePoolProposal",
      value: UpdatePoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public pausePoolProposal(
    amount: string,
    value: PausePoolProposal,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.PausePoolProposal",
      value: PausePoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public unpausePoolProposal(
    amount: string,
    value: UnpausePoolProposal,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.UnpausePoolProposal",
      value: UnpausePoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public schedulePoolUpgradeProposal(
    amount: string,
    value: SchedulePoolUpgradeProposal,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.SchedulePoolUpgradeProposal",
      value: SchedulePoolUpgradeProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public cancelPoolUpgradeProposal(
    amount: string,
    value: CancelPoolUpgradeProposal,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.CancelPoolUpgradeProposal",
      value: CancelPoolUpgradeProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }
}

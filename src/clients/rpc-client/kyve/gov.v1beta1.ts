import { coins, SigningStargateClient } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import { DENOM } from "../../../constants";
import { TextProposal } from "@kyve/proto/dist/proto/cosmos/gov/v1beta1/gov";
import { ParameterChangeProposal } from "@kyve/proto/dist/proto/cosmos/params/v1beta1/params";
import {
  CancelPoolUpgradeProposal,
  PausePoolProposal,
  ResetPoolProposal,
  SchedulePoolUpgradeProposal,
  UnpausePoolProposal,
  UpdatePoolProposal,
} from "@kyve/proto/dist/proto/kyve/registry/v1beta1/gov";
import { signTx, TxPromise } from "../../../utils/helper";

export default class KyveGovMsg {
  private nativeClient: SigningStargateClient;
  public readonly account: AccountData;

  constructor(client: SigningStargateClient, account: AccountData) {
    this.account = account;
    this.nativeClient = client;
  }

  private createGovTx(
    amount: string,
    content: { typeUrl: string; value: Object },
    isExpedited = false
  ) {
    return {
      typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
      value: {
        content,
        initial_deposit: coins(amount.toString(), DENOM),
        proposer: this.account.address,
        is_expedited: isExpedited,
      },
    };
  }

  public async submitTextProposal(
    amount: string,
    value: TextProposal,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
      isExpedited?: boolean;
    }
  ) {
    const content = {
      typeUrl: "/cosmos.gov.v1beta1.TextProposal",
      value: TextProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async parameterChangeProposal(
    amount: string,
    value: ParameterChangeProposal,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
      isExpedited?: boolean;
    }
  ) {
    const content = {
      typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
      value: ParameterChangeProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async updatePoolProposal(
    amount: string,
    value: UpdatePoolProposal,
    options?: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.UpdatePoolProposal",
      value: UpdatePoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async pausePoolProposal(
    amount: string,
    value: PausePoolProposal,
    options?: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.PausePoolProposal",
      value: PausePoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async unpausePoolProposal(
    amount: string,
    value: UnpausePoolProposal,
    options?: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.UnpausePoolProposal",
      value: UnpausePoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async schedulePoolUpgradeProposal(
    amount: string,
    value: SchedulePoolUpgradeProposal,
    options?: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.SchedulePoolUpgradeProposal",
      value: SchedulePoolUpgradeProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async cancelPoolUpgradeProposal(
    amount: string,
    value: CancelPoolUpgradeProposal,
    options: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.CancelPoolUpgradeProposal",
      value: CancelPoolUpgradeProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async resetPoolProposal(
    amount: string,
    value: ResetPoolProposal,
    options: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      typeUrl: "/kyve.registry.v1beta1.ResetPoolProposal",
      value: ResetPoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }
}

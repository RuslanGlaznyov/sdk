import { Registry } from "@cosmjs/proto-signing";
import { cosmos } from "@keplr-wallet/cosmos";
import path from "path";
import { Field, load, Type } from "protobufjs";

const Content = new Type("content")
  .add(new Field("@type", 1, "string"))
  .add(new Field("title", 2, "string"))
  .add(new Field("description", 3, "string"))
  .add(new Field("id", 4, "uint64"))
  .add(new Field("name", 5, "string"))
  .add(new Field("runtime", 6, "string"))
  .add(new Field("logo", 7, "string"))
  .add(new Field("versions", 8, "string"))
  .add(new Field("config", 9, "string"))
  .add(new Field("start_height", 10, "uint64"))
  .add(new Field("min_bundle_size", 11, "uint64"))
  .add(new Field("operating_cost", 12, "uint64"));

const MsgSubmitProposal = new Type("MsgSubmitProposal")
  .add(Content)
  // @ts-ignore
  .add(new Field("initial_deposit", 2, cosmos.base.v1beta1.Coin, "repeated"))
  .add(new Field("proposer", 3, "string"));

export const createRegistry = async (): Promise<Registry> => {
  const root = await load(path.join(__dirname, "../proto/tx.proto"));

  return new Registry(
    Array.from([
      [`/cosmos.gov.v1beta1.MsgSubmitProposal`, MsgSubmitProposal],
      [`/cosmos.gov.v1beta1.MsgDeposit`, cosmos.gov.v1beta1.MsgDeposit],
      [`/cosmos.gov.v1beta1.MsgVote`, cosmos.gov.v1beta1.MsgVote],
      [
        `/kyve.registry.v1beta1.MsgCreatePool`,
        root.lookupType("MsgCreatePool"),
      ],
      [`/kyve.registry.v1beta1.MsgFundPool`, root.lookupType("MsgFundPool")],
      [
        `/kyve.registry.v1beta1.MsgDefundPool`,
        root.lookupType("MsgDefundPool"),
      ],
      [`/kyve.registry.v1beta1.MsgStakePool`, root.lookupType("MsgStakePool")],
      [
        `/kyve.registry.v1beta1.MsgUnstakePool`,
        root.lookupType("MsgUnstakePool"),
      ],
      [
        `/kyve.registry.v1beta1.MsgClaimUploaderRole`,
        root.lookupType("MsgClaimUploaderRole"),
      ],
      [
        `/kyve.registry.v1beta1.MsgSubmitBundleProposal`,
        root.lookupType("MsgSubmitBundleProposal"),
      ],
      [
        `/kyve.registry.v1beta1.MsgVoteProposal`,
        root.lookupType("MsgVoteProposal"),
      ],
      [
        `/kyve.registry.v1beta1.MsgDelegatePool`,
        root.lookupType("MsgDelegatePool"),
      ],
      [
        `/kyve.registry.v1beta1.MsgUndelegatePool`,
        root.lookupType("MsgUndelegatePool"),
      ],
      [
        `/kyve.registry.v1beta1.MsgWithdrawPool`,
        root.lookupType("MsgWithdrawPool"),
      ],
      [
        `/kyve.registry.v1beta1.MsgUpdateCommission`,
        root.lookupType("MsgUpdateCommission"),
      ],
    ])
  );
};

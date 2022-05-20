import { Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes } from "@cosmjs/stargate";
import path from "path";
import { Field, load, Root, Type } from "protobufjs";

export const TextProposal = new Type("TextProposal")
  .add(new Field("title", 1, "string"))
  .add(new Field("description", 2, "string"));

const ParamsRoot = Root.fromJSON({
  nested: {
    ParamChange: {
      fields: {
        subspace: {
          type: "string",
          id: 1,
        },
        key: {
          type: "string",
          id: 2,
        },
        value: {
          type: "string",
          id: 3,
        },
      },
    },
    ParameterChangeProposal: {
      fields: {
        title: {
          type: "string",
          id: 1,
        },
        description: {
          type: "string",
          id: 2,
        },
        changes: {
          rule: "repeated",
          type: "ParamChange",
          id: 3,
        },
      },
    },
  },
});

export const ParameterChangeProposal = ParamsRoot.lookupType(
  "ParameterChangeProposal"
);

export const CreatePoolProposal = new Type("CreatePoolProposal")
  .add(new Field("title", 1, "string"))
  .add(new Field("description", 2, "string"))
  .add(new Field("name", 3, "string"))
  .add(new Field("runtime", 4, "string"))
  .add(new Field("logo", 5, "string"))
  .add(new Field("config", 6, "string"))
  .add(new Field("start_height", 7, "uint64"))
  .add(new Field("upload_interval", 8, "uint64"))
  .add(new Field("operating_cost", 9, "uint64"))
  .add(new Field("max_bundle_size", 10, "uint64"))
  .add(new Field("version", 11, "string"))
  .add(new Field("binaries", 12, "string"));

export const UpdatePoolProposal = new Type("UpdatePoolProposal")
  .add(new Field("title", 1, "string"))
  .add(new Field("description", 2, "string"))
  .add(new Field("id", 3, "uint64"))
  .add(new Field("name", 4, "string"))
  .add(new Field("runtime", 5, "string"))
  .add(new Field("logo", 6, "string"))
  .add(new Field("config", 7, "string"))
  .add(new Field("upload_interval", 8, "uint64"))
  .add(new Field("operating_cost", 9, "uint64"))
  .add(new Field("max_bundle_size", 10, "uint64"));

export const PausePoolProposal = new Type("PausePoolProposal")
  .add(new Field("title", 1, "string"))
  .add(new Field("description", 2, "string"))
  .add(new Field("id", 3, "uint64"));

export const UnpausePoolProposal = new Type("UnpausePoolProposal")
  .add(new Field("title", 1, "string"))
  .add(new Field("description", 2, "string"))
  .add(new Field("id", 3, "uint64"));

export const SchedulePoolUpgradeProposal = new Type(
  "SchedulePoolUpgradeProposal"
)
  .add(new Field("title", 1, "string"))
  .add(new Field("description", 2, "string"))
  .add(new Field("runtime", 3, "string"))
  .add(new Field("version", 4, "string"))
  .add(new Field("scheduled_at", 5, "uint64"))
  .add(new Field("duration", 6, "uint64"))
  .add(new Field("binaries", 7, "string"));

export const CancelPoolUpgradeProposal = new Type("CancelPoolUpgradeProposal")
  .add(new Field("title", 1, "string"))
  .add(new Field("description", 2, "string"))
  .add(new Field("runtime", 3, "string"));

export const createRegistry = async (): Promise<Registry> => {
  const root = await load(path.join(__dirname, "../proto/tx.proto"));

  return new Registry(
    Array.from([
      ...defaultRegistryTypes,
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
        `/kyve.registry.v1beta1.MsgUpdateMetadata`,
        root.lookupType("MsgUpdateMetadata"),
      ],
    ])
  );
};

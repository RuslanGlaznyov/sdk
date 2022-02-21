import { Registry } from "@cosmjs/proto-signing";
import path from "path";
import { load } from "protobufjs";

export const createRegistry = async (): Promise<Registry> => {
  const root = await load(path.join(__dirname, "../proto/tx.proto"));

  return new Registry(
    Array.from([
      [
        `/KYVENetwork.kyve.registry.MsgCreatePool`,
        root.lookupType("MsgCreatePool"),
      ],
      [
        `/KYVENetwork.kyve.registry.MsgFundPool`,
        root.lookupType("MsgFundPool"),
      ],
      [
        `/KYVENetwork.kyve.registry.MsgDefundPool`,
        root.lookupType("MsgDefundPool"),
      ],
      [
        `/KYVENetwork.kyve.registry.MsgStakePool`,
        root.lookupType("MsgStakePool"),
      ],
      [
        `/KYVENetwork.kyve.registry.MsgUnstakePool`,
        root.lookupType("MsgUnstakePool"),
      ],
      [
        `/KYVENetwork.kyve.registry.MsgClaimUploaderRole`,
        root.lookupType("MsgClaimUploaderRole"),
      ],
      [
        `/KYVENetwork.kyve.registry.MsgSubmitBundleProposal`,
        root.lookupType("MsgSubmitBundleProposal"),
      ],
      [
        `/KYVENetwork.kyve.registry.MsgVoteProposal`,
        root.lookupType("MsgVoteProposal"),
      ],
    ])
  );
};

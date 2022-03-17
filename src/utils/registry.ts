import { Registry } from "@cosmjs/proto-signing";
import path from "path";
import { Enum, Field, load, Type } from "protobufjs";

const voteOption = new Enum("option")
  .add("VOTE_OPTION_UNSPECIFIED", 0)
  .add("VOTE_OPTION_YES", 1)
  .add("VOTE_OPTION_ABSTAIN", 2)
  .add("VOTE_OPTION_NO", 3)
  .add("VOTE_OPTION_NO_WITH_VETO", 4);
const msgVote = new Type("MsgVote")
  .add(new Field("proposal_id", 1, "uint64"))
  .add(new Field("voter", 2, "string"))
  .add(voteOption);

export const createRegistry = async (): Promise<Registry> => {
  const root = await load(path.join(__dirname, "../proto/tx.proto"));

  return new Registry(
    Array.from([
      [`/cosmos.gov.v1beta1.MsgVote`, msgVote],
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
    ])
  );
};

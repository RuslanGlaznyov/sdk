import { Registry } from "@cosmjs/proto-signing";
import { load } from "protobufjs";

export const createRegistry = async (): Promise<Registry> => {
  const root = await load("./src/proto/tx.proto");

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
    ])
  );
};

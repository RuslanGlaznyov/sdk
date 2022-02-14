import { Registry } from "@cosmjs/proto-signing";
import { join } from "path";
import { loadSync } from "protobufjs";

const root = loadSync(join(__dirname, "../proto/tx.proto"));

export default new Registry(
  Array.from([
    [
      `/KYVENetwork.kyve.registry.MsgCreatePool`,
      root.lookupType("MsgCreatePool"),
    ],
    [`/KYVENetwork.kyve.registry.MsgFundPool`, root.lookupType("MsgFundPool")],
  ])
);

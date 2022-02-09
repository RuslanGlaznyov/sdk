import { Registry } from "@cosmjs/proto-signing";
import { Field, Type } from "protobufjs";

//

const MsgFundPool = new Type("MsgFundPool")
  .add(new Field("creator", 1, "string"))
  .add(new Field("id", 2, "uint64"))
  .add(new Field("amount", 3, "uint64"));

//

export default new Registry(
  Array.from([[`/KYVENetwork.kyve.registry.${MsgFundPool.name}`, MsgFundPool]])
);

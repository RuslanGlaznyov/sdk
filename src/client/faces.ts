import { SigningStargateClient } from "@cosmjs/stargate";

export type extendedClientType = SigningStargateClient & {
  readonly rpcEndpoint: string;
};

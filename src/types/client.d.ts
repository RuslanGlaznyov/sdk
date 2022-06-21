import { SigningStargateClient } from "@cosmjs/stargate";

export type Client = SigningStargateClient & {
    readonly rpcEndpoint: string;
};

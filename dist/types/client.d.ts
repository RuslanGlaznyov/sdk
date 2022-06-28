import { SigningStargateClient } from "@cosmjs/stargate";
export declare type Client = SigningStargateClient & {
    readonly rpcEndpoint: string;
};

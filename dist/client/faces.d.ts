import { SigningStargateClient } from "@cosmjs/stargate";
export declare type extendedClientType = SigningStargateClient & {
    readonly rpcEndpoint: string;
};

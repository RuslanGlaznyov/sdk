import { ChainInfo } from "@keplr-wallet/types";
export declare const KYVE_DECIMALS = 9;
declare type Networks = Record<KYVE_NETWORK, Network>;
export declare const KYVE_ENDPOINTS: Networks;
export declare const PREFIX = "kyve";
export declare const KYVE_KEPLR_CONFIG: ChainInfo;
export declare type KYVE_NETWORK = "local" | "alpha" | "beta" | "korellia";
export declare type Network = {
    rpc: string;
    rest: string;
    chainId: string;
    chainName: string;
};
export {};

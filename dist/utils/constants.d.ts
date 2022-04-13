import { ChainInfo } from "@keplr-wallet/types";
export declare const KYVE_DECIMALS = 9;
export declare const KYVE_ENDPOINTS: {
    local: {
        rpc: string;
        rest: string;
        chainId: string;
        chainName: string;
    };
    alpha: {
        rpc: string;
        rest: string;
        chainId: string;
        chainName: string;
    };
    beta: {
        rpc: string;
        rest: string;
        chainId: string;
        chainName: string;
    };
    korellia: {
        rpc: string;
        rest: string;
        chainId: string;
        chainName: string;
    };
};
export declare const KYVE_KEPLR_CONFIG: ChainInfo;
export declare type KYVE_NETWORK = "local" | "alpha" | "beta" | "korellia";

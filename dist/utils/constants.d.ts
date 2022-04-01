import { DirectSecp256k1HdWalletOptions } from "@cosmjs/proto-signing";
import { ChainInfo } from "@keplr-wallet/types";
export declare const KYVE_DECIMALS = 9;
export declare const KYVE_DEFAULT_FEE: {
    amount: import("@cosmjs/proto-signing").Coin[];
    gas: string;
};
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
export declare const KYVE_WALLET_OPTIONS: Partial<DirectSecp256k1HdWalletOptions>;

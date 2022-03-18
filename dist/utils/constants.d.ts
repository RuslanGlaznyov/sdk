import { DirectSecp256k1HdWalletOptions } from "@cosmjs/proto-signing";
import { ChainInfo } from "@keplr-wallet/types";
export declare const KYVE_DECIMALS = 9;
export declare const KYVE_DEFAULT_FEE: {
    amount: import("@cosmjs/proto-signing").Coin[];
    gas: string;
};
export declare const KYVE_ENDPOINTS: {
    alpha: {
        rpc: string;
        rest: string;
    };
    beta: {
        rpc: string;
        rest: string;
    };
    local: {
        rpc: string;
        rest: string;
    };
};
export declare const KYVE_KEPLR_CONFIG: ChainInfo;
export declare const KYVE_WALLET_OPTIONS: Partial<DirectSecp256k1HdWalletOptions>;

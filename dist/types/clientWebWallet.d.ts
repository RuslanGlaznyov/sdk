import { Client } from "./client";
export declare type ClientWebWallet = Client & {
    getWalletName: () => string;
};

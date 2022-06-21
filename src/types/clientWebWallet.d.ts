import {Client} from "./client";

export type ClientWebWallet = Client & {
     getWalletName: () => string;
}
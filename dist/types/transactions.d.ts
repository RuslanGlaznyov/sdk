import { IndexedTx } from "@cosmjs/stargate";
export declare class FullDecodedTransaction {
    indexedTx?: IndexedTx;
    messages?: any[];
    events?: any[];
    blockNumber?: number;
    blockTime?: Date;
}
